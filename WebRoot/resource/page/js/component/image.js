Object.assign(design, {
  imageHtml: `<div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="subhead"></div>
        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">
            <i class="am-icon-image"></i>
            <span>选择图片</span>
            <form class="upload-form" action="https://up.qbox.me/" enctype="multipart/form-data" method="post" >
                <input type="file" id="doc-vld-name"  class="am-form-field input nameValue" name="file" accept=".jpg,.jpeg,.png,.gif" class="upload-btn-input" multiple="multiple" disabled/>
            </form>
          </div>
      </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  imageData: {
    title: '图片',
    id: '100',
    type: 'file',
    placeholder: '',
    name: '0image',
    subhead: '',
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
    let html = $(this.imageHtml).attr('id', page.id)
    html.attr({'data-xdata': JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor: page.data.ifEditor}), 'data-option': JSON.stringify(page.data.option)})
    html.find('.subhead').html(page.subhead)
    html.find('label span').html(page.title)
    if (page.data.ifWrite){
      html.find('label').append('<sup class="am-text-danger">*</sup>')
    }
    html.find('.delete').hide()
    html.find('label').attr('for', page.id+1)
    html.find('input').attr({'placeholder': page.placeholder, 'id': page.id+1, 'value': page.data.value, 'name': page.name})
    return html[0].outerHTML
  }
})