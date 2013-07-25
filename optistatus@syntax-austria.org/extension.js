
const Main = imports.ui.main;
const St = imports.gi.St;
const PanelMenu = imports.ui.panelMenu;

const Optistatus = imports.misc.extensionUtils.getCurrentExtension();
const OptistatusIndicator = Optistatus.imports.indicator.OptistatusIndicator;

let indicator, icon;

function init(extensionMeta) {
	let theme = imports.gi.Gtk.IconTheme.get_default();
	theme.append_search_path(extensionMeta.path + "/icons");
}

function enable() {
	indicator = new OptistatusIndicator();
	Main.panel.addToStatusArea(indicator.getName(), indicator);
}

function disable() {
	indicator.destroy();
	indicator = null;
}
