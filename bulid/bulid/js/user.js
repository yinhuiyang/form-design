Object.assign(design, {
  userHtml: '<div class="group am-u-sm-12" data-xhtml="user"  data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"> <div class="am-form-group">\n    <label for="" class="title"><span></span></label>\n    <div class="subhead"></div>\n    <div class="nameValue ">\n      <ul class="user-content  user-radio">\n        <div class="user-btn">\u70B9\u51FB\u9009\u62E9\u7528\u6237</div>\n      </ul>\n    </div>\n    </div>\n    <div class="delete"><i class="am-icon-trash"></i></div>\n  </div>',
  // 
  userDta: {
    title: '选择用户',
    id: '100',
    type: 'user',
    name: '0user',
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
  userLoad: function userLoad(page) {
    var $html = $(this.userHtml);
    if (!page.id) {
      this.userDta.id = app.getNumber();
      this.userDta.name = parseInt(this.userDta.name) + 1 + 'user';
      page = this.userDta;
    }
    $html.attr('id', page.id);
    $html.attr('data-xdata', JSON.stringify({ ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor: page.data.ifEditor, ifChoice: page.data.ifChoice }));
    $html.find('.title span').text(page.title);
    $html.find('.nameValue').attr('name', page.name);
    $html.addClass('am-u-sm-' + (page.grid ? page.grid : 12));
    return $html[0].outerHTML;
  }
});