console.log('#####################################');
console.log('# Running SydneyToday.com Ads TopUp #');
console.log('#####################################');

const phantom = require('phantom');
const Rx = require('rxjs/Rx');
const { ST_USERNAME, ST_PASSWORD } = process.env;
const observable = new Rx.Subject();

// var _ph, _page, _outObj;
// var loggingIn = false
(async function () {
  const instance = await phantom.create()
  const page = await instance.createPage();

  await setUpEvents(page);

  observable.subscribe(
    (x) => {
      console.log('loaded1')
    },
    (e) => {
      console.log('loaded')
    },
    () => {
      console.log('loaded')
    }
  )

  await page.open('http://www.sydneytoday.com/login?destination=/user/myposts');
  await page.evaluate(function (username, password) {
    document.getElementById('tel').value = username;
    document.getElementById('password').value = password;

    console.log('账号密码...');
    document.getElementById('user-login').click();
    console.log('登录中...');
  }, ST_USERNAME, ST_PASSWORD).then(onReady(page));

})();




function onReady(page) {
  return (x) => {
    const timeout = 10*1000;
    let start = new Date().getTime(), condition = false;
    let interval = setInterval(async () => {
      if (new Date().getTime() - start < timeout && !condition) {
        condition = await page.evaluate(function () {
          return document.readyState === 'complete';
        })
      } else {
        if (!condition) {
          console.log('Timeout!');
        } else {
          console.log('onReady done');
          clearInterval(interval);
          return x;
        }
      }
    }, 250);
  }
}

function wait(cb) {
  return function (x) {
    return new Promise(function (resolve, reject) {
      cb.then(res => resolve(x));
    });
  };
}


/**
 * Setting all the events for the page
 * @param {*} page 
 */
async function setUpEvents(page) {
  await page.setting('userAgent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');

  await page.property('onConsoleMessage', function (msg) {
    console.log(msg);
    observable.next(1);
  });

  await page.property('onUrlChanged', function (targetUrl) {
    console.log('#####################################');
    console.log('# URL Changed: ' + targetUrl);
  });

  let b = '321'
  await page.property('onLoadFinished', function (status) {
    console.log('onLoad')
    b = '123'
    console.log(b);
    console.log(' 111');
  });
  console.log(b)
}




// phantom
//   .create()
//   .then(ph => {
//     _ph = ph;
//     return _ph.createPage();
//   })
//   .then(page => {
//     _page = page;
//     // Open SydneyToday login page
//     console.log("Loading...");
//     return _page.open('http://www.sydneytoday.com/login?destination=/user/myposts');
//   })
//   .then(status => {
//     console.log(`Page opened with status [${status}].`);
//     // return _page.property('content');
//   })
//   .then(() => {
//     // Enter Credentials
//     console.log("Logging in...");

//     return _page.evaluate(function (username, password) {
//       // use username and password in the page
//       document.getElementById("tel").value = username;
//       document.getElementById("password").value = password;

//       var button = document.getElementById("user-login");
//       var e = document.createEvent('MouseEvents');
//       e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//       button.dispatchEvent(e);
//       waitforload = true;

//       // return `result`
//     }, username, password);

//   })
//   .then(() => {
//     waitFor(function () {
//       // Check in the page if a specific element is now visible
//       return page.evaluate(function () {
//         document.getElementsByClassName("mtg-pill")[0].text = "网页设计";
//       });
//     }, function () {
//       var foo = page.evaluate(function () {
//         return document.getElementsByClassName("mtg-pill")[0].text;
//       });
//       console.log("Foo " + foo);
//       // ...
//     });
//     console.log(`Login with status [${status}].`);
//     // return _page.property('content');
//   })
//   .then(content => {
//     console.log(content);
//     _page.close();
//     _ph.exit();
//   })
//   .catch(e => console.log(e));