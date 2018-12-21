Object.assign(design, {
  textareaHtml: '<div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">\n      <label for="doc-vld-name" class="title"><span></span></label>\n      <div class="subhead"></div>\n      <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue" disabled></textarea>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div>',
  textareaHtml1: '\n  <div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row2">\n      <label for="doc-vld-name" class="title"><span></span></label>\n      <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue gridContent" disabled></textarea>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div>',
  textareaHtml2: '\n  <div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row2">\n      <label for="doc-vld-name" class="title"><span></span></label>\n      <div class="gridContent">\n        <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue" disabled></textarea>\n        <div class="subhead"></div>\n      </div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div>',
  textareaHtml3: '\n  <div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">\n      <label for="doc-vld-name" class="title"><span></span></label>\n      <div class="am-form-row2">\n        <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue gridContent" disabled></textarea>\n        <div class="subhead"></div>\n      </div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div>',
  textareaHtml4: '\n  <div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group am-form-row2">\n      <label for="doc-vld-name" class="title"><span></span></label>\n      <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue gridContent" disabled></textarea>\n      <div class="subhead"></div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div>',
  textareaHtml5: '\n  <div class="group" data-xhtml="textarea" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"><div class="am-form-group">\n      <label for="doc-vld-name" class="title"><span></span></label>\n      <textarea  id="doc-vld-name" rows="5" placeholder="" class="am-form-field input nameValue" disabled></textarea>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div>',
  textareaData: {
    title: '新文本域',
    id: '100',
    type: 'textarea',
    placeholder: '',
    name: '0textarea',
    subhead: '',
    labelGrid: '',
    inputGrid: '',
    grid: '12',
    maxLangth: '',
    minLangth: '',
    ComponentType: 'ThreeRowsAndOneColumn',
    data: {
      value: '',
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  textareaLoad: function textareaLoad(page) {
    if (!page.id) {
      this.textareaData.id = app.getNumber();
      this.textareaData.name = parseInt(this.textareaData.name) + 1 + 'textarea';
      page = this.textareaData;
    }
    if (!page.ComponentType) {
      page.ComponentType = 'ThreeRowsAndOneColumn';
    }
    var html = '';
    if (page.ComponentType == 'ThreeRowsAndOneColumn') {
      html = $(this.textareaHtml);
    } else if (page.ComponentType == 'OneRowAndTwoColumns') {
      html = $(this.textareaHtml1);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
        page.inputGrid = 9;
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid);
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.textareaHtml2);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
        page.inputGrid = 9;
      } else {
        page.inputGrid = 12 - page.labelGrid;
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
    } else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.textareaHtml3);
      if (!page.inputGrid && page.inputGrid != '0') {
        page.inputGrid = 8;
      }
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
      html.find('.subhead').addClass('am-u-sm-' + (12 - page.inputGrid));
    } else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.textareaHtml4);
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
      html = $(this.textareaHtml5);
    }
    html.attr({ 'id': page.id, 'data-xdata': JSON.stringify({
        ifWrite: page.data.ifWrite,
        ifShow: page.data.ifShow,
        ifEditor: page.data.ifEditor,
        maxLangth: page.maxLangth,
        minLangth: page.minLangth,
        ComponentType: page.ComponentType,
        labelGrid: page.labelGrid,
        inputGrid: page.inputGrid
      }) });
    html.find('.title span').html(page.title);
    html.find('.subhead').html(page.subhead);
    html.find('label span').html(page.title);
    if (page.data.ifWrite) {
      html.find('label').append('<sup class="am-text-danger">*</sup>');
    }
    html.addClass('am-u-sm-' + (page.grid ? page.grid : 12));
    html.find('.delete').hide();
    html.find('label').attr('for', page.id + 1);
    html.find('textarea').attr({ 'placeholder': page.placeholder, 'id': page.id + 1, 'value': page.data.value, name: page.name });
    html.find('textarea').html(page.data.value);
    return html[0].outerHTML;
  }
});