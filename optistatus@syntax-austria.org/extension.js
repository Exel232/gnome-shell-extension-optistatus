
const Main = imports.ui.main;
const St = imports.gi.St;
const PanelMenu = imports.ui.panelMenu;

const extension = imports.misc.extensionUtils.getCurrentExtension();
const ui = extension.imports.ui;
const lib = extension.imports.lib;

let indicator, status;

function init(extensionMeta) {
	let theme = imports.gi.Gtk.IconTheme.get_default();
	theme.append_search_path(extensionMeta.path + "/icons");
}

function enable() {
	indicator = new ui.OptistatusIndicator();
	Main.panel.addToStatusArea(indicator.getName(), indicator);
	status = new lib.Status();
	status.connect("enable", indicator.enable.bind(indicator));
	status.connect("disable", indicator.disable.bind(indicator));
}

function disable() {
	indicator.destroy();
	indicator = null;
}
