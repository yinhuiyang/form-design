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
		this.$inputBox.append('<input/>');

	};

	Input.settings = {
		name : "文本输入框",
		columns : [ {
			name : "label",
			label : "标签",
			type : 'text'
		}, {
			name : "name",
			label : "名称",
			type : 'text'
		} ]
	};

	PageApi.Panel.Input.add('TEXT', Input);

})();