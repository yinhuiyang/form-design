(function() {
	var Input = function(settings) {
		PageApi.Panel.Input.call(this, settings);
	};
	(function() {
		var Super = function() {
		};
		Super.prototype = PageApi.Panel.Input.prototype;
		Input.prototype = new Super();
	})();

	Input.prototype.initContent = function() {
		this.$group.append('这个是文本输入框');
	};

	Input.config = {
		columns : [ {
			title : {
				label : "标题",
				type : 'text'
			}
		} ]
	};

	PageApi.Panel.Input.add('TEXT', Input);

})();