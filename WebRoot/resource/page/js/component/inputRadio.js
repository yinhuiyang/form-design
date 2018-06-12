Object.assign(design,{
  radioHtml: `<div class="group"><div class="am-form-group">
    <h3><span></span><sup class="am-text-danger">*</sup></h3>
    <div class="subhead"></div>
    <label class="am-radio">
      <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
    </label>
    <label class="am-radio">
      <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
    </label>
    <label class="am-radio">
      <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
    </label>
  </div></div>`,
  radioData: {
    name: '单选组',
    title: '单选组',
    id: '100012',
    type: 'radio',
    data: {
      name: 'radio01',
      value: [{value:'1', name: '选项一'}, {value:'1', name: '选项二'},{value:'1', name: '选项三'}]
    }
  },
  radioDataLoad (page) {
    this.radioData.id = app.getNumber()
    if (!page.id) {
      page = this.radioData  
    }
    let html = $(this.radioHtml).attr('id', page.id)
    html.find('h3 span').text(page.title)
    html.find('label').each((i, data) => {
      $(data).prepend(page.data.value[i].name)
      $(data).find('input').attr({'name': page.data.name, 'value': page.data.value[i].value})
      return data
    })
    // console.log(html[0].outerHTML)
    return html[0].outerHTML
  }
})