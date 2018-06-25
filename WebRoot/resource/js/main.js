var app = {
  appendCSS: function (css) {
    document.writeln('<link rel="stylesheet" type="text/css" href="' + css + '" />');
  },
  appendJS: function (js) {
    document.writeln('<script type="text/javascript" src="' + js + '"></script>')
  }
}

// app.appendJS('/resource/js/designtool.js')
// app.appendJS('/resource/js/service.js')
// app.appendJS('/resource/page/js/setData.js')
// app.appendJS('/resource/design/js/design.js')
// app.appendJS('/resource/page/js/component/form.js')
// app.appendJS('/resource/page/js/component/inputRadio.js')
// app.appendJS('/resource/page/js/component/text.js')
// app.appendJS('/resource/page/js/component/textarea.js')
// app.appendJS('/resource/page/js/component/select.js')
// app.appendJS('/resource/page/js/component/checkbox.js')
// app.appendJS('/resource/page/js/component/datetimepicker.js')

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

	var from ={"panels":[{"title":"费用申请","id":"1000","type":"panel","content":[{"id":"329897890706412","title":"新下拉框1","type":"select","name":"1select2","subhead":"3","data":{"ifWrite":true,"ifShow":true,"ifEditor":true,"value":[{"value":"单选一","name":"单选一","selected":false},{"value":"单选二","name":"单选二","selected":false},{"value":"单选三","name":"单选三","selected":true}]}}]}]}

// console.log('main')
