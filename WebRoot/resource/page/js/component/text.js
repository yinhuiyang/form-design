Object.assign(design, {
  textHtml: `<div class="group"><div class="am-form-group">
      <label for="doc-vld-name"></label>
      <input type="text" id="doc-vld-name" placeholder="" class="am-form-field"/>
    </div></div>`,
  textData: {
    title: '新输入框',
    id: '100',
    type: 'text',
    placeholder: '输入内容'
  },
  textLoad (page) {
    this.textData.id = app.getNumber()
    if (!page.id) {
      page = this.textData
    }
    let html = $(this.textHtml).attr('id', page.id)
    html.find('label').html(page.title+':')
    html.find('label').attr('for', page.id)
    html.find('input').attr({'placeholder': page.placeholder, 'id': page.id})
    return html[0].outerHTML
  }
})