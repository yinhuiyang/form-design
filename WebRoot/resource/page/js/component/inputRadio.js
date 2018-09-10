Object.assign(design,{
  radioHtml: `<div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
    <h3 class="title"><span></span></h3>
    <div class="subhead"></div>
    <div class="label"></div>
  </div>
  <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  radioHtml1:`<div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row3">
      <h3 class="title"><span></span></h3>
      <div class="label gridContent"></div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  radioHtml2:`<div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row3">
      <h3 class="title"><span></span></h3>
      <div class="gridContent">
        <div class="label"></div>
        <div class="subhead"></div>
      </div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  radioHtml3:`
  <div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
      <h3 class="title"><span></span></h3>
      <div class="am-form-row3">
        <div class="label gridContent"></div>
        <div class="subhead"></div>
      </div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  radioHtml4:`
  <div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row3">
      <h3 class="title am-u-sm-3"><span></span></h3>
      <div class="label gridContent"></div>
      <div class="subhead am-u-sm-4"></div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  radioHtml5: `
  <div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">
    <h3 class="title"><span></span></h3>
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
    labelGrid: '',
    inputGrid: '',
    grid: '12',
    ComponentType: 'ThreeRowsAndOneColumn',
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
    if (!page.ComponentType) {
      page.ComponentType = 'ThreeRowsAndOneColumn'
    }
    let html =  ''
    if (page.ComponentType == 'ThreeRowsAndOneColumn') {
      html = $(this.radioHtml)
    } else if (page.ComponentType == 'OneRowAndTwoColumns'){
      html = $(this.radioHtml1)
      if (!page.labelGrid&& page.labelGrid != '0'){
        page.labelGrid = 3
        page.inputGrid = 9
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid)
      }
      html.find('.title').addClass(`am-u-sm-${page.labelGrid}`)
      html.find('.gridContent').addClass(`am-u-sm-${page.inputGrid}`)
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.radioHtml2)
      if (!page.labelGrid&& page.labelGrid != '0'){
        page.labelGrid = 3
        page.inputGrid = 9
      } else {
        page.inputGrid = 12 - page.labelGrid
      }
      html.find('.title').addClass(`am-u-sm-${page.labelGrid}`)
      html.find('.gridContent').addClass(`am-u-sm-${page.inputGrid}`)
    }else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.radioHtml3)
      if (!page.inputGrid && page.inputGrid != '0'){
        page.inputGrid = 8
      }
      html.find('.gridContent').addClass(`am-u-sm-${page.inputGrid}`)
      html.find('.subhead').addClass(`am-u-sm-${12-page.inputGrid}`)
    }else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.radioHtml4)
      if (!page.labelGrid&& page.labelGrid != '0'){
        page.labelGrid = 3
      }
      if (!page.inputGrid&& page.inputGrid != '0'){
        page.inputGrid = 6
      }
      html.find('.title').addClass(`am-u-sm-${page.labelGrid}`)
      html.find('.gridContent').addClass(`am-u-sm-${page.inputGrid}`)
      html.find('.subhead').addClass(`am-u-sm-${12-page.labelGrid-page.inputGrid}`)
    }else if (page.ComponentType == 'TwoRowsAndOneColumn') {
      html = $(this.radioHtml5)
    }
    html.attr('id', page.id)
    html.find('.subhead').html(page.subhead)
    html.find('.title span').text(page.title)
    html.find('.delete').hide()
    if (page.data.ifWrite){
      html.find('.title').append('<sup class="am-text-danger">*</sup>')
    }
    html.addClass(`am-u-sm-${page.grid?page.grid: 12}`)
    html.attr('data-xdata', JSON.stringify({
      ifWrite: page.data.ifWrite, 
      ifShow: page.data.ifShow, 
      ifEditor: page.data.ifEditor, 
      ComponentType: page.ComponentType,
      labelGrid: page.labelGrid,
      inputGrid: page.inputGrid,
    }))
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