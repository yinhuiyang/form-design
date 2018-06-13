Object.assign(design, {
  textareaHtml: `<div class="group" data-xhtml="textarea"><div class="am-form-group">
      <label for="doc-vld-name"></label>
      <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field"/>
    </div></div>`,
  textareaData: {
    title: '新文本域',
    id: '100',
    type: 'textarea',
    placeholder: '输入内容'
  },
  textareaLoad (page) {
    this.textareaData.id = app.getNumber()
    if (!page.id) {
      page = this.textareaData
    }
    let html = $(this.textareaHtml).attr('id', page.id)
    html.find('label').html(page.title+':')
    html.find('label').attr('for', page.id)
    html.find('textarea').attr({'placeholder': page.placeholder, 'id': page.id})
    return html[0].outerHTML
  }
})