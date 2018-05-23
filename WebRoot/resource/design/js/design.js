(function() {
	var page = {};
	var $view = null;
	app.design = new Object();

	app.design.init = function(config) {
		config = config || {};
		page = config.page;
		$view = $('.design-view');
		app.design.initView();
	};

	app.design.initView = function() {
		var pageObject = new PageApi({
			page : page
		});
		var $page = pageObject.build();
		$view.html($page);

		app.design.initModel();
	};

	app.design.updateSortable = function() {
		var $panels = $view.find('.panel-container>div');
		var panels = [];
		$($panels).each(function(index, $panel) {
			var $panel = $($panel);
			var type = $panel.attr('model-type');
			var panel = {};
			console.log(type);
			if (type) {
				panel.id = app.getNumber();
				panel.type = type;
				panel.title = "这是新面板标题";
			} else {
				var panelid = $panel.attr('panelid');
				$(page.panels).each(function(index, p) {
					if (p.id == panelid) {
						panel = p;
					}
				});
			}

			var $inputs = $panel.find('.input-container>div');
			var inputs = [];
			$($inputs).each(function(index, $input) {
				var $input = $($input);
				var type = $input.attr('model-type');
				var input = {};
				if (type) {
					input.id = app.getNumber();
					input.type = type;
					input.label = "这是Label";
				} else {
					var inputid = $input.attr('inputid');
					$(panel.inputs).each(function(index, i) {
						if (i.id == inputid) {
							input = i;
						}
					});
				}
				inputs.push(input);
			});
			panel.inputs = inputs;

			panels.push(panel);
		});

		page.panels = panels;

		app.design.initView();
	};

	app.design.initModel = function() {
		app.design.initPanelModel();
		app.design.initInputModel();

		$view.find('.panel-container,.input-container').sortable({
			opacity : 0.85,
			revert : true,
			start : function(e, t) {
			},
			change : function(e, t) {
			},
			stop : function(e, t) {
			},
			update : function(event, ui) {
				app.design.updateSortable(event, ui, this);
			}
		});

		$('.design-page-model .panel-model .list .one').draggable({
			connectToSortable : ".panel-container",
			helper : "clone",
			revert : "invalid",
			drag : function() {
			},
			stop : function() {
			}
		});
		$('.design-page-model .input-model .list .one').draggable({
			connectToSortable : ".input-container",
			helper : "clone",
			revert : "invalid",
			drag : function() {
			},
			stop : function() {
			}
		});
	};

	app.design.initPanelModel = function() {
		var panel_models = PageApi.Panel.models;
		var $list = $('.design-page-model .panel-model .list');

		$list.empty();

		for ( var type in panel_models) {
			var model = panel_models[type];
			var name = model.settings.name;
			var $one = $('<div class="one"></div>');
			$one.append('<div class="title">' + name + '</div>');
			$one.attr('model-type', type);
			$list.append($one);
		}
	};
	app.design.initInputModel = function() {
		var input_models = PageApi.Panel.Input.models;
		var $list = $('.design-page-model .input-model .list');

		$list.empty();

		for ( var type in input_models) {
			var model = input_models[type];
			var name = model.settings.name;
			var $one = $('<div class="one"></div>');
			$one.append('<div class="title">' + name + '</div>');

			$one.attr('model-type', type);
			$list.append($one);
		}
	};
})();