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

    echo ""
    echo "      ↳ Retrieving NodeJS unofficial builds for ARMv6l : [2m$NODE_ARMV6L[0m";
    wget -q --show-progress $NODE_ARMV6L -O $TMPDIR/node.tar.xz;

    echo ""
    echo "      ↳ Unarchiving";
    tar xvfJ $TMPDIR/node.tar.xz -C $TMPDIR | xargs -n 1 echo -ne "\\033[K\\033[10G$@";

    echo ""
    echo "      ↳ Copying files";
    sudo rsync -av $TMPDIR/node-*/* /usr/local | xargs -n 1 echo -ne "\\033[K\\033[10G$@";
    echo -e "\\033[K\\033[10GDone"

    echo ""
    echo "      ↳ Cleaning";
    rm -rf $TMPDIR;
  else
    echo ""
    echo "      ↳ Installing NVM";
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash;
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")";

    echo ""
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
echo ""
echo ""
echo "2️⃣  [1;4mInstalling node_modules[0m";
npm i --omit=dev --no-audit || {
  echo "❌  [31mModules installation failed, install on your own through `npm i`.[0m";
  exit 1;
}

# Configuring host
echo ""
echo ""
echo "3️⃣  [1;4mConfiguring host[0m";

echo ""
echo "      ↳ Installing required apt packages";
cat ./resources/packages.apt | xargs sudo apt-get install -y --no-install-recommends $@;

echo ""
echo "      ↳ Raspi config"
sudo raspi-config nonint do_spi 0             # Activate SPI
#sudo raspi-config nonint do_boot_behaviour B4 # Auto login

echo ""
echo "      ↳ Installing splashscreen"
sudo cp ./resources/logo.png /usr/share/plymouth/themes/pix/splash.png;
sudo cp ./resources/logo.ansi /etc/motd;

echo ""
echo "      ↳ Setting /boot/config.txt"
sudo sh -c "echo -n '
max_usb_current=1
hdmi_drive=1
hdmi_group=2
hdmi_mode=1
hdmi_mode=87
hdmi_cvt 800 480 60 6 0 0 0
dtparam=spi=on
disable_splash=1
'>>/boot/config.txt";

echo ""
echo "      ↳ Setting /boot/cmdline.txt"
sudo sh -c 'echo -n "console=tty3 quiet splash loglevel=3 logo.nologo vt.global_cursor_default=0 plymouth.enable=0">>/boot/cmdline.txt';

# Installing services
echo ""
echo ""
echo "4️⃣  [1;4mConfiguring host[0m";

echo ""
echo "      ↳ Installing services";
sudo cp ./services/* /lib/systemd/system;
find ./services/* -type f -print0 | xargs -0 basename -a | xargs -n 1 sudo systemctl enable $@;

echo ""
echo "      ↳ Configuring services";
find ./services/* -type f -print0 | xargs -0 basename -a | xargs -n 1 sudo sh -c "echo 'WorkingDirectory=$(pwd)'>>/lib/systemd/system/tOSter.service"

echo ""
echo "      ↳ Opening port 80 for node";
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``;

# Reboot
echo ""
echo ""
echo "5️⃣  [1;4mReboot[0m"
echo "      ↳ Rebooting in 10s"
sleep 10
sudo reboot
