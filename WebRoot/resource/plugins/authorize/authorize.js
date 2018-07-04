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
  $formBoxHTml: {},
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
    form.panels.forEach(element => {  
      let $formHtml = this.uphtml[element.type](element)
      $formHtml = this.addChild($formHtml,element)
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
      this.actionClick($btn, v, idClass)
      $(`#${id}`).append($btn)
    })
  },
  actionClick ($btn, action, idClass) {
    let _this = this
    let err = false
    if (idClass) {
      var id = $(idClass).find('.form').attr('id')
    } else {
      var id = this.$formBoxHTml.find('.form').attr('id')
    }
    $btn.click(function () {
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
    var data = this.formData.data
    var attribute = this.formData.attribute
    let eldata =  ''
    let elattribute = ''
    try {
      eldata =  data[elem.name]
      elattribute =  attribute[elem.name]
      if (!eldata)  {
        eldata = {}
      }
      if (!elattribute){
        elattribute = {}
      }
    } catch (error) {
      eldata = {}
      elattribute = {}
    }
    
    elem.content.forEach(value => {
      $formHtml.find('fieldset').append(this.uphtml[value.type](value, eldata, elattribute))
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
      data[$(elem).attr('name')] = _this.getdatachild(elem)
    })
    // console.log(data)
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
      <fieldset>
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

authorize.text = {
  textHtml: `<div class="am-form-group group" data-xhtml="text">
      <label for="" class="title"><span></span>:</label>
      <div class="subhead"></div>
      <input type="text" id="" minlength="" placeholder="" value="" data-validation-message="" pattern=""/>
      </div>`,
  loadText (page, eldata, elattribute) {
    let $html = $(this.text.textHtml)
    $html.find('.title span').text(page.title)
    // $html.attr('id', page.id)
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
  textareaHtml: `<div class="am-form-group group" data-xhtml="textarea">
    <label for="" class="title"><span></span>:</label>
    <div class="subhead"></div>
    <textarea id=""></textarea>
    </div>`,
  loadTextarea (page, eldata, elattribute) {
    let $html = $(this.textarea.textareaHtml)
    $html.find('.title span').text(page.title)
    // $html.attr({'id': page.id})
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
  radioHtml:`<div class="am-form-group group" data-xhtml="radio">
  <h3 class="title"><span></span>:</h3>
  <div class="subhead"></div>
  <div class="label"></div>
  <div>`,
  loadRadio (page, eldata, elattribute) {
    let $html = $(this.radio.radioHtml)
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
  checkboxHtml: `<div class="am-form-group group" data-xhtml="checkbox">
    <h3 class="title"><span></span></h3>
    <div class="subhead"></div>
    <div class="label"></div>
  </div>`,
  loadCheckbox(page, eldata, elattribute) {
    let $html = $(this.checkbox.checkboxHtml)
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
  <div class="am-form-group group" data-xhtml="select">
    <label for="" class="title"><span></span></label>
    <div class="subhead"></div>
    <select data-am-selected>
    </select>
    </div>`,
  loadSelect (page, eldata, elattribute) {
    let $html = $(this.select.selectHtml)
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
  datetimepickerHtml: `<div class="am-form-group group" data-xhtml="datetimepicker">
    <label for="doc-vld-name" class="title"><span></span></label>
    <div class="subhead"></div>
        <input  type="text" id=""  placeholder="" class="am-form-field nameValue input datetimepicker readonly"/>
    </div>`,
  loadDatetimepicker (page, eldata, elattribute) {
    console.log('123')
    let $html = $(this.datetimepicker.datetimepickerHtml)
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
        $.datetimepicker.setLocale(page.data.option.lang);
        $html.find('input').datetimepicker(page.data.option)
      }
    }
    $html.find('input').attr({'placeholder': page.placeholder, 'id': page.id+1, 'name': page.name})
    return $html
  }
}
authorize.file = {
  fileHtml: `<div class="am-form-group group" data-xhtml="file">
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
        // if (!this.files.length) {
        //  $(filethis).parent().parent().find('input').val('')
        //   if (!page.data.ifWrite) {return}
        //   $(filethis).parent().parent().find('.am-alert').remove()
        //   $(filethis).parent().parent().append(`<div class="am-alert am-alert-danger" style="display: block;">请选择文件</div>`)
        //   $(filethis).parent().parent().addClass('am-form-error')
        //   $(filethis).parent().parent().removeClass('am-form-success')
        // }
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
          // console.log($(filethis).parent().parent()[0])
          $(filethis).parent().parent().find('.file-list').append($fileItem)
        }
      }
    })
    return $html
  }
}

authorize.image = {
  imageHtml: `<div class="am-form-group group" data-xhtml="image">
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
      _this.image.getImage.call(this, page, _this)
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
          if (!$(` #${page.id}`).find('.file-item').length){
            $(` #${page.id}`).find('input').val('')
            if (!page.data.ifWrite) {return}
              $(` #${page.id}`).find('.am-alert').remove()
              $(` #${page.id}`).append(`<div class="am-alert am-alert-danger" style="display: block;">请选择文件</div>`)
              $(` #${page.id}`).addClass('am-form-error')
              $(` #${page.id}`).removeClass('am-form-success')
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
  getImage (page, _this) {
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
      let thisImage = this
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
  }
}

window.authorizeApi = function (json) {
  var authorizeobject = []
  $.extend(true, authorizeobject, authorize)
  authorizeobject.init(json)
  return authorizeobject
}
})()
