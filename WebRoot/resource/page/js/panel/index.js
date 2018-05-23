(function() {
	var html = '';
	html += '<div class="page-panel">';
	html += '	<div class="panel-header">';
	html += '	</div>';
	html += '	<div class="panel-body">';
	html += '		<div class="input-container">';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	var Panel = function(settings) {
		this.settings = settings || {};
		this.init();
	};

	Panel.prototype.init = function() {
		var settings = this.settings;
		this.page = settings.page;
		this.pageObject = settings.pageObject;
		this.panel = settings.panel;
		this.data = settings.data;
		this.$panel = $(html);
		this.$inputContainer = this.$panel.find('.input-container');

	};

	Panel.prototype.initView = function() {
		this.initContent();
	};

	Panel.prototype.initContent = function() {

	};

	Panel.prototype.build = function() {
		this.initView();

		return this.$panel;
	};

	Panel.models = {};

	Panel.add = function(type, Class) {
		Panel.models[type] = Class;
	};

	Panel.create = function(settings) {
		settings = settings || {};
		var panel = settings.panel || {};
		var type = panel.type || "BASE";
		return new Panel.models[type](settings);
	};

	PageApi.Panel = Panel;
})()