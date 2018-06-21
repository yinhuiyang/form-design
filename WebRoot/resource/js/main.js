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
// app.appendJS('/resource/page/js/component/panel.js')
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

var from = {
  title: '新表单',
  id:'01',
  panels: [
    {
      title: '费用申请',
      id: '1000',
      type: 'form',
      name:'formMoney',
      content: [
        {
          title: '费用用途',
          id: '100012',
          type: 'radio',
          name: 'money',
          subhead: '费用',
          data: {
            value: [{value:'聚餐', name: '聚餐', checked: 'checked'}, {value:'车费', name: '车费', checked: false},{value:'住宿', name: '住宿', checked: false}],
            ifWrite: true,
            ifShow: true,
            ifEditor: true
          }
        }
      ]
    },
    {
      title: '请假申请',
      id: '1001',
      type: 'form',
      name:'formLeave',
      content: [
        {
          title: '请假事由',
          id: '100013',
          type: 'radio',
          name: 'leave',
          subhead: '请假',
          data: {
            value: [{value:'调休', name: '调休', checked: 'checked'}, {value:'病假', name: '病假', checked: false},{value:'年假', name: '年假', checked: false}],
            ifWrite: true,
            ifShow: true,
            ifEditor: true
          }
        }
      ]
    }
  ]
}
// console.log('main')
