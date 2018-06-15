var design = {
  html: '<div class="view-content"><div class="input-content"></div></div>',
  $page: '',
  step:[],
  updata: {
  },
  init () {
    let _this = this
    let action = ''
      // 保存请求
      let data = {
        formId: '117285188051200'
      }
    api.POST('http://192.168.114.77:18013/form/get.do', data, function (res) {
      _this.loadinit(JSON.parse(res.value.content))
    })
    
  },
  loadinit (from) {
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
    $(`#${$(html).eq(0).attr('id')}`).click()
    this.initModel()
    // let _this = this
    // $('.design-page-model ul li a').on('click', function (e){
    //   console.log(this)
    //   let fn = $(this).attr('data-xhtml')
    //   let str = _this[fn](fn)
    //   $('.design-view .view-content').append(str)
    // })
  },
  updataload (from) {
    let data = ''
    let fromHtml = ''
    let _this = this
    from.panels.forEach((value, i) => {
      let html = _this.updata[value.type](value)
      // console.log(html)
      data =  $(html)
      data.find('.input-content').append(this.updataInput(value))
      fromHtml += data[0].outerHTML
    })
    // console.log(fromHtml)
    return fromHtml
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
    $(`#${$(str).attr('id')}`).click()
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
    $('#preserve').click(function () {
      let from = JSON.stringify(_this.getFrom())
      let action = ''
      // 保存请求
      api.POST(action, from, function (data) {})
    })
  },
  getFrom () {
    let from ={panels:[]}
    let _this = this
    $('.view-content').children('.group').each(function(i, elem) {
      from.panels[i] = {}
      from.panels[i].title = $(this).find('#title span').text()
      from.panels[i].id = this.id
      from.panels[i].type = 'panel'
      from.panels[i].content = _this.getElement(elem)
    })
    return from
  },
  getElement (elem) {
    let content = []
    let _this = this
    $(elem).find('.group').each(function (i,el) {
      // content.push(_this.getElementData[$(el).attr('data-xhtml')].call(this, el))
      content[i] = {}
      let ifField =JSON.parse($(el).attr('data-xdata'))
      content[i].id = el.id
      content[i].title = $(el).find('.title span').text()
      content[i].type = $(el).attr('data-xhtml')
      content[i].name = $(el).find('.nameValue').attr('name')
      content[i].subhead = $(el).find('.subhead').text()
      content[i].data = {
        ifWrite: ifField.ifWrite,
        ifShow: ifField.ifShow,
        ifEditor: ifField.ifEditor
      }
      let obj = _this.getElementData[$(el).attr('data-xhtml')].call(this, el)
      if (obj.data) {
        obj.data = Object.assign(content[i].data, obj.data)
      }
      Object.assign(content[i], obj)
    })
    return content
  },
  getElementData: {
    text (el) {
      let dataObj = {}
      let option = JSON.parse($(el).attr('data-option'))
      dataObj.placeholder = $(el).find('input').attr('placeholder')
      dataObj.data = {option: option}
      return dataObj
    },
    textarea (el) {
      let dataObj = {}
      dataObj.placeholder = $(el).find('textarea').attr('placeholder')
      return dataObj
    },
    radio (el) {
      let dataObj ={}
      dataObj.data = {value: []}
      $(el).find('input').each(function (i, val) {
        dataObj.data.value[i] = {}
        dataObj.data.value[i].value = $(this).val()
        dataObj.data.value[i].name = $(this).val()
        dataObj.data.value[i].checked = this.checked
      })
      return  dataObj
    },
    checkbox (el) {
      let dataObj = {}
      dataObj.data = {value: []}
      $(el).find('input').each(function (i, val) {
        dataObj.data.value[i] = {}
        dataObj.data.value[i].value = $(this).val()
        dataObj.data.value[i].name = $(this).val()
        dataObj.data.value[i].checked = this.checked
      })
      return  dataObj
    },
    select (el) {
      let dataObj = {}
      dataObj.data = {value: []}
      $(el).find('option').each(function (i, val) {
        dataObj.data.value[i] = {}
        dataObj.data.value[i].value = $(this).val()
        dataObj.data.value[i].name = $(this).val()
        dataObj.data.value[i].selected = this.selected
      })
      return  dataObj
    }
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
    panel () {
      let id = $(this).attr('id')
      let html = setData.title(id,'基础面板', $(`#${id}`).find('#title span').text())
      $('.set-content').html(html)
    },
    radio: function () {
      let id = $(this).attr('id')
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      let html = setData.title(id,'单选', $(`#${id}`).find('.title span').text()) +
                setData.underline()+
                setData.setNmae(id, $(`#${id}`).find('.nameValue').attr('name'))+
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
            <input type="radio" name="${$('#'+id).find('.nameValue').attr('name')}" value="${$(elemt).find('input').val()}" data-am-ucheck   disabled 
            ${$(elemt).find('.circle').attr('class').indexOf('am-icon-dot-circle-o')>-1? 'checked': ''} >${$(elemt).find('input').val()}
          </label>`
        })
        $(`#${id} .label`).html(label)
      }
    },
    text () {
      let id = $(this).attr('id')
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      let html = setData.title(id,'输入框', $(`#${id}`).find('.title span').text()) +
      setData.underline()+
      setData.setNmae(id, $(`#${id}`).find('.nameValue').attr('name'))+
      setData.underline()+
      setData.subhead(id, $(`#${id}`).find('.subhead').text())+
      setData.underline()+
      setData.text(id)+
      setData.underline()+
      setData.textInput(id)+
      setData.underline()+
      setData.ifField(id, condition)
      $('.set-content').html(html)
      let reg = (JSON.parse($('#'+id).attr('data-option'))).reg
      $('#text-option').val(reg)
      if (reg) {
        $('#textBox').hide()
      }
      $('#text-option').change(function (){
        if($(this).val() === 'text') {
          $('#textBox').show()
          let option = JSON.parse($(`#${id}`).attr('data-option'))
          option.reg = ''
          $(`#${id}`).attr('data-option', JSON.stringify(option))
        } else {
          $('#textBox').hide()
          let option = JSON.parse($(`#${id}`).attr('data-option'))
          option.reg = $(this).val()
          $(`#${id}`).attr('data-option', JSON.stringify(option))
        }
      })
      $('#text').on('input', function () {
        let option = JSON.parse($(`#${id}`).attr('data-option'))
        option.reg = $(this).val()
        $(`#${id}`).attr('data-option', JSON.stringify(option))
      })
      $('#error').on('input', function () {
        let option = JSON.parse($(`#${id}`).attr('data-option'))
        option.err = $(this).val()
        $(`#${id}`).attr('data-option', JSON.stringify(option))
      })
    },
    textarea () {
      let id = $(this).attr('id')
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      let html = setData.title(id,'输入框', $(`#${id}`).find('.title span').text()) +
      setData.underline()+
      setData.setNmae(id, $(`#${id}`).find('.nameValue').attr('name'))+
      setData.underline()+
      setData.subhead(id, $(`#${id}`).find('.subhead').text())+
      setData.underline()+
      setData.textInput(id)+
      setData.underline()+
      setData.ifField(id, condition)
      $('.set-content').html(html)
    },
    checkbox: function () {
      let id = $(this).attr('id')
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      let html = setData.title(id,'多选', $(`#${id}`).find('.title span').text()) +
                setData.underline()+
                setData.setNmae(id, $(`#${id}`).find('.nameValue').attr('name'))+
                setData.underline()+
                setData.subhead(id, $(`#${id}`).find('.subhead').text())+
                setData.underline()+
                setData.checkbox(id)+
                setData.underline()+
                setData.ifField(id, condition)
      $('.set-content').html(html)
      $('#selecd-ul').on('click', '.minus',function () {
        $(this).parent().remove()
        checkData()
      })
      $('#selecd-ul').on('input', 'input', function () {
        checkData()
      })
      $('#selecd-ul').on('click', '.square', function () {
        if ($(this).attr('class').indexOf('am-icon-check-square-o')>-1){
          $(this).removeClass('am-icon-check-square-o')
          $(this).addClass('am-icon-square-o')
        } else {
          $(this).removeClass('am-icon-square-o')
          $(this).addClass('am-icon-check-square-o')
        }
        checkData()
      })
      $('.add_btn_group ').on('click','.add_item',function () {
        let ul =`<li>
          <i class="am-icon-square-o square"></i>
          <a>
            <input type="text" value="">
          </a>
          <i class="am-icon-arrows arrows"></i>
          <i class="am-icon-minus-circle minus"></i>
        </li>`
        $('#selecd-ul').append(ul)
        checkData()
      })
      $('#selecd-ul').sortable({ 
        placeholder: "li",
		    handle: '.arrows',
		    cursor: 'move',
        update (event, ui) {
          checkData(ui)
        }
      })
      function checkData () {
        let label = ''
        $('#selecd-ul li').each((i, elemt) => {
          // <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span> class="am-ucheck-radio"
          label += `<label class="am-checkbox">
            <input type="checkbox" name="${id}" value="${$(elemt).find('input').val()}" data-am-ucheck   disabled 
            ${$(elemt).find('.square').attr('class').indexOf('am-icon-check-square-o')>-1? 'checked': ''} >${$(elemt).find('input').val()}
          </label>`
        })
        $(`#${id} .label`).html(label)
      } 
    },
    select: function () {
      let id = $(this).attr('id')
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      let html = setData.title(id,'下拉', $(`#${id}`).find('.title span').text()) +
                setData.underline()+
                setData.setNmae(id, $(`#${id}`).find('.nameValue').attr('name'))+
                setData.underline()+
                setData.subhead(id, $(`#${id}`).find('.subhead').text())+
                setData.underline()+
                setData.select(id)+
                setData.underline()+
                setData.ifField(id, condition)
      $('.set-content').html(html)
      $('#selecd-ul').on('click', '.minus',function () {
        $(this).parent().remove()
        selectData()
      })
      $('#selecd-ul').on('input', 'input', function () {
        selectData()
      })
      $('#selecd-ul').on('click', '.circle', function () {
        $('#selecd-ul .circle').addClass('am-icon-circle-o')
        $('#selecd-ul .circle').removeClass('am-icon-dot-circle-o')
        $(this).removeClass('am-icon-circle-o')
        $(this).addClass('am-icon-dot-circle-o')
        selectData()
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
        selectData()
      })
      $('#selecd-ul').sortable({ 
        placeholder: "li",
		    handle: '.arrows',
		    cursor: 'move',
        update (event, ui) {
          selectData(ui)
        }
      })
      function selectData () {
        let label = ''
        $('#selecd-ul li').each((i, elemt) => {
          //<option value="${element.value}" >${element.name}</option>
          label += `<option value="${$(elemt).find('input').val()}" disabled
           ${$(elemt).find('.circle').attr('class').indexOf('am-icon-dot-circle-o')>-1? 'selected': ''} >${$(elemt).find('input').val()}
           </option>`
        })
        $(`#${id} select`).html(label)
      }
    }
  },
  designSet () {
    var _this = this
    $('.design-view').on('click','.group',function (e) {
      e.stopPropagation()
      _this.setdata[$(this).attr('data-xhtml')].call(this)
      $('.group').removeClass('active')
      $(this).addClass('active')
      $('.delete').hide()
      $(this).children('.delete').show()
    })
    $('.design-view').off('click','.delete').on('click','.delete',function (e) {
      e.stopPropagation()
      $('#my-confirm .am-modal-hd').html('')
      if ($(this).parent().attr('data-xhtml') == 'panel') {
        $('#my-confirm .am-modal-bd').html('若删除该元素，其里面的表单数据也会被清除,且无法通过上一步还原。确定删除？')
      } else {
        $('#my-confirm .am-modal-bd').html('若删除该元素，其对应的表单数据也会被清除,且无法通过上一步还原。确定删除？')
      }
      // console.log(this, '++++++++++')
      $('#my-confirm').modal({
        relatedTarget: $(this).parent().attr('id'),
        onConfirm: function(options) {
          console.log(this.relatedTarget)
          $(`#${this.relatedTarget}`).remove()
          if ($('.group').length){
            $('.group').eq($('.group').length-1).click()
          } else {
            $('.set-content').html('')
          }
          let idx = _this.step.indexOf(this.relatedTarget)
          if (idx > -1 ) {
            console.log(idx)
            _this.step.splice(idx,1)
          }
        },
        // closeOnConfirm: false,
        onCancel: function() {
        }
      });
      // $(this).parent().remove()
    })
  }
}