Object.assign(design, {
  datetimepickerHtml: '<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> \n    <div class="am-form-group">\n      <label for="doc-vld-name" class="title"><span></span></label>\n      <div class="subhead"></div>\n          <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly " disabled/>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div></div>',
  datetimepickerHtml1: '<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> \n    <div class="am-form-group am-form-row">\n      <label for="doc-vld-name" class="title"><span></span>:</label>\n      <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly gridContent" disabled/>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div></div>',
  datetimepickerHtml2: '<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> \n    <div class="am-form-group am-form-row2">\n      <label for="doc-vld-name" class="title"><span></span>:</label>\n      <div class="gridContent">\n        <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly" disabled/>\n        <div class="subhead"></div>\n      </div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div></div>',
  datetimepickerHtml3: '<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> \n    <div class="am-form-group">\n      <label for="doc-vld-name" class="title"><span></span>:</label>\n      <div class="am-form-row">\n        <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly gridContent" disabled/>\n        <div class="subhead"></div>\n      </div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div></div>',
  datetimepickerHtml4: '<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> \n    <div class="am-form-group am-form-row">\n      <label for="doc-vld-name" class="title"><span></span>:</label>\n      <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly gridContent" disabled/>\n      <div class="subhead"></div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div></div>',
  datetimepickerHtml5: '<div class="group" data-xhtml="datetimepicker" data-xdata="{ifWrite: flase, ifShow: true, ifEditor: true}" data-option="" data-type=""> \n    <div class="am-form-group">\n      <label for="doc-vld-name" class="title"><span></span></label>\n      <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly" disabled/>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div></div>',
  datetimepickerData: {
    title: '新日期',
    id: '100',
    type: 'datetimepicker',
    placeholder: '日期选择',
    name: '0datetimepicker',
    subhead: '',
    labelGrid: '',
    inputGrid: '',
    grid: '12',
    ComponentType: 'ThreeRowsAndOneColumn',
    data: {
      value: '',
      pickerType: 'allpicker',
      option: { lang: 'ch', step: 60, datepicker: true, timepicker: true, format: 'Y-m-d H:i' },
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  datetimepickerLoad: function datetimepickerLoad(page) {
    if (!page.id) {
      this.datetimepickerData.id = app.getNumber();
      this.datetimepickerData.name = parseInt(this.datetimepickerData.name) + 1 + 'datatimepicker';
      page = this.datetimepickerData;
    }
    if (!page.ComponentType) {
      page.ComponentType = 'ThreeRowsAndOneColumn';
    }
    var html = '';
    if (page.ComponentType == 'ThreeRowsAndOneColumn') {
      html = $(this.datetimepickerHtml);
    } else if (page.ComponentType == 'OneRowAndTwoColumns') {
      html = $(this.datetimepickerHtml1);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
        page.inputGrid = 9;
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid);
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.datetimepickerHtml2);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
        page.inputGrid = 9;
      } else {
        page.inputGrid = 12 - page.labelGrid;
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
    } else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.datetimepickerHtml3);
      if (!page.inputGrid && page.inputGrid != '0') {
        page.inputGrid = 8;
      }
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
      html.find('.subhead').addClass('am-u-sm-' + (12 - page.inputGrid));
    } else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.datetimepickerHtml4);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
      }
      if (!page.inputGrid && page.inputGrid != '0') {
        page.inputGrid = 6;
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
      html.find('.subhead').addClass('am-u-sm-' + (12 - page.labelGrid - page.inputGrid));
    } else if (page.ComponentType == 'TwoRowsAndOneColumn') {
      html = $(this.datetimepickerHtml5);
    }
    html.attr('id', page.id);
    html.attr({ 'data-xdata': JSON.stringify({
        ifWrite: page.data.ifWrite,
        ifShow: page.data.ifShow,
        ifEditor: page.data.ifEditor,
        ComponentType: page.ComponentType,
        labelGrid: page.labelGrid,
        inputGrid: page.inputGrid
      }),
      'data-option': JSON.stringify(page.data.option),
      'data-type': page.data.pickerType
    });
    html.find('.subhead').html(page.subhead);
    if (page.data.ifWrite) {
      html.find('label').append('<sup class="am-text-danger">*</sup>');
    }
    html.addClass('am-u-sm-' + (page.grid ? page.grid : 12));
    html.find('label span').html(page.title);
    html.find('.delete').hide();
    html.find('label').attr('for', page.id + 1);
    html.find('input').attr({ 'placeholder': page.placeholder, 'id': page.id + 1, 'value': page.data.value, 'name': page.name });
    return html[0].outerHTML;
  }
});