var design = {
  html: '<div class="view-content"><div class="input-content"></div></div>',
  $page: '',
  step:[],
  param: {}, // 默认值
  attribute: {}, //字段属性 
  updata: {
  },
  form:'',
  textFormat: {
    phone: '^((\\(\\d{2,3}\\))|(\\d{3}\\-))?1\\d{10}$',
    telephone: '^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$',
    postalcode: '^\\d{6}$',
    IDnumber: '(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)',
    email: '^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$'
  },
  formTypeId: '',
  init () {
     let _this = this
    //  let action = '/form/get.do'
    //    // 保存请求
    //    let data = {
    //      formId: formId
    //    }
    // // api.baseURL = 'http://localhost:18013'
    //  api.baseURL = basePath;
    //  api.POST(action, data, function (res) {
    //    _this.loadinit(JSON.parse(res.value.content))
    //    _this.formTypeId = res.value.formTypeId
    //  })
    this.form = from
      _this.loadinit(from)
  },
  loadinit (from) {
    this.$page = $('.design-view')
    this.$page.html(this.html)
    this.toolbarFn()
    this.designSet()
    this.updatafn('radio', this.radioDataLoad)
    this.updatafn('form', this.panelLoad)
    this.updatafn('text', this.textLoad)
    this.updatafn('textarea', this.textareaLoad)
    this.updatafn('select', this.selectLoad)
    this.updatafn('checkbox', this.checkboxLoad)
    this.updatafn('datetimepicker', this.datetimepickerLoad)
    this.updatafn('file', this.fileLoad)
    this.updatafn('image', this.imageLoad)
    let html = this.updataload(from)
    if (html) {
      this.$page.find('.view-content').html(html)
    }
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
    if (!from) { return }
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
  dateTimeJs (id,option) {
    $.datetimepicker.setLocale(option.lang);
    $(`#${id}`).datetimepicker(option)
    /* {   
      lang:'ch',
      step:1,
      timepicker: true,
      datepicker:true,
    }*/
  },
  toolbarFn () {
    var _this = this
    $('#backBtn').on('click', function () {
      $(`#${_this.step[_this.step.length-1]}`).remove()
      _this.step.pop()
    })
    $('#refresh').on('click', function () {
      _this.loadinit(_this.form)
    })
    $('#preserve').click(function () {
      _this.param = {}

      let formTmp = _this.getFrom()
      if(!formTmp){
          return false
      }
      let form = JSON.stringify(formTmp)
      console.log(form)
      let action = '/form/save.do'
      // 保存请求
	  // let data = {
	  //   	formId: formId,
	  //   	formTypeId: _this.formTypeId,
	  //   	content : form
	  // }
    //   api.POST(action, data, function (res) {
    // 	 if(res.errcode == 0){
    		 
    // 		 tool.alert( res.errmsg)
    // 	 }else{
    // 		 tool.alert(res.errmsg);
    // 	 }
    //   })
    })
    $('#preview').click(function(){
      let html = `<div class="preview-conent">
        <div class="form-content">
          <div class="img-icon">
            <i class="am-icon-close back"></i>
          </div>
          <div id="formList"></div>
        </div>
      </div>`
      let $html = $(html)
      $html.find('i').click(function(){
        $(this).parent().parent().parent().remove()
      })
      $('body').append($html)
      let formTmp = _this.getFrom()
      formTmp.title = ""
      formTmp.id = 123156645
      let formList = {
        form: formTmp
      }
      var authorizeObj  = new authorizeApi(formList) // 绑定json
      authorizeObj.loadbind('#formList')
      console.log(formTmp)
      
    })
  },
  getFrom () {
    let from ={panels:[]}
    let _this = this

    var checkPanelName = {}

    $('.view-content').children('.group').each(function(i, elem) {

      from.panels[i] = {}
      from.panels[i].title = $(this).find('#title span').text()
      from.panels[i].id = this.id
      from.panels[i].type = 'form'
      from.panels[i].name = $(elem).children('.nameValue').attr('name')

      if(app.isEmpty(from.panels[i].name) 
        || app.isEmpty(from.panels[i].title)){
        app.alert("布局组件存在标题或字段名称为空")
        $(`#${from.panels[i].id}`).click()
        from  = false
        return false
      }

      if(app.isEmpty(checkPanelName[from.panels[i].name])){
        checkPanelName[from.panels[i].name]=from.panels[i].title
      }else{
        app.alert(from.panels[i].title+"：其字段名称与其它布局组件字段重名")
        $(`#${from.panels[i].id}`).click()
        from  = false
        return false
      }

      let content = _this.getElement(elem)
      if(!content){
        from  = false
        return false
      }
      from.panels[i].content =content
    })
    return from
  },
  getElement (elem) {
    let content = []
    let _this = this
    var checkElementName={}

    $(elem).find('.group').each(function (i,el) {
      // content.push(_this.getElementData[$(el).attr('data-xhtml')].call(this, el))
      content[i] = {}
      let ifField =JSON.parse($(el).attr('data-xdata'))
      content[i].id = el.id
      content[i].title = $(el).find('.title span').text()
      content[i].type = $(el).attr('data-xhtml')
      content[i].name = $(el).find('.nameValue').attr('name')

      if(app.isEmpty(content[i].name) 
        || app.isEmpty(content[i].title)){
        app.alert("基础组件存在标题或字段名称为空")
        $(`#${content[i].id}`).click()
        content  = false
        return false
      }


      if(app.isEmpty(checkElementName[content[i].name])){
        checkElementName[content[i].name]=content[i].title
      }else{
        app.alert(content[i].title+"：其字段名称与该布局组件中的其它基础组件字段重名")
        $(`#${content[i].id}`).click()
        content  = false
        return false
      }

      content[i].subhead = $(el).find('.subhead').text()
      content[i].data = {
        ifWrite: ifField.ifWrite,
        ifShow: ifField.ifShow,
        ifEditor: ifField.ifEditor
      }
      let obj = _this.getElementData[$(el).attr('data-xhtml')].call(_this, el)
      if (obj.data) {
        obj.data = Object.assign(content[i].data, obj.data)
      }
      Object.assign(content[i], obj)
    })

    return content
  },
  getElementData: {
    file (el) {
      let dataObj = {}
      // if (!this.param.text) {
      //   this.param.text = {}
      // }
      // this.param.text[$(el).find('input').attr('name')] = $(el).find('input').val()
      return dataObj
    },image (el) {
      let dataObj = {}
      // if (!this.param.text) {
      //   this.param.text = {}
      // }
      // this.param.text[$(el).find('input').attr('name')] = $(el).find('input').val()
      return dataObj
    },
    text (el) {
      let dataObj = {}
      let option = JSON.parse($(el).attr('data-option'))
      dataObj.placeholder = $(el).find('input').attr('placeholder')
      dataObj.data = {option: option}
      // if (!this.param.text) {
      //   this.param.text = {}
      // }
      // this.param.text[$(el).find('input').attr('name')] = $(el).find('input').val()
      let defValue=$(el).find('input').val()
      dataObj.data.value=defValue
      return dataObj
    },
    textarea (el) {
      let dataObj = {}
      dataObj.data = {}
      dataObj.placeholder = $(el).find('textarea').attr('placeholder')
      // if (!this.param.textarea) {
      //   this.param.textarea = {}
      // }
      // this.param.textarea[$(el).find('.nameValue').attr('name')] = $(el).find('textarea').val()
      let defValue=$(el).find('textarea').val()
      dataObj.data.value=defValue
      return dataObj
    },
    radio (el) {
      let dataObj ={}
      dataObj.data = {value: []}
      // if (!this.param.radio) {
      //   this.param.radio = {}
      // }
      let _this = this
      $(el).find('input').each(function (i, val) {
        dataObj.data.value[i] = {}
        dataObj.data.value[i].value = $(this).val()
        dataObj.data.value[i].name = $(this).val()
        dataObj.data.value[i].checked = this.checked
        // if (this.checked) {
        //   _this.param.radio[$(this).attr('name')] =  $(this).val()
        // }
      })
      return  dataObj
    },
    checkbox (el) {
      let dataObj = {}
      dataObj.data = {value: []}
      // if (!this.param.checkbox) {
      //   this.param.checkbox = {}
      // }
      // let values= []
      $(el).find('input').each(function (i, val) {
        dataObj.data.value[i] = {}
        dataObj.data.value[i].value = $(this).val()
        dataObj.data.value[i].name = $(this).val()
        dataObj.data.value[i].checked = this.checked
        // if (this.checked) {
        //   values.push($(this).val())
        // }
      })
     // this.param.checkbox[$(el).find('.nameValue').attr('name')] = values
      return  dataObj
    },
    select (el) {
      let dataObj = {}
      let _this = this
      dataObj.data = {value: []}
      // if (!this.param.select) {
      //   this.param.select = {}
      // }
      $(el).find('option').each(function (i, val) {
        dataObj.data.value[i] = {}
        dataObj.data.value[i].value = $(this).val()
        dataObj.data.value[i].name = $(this).val()
        dataObj.data.value[i].selected = this.selected
        // if (this.selected) {
        //   _this.param.select[$(el).find('.nameValue').attr('name')] = $(this).val()
        // }
      })

      return  dataObj
    }, 
    datetimepicker (el) {
      let dataObj = {}
      let _this = this
      dataObj.data = {value:''}
      dataObj.placeholder = $(el).find('input').attr('placeholder')
      let option = JSON.parse($(el).attr('data-option'))
      let defValue=$(el).find('input').val()
      let pickerType = $(el).attr("data-type")
      
      dataObj.data.pickerType = pickerType
      dataObj.data.value=defValue
      dataObj.data.option=option
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
    form () {
      let id = $(this).attr('id')
      let html = setData.title(id,'基础面板', $(`#${id}`).find('#title span').text())+
                setData.underline()+
                setData.setFormNmae(id, $(`#${id} .nameValue`).attr('name'))
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
        // console.log($('#'+id).find('.nameValue')[0])
        $('#selecd-ul li').each((i, elemt) => {
          // <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span> class="am-ucheck-radio"
          label += `<label class="am-radio">
            <input type="radio" name="${$('#'+id).find('.nameValue').attr('name')}" value="${$(elemt).find('input').val()}" data-am-ucheck   disabled 
            ${$(elemt).find('.circle').attr('class').indexOf('am-icon-dot-circle-o')>-1? 'checked': ''} class ="nameValue">${$(elemt).find('input').val()}
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
      let optiotype = $('#text-option').val()
      if (reg && optiotype) {
        $('#textBox').hide()
      } else {
        $('#textBox').val(reg)
      }
      $('#text-option').change(function (){
        if($(this).val() === 'text') {
          $('#textBox').show()
          let option = JSON.parse($(`#${id}`).attr('data-option'))
          option.reg = ''
          $(`#${id}`).attr('data-option', JSON.stringify(option))
          $('#text').val(option.reg)
        } else {
          $('#textBox').hide()
          let option = JSON.parse($(`#${id}`).attr('data-option'))
          option.reg = design.textFormat[$(this).val()]
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
    datetimepicker () {
      $('#default').datetimepicker('destroy')
      let id = $(this).attr('id')
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      let html = setData.title(id,'日期时间', $(`#${id}`).find('.title span').text()) +
      setData.underline()+
      setData.setNmae(id, $(`#${id}`).find('.nameValue').attr('name'))+
      setData.underline()+
      setData.subhead(id, $(`#${id}`).find('.subhead').text())+
      setData.underline()+
      setData.datatimeFormat(id)+
      setData.underline()+
      setData.textInput(id)+
      setData.underline()+
      setData.ifField(id, condition)
      
      $('.set-content').html(html)

      let lang = (JSON.parse($('#'+id).attr('data-option'))).lang
      $('#lang').val(lang)

      let format = (JSON.parse($('#'+id).attr('data-option'))).format
      
      let pickerType = ($('#'+id).attr('data-type'))
      $('#pickerType').val(pickerType)

      $('#format').html(setData.dateformatOption(pickerType));
      $('#format').val(format)
  
      let optiontype = $('#format').val()
      if (format && optiontype) {
        $('#textBox').hide()
        $('#text').val('')
      } else {
        $('#text').val(format)
      }
      
      $('#lang').change(function (){
        let option = JSON.parse($(`#${id}`).attr('data-option'))
        option.lang = $(this).val()
        $(`#${id}`).attr('data-option', JSON.stringify(option))
        design.dateTimeJs("default",(JSON.parse($('#'+id).attr('data-option'))))
      })

      $('#pickerType').change(function (){
        let datepicker = false
        let timepicker = false
        let format=''
        if($(this).val() === 'allpicker') {
          format="Y-m-d H:i"
          datepicker=true
          timepicker=true
        } else if($(this).val() === 'datepicker'){
          format="Y-m-d"
          datepicker=true
          timepicker=false
        }else if($(this).val() == 'timepicker') {
          format="H:i"
          datepicker=false
          timepicker=true
        }
        $('#format').html(setData.dateformatOption($(this).val()));
        $('#format').val(format)
        let optiontype = $('#format').val()
        if (format && optiontype) {
          $('#textBox').hide()
          $('#text').val('')
        } else {
          $('#textBox').show()
          $('#text').val(format)
        }

        let option = JSON.parse($(`#${id}`).attr('data-option'))
        option.datepicker=datepicker
        option.timepicker=timepicker
        option.format=format
        $(`#${id}`).attr('data-option', JSON.stringify(option))
        $('#'+id).attr('data-type',$(this).val())
        design.dateTimeJs("default",(JSON.parse($('#'+id).attr('data-option'))));
      })

      $('#format').change(function (){
        let option = JSON.parse($(`#${id}`).attr('data-option'))
        if($(this).val() === 'text') {
          $('#textBox').show()
          option.format = ''
          $('#text').val(option.format)
        } else{
          $('#textBox').hide()
          option.format=$(this).val()
        }
        $(`#${id}`).attr('data-option', JSON.stringify(option))
        design.dateTimeJs("default",(JSON.parse($('#'+id).attr('data-option'))));
      })

      $('#text').on('input', function () {
        let option = JSON.parse($(`#${id}`).attr('data-option'))
        option.format = $(this).val()
        $(`#${id}`).attr('data-option', JSON.stringify(option))
        design.dateTimeJs("default",(JSON.parse($('#'+id).attr('data-option'))));
      })

      design.dateTimeJs("default",(JSON.parse($('#'+id).attr('data-option'))));
    },file () {
      let id = $(this).attr('id')
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      let html = setData.title(id,'附件', $(`#${id}`).find('.title span').text()) +
      setData.underline()+
      setData.setNmae(id, $(`#${id}`).find('.nameValue').attr('name'))+
      setData.underline()+
      setData.subhead(id, $(`#${id}`).find('.subhead').text())+
      setData.underline()+
      setData.ifField(id, condition)
      $('.set-content').html(html)

    },image () {
      let id = $(this).attr('id')
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      let html = setData.title(id,'图片', $(`#${id}`).find('.title span').text()) +
      setData.underline()+
      setData.setNmae(id, $(`#${id}`).find('.nameValue').attr('name'))+
      setData.underline()+
      setData.subhead(id, $(`#${id}`).find('.subhead').text())+
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
            <input type="checkbox" value="${$(elemt).find('input').val()}" data-am-ucheck   disabled 
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
           ${$(elemt).find('.circle').attr('class').indexOf('am-icon-dot-circle-o')>-1? 'selected': ''}>${$(elemt).find('input').val()}
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