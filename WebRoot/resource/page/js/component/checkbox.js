Object.assign(design,{
  checkboxHtml: `<div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
    <h3 class="title"><span></span></h3>
    <div class="subhead"></div>
    <div class="label nameValue"></div>
  </div>
  <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  checkboxHtml1:`
  <div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row3">
    <h3 class="title am-u-sm-3"><span></span></h3>
    <div class="label nameValue"></div>
  </div>
  <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  checkboxHtml2:`
  <div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row3">
    <h3 class="title am-u-sm-3"><span></span></h3>
    <div class="am-form-input9">
      <div class="label nameValue"></div>
      <div class="subhead"></div>
    </div>
  </div>
  <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  checkboxHtml3:`
  <div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
    <h3 class="title"><span></span></h3>
    <div class="am-form-row3">
      <div class="label nameValue"></div>
      <div class="subhead am-u-sm-4"></div>
    </div>
  </div>
  <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  checkboxHtml4: `
  <div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row3">
    <h3 class="title am-u-sm-3"><span></span></h3>
    <div class="label nameValue"></div>
    <div class="subhead am-u-sm-4"></div>
  </div>
  <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  checkboxHtml5: `
  <div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
    <h3 class="title"><span></span></h3>
    <div class="label nameValue"></div>
  </div>
  <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  checkboxData: {
    title: '多选组',
    id: '100014',
    type: 'checkbox',
    name: '0checkbox',
    subhead: '',
    grid: '12',
    ComponentType: 'ThreeRowsAndOneColumn',
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
    if (!page.ComponentType) {
      page.ComponentType = 'ThreeRowsAndOneColumn'
    }
    let html =  ''
    if (page.ComponentType == 'ThreeRowsAndOneColumn') {
      html = $(this.checkboxHtml)
    } else if (page.ComponentType == 'OneRowAndTwoColumns'){
      html = $(this.checkboxHtml1)
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.checkboxHtml2)
    }else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.checkboxHtml3)
    }else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.checkboxHtml4)
    }else if (page.ComponentType == 'TwoRowsAndOneColumn') {
      html = $(this.checkboxHtml5)
    }
    html.attr('id', page.id)
    html.find('.subhead').html(page.subhead)
    html.find('.title span').text(page.title)
    html.find('.nameValue').attr('name',page.name)
    html.find('.delete').hide()
    html.addClass(`am-u-sm-${page.grid?page.grid: 12}`)
    if (page.data.ifWrite){
      html.find('.title').append('<sup class="am-text-danger">*</sup>')
    }
    html.attr('data-xdata', JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor:page.data.ifEditor, ComponentType: page.ComponentType}))
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