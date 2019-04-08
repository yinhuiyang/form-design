var _paneldata;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.assign(design, {
  paneldata: (_paneldata = {
    name: '基础面板',
    title: '这是新面板',
    id: '1000',
    content: []
  }, _defineProperty(_paneldata, 'name', ''), _defineProperty(_paneldata, 'background', '#f5f5f5'), _defineProperty(_paneldata, 'panelSize', '14px'), _paneldata),
  panelHtml: '<div class="group" data-xhtml="form" data-titleBackground = "" dtat-panelSize="">\n            <div class="am-panel am-panel-default nameValue" id=\'\' ">\n            <header class="am-panel-hd">\n              <h3 class="am-panel-title paneldown" id="title"><span></span> <i class="am-icon-chevron-down"></i></h3>\n            </header>\n            <div class="am-panel-bd input-content am-g" style="min-height: 100px;height: auto;">\n            </div>\n          </div>\n          <div class="delete"><i class="am-icon-trash"></i></div>\n          </div>',
  panelLoad: function panelLoad(page) {
    if (!page.id) {
      this.paneldata.id = app.getNumber();
      // this.paneldata.name = `${parseInt(this.paneldata.name)+1}form`
      page = this.paneldata;
    }
    var html = $(this.panelHtml).attr('id', page.id);
    html.find('.delete').hide();
    html.attr('data-titleBackground', page.background);
    html.find('h3 span').html(page.title);
    html.find('.nameValue').attr('name', page.name);
    html.find('.am-panel-hd').css({ "background": page.background, 'color': '#fff' });
    if (page.background == '#f5f5f5') {
      html.find('.am-panel-hd').css({ 'color': '#444' });
    }
    if (!page.panelSize) {
      page.panelSize = '14px';
    }
    html.attr('data-panelSize', page.panelSize);
    return html[0];
  }
});