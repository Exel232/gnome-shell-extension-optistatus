const Main = imports.ui.main;
const St = imports.gi.St;
const PanelMenu = imports.ui.panelMenu;

const extension = imports.misc.extensionUtils.getCurrentExtension();
const ui = extension.imports.ui;
const lib = extension.imports.lib;
const process = extension.imports.process;

let indicator, status, proclist, interval;

function init(extensionMeta) {
	let theme = imports.gi.Gtk.IconTheme.get_default();
	theme.append_search_path(extensionMeta.path + "/icons");
}

function enable() {
	indicator = new ui.OptistatusIndicator();
	status = new lib.Status();
	proclist = new process.ProcessList();
	interval = new lib.Interval(update, 3000);

	status.connect("enable", indicator.enable.bind(indicator));
	status.connect("disable", indicator.disable.bind(indicator));
	proclist.connect("updated", function() {
		indicator.updateMenu(proclist.processes);
	});
	if(status.is_enabled())
		indicator.enable();
	else
		indicator.disable();

	proclist.add_filter(function(process) {
		return process.command.indexOf("optirun") != -1;
	});
	
	Main.panel.addToStatusArea(indicator.getName(), indicator);
	interval.start();
}

function update() {
	status.update();
	proclist.update();
}

function disable() {
	indicator.destroy();
	indicator = null;
	interval.destroy();
}
