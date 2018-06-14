Object.assign(design, {
  paneldata:{
    name: '基础面板',
    title: '这是新面板',
    id: '1000',
    content: []
  },
  panelHtml: `<div class="group" data-xhtml="panel"><div class="am-panel am-panel-default" id='' ">
            <header class="am-panel-hd">
              <h3 class="am-panel-title title"><span></span></h3>
            </header>
            <div class="am-panel-bd input-content"  style="min-height: 100px;height: auto;">
            </div>
          </div></div>`,
  panelLoad (page) {
    this.paneldata.id = app.getNumber()
    if (!page.id) {
      page =this.paneldata 
    }
    let html = $(this.panelHtml).attr('id', page.id)
    html.find('h3').html(page.title)
    return html[0]
  }
})
