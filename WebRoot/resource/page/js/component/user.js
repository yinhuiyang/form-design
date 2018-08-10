Object.assign(design, {
  userHtml: `<div class="group am-u-sm-12" data-xhtml="user"  data-xdata = "{ifWrite: flase, ifShow: true, ifEditor: true}"> <div class="am-form-group">
    <label for="" class="title"><span></span></label>
    <div class="subhead"></div>
    <div class="nameValue ">
      <ul class="user-content  user-radio">
        <div class="user-btn">点击选择用户</div>
      </ul>
    </div>
    </div>
    <div class="delete"><i class="am-icon-trash"></i></div>
  </div>`,
  // 
  userDta: {
    title: '选择用户',
    id: '100',
    type: 'user',
    name: '0user',
    subhead: '',
    grid: '12',
    data:{
      value: '',
      ifChoice: 'radio',
      ifWrite: false,
      ifShow: true,
      ifEditor: true
    }
  },
  userLoad (page) {
    let $html = $(this.userHtml)
    if (!page.id) {
      this.userDta.id = app.getNumber()
      this.userDta.name = `${parseInt(this.userDta.name)+1}user`
      page = this.userDta
    }
    $html.attr('id', page.id)
    $html.attr('data-xdata', JSON.stringify({ifWrite: page.data.ifWrite, ifShow: page.data.ifShow, ifEditor: page.data.ifEditor, ifChoice: page.data.ifChoice}))
    $html.find('.title span').text(page.title)
    $html.find('.nameValue').attr( 'name', page.name)
    $html.addClass(`am-u-sm-${page.grid?page.grid: 12}`)
    return $html
  }
})