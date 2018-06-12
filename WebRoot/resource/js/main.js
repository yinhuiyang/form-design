// import m from './resource/js/tool.js'
(function() {
	let app = new Object();
	window.app = app;

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
	app.appendJS('./resource/page/js/panel/input/model/Select.js');

	app.appendCSS('./resource/design/css/design.css');
	app.appendJS('./resource/design/js/design.js');

})();

$(function() {
	var page = {
		title : "费用申请",
		panels : [ {
			id : 10001,
			type : "BASE",
			title : "基本信息填写",
			inputs : [ {
				id : 10011,
				type : "TEXT",
				label : "姓名",
				name : "name"
			}, {
				id : 10009,
				type : "SELECT",
				label : "姓名",
				name : "name"
			} ]

		}, {
			id : 10002,
			type : "TABLE",
			title : "费用明细填写",
			inputs : [ {
				id : 10004,
				type : "TEXT",
				label : "姓名",
				name : "name"
			}, {
				id : 10007,
				type : "TEXT",
				label : "姓名",
				name : "name"
			} ]
		} ]
	};

	app.design.init({
		page : page
	});
});