Object.assign(design, {
  datetimepickerHtml: `<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> 
    <div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="subhead"></div>
          <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly" disabled/>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div></div>`,
    datetimepickerHtml1:`<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> 
    <div class="am-form-group am-form-row">
      <label for="doc-vld-name" class="title am-u-sm-3"><span></span>:</label>
      <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly" disabled/>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div></div>`,
    datetimepickerHtml2:`<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> 
    <div class="am-form-group am-form-row2">
      <label for="doc-vld-name" class="title am-u-sm-3"><span></span>:</label>
      <div class="am-form-input9">
        <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly" disabled/>
        <div class="subhead"></div>
      </div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div></div>`,
    datetimepickerHtml3: `<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> 
    <div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span>:</label>
      <div class="am-form-row">
        <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly" disabled/>
        <div class="subhead am-u-sm-4"></div>
      </div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div></div>`,
    datetimepickerHtml4:`<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> 
    <div class="am-form-group am-form-row">
      <label for="doc-vld-name" class="title am-u-sm-3"><span></span>:</label>
      <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly" disabled/>
      <div class="subhead am-u-sm-4"></div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div></div>`,
    datetimepickerHtml5:`<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> 
    <div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
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
      grid: '12',
      ComponentType: 'ThreeRowsAndOneColumn',
      data:{
        value: '',
        pickerType:'allpicker',
        option: {lang: 'ch', step: 1,datepicker:true,timepicker:true,format:'Y-m-d H:i'},
        ifWrite: false,
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
    let html= ''
    if (page.ComponentType == 'ThreeRowsAndOneColumn') {
      html = $(this.datetimepickerHtml)
    } else if (page.ComponentType == 'OneRowAndTwoColumns'){
      html = $(this.datetimepickerHtml1)
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.datetimepickerHtml2)
    }else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.datetimepickerHtml3)
    }else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.datetimepickerHtml4)
    }else if (page.ComponentType == 'TwoRowsAndOneColumn') {
      html = $(this.datetimepickerHtml5)
    }
    html.attr('id', page.id)
    html.attr({'data-xdata': JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor: page.data.ifEditor, ComponentType: page.ComponentType}),
    'data-option': JSON.stringify(page.data.option),
    'data-type': page.data.pickerType
    })
    html.find('.subhead').html(page.subhead)
    if (page.data.ifWrite){
      html.find('label').append('<sup class="am-text-danger">*</sup>')
    }
    html.addClass(`am-u-sm-${page.grid?page.grid: 12}`)
    html.find('label span').html(page.title)
    html.find('.delete').hide()
    html.find('label').attr('for', page.id+1)
    html.find('input').attr({'placeholder': page.placeholder, 'id': page.id+1, 'value': page.data.value, 'name': page.name})
    return html[0].outerHTML
  }
})