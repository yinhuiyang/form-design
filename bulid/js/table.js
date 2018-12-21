Object.assign(design, {
  tableHtml: '<div class="group" data-xhtml="table" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}">\n      <div class="am-panel am-panel-default nameValue" >\n        <header class="am-panel-hd">\n          <h3 class="am-panel-title" id="title"><span></span></h3>\n        </header>\n        <div class="am-panel-bd"  style="min-height: 100px;height: auto;">\n          <button type="button" class="am-btn am-btn-secondary am-radius am-disabled">\n            \u6DFB\u52A0\n            <i class="am-icon-plus"></i>\n          </button>\n          <button type="button" class="am-btn am-btn-danger am-radius am-disabled" >\n            \u5220\u9664\n            <i class="am-icon-trash"></i>\n          </button>\n          <table class="table_panel am-table am-table-bordered am-table-centered ">\n            <tr>\n            </tr>\n          </table>\n        </div>\n      </div>\n      <div class="delete"><i class="am-icon-trash"></i></div>\n    </div>',
  tableDtata: {
    title: '新表格面板',
    id: '110000',
    name: '0table',
    type: 'table',
    background: '#f5f5f5',
    content: []
  },
  tableType: {
    text: {
      option: { reg: '', err: '' },
      placeholder: '',
      maxLangth: '',
      minLangth: '',
      value: '',
      ifWrite: false,
      ifShow: true,
      ifEditor: true,
      ifCollect: false
    },
    select: {
      value: [{ value: '单选一', name: '单选一', selected: true }, { value: '单选二', name: '单选二', selected: false }, { value: '单选三', name: '单选三', selected: false }],
      ifWrite: false,
      ifShow: true,
      ifEditor: true,
      ifCollect: false
    },
    datetimepicker: {
      value: '',
      placeholder: '',
      pickerType: 'allpicker',
      option: { lang: 'ch', step: 60, datepicker: true, timepicker: true, format: 'Y-m-d H:i' },
      ifWrite: false,
      ifShow: true,
      ifEditor: true,
      ifCollect: false
    }
  },
  tableLaod: function tableLaod(page) {
    if (!page.id) {
      this.tableDtata.id = app.getNumber();
      this.tableDtata.name = parseInt(this.tableDtata.name) + 1 + 'table';
      page = this.tableDtata;
    }
    var $html = $(this.tableHtml);
    $html.attr('id', page.id);
    $html.attr('data-titleBackground', page.background);
    $html.find('.nameValue').attr({ 'name': page.name });
    $html.find('.am-panel-hd').css({ "background": page.background, 'color': '#fff' });
    if (page.background == '#f5f5f5') {
      $html.find('.am-panel-hd').css({ 'color': '#444' });
    }
    if (!page.content.length) {
      for (var i = 0; i < 4; i++) {
        var thHtml = '<th class="th-item">\u8BF7\u8F93\u5165\u6807\u9898</th>';
        var $thHtml = $(thHtml);
        $thHtml.attr({
          'data-text': JSON.stringify(this.tableType.text),
          'data-select': JSON.stringify(this.tableType.select),
          'data-datetimepicker': JSON.stringify(this.tableType.datetimepicker),
          'name': i + 'item',
          'data-type': ''
        });
        $html.find('tr').append($thHtml);
      }
    } else {
      for (var _i = 0; _i < page.content.length; _i++) {
        var _thHtml = '<th class="th-item">' + page.content[_i].titleTh + '</th>';
        var _$thHtml = $(_thHtml);
        var text = {};
        var select = {};
        var datetimepicker = {};
        if (page.content[_i].type == 'text') {
          $.extend(true, text, this.tableType.text);
          $.extend(true, select, this.tableType.select);
          $.extend(true, datetimepicker, this.tableType.datetimepicker);
          text.option = page.content[_i].data.option;
          text.placeholder = page.content[_i].placeholder;
          text.value = page.content[_i].data.value;
          text.ifWrite = page.content[_i].data.ifWrite;
          text.ifShow = page.content[_i].data.ifShow;
          text.ifEditor = page.content[_i].data.ifEditor;
          text.ifCollect = page.content[_i].data.ifCollect;
          text.maxLangth = page.content[_i].maxLangth;
          text.minLangth = page.content[_i].minLangth;
        } else if (page.content[_i].type == 'select') {
          $.extend(true, text, this.tableType.text);
          $.extend(true, select, this.tableType.select);
          $.extend(true, datetimepicker, this.tableType.datetimepicker);
          select.value = page.content[_i].data.value;
          select.ifWrite = page.content[_i].data.ifWrite;
          select.ifShow = page.content[_i].data.ifShow;
          select.ifEditor = page.content[_i].data.ifEditor;
          select.ifCollect = page.content[_i].data.ifCollect;
        } else {
          $.extend(true, text, this.tableType.text);
          $.extend(true, select, this.tableType.select);
          $.extend(true, datetimepicker, this.tableType.datetimepicker);
          datetimepicker.option = page.content[_i].data.option;
          datetimepicker.placeholder = page.content[_i].placeholder;
          datetimepicker.pickerType = page.content[_i].data.pickerType;
          datetimepicker.value = page.content[_i].data.value;
          datetimepicker.ifWrite = page.content[_i].data.ifWrite;
          datetimepicker.ifShow = page.content[_i].data.ifShow;
          datetimepicker.ifEditor = page.content[_i].data.ifEditor;
          datetimepicker.ifCollect = page.content[_i].data.ifCollect;
        }
        _$thHtml.attr({
          'data-text': JSON.stringify(text),
          'data-select': JSON.stringify(select),
          'data-datetimepicker': JSON.stringify(datetimepicker),
          'name': page.content[_i].name,
          'data-type': page.content[_i].type
        });
        if (page.content[_i].data.ifWrite) {
          _$thHtml.append('<sup class="am-text-danger">*</sup>');
        }
        $html.find('tr').append(_$thHtml);
      }
    }
    $html.find('#title span').text(page.title);
    return $html;
  }
});