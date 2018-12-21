Object.assign(design, {
  paneldata:{
    name: '基础面板',
    title: '这是新面板',
    id: '1000',
    content: [],
    name: '',
    background: '#f5f5f5',
    panelSize: '14px'
  },
  panelHtml: `<div class="group" data-xhtml="form" data-titleBackground = "" dtat-panelSize="">
            <div class="am-panel am-panel-default nameValue" id='' ">
            <header class="am-panel-hd">
              <h3 class="am-panel-title paneldown" id="title"><span></span> <i class="am-icon-chevron-down"></i></h3>
            </header>
            <div class="am-panel-bd input-content am-g" style="min-height: 100px;height: auto;">
            </div>
          </div>
          <div class="delete"><i class="am-icon-trash"></i></div>
          </div>`,
  panelLoad (page) {
    if (!page.id) {
      this.paneldata.id = app.getNumber()
      // this.paneldata.name = `${parseInt(this.paneldata.name)+1}form`
      page =this.paneldata 
    }
    let html = $(this.panelHtml).attr('id', page.id)
    html.find('.delete').hide()
    html.attr('data-titleBackground', page.background)
    html.find('h3 span').html(page.title)
    html.find('.nameValue').attr('name', page.name)
    html.find('.am-panel-hd').css({"background": page.background, 'color': '#fff'})
    if (page.background == '#f5f5f5') {
      html.find('.am-panel-hd').css({'color': '#444'})
    }
    if(!page.panelSize){
      page.panelSize = '14px'
    }
    html.attr('data-panelSize', page.panelSize)
    return html[0]
  }
})
