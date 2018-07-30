(function ()  {
  var authorize = {
  formData: {},
  formBoxHTml: `<div class="form-body">
    <div class="section">
        <div class="header">
          <div class="back"></div>
          <div class="formTitle"></div>
          <div></div>
        </div>
        <div class="form" id="">
        </div>
        <div class="form_btn" id ="">
        </div>
      </div>
    </div>`,
  suggestion: {
      title: '',
      id: '_suggestionPanel888lll',
      type: 'form',
      name:'_suggestionName',
      content: [
        {
          title: '审核意见',
          id: '_suggestionForm888lll',
          type: 'textarea',
          placeholder: '',
          name: '_suggestion',
          subhead: '',
          grid: '12',
          data: {
            value: '',
            ifWrite: false,
            ifShow: true,
            ifEditor: true
          }
        }
      ]
  },
  preview_flag:false, // true预览 ，false为真实提交
  $formBoxHTml: {},
  Mobile: false,
  init (form) {
    this.formData = form
    this.uphtmlFn('form', this.form.loadForm)
    this.uphtmlFn('text', this.text.loadText)
    this.uphtmlFn('textarea', this.textarea.loadTextarea)
    this.uphtmlFn('radio', this.radio.loadRadio)
    this.uphtmlFn('checkbox', this.checkbox.loadCheckbox)
    this.uphtmlFn('select', this.select.loadSelect)
    this.uphtmlFn('datetimepicker', this.datetimepicker.loadDatetimepicker)
    this.uphtmlFn('file', this.file.loadFile)
    this.uphtmlFn('image', this.image.loadImage)
    var ua = navigator.userAgent
    var isWindowsPhone = /(?:Windows Phone)/.test(ua)
    var isAndroid = /(?:Android)/.test(ua)
    var isFireFox = /(?:Firefox)/.test(ua)
    var isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
    var isPhone = /(?:iPhone)/.test(ua) && !isTablet
    this.Mobile = (isWindowsPhone || isAndroid ||isPhone) && !this.preview_flag
    if (this.Mobile) { //移动端
      this.uphtmlFn('table', this.phoneTable.loadTable)
    } else {
      this.uphtmlFn('table', this.table.loadTable)
    }
    if (this.formData.formSuggestion) {
      this.formData.form.panels.push(this.suggestion)
    }
  },
  loadbind (id) {
    let $html = $(this.formBoxHTml)
    let iddate = new Date ()
    $html.find('.form').attr('id', `form${iddate.getTime()}`)
    $html.find('.form_btn').attr('id', `form_btn${iddate.getTime()}`)
    this.$formBoxHTml = $html
    $(id).html($html)
    var form = this.formData.form
    $(`#${$html.find('.form').attr('id')}`).parent().find('.formTitle').html(form.title)
    // $('.formTitle')
    let eldata =  ''
    let elattribute = ''
    var data = this.formData.data || {}
    var attribute = this.formData.attribute || {}
    form.panels.forEach(element => { 
      eldata =  data[element.name] || {}
      elattribute =  attribute[element.name] || {}
      let $formHtml = this.uphtml[element.type](element, eldata, elattribute)
      if (element.type !== 'table') {
        $formHtml = this.addChild($formHtml,element)
      }
      // $formHtml.find('fieldset').html(childHtml)
      this.addHTml($html.find('.form').attr('id'), $formHtml)
      this.regFn(`#${$formHtml.find('form').attr('id')}`)
    })
  },
  loadAction (idClass) {
    let actions = this.formData.actions
    var id = this.$formBoxHTml.find('.form_btn').attr('id') 
    let btn = `<button type="button" class="am-btn am-btn-default am-radius" style="margin-right: 5px;" id=""></button>`
    actions.forEach(v => {
      let $btn = $(btn)
      $btn.html(v.text)
      if (v.color) {
        $btn.css({'background': v.color, 'color': '#fff'})
      }
      this.actionClick($btn, v, idClass)
      $(`#${id}`).append($btn)
    })
  },
  actionClick ($btn, action, idClass) {
    let _this = this
    if (idClass) {
      var id = $(idClass).find('.form').attr('id')
    } else {
      var id = this.$formBoxHTml.find('.form').attr('id')
    }
    $btn.click(function () {
      let err = false
      if (typeof action.validate === 'string') {
        action.validate = parseInt(action.validate)
      }
      if (action.validate) {
        var validate = []
        $(idClass).find('form').each(function() {
          validate.push($(this).validator('isFormValid'))
        })
        if (validate.indexOf(false) > -1) {
          err = true
        }
        if (_this.ifFile()) {
          err = true
        }
        if (err) {
          return
        }
      }
      let data = _this.getdataFn(id)
        _this.formData.onAction(action, data)
    })
  },
  ifFile () {
    let errHtml = `<div class="am-alert am-alert-danger" style="display: block;">请选择文件</div>`
    let err = false
    $('[type=file]').each(function() {
      if ($(this).attr('data-required') !== 'true') {return true}
      if ($(this).parent().parent().find('.file-item').length === 0) {
        $(this).parent().parent().removeClass('am-form-success')
        $(this).parent().parent().addClass('am-form-error')
        if ($(this).parent().parent().find('.am-alert').length == 0){
          $(this).parent().parent().append(errHtml)
        } else {
          $(this).parent().parent().find('.am-alert').show()
        }
        err = true
      }
    })
    return err
  },
  addHTml (id,html) {
    $(`#${id}`).append(html)
  },
  addChild ($formHtml,elem) {
    let ChildHtml = ''
    var data = this.formData.data || {}
    var attribute = this.formData.attribute || {}
    let eldata =  ''
    let elattribute = ''
    let grid = 0
    elattribute =  attribute[elem.name] || {}
    eldata =  data[elem.name] || {}
    let gridHtml = `<div class="am-g"></div>`
    let $gridHtml = $(gridHtml)
    elem.content.forEach((value, i) => {
      if (!value.grid ) {
        value.grid = 12
      }
      if (grid < 12 && grid > 0 && value.grid == 12) {
        $formHtml.find('fieldset').append($gridHtml)
        $gridHtml = $(gridHtml)
        grid = 0
      }
      grid += parseInt(value.grid)
      let $child = this.uphtml[value.type](value, eldata, elattribute)
      $gridHtml.append($child)
      if (grid == 12) {
        $formHtml.find('fieldset').append($gridHtml)
        $gridHtml = $(gridHtml)
        grid = 0
      } else if(i === elem.content.length-1) {
        $formHtml.find('fieldset').append($gridHtml)
        $gridHtml = $(gridHtml)
        grid = 0
      }
    })
    return $formHtml
  },
  uphtml: {},
  uphtmlFn (type, fn) {
    this.uphtml[type] = fn.bind(this)
  },
  getdataFn (id) {
    let _this = this
    let data ={}
    // let id = this.$formBoxHTml.find('.form').attr('id')
    $(`#${id}`).children('.group').each(function(i, elem) {
      if ($(elem).attr('data-xhtml') == 'table') {
        data[$(elem).attr('name')] =_this.getdataTable(elem)
      }else {
        data[$(elem).attr('name')] = _this.getdatachild(elem)
      }
    })
    // console.log(data)
    return data
  },
  getdataTable (elem){
    let _this = this
    let data ={}
    data[$(elem).attr('name')] = []
    if (_this.Mobile) {
      $(elem).find('.tbody .tr').each(function(i, el) {
        data[$(elem).attr('name')][i] = {}
        $(el).find(`.phone-form-group`).each(function (j, child) {
          let typeHtml = $(child).attr('data-xhtml') == 'text'? 'input':$(child).attr('data-xhtml') == 'datetimepicker'? 'input':'select'
          data[$(elem).attr('name')][i][$(child).find(typeHtml).attr('name')] = $(child).find(typeHtml).val()
        })
      })
    }else{
      $(elem).find('tbody tr').each(function(i, el) {
        data[$(elem).attr('name')][i] = {}
        $(elem).find(`th`).each(function (j, child) {
          data[$(elem).attr('name')][i][$(child).attr('name')] = $(el).find(`td [name=${$(child).attr('name')}]`).val()
        })
      })
    }
    return data
  },
  getdatachild(elem){
    let _this = this
    let data ={}
    $(elem).find('.group').each(function(i, el) {
      let obj = _this.getdata[$(el).attr('data-xhtml')](el)
      Object.assign(data, obj)
    })
    return data
  },
  getTime ($tdHtml,option) {
        if (option.lang = 'ch') {
          option.lang = 'zh'
        }
        option.format = option.format.replace(/Y/, 'yy')
        option.format = option.format.replace(/([^m])m[^m]/, '$1mm$1')
        option.format = option.format.replace(/([^d])(d$)/, '$1dd')
        option.format = option.format.replace(/([^d])d(\s)/, '$1dd$2')
        option.format = option.format.replace(/ H:/, ' HH:')
        option.format = option.format.replace(/^H:/, 'HH:')
        if (option.format.indexOf('s')>-1) {
          option.format = option.format.replace(/:i:/, ':ii:')
          option.format = option.format.replace(/:s$/, ':ss')
        } else {
          option.format = option.format.replace(/:i$/, ':ii')
        }
        console.log(option.format)
        let arr = option.format.split(' ')
        if (arr[0].indexOf('yy')> -1) {
          var dateFormat = arr[0]
        } else {
          var timeFormat = arr[0]
          var timeWheels = arr[0].replace(/:/g, '')
        }
        if (arr[1]) {
          var timeFormat = arr[1]
          var timeWheels = arr[1].replace(/:/g, '')
        }
        var currYear = (new Date()).getFullYear();
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = {preset : 'datetime'};
        opt.time = {preset : 'time'};
        opt.my_default = {
          theme: 'android-ics light', //皮肤样式
          display: 'bottom', //显示方式
          mode: 'scroller', //日期选择模式
          lang: option.lang,
          dateFormat: dateFormat,
          startYear:currYear-4, //开始年份
          endYear:currYear+4, //结束年份
          // minDate: new Date()
          timeFormat: timeFormat,
          timeWheels: timeWheels,
          width: 70,
        };
        var preset=''
        if (option.datepicker&&!option.timepicker) {
          preset = 'date'
        } else if (!option.datepicker&&option.timepicker) {
          preset ='time'
        } else {
          preset = 'datetime'
          opt.my_default.width = $('body').outerWidth()/5 - 30
        }
    $tdHtml.find('input').scroller('destroy').scroller($.extend(opt[preset], opt['my_default']));
  },
  getdata: {
    text (el) {
      let data = {}
      data[$(el).attr('name')] = $(el).find('input').val()
      return data
    },
    textarea (el) {
      let data = {}
      data[$(el).attr('name')] = $(el).find('textarea').val()
      return data
    },
    radio(el) {
      let data = {}
      $(el).find('input').each(function (i, v){                                                                                                                                                                                                                                                                                     
        if (v.checked) {
          data[$(el).attr('name')] =$(v).val()
        }
      })
      return data
    },
    checkbox (el) {
      let data = {}
      data[$(el).attr('name')] = []
      $(el).find('input').each(function (i, v){
        if (v.checked) {
          data[$(el).attr('name')].push($(v).val())
        }
      })
      return data
    },
    select (el) {
      let data = {}
      data[$(el).attr('name')] = $(el).find('select').val()
      return data
    },
    datetimepicker (el) {
      let data = {}
      data[$(el).attr('name')] = $(el).find('input').val()
      return data
    },
    file (el) {
      let data = {}
      let nameData = []
      $(el).find('.file-item').each(function (i,v) {
        nameData.push(JSON.parse($(this).attr('data-dataurl')))
      })
      data[$(el).attr('name')] = nameData
      return data
    },
    image (el) {
      let data = {}
      let nameData = []
      $(el).find('.file-item').each(function (i,v) {
        nameData.push(JSON.parse($(this).attr('data-dataurl')))
      })
      data[$(el).attr('name')] = nameData
      return data
    }
  },
  regFn (id) {
    $(id).validator({
      onValid: function(validity) {
        $(validity.field).closest('.am-form-group').find('.am-alert').hide();
      },
  
      onInValid: function(validity) {
        var $field = $(validity.field);
        var $group = $field.closest('.am-form-group');
        var $alert = $group.find('.am-alert');
        // 使用自定义的提示信息 或 插件内置的提示信息
        var msg = $field.data('validationMessage') || this.getValidationMessage(validity);
  
        if (!$alert.length) {
          $alert = $('<div class="am-alert am-alert-danger"></div>').hide().
            appendTo($group);
        }
  
        $alert.html(msg).show();
      }
    });
  }
}
authorize.form ={
  formHtml:  `<div class="am-panel am-panel-default group" data-xhtml="form">
  <header class="am-panel-hd">
    <h3 class="am-panel-title"></h3>
  </header>
  <div class="am-panel-bd" style="min-height: 100px;height: auto;">
    <form action="" class="am-form" id="">
      <fieldset class="am-g">
      </fieldset>
    </form>
  </div>
  </div>`,
  loadForm (page) {
    let $html = $(this.form.formHtml)
    $html.find('h3').text(page.title)
    $html.attr({'id': page.id, 'name': page.name})
    $html.find('form').attr('id', page.id+1)
    return $html
  }
}
authorize.phoneTable={
  tableHtml:`<div class="am-panel am-panel-default group" data-xhtml="table">
  <header class="am-panel-hd">
    <h3 class="am-panel-title"></h3>
  </header>
  <div class="am-panel-bd" style="min-height: 100px;height: auto;">
    <form action="" class="am-form" >
      <fieldset>
        <div class="tbody">
        </div>
        <div class="tfoot">
        </div>
        <button  type="button" class="am-btn addTh am-btn-secondary am-radius">
          添加
          <i class="am-icon-plus"></i>
        </button>
      </fieldset>
    </form>
  </div>
  </div>`,
  loadTable (page, eldata, elattribute) {
    let $html = $(this.phoneTable.tableHtml)
    let _this=this
    $html.find('h3').text(page.title)
    $html.attr({'id': page.id, 'name': page.name})
    $html.find('form').attr('id', page.id+123456)
    let collect = []
    page.content.forEach((el)=>{
      let tdData = ''
      if (!elattribute[el.name]) {
        elattribute[el.name] = {}
        elattribute[el.name].ifWrite = el.data.ifWrite
        elattribute[el.name].ifShow = el.data.ifShow
        elattribute[el.name].ifEditor = el.data.ifEditor
        elattribute[el.name].ifCollect = el.data.ifCollect
      }
      if(elattribute[el.name].ifCollect) {
        collect.push(el.name)
        let $divTd = this.phoneTable.addChild(_this, el, '', elattribute[el.name])
        $divTd.find('input').attr({'name': `_sum_${el.name}`, 'disabled': true})
        if ($html.find('.tfoot .tr')[0]) {
          $html.find('.tfoot .tr').eq(0).append($divTd)
        } else {
          $html.find('.tfoot').append('<div class="tr content am-g"><div class="th">总结</div></div>')
          $html.find('.tfoot .tr').eq(0).append($divTd)
        }
      }
      if (eldata[page.name]&&eldata[page.name].length){
        eldata[page.name].forEach((v, i) => {
          tdData = v[el.name]
          let $divTd = this.phoneTable.addChild(_this,el, tdData, elattribute[el.name])
          if ($html.find('.tbody .tr')[i]) {
            $html.find('.tbody .tr').eq(i).append($divTd)
          } else {
            $html.find('.tbody').append('<div class="tr content am-g"></div>')
            $html.find('.tbody .tr').eq(i).append($divTd)
          }
        })
      } else {
        let $divTd = this.phoneTable.addChild(_this, el, '', elattribute[el.name])
        if ($html.find('.tbody .tr')[0]) {
          $html.find('.tbody .tr').eq(0).append($divTd)
        } else {
          $html.find('.tbody').append('<div class="tr content am-g"></div>')
          $html.find('.tbody .tr').eq(0).append($divTd)
        }
      }
    })
    collect.forEach(v => {
      let sum = 0
      $html.find(`.tbody .tr [name = ${v}]`).each((i, e) => {
        sum += parseFloat($(e).val() || 0)
      })
      $html.find(`.tfoot [name = _sum_${v}]`).val(sum.toFixed(2))
    })
    $html.find('.tbody .tr').append('<div class="iconDelete" style="display:none"><i class="am-icon-close"></i></div>')
    $html.on('click', '.tbody .tr', function () {
      $('.tbody .tr').removeClass('active')
      $('.iconDelete').hide()
      $(this).addClass('active')
      $(this).find('.iconDelete').show()
    })
    $html.find('.addTh').click(function(){
      _this.phoneTable.addtr.call(this, _this,  page, elattribute)
    })
    $html.find('.iconDelete').click(function () {
      if ($('.tbody .tr').length > 1) {
        $('.tbody .tr.active').remove()
      } else {
        alert('已经是最后一个了')
      }
    })
    return $html
  },
  addtr(_this, page, elattribute){
    $('.tbody .tr').removeClass('active')
    $('.iconDelete').hide()
    let $divTr = $('<div class="tr content am-g active"><div class="iconDelete"><i class="am-icon-close"></i></div></div>')
    page.content.forEach((el)=>{
      $divTr.append(_this.phoneTable.addChild(_this, el, '', elattribute[el.name]))
    })
    $(this).parent().find('.tbody').append($divTr)
  },
  addChild (_this, el, tDdata, tDattribute) {
    if (el.type == 'text') {
      let $tdHtml =$(`<div class="am-form-group  phone-form-group am-u-sm-12 " data-xhtml="text">
        <div class="phone-group">
          <div class ="phone-label">
            <label for="" class="title "><span></span>:</label>
          </div>
          <input type="text" id="" class="phone-item" minlength="" placeholder="" value="" data-validation-message="" pattern=""/>
        </div>
      </div>`)
      $tdHtml.find('.title span').text(el.titleTh)
      $tdHtml.find('input').attr({
        'name': el.name,
        'value': el.data.value,
        'placeholder': el.placeholder,
        'data-validation-message': el.data.option.err,
        'pattern': el.data.option.reg
      })
      if (tDdata) {
        $tdHtml.find('input').attr({'value': tDdata})
      }
      if (tDattribute.ifWrite) {
        $tdHtml.find('.title').append('<sup class="am-text-danger">*</sup>')
        $tdHtml.find('input').attr('required', true)
      }
      if (!tDattribute.ifShow) {
        $tdHtml.find('input').replaceWith('<div class="phone-item" style="text-align: center;"> —— </div>')
      }
      if (!tDattribute.ifEditor) {
        $tdHtml.find('input').attr('disabled', true)
      }
      if (tDattribute.ifCollect) {
        $tdHtml.find('input').on('input',function () {
          let sum = 0
          $(this).parent().parent().parent().parent().find(`[name = ${el.name}]`).each(function () {
            sum += parseFloat($(this).val() || 0)
          })
          $(this).parent().parent().parent().parent().parent().find(`.tfoot [name = _sum_${el.name}]`).val(sum.toFixed(2))
        })
      }
      return $tdHtml
    } else if (el.type == 'select') {
      let $tdHtml = $(`<div class="am-form-group phone-form-group am-u-sm-12" data-xhtml="select">
        <div class="phone-group">
          <div class="phone-label">
              <label for="" class="title"><span>交通工具</span>:</label>
            </div>
            <div style="background:#fff;width:70%">
              <select data-am-selected="{btnWidth: '100%'}">
              </select>
            </div>
        </div>
      </div>`)
      $tdHtml.find('.title span').text(el.titleTh)
      $tdHtml.find('select').attr({'name': el.name})
      el.data.value.forEach(v => {
        let option = `<option value="${v.value}">${v.value}</option>`
        let $option = $(option)
        if (tDdata) {
          if (v.value == tDdata) {
            $option.attr('selected', true)
          } else {
            $option.attr('selected', false)
          }
        } else {
          $option.attr('selected', v.selected)
        }
        $tdHtml.find('select').append($option)
      })
      if (tDattribute.ifWrite) {
        $tdHtml.find('.title').append('<sup class="am-text-danger">*</sup>')
        $tdHtml.find('select').attr('required', true)
      }
      if (!tDattribute.ifShow) {
        $tdHtml.find('select').replaceWith('<div class="phone-item" style="text-align: center;width:100%"> —— </div>')
      }
      if (!tDattribute.ifEditor) {
        $tdHtml.find('select').attr('disabled', true)
      }
      return $tdHtml
    } else {
      let $tdHtml = $(`<div class="am-form-group phone-form-group am-u-sm-12 " data-xhtml="datetimepicker">
        <div class="phone-group">
          <div class ="phone-label">
            <label for="" class="title "><span></span>:</label>
          </div>
          <input type="text"class="phone-item" />
        </div>
        
      </div>`)
      $tdHtml.find('.title span').text(el.titleTh)
      $tdHtml.find('input').attr('name', el.name)
      if (tDdata) {
        $tdHtml.find('input').attr({'value': tDdata})
      } else {
        $tdHtml.find('input').attr({'value': el.data.value})
      }
      if (tDattribute.ifWrite) {
        $tdHtml.find('.title').append('<sup class="am-text-danger">*</sup>')
        $tdHtml.find('input').attr('required', true)
      }
      
      if (!tDattribute.ifShow) {
        $tdHtml.find('input').replaceWith('<div class="phone-item" style="text-align: center;"> —— </div>')
      }
      if (!tDattribute.ifEditor) {
        $tdHtml.find('input').attr('disabled', true)
      } else {
        // $.datetimepicker.setLocale(el.data.option.lang);
        // $tdHtml.find('input').datetimepicker(el.data.option)
        _this.getTime($tdHtml, el.data.option)
      }
      return $tdHtml
    }
  }
}
authorize.table = {
  tableHtml: `<div class="am-panel am-panel-default group" data-xhtml="table">
  <header class="am-panel-hd">
    <h3 class="am-panel-title"></h3>
  </header>
  <div class="am-panel-bd" style="min-height: 100px;height: auto;">
    <form action="" class="am-form" >
      <fieldset>
        <button  type="button" class="am-btn addTh am-btn-secondary am-radius">
          添加
          <i class="am-icon-plus"></i>
        </button>
        <button type="button" class="am-btn formDeleteTh am-btn-danger am-radius">
          删除
          <i class="am-icon-trash"></i>
        </button>
        <table class="table_panel am-table am-table-bordered am-table-centered ">
          <thead>
            <tr>
            </tr>
          </thead>
          <tfoot>
          <tr></tr>
          </tfoot>
          <tbody>
          </tbody>
        </table>
      </fieldset>
    </form>
  </div>
  </div>`,
  loadTable (page, eldata, elattribute) {
    let $html = $(this.table.tableHtml)
    let _this=this
    $html.find('h3').text(page.title)
    $html.attr({'id': page.id, 'name': page.name})
    $html.find('form').attr('id', page.id+123456)
    let Collect = []
    page.content.forEach((el)=>{
      if (!elattribute[el.name]) {
        elattribute[el.name] = {}
        elattribute[el.name].ifWrite = el.data.ifWrite
        elattribute[el.name].ifShow = el.data.ifShow
        elattribute[el.name].ifEditor = el.data.ifEditor
        elattribute[el.name].ifCollect = el.data.ifCollect
      }
      if (elattribute[el.name].ifCollect) {
        Collect.push(el.name)
        $html.find('tfoot tr').append(`<td><div class="am-form-group">
          <input type="text" name="_sum_${el.name}" disabled/>
        </div></td>`)
      } else {
        $html.find('tfoot tr').append(`<td>-</td>`)
      }
      let $thHTml= $(`<th></th>`)
      $thHTml.attr('name', el.name)
      $thHTml.text(el.titleTh)
      if (elattribute[el.name].ifWrite) {
        $thHTml.append('<sup class="am-text-danger">*</sup>')
      }
      $html.find('thead tr').append($thHTml)
      if (eldata[page.name]&&eldata[page.name].length) {
        eldata[page.name].forEach((v, i) => {
          tdData = v[el.name]
          let $tD = _this.table.ChildHtml(el, tdData, elattribute[el.name])
          let $tDHtml=$(`<td></td>`)
          $tDHtml.append($tD)
          if ($html.find('tbody tr')[i]) {
            $html.find('tbody tr').eq(i).append($tDHtml)
          } else {
            $html.find('tbody').append('<tr></tr>')
            $html.find('tbody tr').eq(i).append($tDHtml)
          }
        })
      } 
    })
    if (!Collect.length) {
      $html.find('tfoot tr').html('')
    }
    Collect.forEach(v => {
      let sum = 0
      $html.find(`td [name = ${v}]`).each(function(){
        sum += parseFloat($(this).val() || 0)
      })
      $html.find(`td [name = _sum_${v}]`).val(sum.toFixed(2))
    })
    $html.find('.addTh').click(function () {
      _this.table.addTH.call(this, _this, page,elattribute)
    })
    $html.find('.formDeleteTh').click(function () {
      $('tbody tr.active').remove()
    })
    $html.on('click', 'tbody tr', function () {
      $('tbody tr').removeClass('active')
      $(this).addClass('active')
    })
    return $html
  },
  addTH (_this,page, elattribute){
    $('tbody tr').removeClass('active')
    let $tr = $(`<tr class="active"></tr>`)
    
    page.content.forEach(el =>{
      let $tDHtml=$(`<td></td>`)
      $tDHtml.append(_this.table.ChildHtml(el, '', elattribute[el.name]))
      $tr.append($tDHtml)
    })
    $(this).parent().find('tbody').append($tr)
  },
  ChildHtml (el, tDdata, tDattribute) {
    if (el.type == 'text') {
      let $text =$(`<input type="text" id="" minlength="" placeholder="" value="" data-validation-message="" pattern=""/>`)
      $text.attr({
        'name': el.name,
        'value': el.data.value,
        'placeholder': el.placeholder,
        'data-validation-message': el.data.option.err,
        'pattern': el.data.option.reg
      })
      if (tDdata) {
        $text.attr({'value': tDdata})
      }
      if (tDattribute.ifWrite) {
        $text.attr('required', true)
      }
      if (!tDattribute.ifShow) {
        $text = $('<div>-</div>')
      }
      if (!tDattribute.ifEditor) {
        $text.attr('disabled', true)
      }
      if (tDattribute.ifCollect) {
        $text.on('input', function() {
          let sum = 0
          $(this).parent().parent().parent().parent().parent().find(`td [name = ${el.name}]`).each(function (i, child) {
            sum += parseFloat($(this).val()||0)
          })
          $(this).parent().parent().parent().parent().parent().find(`td [name = _sum_${el.name}]`).val(sum.toFixed(2))
        })
      }
       let $form = $(`<div class="am-form-group">
                </div>`)
      $form.append($text)
      return $form
    } else if (el.type == 'select') {
      let $select = $(`<div class="am-form-group" style="background:#fff"><select data-am-selected="{btnWidth: '100%'}">
      </select>
      </div`)
      $select.find('select').attr('name', el.name)
      el.data.value.forEach(v => {
        let option = `<option value="${v.value}">${v.value}</option>`
        let $option = $(option)
        if (tDdata) {
          if (v.value == tDdata) {
            $option.attr('selected', true)
          } else {
            $option.attr('selected', false)
          }
        } else {
          $option.attr('selected', v.selected)
        }
        $select.find('select').append($option)
      })
      if (tDattribute.ifWrite) {
        $select.find('select').attr('required', true)
      }
      if (!tDattribute.ifShow) {
        $select.html('-')
      }
      if (!tDattribute.ifEditor) {
        $select.find('select').attr('disabled', true)
      }
      return $select
    } else {
      let $datetimepicker = $(`<div class="am-form-group"><input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly"/></div>`)
      $datetimepicker.find('input').attr('name', el.name)
      if (tDdata) {
        $datetimepicker.find('input').attr({'value': tDdata})
      } else {
        $datetimepicker.find('input').attr({'value': el.data.value})
      }
      if (tDattribute.ifWrite) {
        $datetimepicker.find('input').attr('required', true)
      }
      if (!tDattribute.ifShow) {
        $datetimepicker.html('-')
      }
      $datetimepicker.find('input').attr({'placeholder': el.placeholder})
      if (!tDattribute.ifEditor) {
        $datetimepicker.find('input').attr('disabled', true)
      } else {
        $.datetimepicker.setLocale(el.data.option.lang);
        $datetimepicker.find('input').datetimepicker(el.data.option)
      }
      return $datetimepicker
    }
  }
}
authorize.text = {
  textHtml: `<div class="am-form-group group am-u-sm-12" data-xhtml="text">
      <label for="" class="title"><span></span>:</label>
      <div class="subhead"></div>
      <input type="text" id="" minlength="" placeholder="" value="" data-validation-message="" pattern=""/>
      </div>`,
  loadText (page, eldata, elattribute) {
    let $html = $(this.text.textHtml)
    $html.find('.title span').text(page.title)
    // $html.attr('id', page.id)
    $html.addClass(`am-u-md-${page.grid}`)
    $html.attr({'id': page.id, 'name': page.name})
    $html.find('input').attr('value',page.data.value)
    $html.find('input').attr({'placeholder': page.placeholder, 'id': page.id+1, 'data-validation-message': page.data.option.err, 'pattern': page.data.option.reg})
    $html.find('label').attr('for', page.id+1)
    $html.find('.subhead').text(page.subhead)
    if (typeof eldata  === 'object' && eldata[page.name]) {
      $html.find('input').attr('value', eldata[page.name])
    }
    if (typeof elattribute === 'object' && elattribute[page.name]) {
      if (elattribute[page.name].ifWrite){
        $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
        $html.find('input').attr('required', true)
      }
      if (!elattribute[page.name].ifShow) {
        $html.css({'display': 'none'})
      }
      if (!elattribute[page.name].ifEditor) {
        $html.find('input').attr('disabled', true)
      }
    } else {
      if (page.data.ifWrite){
        $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
        $html.find('input').attr('required', true)
      }
      if (!page.data.ifShow) {
        $html.css({'display': 'none'})
      }
      if (!page.data.ifEditor) {
        $html.find('input').attr('disabled', true)
      }
    }
    return $html[0].outerHTML
  } 
}

authorize.textarea = {
  textareaHtml: `<div class="am-form-group group am-u-sm-12" data-xhtml="textarea">
    <label for="" class="title"><span></span>:</label>
    <div class="subhead"></div>
    <textarea id=""></textarea>
    </div>`,
  loadTextarea (page, eldata, elattribute) {
    let $html = $(this.textarea.textareaHtml)
    $html.find('.title span').text(page.title)
    // $html.attr({'id': page.id})
    $html.addClass(`am-u-md-${page.grid}`)
    $html.attr({'id': page.id, 'name': page.name})
    $html.find('textarea').html(page.data.value)
    $html.find('.subhead').text(page.subhead)
    if (typeof eldata  === 'object' && eldata[page.name]) {
      $html.find('textarea').html(eldata[page.name])
    }
    $html.find('textarea').attr({'id': page.id+1, 'placeholder': page.placeholder, 'name': page.name})
    $html.find('.subhead').html(page.subhead)
    if (typeof elattribute === 'object' && elattribute[page.name]) {
      if (elattribute[page.name].ifWrite){
        $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
        $html.find('textarea').attr('required', true)
      }
      if (!elattribute[page.name].ifShow) {
        $html.css({'display': 'none'})
      }
      if (!elattribute[page.name].ifEditor) {
        $html.find('textarea').attr('disabled', true)
      }
    } else {
      if (page.data.ifWrite){
        $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
        $html.find('textarea').attr('required', true)
      }
      if (!page.data.ifShow) {
        $html.css({'display': 'none'})
      }
      if (!page.data.ifEditor) {
        $html.find('textarea').attr('disabled', true)
      }
    }
    return $html[0].outerHTML
  }
}
authorize.radio={
  radioHtml:`<div class="am-form-group group am-u-sm-12" data-xhtml="radio">
  <h3 class="title"><span></span>:</h3>
  <div class="subhead"></div>
  <div class="label"></div>
  <div>`,
  loadRadio (page, eldata, elattribute) {
    let $html = $(this.radio.radioHtml)
    $html.addClass(`am-u-md-${page.grid}`)
    $html.attr({'id': page.id, 'name': page.name})
    $html.find('.title span').html(page.title)
    $html.find('.subhead').text(page.subhead)
    page.data.value.forEach(v => {
      let label = `<label class="am-radio">
        <input type="radio" name="${page.name}" value="${v.value}" data-am-ucheck> ${v.value}
        </label>`
      let $label = $(label)
      if(eldata[page.name] === v.value) {
        $label.find('input').attr('checked', true)
      } else {
        $label.find('input').attr('checked', v.checked)
      }
      $html.find('.label').append($label)
    })
    if (elattribute[page.name]) {
      if (elattribute[page.name].ifWrite) {
        $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
        $html.find('input').eq(0).attr('required', true)
      }
      if (!elattribute[page.name].ifShow) {
        $html.css({'display': 'none'})
      }
      if (!elattribute[page.name].ifEditor) {
        $html.find('input').attr('disabled', true)
      }
    } else {
      if (page.data.ifWrite){
        $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
        $html.find('input').eq(0).attr('required', true)
      }
      if (!page.data.ifShow) {
        $html.css({'display': 'none'})
      }
      if (!page.data.ifEditor) {
        $html.find('input').attr('disabled', true)
      }
    }
    return $html[0].outerHTML
  }
}
authorize.checkbox ={
  checkboxHtml: `<div class="am-form-group group am-u-sm-12" data-xhtml="checkbox">
    <h3 class="title"><span></span></h3>
    <div class="subhead"></div>
    <div class="label"></div>
  </div>`,
  loadCheckbox(page, eldata, elattribute) {
    let $html = $(this.checkbox.checkboxHtml)
    $html.addClass(`am-u-md-${page.grid}`)
    $html.find('.title span').html(page.title)
    $html.attr({'id': page.id, 'name': page.name})
    $html.find('.subhead').text(page.subhead)
    page.data.value.forEach(v => {
      let label =  `<label class="am-checkbox">
        <input type="checkbox" name="${page.name}" value="${v.value}" data-am-ucheck> ${v.value}
        </label>`
      let $label = $(label)
      if (eldata[page.name]) {
        eldata[page.name].forEach(e => {
          if (e === v.value) {
            $label.find('input').attr('checked', true)
          }
        })
      } else {
        $label.find('input').attr('checked', v.checked)
      }
      $html.find('.label').append($label)
    })
    if (elattribute[page.name]) {
      if (elattribute[page.name].ifWrite) {
        $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
        $html.find('input').eq(0).attr('required', true)
      }
      if (!elattribute[page.name].ifShow) {
        $html.css({'display': 'none'})
      }
      if (!elattribute[page.name].ifEditor) {
        $html.find('input').attr('disabled', true)
      }
    } else {
      if (page.data.ifWrite){
        $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
        $html.find('input').eq(0).attr('required', true)
      }
      if (!page.data.ifShow) {
        $html.css({'display': 'none'})
      }
      if (!page.data.ifEditor) {
        $html.find('input').attr('disabled', true)
      }
    }
    return $html[0].outerHTML
  }
}
authorize.select = {
  selectHtml: `
  <div class="am-form-group group am-u-sm-12" data-xhtml="select">
    <label for="" class="title"><span></span></label>
    <div class="subhead"></div>
    <select data-am-selected="{btnWidth: '100%'}">
    </select>
    </div>`,
  loadSelect (page, eldata, elattribute) {
    let $html = $(this.select.selectHtml)
    $html.addClass(`am-u-md-${page.grid}`)
    $html.attr({'id': page.id, 'name': page.name})
    $html.find('.title span').html(page.title)
    $html.find('.subhead').text(page.subhead)
    page.data.value.forEach(v => {
      let option = `<option value="${v.value}">${v.value}</option>`
      let $option = $(option)
      if (eldata[page.name] === v.value){
        $option.attr('selected', true)
      } else {
        $option.attr('selected', v.selected)
      }
      $html.find('select').append($option)
    })
    if (elattribute[page.name]) {
      if (elattribute[page.name].ifWrite) {
        $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
        $html.find('select').eq(0).attr('required', true)
      }
      if (!elattribute[page.name].ifShow) {
        $html.css({'display': 'none'})
      }
      if (!elattribute[page.name].ifEditor) {
        $html.find('select').attr('disabled', true)
      }
    } else {
      if (page.data.ifWrite){
        $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
        $html.find('select').eq(0).attr('required', true)
      }
      if (!page.data.ifShow) {
        $html.css({'display': 'none'})
      }
      if (!page.data.ifEditor) {
        $html.find('select').attr('disabled', true)
      }
    }
    return $html[0].outerHTML
  }
}

authorize.datetimepicker = {
  datetimepickerHtml: `<div class="am-form-group group am-u-sm-12" data-xhtml="datetimepicker">
    <label for="doc-vld-name" class="title"><span></span></label>
    <div class="subhead"></div>
        <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly"/>
    </div>`,
  loadDatetimepicker (page, eldata, elattribute) {
    let $html = $(this.datetimepicker.datetimepickerHtml)
    $html.addClass(`am-u-md-${page.grid}`)
    $html.find('.title span').html(page.title)
    $html.attr({'id': page.id, 'name': page.name})
    $html.find('.subhead').text(page.subhead)
    if (eldata[page.name]) {
      $html.find('input').val(eldata[page.name])
    } else {
      $html.find('input').val(page.data.value)
    }
    if (elattribute[page.name]) {
      if (elattribute[page.name].ifWrite) {
        $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
        $html.find('input').attr('required', true)
      }
      if (!elattribute[page.name].ifShow) {
        $html.css({'display': 'none'})
      }
      if (!elattribute[page.name].ifEditor) {
        $html.find('input').attr('disabled', true)
      } else {
        $.datetimepicker.setLocale(page.data.option.lang);
        $html.find('input').datetimepicker(page.data.option)
      }
    } else {
      if (page.data.ifWrite){
        $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
        $html.find('input').attr('required', true)
      }
      if (!page.data.ifShow) {
        $html.css({'display': 'none'})
      }
      if (!page.data.ifEditor) {
        $html.find('input').attr('disabled', true)
      } else {
        if (!this.Mobile) {
          $.datetimepicker.setLocale(page.data.option.lang);
          $html.find('input').datetimepicker(page.data.option)
        } else {
          this.getTime($html, page.data.option)
        }
      }
    }
    $html.find('input').attr({'placeholder': page.placeholder, 'id': page.id+1, 'name': page.name})
    return $html
  }
}
authorize.file = {
  fileHtml: `<div class="am-form-group group am-u-sm-12" data-xhtml="file">
      <label for="" class="title"><span></span></label>
      <div class="subhead"></div>
      <div class="upload-btn">
        <i class="am-icon-cloud-upload"></i>
        <span>选择文件</span>
        <input type="file" id="" data-required="" class="am-form-field file-input nameValue" multiple="multiple"/>
      </div>
      <div class="file-list">
      </div>
    </div>`,
  loadFile (page, eldata, elattribute) {
    let $html = $(this.file.fileHtml) 
    let _this = this
    $html.addClass(`am-u-md-${page.grid}`)
    $html.find('.title span').text(page.title)
    $html.find('.subhead').text(page.subhead)
    $html.attr({'id': page.id, 'name': page.name})
    $html.find('label').attr('for', page.id+1)
    $html.find('input').attr({'id': page.id+1, name: page.name})
    if (elattribute[page.name]) {
      page.data.ifWrite = elattribute[page.name].ifWrite
      page.data.ifShow = elattribute[page.name].ifShow
      page.data.ifEditor = elattribute[page.name].ifEditor
    }
    if (page.data.ifWrite) {
      $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
      $html.find('input').attr('data-required', true)
    }
    if (!page.data.ifShow) {
      $html.css({'display': 'none'})
    }
    if (!page.data.ifEditor) {
      $html.find('input').attr('disabled', true)
    }
    if (eldata[page.name]) {
      eldata[page.name].forEach((v) => {
        let $fileItem = $(`<div class="file-item" data-dataurl="">
              <div class="file-left">
                <div class="file-title"><a download="" target="_blank" href="">天天.text</a></div>
                <div class="file-size">256kb</div>
              </div>
              <div class="file-right">
                <i class="am-icon-trash"></i>
              </div>
            </div>`)
        let size = v.size/1024 > 1024? (v.size/1024/1024).toFixed(2) + 'M': (v.size/1024).toFixed(2) + 'KB'
        $fileItem.find('.file-title a').text(v.name)
        $fileItem.find('.file-title a').attr({'href': v.dataUrl, 'download': v.name})
        $fileItem.find('.file-size').text(size)
        let data = {
          name: v.name,
          size: v.size,
          dataUrl: v.dataUrl
        }
        $fileItem.attr('data-dataurl', JSON.stringify(data))
        if (!page.data.ifEditor) {
          $fileItem.find('i').hide()
        }
          $fileItem.find('i').click(function () {
            $(this).parent().parent().remove()
            if ($(`#${$html.attr('id')}`).find('.file-item').length === 0) {
              $(`#${$html.attr('id')}`).find('input').val('')
              if (!page.data.ifWrite) {return}
              $(`#${$html.attr('id')}`).find('.am-alert').remove()
              $(`#${$html.attr('id')}`).append(`<div class="am-alert am-alert-danger" style="display: block;">请选择文件</div>`)
              $(`#${$html.attr('id')}`).addClass('am-form-error')
              $(`#${$html.attr('id')}`).removeClass('am-form-success')
            }
          })
        $html.find('.file-list').append($fileItem)
      })
    }
    $html.find('input').change(function () {
      if (_this.preview_flag){
    		_this.file.preview.call(this, page, _this)
    	}else{
    		_this.file.getFile.call(this, page, _this)
    	}
    })
    return $html
  },
  getFile (page, _this) {
    let filethis = this
    let data = new FormData()
    let url=coos.getRootPath()+'fileUpload/upload.do'
    if (!this.files.length) {return}
    for (var i = 0; i < this.files.length; i++) {
      data.append(i, this.files[i])
    }
    $.ajax({
      url: url,
      data: data,
      type : 'post',
      processData : false,
      contentType: false,
      success: function (res){
        $(filethis).parent().parent().find('input').val('')
        for (var j = 0; j < res.result.length; j++) {
          let $fileItem = $(`<div class="file-item" data-dataurl="">
            <div class="file-left">
              <div class="file-title"><a download="" target="_blank" href=""></a></div>
              <div class="file-size"></div>
            </div>
            <div class="file-right">
              <i class="am-icon-trash "></i>
            </div>
          </div>`)
          let file = res.result[j]
          let size = file.size/1024 > 1024? (file.size/1024/1024).toFixed(2) + 'M': (file.size/1024).toFixed(2) + 'KB'
          $fileItem.find('.file-title a').text(file.name)
          $fileItem.find('.file-title a').attr({'href': file.dataUrl, 'download': file.name})
          $fileItem.find('.file-size').text(size)
          $fileItem.attr('data-dataurl', JSON.stringify(file))
          $fileItem.find('i').click(function () {
            $(this).parent().parent().remove()
            if ($(filethis).parent().parent().find('.file-item').length === 0) {
              $(filethis).parent().parent().find('input').val('')
              if (!page.data.ifWrite) {return}
              $(filethis).parent().parent().find('.am-alert').remove()
              $(filethis).parent().parent().append(`<div class="am-alert am-alert-danger" style="display: block;">请选择文件</div>`)
              $(filethis).parent().parent().addClass('am-form-error')
              $(filethis).parent().parent().removeClass('am-form-success')
            }
          })
          $(filethis).parent().parent().find('.am-alert').remove()
          $(filethis).parent().parent().addClass('am-form-success')
          $(filethis).parent().parent().removeClass('am-form-error')
          $(filethis).parent().parent().find('.file-list').append($fileItem)
        }
      }
    })
  },
  preview (page, _this) {
    let filethis = this
      for (var i = 0; i < this.files.length; i++) {
        let $fileItem = $(`<div class="file-item" data-dataurl="">
            <div class="file-left">
              <div class="file-title"><a download="" target="_blank" href=""></a></div>
              <div class="file-size"></div>
            </div>
            <div class="file-right">
              <i class="am-icon-trash "></i>
            </div>
          </div>`)
        if (!this.files.length) {
          $(`#${$html.attr('id')}`).find('input').val('')
          if (!page.data.ifWrite) {return}
          $(`#${$html.attr('id')}`).find('.am-alert').remove()
          $(`#${$html.attr('id')}`).append(`<div class="am-alert am-alert-danger" style="display: block;">请选择文件</div>`)
          $(`#${$html.attr('id')}`).addClass('am-form-error')
          $(`#${$html.attr('id')}`).removeClass('am-form-success')
        }
        let file = this.files[i]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
          // console.log(file, reader)
          let size = file.size/1024 > 1024? (file.size/1024/1024).toFixed(2) + 'M': (file.size/1024).toFixed(2) + 'KB'
          $fileItem.find('.file-title a').text(file.name)
          $fileItem.find('.file-title a').attr({'href': reader.result, 'download': file.name})
          $fileItem.find('.file-size').text(size)
          let data = {
            name: file.name,
            size: file.size,
            dataUrl: reader.result
          }
          $fileItem.attr('data-dataurl', JSON.stringify(data))
          $fileItem.find('i').click(function () {
            $(this).parent().parent().remove()
            if ($(filethis).parent().parent().find('.file-item').length === 0) {
              $(filethis).parent().parent().find('input').val('')
              if (!page.data.ifWrite) {return}
              $(filethis).parent().parent().find('.am-alert').remove()
              $(filethis).parent().parent().append(`<div class="am-alert am-alert-danger" style="display: block;">请选择文件</div>`)
              $(filethis).parent().parent().addClass('am-form-error')
              $(filethis).parent().parent().removeClass('am-form-success')
            }
          })
          $(filethis).parent().parent().find('.am-alert').remove()
          $(filethis).parent().parent().addClass('am-form-success')
          $(filethis).parent().parent().removeClass('am-form-error')
          $(filethis).parent().parent().find('.file-list').append($fileItem)
        }
      }
  }
}

authorize.image = {
  imageHtml: `<div class="am-form-group group am-u-sm-12" data-xhtml="image">
    <label for="" class="title"><span></span></label>
    <div class="subhead"></div>
    <div class="upload-btn">
      <i class="am-icon-image"></i>
      <span>选择图片</span>
      <input type="file" id="" data-required="" accept=".jpg,.jpeg,.png,.gif" class="am-form-field file-input nameValue" multiple="multiple"/>
    </div>
    <div class="file-list">
    </div>
  </div>`,
  loadImage (page, eldata, elattribute) {
    let $html = $(this.image.imageHtml)
    $html.addClass(`am-u-md-${page.grid}`)
    if (elattribute[page.name]) {
      page.data.ifWrite = elattribute[page.name].ifWrite
      page.data.ifShow = elattribute[page.name].ifShow
      page.data.ifEditor = elattribute[page.name].ifEditor
    }
    let _this = this
    $html.find('.title span').text(page.title)
    $html.find('.subhead').text(page.subhead)
    $html.attr({'id': page.id, 'name': page.name})
    $html.find('label').attr('for', page.id+1)
    $html.find('input').attr({'id': page.id+1, name: page.name})
    $html.find('input').change(function () {
      if (_this.preview_flag){
    		_this.image.preview.call(this, page, _this)
    	}else{
    		_this.image.getImage.call(this, page, _this)
    	}
    })
    if (elattribute[page.name]) {
      page.data.ifWrite = elattribute[page.name].ifWrite
      page.data.ifShow = elattribute[page.name].ifShow
      page.data.ifEditor = elattribute[page.name].ifEditor
    }
    if (page.data.ifWrite) {
      $html.find('.title').append(`<sup class="am-text-danger">*</sup>`)
      $html.find('input').attr('data-required', true)
    }
    if (!page.data.ifShow) {
      $html.css({'display': 'none'})
    }
    if (!page.data.ifEditor) {
      $html.find('input').attr('disabled', true)
    }
    if (eldata[page.name]) {
      eldata[page.name].forEach((v) => {
        let $imgItem = $(`<div class="file-item" data-dataurl="">
          <img src='' class="img-left"/>
          <div class="file-content">
            <div class="file-title">ttkkk.png</div>
            <div class="file-size">785KB</div>
          </div>
          <div class="file-right">
            <i class="am-icon-trash "></i>
          </div>
        </div>`)
        let size = v.size/1024 > 1024? (v.size/1024/1024).toFixed(2) + 'M': (v.size/1024).toFixed(2) + 'KB'
        $imgItem.find('.file-title').text(v.name)
        // $imgItem.find('.file-title a').attr({'href': v.dataUrl, 'download': v.name})
        $imgItem.find('.file-size').text(size)
        $imgItem.find('.img-left').attr('src', v.dataUrl)
        if (!page.data.ifEditor) {
          $imgItem.find('i').hide()
        }
        this.image.btnImg($imgItem, v.dataUrl)
        $imgItem.find('i').click(function () {
          $(this).parent().parent().remove()
          if (!$(`#${page.id}`).find('.file-item').length){
            $(`#${page.id}`).find('input').val('')
            if (!page.data.ifWrite) {return}
              $(`#${page.id}`).find('.am-alert').remove()
              $(`#${page.id}`).append(`<div class="am-alert am-alert-danger" style="display: block;">请选择文件</div>`)
              $(`#${page.id}`).addClass('am-form-error')
              $(`#${page.id}`).removeClass('am-form-success')
          }
        })
        let data = {
          name: v.name,
          size: v.size,
          dataUrl: v.dataUrl
        }
        
        $imgItem.attr('data-dataurl', JSON.stringify(data))
        $html.find('.file-list').append($imgItem)
      })
    }
    return $html
  },
  btnImg ($imgItem, url) {
    $imgItem.find('.img-left').click(function(){
      let html =`<div class="img-Box">
        <img src="${url}" class="img-lg"/>
      </div>`
      let $html = $(html)
      $html.click(function () {
        $(this).remove()
      })
      $("body").append($html)
    })
  },
  preview (page, _this) {
    let thisImage = this
    for (var i = 0; i < this.files.length; i++) {
      let $fileItem = $(`<div class="file-item" data-dataurl="">
          <img src='' class="img-left"/>
          <div class="file-content">
            <div class="file-title">ttkkk.png</div>
            <div class="file-size">785KB</div>
          </div>
          <div class="file-right">
            <i class="am-icon-trash "></i>
          </div>
      </div>`)
      let file = this.files[i]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = function () {
        let size = file.size/1024 > 1024? (file.size/1024/1024).toFixed(2) + 'M': (file.size/1024).toFixed(2) + 'KB'
        $fileItem.find('.img-left').attr('src', reader.result)
        $fileItem.find('.file-title').text(file.name)
        // $fileItem.find('.file-title a').attr({'href': reader.result, 'download': file.name})
        $fileItem.find('.file-size').text(size)
        let data = {
          name: file.name,
          size: file.size,
          dataUrl: reader.result
        }
        $fileItem.attr('data-dataurl', JSON.stringify(data))
        _this.image.btnImg($fileItem, reader.result)
        $fileItem.find('i').click(function () {
          $(this).parent().parent().remove()
          if (!$(thisImage).parent().parent().find('.file-item').length){
            $(thisImage).parent().parent().find('input').val('')
            if (!page.data.ifWrite) {return}
              $(thisImage).parent().parent().find('.am-alert').remove()
              $(thisImage).parent().parent().append(`<div class="am-alert am-alert-danger" style="display: block;">请选择文件</div>`)
              $(thisImage).parent().parent().addClass('am-form-error')
              $(thisImage).parent().parent().removeClass('am-form-success')
          }
        })
        $(thisImage).parent().parent().find('.file-list').append($fileItem)
      }
    } 
  },
  getImage (page, _this) {
    let thisImage = this
    let data = new FormData()
    let url=coos.getRootPath()+'fileUpload/upload.do'
    if (!this.files.length) {return}
    for (var i = 0; i < this.files.length; i++) {
      data.append(i, this.files[i])
    }
    $.ajax({
      url: url,
      data : data,
      type : 'post',
      processData : false,
      contentType: false,
      success: function (res){
        $(thisImage).parent().parent().find('input').val('')
        for (var j = 0; j < res.result.length; j++) {
          let $fileItem = $(`<div class="file-item" data-dataurl="">
            <img src='' class="img-left"/>
            <div class="file-content">
              <div class="file-title">ttkkk.png</div>
              <div class="file-size">785KB</div>
            </div>
            <div class="file-right">
              <i class="am-icon-trash "></i>
            </div>
          </div>`)
          let file = res.result[j]
          let size = file.size/1024 > 1024? (file.size/1024/1024).toFixed(2) + 'M': (file.size/1024).toFixed(2) + 'KB'
          $fileItem.find('.img-left').attr('src', file.dataUrl)
          $fileItem.find('.file-title').text(file.name)
          $fileItem.find('.file-size').text(size)
          $fileItem.attr('data-dataurl', JSON.stringify(file))
          _this.image.btnImg($fileItem, reader.result)
          $fileItem.find('i').click(function () {
            $(this).parent().parent().remove()
            if (!$(thisImage).parent().parent().find('.file-item').length){
              $(thisImage).parent().parent().find('input').val('')
              if (!page.data.ifWrite) {return}
                $(thisImage).parent().parent().find('.am-alert').remove()
                $(thisImage).parent().parent().append(`<div class="am-alert am-alert-danger" style="display: block;">请选择文件</div>`)
                $(thisImage).parent().parent().addClass('am-form-error')
                $(thisImage).parent().parent().removeClass('am-form-success')
            }
          })
          $(thisImage).parent().parent().find('.file-list').append($fileItem)
        }
      }
    })
  }
}

window.authorizeApi = function (json) {
  var authorizeobject = []
  $.extend(true, authorizeobject, authorize)
  authorizeobject.init(json)
  return authorizeobject
}
})()
