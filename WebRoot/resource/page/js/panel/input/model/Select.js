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
		this.$inputBox.append('<select/>');

	};

	Input.settings = {
		name : "下拉框",
		columns : [ {
			title : {
				label : "标题",
				type : 'text'
			}
		} ]
	};

	PageApi.Panel.Input.add('SELECT', Input);

})();