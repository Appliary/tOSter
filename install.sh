#!/bin/bash

DBDIR="/boot/tOSter";
TMPDIR="/tmp/tOSter-install";
NODE_ARMV6L="https://unofficial-builds.nodejs.org/download/release/v18.3.0/node-v18.3.0-linux-armv6l.tar.xz";

# Ensure to be in the install dir
cd `dirname "$(readlink -f '$0')"`;

# Welcome the user
cat ./resources/logo.ansi;
echo "[0;94mWelcome to the installation script of tOSter ![0m";
echo "[0;94m══════════════════════════════════════════════[0m";
echo "";
echo "";

# Check we are on raspberry
[[ -f /boot/config.txt ]] || {
  echo "❌  [31mPlease run this on raspberry ![0m";
  exit 1;
}

# Install NodeJS
echo "1️⃣  [1;4mNodeJS[0m";
echo "";
if [[ -z `which node` ]]; then
  echo "    [93mNodeJS is not yet installed.[0m";

  # Check for Raspberry or other
  if [[ $(uname -m) = "armv6l" ]]; then
    mkdir -p /tmp/tOSter-install;

    echo "";
    echo "      ↳ Retrieving NodeJS unofficial builds for ARMv6l : [2m$NODE_ARMV6L[0m";
    wget -q --show-progress $NODE_ARMV6L -O $TMPDIR/node.tar.xz;

    echo "";
    echo "      ↳ Unarchiving";
    tar xvfJ $TMPDIR/node.tar.xz -C $TMPDIR | xargs -n 1 echo -ne "\\033[K\\033[10G$@";

    echo "";
    echo "      ↳ Copying files";
    sudo rsync -av $TMPDIR/node-*/* /usr/local | xargs -n 1 echo -ne "\\033[K\\033[10G$@";
    echo -e "\\033[K\\033[10GDone"

    echo "";
    echo "      ↳ Cleaning";
    rm -rf $TMPDIR;
  else
    echo "";
    echo "      ↳ Installing NVM";
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash;
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")";

    echo "";
    echo "      ↳ Installing NodeJS from NVM";
    $NVM_DIR/nvm.sh install stable;
    $NVM_DIR/nvm.sh use stable;
  fi

  # Check if installed
  if [[ -z `which node` ]]; then
    echo "    ❌ [31mInstallation failed. Please install on your own.[0m";
    exit 1;
  fi

  echo ""
  echo "    ✅ [32mNode $(node -v) has been installed[0m";
else
  echo "    ✅ [32mNode $(node -v) already installed[0m";
fi

# Install dependencies
echo "";
echo "";
echo "2️⃣  [1;4mInstalling required node_modules[0m";
npm i --omit=dev --no-audit || {
  echo "❌  [31mModules installation failed, install on your own through `npm i`.[0m";
  exit 1;
}

# Configuring host
echo "";
echo "";
echo "3️⃣  [1;4mConfiguring host[0m";

echo "";
echo "      ↳ Installing required apt packages";
cat ./resources/packages.apt | xargs sudo apt-get -q install -y --no-install-recommends $@;

echo "";
echo "      ↳ Raspi config";
echo "          - Activating SPI";
sudo raspi-config nonint do_spi 0;

echo "";
echo "      ↳ Installing splashscreens";
sudo cp ./resources/logo.png /etc/splash.png;
sudo cp ./resources/logo.ansi /etc/motd;

function ensure_in_file {
  if grep -q "$2" "$1"; then
    echo "          - [[90mALREADY SET[0m] $2";
  else
    if [[ -z $3 ]]; then
      sudo sh -c "echo -ne '$2'>>$1";
    else
      sudo sh -c "echo -e '$2'>>$1";
    fi
    echo "          - [[32m   ADDED   [0m] $2";
  fi
}

echo "";
echo "      ↳ Setting /boot/config.txt";

ensure_in_file "/boot/config.txt" "max_usb_current=1" true
ensure_in_file "/boot/config.txt" "hdmi_drive=1" true
ensure_in_file "/boot/config.txt" "hdmi_group=2" true
ensure_in_file "/boot/config.txt" "hdmi_mode=1" true
ensure_in_file "/boot/config.txt" "hdmi_mode=87" true
ensure_in_file "/boot/config.txt" "hdmi_cvt 800 480 60 6 0 0 0" true
ensure_in_file "/boot/config.txt" "dtparam=spi=on" true
ensure_in_file "/boot/config.txt" "disable_splash=1" true

echo "";
echo "      ↳ Setting /boot/cmdline.txt"

ensure_in_file "/boot/cmdline.txt" " console=tty3"
ensure_in_file "/boot/cmdline.txt" " quiet"
ensure_in_file "/boot/cmdline.txt" " splash"
ensure_in_file "/boot/cmdline.txt" " loglevel=3"
ensure_in_file "/boot/cmdline.txt" " logo.nologo"

# Installing services
echo "";
echo "";
echo "4️⃣  [1;4mInstalling services[0m";

echo "";
echo "      ↳ Granting permissions";
sudo sh -c "gpasswd -a $USER tty";
sudo touch "/etc/X11/Xwrapper.config"
ensure_in_file "/etc/X11/Xwrapper.config" " logo.nologo"
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``;
sudo chmod +x ./resources/kiosk.sh

echo "";
echo "      ↳ Adding services files";
sudo cp ./services/* /lib/systemd/system;

echo "";
echo "      ↳ Configuring services";
for file in ./services/*; do
  filename=`basename -a $file`;
  ensure_in_file "/lib/systemd/system/$filename" "WorkingDirectory=$(pwd)" true;
done

echo "";
echo "      ↳ Enabling services";
for file in ./services/*; do
  filename=`basename -a $file`;
  sudo systemctl enable $filename;
done

# Reboot
echo "";
echo "";
echo "5️⃣  [1;4mReboot[0m";
echo "      ↳ Rebooting in 5s";
echo "";

sleep 5;
sudo reboot;
