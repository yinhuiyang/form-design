(function () {
	var numberindex = 0;
	app.getNumber = function() {
		numberindex++;
		return new Date().getTime() - 1200000000000 + "" + Math.floor(Math.random() * 9 + 1) + "" + Math.floor(Math.random() * 9 + 1) + "" + numberindex;
	};

	var alert_html = '';
	alert_html += '<div class="am-modal am-modal-alert" tabindex="-1" id="app-modal-alert">';
	alert_html += '<div class="am-modal-dialog">';
	alert_html += '<div class="am-modal-hd title"></div>';
	alert_html += '<div class="am-modal-bd msg"> </div>';
	alert_html += '<div class="am-modal-footer">';
	alert_html += '<span class="am-modal-btn" data-am-modal-confirm>确定</span>';
	alert_html += '</div>';
	alert_html += '</div>';
	alert_html += '</div>';

	app.alert = function(msg, confirmCallback, title) {
		var $modal = $(alert_html).clone();
		var id = "app-modal-alert-" + app.getNumber();
		$modal.attr('id', id);
		$('body').append($modal);
		msg = msg || "信息";
		title = title || "提示信息";
		$('#' + id).find('.title').html(title);
		$('#' + id).find('.msg').html(msg);
		$('#' + id).modal({
			onConfirm : function() {
				confirmCallback && confirmCallback();
			}
		});
	};

	app.isEmpty = function(arg) {
		return typeof (arg) == "undefined" || arg == null || arg.length == 0;
	};
})()

// export var m = 2