(function() {
	var Panel = function(settings) {
		PageApi.Panel.call(this, settings);
	};
	(function() {
		var Super = function() {
		};
		Super.prototype = PageApi.Panel.prototype;
		Panel.prototype = new Super();
	})();

	Panel.prototype.initContent = function() {
	};

	Panel.settings = {
		name : "列表面板",
		columns : [ {
			title : {
				label : "标题",
				type : 'text'
			}
		} ]
	};

	PageApi.Panel.add('TABLE', Panel);

})();