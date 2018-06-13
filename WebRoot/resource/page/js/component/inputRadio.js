Object.assign(design,{
  radioHtml: `<div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
    <h3><span></span></h3>
    <div class="subhead"></div>
    <div class="label"></div>
  </div></div>`,
  radioData: {
    name: '单选组',
    title: '单选组',
    id: '100012',
    type: 'radio',
    data: {
      name: 'radio01',
      value: [{value:'选项一', name: '选项一'}, {value:'选项二', name: '选项二'},{value:'选项三', name: '选项三'}],
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  radioDataLoad (page) {
    this.radioData.id = app.getNumber()
    if (!page.id) {
      page = this.radioData  
    }
    let html = $(this.radioHtml).attr('id', page.id)
    html.find('h3 span').text(page.title)
    if (page.data.ifWrite){
      html.find('h3').append('<sup class="am-text-danger">*</sup>')
    }
    html.attr('data-xdata', JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor:page.data.ifEditor}))
    page.data.value.forEach(element => {
      let label = `<label class="am-radio">
          <input type="radio" name="${page.id}" value="${element.value}" data-am-ucheck  disabled class="am-ucheck-radio">${element.name}
          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
        </label>`
      let $label = $(label)
      $label.find('input').attr('checked', element.checked)
      html.find('.am-form-group .label').append($label[0])
    })
    return html[0].outerHTML
  }
})