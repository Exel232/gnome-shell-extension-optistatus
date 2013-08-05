const Lang = imports.lang;
const St = imports.gi.St;
const Ui = imports.ui;
const Optistatus = imports.misc.extensionUtils.getCurrentExtension();
const Lib = Optistatus.imports.lib;

const active_icon = "optistatus-active-symbolic";
const inactive_icon = "optistatus-inactive-symbolic";
const indicator_name = "optistatus";

const OptistatusIndicator = new Lang.Class( {
	Name: "OptistatusIndicator",
	Extends: Ui.panelMenu.SystemStatusButton,

	_init: function() {
		this.parent(inactive_icon);
	},
	enable: function() {
		this.setIcon(active_icon);
	},
	disable: function() {
		this.setIcon(inactive_icon);
	},
	getName: function() {
		return indicator_name;
	},
	updateMenu: function(items) {
		let indicator = this;
		indicator.menu.removeAll();
		items.forEach(function(item) {
			let cmdline = item.cmdline.split("\0");
			let menuItem = new Ui.popupMenu.PopupMenuItem(cmdline[1]);
			menuItem.connect("activate", Lang.bind(item, item.kill));
			indicator.menu.addMenuItem(menuItem);
		});
	},
	destroy: function() {
		this.parent();
	}
});
