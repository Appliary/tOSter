#!/bin/bash

NODE_ARMV6L="https://unofficial-builds.nodejs.org/download/release/v18.3.0/node-v18.3.0-linux-armv6l.tar.xz"

# Welcome the user
cat ./resources/logo.ansi
echo "[0;94mWelcome to the installation script of tOSter ![0m"
echo '[0;94m══════════════════════════════════════════════[0m'
echo ""
echo ""

[[ -f /boot/config.txt ]] || {
  echo "❌  [31mPlease run this on raspberry ![0m"
  exit 1;
}

# Install NodeJS
echo "1️⃣  [1;4mInstalling NodeJS[0m"
echo ""
type node >/dev/null 2>&1 && {
  echo "    [93mNodeJS is not installed.[0m"

  # Check for Raspberry or other
  [[ $(uname -m) = "armv6l" ]] && {
    mkdir -p $TMPDIR/tOSter-install

    echo "      ↳ Retrieving Raspberry unofficial builds : [2m$NODE_ARMV6L[0m"
    wget $NODE_ARMV6L $TMPDIR/tOSter-install/node.tar.xz;

    echo "      ↳ Unarchiving"
    tar xvfJ $TMPDIR/tOSter-install/node-* $TMPDIR/tOSter-install/

    echo "      ↳ Copying"
    sudo cp -R $TMPDIR/tOSter-install/node-*/* /usr/local

    echo "      ↳ Cleaning"
    rm -rf $TMPDIR/tOSter-install;
  } || {
    echo "      ↳ Installing NVM"
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"

    echo "      ↳ Installing NodeJS from NVM"
    $NVM_DIR/nvm.sh install stable
    $NVM_DIR/nvm.sh use stable
  }

  # Ensure path
  PATH=$PATH:/usr/local/bin

  # Check if installed
  type node >/dev/null 2>&1 || {
    echo "❌  [31mInstallation failed[0m"
    exit 1;
  }

  echo "✅  [32mNode $(node -v) has been installed[0m"
} || {
  echo "✅  [32mNode $(node -v) already installed[0m"
}

# Install dependencies
echo "2️⃣  [1;4mInstalling Dependencies[0m"
npm i --production --no-audit || {
  echo "❌  [31mInstallation failed[0m"
  exit 1
}

# Configuring host
echo "3️⃣  [1;4mConfiguring host[0m"

echo "      ↳ Installing required packages"
sudo apt-get install -y fbi

echo "      ↳ Raspi config"
sudo raspi-config nonint do_hostname tOSter   # Change hostname
sudo raspi-config nonint do_spi 0             # Activate SPI
sudo raspi-config nonint do_boot_behaviour B4 # Auto login

echo "      ↳ Installing splashscreen"
sudo cp ./resources/logo.png /etc/splash.png

echo "      ↳ Setting /boot/config.txt"
sudo sh -c "echo 'disable_splash=1
dtparam=spi=on'>>/boot/config.txt"

echo "      ↳ Setting /boot/cmdline.txt"
sudo sh -c 'echo -n "console=tty3 quiet splash loglevel=3 logo.nologo vt.global_cursor_default=0 plymouth.enable=0">>/boot/cmdline.txt'

# Installing services
echo "4️⃣  [1;4mConfiguring host[0m"

echo "      ↳ Installing services"
sudo cp ./services/* /lib/systemd/system
find ./services/* -type f -print0 | xargs -0 basename -a | xargs -0 sudo systemctl enable

echo "      ↳ Configuring services"
export WHOAMI=$USER
sudo sh -c "echo 'WorkingDirectory=$(pwd)'>>/lib/systemd/system/tOSter.service"

# Reboot
echo "5️⃣  [1;4mReboot[0m"
echo "      ↳ Rebooting in 10s"
sleep 10
sudo reboot
