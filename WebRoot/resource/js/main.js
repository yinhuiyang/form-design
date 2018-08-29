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
app.appendJS('./resource/page/js/component/file.js')
app.appendJS('./resource/page/js/component/image.js')
app.appendJS('./resource/page/js/component/table.js')
app.appendJS('./resource/page/js/component/user.js')
app.appendJS('./resource/page/js/component/organize.js')

// var from ={
// 	"panels": [{
// 		"title": "费用申请",
// 		"id": "1000",
// 		"type": "panel",
// 		"content": [
      
//     ]
// 	}]}
var from ={"panels": []}
	// var from ={"panels":[
  //   {
  //     title: '新表格面板',
  //     id: '110000',
  //     name: '0table',
  //     type: 'table',
  //     content: [
  //       {
  //         titleTh: '出发时间',
  //         title:'',
  //         id: '100',
  //         type: 'datetimepicker',
  //         placeholder: '日期选择',
  //         name: '0datetimepicker',
  //         subhead: '',
  //         grid: '12',
  //         data:{
  //           value: '',
  //           pickerType:'allpicker',
  //           option: {lang: 'ch', step: 1,datepicker:true,timepicker:true,format:'Y-m-d H:i'},
  //           ifWrite: false,
  //           ifShow: true,
  //           ifEditor: true,
  //           ifCollect: false
  //         }
  //       },
  //       {
  //         titleTh: '出发地点',
  //         id: '100',
  //         type: 'text',
  //         placeholder: '',
  //         name: '0text',
  //         subhead: '',
  //         grid: '12',
  //         data:{
  //           option: {reg: '', err: ''},
  //           value: '',
  //           ifWrite: false,
  //           ifShow: true,
  //           ifEditor: true,
  //           ifCollect: false
  //         }
  //       },
  //       {
  //         titleTh: '到达地点',
  //         id: '100',
  //         type: 'text',
  //         placeholder: '',
  //         name: '0text',
  //         subhead: '',
  //         grid: '12',
  //         data:{
  //           option: {reg: '', err: ''},
  //           value: '',
  //           ifWrite: false,
  //           ifShow: true,
  //           ifEditor: true,
  //           ifCollect: false
  //         }
  //       },
  //       {
  //         titleTh: '交通工具',
  //         id: '100013',
  //         type: 'select',
  //         name: '0select',
  //         subhead: '',
  //         grid: '12',
  //         data: {
  //           value: [{value:'单选一', name: '单选一', selected: true}, {value:'单选二', name: '单选二', selected: false},{value:'单选三', name: '单选三', selected: false}],
  //           ifWrite: true,
  //           ifShow: false,
  //           ifEditor: false,
  //           ifCollect: false
  //         }
  //       },
  //     ],
  //   }
  // ]}
// var from = {"panels":[{"title":"新表格面板","id":"110000","type":"table","name":"0table","content":[{"id":"","title":"","name":"0datetimepicker","titleTh":"出发时间","type":"datetimepicker","data":{"value":"","option":{"lang":"ch","step":1,"datepicker":true,"timepicker":false,"format":"Y-m-d"},"pickerType":"datepicker","ifWrite":true,"ifShow":true,"ifEditor":true,"ifCollect":false},"placeholder":"日期选择"},{"id":"","title":"","name":"0text","titleTh":"出发地点","type":"text","data":{"value":"","option":{"reg":"","err":""},"ifWrite":false,"ifShow":true,"ifEditor":true,"ifCollect":false},"placeholder":""},{"id":"","title":"","name":"0text","titleTh":"到达地点","type":"text","data":{"value":"","option":{"reg":"","err":""},"ifWrite":false,"ifShow":true,"ifEditor":true,"ifCollect":false},"placeholder":""},{"id":"","title":"","name":"0select","titleTh":"交通工具","type":"select","data":{"value":[{"value":"单选一","name":"单选一","selected":true},{"value":"单选二","name":"单选二","selected":false},{"value":"单选三","name":"单选三","selected":false}],"ifWrite":true,"ifShow":false,"ifEditor":false,"ifCollect":false}}]}]}
// console.log('main')
// var from = {"panels":[{"title":"这是新面板","id":"335080186868741","type":"form","name":"","background":"#f5f5f5","content":[{"id":"335080188542872","title":"选择用户","type":"user","name":"1user","grid":"12","subhead":"","data":{"ifWrite":false,"ifShow":true,"ifEditor":true,"value":[],"ifChoice":"radio"}},{"id":"335080394069971","title":"选择组织","type":"organize","name":"1organize","grid":"12","subhead":"","data":{"ifWrite":false,"ifShow":true,"ifEditor":true,"value":[],"ifChoice":"radio"}}]}]}
