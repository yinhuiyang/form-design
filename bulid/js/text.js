Object.assign(design, {
  textHtml: '<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">\n      <label for="doc-vld-name" class="title"><span></span></label>\n      <div class="subhead"></div>\n      <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue" pattern="" disabled/>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div>',
  textHtml1: '<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row">\n    <label for="doc-vld-name " class="title"><span></span>:</label>\n    <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue gridContent" pattern="" disabled/>\n  </div>\n  <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  textHtml2: '<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row2">\n      <label for="doc-vld-name " class="title"><span></span>:</label>\n      <div class="gridContent">\n        <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue" pattern="" disabled/>\n        <div class="subhead"></div>\n      </div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div>',
  textHtml3: '<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group ">\n  <label for="doc-vld-name " class="title" style="display: block;"><span></span>:</label>\n  <div class="am-form-row">\n    <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue gridContent" pattern="" disabled/>\n    <div class="subhead"></div>\n  </div>\n</div>\n<div class="delete"><i class="am-icon-trash"></i></div>\n</div>',
  textHtml4: '<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row">\n  <label for="doc-vld-name " class="title am-u-sm-3"><span></span>:</label>\n  <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue am-u-sm-6 gridContent" pattern="" disabled/>\n  <div class="subhead"></div>\n</div>\n<div class="delete"><i class="am-icon-trash"></i></div>\n</div>',
  textHtml5: '<div class="group" data-xhtml="text" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">\n  <label for="doc-vld-name" class="title"><span></span></label>\n  <input type="text" id="doc-vld-name"  placeholder="" class="am-form-field input nameValue" pattern="" disabled/>\n</div>\n<div class="delete"><i class="am-icon-trash"></i></div>\n</div>',
  textData: {
    title: '新输入框',
    id: '100',
    type: 'text',
    placeholder: '',
    name: '0text',
    subhead: '',
    labelGrid: '',
    inputGrid: '',
    grid: '12',
    maxLangth: '',
    minLangth: '',
    ComponentType: 'ThreeRowsAndOneColumn',
    data: {
      option: { reg: '', err: '' },
      value: '',
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  textLoad: function textLoad(page) {
    if (!page.id) {
      this.textData.id = app.getNumber();
      this.textData.name = parseInt(this.textData.name) + 1 + 'text';
      page = this.textData;
    }
    if (!page.ComponentType) {
      page.ComponentType = 'ThreeRowsAndOneColumn';
    }
    var html = '';
    if (page.ComponentType == 'ThreeRowsAndOneColumn') {
      html = $(this.textHtml);
    } else if (page.ComponentType == 'OneRowAndTwoColumns') {
      html = $(this.textHtml1);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
        page.inputGrid = 9;
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid);
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.textHtml2);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
        page.inputGrid = 9;
      } else {
        page.inputGrid = 12 - page.labelGrid;
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
    } else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.textHtml3);
      if (!page.inputGrid && page.inputGrid != '0') {
        page.inputGrid = 8;
      }
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
      html.find('.subhead').addClass('am-u-sm-' + (12 - page.inputGrid));
    } else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.textHtml4);
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
      html = $(this.textHtml5);
    }
    html.attr('id', page.id);
    html.attr({ 'data-xdata': JSON.stringify({
        ifWrite: page.data.ifWrite,
        ifShow: page.data.ifShow,
        ifEditor: page.data.ifEditor,
        maxLangth: page.maxLangth,
        minLangth: page.minLangth,
        ComponentType: page.ComponentType,
        labelGrid: page.labelGrid,
        inputGrid: page.inputGrid
      }), 'data-option': JSON.stringify(page.data.option) });
    html.find('.subhead').html(page.subhead);
    html.find('label span').html(page.title);
    if (page.data.ifWrite) {
      html.find('label').append('<sup class="am-text-danger">*</sup>');
    }
    html.addClass('am-u-sm-' + (page.grid ? page.grid : 12));
    html.find('.delete').hide();
    html.find('label').attr('for', page.id + 1);
    html.find('input').attr({ 'placeholder': page.placeholder, 'id': page.id + 1, 'value': page.data.value, 'name': page.name });
    return html[0].outerHTML;
  }
});