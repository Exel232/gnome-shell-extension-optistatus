const Lang = imports.lang;
const Signals = imports.signals;
const GLib = imports.gi.GLib;

const bbswitch_file = "/proc/acpi/bbswitch";

const Optistatus = new Lang.Class({
	Name: "Optistatus",

	_init: function() {
		this.parent()
		this.running = true;
		this.enabled = false;
		this.interval = 3000; //Hardcoded for the moment. Polling interval for the status checker

		this._loop();
	},
	
	_loop: function() {
		if(!this.running) return;
		let newEnabled = this._is_enabled();
		if(newEnabled != this.enabled) {
			this.enabled = newEnabled;
			if(this.enabled == true)
				this.emit("optimus-start");
			else
				this.emit("optimus-stop");
		}
		GLib.timeout_add_seconds(0, 3, this._loop.bind(this));
	},

	_is_enabled: function() {
		let fileContents = GLib.file_get_contents(bbswitch_file);
		if(!fileContents[0]) {//If file could not be opened, optimus is not correctly installed;
			this.emit("no-optimus");
			return false;
		}
		return fileContents[1].toString().indexOf("ON") != -1;
	},
	
	destroy: function() {
		running = false;
	}
});

Signals.addSignalMethods(Optistatus.prototype);
