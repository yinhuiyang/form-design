var app = {
  appendCSS: function (css) {
    document.writeln('<link rel="stylesheet" type="text/css" href="' + css + '" />');
  },
  appendJS: function (js) {
    document.writeln('<script type="text/javascript" src="' + js + '"></script>')
  }
}


app.appendJS('./resource/js/designtool.js')
app.appendJS('./resource/js/service.js')
app.appendJS('./resource/page/js/setData.js')
app.appendJS('./resource/design/js/design.js')
app.appendJS('./resource/page/js/component/form.js')
app.appendJS('./resource/page/js/component/inputRadio.js')
app.appendJS('./resource/page/js/component/text.js')
app.appendJS('./resource/page/js/component/textarea.js')
app.appendJS('./resource/page/js/component/select.js')
app.appendJS('./resource/page/js/component/checkbox.js')
app.appendJS('./resource/page/js/component/datetimepicker.js')

// var from ={
// 	"panels": [{
// 		"title": "费用申请",
// 		"id": "1000",
// 		"type": "panel",
// 		"content": []
// 	}]}

	var from ={"panels":[]}

// console.log('main')
