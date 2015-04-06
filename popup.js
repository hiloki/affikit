chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == 'getSource') {
    var url,format,aid;
    var data = request.source;

    data.aid = getAid();
    data.format = getFormat();

    buildCode(data);
  }
});

function getAid() {
  var aid = document.getElementById('aid').value;
  return aid;
}

function getFormat() {
  var format = document.querySelector ('input[name="format"]:checked').value;
  return format;
}

function buildCode(data) {
  var url = data.url + '/' + data.aid;
  var title = data.title;
  var format = data.format;
  var code = null;

  if (format == 'html') {
    code = '<a href="' + url + '">' + title + '</a>';
  } else if (format == 'md') {
    code = '[' + title + '](' + url + ')';
  }

  result.value = code;

  result.select();
  document.execCommand("copy");
}

function generate() {
  chrome.tabs.executeScript(null, {
    file: "script.js"
  },function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      return;
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var result = document.getElementById('result');
  var inputAid = document.getElementById('aid');
  var radioHtml = document.getElementById('html');
  var radioMd = document.getElementById('md');

  inputAid.addEventListener('change', generate);
  radioHtml.addEventListener('change', generate);
  radioMd.addEventListener('change', generate);

  generate();

});
