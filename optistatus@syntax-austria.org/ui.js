const Lang = imports.lang;
const St = imports.gi.St;
const PanelMenu = imports.ui.panelMenu;
const Optistatus = imports.misc.extensionUtils.getCurrentExtension();
const Lib = Optistatus.imports.lib;

const active_icon = "optistatus-active-symbolic";
const inactive_icon = "optistatus-inactive-symbolic";
const indicator_name = "Optistatus";

const OptistatusIndicator = new Lang.Class( {
	Name: "OptistatusIndicator",
	Extends: PanelMenu.Button,

	_init: function() {
		this.parent(null, indicator_name);
		this.icon = new St.Icon({
			icon_name: inactive_icon,
			style_class: "system-status-icon"
		});
		this.actor.add_child(this.icon);
	},
	enable: function() {
		this.icon.icon_name = active_icon;
	},
	disable: function() {
		this.icon.icon_name = inactive_icon;
	},
	getName: function() {
		return indicator_name;
	},
	destroy: function() {
		this.parent();
	}
});
