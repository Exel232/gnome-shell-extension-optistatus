const Lang = imports.lang;
const Signals = imports.signals;
const GLib = imports.gi.GLib;

const bbswitch_file = "/proc/acpi/bbswitch";

Array.prototype.compare = function(other) {
	if(this.length != other.length) return false;
	for(let i = 0; i < this.length; i++) {
		if(this[i].compare) {
			if(!this[i].compare(other[i])) return false;
		} else {
			if(this[i] !== other[i]) return false;
		}
	}
	return true;
}

const Interval = new Lang.Class({
	Name: "Interval",

	_init: function(func, interval) {
		this.func = func;
		this.interval = interval;
		this.running = false;
	},
	start: function() {
		this.running = true;
		this.runfunc = this.run.bind(this);
		this.runfunc();
	},
	run: function() {
		if(!this.running) return;
		this.func();
		GLib.timeout_add(0, this.interval, this.runfunc);
	},
	stop: function() {
		this.running = false;
	},
	destroy: function() {
		this.stop();
	}
});

const get_file = function(file_name) {
	if(!GLib.file_test(file_name, GLib.FileTest.EXISTS)) return "";
	else return String(GLib.file_get_contents(file_name)[1]).trim();
};

const Status = new Lang.Class({
	Name: "Status",

	_init: function() {
		this.parent();
		this.enabled = false;
	},
	
	update: function() {
		let newEnabled = this.is_enabled();
		if(newEnabled != this.enabled) {
			this.enabled = newEnabled;
			if(this.enabled == true)
				this.emit("enable");
			else
				this.emit("disable");
		}
	},

	is_enabled: function() {
		let fileContents = GLib.file_get_contents(bbswitch_file);
		return fileContents[1].toString().indexOf("ON") != -1;
	}
});
Signals.addSignalMethods(Status.prototype);