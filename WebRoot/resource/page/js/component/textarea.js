Object.assign(design, {
  textareaHtml: `<div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span>:</label>
      <div class="subhead"></div>
      <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue" disabled/>
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
    data: {
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
    let html = $(this.textareaHtml).attr({'id': page.id, 'data-xdata': JSON.stringify({ifWrite: page.data.ifWrite,ifShow:page.data.ifShow,ifEditor:page.data.ifEditor})})
    html.find('.title span').html(page.title)
    html.find('.subhead').html(page.subhead)
    html.find('label span').html(page.title)
    html.find('.delete').hide()
    html.find('label').attr('for', page.id+1)
    html.find('textarea').attr({'placeholder': page.placeholder, 'id': page.id+1, name: page.name})
    return html[0].outerHTML
  }
})