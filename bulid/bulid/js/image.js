Object.assign(design, {
  imageHtml: '<div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">\n      <label for="doc-vld-name" class="title"><span></span></label>\n      <div class="subhead"></div>\n        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">\n            <i class="am-icon-image"></i>\n            <span>\u9009\u62E9\u56FE\u7247</span>\n            <form class="upload-form" >\n                <input type="file" id=""  class="am-form-field input nameValue"  disabled/>\n            </form>\n          </div>\n      </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div>',
  imageHtml1: '\n  <div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row">\n      <label for="doc-vld-name" class="title am-u-sm-3"><span></span></label>\n      <div class="gridContent">\n        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">\n          <i class="am-icon-image"></i>\n          <span>\u9009\u62E9\u56FE\u7247</span>\n          <form class="upload-form" >\n              <input type="file" id=""  class="am-form-field input nameValue"  disabled/>\n          </form>\n        </div>\n      </div>\n      \n      </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  imageHtml2: '\n  <div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row2">\n      <label for="doc-vld-name" class="title am-u-sm-3"><span></span></label>\n      <div class="gridContent">\n        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">\n            <i class="am-icon-image"></i>\n            <span>\u9009\u62E9\u56FE\u7247</span>\n            <form class="upload-form" >\n                <input type="file" id=""  class="am-form-field input nameValue"  disabled/>\n            </form>\n        </div>\n        <div class="subhead"></div>\n      </div>\n      </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  imageHtml3: '\n  <div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">\n      <label for="doc-vld-name" class="title"><span></span></label>\n      <div class=" am-form-row">\n        <div class="gridContent">\n          <div class="upload-btn x-btn" style="border: 1px solid #ccc;">\n            <i class="am-icon-image"></i>\n            <span>\u9009\u62E9\u56FE\u7247</span>\n            <form class="upload-form" >\n                <input type="file" id=""  class="am-form-field input nameValue"  disabled/>\n            </form>\n          </div>\n        </div>\n        \n        <div class="subhead am-u-sm-5"></div>\n      </div>\n      </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  imageHtml4: '\n  <div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group am-form-row">\n      <label for="doc-vld-name" class="title am-u-sm-3"><span></span></label>\n      <div class="gridContent">\n        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">\n            <i class="am-icon-image"></i>\n            <span>\u9009\u62E9\u56FE\u7247</span>\n            <form class="upload-form" >\n                <input type="file" id=""  class="am-form-field input nameValue"  disabled/>\n            </form>\n        </div>\n      </div>\n      \n        <div class="subhead am-u-sm-4"></div>\n      </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  imageHtml5: '<div class="group" data-xhtml="image" data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}" data-option=""><div class="am-form-group">\n      <label for="doc-vld-name" class="title"><span></span></label>\n        <div class="upload-btn x-btn" style="border: 1px solid #ccc;">\n            <i class="am-icon-image"></i>\n            <span>\u9009\u62E9\u56FE\u7247</span>\n            <form class="upload-form" >\n                <input type="file" id=""  class="am-form-field input nameValue"  disabled/>\n            </form>\n          </div>\n      </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n    </div>',
  imageData: {
    title: '图片',
    id: '100',
    type: 'image',
    placeholder: '',
    name: '0image',
    subhead: '',
    labelGrid: '',
    inputGrid: '',
    grid: '12',
    ComponentType: 'ThreeRowsAndOneColumn',
    data: {
      value: '',
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  imageLoad: function imageLoad(page) {
    if (!page.id) {
      this.imageData.id = app.getNumber();
      this.imageData.name = parseInt(this.imageData.name) + 1 + 'image';
      page = this.imageData;
    }
    var html = '';
    if (!page.ComponentType) {
      page.ComponentType = 'ThreeRowsAndOneColumn';
    }
    if (page.ComponentType == 'OneRowAndTwoColumns') {
      html = $(this.imageHtml1);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
        page.inputGrid = 9;
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid);
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
    } else if (page.ComponentType == 'TwoRowAndTwoColumns') {
      html = $(this.imageHtml2);
      if (!page.labelGrid && page.labelGrid != '0') {
        page.labelGrid = 3;
        page.inputGrid = 9;
      } else {
        page.inputGrid = 12 - parseInt(page.labelGrid);
      }
      html.find('.title').addClass('am-u-sm-' + page.labelGrid);
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
    } else if (page.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = $(this.imageHtml3);
      if (!page.inputGrid && page.inputGrid != '0') {
        page.inputGrid = 8;
      }
      html.find('.gridContent').addClass('am-u-sm-' + page.inputGrid);
      html.find('.subhead').addClass('am-u-sm-' + (12 - page.inputGrid));
    } else if (page.ComponentType == 'OneRowAndThreeColumns') {
      html = $(this.imageHtml4);
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
      html = $(this.imageHtml5);
    } else {
      html = $(this.imageHtml);
    }
    html.attr('id', page.id);
    html.attr({ 'data-xdata': JSON.stringify({
        ifWrite: page.data.ifWrite,
        ifShow: page.data.ifShow,
        ifEditor: page.data.ifEditor,
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
    html.find('label').attr('for', page.id + 'image');
    html.find('input').attr({ 'placeholder': page.placeholder, 'id': page.id + 'image', 'value': page.data.value, 'name': page.name });
    return html[0].outerHTML;
  }
});