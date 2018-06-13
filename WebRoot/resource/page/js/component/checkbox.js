Object.assign(design,{
  checkboxHtml: `<div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
    <h3><span></span></h3>
    <div class="subhead"></div>
    <div class="label"></div>
  </div></div>`,
  checkboxData: {
    name: '多选组',
    title: '多选组',
    id: '100014',
    type: 'checkbox',
    data: {
      name: 'checkbox01',
      value: [{value:'复选项一', name: '复选项一'}, {value:'复选项二', name: '复选项二'},{value:'复选项三', name: '复选项三'}],
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  checkboxLoad (page) {
    this.checkboxData.id = app.getNumber()
    if (!page.id) {
      page = this.checkboxData  
    }
    let html = $(this.checkboxHtml).attr('id', page.id)
    html.find('h3 span').text(page.title)
    if (page.data.ifWrite){
      html.find('h3').append('<sup class="am-text-danger">*</sup>')
    }
    html.attr('data-xdata', JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor:page.data.ifEditor}))
    page.data.value.forEach(element => {
      let label = `<label class="am-checkbox">
          <input type="checkbox" name="${page.id}" value="${element.value}" data-am-ucheck  disabled >${element.name}
        </label>`
      let $label = $(label)
      $label.find('input').attr('checked', element.checked)
      html.find('.am-form-group .label').append($label[0])
    })
    return html[0].outerHTML
  }
})