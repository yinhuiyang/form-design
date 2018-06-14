Object.assign(design,{
  checkboxHtml: `<div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
    <h3 class="title"><span></span></h3>
    <div class="subhead"></div>
    <div class="label nameValue"></div>
  </div>
  <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  checkboxData: {
    name: '多选组',
    title: '多选组',
    id: '100014',
    type: 'checkbox',
    name: '0checkbox',
    subhead: '',
    data: {
      value: [{value:'多选项一', name: '多选项一'}, {value:'多选项二', name: '多选项二'},{value:'多选项三', name: '多选项三'}],
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  checkboxLoad (page) {
    if (!page.id) {
      this.checkboxData.id = app.getNumber()
      this.checkboxData.name = `${parseInt(this.checkboxData.name)+1}checkbox`
      page = this.checkboxData  
    }
    let html = $(this.checkboxHtml).attr('id', page.id)
    html.find('.subhead').html(page.subhead)
    html.find('.title span').text(page.title)
    html.find('.nameValue').attr('name',page.name)
    html.find('.delete').hide()
    if (page.data.ifWrite){
      html.find('.title').append('<sup class="am-text-danger">*</sup>')
    }
    html.attr('data-xdata', JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor:page.data.ifEditor}))
    page.data.value.forEach(element => {
      let label = `<label class="am-checkbox">
          <input type="checkbox"  value="${element.value}" data-am-ucheck  disabled>${element.name}
        </label>`
      let $label = $(label)
      $label.find('input').attr('checked', element.checked)
      html.find('.am-form-group .label').append($label[0])
    })
    return html[0].outerHTML
  }
})