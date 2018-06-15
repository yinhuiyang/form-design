var setData = {
  title (id,type,value) {
    let titleHtml = `<div class="setElementTitle">
        <span>标题</span>
        <span class="setNmae">${type}</span>
      </div>
      <input type="text" id="title" class="input_title" oninput="${fn};fn.call(this, '${id}')" value="${value}">`
      function fn (id) {
        if($(`#${id}`).attr('data-xhtml') == 'panel') {
          $(`#${id}`).find('#title span').text($(this).val())
        } else {
          $(`#${id}`).find('.title span').text($(this).val())
        }
      }
    return titleHtml
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
  underline () {
    return `<div class="cfg_split"></div>`
  },
  subhead (id, value) {
    let subhead = `<div class="setElementTitle">
        <span>描述信息</span>
      </div>
      <textarea class="input_subhead" oninput="${fn};fn.call(this, '${id}')">${value}</textarea>`
       function fn(id) {
        $(`#${id}`).find('.subhead').text($(this).val())
      }
    return subhead
  },
  textInput (id) {
    let inputHtml = `<div class="setElementTitle">
        <span>默认值</span>
      </div>
      <div class="am-form-group">`
      if ($(`#${id}`).attr('data-xhtml') == 'text') {
        inputHtml += `<input type="text" id="default" class="am-form-field custom" oninput="${iptvalue};iptvalue.call(this, '${id}')" value="${$('#'+id).find('.input').val()}"/>`
      } else {
        inputHtml += `<textarea  id="default" rows="5" oninput="${iptvalue};iptvalue.call(this, '${id}')" value="${$('#'+id).find('.input').val()}" placeholder="" class="am-form-field"/>`
      }
    inputHtml += `</div>
      <div class="cfg_split"></div>
      <div class="setElementTitle">
        <span>输入提示</span>
      </div>
      <div class="am-form-group">
        <input type="text" id="prompt" oninput="${iptPlaceholder};iptPlaceholder.call(this, '${id}')" value="${$('#'+id).find('.input').attr('placeholder')}" class="am-form-field custom"/>
      </div>`
    
    function iptvalue (id) {
      $(`#${id}`).find('.input').val($(this).val())
    }
    function iptPlaceholder (id) {
      $('#'+id).find('.input').attr('placeholder', $(this).val())
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
            <option value="^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$" >手机号码</option>
            <option value="^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$">电话号码</option>
            <option value="^\d{6}$">邮政编码</option>
            <option value="(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)" >身份号码</option>
            <option value="^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$" >邮箱</option>
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
          if ($(em).attr('selected')) {
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
  ifField (id, condition) {
    let ifField = `<div class="setElementTitle">
          <span>校验</span>
        </div>
      <div>
        <label class="am-checkbox am-secondary am-success">
          <input type="checkbox" data-am-ucheck id='ifWrite' onchange='${ifWrite}; ifWrite.call(this, "${id}", ${JSON.stringify(condition)})' class="am-ucheck-checkbox" ${condition.ifWrite? 'checked' : ''}> 
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
          <input type="checkbox" data-am-ucheck checked id='ifShow' onchange='${ifShow};ifShow.call(this, "${id}", ${JSON.stringify(condition)})' class="am-ucheck-checkbox" ${condition.ifShow? 'checked' : ''}>
          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
           可见
        </label>
        <label class="am-checkbox am-secondary am-success">
          <input type="checkbox" data-am-ucheck checked id="ifEditor" onchange='${ifEditor};ifEditor.call(this, "${id}", ${JSON.stringify(condition)})' class="am-ucheck-checkbox" ${condition.ifEditor? 'checked' : ''}>
          <span class="am-ucheck-icons"><i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>
          可编辑 
        </label>
      </div>`
    function ifWrite(id, condition) {
      // condition = JSON.parse(condition)
      if (this.checked && !$(`#${id} h3 sup`)[0]) {
        $(`#${id} .title`).append(`<sup class="am-text-danger">*</sup>`)
      } else {
        $(`#${id} .title sup`).remove()
      }
      condition.ifWrite = this.checked
      $(`#${id}`).attr("data-xdata", JSON.stringify(condition))
    }
    function ifShow(id, condition) {
      condition.ifShow = this.checked
      $(`#${id}`).attr("data-xdata", JSON.stringify(condition))
    }
    function ifEditor(id, condition) {
      condition.ifEditor = this.checked
      $(`#${id}`).attr("data-xdata", JSON.stringify(condition))
    }
    return ifField
  }
}