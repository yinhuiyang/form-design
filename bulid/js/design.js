var design = {
  html: '<div class="view-content"><div class="input-content"></div></div>',
  $page: '',
  step: [],
  param: {}, // 默认值
  attribute: {}, //字段属性 
  updata: {},
  form: '',
  formTitle: '',
  panelName: [],
  textFormat: {
    phone: '^((\\(\\d{2,3}\\))|(\\d{3}\\-))?1\\d{10}$',
    telephone: '^(0[0-9]{2,3}\\-)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$',
    postalcode: '^\\d{6}$',
    IDnumber: '(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)',
    email: '^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$',
    number: '^[-+]?\\d+(\\.\\d+)?$',
    integer: '^\\d+$',
    positiveNumber: '^\\d+(\\.\\d+)?$'
  },
  formTypeId: '',
  init: function init() {
    var _this = this;
    //  let action = '/form/get.do'
    //    // 保存请求
    //    let data = {
    //      formId: formId
    //    }
    // // api.baseURL = 'http://localhost:18013'
    //  api.baseURL = basePath;
    //  api.POST(action, data, function (res) {
    //    _this.form=JSON.parse(res.value.content)
    //    _this.formTitle=res.value.name
    //    _this.loadinit(_this.form)
    //    _this.formTypeId = res.value.formTypeId
    //  })
    this.form = from;
    _this.loadinit(from);
  },
  loadinit: function loadinit(from) {
    this.$page = $('.design-view');
    this.$page.html(this.html);
    this.toolbarFn();
    this.designSet();
    this.updatafn('radio', this.radioDataLoad);
    this.updatafn('form', this.panelLoad);
    this.updatafn('text', this.textLoad);
    this.updatafn('textarea', this.textareaLoad);
    this.updatafn('select', this.selectLoad);
    this.updatafn('checkbox', this.checkboxLoad);
    this.updatafn('datetimepicker', this.datetimepickerLoad);
    this.updatafn('file', this.fileLoad);
    this.updatafn('image', this.imageLoad);
    this.updatafn('table', this.tableLaod);
    this.updatafn('user', this.userLoad);
    this.updatafn('organize', this.organizeLoad);
    var html = this.updataload(from);
    if (html) {
      this.$page.find('.view-content').html(html);
    }
    $('#' + $(html).eq(0).attr('id')).click();
    this.initModel();
    // let _this = this
    // $('.design-page-model ul li a').on('click', function (e){
    //   console.log(this)
    //   let fn = $(this).attr('data-xhtml')
    //   let str = _this[fn](fn)
    //   $('.design-view .view-content').append(str)
    // })
  },
  updataload: function updataload(from) {
    var _this2 = this;

    var data = '';
    var fromHtml = '';
    var _this = this;
    if (!from) {
      return;
    }
    from.panels.forEach(function (value, i) {
      var html = _this.updata[value.type](value);
      // console.log(html)
      data = $(html);
      if (value.type !== 'table') {
        data.find('.input-content').append(_this2.updataInput(value));
      }
      fromHtml += data[0].outerHTML;
    });
    // console.log(fromHtml)
    return fromHtml;
  },
  updataInput: function updataInput(value) {
    var html = '';
    var _this = this;
    value.content.forEach(function (data, i) {
      html += _this.updata[data.type](data);
    });
    return html;
  },
  updatafn: function updatafn(type, fn) {
    this.updata[type] = fn.bind(this);
  },
  updateSortable: function updateSortable(e, ui) {
    var fn = ui.item[0].dataset.xhtml;
    if (ui.item[0].id) {
      return;
    }
    var str = this.updata[fn]({});
    this.step.push($(str).attr('id'));
    ui.item.replaceWith(str);
    $('#' + $(str).attr('id')).click();

    this.initModel();
  },
  dateTimeJs: function dateTimeJs(id, option) {
    $.datetimepicker.setLocale(option.lang);
    $('#' + id).datetimepicker(option);
    /* {   
      lang:'ch',
      step:1,
      timepicker: true,
      datepicker:true,
    }*/
  },
  toolbarFn: function toolbarFn() {
    var _this = this;
    $('#backBtn').off('click').on('click', function () {
      $('#' + _this.step[_this.step.length - 1]).remove();
      _this.step.pop();
    });
    $('#refresh').off('click').on('click', function () {
      _this.loadinit(_this.form);
    });
    $('#preserve').off('click').on('click', function () {
      _this.param = {};

      var formTmp = _this.getFrom();
      if (!formTmp) {
        return false;
      }
      var form = JSON.stringify(formTmp);
      console.log(form);
      var action = '/form/save.do';
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
    });
    $('#preview').off('click').on('click', function () {
      var html = '<div class="preview-conent">\n        <div class="form-content">\n          <div class="img-icon">\n            <i class="am-icon-close back"></i>\n          </div>\n          <div id="formList"></div>\n        </div>\n      </div>';
      var $html = $(html);
      $html.find('i').click(function () {
        $(this).parent().parent().parent().remove();
      });
      $('body').append($html);
      var formTmp = _this.getFrom();
      console.log(formTmp);
      formTmp.title = _this.formTitle;
      formTmp.id = _this.formId;
      var formList = {
        form: formTmp,
        cache: {
          user: {
            name: '当前用户'
          },
          org: {
            orgName: '当前组织'
          }
        }
      };
      var authorizeObj = new authorizeApi(formList); // 绑定json
      authorizeObj.preview_flag = true;
      authorizeObj.loadbind('#formList');
    });
  },
  getFrom: function getFrom() {
    var from = { panels: [] };
    var _this = this;
    var checkPanelName = {};
    var panelName = [];
    $('.view-content').children('.group').each(function (i, elem) {

      from.panels[i] = {};
      from.panels[i].title = $(this).find('#title span').text();
      from.panels[i].id = this.id;
      from.panels[i].type = $(this).attr('data-xhtml');
      from.panels[i].name = $(elem).children('.nameValue').attr('name');
      from.panels[i].background = $(this).attr('data-titleBackground');
      from.panels[i].panelSize = $(this).attr('data-panelSize');
      // if(app.isEmpty(from.panels[i].name) 
      //   || app.isEmpty(from.panels[i].title)){
      //   app.alert("布局组件存在标题或字段名称为空")
      //   $(`#${from.panels[i].id}`).click()
      //   from  = false
      //   return false
      // }
      if (panelName.length > 1) {
        app.alert("布局组件字段名称只能有一个为空");
        $('#' + from.panels[i].id).click();
        from = false;
        return false;
      } else if (from.panels[i].name == '') {
        panelName.push(from.panels[i].name);
      }

      if (app.isEmpty(checkPanelName[from.panels[i].name])) {
        checkPanelName[from.panels[i].name] = from.panels[i].title;
      } else if (from.panels[i].name !== '') {
        app.alert(from.panels[i].title + "：其字段名称与其它布局组件字段重名");
        $('#' + from.panels[i].id).click();
        from = false;
        return false;
      }
      if (_this.panelName.indexOf(from.panels[i].name) > -1) {
        app.alert(from.panels[i].title + "：其字段名称与其name为空的布局组件中的基础组件重名");
        $('#' + from.panels[i].id).click();
        _this.panelName = [];
        from = false;
        return false;
      }
      if (from.panels[i].name !== '') {
        _this.panelName.push(from.panels[i].name);
      }
      var content = '';
      if ($(this).attr('data-xhtml') == 'table') {
        content = _this.getElementTable(elem);
      } else {
        content = _this.getElement(elem);
      }
      if (!content) {
        from = false;
        return false;
      }
      from.panels[i].content = content;
    });
    _this.panelName = [];
    return from;
  },
  getElementTable: function getElementTable(elem) {
    var content = [];
    var _this = this;
    var checkElementName = {};
    $(elem).find('th').each(function (i, el) {
      var data = {};
      content[i] = {};
      content[i].id = '';
      content[i].title = '';
      content[i].name = $(el).attr('name');
      content[i].titleTh = $(el).text();
      content[i].type = $(el).attr('data-type');
      content[i].data = {};
      if (app.isEmpty(content[i].type)) {
        app.alert(content[i].titleTh + "：未选择字段类型");
        $(this).click();
        content = false;
        return false;
      }
      if (app.isEmpty(content[i].name) || app.isEmpty(content[i].titleTh)) {
        app.alert("基础组件存在标题或字段名称为空");
        $(this).click();
        content = false;
        return false;
      }
      if (app.isEmpty(checkElementName[content[i].name])) {
        checkElementName[content[i].name] = content[i].titleTh;
      } else {
        app.alert(content[i].titleTh + "：其字段名称与该布局组件中的其它基础组件字段重名");
        $(this).click();
        content = false;
        return false;
      }
      if ($(el).attr('data-type') == 'text') {
        data = JSON.parse($(el).attr('data-text'));
        content[i].placeholder = data.placeholder;
        content[i].data.value = data.value;
        content[i].data.option = data.option;
        content[i].maxLangth = data.maxLangth;
        content[i].minLangth = data.minLangth;
      } else if ($(el).attr('data-type') == 'select') {
        data = JSON.parse($(el).attr('data-select'));
        content[i].data.value = data.value;
      } else if ($(el).attr('data-type') == 'datetimepicker') {
        data = JSON.parse($(el).attr('data-datetimepicker'));
        content[i].data.value = data.value;
        content[i].placeholder = data.placeholder;
        content[i].data.option = data.option;
        content[i].data.pickerType = data.pickerType;
      }
      content[i].data.ifWrite = data.ifWrite;
      content[i].data.ifShow = data.ifShow;
      content[i].data.ifEditor = data.ifEditor;
      content[i].data.ifCollect = data.ifCollect;
    });
    return content;
  },
  getElement: function getElement(elem) {
    var content = [];
    var _this = this;
    var checkElementName = {};

    $(elem).find('.group').each(function (i, el) {
      // content.push(_this.getElementData[$(el).attr('data-xhtml')].call(this, el))
      content[i] = {};
      var ifField = JSON.parse($(el).attr('data-xdata'));
      content[i].id = el.id;
      content[i].title = $(el).find('.title span').text();
      content[i].type = $(el).attr('data-xhtml');
      content[i].name = $(el).find('.nameValue').attr('name');
      content[i].ComponentType = ifField.ComponentType;
      content[i].labelGrid = ifField.labelGrid;
      content[i].inputGrid = ifField.inputGrid;
      content[i].grid = !$(el).attr('class').replace(/[^0-9]/ig, "") ? '12' : $(el).attr('class').replace(/[^0-9]/ig, "");
      if ($(el).attr('data-xhtml') == 'text' || $(el).attr('data-xhtml') == 'textarea') {
        content[i].maxLangth = ifField.maxLangth;
        content[i].minLangth = ifField.minLangth;
      }
      if ($(el).attr('data-xhtml') == 'radio' || $(el).attr('data-xhtml') == 'checkbox') {
        content[i].labelArrange = ifField.labelArrange;
      }
      if (app.isEmpty(content[i].name) || app.isEmpty(content[i].title)) {
        app.alert("基础组件存在标题或字段名称为空");
        $('#' + content[i].id).click();
        content = false;
        return false;
      }

      if (app.isEmpty(checkElementName[content[i].name])) {
        checkElementName[content[i].name] = content[i].title;
      } else {
        app.alert(content[i].title + "：其字段名称与该布局组件中的其它基础组件重名");
        $('#' + content[i].id).click();
        content = false;
        return false;
      }
      if (_this.panelName.indexOf(content[i].name) > -1) {
        app.alert(content[i].title + "：其字段名称与其他布局组件重名");
        $('#' + content[i].id).click();
        _this.panelName = [];
        content = false;
        return false;
      }
      if (!$(elem).children('.nameValue').attr('name') && _this.panelName.indexOf(content[i].name) == -1) {
        _this.panelName.push(content[i].name);
      }
      content[i].subhead = $(el).find('.subhead').text();
      content[i].data = {
        ifWrite: ifField.ifWrite,
        ifShow: ifField.ifShow,
        ifEditor: ifField.ifEditor
      };
      var obj = _this.getElementData[$(el).attr('data-xhtml')].call(_this, el);
      if (obj.data) {
        obj.data = Object.assign(content[i].data, obj.data);
      }
      Object.assign(content[i], obj);
    });

    return content;
  },

  getElementData: {
    file: function file(el) {
      var dataObj = {};
      // if (!this.param.text) {
      //   this.param.text = {}
      // }
      // this.param.text[$(el).find('input').attr('name')] = $(el).find('input').val()
      return dataObj;
    },
    image: function image(el) {
      var dataObj = {};
      // if (!this.param.text) {
      //   this.param.text = {}
      // }
      // this.param.text[$(el).find('input').attr('name')] = $(el).find('input').val()
      return dataObj;
    },
    text: function text(el) {
      var dataObj = {};
      var option = JSON.parse($(el).attr('data-option'));
      dataObj.placeholder = $(el).find('input').attr('placeholder');
      dataObj.data = { option: option
        // if (!this.param.text) {
        //   this.param.text = {}
        // }
        // this.param.text[$(el).find('input').attr('name')] = $(el).find('input').val()
      };var defValue = $(el).find('input').val();
      dataObj.data.value = defValue;
      return dataObj;
    },
    textarea: function textarea(el) {
      var dataObj = {};
      dataObj.data = {};
      dataObj.placeholder = $(el).find('textarea').attr('placeholder');
      // if (!this.param.textarea) {
      //   this.param.textarea = {}
      // }
      // this.param.textarea[$(el).find('.nameValue').attr('name')] = $(el).find('textarea').val()
      var defValue = $(el).find('textarea').val();
      dataObj.data.value = defValue;
      return dataObj;
    },
    radio: function radio(el) {
      var dataObj = {};
      dataObj.data = { value: []
        // if (!this.param.radio) {
        //   this.param.radio = {}
        // }
      };var _this = this;
      $(el).find('input').each(function (i, val) {
        dataObj.data.value[i] = {};
        dataObj.data.value[i].value = $(this).val();
        dataObj.data.value[i].name = $(this).val();
        dataObj.data.value[i].checked = this.checked;
        // if (this.checked) {
        //   _this.param.radio[$(this).attr('name')] =  $(this).val()
        // }
      });
      return dataObj;
    },
    checkbox: function checkbox(el) {
      var dataObj = {};
      dataObj.data = { value: []
        // if (!this.param.checkbox) {
        //   this.param.checkbox = {}
        // }
        // let values= []
      };$(el).find('input').each(function (i, val) {
        dataObj.data.value[i] = {};
        dataObj.data.value[i].value = $(this).val();
        dataObj.data.value[i].name = $(this).val();
        dataObj.data.value[i].checked = this.checked;
        // if (this.checked) {
        //   values.push($(this).val())
        // }
      });
      // this.param.checkbox[$(el).find('.nameValue').attr('name')] = values
      return dataObj;
    },
    select: function select(el) {
      var dataObj = {};
      var _this = this;
      dataObj.data = { value: []
        // if (!this.param.select) {
        //   this.param.select = {}
        // }
      };$(el).find('option').each(function (i, val) {
        dataObj.data.value[i] = {};
        dataObj.data.value[i].value = $(this).val();
        dataObj.data.value[i].name = $(this).val();
        dataObj.data.value[i].selected = this.selected;
        // if (this.selected) {
        //   _this.param.select[$(el).find('.nameValue').attr('name')] = $(this).val()
        // }
      });

      return dataObj;
    },
    datetimepicker: function datetimepicker(el) {
      var dataObj = {};
      var _this = this;
      dataObj.data = { value: '' };
      dataObj.placeholder = $(el).find('input').attr('placeholder');
      var option = JSON.parse($(el).attr('data-option'));
      var defValue = $(el).find('input').val();
      var pickerType = $(el).attr("data-type");

      dataObj.data.pickerType = pickerType;
      dataObj.data.value = defValue;
      dataObj.data.option = option;
      return dataObj;
    },
    user: function user(el) {
      var dataObj = {};
      dataObj.data = { value: [] };
      $(el).find('.user-item').each(function (i, v) {
        dataObj.data.value.push(JSON.parse($(v).find('span').attr('data-value')));
      });
      dataObj.data.ifChoice = JSON.parse($(el).attr('data-xdata')).ifChoice;
      return dataObj;
    },
    organize: function organize(el) {
      var dataObj = {};
      dataObj.data = { value: [] };
      $(el).find('.organize-item').each(function (i, v) {
        dataObj.data.value.push(JSON.parse($(v).find('span').attr('data-value')));
      });
      dataObj.data.ifChoice = JSON.parse($(el).attr('data-xdata')).ifChoice;
      return dataObj;
    }
  },
  initModel: function initModel() {
    var _this = this;
    $('.design-view').find('.view-content, .input-content').sortable({
      opacity: 0.85,
      revert: true,
      start: function start(e, t) {},
      change: function change(e, t) {},
      stop: function stop(e, t) {},
      update: function update(event, ui) {
        _this.updateSortable(event, ui, this);
      }
    });
    $('.design-page-model .panel-component li a').draggable({
      connectToSortable: ".view-content",
      helper: "clone",
      revert: "invalid",
      drag: function drag() {},
      stop: function stop() {}
    });
    $('.design-page-model .input-component li a').draggable({
      connectToSortable: ".input-content",
      helper: "clone",
      revert: "invalid",
      drag: function drag() {},
      stop: function stop() {}
    });
  },
  gridChoice: function gridChoice(id) {
    var condition = JSON.parse($('#' + id).attr('data-xdata'));
    var html = '';
    if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowAndTwoColumns') {
      html = setData.labelGrid(id);
    } else if (condition.ComponentType == 'TwoRowAndTwoColumnsSub') {
      html = setData.inputGrid(id);
    } else if (condition.ComponentType == 'OneRowAndThreeColumns') {
      html = setData.labelGrid(id) + setData.inputGrid(id);
    }
    return html;
  },

  setdata: {
    form: function form() {
      var id = $(this).attr('id');
      var background = $(this).attr('data-titleBackground');
      var panelSize = $(this).attr('data-panelSize');
      var html = setData.title(id, '基础面板', $('#' + id).find('#title span').text()) + setData.underline() + setData.setFormNmae(id, $('#' + id + ' .nameValue').attr('name')) + setData.underline() + setData.panelSize() + setData.underline() + setData.background();
      $('.set-content').html(html);
      $(this).addClass('group-' + parseInt(panelSize));
      $('#panelSize').val(panelSize);
      $('#panelSize').change(function () {
        var size = $('#' + id).attr('data-panelSize');
        $('#' + id).removeClass('group-' + parseInt(size));
        $('#' + id).attr('data-panelSize', $(this).val());
        $('#' + id).addClass('group-' + parseInt($(this).val()));
      });
      $('#backgroundFrom').val(background);
      $('#backgroundFrom').change(function () {
        $('#' + id).find('.am-panel-hd').css({ "background": $(this).val(), 'color': '#fff' });
        if ($(this).val() == '#f5f5f5') {
          $('#' + id).find('.am-panel-hd').css({ 'color': '#444' });
        }
        $('#' + id).attr('data-titleBackground', $(this).val());
      });
    },

    radio: function radio(_this) {
      var id = $(this).attr('id');
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      var html = setData.title(id, '单选', $('#' + id).find('.title span').text()) + setData.underline() + setData.setNmae(id, $('#' + id).find('.nameValue').attr('name')) + _this.gridChoice(id) + setData.underline() + setData.grid(id) + setData.underline() + setData.ComponentType() + setData.underline() + setData.iFinline(condition.labelArrange) + setData.subhead(id, $('#' + id).find('.subhead').text()) + setData.underline() + setData.radio(id) + setData.underline() + setData.ifField(id, condition);
      $('.set-content').html(html);
      if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
        $("#Help").hide();
      } else {
        $("#Help").show();
      }
      $('#ComponentType').val(condition.ComponentType);
      $('#ComponentType').change(function () {
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        condition.ComponentType = $(this).val();
        $('#' + id).attr('data-xdata', JSON.stringify(condition));
        if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
          $("#Help").hide();
        } else {
          $("#Help").show();
        }
        var page = _this.ComponentTypeChange(id);
        var html = _this.updata.radio(page);
        $('#' + id).replaceWith(html);
        $("#" + id).click();
      });
      $('#longitudinal').click(function () {
        if ($(this).attr('class').indexOf('choice-selected') > -1) {
          return;
        }
        $(this).addClass('choice-selected');
        $('#transverse').removeClass('choice-selected');
        arrange('longitudinal');
      });
      $('#transverse').click(function () {
        if ($(this).attr('class').indexOf('choice-selected') > -1) {
          return;
        }
        $(this).addClass('choice-selected');
        $('#longitudinal').removeClass('choice-selected');
        arrange('transverse');
      });
      $('#selecd-ul').on('click', '.minus', function () {
        $(this).parent().remove();
        radioData();
      });
      $('#selecd-ul').on('input', 'input', function () {
        radioData();
      });
      $('#selecd-ul').on('click', '.circle', function () {
        $('#selecd-ul .circle').addClass('am-icon-circle-o');
        $('#selecd-ul .circle').removeClass('am-icon-dot-circle-o');
        $(this).removeClass('am-icon-circle-o');
        $(this).addClass('am-icon-dot-circle-o');
        radioData();
      });
      $('.add_btn_group ').on('click', '.add_item', function () {
        var ul = '<li>\n          <i class="am-icon-circle-o circle"></i>\n          <a>\n            <input type="text" value="">\n          </a>\n          <i class="am-icon-arrows arrows"></i>\n          <i class="am-icon-minus-circle minus"></i>\n        </li>';
        $('#selecd-ul').append(ul);
        radioData();
      });
      $('#selecd-ul').sortable({
        placeholder: "li",
        handle: '.arrows',
        cursor: 'move',
        update: function update(event, ui) {
          radioData(ui);
        }
      });
      function radioData() {
        var label = '';
        // console.log($('#'+id).find('.nameValue')[0])
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        $('#selecd-ul li').each(function (i, elemt) {
          // <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span> class="am-ucheck-radio"
          label += '<label class="' + (condition.labelArrange == 'transverse' ? 'am-radio-inline' : 'am-radio') + '">\n            <input type="radio" name="' + $('#' + id).find('.nameValue').attr('name') + '" value="' + $(elemt).find('input').val() + '" data-am-ucheck   disabled \n            ' + ($(elemt).find('.circle').attr('class').indexOf('am-icon-dot-circle-o') > -1 ? 'checked' : '') + ' class ="nameValue">' + $(elemt).find('input').val() + '\n          </label>';
        });
        $('#' + id + ' .label').html(label);
      }
      function arrange(labelArrange) {
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        condition.labelArrange = labelArrange;
        $('#' + id).attr('data-xdata', JSON.stringify(condition));
        if (labelArrange == 'transverse') {
          $('#' + id).find('label').removeClass('am-radio');
          $('#' + id).find('label').addClass('am-radio-inline');
        } else {
          $('#' + id).find('label').removeClass('am-radio-inline');
          $('#' + id).find('label').addClass('am-radio');
        }
      }
    },
    text: function text(_this) {
      var id = $(this).attr('id');
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      var html = setData.title(id, '输入框', $('#' + id).find('.title span').text()) + setData.underline() + setData.setNmae(id, $('#' + id).find('.nameValue').attr('name')) + _this.gridChoice(id) + setData.underline() + setData.grid(id) + setData.underline() + setData.ComponentType() + setData.subhead(id, $('#' + id).find('.subhead').text()) + setData.underline() + setData.text(id) + setData.underline() + setData.inputLength(id) + setData.underline() + setData.textInput(id) + setData.underline() + setData.ifField(id, condition);
      $('.set-content').html(html);
      if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
        $("#Help").hide();
      } else {
        $("#Help").show();
      }
      var reg = JSON.parse($('#' + id).attr('data-option')).reg;
      for (var k in design.textFormat) {
        if (design.textFormat[k] == reg) {
          $('#text-option').val(k);
          $('#text').val('');
          break;
        } else {
          $('#text-option').val(reg);
        }
      }
      var optiotype = $('#text-option').val();
      if (reg && optiotype) {
        $('#textBox').hide();
      }
      $('#ComponentType').val(condition.ComponentType);
      $('#ComponentType').change(function () {
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        condition.ComponentType = $(this).val();
        $('#' + id).attr('data-xdata', JSON.stringify(condition));
        if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
          $("#Help").hide();
        } else {
          $("#Help").show();
        }
        var page = _this.ComponentTypeChange(id);
        var html = _this.updata.text(page);
        $('#' + id).replaceWith(html);
        $("#" + id).click();
      });
      $('#text-option').change(function () {
        if ($(this).val() === 'text') {
          $('#textBox').show();
          var option = JSON.parse($('#' + id).attr('data-option'));
          option.reg = $('#text').val();
          $('#' + id).attr('data-option', JSON.stringify(option));
          $('#text').val(option.reg);
        } else {
          $('#textBox').hide();
          var _option = JSON.parse($('#' + id).attr('data-option'));
          _option.reg = design.textFormat[$(this).val()];
          $('#' + id).attr('data-option', JSON.stringify(_option));
        }
      });
      $('#text').on('input', function () {
        var option = JSON.parse($('#' + id).attr('data-option'));
        option.reg = $(this).val();
        $('#' + id).attr('data-option', JSON.stringify(option));
      });
      $('#error').on('input', function () {
        var option = JSON.parse($('#' + id).attr('data-option'));
        option.err = $(this).val();
        $('#' + id).attr('data-option', JSON.stringify(option));
      });
    },
    textarea: function textarea(_this) {
      var id = $(this).attr('id');
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      var html = setData.title(id, '输入框', $('#' + id).find('.title span').text()) + setData.underline() + setData.setNmae(id, $('#' + id).find('.nameValue').attr('name')) + _this.gridChoice(id) + setData.underline() + setData.grid(id) + setData.underline() + setData.ComponentType() + setData.subhead(id, $('#' + id).find('.subhead').text()) + setData.underline() + setData.inputLength(id) + setData.underline() + setData.textInput(id) + setData.underline() + setData.ifField(id, condition);
      $('.set-content').html(html);

      if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
        $("#Help").hide();
      } else {
        $("#Help").show();
      }
      $('#ComponentType').val(condition.ComponentType);
      $('#ComponentType').change(function () {
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        condition.ComponentType = $(this).val();
        $('#' + id).attr('data-xdata', JSON.stringify(condition));
        if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
          $("#Help").hide();
        } else {
          $("#Help").show();
        }
        var page = _this.ComponentTypeChange(id);
        var html = _this.updata.textarea(page);
        $('#' + id).replaceWith(html);
        $("#" + id).click();
      });
    },
    datetimepicker: function datetimepicker(_this) {
      $('#default').datetimepicker('destroy');
      var id = $(this).attr('id');
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      var html = setData.title(id, '日期时间', $('#' + id).find('.title span').text()) + setData.underline() + setData.setNmae(id, $('#' + id).find('.nameValue').attr('name')) + _this.gridChoice(id) + setData.underline() + setData.grid(id) + setData.underline() + setData.ComponentType() + setData.subhead(id, $('#' + id).find('.subhead').text()) + setData.underline() + setData.datatimeFormat(id) + setData.underline() + setData.textInput(id, 'data-option') + setData.underline() + setData.ifField(id, condition);

      $('.set-content').html(html);
      if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
        $("#Help").hide();
      } else {
        $("#Help").show();
      }
      $('#ComponentType').val(condition.ComponentType);
      $('#ComponentType').change(function () {
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        condition.ComponentType = $(this).val();
        $('#' + id).attr('data-xdata', JSON.stringify(condition));
        if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
          $("#Help").hide();
        } else {
          $("#Help").show();
        }
        var page = _this.ComponentTypeChange(id);
        var html = _this.updata.datetimepicker(page);
        $('#' + id).replaceWith(html);
        $("#" + id).click();
      });
      var lang = JSON.parse($('#' + id).attr('data-option')).lang;
      $('#lang').val(lang);

      var format = JSON.parse($('#' + id).attr('data-option')).format;

      var pickerType = $('#' + id).attr('data-type');
      $('#pickerType').val(pickerType);
      if (pickerType == 'datepicker') {
        $('#stepBox').hide();
      }
      var step = JSON.parse($('#' + id).attr('data-option')).step;
      $('#stepSelect').val(step);
      $('#format').html(setData.dateformatOption(pickerType));
      $('#format').val(format);

      var optiontype = $('#format').val();
      if (format && optiontype) {
        $('#textBox').hide();
        $('#text').val('');
      } else {
        $('#text').val(format);
      }

      $('#lang').change(function () {
        var option = JSON.parse($('#' + id).attr('data-option'));
        option.lang = $(this).val();
        $('#' + id).attr('data-option', JSON.stringify(option));
        design.dateTimeJs("default", JSON.parse($('#' + id).attr('data-option')));
      });

      $('#pickerType').change(function () {
        var datepicker = false;
        var timepicker = false;
        var format = '';
        if ($(this).val() === 'allpicker') {
          format = "Y-m-d H:i";
          datepicker = true;
          timepicker = true;
          $('#stepBox').show();
        } else if ($(this).val() === 'datepicker') {
          format = "Y-m-d";
          datepicker = true;
          timepicker = false;
          $('#stepBox').hide();
        } else if ($(this).val() == 'timepicker') {
          format = "H:i";
          datepicker = false;
          timepicker = true;
          $('#stepBox').show();
        }
        $('#format').html(setData.dateformatOption($(this).val()));
        $('#format').val(format);
        var optiontype = $('#format').val();
        if (format && optiontype) {
          $('#textBox').hide();
          $('#text').val('');
        } else {
          $('#textBox').show();
          $('#text').val(format);
        }

        var option = JSON.parse($('#' + id).attr('data-option'));
        option.datepicker = datepicker;
        option.timepicker = timepicker;
        option.format = format;
        $('#' + id).attr('data-option', JSON.stringify(option));
        $('#' + id).attr('data-type', $(this).val());
        design.dateTimeJs("default", JSON.parse($('#' + id).attr('data-option')));
      });

      $('#format').change(function () {
        var option = JSON.parse($('#' + id).attr('data-option'));
        if ($(this).val() === 'text') {
          $('#textBox').show();
          option.format = '';
          $('#text').val(option.format);
        } else {
          $('#textBox').hide();
          option.format = $(this).val();
        }
        $('#' + id).attr('data-option', JSON.stringify(option));
        design.dateTimeJs("default", JSON.parse($('#' + id).attr('data-option')));
      });
      $('#stepSelect').change(function () {
        var option = JSON.parse($('#' + id).attr('data-option'));
        option.step = parseInt($(this).val());
        $('#' + id).attr('data-option', JSON.stringify(option));
        design.dateTimeJs("default", JSON.parse($('#' + id).attr('data-option')));
      });
      $('#text').on('input', function () {
        var option = JSON.parse($('#' + id).attr('data-option'));
        option.format = $(this).val();
        $('#' + id).attr('data-option', JSON.stringify(option));
        design.dateTimeJs("default", JSON.parse($('#' + id).attr('data-option')));
      });

      design.dateTimeJs("default", JSON.parse($('#' + id).attr('data-option')));
    },
    file: function file(_this) {
      var id = $(this).attr('id');
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      var html = setData.title(id, '附件', $('#' + id).find('.title span').text()) + setData.underline() + setData.setNmae(id, $('#' + id).find('.nameValue').attr('name')) + _this.gridChoice(id) + setData.underline() + setData.grid(id) + setData.underline() + setData.ComponentType() + setData.subhead(id, $('#' + id).find('.subhead').text()) + setData.underline() + setData.ifField(id, condition);
      $('.set-content').html(html);
      if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
        $("#Help").hide();
      } else {
        $("#Help").show();
      }
      $('#ComponentType').val(condition.ComponentType);
      $('#ComponentType').change(function () {
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        condition.ComponentType = $(this).val();
        $('#' + id).attr('data-xdata', JSON.stringify(condition));
        if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
          $("#Help").hide();
        } else {
          $("#Help").show();
        }
        var page = _this.ComponentTypeChange(id);
        var html = _this.updata.file(page);
        $('#' + id).replaceWith(html);
        $("#" + id).click();
      });
    },
    image: function image(_this) {
      var id = $(this).attr('id');
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      var html = setData.title(id, '图片', $('#' + id).find('.title span').text()) + setData.underline() + setData.setNmae(id, $('#' + id).find('.nameValue').attr('name')) + _this.gridChoice(id) + setData.underline() + setData.grid(id) + setData.underline() + setData.ComponentType() + setData.subhead(id, $('#' + id).find('.subhead').text()) + setData.underline() + setData.ifField(id, condition);
      $('.set-content').html(html);
      if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
        $("#Help").hide();
      } else {
        $("#Help").show();
      }
      $('#ComponentType').val(condition.ComponentType);
      $('#ComponentType').change(function () {
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        condition.ComponentType = $(this).val();
        $('#' + id).attr('data-xdata', JSON.stringify(condition));
        if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
          $("#Help").hide();
        } else {
          $("#Help").show();
        }
        var page = _this.ComponentTypeChange(id);
        var html = _this.updata.image(page);
        $('#' + id).replaceWith(html);
        $("#" + id).click();
      });
    },


    checkbox: function checkbox(_this) {
      var id = $(this).attr('id');
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      var html = setData.title(id, '多选', $('#' + id).find('.title span').text()) + setData.underline() + setData.setNmae(id, $('#' + id).find('.nameValue').attr('name')) + _this.gridChoice(id) + setData.underline() + setData.grid(id) + setData.underline() + setData.ComponentType() + setData.underline() + setData.iFinline(condition.labelArrange) + setData.subhead(id, $('#' + id).find('.subhead').text()) + setData.underline() + setData.checkbox(id) + setData.underline() + setData.ifField(id, condition);
      $('.set-content').html(html);
      if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
        $("#Help").hide();
      } else {
        $("#Help").show();
      }
      $('#ComponentType').val(condition.ComponentType);
      $('#ComponentType').change(function () {
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        condition.ComponentType = $(this).val();
        $('#' + id).attr('data-xdata', JSON.stringify(condition));
        if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
          $("#Help").hide();
        } else {
          $("#Help").show();
        }
        var page = _this.ComponentTypeChange(id);
        var html = _this.updata.checkbox(page);
        $('#' + id).replaceWith(html);
        $("#" + id).click();
      });
      $('#longitudinal').click(function () {
        if ($(this).attr('class').indexOf('choice-selected') > -1) {
          return;
        }
        $(this).addClass('choice-selected');
        $('#transverse').removeClass('choice-selected');
        arrange('longitudinal');
      });
      $('#transverse').click(function () {
        if ($(this).attr('class').indexOf('choice-selected') > -1) {
          return;
        }
        $(this).addClass('choice-selected');
        $('#longitudinal').removeClass('choice-selected');
        arrange('transverse');
      });
      $('#selecd-ul').on('click', '.minus', function () {
        $(this).parent().remove();
        checkData();
      });
      $('#selecd-ul').on('input', 'input', function () {
        checkData();
      });
      $('#selecd-ul').on('click', '.square', function () {
        if ($(this).attr('class').indexOf('am-icon-check-square-o') > -1) {
          $(this).removeClass('am-icon-check-square-o');
          $(this).addClass('am-icon-square-o');
        } else {
          $(this).removeClass('am-icon-square-o');
          $(this).addClass('am-icon-check-square-o');
        }
        checkData();
      });
      $('.add_btn_group ').on('click', '.add_item', function () {
        var ul = '<li>\n          <i class="am-icon-square-o square"></i>\n          <a>\n            <input type="text" value="">\n          </a>\n          <i class="am-icon-arrows arrows"></i>\n          <i class="am-icon-minus-circle minus"></i>\n        </li>';
        $('#selecd-ul').append(ul);
        checkData();
      });
      $('#selecd-ul').sortable({
        placeholder: "li",
        handle: '.arrows',
        cursor: 'move',
        update: function update(event, ui) {
          checkData(ui);
        }
      });
      function checkData() {
        var label = '';
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        $('#selecd-ul li').each(function (i, elemt) {
          // <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span> class="am-ucheck-radio"
          label += '<label class="' + (condition.labelArrange == 'transverse' ? 'am-checkbox-inline' : 'am-checkbox') + '">\n            <input type="checkbox" value="' + $(elemt).find('input').val() + '" data-am-ucheck   disabled \n            ' + ($(elemt).find('.square').attr('class').indexOf('am-icon-check-square-o') > -1 ? 'checked' : '') + ' >' + $(elemt).find('input').val() + '\n          </label>';
        });
        $('#' + id + ' .label').html(label);
      }
      function arrange(labelArrange) {
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        condition.labelArrange = labelArrange;
        $('#' + id).attr('data-xdata', JSON.stringify(condition));
        if (labelArrange == 'transverse') {
          $('#' + id).find('label').removeClass('am-checkbox');
          $('#' + id).find('label').addClass('am-checkbox-inline');
        } else {
          $('#' + id).find('label').removeClass('am-checkbox-inline');
          $('#' + id).find('label').addClass('am-checkbox');
        }
      }
    },
    select: function select(_this) {
      var id = $(this).attr('id');
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      var html = setData.title(id, '下拉', $('#' + id).find('.title span').text()) + setData.underline() + setData.setNmae(id, $('#' + id).find('.nameValue').attr('name')) + _this.gridChoice(id) + setData.underline() + setData.grid(id) + setData.underline() + setData.ComponentType() + setData.subhead(id, $('#' + id).find('.subhead').text()) + setData.underline() + setData.select(id) + setData.underline() + setData.ifField(id, condition);
      $('.set-content').html(html);
      if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
        $("#Help").hide();
      } else {
        $("#Help").show();
      }
      $('#ComponentType').val(condition.ComponentType);
      $('#ComponentType').change(function () {
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        condition.ComponentType = $(this).val();
        $('#' + id).attr('data-xdata', JSON.stringify(condition));
        if (condition.ComponentType == 'OneRowAndTwoColumns' || condition.ComponentType == 'TwoRowsAndOneColumn') {
          $("#Help").hide();
        } else {
          $("#Help").show();
        }
        var page = _this.ComponentTypeChange(id);
        var html = _this.updata.select(page);
        $('#' + id).replaceWith(html);
        $("#" + id).click();
      });
      $('#selecd-ul').on('click', '.minus', function () {
        $(this).parent().remove();
        selectData();
      });
      $('#selecd-ul').on('input', 'input', function () {
        selectData();
      });
      $('#selecd-ul').on('click', '.circle', function () {
        $('#selecd-ul .circle').addClass('am-icon-circle-o');
        $('#selecd-ul .circle').removeClass('am-icon-dot-circle-o');
        $(this).removeClass('am-icon-circle-o');
        $(this).addClass('am-icon-dot-circle-o');
        selectData();
      });
      $('.add_btn_group ').on('click', '.add_item', function () {
        var ul = '<li>\n          <i class="am-icon-circle-o circle"></i>\n          <a>\n            <input type="text" value="">\n          </a>\n          <i class="am-icon-arrows arrows"></i>\n          <i class="am-icon-minus-circle minus"></i>\n        </li>';
        $('#selecd-ul').append(ul);
        selectData();
      });
      $('#selecd-ul').sortable({
        placeholder: "li",
        handle: '.arrows',
        cursor: 'move',
        update: function update(event, ui) {
          selectData(ui);
        }
      });
      function selectData() {
        var label = '';
        $('#selecd-ul li').each(function (i, elemt) {
          //<option value="${element.value}" >${element.name}</option>
          label += '<option value="' + $(elemt).find('input').val() + '" disabled\n           ' + ($(elemt).find('.circle').attr('class').indexOf('am-icon-dot-circle-o') > -1 ? 'selected' : '') + '>' + $(elemt).find('input').val() + '\n           </option>';
        });
        $('#' + id + ' select').html(label);
      }
    },
    table: function table() {
      var id = $(this).attr('id');
      var background = $(this).attr('data-titleBackground');
      var html = setData.title(id, '表格', $('#' + id).find('#title span').text()) + setData.underline() + setData.setNmae(id, $('#' + id).find('.nameValue').attr('name')) + setData.underline() + setData.background() + setData.underline() + setData.tableAddTh(id);
      $('.set-content').html(html);
      $('#backgroundFrom').val(background);
      $('#backgroundFrom').change(function () {
        $('#' + id).find('.am-panel-hd').css({ "background": $(this).val(), 'color': '#fff' });
        if ($(this).val() == '#f5f5f5') {
          $('#' + id).find('.am-panel-hd').css({ 'color': '#444' });
        }
        $('#' + id).attr('data-titleBackground', $(this).val());
      });
    },
    user: function user() {
      var id = $(this).attr('id');
      var name = $(this).find('.nameValue').attr('name');
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      var html = setData.title(id, '用户选择', $('#' + id).find('.title span').text()) + setData.underline() + setData.setNmae(id, $('#' + id).find('.nameValue').attr('name')) + setData.underline() + setData.grid(id) + setData.subhead(id, $('#' + id).find('.subhead').text()) + setData.underline() + setData.userOrg(id) + setData.underline() + setData.ifField(id, condition);
      $('.set-content').html(html);
      $('#userOrg').click(function () {
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        var defaultHtml = '<div id="user-box">\n          <div class="user-model">\n            <div class="user-title"><span>\u7528\u6237\u5217\u8868</span> <i class="am-icon-close back"></i></div>\n            <div class="ul-box">\n              <ul class="list-selecred">\n              </ul>\n            </div>\n            <div class="user-list">\n              <div class="list-search">\n                <input class="input-search">\n                <i class="am-icon-search search"></i>\n                <div class="searchListBox" style="display: none">\n                  <ul class="searchListUl">\n                    <li class="searchItem">linlinlin</li>\n                    <li class="searchItem">linlinlin</li>\n                  </ul>\n                </div>\n              </div>\n              <div class="list-name">\n                <ul class="list-ul">\n                </ul>\n              </div>\n            </div>\n            <div class="btn-box">\n              <div>\n                <button type="button" class="am-btn am-btn-default am-radius previous">\u4E0A\u4E00\u9875</button>\n                <button type="button" class="am-btn am-btn-default am-radius next">\u4E0B\u4E00\u9875</button>\n              </div>\n              <div>\n                <button type="button" class="am-btn am-btn-default am-radius back" >\u53D6\u6D88</button>\n                <button type="button" class="am-btn am-btn-success am-radius sure">\u786E\u5B9A</button>\n              </div>\n            </div>\n          </div>\n        </div>';
        var $defaultHtml = $(defaultHtml);
        var resData = [{ name: "loo1", userID: "21256832676" }, { name: "loo2", userID: "21256832675" }, { name: "loo4", userID: "21256832677" }, { name: "loo3", userID: "21256832673" }, { name: "loo5", userID: "21256832674" }];
        function getuser(data) {
          var li = '';
          $.ajax({
            //分页查询用户信息
            url: "/ddio/data/getUserByPage.do",
            type: 'POST',
            data: { pageIndex: data, pageSize: 3 },
            async: false,
            success: function success(res) {
              resData = res.value.list;
              var liItem = '<li class="list-item">\n            <label class="am-' + condition.ifChoice + '">\n            \u5F53\u524D\u7528\u6237 <input type="' + condition.ifChoice + '" name="' + name + '" data-value=' + JSON.stringify({ name: '当前用户', userID: '#{user.name}' }) + ' class ="nameValue" value="\u5F53\u524D\u7528\u6237" data-am-ucheck>\n            </label>\n          </li>';
              if (resData.length == 0) {
                return '';
              }
              resData.forEach(function (data) {
                liItem += '<li class="list-item">\n                <label class="am-' + condition.ifChoice + '">\n                ' + data.name + ' <input type="' + condition.ifChoice + '" name="' + name + '" data-value=' + JSON.stringify(data) + ' class ="nameValue" value="' + data.name + '" data-am-ucheck>\n                </label>\n              </li>';
              });
              //            $('#user-box .list-ul').html(liItem)
              var $liItem = $(liItem);
              li = $liItem;
            }
          });
          return li;
        }
        function getSearch(data) {
          var li = '';
          $.ajax({
            //根据用户名查询用户信息
            url: '/ddio/data/userByName.do',
            type: 'POST',
            data: { name: data },
            async: false,
            success: function success(res) {
              resData = res.value;
              var liItem = '';
              if (resData.length == 0) {
                return '';
              }
              resData.forEach(function (data) {
                liItem += '<li class="searchItem">\n                  <span data-value=' + JSON.stringify(data) + '>' + data.name + '</span>\n                  </label>\n                </li>';
              });
              li = liItem;
            }
          });
          return li;
        }
        $defaultHtml.find('.list-ul').append(getuser(1));
        $('#' + id).find('.user-item').each(function (i, v) {
          var val = JSON.parse($(v).find('span').attr('data-value'));
          var li = '<li><span class="userName" data-value=' + $(v).find('span').attr('data-value') + ' value="' + val.name + '">' + val.name + '</span> <span class="del-user">x</span></li>';
          $defaultHtml.find('input[value = ' + val.name + ']')[0] ? $defaultHtml.find('input[value = ' + val.name + ']')[0].checked = true : '';
          $defaultHtml.find('.list-selecred').append(li);
        });
        $defaultHtml.on('change', 'label input', function () {
          if (this.checked) {
            $(this).parent().parent().parent().find('li').removeClass('actve');
            $(this).parent().parent().addClass('actve');
            if ($(this).attr('type') == 'radio') {
              radioListFn.call(this);
            } else {
              checkboxListFn.call(this);
            }
          } else {
            $(this).parent().parent().removeClass('actve');
            if ($(this).attr('type') == 'checkbox') {
              $('span[value=' + $(this).val() + ']').parent().remove();
            }
          }
        });
        function radioListFn() {
          var value = $(this).attr('data-value');
          var li = '<li><span class="userName" data-value= ' + value + '>' + $(this).val() + '</span> <span class="del-user">x</span></li>';
          $('.ul-box .list-selecred').html(li);
        }
        function checkboxListFn() {
          var value = $(this).attr('data-value');
          var li = '<li><span class="userName" data-value=' + value + ' value="' + $(this).val() + '">' + $(this).val() + '</span> <span class="del-user">x</span></li>';
          $('.ul-box .list-selecred').append(li);
        }
        $defaultHtml.find('.ul-box .list-selecred').on('click', '.del-user', function (e) {
          e.stopPropagation();
          $(this).parent().remove();
          var val = $(this).parent().find('.userName').text();
          $('input[value = ' + val + ']')[0].checked = false;
        });
        function getSearchList(name) {
          $('.searchListBox .searchListUl').html(getSearch(name));
          $('.searchListBox').show();
        }
        // $defaultHtml.find('.list-search i').click(function () {
        //   getSearchList()
        // })
        $defaultHtml.find('.input-search').keydown(function (event) {
          if (event.keyCode == 13) {
            getSearchList($(this).val());
          }
        });
        $defaultHtml.find('.input-search').on('input', function () {
          getSearchList($(this).val());
        });
        $defaultHtml.find('.input-search').blur(function () {
          setTimeout(function () {
            // input框失去焦点，隐藏下拉框  
            $('.searchListBox').hide();
          }, 300);
        });
        $defaultHtml.find('.searchListUl').on('click', '.searchItem', function () {
          var li = '<li><span class="userName" data-value=' + $(this).attr('data-value') + ' value="' + $(this).text() + '">' + $(this).text() + '</span> <span class="del-user">x</span></li>';
          if (condition.ifChoice == 'checkbox') {
            $('.ul-box .list-selecred').append(li);
          } else {
            $('.ul-box .list-selecred').html(li);
          }
          $('input[value = ' + $(this).text() + ']')[0] ? $('input[value = ' + $(this).text() + ']')[0].checked = true : '';
        });
        $defaultHtml.find('.back').click(function () {
          $('#user-box').remove();
        });
        $defaultHtml.find('.sure').click(function () {
          var condition = JSON.parse($('#' + id).attr('data-xdata'));
          var ulLi = '';
          $('.userName').each(function (i, v) {
            ulLi += '<li class="user-item"><span data-value=' + $(v).attr('data-value') + '>' + $(v).text() + '</span></li>';
          });
          $('#' + id).find('.user-content').html(ulLi);
          $('#user-box').remove();
        });
        var page = 1;
        $defaultHtml.find('.previous').click(function () {
          page--;
          if (page < 1) {
            app.alert('已经是第一页了');
            page = 1;
          }
          $('#user-box .list-ul').html(getuser(page));
          $('#user-box .list-selecred .userName').each(function (i, v) {
            $('input[value=' + $(v).text().trim() + ']')[0] ? $('input[value = ' + $(v).text() + ']')[0].checked = true : '';
          });
        });
        $defaultHtml.find('.next').click(function () {
          page++;
          // if(page > 5) {
          // }
          var li = getuser(page);
          if (li) {
            $('#user-box .list-ul').html(li);
            $('#user-box .list-selecred .userName').each(function (i, v) {
              $('input[value=' + $(v).text().trim() + ']')[0] ? $('input[value = ' + $(v).text() + ']')[0].checked = true : '';
            });
          } else {
            app.alert('已经是最后一页了');
            page--;
          }
        });
        $('body').append($defaultHtml);
      });
    },
    organize: function organize() {
      var id = $(this).attr('id');
      var name = $(this).find('.nameValue').attr('name');
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      var html = setData.title(id, '组织选择', $('#' + id).find('.title span').text()) + setData.underline() + setData.setNmae(id, $('#' + id).find('.nameValue').attr('name')) + setData.underline() + setData.grid(id) + setData.subhead(id, $('#' + id).find('.subhead').text()) + setData.underline() + setData.userOrg(id) + setData.underline() + setData.ifField(id, condition);
      $('.set-content').html(html);
      $('#userOrg').click(function () {
        var condition = JSON.parse($('#' + id).attr('data-xdata'));
        var defaultHtml = '<div id="organize-box">\n          <div class="organize-model">\n            <div class="user-title"><span>\u7528\u6237\u5217\u8868</span> <i class="am-icon-close back"></i></div>\n            <div class="ul-box">\n              <ul class="list-selecred">\n                <li><span class="userName">\u6797\u6CFD\u6210</span> <span class="del-user">x</span></li>\n              </ul>\n            </div>\n            <div class="user-list">\n              <div class="am-tabs" data-am-tabs>\n                <ul class="am-tabs-nav am-nav am-nav-tabs">\n                  <li class="am-active"><a href="#tab1">\u90E8\u95E8</a></li>\n                  <li><a href="#tab2">\u52A8\u6001\u53C2\u6570</a></li>\n                </ul>\n            \n                <div class="am-tabs-bd am-tabs-bd-ofv" style="height:309px">\n                  <div class="am-tab-panel am-fade am-in am-active" id="tab1">\n                  </div>\n                  <div class="am-tab-panel am-fade" id="tab2">\n                    <ul>\n                      <li data-value=' + JSON.stringify({ "orgID": "#{org.orgName}", "enterpriseID": "1267", "orgCode": "1001", "orgName": "当前部门" }) + '>\u5F53\u524D\u90E8\u95E8</li>\n                    </ul>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class="btn-box">\n              <div>\n                \n              </div>\n              <div>\n                <button type="button" class="am-btn am-btn-default am-radius back" >\u53D6\u6D88</button>\n                <button type="button" class="am-btn am-btn-success am-radius sure">\u786E\u5B9A</button>\n              </div>\n            </div>\n          </div>\n        </div>';
        var $defaultHtml = $(defaultHtml);
        var datali = '';
        $('#' + id).find('.organize-item').each(function (i, v) {
          datali += '<li><span class="userName" data-value=' + $(v).find('span').attr('data-value') + ' value="' + $(v).text() + '">' + $(v).text() + '</span> <span class="del-user">x</span></li>';
        });
        $defaultHtml.find('.list-selecred').html(datali);
        var resData = { "orgID": "13", "enterpriseID": "1267", "orgCode": "100110041001", "orgName": "g021" };

        var resDataChild = [{ "orgID": "19", "enterpriseID": "1267", "orgCode": "10011007", "orgName": "t003" }, { "orgID": "12", "enterpriseID": "1267", "orgCode": "100110031001", "orgName": "g011" }, { "orgID": "13", "enterpriseID": "1267", "orgCode": "100110041001", "orgName": "g021" }, { "orgID": "15", "enterpriseID": "1267", "orgCode": "100110031002", "orgName": "g012" }, { "orgID": "16", "enterpriseID": "1267", "orgCode": "100110031003", "orgName": "g013" }, { "orgID": "14", "enterpriseID": "1267", "orgCode": "1001100310011001", "orgName": "g0111" }];
        function getorg() {
          $.ajax({
            //查询所有根组织机构信息
            url: '/ddio/data/rootOrg.do',
            type: 'POST',
            data: '',
            success: function success(res) {
              resData = res.value;
              var orgul = '<ul>';
              orgul += '<li class="org-item">\n                    <i class="am-icon-plus goOrg"></i>\n                    <div data-value=' + JSON.stringify(resData) + '><span>' + resData.orgName + '</span></div>\n                  </li>';
              orgul += '</ul>';
              sessionStorage.setItem('orgPageArr', JSON.stringify([resData]));
              $('#tab1').html(orgul);
            }
          });
        }
        function getorgChild(orgId) {
          var _this = this;
          $.ajax({
            //根据ID查询组织机构
            url: '/ddio/data/orgList.do',
            type: 'POST',
            data: { id: orgId },
            success: function success(res) {
              resDataChild = res.value;
              if (!resDataChild.length) {
                $(_this).attr({ 'class': 'am-icon-minus' });
                return;
              }
              var Ul = '<div class="org-back"><i class="am-icon-reply"></i> <span>\u4E0A\u4E00\u7EA7</span></div>\n                  <ul>';
              resDataChild.forEach(function (v) {
                Ul += '<li class="org-item">\n                    <i class="am-icon-plus goOrg"></i>\n                    <div data-value=' + JSON.stringify(v) + '><span>' + v.orgName + '</span></div>\n                  </li>';
              });
              Ul += '</ul>';
              var orgPageArr = JSON.parse(sessionStorage.orgPageArr);
              orgPageArr.push(resDataChild);
              sessionStorage.orgPageArr = JSON.stringify(orgPageArr);
              $('#tab1').html(Ul);
            }
          });
        }

        $defaultHtml.on('click', '#tab1 .org-item div, #tab2 li', function () {
          var val = $(this).text();
          var valData = $(this).attr('data-value');
          var li = '<li><span class="userName" data-value=' + valData + '  value="' + val + '">' + val + '</span> <span class="del-user">x</span></li>';
          if (condition.ifChoice == 'radio') {
            $('.list-selecred').html(li);
          } else {
            if (!$('span[value=' + val + ']')[0]) {
              $('.list-selecred').append(li);
            }
          }
        });
        $defaultHtml.find('.list-selecred').on('click', '.del-user', function () {
          $(this).parent().remove();
        });
        // $defaultHtml.find('#tab2 li').click(function () {

        // })
        $defaultHtml.find('#tab1').on('click', '.goOrg', function () {
          var orgId = JSON.parse($(this).parent().find('div').attr('data-value')).orgID;
          getorgChild.call(this, orgId);
        });
        $defaultHtml.find('#tab1').on('click', '.org-back', function () {
          var orghtmlarr = JSON.parse(sessionStorage.orgPageArr);
          var orgarr = orghtmlarr[orghtmlarr.length - 2];
          orghtmlarr.pop();
          sessionStorage.orgPageArr = JSON.stringify(orghtmlarr);
          var orghtml = '';
          if (!orgarr.length) {
            orghtml = '<ul>\n              <li class="org-item">\n                <i class="am-icon-plus goOrg"></i>\n                <div data-value=' + JSON.stringify(orgarr) + '><span>' + orgarr.orgName + '</span></div>\n              </li>\n            </ul>';
          } else {
            orghtml = '<div class="org-back"><i class="am-icon-reply"></i> <span>\u4E0A\u4E00\u7EA7</span></div>\n                  <ul>';
            orgarr.forEach(function (v) {
              orghtml += '<li class="org-item">\n                <i class="am-icon-plus goOrg"></i>\n                <div data-value=' + JSON.stringify(v) + '><span>' + v.orgName + '</span></div>\n              </li>';
            });
            orghtml += '</ul>';
          }
          $('#tab1').html(orghtml);
        });
        $defaultHtml.find('.back').click(function () {
          $('#organize-box').remove();
        });
        $defaultHtml.find('.sure').click(function () {
          var ulLi = '';
          $('.userName').each(function (i, v) {
            ulLi += '<li class="organize-item"><span data-value=' + $(v).attr('data-value') + '>' + $(v).text() + '</span></li>';
          });
          $('#' + id).find('.user-content').html(ulLi);
          $('#organize-box').remove();
        });
        $('body').append($defaultHtml);
        getorg();
      });
    }
  },
  setTableData: {
    text: function text(id) {
      var thThis = this;
      var textData = JSON.parse($(this).attr('data-text'));
      var html = setData.underline() + setData.textTh(textData.option.reg, textData.option.err) + setData.underline() + setData.inputLength(id) + setData.underline() + setData.textInput(id, 'data-text') + setData.underline() + setData.ifFieldTh(id, 'data-text', textData);
      $('.set-content .type-content').html(html);
      var reg = textData.option.reg;
      for (var k in design.textFormat) {
        if (design.textFormat[k] == reg) {
          $('#text-option').val(k);
          $('#text').val('');
          break;
        } else {
          $('#text-option').val(reg);
        }
      }
      var optiotype = $('#text-option').val();
      if (reg && optiotype) {
        $('#textBox').hide();
      }
      $('#text-option').change(function () {
        if ($(this).val() === 'text') {
          $('#textBox').show();
          // let option = JSON.parse($(`#${id}`).attr('data-option'))
          textData.option.reg = $('#text').val();
          $(thThis).attr('data-text', JSON.stringify(textData));
          // $('#text').val(textData.option.reg)
        } else {
          $('#textBox').hide();
          // let option = JSON.parse($(`#${id}`).attr('data-option'))
          textData.option.reg = design.textFormat[$(this).val()];
          $(thThis).attr('data-text', JSON.stringify(textData));
        }
      });
      $('#text').on('input', function () {
        textData.option.reg = $(this).val();
        $(thThis).attr('data-text', JSON.stringify(textData));
      });
      $('#error').on('input', function () {
        textData.option.err = $(this).val();
        $(thThis).attr('data-text', JSON.stringify(textData));
      });
    },
    select: function select(id) {
      var thThis = this;
      var textData = JSON.parse($(this).attr('data-select'));
      var html = setData.underline() + setData.selectTh(id) + setData.underline() + setData.ifFieldTh(id, 'data-select', textData);
      $('.set-content .type-content').html(html);
      $('#selecd-ul').on('click', '.minus', function () {
        $(this).parent().remove();
        selectData();
      });
      $('#selecd-ul').on('input', 'input', function () {
        selectData();
      });
      $('#selecd-ul').on('click', '.circle', function () {
        $('#selecd-ul .circle').addClass('am-icon-circle-o');
        $('#selecd-ul .circle').removeClass('am-icon-dot-circle-o');
        $(this).removeClass('am-icon-circle-o');
        $(this).addClass('am-icon-dot-circle-o');
        selectData();
      });
      $('.add_btn_group ').on('click', '.add_item', function () {
        var ul = '<li>\n          <i class="am-icon-circle-o circle"></i>\n          <a>\n            <input type="text" value="">\n          </a>\n          <i class="am-icon-arrows arrows"></i>\n          <i class="am-icon-minus-circle minus"></i>\n        </li>';
        $('#selecd-ul').append(ul);
        selectData();
      });
      $('#selecd-ul').sortable({
        placeholder: "li",
        handle: '.arrows',
        cursor: 'move',
        update: function update(event, ui) {
          selectData(ui);
        }
      });
      function selectData() {
        textData.value = [];
        $('#selecd-ul li').each(function (i, elemt) {
          //<option value="${element.value}" >${element.name}</option>
          // label += `<option value="${$(elemt).find('input').val()}" disabled
          //  ${$(elemt).find('.circle').attr('class').indexOf('am-icon-dot-circle-o')>-1? 'selected': ''}>${$(elemt).find('input').val()}
          //  </option>`
          textData.value[i] = {};
          textData.value[i].value = $(elemt).find('input').val();
          textData.value[i].name = $(elemt).find('input').val();
          textData.value[i].selected = $(elemt).find('.circle').attr('class').indexOf('am-icon-dot-circle-o') > -1;
        });
        $(thThis).attr('data-select', JSON.stringify(textData));
      }
    },
    datetimepicker: function datetimepicker(id) {
      var thThis = this;
      var textData = JSON.parse($(this).attr('data-datetimepicker'));
      var html = setData.underline() + setData.datatimeFormat(id) + setData.underline() + setData.textInput(id, 'data-datetimepicker') + setData.underline() + setData.ifFieldTh(id, 'data-datetimepicker', textData);
      $('.set-content .type-content').html(html);
      var lang = textData.option.lang;
      $('#lang').val(lang);
      var format = textData.option.format;
      var step = textData.option.step;
      var pickerType = textData.pickerType;
      $('#pickerType').val(pickerType);
      $('#format').html(setData.dateformatOption(pickerType));
      $('#format').val(format);

      var optiontype = $('#format').val();
      if (format && optiontype) {
        $('#textBox').hide();
        $('#text').val('');
      } else {
        $('#text').val(format);
      }
      if (pickerType == 'datepicker') {
        $('#stepBox').hide();
      }
      $('#stepSelect').val(step);
      design.dateTimeJs("default", textData.option);
      $('#lang').change(function () {
        textData.option.lang = $(this).val();
        $(thThis).attr('data-datetimepicker', JSON.stringify(textData));
        design.dateTimeJs("default", textData.option);
      });
      $('#pickerType').change(function () {
        var datepicker = false;
        var timepicker = false;
        var format = '';
        if ($(this).val() === 'allpicker') {
          format = "Y-m-d H:i";
          datepicker = true;
          timepicker = true;
        } else if ($(this).val() === 'datepicker') {
          format = "Y-m-d";
          datepicker = true;
          timepicker = false;
        } else if ($(this).val() == 'timepicker') {
          format = "H:i";
          datepicker = false;
          timepicker = true;
        }
        $('#format').html(setData.dateformatOption($(this).val()));
        $('#format').val(format);
        var optiontype = $('#format').val();
        if (format && optiontype) {
          $('#textBox').hide();
          $('#text').val('');
        } else {
          $('#textBox').show();
          $('#text').val(format);
        }

        textData.option.datepicker = datepicker;
        textData.option.timepicker = timepicker;
        textData.option.format = format;
        textData.pickerType = $(this).val();
        $(thThis).attr('data-datetimepicker', JSON.stringify(textData));
        design.dateTimeJs("default", textData.option);
      });
      $('#format').change(function () {
        if ($(this).val() === 'text') {
          $('#textBox').show();
          textData.option.format = '';
          $('#text').val(textData.option.format);
        } else {
          $('#textBox').hide();
          textData.option.format = $(this).val();
        }
        $(thThis).attr('data-datetimepicker', JSON.stringify(textData));
        design.dateTimeJs("default", textData.option);
      });
      $('#stepSelect').change(function () {
        var textData = JSON.parse($(thThis).attr('data-datetimepicker'));
        textData.option.step = parseInt($(this).val());
        $(thThis).attr('data-datetimepicker', JSON.stringify(textData));
        design.dateTimeJs("default", textData.option);
      });
      $('#text').on('input', function () {
        textData.option.format = $(this).val();
        $(thThis).attr('data-datetimepicker', JSON.stringify(textData));
        design.dateTimeJs("default", textData.option);
      });
    }
  },
  ComponentTypeChange: function ComponentTypeChange(id) {
    var el = '#' + id;
    var content = {};
    var ifField = JSON.parse($(el).attr('data-xdata'));
    content.id = id;
    content.title = $(el).find('.title span').text();
    content.type = $(el).attr('data-xhtml');
    content.name = $(el).find('.nameValue').attr('name');
    content.grid = !$(el).attr('class').replace(/[^0-9]/ig, "") ? '12' : $(el).attr('class').replace(/[^0-9]/ig, "");
    content.labelGrid = ifField.labelGrid;
    content.inputGrid = ifField.inputGrid;
    content.subhead = $(el).find('.subhead').text();
    content.ComponentType = ifField.ComponentType;
    content.data = {
      ifWrite: ifField.ifWrite,
      ifShow: ifField.ifShow,
      ifEditor: ifField.ifEditor
    };
    if ($(el).attr('data-xhtml') == 'text' || $(el).attr('data-xhtml') == 'textarea') {
      content.maxLangth = ifField.maxLangth;
      content.minLangth = ifField.minLangth;
    }
    if ($(el).attr('data-xhtml') == 'radio' || $(el).attr('data-xhtml') == 'checkbox') {
      content.labelArrange = ifField.labelArrange;
    }
    var obj = this.getElementData[$(el).attr('data-xhtml')].call(this, el);
    if (obj.data) {
      obj.data = Object.assign(content.data, obj.data);
    }
    Object.assign(content, obj);
    return content;
  },
  designSet: function designSet() {
    var _this = this;

    $('.design-view').on('click', '.group', function (e) {
      e.stopPropagation();
      _this.setdata[$(this).attr('data-xhtml')].call(this, _this);
      $('.group').removeClass('active');
      $('.th-item').removeClass('active');
      $(this).addClass('active');
      $('.delete').hide();
      $(this).children('.delete').show();
    });
    $('.design-view').off('click', '.delete').on('click', '.delete', function (e) {
      e.stopPropagation();
      $('#my-confirm .am-modal-hd').html('');
      if ($(this).parent().attr('data-xhtml') == 'panel') {
        $('#my-confirm .am-modal-bd').html('若删除该元素，其里面的表单数据也会被清除,且无法通过上一步还原。确定删除？');
      } else {
        $('#my-confirm .am-modal-bd').html('若删除该元素，其对应的表单数据也会被清除,且无法通过上一步还原。确定删除？');
      }
      // console.log(this, '++++++++++')
      $('#my-confirm').modal({
        relatedTarget: $(this).parent().attr('id'),
        onConfirm: function onConfirm(options) {
          console.log(this.relatedTarget);
          $('#' + this.relatedTarget).remove();
          if ($('.group').length) {
            $('.group').eq($('.group').length - 1).click();
          } else {
            $('.set-content').html('');
          }
          var idx = _this.step.indexOf(this.relatedTarget);
          if (idx > -1) {
            console.log(idx);
            _this.step.splice(idx, 1);
          }
        },
        // closeOnConfirm: false,
        onCancel: function onCancel() {}
      });
      // $(this).parent().remove()
    });
    $('.design-view').off('click', '.th-item').on('click', '.th-item', function (e) {
      e.stopPropagation();
      $(this).parent().parent().parent().parent().parent().parent().removeClass('active');
      $('.delete').hide();
      $('.th-item').removeClass('active');
      $(this).addClass('active');
      var id = $(this).parent().parent().parent().parent().parent().parent().attr('id');
      var html = setData.titleTh(id, $('#' + id).find('th.active').text()) + setData.underline() + setData.setNameTh(id, $('#' + id).find('th.active').attr('name') || '') + setData.underline() + setData.typeTh();
      $('.set-content').html(html);
      var type = $(this).attr('data-type');
      if (!type) {
        type = $('#typeTh-option').val();
      } else {
        $('#typeTh-option').val(type);
      }
      _this.setTableData[type].call(this, id);
      $(this).attr({ 'data-type': type });
      var thThis = this;
      $('#typeTh-option').off('change').on('change', function (e) {
        $('#' + id).find('th.active').attr('data-type', $(this).val());
        _this.setTableData[$('#typeTh-option').val()].call(thThis, id);
      });
    });

    $('.set-content').off('click', '.deleteTh').on('click', '.deleteTh', function (e) {
      e.stopPropagation();
      var id = $('th.active').parent().parent().parent().parent().parent().parent().attr('id');
      if ($('#' + id).find('th').length === 1) {
        app.alert("已经是最后一个标题了，无法删除");
        return;
      }
      $('th.active').remove();
      $('#' + id).find('th').eq(0).click();
    });
  }
};