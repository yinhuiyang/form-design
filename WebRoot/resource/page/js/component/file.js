Object.assign(design, {
  fileHtml: `<div class="group" data-xhtml="file" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">
      <label for="doc-vld-name" class="title"><span></span></label>
      <div class="subhead"></div>
        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">
            <i class="am-icon-cloud-upload"></i>
            <span>选择文件</span>
            <form class="upload-form" action="https://up.qbox.me/" enctype="multipart/form-data" method="post" >
                <input type="file" id="doc-vld-name"  class="am-form-field input nameValue" name="file" class="upload-btn-input" multiple="multiple" disabled/>
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
    grid: '12',
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
    let html = $(this.fileHtml).attr('id', page.id)
    html.attr({'data-xdata': JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor: page.data.ifEditor}), 'data-option': JSON.stringify(page.data.option)})
    html.find('.subhead').html(page.subhead)
    html.find('label span').html(page.title)
    if (page.data.ifWrite){
      html.find('label').append('<sup class="am-text-danger">*</sup>')
    }
    html.addClass(`am-u-sm-${page.grid?page.grid:12}`)
    html.find('.delete').hide()
    html.find('label').attr('for', page.id+1)
    html.find('input').attr({'placeholder': page.placeholder, 'id': page.id+1, 'value': page.data.value, 'name': page.name})
    return html[0].outerHTML
  }
})