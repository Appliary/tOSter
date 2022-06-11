#!/bin/sh

# configuring
xset -dpms     # disable DPMS (Energy Star) features.
xset s off     # disable screen saver
xset s noblank # don't blank the video device

# start mindow manager
matchbox-window-manager -use_titlebar no &

# hide X mouse cursor unless mouse activated
unclutter &

# start chromium
chromium-browser --display=:0 --no-sandbox --kiosk --incognito --window-position=0,0 https://localhost
