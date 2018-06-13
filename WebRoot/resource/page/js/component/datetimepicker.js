Object.assign(design, {
  datetimepickerHtml: `<div class="group" data-xhtml="datetimepicker" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"> 
    <div class="am-form-group  am-datepicker-date">
      <label for="doc-vld-name"></label>
      <div class="am-input-group">
      <input type="text" id="dtp" data-date-format="yyyy-mm-dd hh:ii" class="am-form-field" readonly/>
      <span class="am-input-group-btn am-datepicker-add-on">
      <button class="am-btn am-btn-default" type="button">
          <span class="am-icon-calendar"></span>
      </button>
      </div>
    </div></div>`,
    datetimepickerData: {
    title: '新日期',
    id: 'datetimepicker01',
    type: 'datetimepicker',
    placeholder: '日期选择'
  },
  datetimepickerLoad (page) {
    this.datetimepickerData.id = app.getNumber()
    if (!page.id) {
      page = this.datetimepickerData
    }
    let html = $(this.datetimepickerHtml).attr('id', page.id)
    html.find('label').html(page.title+':')
    html.find('label').attr('for', page.id)
    html.find('input').attr({'placeholder': page.placeholder, 'id': page.id})
    return html[0].outerHTML
  }
})