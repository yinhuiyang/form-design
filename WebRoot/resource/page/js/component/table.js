Object.assign(design, {
  tableHtml: `<div class="group" data-xhtml="table" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}">
      <div class="am-panel am-panel-default nameValue" >
        <header class="am-panel-hd">
          <h3 class="am-panel-title" id="title"><span></span></h3>
        </header>
        <div class="am-panel-bd"  style="min-height: 100px;height: auto;">
          <button type="button" class="am-btn am-btn-secondary am-radius am-disabled">
            添加
            <i class="am-icon-plus"></i>
          </button>
          <button type="button" class="am-btn am-btn-danger am-radius am-disabled" >
            删除
            <i class="am-icon-trash"></i>
          </button>
          <table class="table_panel am-table am-table-bordered am-table-centered ">
            <tr>
            </tr>
          </table>
        </div>
      </div>
      <div class="delete"><i class="am-icon-trash"></i></div>
    </div>`,
  tableDtata: {
    title: '新表格面板',
    id: '110000',
    name: '0table',
    type: 'table',
    content: [],
  },
  tableType : {
    text: {
        option: {reg: '', err: ''},
        placeholder: '',
        value: '',
        ifWrite: false,
        ifShow: true,
        ifEditor: true,
        ifCollect: false
    },
    select: {
        value: [{value:'单选一', name: '单选一', selected: true}, {value:'单选二', name: '单选二', selected: false},{value:'单选三', name: '单选三', selected: false}],
        ifWrite: false,
        ifShow: true,
        ifEditor: true,
        ifCollect: false
    },
    datetimepicker: {
        value: '2018-12-01',
        placeholder: '',
        pickerType:'allpicker',
        option: {lang: 'ch', step: 1,datepicker:true,timepicker:true,format:'Y-m-d H:i'},
        ifWrite: false,
        ifShow: true,
        ifEditor: true,
        ifCollect: false
    }
  },
  tableLaod (page) {
    if (!page.id) {
      this.tableDtata.id = app.getNumber()
      this.tableDtata.name = `${parseInt(this.tableDtata.name)+1}table`
      page = this.tableDtata
    }
    let $html = $(this.tableHtml)
    $html.attr('id', page.id)
    $html.find('.nameValue').attr({'name': page.name})
    if (!page.content.length) {
      for (let i = 0; i< 4; i++) {
        let thHtml = `<th class="th-item">请输入标题</th>`
        let $thHtml = $(thHtml)
        $thHtml.attr({
          'data-text': JSON.stringify(this.tableType.text), 
          'data-select': JSON.stringify(this.tableType.select), 
          'data-datetimepicker': JSON.stringify(this.tableType.datetimepicker), 
          'name': i+'th',
          'data-type': ''
        })
        $html.find('tr').append($thHtml)
      }
    } else {
      for (let i = 0; i < page.content.length; i++) {
        let thHtml = `<th class="th-item">${page.content[i].titleTh}</th>`
        let $thHtml = $(thHtml)
        var text =  {}
        var select = {}
        var datetimepicker = {}
        if (page.content[i].type == 'text') {
          $.extend(true, text, this.tableType.text)
          $.extend(true, select, this.tableType.select)
          $.extend(true, datetimepicker, this.tableType.datetimepicker)
          text.option = page.content[i].data.option
          text.placeholder = page.content[i].placeholder
          text.value = page.content[i].data.value
          text.ifWrite = page.content[i].data.ifWrite
          text.ifShow = page.content[i].data.ifShow
          text.ifEditor = page.content[i].data.ifEditor
          text.ifCollect = page.content[i].data.ifCollect
        } else if (page.content[i].type == 'select') {
          $.extend(true, text, this.tableType.text)
          $.extend(true, select, this.tableType.select)
          $.extend(true, datetimepicker, this.tableType.datetimepicker)
          select.value = page.content[i].data.value
          select.ifWrite = page.content[i].data.ifWrite
          select.ifShow = page.content[i].data.ifShow
          select.ifEditor = page.content[i].data.ifEditor
          select.ifCollect = page.content[i].data.ifCollect
        } else {
          $.extend(true, text, this.tableType.text)
          $.extend(true, select, this.tableType.select)
          $.extend(true, datetimepicker, this.tableType.datetimepicker)
          datetimepicker.option = page.content[i].data.option
          datetimepicker.placeholder = page.content[i].placeholder
          datetimepicker.pickerType = page.content[i].data.pickerType
          datetimepicker.value = page.content[i].data.value
          datetimepicker.ifWrite = page.content[i].data.ifWrite
          datetimepicker.ifShow = page.content[i].data.ifShow
          datetimepicker.ifEditor = page.content[i].data.ifEditor
          datetimepicker.ifCollect = page.content[i].data.ifCollect
        }
        $thHtml.attr({
          'data-text': JSON.stringify(text), 
          'data-select': JSON.stringify(select), 
          'data-datetimepicker': JSON.stringify(datetimepicker),
          'name': page.content[i].name,
          'data-type': page.content[i].type
        })
        if (page.content[i].data.ifWrite) {
          $thHtml.append('<sup class="am-text-danger">*</sup>')  
        }
        $html.find('tr').append($thHtml)
      }
    }
    $html.find('#title span').text(page.title)
    return $html
  }
})