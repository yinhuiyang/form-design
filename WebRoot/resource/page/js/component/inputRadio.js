Object.assign(design,{
  radioHtml: `<div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
    <h3 class="title"><span></span></h3>
    <div class="subhead"></div>
    <div class="label"></div>
  </div>
  <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  radioData: {
    name: '单选组',
    title: '单选组',
    id: '100012',
    type: 'radio',
    name: '0radio',
    subhead: '',
    grid: '12',
    data: {
      value: [{value:'选项一', name: '选项一'}, {value:'选项二', name: '选项二'},{value:'选项三', name: '选项三'}],
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  radioDataLoad (page) {
    if (!page.id) {
      this.radioData.id = app.getNumber()
      this.radioData.name = `${parseInt(this.radioData.name)+1}radio`
      page = this.radioData  
    }
    let html = $(this.radioHtml).attr('id', page.id)
    html.find('.subhead').html(page.subhead)
    html.find('.title span').text(page.title)
    html.find('.delete').hide()
    if (page.data.ifWrite){
      html.find('.title').append('<sup class="am-text-danger">*</sup>')
    }
    html.addClass(`am-u-sm-${page.grid?page.grid: 12}`)
    html.attr('data-xdata', JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor: page.data.ifEditor}))
    page.data.value.forEach(element => {
      let label = `<label class="am-radio">
          <input type="radio" name="${page.name}" class ="nameValue" value="${element.value}" data-am-ucheck  disabled>${element.name}
        </label>`
      let $label = $(label)
      $label.find('input').attr('checked', element.checked)
      html.find('.am-form-group .label').append($label[0])
    })
    return html[0].outerHTML
  }
})