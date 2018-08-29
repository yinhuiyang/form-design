Object.assign(design, {
  imageHtml: `<div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="subhead"></div>
        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">
            <i class="am-icon-image"></i>
            <span>选择图片</span>
            <form class="upload-form" >
                <input type="file" id=""  class="am-form-field input nameValue"  disabled/>
            </form>
          </div>
      </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  imageHtml1:`
  <div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row">
      <label for="doc-vld-name" class="title am-u-sm-3"><span></span></label>
        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">
            <i class="am-icon-image"></i>
            <span>选择图片</span>
            <form class="upload-form" >
                <input type="file" id=""  class="am-form-field input nameValue"  disabled/>
            </form>
          </div>
      </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  imageHtml2:`
  <div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row2">
      <label for="doc-vld-name" class="title am-u-sm-3"><span></span></label>
      <div>
        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">
            <i class="am-icon-image"></i>
            <span>选择图片</span>
            <form class="upload-form" >
                <input type="file" id=""  class="am-form-field input nameValue"  disabled/>
            </form>
        </div>
        <div class="subhead"></div>
      </div>
      </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  imageHtml3:`
  <div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class=" am-form-row">
        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">
            <i class="am-icon-image"></i>
            <span>选择图片</span>
            <form class="upload-form" >
                <input type="file" id=""  class="am-form-field input nameValue"  disabled/>
            </form>
        </div>
        <div class="subhead am-u-sm-5"></div>
      </div>
      </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  imageHtml4:`
  <div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row">
      <label for="doc-vld-name" class="title am-u-sm-3"><span></span></label>
        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">
            <i class="am-icon-image"></i>
            <span>选择图片</span>
            <form class="upload-form" >
                <input type="file" id=""  class="am-form-field input nameValue"  disabled/>
            </form>
        </div>
        <div class="subhead am-u-sm-4"></div>
      </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  imageHtml5: `<div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">
            <i class="am-icon-image"></i>
            <span>选择图片</span>
            <form class="upload-form" >
                <input type="file" id=""  class="am-form-field input nameValue"  disabled/>
            </form>
          </div>
      </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  imageData: {
    title: '图片',
    id: '100',
    type: 'image',
    placeholder: '',
    name: '0image',
    subhead: '',
    grid: '12',
    ComponentType: 'ThreeRowsAndOneColumn',
    data:{
      value: '',
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  imageLoad (page) {
    if (!page.id) {
      this.imageData.id = app.getNumber()
      this.imageData.name = `${parseInt(this.imageData.name)+1}image`
      page = this.imageData
    }
    let html =  ''
    if (!page.ComponentType) {
      page.ComponentType = 'ThreeRowsAndOneColumn'
    }
    if(page.ComponentType == 'OneRowAndTwoColumns'){
      html = $(this.imageHtml1)
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.imageHtml2)
    }else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.imageHtml3)
    }else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.imageHtml4)
    }else if (page.ComponentType == 'TwoRowsAndOneColumn') {
      html = $(this.imageHtml5)
    } else {
      html = $(this.imageHtml)
    }
    html.attr('id', page.id)
    html.attr({'data-xdata': JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor: page.data.ifEditor, ComponentType: page.ComponentType}), 'data-option': JSON.stringify(page.data.option)})
    html.find('.subhead').html(page.subhead)
    html.find('label span').html(page.title)
    if (page.data.ifWrite){
      html.find('label').append('<sup class="am-text-danger">*</sup>')
    }
    html.addClass(`am-u-sm-${page.grid?page.grid: 12}`)
    html.find('.delete').hide()
    html.find('label').attr('for', page.id+'image')
    html.find('input').attr({'placeholder': page.placeholder, 'id': page.id+'image', 'value': page.data.value, 'name': page.name})
    return html[0].outerHTML
  }
})