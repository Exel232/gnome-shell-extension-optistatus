const Lang = imports.lang;
const GLib = imports.gi.GLib;
const Signals = imports.signals;

const extension = imports.misc.extensionUtils.getCurrentExtension();
const lib = extension.imports.lib;

const PROC_DIR = "/proc";

const Process = new Lang.Class({
	Name: "Process",

	_init: function(obj) {
		if(obj !== undefined) {
			this.pid = obj.pid !== undefined ? Number(obj.pid) : 0;
			this.command = obj.command !== undefined ? String(obj.command) : "";
			this.cmdline = obj.cmdline !== undefined ? String(obj.cmdline) : "";
		}
	},
	kill: function() {
		//TODO: kill app
		imports.ui.main.notify("killing " + this.pid);
		GLib.spawn_command_line_sync("kill " + this.pid);
	},
	compare: function(other) {
		return this.pid === other.pid 
		&& this.command === other.commmand
		&& this.cmdline === other.cmdline;
	},
	toString: function() {
		return "[Process | command: " + this.command + "]"
	}
});

const ProcessList = new Lang.Class({
	Name: "ProcessList",

	_init: function() {
		this.processes = [];
		this.filters = [];
	},
	update: function() {
		let old_processes = this.processes;
		this.processes = [];
		//TODO: get some stuff together
		let dir_list = String(GLib.spawn_command_line_sync("ls " + PROC_DIR)[1]);
		dir_list = dir_list.split("\n");
		dir_list.forEach(Lang.bind(this, function(pid_name) {
			let dir_name = PROC_DIR + "/" + pid_name;
			if(/^\d+$/.test(pid_name)
				&& GLib.file_test(dir_name, GLib.FileTest.EXISTS)) {

				let process = new Process();
				process.pid = (Number(pid_name));
				process.command = String(lib.get_file(dir_name + "/comm"));
				process.cmdline = String(lib.get_file(dir_name + "/cmdline"));
				this.processes.push(process);
			}
		}));

		this.filters.forEach(Lang.bind(this, this.filter));
		if(!this.processes.compare(old_processes)) {
			this.emit("updated");
		}
 	},
	filter: function(filter_func) {
		this.processes = this.processes.filter(filter_func);
	},
	add_filter: function(filter_func) {
		if(this.filters.indexOf(filter_func) === -1) {
			this.filters.push(filter_func);
		}
	},
	remove_filter: function(filter_func) {
		let index = this.filters.indexOf(filter_func);
		if(index !== -1)
			delete this.filters[index];
	},
	purge_filters: function() {
		this.filters = {};
	}
});
Signals.addSignalMethods(ProcessList.prototype);