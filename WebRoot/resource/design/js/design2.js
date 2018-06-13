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
    this.updatafn('textarea', this.textareaLoad)
    this.updatafn('select', this.selectLoad)
    this.updatafn('checkbox', this.checkboxLoad)
    this.updatafn('datetimepicker', this.datetimepickerLoad)
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
    if (ui.item[0].id) {return}
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
  setdata: {
    radio: function () {
      let id = $(this).attr('id')
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      let html = setData.title(id,'单选', $(`#${id}`).find('.title span').text()) +
                setData.underline()+
                setData.subhead(id, $(`#${id}`).find('.subhead').text())+
                setData.underline()+
                setData.radio(id)+
                setData.underline()+
                setData.ifField(id, condition)
      $('.set-content').html(html)
      $('#selecd-ul').on('click', '.minus',function () {
        $(this).parent().remove()
        radioData()
      })
      $('#selecd-ul').on('input', 'input', function () {
        radioData()
      })
      $('#selecd-ul').on('click', '.circle', function () {
        $('#selecd-ul .circle').addClass('am-icon-circle-o')
        $('#selecd-ul .circle').removeClass('am-icon-dot-circle-o')
        $(this).removeClass('am-icon-circle-o')
        $(this).addClass('am-icon-dot-circle-o')
        radioData()
      })
      $('.add_btn_group ').on('click','.add_item',function () {
        let ul =`<li>
          <i class="am-icon-circle-o circle"></i>
          <a>
            <input type="text" value="">
          </a>
          <i class="am-icon-arrows arrows"></i>
          <i class="am-icon-minus-circle minus"></i>
        </li>`
        $('#selecd-ul').append(ul)
        radioData()
      })
      $('#selecd-ul').sortable({ 
        placeholder: "li",
		    handle: '.arrows',
		    cursor: 'move',
        update (event, ui) {
          radioData(ui)
        }
      })
      function radioData () {
        let label = ''
        $('#selecd-ul li').each((i, elemt) => {
          // <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span> class="am-ucheck-radio"
          label += `<label class="am-radio">
            <input type="radio" name="${id}" value="${$(elemt).find('input').val()}" data-am-ucheck   disabled 
            ${$(elemt).find('.circle').attr('class').indexOf('am-icon-dot-circle-o')>0? 'checked': ''} >${$(elemt).find('input').val()}
          </label>`
        })
        $(`#${id} .label`).html(label)
      }
    },
    text () {
      let id = $(this).attr('id')
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      let html = setData.title(id,'单选', $(`#${id}`).find('.title span').text()) +
      setData.underline()+
      setData.subhead(id, $(`#${id}`).find('.subhead').text())+
      setData.underline()+
      setData.text(id)+
      setData.underline()+
      setData.ifField(id, condition)
      $('.set-content').html(html)
    }
  },
  designSet () {
    var _this = this
    $('.design-view').on('click','.group',function (e) {
      e.stopPropagation()
      _this.setdata[$(this).attr('data-xhtml')].call(this)
      $('.group').removeClass('active')
      $(this).addClass('active')
    })
  }
}