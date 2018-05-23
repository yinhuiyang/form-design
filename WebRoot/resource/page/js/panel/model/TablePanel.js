(function() {
	var Panel = function(config) {
		PageApi.Panel.call(this, config);
	};
	(function() {
		var Super = function() {
		};
		Super.prototype = PageApi.Panel.prototype;
		Panel.prototype = new Super();
	})();

	Panel.prototype.initContent = function() {
		this.$panel.append('这个是表格面板');
	};

	Panel.config = {
		columns : [ {
			title : {
				label : "标题",
				type : 'text'
			}
		} ]
	};

	PageApi.Panel.add('TABLE', Panel);

})();