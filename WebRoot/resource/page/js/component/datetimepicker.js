Object.assign(design, {
  datetimepickerHtml: `<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> 
    <div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="subhead"></div>
          <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly" disabled/>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div></div>`,
    datetimepickerData: {
      title: '新日期',
      id: '100',
      type: 'datetimepicker',
      placeholder: '日期选择',
      name: '0datetimepicker',
      subhead: '',
      data:{
        value: '',
        pickerType:'allpicker',
        option: {lang: 'ch', step: 1,datepicker:true,timepicker:true,format:'Y-m-d H:i'},
        ifWrite: true,
        ifShow: true,
        ifEditor: true
      } 
  },
  datetimepickerLoad (page) {
    if (!page.id) {
      this.datetimepickerData.id = app.getNumber()
      this.datetimepickerData.name = `${parseInt(this.datetimepickerData.name)+1}datatimepicker`
      page = this.datetimepickerData
    }
    let html = $(this.datetimepickerHtml).attr('id', page.id)
    html.attr({'data-xdata': JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor: page.data.ifEditor}),
    'data-option': JSON.stringify(page.data.option),
    'data-type': page.data.pickerType
    })
    html.find('.subhead').html(page.subhead)
    if (page.data.ifWrite){
      html.find('label').append('<sup class="am-text-danger">*</sup>')
    }
    html.find('label span').html(page.title)
    html.find('.delete').hide()
    html.find('label').attr('for', page.id+1)
    html.find('input').attr({'placeholder': page.placeholder, 'id': page.id+1, 'value': page.data.value, 'name': page.name})
    return html[0].outerHTML
  }
})