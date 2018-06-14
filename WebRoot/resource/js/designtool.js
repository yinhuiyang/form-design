(function () {
	var numberindex = 0;
	app.getNumber = function() {
		numberindex++;
		return new Date().getTime() - 1200000000000 + "" + Math.floor(Math.random() * 9 + 1) + "" + Math.floor(Math.random() * 9 + 1) + "" + numberindex;
	};
})()

// export var m = 2