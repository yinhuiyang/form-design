var setData = {
  title: function title(id, type, value) {
    var titleHtml = '<div class="setElementTitle">\n        <span>\u6807\u9898</span>\n        <span class="setNmae">' + type + '</span>\n      </div>\n      <input type="text" id="title" class="input_title" oninput="' + fn + ';fn.call(this, \'' + id + '\')" value="' + value + '">';
    function fn(id) {
      if ($('#' + id).attr('data-xhtml') == 'form' || $('#' + id).attr('data-xhtml') == 'table') {
        $('#' + id).find('#title span').text($(this).val());
      } else {
        $('#' + id).find('.title span').text($(this).val());
      }
    }
    return titleHtml;
  },
  background: function background() {
    var html = '<div class="setElementTitle">\n      <span>\u6807\u9898\u80CC\u666F\u8272</span>\n    </div>\n    <select id="backgroundFrom" data-am-selected="{btnWidth: \'100%\', btnSize: \'sm\'}">\n      <option value="#f5f5f5" selected>\u7070\u8272</option>\n      <option value="#2196F3">\u84DD\u8272</option>\n      <option value="#00BCD4">\u9752\u8272</option>\n      <option value="#4CAF50">\u7EFF\u8272</option>\n      <option value="#CDDC39">\u9752\u67E0</option>\n      <option value="#FF9800">\u6A59\u8272</option>\n      <option value="#F44336">\u7EA2\u8272</option>\n    </select>';
    return html;
  },
  panelSize: function panelSize() {
    var html = '<div class="setElementTitle">\n    <span>\u9762\u677F\u5C3A\u5BF8</span>\n  </div>\n  <select id="panelSize" data-am-selected="{btnWidth: \'100%\', btnSize: \'sm\'}">\n    <option value="12px">12px</option>\n    <option value="14px" selected>14px</option>\n    <option value="15px">15px</option>\n    <option value="17px">17px</option>\n    <option value="20px">20px</option>\n  </select>';
    return html;
  },
  titleTh: function titleTh(id, value) {
    var titleHtml = '<div class="setElementTitle">\n        <span>\u6807\u9898</span>\n        <button type="button" class="am-btn am-btn-danger deleteTh am-radius">\u5220\u9664</button>\n      </div>\n      <input type="text" id="title" class="input_title" oninput="' + fn + ';fn.call(this, \'' + id + '\')" value="' + value + '">';
    function fn(id) {
      $('#' + id).find('th.active').text($(this).val());
    }
    return titleHtml;
  },
  setNameTh: function setNameTh(id, value) {
    var setNmaeHtml = '<div class="setElementTitle">\n        <span>\u5B57\u6BB5\u540D\u79F0</span>\n      </div>\n      <input type="text" id="name" class="input_title" oninput="' + fn + ';fn.call(this, \'' + id + '\')" value="' + value + '">';
    function fn(id) {
      $('#' + id).find('th.active').attr('name', $(this).val());
    }
    return setNmaeHtml;
  },
  typeTh: function typeTh() {
    var typeThHtml = '<div class="setElementTitle">\n          <span>\u7EC4\u4EF6\u7C7B\u578B</span>\n        </div>\n        <div>\n        <select id="typeTh-option" data-am-selected="{btnWidth: \'100%\', btnSize: \'sm\'}">\n            <option value="text" selected>\u8F93\u5165\u6846</option>\n            <option value="select">\u4E0B\u62C9\u6846</option>\n            <option value="datetimepicker">\u65E5\u671F</option>\n        </select>\n        </div>\n        <div class="type-content"></div>\n        ';
    return typeThHtml;
  },
  setNmae: function setNmae(id, value) {
    var setNmaeHtml = '<div class="setElementTitle">\n        <span>\u5B57\u6BB5\u540D\u79F0</span>\n      </div>\n      <input type="text" id="name" class="input_title" oninput="' + fn + ';fn.call(this, \'' + id + '\')" value="' + value + '">';
    function fn(id) {
      $('#' + id).find('.nameValue').attr('name', $(this).val());
    }
    return setNmaeHtml;
  },
  tableAddTh: function tableAddTh(id) {
    var html = '<div class="setElementTitle">\n    <span>\u6DFB\u52A0\u5217</span>\n  </div>\n  <button type="button" class="am-btn am-btn-secondary am-radius" style="width:100%;" onclick="' + fn + ';fn.call(this, \'' + id + '\')">\u6DFB\u52A0</button>';
    function fn(id) {
      var thHtml = '<th class=\'th-item\'>\u8BF7\u8F93\u5165\u6807\u9898</th>';
      var $thHtml = $(thHtml);
      $thHtml.attr({
        'data-text': JSON.stringify(design.tableType.text),
        'data-select': JSON.stringify(design.tableType.select),
        'data-datetimepicker': JSON.stringify(design.tableType.datetimepicker),
        'name': 'th',
        'data-type': ''
      });
      $('#' + id).find('table tr').append($thHtml);
    }
    return html;
  },
  setFormNmae: function setFormNmae(id, value) {
    var setNmaeHtml = '<div class="setElementTitle">\n        <span>\u5B57\u6BB5\u540D\u79F0</span>\n      </div>\n      <input type="text" id="name" class="input_title" oninput="' + fn + ';fn.call(this, \'' + id + '\')" value="' + value + '">';
    function fn(id) {
      $('#' + id).children('.nameValue').attr('name', $(this).val());
    }
    return setNmaeHtml;
  },
  underline: function underline() {
    return '<div class="cfg_split"></div>';
  },
  labelGrid: function labelGrid(id) {
    var condition = JSON.parse($('#' + id).attr('data-xdata'));
    var labelGrid = '\n    <div>\n      <div class="cfg_split"></div>\n      <div class="setElementTitle">\n        <span>\u6807\u9898\u957F\u5EA6</span>\n      </div>\n      <input type="number" id="grid-label" max="12" min="0" class="input_title" oninput="' + labelGridfn + ';labelGridfn.call(this, \'' + id + '\')" value="' + condition.labelGrid + '">\n      <div class="am-alert am-alert-danger" style="display: none;">\u6700\u5927\u503C\u4E3A12\uFF0C\u6700\u5C0F\u4E3A0</div>\n    </div>';
    function labelGridfn(id) {
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      var num = parseInt($(this).val());
      if (num > 12 || num < 0) {
        $(this).val(3);
        $('.am-alert').show();
        return;
      } else {
        $('.am-alert').hide();
      }
      var reg = /am-u-sm-\d*/ig;
      var className = reg.exec($('#' + id).find('.title').attr('class'))[0];
      $('#' + id).find('.title').removeClass(className);
      if (condition.ComponentType != 'OneRowAndThreeColumns') {
        var className1 = $('#' + id).find('.gridContent').attr('class').match(reg)[0];
        $('#' + id).find('.gridContent').removeClass(className1);
        $('#' + id).find('.gridContent').addClass('am-u-sm-' + (12 - $(this).val()));
        condition.inputGrid = 12 - $(this).val();
      } else {
        var _className = $('#' + id).find('.subhead').attr('class').match(reg)[0];
        $('#' + id).find('.subhead').removeClass(_className);
        parseInt(condition.inputGrid) + parseInt($(this).val()) > 12 ? $('#' + id).find('.subhead').addClass('am-u-sm-0') : $('#' + id).find('.subhead').addClass('am-u-sm-' + (12 - $(this).val() - condition.inputGrid));
        parseInt(condition.inputGrid) + parseInt($(this).val()) >= 12 ? $(this).val(12 - condition.inputGrid) : '';
      }
      $('#' + id).find('.title').addClass('am-u-sm-' + $(this).val());
      condition.labelGrid = $(this).val();
      $('#' + id).attr('data-xdata', JSON.stringify(condition));
    }
    return labelGrid;
  },
  inputGrid: function inputGrid(id) {
    var condition = JSON.parse($('#' + id).attr('data-xdata'));
    var inputGrid = '\n    <div>\n      <div class="cfg_split"></div>\n      <div class="setElementTitle">\n        <span>\u8F93\u5165\u6846\u957F\u5EA6</span>\n      </div>\n      <input type="number" id="grid-inputGrid" max="12" min="1"  class="input_title" oninput="' + inputGridfn + ';inputGridfn.call(this, \'' + id + '\')" class="input_title" value="' + condition.inputGrid + '">\n      <div class="am-alert am-alert-danger" style="display: none;">\u6700\u5927\u503C\u4E3A12\uFF0C\u6700\u5C0F\u4E3A1</div>\n    </div>';
    function inputGridfn(id) {
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      var num = parseInt($(this).val());
      if (num > 12 || num < 1) {
        $(this).val(3);
        $('.am-alert').show();
        return;
      } else {
        $('.am-alert').hide();
      }
      var reg = /am-u-sm-\d*/ig;
      var className = $('#' + id).find('.gridContent').attr('class').match(reg)[0];
      $('#' + id).find('.gridContent').removeClass(className);
      if (condition.ComponentType == 'TwoRowAndTwoColumnsSub') {
        var className1 = $('#' + id).find('.subhead').attr('class').match(reg)[0];
        $('#' + id).find('.subhead').removeClass(className1);
        $('#' + id).find('.subhead').addClass('am-u-sm-' + (12 - $(this).val()));
        condition.labelGrid = 12 - $(this).val();
      }
      if (condition.ComponentType == 'OneRowAndThreeColumns') {
        var _className2 = $('#' + id).find('.subhead').attr('class').match(reg)[0];
        $('#' + id).find('.subhead').removeClass(_className2);
        parseInt(condition.labelGrid) + parseInt($(this).val()) > 12 ? $('#' + id).find('.subhead').addClass('am-u-sm-0') : $('#' + id).find('.subhead').addClass('am-u-sm-' + (12 - $(this).val() - condition.labelGrid));
        parseInt(condition.labelGrid) + parseInt($(this).val()) >= 12 ? $(this).val(12 - condition.labelGrid) : '';
      }
      $('#' + id).find('.gridContent').addClass('am-u-sm-' + $(this).val());
      condition.inputGrid = $(this).val();
      $('#' + id).attr('data-xdata', JSON.stringify(condition));
    }
    return inputGrid;
  },
  grid: function grid(id) {
    var numinpt = $('#' + id).attr('class').replace(/[^0-9]/ig, "");
    if (!numinpt) {
      numinpt = 12;
      var reg = /am-u-sm-\d*/ig;
      var className = reg.exec($('#' + id).attr('class'))[0];
      $('#' + id).removeClass(className);
      $('#' + id).addClass('am-u-sm-' + numinpt);
    }
    var gridHtml = '<div class="setElementTitle">\n      <span>\u7F51\u683C\u961F\u5217</span>\n    </div>\n    <input type="number" id="grid-ipt" max="12" min="1" class="input_title" oninput="' + fn + ';fn.call(this, \'' + id + '\')" value="' + numinpt + '">\n    <div class="am-alert am-alert-danger" style="display: none;">\u6700\u5927\u503C\u4E3A12\uFF0C\u6700\u5C0F\u4E3A1</div>';

    function fn(id) {
      var num = parseInt($(this).val());
      console.log(num);
      if (num > 12 || num < 1) {
        $(this).val(12);
        $('.am-alert').show();
      } else {
        $('.am-alert').hide();
      }
      var reg = /am-u-sm-\d*/ig;
      var className = reg.exec($('#' + id).attr('class'))[0];
      $('#' + id).removeClass(className);
      $('#' + id).addClass('am-u-sm-' + $(this).val());
    }
    return gridHtml;
  },
  subhead: function subhead(id, value) {
    var subhead = '<div id="Help">\n        <div class="cfg_split"></div>\n        <div class="setElementTitle">\n          <span>\u63CF\u8FF0\u4FE1\u606F</span>\n        </div>\n        <textarea  rows="2" oninput="' + fn + ';fn.call(this, \'' + id + '\')">' + value + '</textarea>\n      </div>';
    function fn(id) {
      $('#' + id).find('.subhead').text($(this).val());
    }
    return subhead;
  },
  inputLength: function inputLength(id) {
    var condition = {};
    if ($('#' + id).attr('data-xhtml') == 'table') {
      condition = JSON.parse($('#' + id).find('th.active').attr('data-text'));
    } else {
      condition = JSON.parse($('#' + id).attr('data-xdata'));
    }

    var html = '<div class="setElementTitle">\n      <span>\u5B57\u7B26\u957F\u5EA6</span>\n    </div>\n    <div>\n      <div class="am-form-group custom-group langth-group">\n        <span style="width: 100px;">\u6700\u5927\u957F\u5EA6:</span><input id=\'max\' step="1" min=\'0\' oninput="' + maxValue + ';maxValue.call(this, \'' + id + '\')" type="number" value="' + condition.maxLangth + '"  class="am-form-field custom">\n      </div>\n      <div class="am-form-group custom-group langth-group">\n        <span style="width: 100px;">\u6700\u5C0F\u957F\u5EA6:</span><input id=\'min\' step="1" min=\'0\' oninput="' + minValue + ';minValue.call(this, \'' + id + '\')" type="number" value="' + condition.minLangth + '" class="am-form-field custom">\n      </div>\n    </div>';
    function maxValue(id) {
      var condition = {};
      if ($('#' + id).attr('data-xhtml') == 'table') {
        condition = JSON.parse($('#' + id).find('th.active').attr('data-text'));
      } else {
        condition = JSON.parse($('#' + id).attr('data-xdata'));
      }
      if (condition.minLangth > parseInt($(this).val())) {
        if (!$(this).parent().parent().find('.am-alert')[0]) {
          $(this).parent().parent().append('<div class=\'am-alert am-alert-danger\' style=\' display: block;\'>最小长度不能大于最大长度</div>');
        }
      } else {
        condition.maxLangth = parseInt($(this).val());
        $('#' + id).attr('data-xhtml') == 'table' ? $('#' + id).find('th.active').attr('data-text', JSON.stringify(condition)) : $('#' + id).attr('data-xdata', JSON.stringify(condition));
        $(this).parent().parent().find('.am-alert').remove();
        $('#default').attr('maxlength', $(this).val());
      }
    }
    function minValue(id) {
      var condition = {};
      if ($('#' + id).attr('data-xhtml') == 'table') {
        condition = JSON.parse($('#' + id).find('th.active').attr('data-text'));
      } else {
        condition = JSON.parse($('#' + id).attr('data-xdata'));
      }
      if (condition.maxLangth < parseInt($(this).val())) {
        if (!$(this).parent().parent().find('.am-alert')[0]) {
          $(this).parent().parent().append('<div class=\'am-alert am-alert-danger\' style=\'display: block;\'>\u6700\u5C0F\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E\u6700\u5927\u957F\u5EA6</div>');
        }
      } else {
        condition.minLangth = parseInt($(this).val());
        $('#' + id).attr('data-xhtml') == 'table' ? $('#' + id).find('th.active').attr('data-text', JSON.stringify(condition)) : $('#' + id).attr('data-xdata', JSON.stringify(condition));
        $(this).parent().parent().find('.am-alert').remove();
      }
    }
    return html;
  },
  iFinline: function iFinline(labelArrange) {
    var html = '\n    <div class="setElementTitle">\n      <span>\u9009\u9879\u6392\u5217</span>\n    </div>\n    <div class="choice">\n    <div class="choice-btn choice-left ' + (labelArrange == 'longitudinal' ? 'choice-selected' : '') + '" id="longitudinal">\u7EB5\u6392</div>\n    <div class="choice-btn choice-right ' + (labelArrange == 'transverse' ? 'choice-selected' : '') + '" id="transverse">\u6A2A\u6392</div>\n    </div>\n    ';
    return html;
  },
  ComponentType: function ComponentType() {
    var html = '<div class="setElementTitle">\n      <span>\u7EC4\u4EF6\u7C7B\u578B</span>\n    </div>\n    <div>\n    <select id="ComponentType" data-am-selected="{btnWidth: \'100%\', btnSize: \'sm\'}">\n        <option value="ThreeRowsAndOneColumn" selected>\u4E09\u884C\u4E00\u5217</option>\n        <option value="OneRowAndTwoColumns" >\u4E00\u884C\u4E24\u5217</option></option>\n        <option value="TwoRowAndTwoColumns">\u4E24\u884C\u4E24\u5217\uFF08\u5E2E\u52A9\u4FE1\u606F\u5728\u4E0B\uFF09</option>\n        <option value="TwoRowAndTwoColumnsSub">\u4E24\u884C\u4E24\u5217\uFF08\u5E2E\u52A9\u4FE1\u606F\u548C\u8F93\u5165\u6846\u5728\u4E0B\uFF09</option>\n        <option value="OneRowAndThreeColumns">\u4E00\u884C\u4E09\u5217\uFF08\u6709\u5E2E\u52A9\u4FE1\u606F\uFF09</option>\n        <option value="TwoRowsAndOneColumn" >\u4E24\u884C\u4E00\u5217</option>\n    </select>';
    return html;
  },
  textInput: function textInput(id, type) {
    var inputHtml = '<div class="setElementTitle">\n        <span>\u9ED8\u8BA4\u503C</span>\n      </div>\n      <div>\n        <div class="am-form-group custom-group">';
    if ($('#' + id).attr('data-xhtml') == 'textarea') {
      var _condition = JSON.parse($('#' + id).attr('data-xdata'));
      inputHtml += '<textarea  id="default" rows="2" maxlength="' + _condition.maxLangth + '" onchange="' + iptvalue + ';iptvalue.call(this, \'' + id + '\')" oninput="' + iptvalue + ';iptvalue.call(this, \'' + id + '\')"  placeholder="" class="am-form-field">' + $('#' + id).find('.input').val() + '</textarea>';
    } else if ($('#' + id).attr('data-xhtml') == 'datetimepicker') {
      inputHtml += '<input type="text" id="default" class="am-form-field custom datetimepicker" onchange="' + iptvalue + ';iptvalue.call(this, \'' + id + '\')" value="' + $('#' + id).find('.input').val() + '"/>' + ('<i class="am-icon-question icon-bz" onclick=\'' + defaultFn + ';defaultFn("' + id + '", "' + type + '")\'></i>');
    } else if ($('#' + id).attr('data-xhtml') == 'table') {
      if (type == 'data-text') {
        condition = JSON.parse($('#' + id).find('th.active').attr('data-text'));
        inputHtml += '<input type="text" id="default" maxlength="' + condition.maxLangth + '" class="am-form-field custom" onchange="' + iptvalue + ';iptvalue.call(this, \'' + id + '\')" oninput="' + iptvalue + ';iptvalue.call(this, \'' + id + '\')" value="' + JSON.parse($('#' + id).find('th.active').attr(type)).value + '"/>' + ('<i class="am-icon-question icon-bz" onclick=\'' + defaultFn + ';defaultFn("' + id + '")\'></i>');
      } else {
        inputHtml += '<input type="text" id="default" onchange="' + iptvalue + ';iptvalue.call(this, \'' + id + '\')" class="am-form-field custom" oninput="' + iptvalue + ';iptvalue.call(this, \'' + id + '\')" value="' + JSON.parse($('#' + id).find('th.active').attr(type)).value + '"/>' + ('<i class="am-icon-question icon-bz" onclick=\'' + defaultFn + ';defaultFn("' + id + '", "' + type + '")\'></i>');
      }
    } else {
      var _condition2 = JSON.parse($('#' + id).attr('data-xdata'));
      inputHtml += '<input type="text" id="default" maxlength="' + (_condition2.maxLangth || '') + '" class="am-form-field custom" onchange="' + iptvalue + ';iptvalue.call(this, \'' + id + '\')"  oninput="' + iptvalue + ';iptvalue.call(this, \'' + id + '\')" value="' + $('#' + id).find('.input').val() + '"/>' + ('<i class="am-icon-question icon-bz" onclick=\'' + defaultFn + ';defaultFn("' + id + '")\'></i>');
    }
    inputHtml += '</div>';
    inputHtml += '</div>\n      <div class="cfg_split"></div>\n      <div class="setElementTitle">\n        <span>\u8F93\u5165\u63D0\u793A</span>\n      </div>\n      <div class="am-form-group">';
    if ($('#' + id).attr('data-xhtml') == 'table') {
      inputHtml += '<input type="text" id="prompt" oninput="' + iptPlaceholder + ';iptPlaceholder.call(this, \'' + id + '\')" value="' + JSON.parse($('#' + id).find('th.active').attr(type)).placeholder + '" class="am-form-field custom"/>\n      </div>';
    } else {
      inputHtml += '<input type="text" id="prompt" oninput="' + iptPlaceholder + ';iptPlaceholder.call(this, \'' + id + '\')" value="' + $('#' + id).find('.input').attr('placeholder') + '" class="am-form-field custom"/>\n      </div>';
    }

    function iptvalue(id) {
      if ($('#' + id).attr('data-xhtml') == 'table') {
        if ($('#' + id).find('th.active').attr('data-type') == 'text') {
          var data = JSON.parse($('#' + id).find('th.active').attr('data-text'));
          if ($(this).val().length < data.minLangth && $(this).val().length != 0) {
            $(this).parent().parent().find('.am-alert')[0] ? $(this).parent().parent().find('.am-alert').remove() : $(this).parent().parent().append('<div class=\'am-alert am-alert-danger\' style=\' display: block;\'>最少输入' + data.minLangth + '个字符</div>');
            $(this).parent().parent().find('.am-alert')[0] ? '' : $(this).parent().parent().append('<div class=\'am-alert am-alert-danger\' style=\' display: block;\'>最少输入' + data.minLangth + '个字符</div>');
          } else {
            $(this).parent().parent().find('.am-alert').remove();
            data.value = $(this).val();
            $('#' + id).find('th.active').attr('data-text', JSON.stringify(data));
          }
        } else {
          var _data = JSON.parse($('#' + id).find('th.active').attr('data-datetimepicker'));
          _data.value = $(this).val();
          $('#' + id).find('th.active').attr('data-datetimepicker', JSON.stringify(_data));
        }
      } else {
        var _condition3 = JSON.parse($('#' + id).attr('data-xdata'));
        if ($('#' + id).attr('data-xhtml') == 'text' || $('#' + id).attr('data-xhtml') == 'textarea') {
          if ($(this).val().length < _condition3.minLangth && $(this).val().length != 0) {
            $(this).parent().parent().find('.am-alert')[0] ? $(this).parent().parent().find('.am-alert').remove() : $(this).parent().parent().append('<div class=\'am-alert am-alert-danger\' style=\' display: block;\'>最少输入' + _condition3.minLangth + '个字符</div>');
            $(this).parent().parent().find('.am-alert')[0] ? '' : $(this).parent().parent().append('<div class=\'am-alert am-alert-danger\' style=\' display: block;\'>最少输入' + _condition3.minLangth + '个字符</div>');
          } else {
            $(this).parent().parent().find('.am-alert').remove();
            $('#' + id).find('.input').val($(this).val());
          }
        } else {
          $('#' + id).find('.input').val($(this).val());
        }
      }
    }
    function iptPlaceholder(id) {
      if ($('#' + id).attr('data-xhtml') == 'table') {
        if ($('#' + id).find('th.active').attr('data-type') == 'text') {
          var data = JSON.parse($('#' + id).find('th.active').attr('data-text'));
          data.placeholder = $(this).val();
          $('#' + id).find('th.active').attr('data-text', JSON.stringify(data));
        } else {
          var _data2 = JSON.parse($('#' + id).find('th.active').attr('data-datetimepicker'));
          _data2.placeholder = $(this).val();
          $('#' + id).find('th.active').attr('data-datetimepicker', JSON.stringify(_data2));
        }
      } else {
        $('#' + id).find('.input').attr('placeholder', $(this).val());
      }
    }
    function defaultFn(id, type) {
      var html = '<div class="am-modal am-modal-no-btn" tabindex="-1" id="">\n        <div class="am-modal-dialog">\n          <div class="am-modal-hd">\u9ED8\u8BA4\u51FD\u6570\n            <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>\n          </div>\n          <div class="am-modal-bd">\n          <ul class="am-list am-list-static">';
      if ($('#' + id).attr("data-xhtml") === "text" || $("#" + id).find("th.active").attr("data-type") == "text") {
        html += '<li><span class="default-value">' + "#{user.name}" + '</span><span class="am-badge am-badge-success">\u8F93\u5165</span></li></li>\n          <li><span class="default-value">' + "#{org.orgName}" + '</span><span class="am-badge am-badge-success">\u8F93\u5165</span></li></li>';
      }
      if ($('#' + id).attr("data-xhtml") === "datetimepicker" || $("#" + id).find("th.active").attr("data-type") == "datetimepicker") {
        html += '<li><span class="default-value">' + "#{getToday()} </span><input type=" + "text" + " class=" + "datetimepicker-time" + " " + "/>" + '<span class="am-badge am-badge-success">\u8F93\u5165</span></li>';
      }
      html += '</ul> \n          </div>\n        </div>\n      </div>';
      var $html = $(html);
      if ($('#' + id).attr("data-xhtml") === "datetimepicker" || $("#" + id).find("th.active").attr("data-type") == "datetimepicker") {
        var dateDta = JSON.parse($("#" + id).attr(type) || $("#" + id).find("th.active").attr(type));
        var step = dateDta.step || dateDta.option.step;
        $.datetimepicker.setLocale("ch");
        $html.find(".datetimepicker-time").datetimepicker({ lang: "ch", step: step, datepicker: false, timepicker: true, format: "H:i" });
      }
      $html.modal();
      $html.attr("id", "your-defaultFn_" + app.getNumber());
      $html.find(".am-badge-success").click(function () {
        var val = "";
        if ($(this).parent().find("input")[0]) {
          val = "#{getToday()}" + " " + $(this).parent().find("input").eq(0).val();
        } else {
          val = $(this).parent().find(".default-value").text();
        }
        $("#default").val(val);
        // $(`#${id}`).find("input").val(val)
        $("#default").change();
        $(this).parent().parent().parent().parent().parent().modal("close");
      });
      $("body").append($html);
      // $("#your-defaultFn").modal()
    }
    return inputHtml;
  },
  text: function text(id) {
    var textHtml = '<div class="setElementTitle">\n          <span>\u683C\u5F0F</span>\n        </div>\n        <div>\n        <select id="text-option" data-am-selected="{btnWidth: \'100%\', btnSize: \'sm\'}">\n            <option value="text" selected>\u81EA\u5B9A\u4E49</option>\n            <option value="phone" >\u624B\u673A\u53F7\u7801</option>\n            <option value="telephone">\u7535\u8BDD\u53F7\u7801</option>\n            <option value="postalcode">\u90AE\u653F\u7F16\u7801</option>\n            <option value="IDnumber" >\u8EAB\u4EFD\u53F7\u7801</option>\n            <option value="email" >\u90AE\u7BB1</option>\n            <option value="number" >\u6570\u5B57</option>\n            <option value="positiveNumber" >\u6B63\u6570</option>\n            <option value="integer" >\u6B63\u6574\u6570</option>\n        </select>\n        </div>\n        <div class="am-form-group" id=\'textBox\'>\n          <input type="text" id="text" class="am-form-field custom" value="' + JSON.parse($('#' + id).attr('data-option')).reg + '" placeholder="\u6B63\u5219\u9A8C\u8BC1"/>\n        </div>\n        <div class="am-form-group" id=\'errorBox\'>\n          <input type="text" id="error" class="am-form-field custom" value="' + JSON.parse($('#' + id).attr('data-option')).err + '" placeholder="\u9A8C\u8BC1\u9519\u8BEF\u63D0\u793A"/>\n        </div>';
    return textHtml;
  },
  textTh: function textTh(reg, err) {
    var textHtml = '<div class="setElementTitle">\n          <span>\u683C\u5F0F</span>\n        </div>\n        <div>\n        <select id="text-option" data-am-selected="{btnWidth: \'100%\', btnSize: \'sm\'}">\n            <option value="text" selected>\u81EA\u5B9A\u4E49</option>\n            <option value="phone" >\u624B\u673A\u53F7\u7801</option>\n            <option value="telephone">\u7535\u8BDD\u53F7\u7801</option>\n            <option value="postalcode">\u90AE\u653F\u7F16\u7801</option>\n            <option value="IDnumber" >\u8EAB\u4EFD\u53F7\u7801</option>\n            <option value="email" >\u90AE\u7BB1</option>\n            <option value="number" >\u6570\u5B57</option>\n            <option value="positiveNumber" >\u6B63\u6570</option>\n            <option value="integer" >\u6B63\u6574\u6570</option>\n        </select>\n        </div>\n        <div class="am-form-group" id=\'textBox\'>\n          <input type="text" id="text" class="am-form-field custom" value="' + reg + '" placeholder="\u6B63\u5219\u9A8C\u8BC1"/>\n        </div>\n        <div class="am-form-group" id=\'errorBox\'>\n          <input type="text" id="error" class="am-form-field custom" value="' + err + '" placeholder="\u9A8C\u8BC1\u9519\u8BEF\u63D0\u793A"/>\n        </div>';
    return textHtml;
  },
  datatimeFormat: function datatimeFormat(id) {
    var textHtml = '<div class="setElementTitle">\n          <span>\u683C\u5F0F</span>\n        </div>\n        <div>\n          <div style="display: flex;">\n                <span style="width: 50px;margin-left: 20px;">\u8BED\u8A00</span>\n                <select id="lang" data-am-selected="{btnWidth: \'100%\' , btnSize: \'sm\'}">\n                  <option value="ch">\u4E2D\u6587</option>\n                  <option value="en">\u82F1\u6587</option>\n                </select>\n          </div>\n          <div style="display: flex;margin-top: 10px;">\n              <span style="width: 50px;margin-left: 20px;">\u7C7B\u578B</span>\n              <select id="pickerType" data-am-selected="{btnWidth: \'100%\', btnSize: \'sm\'}">\n                  <option value="allpicker" >\u65E5\u671F\u65F6\u95F4</option>\n                  <option value="datepicker">\u65E5\u671F</option>\n                  <option value="timepicker">\u65F6\u95F4</option>\n              </select>\n          </div>\n          <div style="display: flex;margin-top: 10px;">\n            <span style="width: 50px;margin-left: 20px;">\u683C\u5F0F</span>\n            <select id="format" data-am-selected="{btnWidth: \'100%\', btnSize: \'sm\'}">\n            </select>\n          </div>\n\n          <div class="am-form-group" id=\'textBox\'  style="display: flex;">\n            <span style="width: 70px;margin-left: 5px;margin-top: 14px;">\u81EA\u5B9A\u4E49</span>\n            <input type="text" id="text" class="am-form-field custom" value="" placeholder="\u81EA\u5B9A\u4E49"/>\n          </div>\n        </div>\n        <div style="display: flex;margin-top: 10px;" id="stepBox">\n          <span style="width: 50px;margin-left: 20px;">\u95F4\u9694</span>\n          <select id="stepSelect" data-am-selected="{btnWidth: \'100%\', btnSize: \'sm\'}">\n              <option value="60">\u6574\u70B9</option>\n              <option value="1" >\u5206\u949F</option>\n          </select>\n        </div>';
    return textHtml;
  },
  dateformatOption: function dateformatOption(type) {
    var optionHtml = '<option value="text" >自定义</option>';
    if (type === 'allpicker') {
      optionHtml += '\n        <option value="Y-m-d H:i" selected>Y-m-d H:i</option>\n        <option value="Y/m/d H:i" >Y/m/d H:i</option>\n        <option value="Y.m.d H:i" >Y.m.d H:i</option>\n        ';
    } else if (type === 'datepicker') {
      optionHtml += '\n        <option value="Y-m-d" selected >Y-m-d</option>\n        <option value="Y/m/d">Y/m/d</option>\n        ';
    } else if (type === 'timepicker') {
      optionHtml += '\n        <option value="H:i" selected>H:i</option>\n        <option value="H:i:s" >H:i:s</option>\n        ';
    }

    return optionHtml;
  },
  radio: function radio(id) {
    var radioHtml = '<div class="setElementTitle">\n          <span>\u9009\u9879</span>\n        </div>\n        <div class="selecd-box">\n        <ul id="selecd-ul">';
    $('#' + id).find('label').each(function (i, em) {
      var li = '<li>\n            <i class="am-icon-circle-o circle"></i>\n            <a>\n              <input type="text" value="' + $(em).find('input').val() + '">\n            </a>\n            <i class="am-icon-arrows arrows"></i>\n            <i class="am-icon-minus-circle minus"></i>\n          </li>';
      var $li = $(li);
      if ($(em).find('input').attr('checked')) {
        $li.find('.circle').removeClass('am-icon-circle-o');
        $li.find('.circle').addClass('am-icon-dot-circle-o');
      }
      radioHtml += $li[0].outerHTML;
    });
    radioHtml += '</ul>\n        <div class="add_btn_group">\n          <div class="add_item">\u6DFB\u52A0\u9009\u9879</div>\n        </div>\n      </div>';
    return radioHtml;
  },
  checkbox: function checkbox(id) {
    var checkHtml = '<div class="setElementTitle">\n          <span>\u9009\u9879</span>\n        </div>\n        <div class="selecd-box">\n        <ul id="selecd-ul">';
    $('#' + id).find('label').each(function (i, em) {
      var li = '<li>\n            <i class="am-icon-square-o square"></i>\n            <a>\n              <input type="text" value="' + $(em).find('input').val() + '">\n            </a>\n            <i class="am-icon-arrows arrows"></i>\n            <i class="am-icon-minus-circle minus"></i>\n          </li>';
      var $li = $(li);
      if ($(em).find('input').attr('checked')) {
        $li.find('.square').removeClass('am-icon-square-o');
        $li.find('.square').addClass('am-icon-check-square-o');
      }
      checkHtml += $li[0].outerHTML;
    });
    checkHtml += '</ul>\n        <div class="add_btn_group">\n          <div class="add_item">\u6DFB\u52A0\u9009\u9879</div>\n        </div>\n      </div>';
    return checkHtml;
  },
  select: function select(id) {
    var selectHtml = '<div class="setElementTitle">\n          <span>\u9009\u9879</span>\n        </div>\n        <div class="selecd-box">\n        <ul id="selecd-ul">';
    $('#' + id).find('option').each(function (i, em) {
      var li = '<li>\n            <i class="am-icon-circle-o circle"></i>\n            <a>\n              <input type="text" value="' + $(em).val() + '">\n            </a>\n            <i class="am-icon-arrows arrows"></i>\n            <i class="am-icon-minus-circle minus"></i>\n          </li>';
      var $li = $(li);
      if (em.selected) {
        $li.find('.circle').removeClass('am-icon-circle-o');
        $li.find('.circle').addClass('am-icon-dot-circle-o');
      }
      selectHtml += $li[0].outerHTML;
    });
    selectHtml += '</ul>\n        <div class="add_btn_group">\n          <div class="add_item">\u6DFB\u52A0\u9009\u9879</div>\n        </div>\n      </div>';
    return selectHtml;
  },
  selectTh: function selectTh(id) {
    var data = JSON.parse($('#' + id).find('th.active').attr('data-select'));
    var selectHtml = '<div class="setElementTitle">\n          <span>\u9009\u9879</span>\n        </div>\n        <div class="selecd-box">\n        <ul id="selecd-ul">';
    for (var i = 0; i < data.value.length; i++) {
      var li = '<li>\n            <i class="am-icon-circle-o circle"></i>\n            <a>\n              <input type="text" value="' + data.value[i].value + '">\n            </a>\n            <i class="am-icon-arrows arrows"></i>\n            <i class="am-icon-minus-circle minus"></i>\n          </li>';
      var $li = $(li);
      if (data.value[i].selected) {
        $li.find('.circle').removeClass('am-icon-circle-o');
        $li.find('.circle').addClass('am-icon-dot-circle-o');
      }
      selectHtml += $li[0].outerHTML;
    }
    selectHtml += '</ul>\n        <div class="add_btn_group">\n          <div class="add_item">\u6DFB\u52A0\u9009\u9879</div>\n        </div>\n      </div>';
    return selectHtml;
  },
  userOrg: function userOrg(id) {
    var condition = JSON.parse($('#' + id).attr('data-xdata'));
    var html = '<div class="setElementTitle">\n      <span>\u9ED8\u8BA4\u503C</span>\n    </div>\n    <div class="set-userOrg" id=\'userOrg\'>\u8BBE\u7F6E</div>\n    <div class="setElementTitle">\n      <span>\u9009\u62E9</span>\n    </div>\n    <div class="choice">\n    <div class="choice-btn choice-left ' + (condition.ifChoice == 'radio' ? 'choice-selected' : '') + '" onclick="' + choiceFn + ';choiceFn.call(this, \'' + id + '\', \'radio\')">\u5355\u9009</div>\n    <div class="choice-btn choice-right ' + (condition.ifChoice == 'checkbox' ? 'choice-selected' : '') + '" onclick="' + choiceFn + ';choiceFn.call(this,\'' + id + '\', \'checkbox\')">\u591A\u9009</div>\n    </div>';
    function choiceFn(id, type) {
      $(this).addClass('choice-selected');
      $(this).siblings().removeClass('choice-selected');
      var condition = JSON.parse($('#' + id).attr('data-xdata'));
      condition.ifChoice = type;
      $('#' + id).attr('data-xdata', JSON.stringify(condition));
      if (type == 'checkbox') {
        $('#' + id).find('.user-content').addClass('user-checkbox');
      } else {
        $('#' + id).find('.user-content').removeClass('user-checkbox');
      }
    }
    return html;
  },
  ifField: function ifField(id, condition) {
    var ifField = '<div class="setElementTitle">\n          <span>\u6821\u9A8C</span>\n        </div>\n      <div>\n        <label class="am-checkbox am-secondary am-success">\n          <input type="checkbox" data-am-ucheck id=\'ifWrite\' onchange=\'' + ifWrite + '; ifWrite.call(this, "' + id + '")\' class="am-ucheck-checkbox" ' + (condition.ifWrite ? 'checked' : '') + '> \n          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>\n          \u5FC5\u586B \n        </label>\n      </div>\n      <div class="cfg_split"></div>\n      <div class="setElementTitle">\n        <span>\u5B57\u6BB5\u6743\u9650</span>\n      </div>\n      <div>\n        <label class="am-checkbox am-secondary am-success">\n          <input type="checkbox" data-am-ucheck id=\'ifShow\' onchange=\'' + ifShow + '; ifShow.call(this, "' + id + '")\' class="am-ucheck-checkbox" ' + (condition.ifShow ? 'checked' : '') + '> \n          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>\n          \u53EF\u89C1 \n        </label>\n        <label class="am-checkbox am-secondary am-success">\n          <input type="checkbox" data-am-ucheck id=\'ifEditor\' onchange=\'' + ifEditor + '; ifEditor.call(this, "' + id + '")\' class="am-ucheck-checkbox" ' + (condition.ifEditor ? 'checked' : '') + '> \n          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>\n          \u53EF\u7F16\u8F91 \n        </label>\n      </div>';
    function ifWrite(id) {
      // condition = JSON.parse(condition)
      if (this.checked && !$('#' + id + ' h3 sup')[0]) {
        $('#' + id + ' .title').append('<sup class="am-text-danger">*</sup>');
      } else {
        $('#' + id + ' .title sup').remove();
      }
      var condition = JSON.parse($('#' + id).attr("data-xdata"));
      condition.ifWrite = this.checked;
      $('#' + id).attr("data-xdata", JSON.stringify(condition));
    }
    function ifShow(id) {
      var condition = JSON.parse($('#' + id).attr("data-xdata"));
      condition.ifShow = this.checked;
      $('#' + id).attr("data-xdata", JSON.stringify(condition));
    }
    function ifEditor(id) {
      var condition = JSON.parse($('#' + id).attr("data-xdata"));
      condition.ifEditor = this.checked;
      $('#' + id).attr("data-xdata", JSON.stringify(condition));
    }
    return ifField;
  },
  ifFieldTh: function ifFieldTh(id, type, condition) {

    var ifField = '<div class="setElementTitle">\n          <span>\u6821\u9A8C</span>\n        </div>\n      <div>\n        <label class="am-checkbox am-secondary am-success">\n          <input type="checkbox" data-am-ucheck id=\'ifWrite\' onchange=\'' + ifWrite + '; ifWrite.call(this, "' + id + '", "' + type + '", ' + JSON.stringify(condition) + ')\' class="am-ucheck-checkbox" ' + (condition.ifWrite ? 'checked' : '') + '> \n          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>\n          \u5FC5\u586B \n        </label>\n        \n      </div>\n      <div class="cfg_split"></div>\n      <div class="setElementTitle">\n        <span>\u5B57\u6BB5\u6743\u9650</span>\n      </div>\n      <div>\n        <label class="am-checkbox am-secondary am-success">\n          <input type="checkbox" data-am-ucheck id=\'ifShow\' onchange=\'' + ifShow + '; ifShow.call(this, "' + id + '", "' + type + '")\' class="am-ucheck-checkbox" ' + (condition.ifShow ? 'checked' : '') + '> \n          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>\n          \u53EF\u89C1 \n        </label>\n        <label class="am-checkbox am-secondary am-success">\n          <input type="checkbox" data-am-ucheck id=\'ifEditor\' onchange=\'' + ifEditor + '; ifEditor.call(this, "' + id + '", "' + type + '")\' class="am-ucheck-checkbox" ' + (condition.ifEditor ? 'checked' : '') + '> \n          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>\n          \u53EF\u7F16\u8F91 \n        </label>\n        <label class="am-checkbox am-secondary am-success">\n          <input type="checkbox" data-am-ucheck id=\'ifCollect\' onchange=\'' + ifCollect + '; ifCollect.call(this, "' + id + '", "' + type + '")\' class="am-ucheck-checkbox" ' + (condition.ifCollect ? 'checked' : '') + '> \n          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>\n          \u6C47\u603B \n        </label>\n      </div>';
    if (condition.ifWrite && !$('#' + id).find("th.active sup")[0]) {
      $('#' + id).find("th.active").append('<sup class="am-text-danger">*</sup>');
    } else {
      $('#' + id).find("th.active sup").remove();
    }
    function ifWrite(id, type) {
      // condition = JSON.parse(condition)
      var condition = JSON.parse($('#' + id).find("th.active").attr(type));
      condition.ifWrite = this.checked;
      if (this.checked && !$('#' + id).find("th.active sup")[0]) {
        $('#' + id).find("th.active").append('<sup class="am-text-danger">*</sup>');
      } else {
        $('#' + id).find("th.active sup").remove();
      }
      $('#' + id).find("th.active").attr(type, JSON.stringify(condition));
    }
    function ifShow(id, type) {
      var condition = JSON.parse($('#' + id).find("th.active").attr(type));
      condition.ifShow = this.checked;
      $('#' + id).find("th.active").attr(type, JSON.stringify(condition));
    }
    function ifEditor(id, type) {
      var condition = JSON.parse($('#' + id).find("th.active").attr(type));
      condition.ifEditor = this.checked;
      $('#' + id).find("th.active").attr(type, JSON.stringify(condition));
    }
    function ifCollect(id, type) {
      var condition = JSON.parse($('#' + id).find("th.active").attr(type));
      condition.ifCollect = this.checked;
      $('#' + id).find("th.active").attr(type, JSON.stringify(condition));
    }
    return ifField;
  }
};