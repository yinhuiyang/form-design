Object.assign(design, {
  textareaHtml: `<div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span>:</label>
      <div class="subhead"></div>
      <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input" disabled/>
    </div></div>`,
  textareaData: {
    title: '新文本域',
    id: '100',
    type: 'textarea',
    placeholder: '',
    name: '1textarea',
    data: {
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  textareaLoad (page) {
    this.textareaData.id = app.getNumber()
    if (!page.id) {
      page = this.textareaData
    }
    let html = $(this.textareaHtml).attr({'id': page.id, 'data-xdata': JSON.stringify({ifWrite: page.data.ifWrite,ifShow:page.data.ifShow,ifEditor:page.data.ifEditor})})
    html.find('.title span').html(page.title)
    html.find('label').attr('for', page.id+1)
    html.find('textarea').attr({'placeholder': page.placeholder, 'id': page.id+1,name: `${parseInt(page.name)+1}textarea`})
    return html[0].outerHTML
  }
})