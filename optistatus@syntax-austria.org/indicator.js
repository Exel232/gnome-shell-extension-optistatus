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
		this.parent(null, this.IndicatorName);
		this.icon = new St.Icon({
			icon_name: inactive_icon,
			style_class: "system-status-icon"
		});
		this.actor.add_child(this.icon);
		this.statusChecker = new Lib.Optistatus();
		this.statusChecker.connect("optimus-start", this._enable_icon.bind(this));
		this.statusChecker.connect("optimus-stop", this._disable_icon.bind(this));
	},
	_enable_icon: function() {
		this.icon.icon_name = active_icon;
	},
	_disable_icon: function() {
		this.icon.icon_name = inactive_icon;
	},
	getName: function() {
		return indicator_name;
	},
	destroy: function() {
		this.parent();
		this.statusChecker.destroy();
	}
});
