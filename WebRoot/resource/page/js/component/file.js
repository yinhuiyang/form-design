Object.assign(design, {
  fileHtml: `<div class="group" data-xhtml="file" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="subhead"></div>
      <div class="upload-btn x-btn nameValue" style="border: 1px solid #ccc;">
          <i class="am-icon-cloud-upload"></i>
          <span>选择文件</span>
          <form class="upload-form">
            <input type="file" id="doc-vld-name"  class="am-form-field input nameValue" name="" disabled/>
          </form>
      </div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  fileHtml1:`
  <div class="group" data-xhtml="file" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="gridContent">
        <div class="upload-btn x-btn nameValue " style="border: 1px solid #ccc;">
          <i class="am-icon-cloud-upload"></i>
          <span>选择文件</span>
          <form class="upload-form">
            <input type="file" id="doc-vld-name"  class="am-form-field input nameValue" name="" disabled/>
          </form>
        </div>
      </div>
      
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  fileHtml2:`
  <div class="group" data-xhtml="file" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row2">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="gridContent">
        <div class="upload-btn x-btn nameValue" style="border: 1px solid #ccc;">
            <i class="am-icon-cloud-upload"></i>
            <span>选择文件</span>
            <form class="upload-form">
              <input type="file" id="doc-vld-name"  class="am-form-field input nameValue" name="" disabled/>
            </form>
        </div>
        <div class="subhead"></div>
      </div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  fileHtml3:`
  <div class="group" data-xhtml="file" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="am-form-row2">
        <div class="gridContent">
          <div class="upload-btn x-btn nameValue " style="border: 1px solid #ccc;">
              <i class="am-icon-cloud-upload"></i>
              <span>选择文件</span>
              <form class="upload-form">
                <input type="file" id="doc-vld-name"  class="am-form-field input nameValue" name="" disabled/>
              </form>
          </div>
        </div>
        <div class="subhead"></div>
      </div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  fileHtml4:`
  <div class="group" data-xhtml="file" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row2">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="gridContent">
        <div class="upload-btn x-btn nameValue " style="border: 1px solid #ccc;">
            <i class="am-icon-cloud-upload"></i>
            <span>选择文件</span>
            <form class="upload-form">
              <input type="file" id="doc-vld-name"  class="am-form-field input nameValue" name="" disabled/>
            </form>
        </div>
      </div>
      
      <div class="subhead"></div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  fileHtml5:`
  <div class="group" data-xhtml="file" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="upload-btn x-btn nameValue" style="border: 1px solid #ccc;">
          <i class="am-icon-cloud-upload"></i>
          <span>选择文件</span>
          <form class="upload-form">
            <input type="file" id="doc-vld-name"  class="am-form-field input nameValue" name="" disabled/>
          </form>
      </div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  fileData: {
    title: '附件',
    id: '100',
    type: 'file',
    placeholder: '',
    name: '0file',
    subhead: '',
    labelGrid: '',
    inputGrid: '',
    grid: '12',
    ComponentType: 'ThreeRowsAndOneColumn',
    data:{
      value: '',
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  fileLoad (page) {
    if (!page.id) {
      this.fileData.id = app.getNumber()
      this.fileData.name = `${parseInt(this.fileData.name)+1}file`
      page = this.fileData
    }
    if (!page.ComponentType) {
      page.ComponentType = 'ThreeRowsAndOneColumn'
    }
    let html =  ''
    if (page.ComponentType == 'ThreeRowsAndOneColumn') {
      html = $(this.fileHtml)
    } else if (page.ComponentType == 'OneRowAndTwoColumns'){
      html = $(this.fileHtml1)
      if (!page.labelGrid&& page.labelGrid != '0'){
        page.labelGrid = 3
        page.inputGrid = 9
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid)
      }
      html.find('.title').addClass(`am-u-sm-${page.labelGrid}`)
      html.find('.gridContent').addClass(`am-u-sm-${page.inputGrid}`)
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.fileHtml2)
      if (!page.labelGrid&& page.labelGrid != '0'){
        page.labelGrid = 3
        page.inputGrid = 9
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid)
      }
      html.find('.title').addClass(`am-u-sm-${page.labelGrid}`)
      html.find('.gridContent').addClass(`am-u-sm-${page.inputGrid}`)
    }else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.fileHtml3)
      if (!page.inputGrid && page.inputGrid != '0'){
        page.inputGrid = 8
      }
      html.find('.gridContent').addClass(`am-u-sm-${page.inputGrid}`)
      html.find('.subhead').addClass(`am-u-sm-${12-page.inputGrid}`)
    }else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.fileHtml4)
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
      html = $(this.fileHtml5)
    }
    html.attr('id', page.id)
    html.attr({'data-xdata': JSON.stringify({
      ifWrite: page.data.ifWrite, 
      ifShow: page.data.ifShow, 
      ifEditor: page.data.ifEditor, 
      ComponentType: page.ComponentType,
      labelGrid: page.labelGrid,
      inputGrid: page.inputGrid,
    }), 'data-option': JSON.stringify(page.data.option)})
    html.find('.subhead').html(page.subhead)
    html.find('label span').html(page.title)
    if (page.data.ifWrite){
      html.find('label').append('<sup class="am-text-danger">*</sup>')
    }
    html.addClass(`am-u-sm-${page.grid?page.grid:12}`)
    html.find('.delete').hide()
    html.find('label').attr('for', page.id+'file')
    html.find('.nameValue').attr( {'name': page.name})
    html.find('input').attr({'placeholder': page.placeholder, 'id': page.id+'file', 'value': page.data.value})
    return html[0].outerHTML
  }
})