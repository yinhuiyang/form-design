(function() {
	var html = '';
	html += '<div class="input-group">';
	html += '	<div class="input-label">';
	html += '	</div>';
	html += '	<div class="input-box">';
	html += '	</div>';
	html += '</div>';
	var Input = function(settings) {
		this.settings = settings || {};
		this.init();
	};

	Input.prototype.init = function() {
		var settings = this.settings;
		this.page = settings.page;
		this.pageObject = settings.pageObject;
		this.panel = settings.panel;
		this.panelObject = settings.panelObject;
		this.input = settings.input;
		this.data = settings.data;
		this.$group = $(html);
		this.$inputBox = this.$group.find('.input-box');

	};

	Input.prototype.initView = function() {
		var input = this.input;
		this.$group.find('.input-label').append(input.label);
		this.initContent();
	};

	Input.prototype.initContent = function() {
	};

	Input.prototype.build = function() {
		this.initView();

		return this.$group;
	};

	Input.models = {};

	Input.add = function(type, Class) {
		Input.models[type] = Class;
	};

	Input.create = function(settings) {
		settings = settings || {};
		var input = settings.input || {};
		var type = input.type || "TEXT";
		return new Input.models[type](settings);
	};

	PageApi.Panel.Input = Input;
})()