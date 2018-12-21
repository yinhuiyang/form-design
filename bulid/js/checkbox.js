Object.assign(design, {
  checkboxHtml: '<div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">\n    <h3 class="title"><span></span></h3>\n    <div class="subhead"></div>\n    <div class="label nameValue"> </div>\n  </div>\n  <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  checkboxHtml1: '\n  <div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row3">\n    <h3 class="title"><span></span></h3>\n    <div class="label nameValue gridContent"></div>\n  </div>\n  <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  checkboxHtml2: '\n  <div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row3">\n    <h3 class="title "><span></span></h3>\n    <div class="gridContent">\n      <div class="label nameValue"></div>\n      <div class="subhead"></div>\n    </div>\n  </div>\n  <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  checkboxHtml3: '\n  <div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">\n    <h3 class="title"><span></span></h3>\n    <div class="am-form-row3">\n      <div class="label nameValue gridContent"></div>\n      <div class="subhead"></div>\n    </div>\n  </div>\n  <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  checkboxHtml4: '\n  <div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row3">\n    <h3 class="title "><span></span></h3>\n    <div class="label nameValue gridContent"></div>\n    <div class="subhead"></div>\n  </div>\n  <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  checkboxHtml5: '\n  <div class="group" data-xhtml="checkbox" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">\n    <h3 class="title"><span></span></h3>\n    <div class="label nameValue"></div>\n  </div>\n  <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  checkboxData: {
    title: '多选组',
    id: '100014',
    type: 'checkbox',
    name: '0checkbox',
    subhead: '',
    labelGrid: '',
    inputGrid: '',
    grid: '12',
    ComponentType: 'ThreeRowsAndOneColumn',
    labelArrange: 'longitudinal',
    data: {
      value: [{ value: '多选项一', name: '多选项一' }, { value: '多选项二', name: '多选项二' }, { value: '多选项三', name: '多选项三' }],
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  checkboxLoad: function checkboxLoad(page) {
    if (!page.id) {
      this.checkboxData.id = app.getNumber();
      this.checkboxData.name = parseInt(this.checkboxData.name) + 1 + 'checkbox';
      page = this.checkboxData;
    }
    if (!page.ComponentType) {
      page.ComponentType = 'ThreeRowsAndOneColumn';
    }
    var html = '';
    if (page.ComponentType == 'ThreeRowsAndOneColumn') {
      html = $(this.checkboxHtml);
    } else if (page.ComponentType == 'OneRowAndTwoColumns') {
      html = $(this.checkboxHtml1);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
        page.inputGrid = 9;
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid);
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.checkboxHtml2);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
        page.inputGrid = 9;
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid);
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
    } else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.checkboxHtml3);
      if (!page.inputGrid && page.inputGrid != '0') {
        page.inputGrid = 8;
      }
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
      html.find('.subhead').addClass('am-u-sm-' + (12 - page.inputGrid));
    } else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.checkboxHtml4);
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
      html = $(this.checkboxHtml5);
    }
    html.attr('id', page.id);
    html.find('.subhead').html(page.subhead);
    html.find('.title span').text(page.title);
    html.find('.nameValue').attr('name', page.name);
    html.find('.delete').hide();
    html.addClass('am-u-sm-' + (page.grid ? page.grid : 12));
    if (page.data.ifWrite) {
      html.find('.title').append('<sup class="am-text-danger">*</sup>');
    }
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
      var label = '<label class="' + (page.labelArrange == 'transverse' ? 'am-checkbox-inline' : 'am-checkbox') + '">\n          <input type="checkbox"  value="' + element.value + '" data-am-ucheck  disabled>' + element.name + '\n        </label>';
      var $label = $(label);
      $label.find('input').attr('checked', element.checked);
      html.find('.am-form-group .label').append($label[0]);
    });
    return html[0].outerHTML;
  }
});