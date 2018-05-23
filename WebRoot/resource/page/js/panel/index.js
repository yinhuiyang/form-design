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

		this.$panel.attr('panelid', this.panel.id);
		this.$inputContainer = this.$panel.find('.input-container');

	};

	Panel.prototype.initView = function() {
		var panel = this.panel;
		this.$panel.find('.panel-header').append(panel.title);
		this.initContent();
	};

	Panel.prototype.initContent = function() {

	};

	Panel.prototype.initInput = function() {
		var page = this.page;
		var pageObject = this.pageObject;
		var panel = this.panel;
		var data = this.data;
		var this_ = this;
		$(panel.inputs).each(function(index, input) {
			var inputObject = Panel.Input.create({
				page : page,
				panel : panel,
				pageObject : pageObject,
				panelObject : this_,
				input : input,
				data : data
			});

			var $group = inputObject.build();

			this_.$inputContainer.append($group);
		});
	};

	Panel.prototype.build = function() {
		this.initView();
		this.initInput();

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