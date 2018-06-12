(function() {
	var html = '';
	html += '<div class="page-api">';
	html += '	<div class="page-header">';
	html += '	</div>';
	html += '	<div class="page-body">';
	html += '		<div class="panel-container">';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
	var Page = function(settings) {
		this.settings = settings || {};
		this.init();
	};

	Page.prototype.init = function() {
		var settings = this.settings;
		this.page = settings.page;
		this.data = settings.data;
		this.$page = $(html);
		this.$panelContainer = this.$page.find('.panel-container');
	};
	console.log(Page)
	Page.prototype.initView = function() {
		var page = this.page;
		var data = this.data;
		this.$page.find('.page-header').append(page.title);
	};

	Page.prototype.initPanel = function() {
		var page = this.page;
		var data = this.data;
		var this_ = this;
		$(page.panels).each(function(index, panel) {
			var panelObject = Page.Panel.create({
				page : page,
				pageObject : this_,
				panel : panel,
				data : data
			});

			var $panel = panelObject.build();

			this_.$panelContainer.append($panel);
		});
	};

	Page.prototype.build = function() {
		this.initView();
		this.initPanel();

		return this.$page;
	};

	Page.settings = {
		columns : [ {
			title : {
				label : "标题",
				type : 'text'
			}
		} ]
	};

	Page.create = function(settings) {
		return new Page(settings);
	};

	window.PageApi = Page;
})()