console.log('#####################################');
console.log('# Running SydneyToday.com Ads TopUp #');
console.log('#####################################');

const phantom = require('phantom');
var _ph, _page, _outObj;
var loggingIn = false;
var username = process.env.SYDNEY_TODAY_USERNAME;
var password = process.env.SYDNEY_TODAY_PASSWORD;

phantom
	.create()
	.then(ph => {
		_ph = ph;
		return _ph.createPage();
	})
	.then(page => {
		_page = page;
		// Open SydneyToday login page
		console.log("Loading...");
		return _page.open('http://www.sydneytoday.com/login?destination=/user/myposts');
	})
	.then(status => {
		console.log(`Page opened with status [${status}].`);
		// return _page.property('content');
	})
	.then(() => {
		// Enter Credentials
		console.log("Logging in...");

		return _page.evaluate(function(username, password) {
			// use username and password in the page
			document.getElementById("tel").value = username;
			document.getElementById("password").value = password;

			var button = document.getElementById("user-login");
			var e = document.createEvent('MouseEvents');
			e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			button.dispatchEvent(e);
			waitforload = true;

			// return `result`
		}, username, password);

	})
	.then(() => {
		waitFor(function() {
			// Check in the page if a specific element is now visible
			return page.evaluate(function() {
				document.getElementsByClassName("mtg-pill")[0].text = "网页设计";
			});
		}, function() {
			var foo = page.evaluate(function() {
				return document.getElementsByClassName("mtg-pill")[0].text;
			});
			console.log("Foo " + foo);
			// ...
		});
		console.log(`Login with status [${status}].`);
		// return _page.property('content');
	})
	.then(content => {
		console.log(content);
		_page.close();
		_ph.exit();
	})
	.catch(e => console.log(e));