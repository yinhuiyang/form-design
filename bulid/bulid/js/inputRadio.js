var _radioData;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.assign(design, {
  radioHtml: '<div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">\n    <h3 class="title"><span></span></h3>\n    <div class="subhead"></div>\n    <div class="label"></div>\n  </div>\n  <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  radioHtml1: '<div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row3">\n      <h3 class="title"><span></span></h3>\n      <div class="label gridContent"></div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  radioHtml2: '<div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row3">\n      <h3 class="title"><span></span></h3>\n      <div class="gridContent">\n        <div class="label"></div>\n        <div class="subhead"></div>\n      </div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  radioHtml3: '\n  <div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">\n      <h3 class="title"><span></span></h3>\n      <div class="am-form-row3">\n        <div class="label gridContent"></div>\n        <div class="subhead"></div>\n      </div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  radioHtml4: '\n  <div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row3">\n      <h3 class="title am-u-sm-3"><span></span></h3>\n      <div class="label gridContent"></div>\n      <div class="subhead"></div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  radioHtml5: '\n  <div class="group" data-xhtml="radio" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">\n    <h3 class="title"><span></span></h3>\n    <div class="label"></div>\n  </div>\n  <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  radioData: (_radioData = {
    name: '单选组',
    title: '单选组',
    id: '100012',
    type: 'radio'
  }, _defineProperty(_radioData, 'name', '0radio'), _defineProperty(_radioData, 'subhead', ''), _defineProperty(_radioData, 'labelGrid', ''), _defineProperty(_radioData, 'inputGrid', ''), _defineProperty(_radioData, 'grid', '12'), _defineProperty(_radioData, 'ComponentType', 'ThreeRowsAndOneColumn'), _defineProperty(_radioData, 'labelArrange', 'longitudinal'), _defineProperty(_radioData, 'data', {
    value: [{ value: '选项一', name: '选项一' }, { value: '选项二', name: '选项二' }, { value: '选项三', name: '选项三' }],
    ifWrite: false,
    ifShow: true,
    ifEditor: true
  }), _radioData),
  radioDataLoad: function radioDataLoad(page) {
    if (!page.id) {
      this.radioData.id = app.getNumber();
      this.radioData.name = parseInt(this.radioData.name) + 1 + 'radio';
      page = this.radioData;
    }
    if (!page.ComponentType) {
      page.ComponentType = 'ThreeRowsAndOneColumn';
    }
    var html = '';
    if (page.ComponentType == 'ThreeRowsAndOneColumn') {
      html = $(this.radioHtml);
    } else if (page.ComponentType == 'OneRowAndTwoColumns') {
      html = $(this.radioHtml1);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
        page.inputGrid = 9;
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid);
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.radioHtml2);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
        page.inputGrid = 9;
      } else {
        page.inputGrid = 12 - page.labelGrid;
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
    } else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.radioHtml3);
      if (!page.inputGrid && page.inputGrid != '0') {
        page.inputGrid = 8;
      }
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
      html.find('.subhead').addClass('am-u-sm-' + (12 - page.inputGrid));
    } else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.radioHtml4);
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
      html = $(this.radioHtml5);
    }
    html.attr('id', page.id);
    html.find('.subhead').html(page.subhead);
    html.find('.title span').text(page.title);
    html.find('.delete').hide();
    if (page.data.ifWrite) {
      html.find('.title').append('<sup class="am-text-danger">*</sup>');
    }
    html.addClass('am-u-sm-' + (page.grid ? page.grid : 12));
    html.attr('data-xdata', JSON.stringify({
      ifWrite: page.data.ifWrite,
      ifShow: page.data.ifShow,
      ifEditor: page.data.ifEditor,
      ComponentType: page.ComponentType,
      labelGrid: page.labelGrid,
      inputGrid: page.inputGrid,
      labelArrange: page.labelArrange
    }));
    page.data.value.forEach(function (element) {
      var label = '<label class="' + (page.labelArrange == 'transverse' ? 'am-radio-inline' : 'am-radio') + '">\n          <input type="radio" name="' + page.name + '" class ="nameValue" value="' + element.value + '" data-am-ucheck  disabled>' + element.name + '\n        </label>';
      var $label = $(label);
      $label.find('input').attr('checked', element.checked);
      html.find('.am-form-group .label').append($label[0]);
    });
    return html[0].outerHTML;
  }
});