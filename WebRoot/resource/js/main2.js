var app = {
  appendCSS: function (css) {
    document.writeln('<link rel="stylesheet" type="text/css" href="' + css + '" />');
  },
  appendJS: function (js) {
    document.writeln('<script type="text/javascript" src="' + js + '"></script>')
  }
}
app.appendJS('./resource/js/tool.js')
app.appendJS('./resource/design/js/design2.js')
app.appendJS('./resource/page/js/component/panel.js')
app.appendJS('./resource/page/js/component/inputRadio.js')
app.appendJS('./resource/page/js/component/text.js')
var from = {
  title: '新表单',
  id:'01',
  panels: [
    {
      title: '费用申请',
      id: '1000',
      type: 'panel',
      content: [
        {
          title: '费用用途',
          id: '100012',
          type: 'radio',
          data: {
            name: 'purpose',
            value: [{value:'dineTogether', name: '聚餐'}, {value:'fare', name: '车费'},{value:'accommodation', name: '住宿'}]
          }
        }
      ]
    }
  ]
}
console.log('main')