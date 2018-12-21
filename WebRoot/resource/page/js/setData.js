var setData = {
  title (id,type,value) {
    let titleHtml = `<div class="setElementTitle">
        <span>标题</span>
        <span class="setNmae">${type}</span>
      </div>
      <input type="text" id="title" class="input_title" oninput="${fn};fn.call(this, '${id}')" value="${value}">`
      function fn (id) {
        if($(`#${id}`).attr('data-xhtml') == 'form' || $(`#${id}`).attr('data-xhtml') == 'table') {
          $(`#${id}`).find('#title span').text($(this).val())
        } else {
          $(`#${id}`).find('.title span').text($(this).val())
        }
      }
    return titleHtml
  },
  background () {
    let html =`<div class="setElementTitle">
      <span>标题背景色</span>
    </div>
    <select id="backgroundFrom" data-am-selected="{btnWidth: '100%', btnSize: 'sm'}">
      <option value="#f5f5f5" selected>灰色</option>
      <option value="#2196F3">蓝色</option>
      <option value="#00BCD4">青色</option>
      <option value="#4CAF50">绿色</option>
      <option value="#CDDC39">青柠</option>
      <option value="#FF9800">橙色</option>
      <option value="#F44336">红色</option>
    </select>`
    return html
  },
  panelSize () {
    let html = `<div class="setElementTitle">
    <span>面板尺寸</span>
  </div>
  <select id="panelSize" data-am-selected="{btnWidth: '100%', btnSize: 'sm'}">
    <option value="12px">12px</option>
    <option value="14px" selected>14px</option>
    <option value="15px">15px</option>
    <option value="17px">17px</option>
    <option value="20px">20px</option>
  </select>`
   return html
  },
  titleTh (id,value) {
    let titleHtml = `<div class="setElementTitle">
        <span>标题</span>
        <button type="button" class="am-btn am-btn-danger deleteTh am-radius">删除</button>
      </div>
      <input type="text" id="title" class="input_title" oninput="${fn};fn.call(this, '${id}')" value="${value}">`
      function fn (id) {
        $(`#${id}`).find('th.active').text($(this).val())
      }
    return titleHtml
  },
  setNameTh (id, value) {
    let setNmaeHtml = `<div class="setElementTitle">
        <span>字段名称</span>
      </div>
      <input type="text" id="name" class="input_title" oninput="${fn};fn.call(this, '${id}')" value="${value}">`
    function fn (id) {
      $(`#${id}`).find('th.active').attr('name', $(this).val())
    }
    return setNmaeHtml
  },
  typeTh () {
    let typeThHtml = `<div class="setElementTitle">
          <span>组件类型</span>
        </div>
        <div>
        <select id="typeTh-option" data-am-selected="{btnWidth: '100%', btnSize: 'sm'}">
            <option value="text" selected>输入框</option>
            <option value="select">下拉框</option>
            <option value="datetimepicker">日期</option>
        </select>
        </div>
        <div class="type-content"></div>
        `
    return typeThHtml
  },
  setNmae (id, value) {
    let setNmaeHtml = `<div class="setElementTitle">
        <span>字段名称</span>
      </div>
      <input type="text" id="name" class="input_title" oninput="${fn};fn.call(this, '${id}')" value="${value}">`
    function fn (id) {
      $(`#${id}`).find('.nameValue').attr('name', $(this).val())
    }
    return setNmaeHtml
  },
  tableAddTh (id) {
    let html =`<div class="setElementTitle">
    <span>添加列</span>
  </div>
  <button type="button" class="am-btn am-btn-secondary am-radius" style="width:100%;" onclick="${fn};fn.call(this, '${id}')">添加</button>`
  function fn(id) {
    let thHtml = `<th class='th-item'>请输入标题</th>`
    let $thHtml = $(thHtml)
    $thHtml.attr({
      'data-text': JSON.stringify(design.tableType.text), 
      'data-select': JSON.stringify(design.tableType.select), 
      'data-datetimepicker': JSON.stringify(design.tableType.datetimepicker), 
      'name': 'th',
      'data-type': ''
    })
    $(`#${id}`).find('table tr').append($thHtml)
  }
  return html
  },
  setFormNmae (id, value) {
    let setNmaeHtml = `<div class="setElementTitle">
        <span>字段名称</span>
      </div>
      <input type="text" id="name" class="input_title" oninput="${fn};fn.call(this, '${id}')" value="${value}">`
    function fn (id) {
      $(`#${id}`).children('.nameValue').attr('name', $(this).val())
    }
    return setNmaeHtml
  },
  underline () {
    return `<div class="cfg_split"></div>`
  },
  labelGrid (id) {
    let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
    let labelGrid = `
    <div>
      <div class="cfg_split"></div>
      <div class="setElementTitle">
        <span>标题长度</span>
      </div>
      <input type="number" id="grid-label" max="12" min="0" class="input_title" oninput="${labelGridfn};labelGridfn.call(this, '${id}')" value="${condition.labelGrid}">
      <div class="am-alert am-alert-danger" style="display: none;">最大值为12，最小为0</div>
    </div>`
    function labelGridfn (id) {
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      let num = parseInt($(this).val())
      if(num > 12 || num < 0) {
        $(this).val(3)
        $('.am-alert').show()
        return
      } else {
        $('.am-alert').hide()
      }
      let reg = /am-u-sm-\d*/ig
      let className = reg.exec($(`#${id}`).find('.title').attr('class'))[0]
      $(`#${id}`).find('.title').removeClass(className)
      if (condition.ComponentType != 'OneRowAndThreeColumns') {
        let className1 = $(`#${id}`).find('.gridContent').attr('class').match(reg)[0]
        $(`#${id}`).find('.gridContent').removeClass(className1)
        $(`#${id}`).find('.gridContent').addClass(`am-u-sm-${12-$(this).val()}`)
        condition.inputGrid = 12 - $(this).val()
      } else {
        let className1 = $(`#${id}`).find('.subhead').attr('class').match(reg)[0]
        $(`#${id}`).find('.subhead').removeClass(className1)
        parseInt(condition.inputGrid) + parseInt($(this).val()) > 12 ? 
        $(`#${id}`).find('.subhead').addClass(`am-u-sm-0`):
        $(`#${id}`).find('.subhead').addClass(`am-u-sm-${12-$(this).val()-condition.inputGrid}`);
        parseInt(condition.inputGrid) + parseInt($(this).val()) >= 12? $(this).val(12-condition.inputGrid): '';
      }
      $(`#${id}`).find('.title').addClass(`am-u-sm-${$(this).val()}`)
      condition.labelGrid = $(this).val()
      $(`#${id}`).attr('data-xdata', JSON.stringify(condition))
    }
    return labelGrid
  },
  inputGrid (id){
    let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
    let inputGrid = `
    <div>
      <div class="cfg_split"></div>
      <div class="setElementTitle">
        <span>输入框长度</span>
      </div>
      <input type="number" id="grid-inputGrid" max="12" min="1"  class="input_title" oninput="${inputGridfn};inputGridfn.call(this, '${id}')" class="input_title" value="${condition.inputGrid}">
      <div class="am-alert am-alert-danger" style="display: none;">最大值为12，最小为1</div>
    </div>`
     function inputGridfn (id) {
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      let num = parseInt($(this).val())
      if(num > 12 || num < 1) {
        $(this).val(3)
        $('.am-alert').show()
        return
      } else {
        $('.am-alert').hide()
      }
      let reg = /am-u-sm-\d*/ig
      let className = $(`#${id}`).find('.gridContent').attr('class').match(reg)[0]
      $(`#${id}`).find('.gridContent').removeClass(className)
      if (condition.ComponentType == 'TwoRowAndTwoColumnsSub') {
        let className1 = $(`#${id}`).find('.subhead').attr('class').match(reg)[0]
        $(`#${id}`).find('.subhead').removeClass(className1)
        $(`#${id}`).find('.subhead').addClass(`am-u-sm-${12-$(this).val()}`)
        condition.labelGrid = 12 - $(this).val()
      }
      if (condition.ComponentType == 'OneRowAndThreeColumns'){
        let className1 = $(`#${id}`).find('.subhead').attr('class').match(reg)[0]
        $(`#${id}`).find('.subhead').removeClass(className1)
        parseInt(condition.labelGrid) + parseInt($(this).val()) > 12 ? 
        $(`#${id}`).find('.subhead').addClass(`am-u-sm-0`):
        $(`#${id}`).find('.subhead').addClass(`am-u-sm-${12-$(this).val()-condition.labelGrid}`);
        parseInt(condition.labelGrid) + parseInt($(this).val()) >= 12? $(this).val(12-condition.labelGrid): '';
      }
      $(`#${id}`).find('.gridContent').addClass(`am-u-sm-${$(this).val()}`)
      condition.inputGrid = $(this).val()
      $(`#${id}`).attr('data-xdata', JSON.stringify(condition))
     }
    return inputGrid
  },
  grid (id) {
    var numinpt = $(`#${id}`).attr('class').replace(/[^0-9]/ig,"")
    if (!numinpt) {
      numinpt = 12
      let reg = /am-u-sm-\d*/ig
      let className = reg.exec($(`#${id}`).attr('class'))[0]
      $(`#${id}`).removeClass(className)
      $(`#${id}`).addClass(`am-u-sm-${numinpt}`)
    }
    let gridHtml = `<div class="setElementTitle">
      <span>网格队列</span>
    </div>
    <input type="number" id="grid-ipt" max="12" min="1" class="input_title" oninput="${fn};fn.call(this, '${id}')" value="${numinpt}">
    <div class="am-alert am-alert-danger" style="display: none;">最大值为12，最小为1</div>`
    
    function fn(id) {
      let num = parseInt($(this).val())
      console.log(num)
      if(num > 12 || num < 1) {
        $(this).val(12)
        $('.am-alert').show()
      } else {
        $('.am-alert').hide()
      }
      let reg = /am-u-sm-\d*/ig
      let className = reg.exec($(`#${id}`).attr('class'))[0]
      $(`#${id}`).removeClass(className)
      $(`#${id}`).addClass(`am-u-sm-${$(this).val()}`)
    }
    return gridHtml
  },
  subhead (id, value) {
    let subhead = `<div id="Help">
        <div class="cfg_split"></div>
        <div class="setElementTitle">
          <span>描述信息</span>
        </div>
        <textarea  rows="2" oninput="${fn};fn.call(this, '${id}')">${value}</textarea>
      </div>`
       function fn(id) {
        $(`#${id}`).find('.subhead').text($(this).val())
      }
    return subhead
  },
  inputLength(id){
    let condition = {}
    if($(`#${id}`).attr('data-xhtml') == 'table') {
      condition = JSON.parse($('#'+id).find('th.active').attr('data-text'))
    }else {
      condition= JSON.parse($(`#${id}`).attr('data-xdata'))
    }
    
    let html = `<div class="setElementTitle">
      <span>字符长度</span>
    </div>
    <div>
      <div class="am-form-group custom-group langth-group">
        <span style="width: 100px;">最大长度:</span><input id='max' step="1" min='0' oninput="${maxValue};maxValue.call(this, '${id}')" type="number" value="${condition.maxLangth}"  class="am-form-field custom">
      </div>
      <div class="am-form-group custom-group langth-group">
        <span style="width: 100px;">最小长度:</span><input id='min' step="1" min='0' oninput="${minValue};minValue.call(this, '${id}')" type="number" value="${condition.minLangth}" class="am-form-field custom">
      </div>
    </div>`
    function maxValue (id) {
      let condition = {}
      if($(`#${id}`).attr('data-xhtml') == 'table') {
        condition = JSON.parse($('#'+id).find('th.active').attr('data-text'))
      }else {
        condition= JSON.parse($(`#${id}`).attr('data-xdata'))
      }
      if (condition.minLangth > parseInt($(this).val()) ){
        if (!$(this).parent().parent().find('.am-alert')[0]) {
          $(this).parent().parent().append('<div class=\'am-alert am-alert-danger\' style=\' display: block;\'>最小长度不能大于最大长度</div>')
        }
      } else {
        condition.maxLangth = parseInt($(this).val())
        $(`#${id}`).attr('data-xhtml') == 'table'? $('#'+id).find('th.active').attr('data-text', JSON.stringify(condition)):$(`#${id}`).attr('data-xdata', JSON.stringify(condition))
        $(this).parent().parent().find('.am-alert').remove()
        $('#default').attr('maxlength', $(this).val())
      }
    }
    function minValue (id) {
      let condition = {}
      if($(`#${id}`).attr('data-xhtml') == 'table') {
        condition = JSON.parse($('#'+id).find('th.active').attr('data-text'))
      }else {
        condition= JSON.parse($(`#${id}`).attr('data-xdata'))
      }
      if (condition.maxLangth < parseInt($(this).val()) ){
        if (!$(this).parent().parent().find('.am-alert')[0]) {
          $(this).parent().parent().append(`<div class='am-alert am-alert-danger' style='display: block;'>最小长度不能大于最大长度</div>`)
        }
      } else {
        condition.minLangth = parseInt($(this).val())
        $(`#${id}`).attr('data-xhtml') == 'table'? $('#'+id).find('th.active').attr('data-text', JSON.stringify(condition)):$(`#${id}`).attr('data-xdata', JSON.stringify(condition))
        $(this).parent().parent().find('.am-alert').remove()
      }
    }
    return html
  },
  iFinline (labelArrange) {
    let html= `
    <div class="setElementTitle">
      <span>选项排列</span>
    </div>
    <div class="choice">
    <div class="choice-btn choice-left ${labelArrange == 'longitudinal' ?'choice-selected':''}" id="longitudinal">纵排</div>
    <div class="choice-btn choice-right ${labelArrange == 'transverse' ?'choice-selected':''}" id="transverse">横排</div>
    </div>
    `
    return html
  },
  ComponentType () {
    let html = `<div class="setElementTitle">
      <span>组件类型</span>
    </div>
    <div>
    <select id="ComponentType" data-am-selected="{btnWidth: '100%', btnSize: 'sm'}">
        <option value="ThreeRowsAndOneColumn" selected>三行一列</option>
        <option value="OneRowAndTwoColumns" >一行两列</option></option>
        <option value="TwoRowAndTwoColumns">两行两列（帮助信息在下）</option>
        <option value="TwoRowAndTwoColumnsSub">两行两列（帮助信息和输入框在下）</option>
        <option value="OneRowAndThreeColumns">一行三列（有帮助信息）</option>
        <option value="TwoRowsAndOneColumn" >两行一列</option>
    </select>`
    return html
  },
  textInput (id, type) {
    let inputHtml = `<div class="setElementTitle">
        <span>默认值</span>
      </div>
      <div>
        <div class="am-form-group custom-group">`
      if ($(`#${id}`).attr('data-xhtml') == 'textarea') {
        let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
        inputHtml += `<textarea  id="default" rows="2" maxlength="${condition.maxLangth}" onchange="${iptvalue};iptvalue.call(this, '${id}')" oninput="${iptvalue};iptvalue.call(this, '${id}')"  placeholder="" class="am-form-field">${$('#'+id).find('.input').val()}</textarea>`
      }else if($(`#${id}`).attr('data-xhtml') == 'datetimepicker'){
        inputHtml += `<input type="text" id="default" class="am-form-field custom datetimepicker" onchange="${iptvalue};iptvalue.call(this, '${id}')" value="${$('#'+id).find('.input').val()}"/>`
        +`<i class="am-icon-question icon-bz" onclick='${defaultFn};defaultFn("${id}", "${type}")'></i>`
      } else if ($(`#${id}`).attr('data-xhtml') == 'table') {
        if (type == 'data-text') {
          condition = JSON.parse($('#'+id).find('th.active').attr('data-text'))
          inputHtml += `<input type="text" id="default" maxlength="${condition.maxLangth}" class="am-form-field custom" onchange="${iptvalue};iptvalue.call(this, '${id}')" oninput="${iptvalue};iptvalue.call(this, '${id}')" value="${(JSON.parse($('#'+id).find('th.active').attr(type))).value}"/>`
          +`<i class="am-icon-question icon-bz" onclick='${defaultFn};defaultFn("${id}")'></i>`
        } else {
          inputHtml += `<input type="text" id="default" onchange="${iptvalue};iptvalue.call(this, '${id}')" class="am-form-field custom" oninput="${iptvalue};iptvalue.call(this, '${id}')" value="${(JSON.parse($('#'+id).find('th.active').attr(type))).value}"/>`
          +`<i class="am-icon-question icon-bz" onclick='${defaultFn};defaultFn("${id}", "${type}")'></i>`
        }
      }else{
        let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
        inputHtml += `<input type="text" id="default" maxlength="${condition.maxLangth|| ''}" class="am-form-field custom" onchange="${iptvalue};iptvalue.call(this, '${id}')"  oninput="${iptvalue};iptvalue.call(this, '${id}')" value="${$('#'+id).find('.input').val()}"/>`
        +`<i class="am-icon-question icon-bz" onclick='${defaultFn};defaultFn("${id}")'></i>`
      }
    inputHtml += '</div>'
    inputHtml += `</div>
      <div class="cfg_split"></div>
      <div class="setElementTitle">
        <span>输入提示</span>
      </div>
      <div class="am-form-group">`
      if($(`#${id}`).attr('data-xhtml') == 'table') {
        inputHtml += `<input type="text" id="prompt" oninput="${iptPlaceholder};iptPlaceholder.call(this, '${id}')" value="${(JSON.parse($('#'+id).find('th.active').attr(type))).placeholder}" class="am-form-field custom"/>
      </div>`
      } else {
        inputHtml += `<input type="text" id="prompt" oninput="${iptPlaceholder};iptPlaceholder.call(this, '${id}')" value="${$('#'+id).find('.input').attr('placeholder')}" class="am-form-field custom"/>
      </div>`
      }
    
    function iptvalue (id) {
      if($(`#${id}`).attr('data-xhtml') == 'table') {
        if ($('#'+id).find('th.active').attr('data-type') == 'text') {
          let data = JSON.parse($('#'+id).find('th.active').attr('data-text'))
          if($(this).val().length < data.minLangth && $(this).val().length != 0) {
            $(this).parent().parent().find('.am-alert')[0]?$(this).parent().parent().find('.am-alert').remove(): $(this).parent().parent().append('<div class=\'am-alert am-alert-danger\' style=\' display: block;\'>最少输入'+data.minLangth+'个字符</div>')
            $(this).parent().parent().find('.am-alert')[0]? '' : $(this).parent().parent().append('<div class=\'am-alert am-alert-danger\' style=\' display: block;\'>最少输入'+data.minLangth+'个字符</div>')
          } else {
            $(this).parent().parent().find('.am-alert').remove()
            data.value = $(this).val()
            $('#'+id).find('th.active').attr('data-text', JSON.stringify(data))
          }
        } else {
          let data = JSON.parse($('#'+id).find('th.active').attr('data-datetimepicker'))
          data.value = $(this).val()
          $('#'+id).find('th.active').attr('data-datetimepicker', JSON.stringify(data))
        }
      } else {
        let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
        if ($(`#${id}`).attr('data-xhtml') == 'text' || $(`#${id}`).attr('data-xhtml') == 'textarea'){
          if($(this).val().length < condition.minLangth && $(this).val().length != 0) {
            $(this).parent().parent().find('.am-alert')[0]?$(this).parent().parent().find('.am-alert').remove(): $(this).parent().parent().append('<div class=\'am-alert am-alert-danger\' style=\' display: block;\'>最少输入'+condition.minLangth+'个字符</div>')
            $(this).parent().parent().find('.am-alert')[0]? '' : $(this).parent().parent().append('<div class=\'am-alert am-alert-danger\' style=\' display: block;\'>最少输入'+condition.minLangth+'个字符</div>')
          } else {
            $(this).parent().parent().find('.am-alert').remove()
            $(`#${id}`).find('.input').val($(this).val())
          }
        } else {
          $(`#${id}`).find('.input').val($(this).val())
        }
      }
    }
    function iptPlaceholder (id) {
      if($(`#${id}`).attr('data-xhtml') == 'table') {
        if ($('#'+id).find('th.active').attr('data-type') == 'text') {
          let data = JSON.parse($('#'+id).find('th.active').attr('data-text'))
          data.placeholder = $(this).val()
          $('#'+id).find('th.active').attr('data-text', JSON.stringify(data))
        } else {
          let data = JSON.parse($('#'+id).find('th.active').attr('data-datetimepicker'))
          data.placeholder = $(this).val()
          $('#'+id).find('th.active').attr('data-datetimepicker', JSON.stringify(data))
        }
      } else {
        $('#'+id).find('.input').attr('placeholder', $(this).val())
      }
    }
    function defaultFn(id, type) {
      let html = `<div class="am-modal am-modal-no-btn" tabindex="-1" id="">
        <div class="am-modal-dialog">
          <div class="am-modal-hd">默认函数
            <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
          </div>
          <div class="am-modal-bd">
          <ul class="am-list am-list-static">`
      if ($(`#${id}`).attr("data-xhtml") === "text" || $("#"+id).find("th.active").attr("data-type") == "text"){
        html += `<li><span class="default-value">`+"#{user.name}"+`</span><span class="am-badge am-badge-success">输入</span></li></li>
          <li><span class="default-value">`+"#{org.orgName}"+`</span><span class="am-badge am-badge-success">输入</span></li></li>`
      }
      if ($(`#${id}`).attr("data-xhtml") === "datetimepicker" || $("#"+id).find("th.active").attr("data-type") == "datetimepicker") {
        html += `<li><span class="default-value">`+"#{getToday()} </span><input type="+"text"+" class="+"datetimepicker-time"+" "+"/>"
        +`<span class="am-badge am-badge-success">输入</span></li>`
      }
      html += `</ul> 
          </div>
        </div>
      </div>`
      let $html = $(html)
      if ($(`#${id}`).attr("data-xhtml") === "datetimepicker" || $("#"+id).find("th.active").attr("data-type") == "datetimepicker") {
        let dateDta=(JSON.parse($("#"+id).attr(type)|| $("#"+id).find("th.active").attr(type)))
        let step=dateDta.step|| dateDta.option.step
        $.datetimepicker.setLocale("ch");
        $html.find(".datetimepicker-time").datetimepicker({lang: "ch", step: step, datepicker:false,timepicker:true, format:"H:i"})
      }
      $html.modal()
      $html.attr("id", "your-defaultFn_" + app.getNumber())
      $html.find(".am-badge-success").click(function() {
        let val = ""
        if ($(this).parent().find("input")[0]) {
          val = "#{getToday()}" + " "+$(this).parent().find("input").eq(0).val()
        } else {
          val = $(this).parent().find(".default-value").text()
        }
        $("#default").val(val)
        // $(`#${id}`).find("input").val(val)
        $("#default").change()
        $(this).parent().parent().parent().parent().parent().modal("close")
      })
      $("body").append($html)
      // $("#your-defaultFn").modal()
    }
    return inputHtml
  },
  text (id) {
    let textHtml = `<div class="setElementTitle">
          <span>格式</span>
        </div>
        <div>
        <select id="text-option" data-am-selected="{btnWidth: '100%', btnSize: 'sm'}">
            <option value="text" selected>自定义</option>
            <option value="phone" >手机号码</option>
            <option value="telephone">电话号码</option>
            <option value="postalcode">邮政编码</option>
            <option value="IDnumber" >身份号码</option>
            <option value="email" >邮箱</option>
            <option value="number" >数字</option>
            <option value="positiveNumber" >正数</option>
            <option value="integer" >正整数</option>
        </select>
        </div>
        <div class="am-form-group" id='textBox'>
          <input type="text" id="text" class="am-form-field custom" value="${(JSON.parse($('#'+id).attr('data-option'))).reg}" placeholder="正则验证"/>
        </div>
        <div class="am-form-group" id='errorBox'>
          <input type="text" id="error" class="am-form-field custom" value="${(JSON.parse($('#'+id).attr('data-option'))).err}" placeholder="验证错误提示"/>
        </div>`
    return textHtml
  },
  textTh (reg, err) {
    let textHtml = `<div class="setElementTitle">
          <span>格式</span>
        </div>
        <div>
        <select id="text-option" data-am-selected="{btnWidth: '100%', btnSize: 'sm'}">
            <option value="text" selected>自定义</option>
            <option value="phone" >手机号码</option>
            <option value="telephone">电话号码</option>
            <option value="postalcode">邮政编码</option>
            <option value="IDnumber" >身份号码</option>
            <option value="email" >邮箱</option>
            <option value="number" >数字</option>
            <option value="positiveNumber" >正数</option>
            <option value="integer" >正整数</option>
        </select>
        </div>
        <div class="am-form-group" id='textBox'>
          <input type="text" id="text" class="am-form-field custom" value="${reg}" placeholder="正则验证"/>
        </div>
        <div class="am-form-group" id='errorBox'>
          <input type="text" id="error" class="am-form-field custom" value="${err}" placeholder="验证错误提示"/>
        </div>`
    return textHtml
  },
  datatimeFormat (id) {
    let textHtml = `<div class="setElementTitle">
          <span>格式</span>
        </div>
        <div>
          <div style="display: flex;">
                <span style="width: 50px;margin-left: 20px;">语言</span>
                <select id="lang" data-am-selected="{btnWidth: '100%' , btnSize: 'sm'}">
                  <option value="ch">中文</option>
                  <option value="en">英文</option>
                </select>
          </div>
          <div style="display: flex;margin-top: 10px;">
              <span style="width: 50px;margin-left: 20px;">类型</span>
              <select id="pickerType" data-am-selected="{btnWidth: '100%', btnSize: 'sm'}">
                  <option value="allpicker" >日期时间</option>
                  <option value="datepicker">日期</option>
                  <option value="timepicker">时间</option>
              </select>
          </div>
          <div style="display: flex;margin-top: 10px;">
            <span style="width: 50px;margin-left: 20px;">格式</span>
            <select id="format" data-am-selected="{btnWidth: '100%', btnSize: 'sm'}">
            </select>
          </div>

          <div class="am-form-group" id='textBox'  style="display: flex;">
            <span style="width: 70px;margin-left: 5px;margin-top: 14px;">自定义</span>
            <input type="text" id="text" class="am-form-field custom" value="" placeholder="自定义"/>
          </div>
        </div>
        <div style="display: flex;margin-top: 10px;" id="stepBox">
          <span style="width: 50px;margin-left: 20px;">间隔</span>
          <select id="stepSelect" data-am-selected="{btnWidth: '100%', btnSize: 'sm'}">
              <option value="60">整点</option>
              <option value="1" >分钟</option>
          </select>
        </div>`
    return textHtml
  },
  dateformatOption(type){
      let optionHtml='<option value="text" >自定义</option>'
      if(type === 'allpicker'){
        optionHtml +=`
        <option value="Y-m-d H:i" selected>Y-m-d H:i</option>
        <option value="Y/m/d H:i" >Y/m/d H:i</option>
        <option value="Y.m.d H:i" >Y.m.d H:i</option>
        `
      }else if(type === 'datepicker'){
        optionHtml +=`
        <option value="Y-m-d" selected >Y-m-d</option>
        <option value="Y/m/d">Y/m/d</option>
        `
      }else if(type === 'timepicker'){
        optionHtml +=`
        <option value="H:i" selected>H:i</option>
        <option value="H:i:s" >H:i:s</option>
        `
      }
      
      return optionHtml
  },
  radio (id) {
    let radioHtml =`<div class="setElementTitle">
          <span>选项</span>
        </div>
        <div class="selecd-box">
        <ul id="selecd-ul">`
        $(`#${id}`).find('label').each(function (i , em) {
          let li= `<li>
            <i class="am-icon-circle-o circle"></i>
            <a>
              <input type="text" value="${$(em).find('input').val()}">
            </a>
            <i class="am-icon-arrows arrows"></i>
            <i class="am-icon-minus-circle minus"></i>
          </li>`
          let $li = $(li)
          if ($(em).find('input').attr('checked')) {
            $li.find('.circle').removeClass('am-icon-circle-o')
            $li.find('.circle').addClass('am-icon-dot-circle-o')
          }
          radioHtml += $li[0].outerHTML
      })    
      radioHtml +=`</ul>
        <div class="add_btn_group">
          <div class="add_item">添加选项</div>
        </div>
      </div>`
      return radioHtml
  },
  checkbox (id) {
    let checkHtml =`<div class="setElementTitle">
          <span>选项</span>
        </div>
        <div class="selecd-box">
        <ul id="selecd-ul">`
        $(`#${id}`).find('label').each(function (i , em) {
          let li= `<li>
            <i class="am-icon-square-o square"></i>
            <a>
              <input type="text" value="${$(em).find('input').val()}">
            </a>
            <i class="am-icon-arrows arrows"></i>
            <i class="am-icon-minus-circle minus"></i>
          </li>`
          let $li = $(li)
          if ($(em).find('input').attr('checked')) {
            $li.find('.square').removeClass('am-icon-square-o')
            $li.find('.square').addClass('am-icon-check-square-o')
          }
          checkHtml += $li[0].outerHTML
      })    
      checkHtml +=`</ul>
        <div class="add_btn_group">
          <div class="add_item">添加选项</div>
        </div>
      </div>`
      return checkHtml
  },
  select (id) {
    let selectHtml =`<div class="setElementTitle">
          <span>选项</span>
        </div>
        <div class="selecd-box">
        <ul id="selecd-ul">`
        $(`#${id}`).find('option').each(function (i , em) {
          let li= `<li>
            <i class="am-icon-circle-o circle"></i>
            <a>
              <input type="text" value="${$(em).val()}">
            </a>
            <i class="am-icon-arrows arrows"></i>
            <i class="am-icon-minus-circle minus"></i>
          </li>`
          let $li = $(li)
          if (em.selected) {
            $li.find('.circle').removeClass('am-icon-circle-o')
            $li.find('.circle').addClass('am-icon-dot-circle-o')
          }
          selectHtml += $li[0].outerHTML
      })    
      selectHtml +=`</ul>
        <div class="add_btn_group">
          <div class="add_item">添加选项</div>
        </div>
      </div>`
      return selectHtml
  },
  selectTh (id) {
    let data = JSON.parse($('#'+id).find('th.active').attr('data-select'))
    let selectHtml =`<div class="setElementTitle">
          <span>选项</span>
        </div>
        <div class="selecd-box">
        <ul id="selecd-ul">`
        for(let i = 0; i< data.value.length; i++) {
          let li= `<li>
            <i class="am-icon-circle-o circle"></i>
            <a>
              <input type="text" value="${data.value[i].value}">
            </a>
            <i class="am-icon-arrows arrows"></i>
            <i class="am-icon-minus-circle minus"></i>
          </li>`
          let $li = $(li)
          if (data.value[i].selected) {
            $li.find('.circle').removeClass('am-icon-circle-o')
            $li.find('.circle').addClass('am-icon-dot-circle-o')
          }
          selectHtml += $li[0].outerHTML
      }   
      selectHtml +=`</ul>
        <div class="add_btn_group">
          <div class="add_item">添加选项</div>
        </div>
      </div>`
      return selectHtml
  },
  userOrg (id) {
    let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
    let html = `<div class="setElementTitle">
      <span>默认值</span>
    </div>
    <div class="set-userOrg" id='userOrg'>设置</div>
    <div class="setElementTitle">
      <span>选择</span>
    </div>
    <div class="choice">
    <div class="choice-btn choice-left ${condition.ifChoice == 'radio'? 'choice-selected': ''}" onclick="${choiceFn};choiceFn.call(this, '${id}', 'radio')">单选</div>
    <div class="choice-btn choice-right ${condition.ifChoice == 'checkbox'? 'choice-selected': ''}" onclick="${choiceFn};choiceFn.call(this,'${id}', 'checkbox')">多选</div>
    </div>`
    function choiceFn(id, type) {
      $(this).addClass('choice-selected')
      $(this).siblings().removeClass('choice-selected')
      let condition = JSON.parse($(`#${id}`).attr('data-xdata'))
      condition.ifChoice = type
      $(`#${id}`).attr('data-xdata', JSON.stringify(condition))
      if(type == 'checkbox') {
        $(`#${id}`).find('.user-content').addClass('user-checkbox')
      } else {
        $(`#${id}`).find('.user-content').removeClass('user-checkbox')
      }
    }
    return html
  },
  ifField (id, condition) {
    let ifField = `<div class="setElementTitle">
          <span>校验</span>
        </div>
      <div>
        <label class="am-checkbox am-secondary am-success">
          <input type="checkbox" data-am-ucheck id='ifWrite' onchange='${ifWrite}; ifWrite.call(this, "${id}")' class="am-ucheck-checkbox" ${condition.ifWrite? 'checked' : ''}> 
          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
          必填 
        </label>
      </div>
      <div class="cfg_split"></div>
      <div class="setElementTitle">
        <span>字段权限</span>
      </div>
      <div>
        <label class="am-checkbox am-secondary am-success">
          <input type="checkbox" data-am-ucheck id='ifShow' onchange='${ifShow}; ifShow.call(this, "${id}")' class="am-ucheck-checkbox" ${condition.ifShow? 'checked' : ''}> 
          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
          可见 
        </label>
        <label class="am-checkbox am-secondary am-success">
          <input type="checkbox" data-am-ucheck id='ifEditor' onchange='${ifEditor}; ifEditor.call(this, "${id}")' class="am-ucheck-checkbox" ${condition.ifEditor? 'checked' : ''}> 
          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
          可编辑 
        </label>
      </div>`
    function ifWrite(id) {
      // condition = JSON.parse(condition)
      if (this.checked && !$(`#${id} h3 sup`)[0]) {
        $(`#${id} .title`).append(`<sup class="am-text-danger">*</sup>`)
      } else {
        $(`#${id} .title sup`).remove()
      }
      let condition = JSON.parse($(`#${id}`).attr("data-xdata"))
      condition.ifWrite = this.checked
      $(`#${id}`).attr("data-xdata", JSON.stringify(condition))
    }
    function ifShow(id) {
      let condition = JSON.parse($(`#${id}`).attr("data-xdata"))
      condition.ifShow = this.checked
      $(`#${id}`).attr("data-xdata", JSON.stringify(condition))
    }
    function ifEditor(id) {
      let condition = JSON.parse($(`#${id}`).attr("data-xdata"))
      condition.ifEditor = this.checked
      $(`#${id}`).attr("data-xdata", JSON.stringify(condition))
    }
    return ifField
  },
  ifFieldTh (id, type, condition) {
    
    let ifField = `<div class="setElementTitle">
          <span>校验</span>
        </div>
      <div>
        <label class="am-checkbox am-secondary am-success">
          <input type="checkbox" data-am-ucheck id='ifWrite' onchange='${ifWrite}; ifWrite.call(this, "${id}", "${type}", ${JSON.stringify(condition)})' class="am-ucheck-checkbox" ${condition.ifWrite? 'checked' : ''}> 
          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
          必填 
        </label>
        
      </div>
      <div class="cfg_split"></div>
      <div class="setElementTitle">
        <span>字段权限</span>
      </div>
      <div>
        <label class="am-checkbox am-secondary am-success">
          <input type="checkbox" data-am-ucheck id='ifShow' onchange='${ifShow}; ifShow.call(this, "${id}", "${type}")' class="am-ucheck-checkbox" ${condition.ifShow? 'checked' : ''}> 
          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
          可见 
        </label>
        <label class="am-checkbox am-secondary am-success">
          <input type="checkbox" data-am-ucheck id='ifEditor' onchange='${ifEditor}; ifEditor.call(this, "${id}", "${type}")' class="am-ucheck-checkbox" ${condition.ifEditor? 'checked' : ''}> 
          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
          可编辑 
        </label>
        <label class="am-checkbox am-secondary am-success">
          <input type="checkbox" data-am-ucheck id='ifCollect' onchange='${ifCollect}; ifCollect.call(this, "${id}", "${type}")' class="am-ucheck-checkbox" ${condition.ifCollect? 'checked' : ''}> 
          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
          汇总 
        </label>
      </div>`
    if (condition.ifWrite && !$(`#${id}`).find("th.active sup")[0]) {
      $(`#${id}`).find("th.active").append(`<sup class="am-text-danger">*</sup>`)
    } else {
      $(`#${id}`).find("th.active sup").remove()
    }
    function ifWrite(id, type) {
      // condition = JSON.parse(condition)
      let condition = JSON.parse($(`#${id}`).find("th.active").attr(type))
      condition.ifWrite = this.checked
      if (this.checked && !$(`#${id}`).find("th.active sup")[0]) {
        $(`#${id}`).find("th.active").append(`<sup class="am-text-danger">*</sup>`)
      } else {
        $(`#${id}`).find("th.active sup").remove()
      }
      $(`#${id}`).find("th.active").attr(type, JSON.stringify(condition))
    }
    function ifShow(id, type) {
      let condition = JSON.parse($(`#${id}`).find("th.active").attr(type))
      condition.ifShow = this.checked
      $(`#${id}`).find("th.active").attr(type, JSON.stringify(condition))
    }
    function ifEditor(id, type) {
      let condition = JSON.parse($(`#${id}`).find("th.active").attr(type))
      condition.ifEditor = this.checked
      $(`#${id}`).find("th.active").attr(type, JSON.stringify(condition))
    }
    function ifCollect(id, type) {
      let condition = JSON.parse($(`#${id}`).find("th.active").attr(type))
      condition.ifCollect = this.checked
      $(`#${id}`).find("th.active").attr(type, JSON.stringify(condition))
    }
    return ifField
  }
}