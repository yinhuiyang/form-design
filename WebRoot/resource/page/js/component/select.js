Object.assign(design, {
  selectHtml: `<div class="group" data-xhtml="select"  data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"> <div class="am-form-group">
      <label for="" class="title"><span></span></label>
      <div class="subhead"></div>
      <select id="" class="am-form-field nameValue" disabled/>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
    selectHtml1:`<div class="group" data-xhtml="select"  data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"> <div class="am-form-group am-form-row">
        <label for="" class="title"><span></span>:</label>
        <select id="" class="am-form-field nameValue gridContent" disabled/>
      </div>
      <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
    selectHtml2:`<div class="group" data-xhtml="select"  data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"> <div class="am-form-group am-form-row2">
        <label for="" class="title "><span></span>:</label>
        <div class="gridContent">
          <select id="" class="am-form-field nameValue" disabled/>
          <div class="subhead"></div>
        </div>
      </div>
      <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
    selectHtml3:`<div class="group" data-xhtml="select"  data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"> <div class="am-form-group">
        <label for="" class="title"><span></span>:</label>
        <div class=" am-form-row">
          <select id="" class="am-form-field nameValue gridContent" disabled/>
          <div class="subhead"></div>
        </div>
      </div>
      <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
    selectHtml4: `<div class="group" data-xhtml="select"  data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"> <div class="am-form-group am-form-row">
        <label for="" class="title "><span></span>:</label>
        <select id="" class="am-form-field nameValue gridContent" disabled/>
        <div class="subhead"></div>
      </div>
      <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
    selectHtml5: `<div class="group" data-xhtml="select"  data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"> <div class="am-form-group">
    <label for="" class="title"><span></span></label>
    <select id="" class="am-form-field nameValue" disabled/>
  </div>
  <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
    selectData: {
      title: '新下拉框',
      id: '100013',
      type: 'select',
      name: '0select',
      subhead: '',
      labelGrid: '',
      inputGrid: '',
      grid: '12',
      ComponentType: 'ThreeRowsAndOneColumn',
      data: {
        value: [{value:'单选一', name: '单选一', selected: true}, {value:'单选二', name: '单选二', selected: false},{value:'单选三', name: '单选三', selected: false}],
        ifWrite: false,
        ifShow: true,
        ifEditor: true
      }
  },
  selectLoad (page) {
    if (!page.id) {
      this.selectData.id = app.getNumber()
      this.selectData.name = `${parseInt(this.selectData.name)+1}select`
      page = this.selectData 
    }
    if (!page.ComponentType) {
      page.ComponentType = 'ThreeRowsAndOneColumn'
    }
    let html =  ''
    if (page.ComponentType == 'ThreeRowsAndOneColumn') {
      html = $(this.selectHtml)
    } else if (page.ComponentType == 'OneRowAndTwoColumns'){
      html = $(this.selectHtml1)
      if (!page.labelGrid&& page.labelGrid != '0'){
        page.labelGrid = 3
        page.inputGrid = 9
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid)
      }
      html.find('.title').addClass(`am-u-sm-${page.labelGrid}`)
      html.find('.gridContent').addClass(`am-u-sm-${page.inputGrid}`)
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.selectHtml2)
      if (!page.labelGrid&& page.labelGrid != '0'){
        page.labelGrid = 3
        page.inputGrid = 9
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid)
      }
      html.find('.title').addClass(`am-u-sm-${page.labelGrid}`)
      html.find('.gridContent').addClass(`am-u-sm-${page.inputGrid}`)
    }else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.selectHtml3)
      if (!page.inputGrid && page.inputGrid != '0'){
        page.inputGrid = 8
      }
      html.find('.gridContent').addClass(`am-u-sm-${page.inputGrid}`)
      html.find('.subhead').addClass(`am-u-sm-${12-page.inputGrid}`)
    }else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.selectHtml4)
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
      html = $(this.selectHtml5)
    } 
    html.attr('id', page.id)
    html.find('.subhead').html(page.subhead)
    html.find('.title span').text(page.title)
    html.find('.nameValue').attr( 'name', page.name)
    if (page.data.ifWrite){
      html.find('label').append('<sup class="am-text-danger">*</sup>')
    }
    html.addClass(`am-u-sm-${page.grid?page.grid: 12}`)
    html.find('.delete').hide()
    html.find('label').attr({'for': page.id+1})
    html.find('select').attr({'id': page.id+1})
    html.attr('data-xdata', JSON.stringify({
      ifWrite: page.data.ifWrite, 
      ifShow: page.data.ifShow, 
      ifEditor:page.data.ifEditor, 
      ComponentType: page.ComponentType,
      labelGrid: page.labelGrid,
      inputGrid: page.inputGrid,
    }))
    page.data.value.forEach(element => {
      let label = `<option value="${element.value}" >${element.name}</option>`
      let $label = $(label)
      $label.attr('selected', element.selected)
      html.find('select').append($label[0])
    })
    return html[0].outerHTML
  }
})