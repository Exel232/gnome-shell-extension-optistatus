# gnome-shell-extension-optistatus

An icon that displays the current status of your optimus card.

## Features
* Shows if bbswitch is turned on or off

## Roadmap
* Accessible preferences instead of hardcoded config (interval, polling on/off, notifications)
* List of processes using optirun
* Kill switch for processes using optirun

## Installation from git

### Just copying

    git clone git://github.com/peacememories/gnome-shell-extension-optistatus.git
    cd gnome-shell-extension-optistatus
    cp -r optistatus@syntax-austria.org ~/.local/share/gnome-shell/extensions

Restart the shell and then enable the extension.

### Using the zip script and Gnome Tweak Tool
You can also use the provided script to create a zip and use Gnome Tweak Tool to install it

	git clone git://github.com/peacememories/gnome-shell-extension-optistatus.git
	cd gnome-shell-extension-optistatus
	./make-zip.sh

Go to the Tweak Tool > Extensions > Install extension, select the zip file, click restart
