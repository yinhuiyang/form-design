Object.assign(design,{
  checkboxHtml: `<div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
    <h3 class="title"><span></span></h3>
    <div class="subhead"></div>
    <div class="label"></div>
  </div></div>`,
  checkboxData: {
    name: '多选组',
    title: '多选组',
    id: '100014',
    type: 'checkbox',
    name: 'checkbox01',
    subhead: '',
    data: {
      value: [{value:'多选项一', name: '多选项一'}, {value:'多选项二', name: '多选项二'},{value:'多选项三', name: '多选项三'}],
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
    html.find('.subhead').html(page.subhead)
    html.find('.title span').text(page.title)
    if (page.data.ifWrite){
      html.find('.title').append('<sup class="am-text-danger">*</sup>')
    }
    html.attr('data-xdata', JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor:page.data.ifEditor}))
    page.data.value.forEach(element => {
      let label = `<label class="am-checkbox">
          <input type="checkbox" name="${page.name}" value="${element.value}" data-am-ucheck  disabled>${element.name}
        </label>`
      let $label = $(label)
      $label.find('input').attr('checked', element.checked)
      html.find('.am-form-group .label').append($label[0])
    })
    return html[0].outerHTML
  }
})