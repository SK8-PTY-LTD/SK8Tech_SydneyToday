console.log('Hello SK8Tech! \n Running SydneyToday.com! Ads TopUp');

var page = require('webpage').create(),
	currentURL = "http://www.sydneytoday.com/login?destination=/web111712256570004",
	newAddress = "";

 console.log('The default user agent is ' + page.settings.userAgent);
 page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';

page.onConsoleMessage = function(msg) {
	console.log(msg);
};

page.onLoadStarted = function() {
	loadInProgress = true;
	// console.log("load started");
};

page.onLoadFinished = function(url) {
	loadInProgress = false;
	console.log("load finished ", currentURL);
	if (currentURL == "http://www.sydneytoday.com/login?destination=/user/myposts") {
		page.evaluate(function() {

			document.getElementById("tel").value = "449843149";
			document.getElementById("password").value = "Sk8Sk80826";

			console.log("账号密码...");

			document.getElementById("user-login").click();

			console.log("登录中...");

		});
	} else if (currentURL == "http://www.sydneytoday.com/user/myposts") {

		page.evaluate(function() {
			console.log("个人主页");

			document.getElementsByClassName("btn btn-default btn-sm account-comment-item-edit__ifdisable")[1].click();
		});

	} else if (currentURL == "http://www.sydneytoday.com/Edit/post_yellowpage?classify=6381&id=111712256570004") {

		page.evaluate(function() {

			var address = document.getElementById("address").value;

			console.log("个人地址", address);

			if (address == "330 Wattle Street") {
				newAddress = "330 Wattle Street, Ultimo, New South Wales, Australia";
				document.getElementById("address").value = newAddress;
			} else {
				newAddress = "330 Wattle Street";
				document.getElementById("address").value = newAddress;
			}

			console.log("更新地址", document.getElementById("address").value);

			document.getElementById("post_submit").click();

		});

	} else if (currentURL == "http://www.sydneytoday.com/web111712256570004") {
		page.evaluate(function() {

			console.log("已更新...");

			document.location = "http://www.sydneytoday.com/globals/logout"

		});
	} else if (currentURL == "http://www.sydneytoday.com/") {
		page.evaluate(function() {

			console.log("已登出...");

			document.location = "http://www.sydneytoday.com/globals/logout"

		});
		phantom.exit();
	}
};

page.onUrlChanged = function(targetUrl) {
	console.log('New URL: ' + targetUrl);
	currentURL = targetUrl;
};

page.open("http://www.sydneytoday.com/login?destination=/user/myposts", function() {
	// page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js", function() {
	console.log("网页打开成功");
	// 	page.evaluate(function() {

	// 		document.getElementById("tel").value = "449843149";
	// 		document.getElementById("password").value = "Sk8Sk80826";

	// 		console.log("账号密码...", document.getElementById("tel").value);

	// 		document.getElementById("user-login").click();

	// 		console.log("登录中...");
	// 	});
	// 	phantom.exit()
});
