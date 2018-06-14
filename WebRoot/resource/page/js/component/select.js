Object.assign(design, {
  selectHtml: `<div class="group" data-xhtml="select"  data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"> <div class="am-form-group">
      <label for="doc-select-1" class="title"><span></span></label>
      <div class="subhead"></div>
      <select id="doc-select-1" class="am-form-field" disabled/>
    </div></div>`,
    selectData: {
      name: '新下拉框',
      title: '新下拉框',
      id: '100013',
      type: 'select',
      name: 'select01',
      subhead: '',
      data: {
        value: [{value:'单选一', name: '单选一'}, {value:'单选二', name: '单选二'},{value:'单选三', name: '单选三'}],
        ifWrite: true,
        ifShow: true,
        ifEditor: true
      }
  },
  selectLoad (page) {
    this.selectData.id = app.getNumber()
    if (!page.id) {
      page = this.selectData 
    }
    let html = $(this.selectHtml).attr('id', page.id)
    html.find('.subhead').html(page.subhead)
    html.find('.title span').text(page.title)
    if (page.data.ifWrite){
      html.find('label').append('<sup class="am-text-danger">*</sup>')
    }
    html.find('label').attr('for', page.id+1)
    html.attr('data-xdata', JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor:page.data.ifEditor}))
    page.data.value.forEach(element => {
      let label = `<option value="${element.value}" >${element.name}</option>`
      let $label = $(label)
      $label.find('option').attr('selected', element.selected)
      html.find('select').append($label[0])
    })
    return html[0].outerHTML
  }
})