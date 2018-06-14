Object.assign(design, {
  textHtml: `<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span>:</label>
      <div class="subhead"></div>
      <input type="text" id="doc-vld-name" placeholder="" class="am-form-field input" pattern="" disabled/>
    </div></div>`,
  textData: {
    title: '新输入框',
    id: '100',
    type: 'text',
    placeholder: '',
    name: 'text01',
    subhead: '',
    data:{
      option: {reg: '', err: ''},
      value: '',
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }  
  },
  textLoad (page) {
    this.textData.id = app.getNumber()
    if (!page.id) {
      page = this.textData
    }
    let html = $(this.textHtml).attr('id', page.id)
    html.attr({'data-xdata': JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor: page.data.ifEditor}), 'data-option': JSON.stringify(page.data.option)})
    html.find('.subhead').html(page.subhead)
    html.find('label span').html(page.title)
    html.find('label').attr('for', page.id+1)
    html.find('input').attr({'placeholder': page.placeholder, 'id': page.id+1, 'value': page.data.value})
    return html[0].outerHTML
  }
})