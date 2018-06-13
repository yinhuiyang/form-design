var setData = {
  title (id,type,value) {
    let titleHtml = `<div class="setElementTitle">
        <span>标题</span>
        <span class="setNmae">${type}</span>
      </div>
      <input type="text" id="title" class="input_title" oninput="${fn};fn.call(this, '${id}')" value="${value}">`
      function fn (id) {
        $(`#${id}`).find('.title span').text($(this).val())
      }
    return titleHtml
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
  text (id) {
    let textHtml = `<div class="setElementTitle">
          <span>格式</span>
        </div>
        <div>
        <select data-am-selected="{btnWidth: '100%', btnSize: 'sm'}">
            <option value="text" selected>文本</option>
            <option value="^((\(\d{2,3}\))|(\d{3}\-))?1\d{10}$" >手机号码</option>
            <option value="^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$">电话号码</option>
            <option value="^\d{6}$">邮政编码</option>
            <option value="(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)" >身份号码</option>
            <option value="^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$" >邮箱</option>
        </select>
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