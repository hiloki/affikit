var data;

chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == 'getSource') {
    data = request.source;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var $aid = document.getElementById('aid');
  var $formatHtml = document.getElementById('html');
  var $formatMd = document.getElementById('md');
  var $formatUrl = document.getElementById('url');
  var $result = document.getElementById('result');
  var $input = document.querySelectorAll('[data-input]');
  var keys = {
    aid: "aid",
    format: "format"
  };

  Array.prototype.forEach.call($input, function(node) {
    node.addEventListener('change', function(){

      var user = {
        aid: getAid(),
        format: getFormat()
      }

      data.aid = user.aid;
      data.format = user.format;

      chrome.storage.sync.set(user, function(){
        buildCode(data);
      });
    })
  });

  chrome.tabs.executeScript(null, {
    file: "script.js"
  },function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      return;
    }

    chrome.storage.sync.get(keys, function(items) {
      if (!chrome.runtime.error) {
        if (items.aid !== '') {
          $aid.value = items.aid;
        }

        if (items.format == 'md') {
          $formatMd.checked = true;
        } else if (items.format == 'html') {
          $formatHtml.checked = true;
        } else {
          $formatUrl.checked = true;
        }

        var aid = getAid();
        var format = getFormat();

        data.aid = aid;
        data.format = format;

        buildCode(data);
      }
    });
  });

  function getAid() {
    var aidVal = $aid.value;
    return aidVal;
  }

  function getFormat() {
    var formatVal = document.querySelector('input[name="format"]:checked').value;
    return formatVal;
  }

  function buildCode(data) {
    var title = data.title;
    var format = data.format;
    var code = null;
    var url;

    if(data.aid) {
      url = data.url + '?tag=' + data.aid;
    } else {
      url = data.url;
    }

    if (format == 'html') {
      code = '<a href="' + url + '">' + title + '</a>';
    } else if (format == 'md') {
      code = '[' + title + '](' + url + ')';
    } else {
      code = url;
    }

    $result.value = code;

    $result.select();
    document.execCommand("copy");
  }
});
