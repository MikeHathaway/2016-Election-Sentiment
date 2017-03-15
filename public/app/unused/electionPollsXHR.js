
// https://pollyvote.com/en/about/data/
// https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&type=markets_combined

// const settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&type=markets_combined",
//   "method": "GET",
//   "headers": {
//     "cache-control": "no-cache",
//     "postman-token": "7eb84542-eec1-bf4d-bd64-9e269bd1ae76"
//   }
// }
//
// $.ajax(settings).done(function (response) {
//   console.log(response);
// }).fail(function(err) {
//   throw err;
// });


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'https://pollyvote.com/wp-content/plugins/pollyvote/data/index.php?time=current&type=markets_combined';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    console.log(text)
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

makeCorsRequest()
