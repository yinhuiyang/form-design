var api = {
  baseURL: '',
  POST (action, data, callback , err, type, async) {
    let url = this.baseURL + action
    async = async || false
    if (async = 'true') {
      async = true
    } 
    if (async = 'false') {
      async = false
    }
    type = type || 'json'
    $.ajax({
			url : url,
			data : data,
			type : 'post',
			dataType : type,
			async : async,// 异步请求
			headers : { 'Content-Type' : 'application/x-www-form-urlencoded'},
			beforeSend : function() {
			},
			success : function(o) {
        let fn = typeof (callback) === "function"
				if (callback && fn) {
				  callback(o);
				}
			},
			complete : function(XMLHttpRequest, textStatus) {
			},
      error : function(XMLHttpRequest, textStatus, errorThrown) {
        let fn = typeof (err) === "function"
				if (err && fn) {
				  err(XMLHttpRequest, textStatus, errorThrown);
				}
      }
    })
  }
}