#!/bin/bash

export DBDIR="/boot/tOSter";
export TMPDIR="/tmp/tOSter-install";
export NODE_ARMV6L="https://unofficial-builds.nodejs.org/download/release/v18.3.0/node-v18.3.0-linux-armv6l.tar.xz";

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
echo "1️⃣  [1;4mInstalling NodeJS[0m";
echo "";
if [[ -z `which node` ]]; then
  echo "    [93mNodeJS is not installed.[0m";

  # Check for Raspberry or other
  if [[ $(uname -m) = "armv6l" ]]; then
    mkdir -p /tmp/tOSter-install;

    echo "      ↳ Retrieving Raspberry unofficial builds : [2m$NODE_ARMV6L[0m";
    wget -q --show-progress $NODE_ARMV6L -O $TMPDIR/node.tar.xz;

    echo "      ↳ Unarchiving";
    tar xvfJ $TMPDIR/node.tar.xz -C $TMPDIR | xargs -n 1 echo -ne "\\033[G\\033[K$@";
    echo "\\033[G\\033[KDone"

    echo "      ↳ Copying";
    sudo cp -R $TMPDIR/node-*/* /usr/local;

    echo "      ↳ Cleaning";
    rm -rf $TMPDIR;
  else
    echo "      ↳ Installing NVM";
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash;
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")";

    echo "      ↳ Installing NodeJS from NVM";
    $NVM_DIR/nvm.sh install stable;
    $NVM_DIR/nvm.sh use stable;
  fi

  # Check if installed
  if [[ -z `which node` ]]; then
    echo "❌  [31mInstallation failed. Please install on your own.[0m";
    exit 1;
  fi

  echo "✅  [32mNode $(node -v) has been installed[0m";
else
  echo "✅  [32mNode $(node -v) already installed[0m";
fi

# Install dependencies
echo "2️⃣  [1;4mInstalling Dependencies[0m";
npm i --omit=dev --no-audit || {
  echo "❌  [31mDependencies installation failed, install on your own through NPM.[0m";
  exit 1;
}

# Configuring host
echo "3️⃣  [1;4mConfiguring host[0m";

echo "      ↳ Installing required packages";
sudo apt-get install -y fbi libcap2-bin unclutter;

echo "      ↳ Raspi config"
sudo raspi-config nonint do_hostname tOSter   # Change hostname
sudo raspi-config nonint do_spi 0             # Activate SPI
sudo raspi-config nonint do_boot_behaviour B4 # Auto login

echo "      ↳ Installing splashscreen"
sudo cp ./resources/logo.png /etc/splash.png;
sudo cp ./resources/logo.ansi /etc/motd;

echo "      ↳ Setting /boot/config.txt"
sudo sh -c "echo -n '
disable_splash=1
hdmi_drive=2
dtparam=spi=on
'>>/boot/config.txt";

echo "      ↳ Setting /boot/cmdline.txt"
sudo sh -c 'echo -n "console=tty3 quiet splash loglevel=3 logo.nologo vt.global_cursor_default=0 plymouth.enable=0">>/boot/cmdline.txt';

echo "      ↳ Hide cursor"
sudo sh -c 'echo "
unclutter -idle 0
">>/etc/xdg/lxsession/LXDE-pi/autostart';

# Installing services
echo "4️⃣  [1;4mConfiguring host[0m";

echo "      ↳ Installing services";
sudo cp ./services/* /lib/systemd/system;
find ./services/* -type f -print0 | xargs -0 basename -a | xargs -n 1 sudo systemctl enable $@;

echo "      ↳ Configuring services";
sudo sh -c "echo 'WorkingDirectory=$(pwd)'>>/lib/systemd/system/tOSter.service"

echo "      ↳ Opening port 80 for node";
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``;

# Reboot
echo "5️⃣  [1;4mReboot[0m"
echo "      ↳ Rebooting in 10s"
sleep 10
sudo reboot
