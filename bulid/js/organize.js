Object.assign(design, {
  organizeHtml: '<div class="group" data-xhtml="organize"  data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"> <div class="am-form-group">\n    <label for="" class="title"><span></span></label>\n    <div class="subhead"></div>\n    <div class="nameValue ">\n      <ul class="user-content user-radio">\n        <div class="user-btn">\u70B9\u51FB\u9009\u62E9\u7EC4\u7EC7</div>\n      </ul>\n    </div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  // user-radio
  organizeDta: {
    title: '选择组织',
    id: '100',
    type: 'organize',
    name: '0organize',
    subhead: '',
    grid: '12',
    data: {
      value: '',
      ifChoice: 'radio',
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  organizeLoad: function organizeLoad(page) {
    var $html = $(this.organizeHtml);
    if (!page.id) {
      this.organizeDta.id = app.getNumber();
      this.organizeDta.name = parseInt(this.organizeDta.name) + 1 + 'organize';
      page = this.organizeDta;
    }
    $html.attr('id', page.id);
    $html.attr('data-xdata', JSON.stringify({ ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor: page.data.ifEditor, ifChoice: page.data.ifChoice }));
    $html.find('.title span').text(page.title);
    $html.find('.nameValue').attr('name', page.name);
    $html.addClass('am-u-sm-' + (page.grid ? page.grid : 12));
    return $html[0].outerHTML;
  }
});