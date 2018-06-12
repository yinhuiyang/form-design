var design = {
  html: '<div class="view-content"><div class="input-content"></div></div>',
  $page: '',
  step:[],
  updata: {
  },
  init (from) {
    this.$page = $('.design-view')
    this.$page.html(this.html)
    this.toolbarFn()
    this.designSet()
    this.updatafn('radio', this.radioDataLoad)
    this.updatafn('panel', this.panelLoad)
    this.updatafn('text', this.textLoad)
    let html = this.updataload(from)
    this.$page.find('.view-content').html(html)
    this.initModel()
    let _this = this
    // $('.design-page-model ul li a').on('click', function (e){
    //   console.log(this)
    //   let fn = $(this).attr('data-xhtml')
    //   let str = _this[fn](fn)
    //   $('.design-view .view-content').append(str)
    // })
  },
  updataload (from) {
    let data = ''
    let _this = this
    from.panels.forEach((value, i) => {
      let html = _this.updata[value.type](value)
      console.log(html)
      data =  $(html)
      data.find('.input-content').append(this.updataInput(value))
    })
    console.log(data[0])
    return data[0]
  },
  updataInput (value) {
    let html = ''
    let _this = this
    value.content.forEach((data, i) => {
      html += _this.updata[data.type](data)
    })
    return html
  },
  updatafn (type, fn) {
    this.updata[type] = fn.bind(this)
  },
  updateSortable (e,ui) {
    let fn = ui.item[0].dataset.xhtml
    let str = this.updata[fn]({})
    this.step.push($(str).attr('id'))
    ui.item.replaceWith(str)
    this.initModel()
  },
  toolbarFn () {
    var _this = this
    $('#backBtn').on('click', function () {
      $(`#${_this.step[_this.step.length-1]}`).remove()
      _this.step.pop()
    })
    $('#refresh').on('click', function () {
      design.init(from)
    })
  },
  initModel () {
    var _this = this
    $('.design-view').find('.view-content, .input-content').sortable({
      opacity : 0.85,
      revert : true,
      start : function(e, t) {
      },
      change : function(e, t) {
      },
      stop : function(e, t) {
      },
      update (event, ui) {
        _this.updateSortable(event, ui, this)
      }
    })
    $('.design-page-model .panel-component li a').draggable({
      connectToSortable : ".view-content",
      helper : "clone",
      revert : "invalid",
      drag : function() {
      },
      stop : function() {
      }
    });
    $('.design-page-model .input-component li a').draggable({
      connectToSortable : ".input-content",
      helper : "clone",
      revert : "invalid",
      drag : function() {
      },
      stop : function() {
      }
    });
  },
  designSet () {
    $('.design-view').on('click','.group',function (e) {
      e.stopPropagation()
      $('.group').removeClass('active')
      $(this).addClass('active')
      $('#selecd-ul').sortable({
        placeholder: "li",
		    handle: '#arrows',
		    cursor: 'move',
        start : function(e, t) {
        },
        change : function(e, t) {
        },
        stop : function(e, t) {
        },
        update (event, ui) {
        }
      })
    })
    $('#title').on('input', function () {
      $("#100012").find('h3 span').text($(this).val())
    })
    $('.input_subhead').on('input', function () {
      $("#100012").find('.subhead').text($(this).val())
    })
  }
}