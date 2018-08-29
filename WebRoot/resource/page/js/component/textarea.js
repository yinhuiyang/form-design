Object.assign(design, {
  textareaHtml: `<div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="subhead"></div>
      <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue" disabled></textarea>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  textareaHtml1:`
  <div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row2">
      <label for="doc-vld-name" class="title am-u-sm-3"><span></span></label>
      <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue" disabled></textarea>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  textareaHtml2:`
  <div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row2">
      <label for="doc-vld-name" class="title am-u-sm-3"><span></span></label>
      <div class="am-form-input9">
        <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue" disabled></textarea>
        <div class="subhead"></div>
      </div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  textareaHtml3:`
  <div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="am-form-row2">
        <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue" disabled></textarea>
        <div class="subhead  am-u-sm-4"></div>
      </div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  textareaHtml4:`
  <div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row2">
      <label for="doc-vld-name" class="title am-u-sm-3"><span></span></label>
      <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue" disabled></textarea>
      <div class="subhead  am-u-sm-4"></div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  textareaHtml5:`
  <div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue" disabled></textarea>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  textareaData: {
    title: '新文本域',
    id: '100',
    type: 'textarea',
    placeholder: '',
    name: '0textarea',
    subhead: '',
    grid: '12',
    maxLangth: '',
    minLangth:'',
    ComponentType: 'ThreeRowsAndOneColumn',
    data: {
      value: '',
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  textareaLoad (page) {
    if (!page.id) {
      this.textareaData.id = app.getNumber()
      this.textareaData.name = `${parseInt(this.textareaData.name)+1}textarea`
      page = this.textareaData
    }
    let html =  ''
    if (page.ComponentType == 'OneRowAndTwoColumns'){
      html = $(this.textareaHtml1)
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.textareaHtml2)
    }else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.textareaHtml3)
    }else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.textareaHtml4)
    }else if (page.ComponentType == 'TwoRowsAndOneColumn') {
      html = $(this.textareaHtml5)
    }else {
      html = $(this.textareaHtml)
    }
    html.attr({'id': page.id, 'data-xdata': JSON.stringify({ifWrite: page.data.ifWrite,ifShow:page.data.ifShow,ifEditor:page.data.ifEditor, maxLangth: page.maxLangth, minLangth: page.minLangth, ComponentType: page.ComponentType})})
    html.find('.title span').html(page.title)
    html.find('.subhead').html(page.subhead)
    html.find('label span').html(page.title)
    if (page.data.ifWrite){
      html.find('label').append('<sup class="am-text-danger">*</sup>')
    }
    html.addClass(`am-u-sm-${page.grid?page.grid: 12}`)
    html.find('.delete').hide()
    html.find('label').attr('for', page.id+1)
    html.find('textarea').attr({'placeholder': page.placeholder, 'id': page.id+1, 'value' :page.data.value ,name: page.name})
    html.find('textarea').html(page.data.value)
    return html[0].outerHTML
  }
})