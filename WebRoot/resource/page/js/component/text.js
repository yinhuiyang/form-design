Object.assign(design, {
  textHtml: `<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="subhead"></div>
      <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue" pattern="" disabled/>
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
    data:{
      option: {reg: '', err: ''},
      value: '',
      ifWrite: true,
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
    let html = $(this.textHtml).attr('id', page.id)
    html.attr({'data-xdata': JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor: page.data.ifEditor}), 'data-option': JSON.stringify(page.data.option)})
    html.find('.subhead').html(page.subhead)
    html.find('label span').html(page.title)
    if (page.data.ifWrite){
      html.find('label').append('<sup class="am-text-danger">*</sup>')
    }
    html.find('.delete').hide()
    html.find('label').attr('for', page.id+1)
    html.find('input').attr({'placeholder': page.placeholder, 'id': page.id+1, 'value': page.data.value, 'name': page.name})
    return html[0].outerHTML
  }
})