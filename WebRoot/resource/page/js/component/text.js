Object.assign(design, {
  textHtml: `<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="subhead"></div>
      <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue" pattern="" disabled/>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  textHtml1: `<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row">
    <label for="doc-vld-name " class="title am-u-sm-3"><span></span>:</label>
    <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue am-u-sm-9 am-form-input9" pattern="" disabled/>
  </div>
  <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  textHtml2: `<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row2">
      <label for="doc-vld-name " class="title am-u-sm-3"><span></span>:</label>
      <div class="am-form-input9">
        <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue" pattern="" disabled/>
        <div class="subhead"></div>
      </div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  textHtml3:`<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group ">
  <label for="doc-vld-name " class="title" style="display: block;"><span></span>:</label>
  <div class="am-form-row">
    <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue am-form-input8" pattern="" disabled/>
    <div class="subhead am-u-sm-4"></div>
  </div>
</div>
<div class="delete"><i class="am-icon-trash"></i></div>
</div>`,
  textHtml4:`<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row">
  <label for="doc-vld-name " class="title am-u-sm-3"><span></span>:</label>
  <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue am-form-input6" pattern="" disabled/>
  <div class="subhead am-u-sm-4"></div>
</div>
<div class="delete"><i class="am-icon-trash"></i></div>
</div>`,
  textHtml5:`<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">
  <label for="doc-vld-name" class="title"><span></span></label>
  <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue" pattern="" disabled/>
  <div class="subhead am-u-sm-4"></div>
</div>
<div class="delete"><i class="am-icon-trash"></i></div>
</div>`,
  textData: {
    title: '新输入框',
    id: '100',
    type: 'text',
    placeholder: '',
    name: '0text',
    subhead: '',
    grid: '12',
    maxLangth: '',
    minLangth:'',
    ComponentType: 'ThreeRowsAndOneColumn',
    data:{
      option: {reg: '', err: ''},
      value: '',
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  textLoad (page) {
    if (!page.id) {
      this.textData.id = app.getNumber()
      this.textData.name = `${parseInt(this.textData.name)+1}text`
      page = this.textData
    }
    if (!page.ComponentType) {
      page.ComponentType = 'ThreeRowsAndOneColumn'
    }
    let html =  ''
    if (page.ComponentType == 'ThreeRowsAndOneColumn') {
      html = $(this.textHtml)
    } else if (page.ComponentType == 'OneRowAndTwoColumns'){
      html = $(this.textHtml1)
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.textHtml2)
    }else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.textHtml3)
    }else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.textHtml4)
    }else if (page.ComponentType == 'TwoRowsAndOneColumn') {
      html = $(this.textHtml5)
    }
    html.attr('id', page.id)
    html.attr({'data-xdata': JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor: page.data.ifEditor, maxLangth: page.maxLangth, minLangth: page.minLangth, ComponentType: page.ComponentType}), 'data-option': JSON.stringify(page.data.option)})
    html.find('.subhead').html(page.subhead)
    html.find('label span').html(page.title)
    if (page.data.ifWrite){
      html.find('label').append('<sup class="am-text-danger">*</sup>')
    }
    html.addClass(`am-u-sm-${page.grid?page.grid: 12}`)
    html.find('.delete').hide()
    html.find('label').attr('for', page.id+1)
    html.find('input').attr({'placeholder': page.placeholder, 'id': page.id+1, 'value': page.data.value, 'name': page.name})
    return html[0].outerHTML
  }
})