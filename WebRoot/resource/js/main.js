(function() {
	var app = new Object();
	app.appendCSS = function(css) {
		document.writeln('<link rel="stylesheet" type="text/css" href="' + css + '" />');
	};

	app.appendJS = function(js) {
		document.writeln('<script type="text/javascript" src="' + js + '"></script>');
	};

	app.appendJS('./resource/js/tool.js');

	app.appendCSS('./resource/page/css/index.css');
	app.appendJS('./resource/page/js/index.js');
	app.appendJS('./resource/page/js/panel/index.js');
	app.appendJS('./resource/page/js/panel/model/Base.js');
	app.appendJS('./resource/page/js/panel/model/Table.js');

	app.appendJS('./resource/page/js/panel/input/index.js');
	app.appendJS('./resource/page/js/panel/input/model/Text.js');

	app.appendCSS('./resource/design/css/design.css');
	app.appendJS('./resource/design/js/design.js');

})();

$(function() {
	var page = {
		title : "费用申请",
		panels : [ {
			type : "BASE",
			title : "基本信息填写",
			inputs : [ {
				type : "TEXT",
				label : "姓名",
				name : "name"
			}, {
				type : "TEXT",
				label : "姓名",
				name : "name"
			} ]
		}, {
			type : "TABLE",
			title : "费用明细填写",
			inputs : [ {
				type : "TEXT",
				label : "姓名",
				name : "name"
			}, {
				type : "TEXT",
				label : "姓名",
				name : "name"
			} ]
		} ]
	};

	var pageObject = new PageApi({
		page : page
	});

	var $page = pageObject.build();
	$('body').append($page);
});