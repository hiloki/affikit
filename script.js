// Amazon
function amazon(){
  // http://www.amazon.co.jp/%pname&/dp/%pid&
  var url  = document.querySelector('link[rel=canonical]').href;
  var path = url.split('/');
  // 商品のIDを抽出
  var pid = path.pop();
  // 商品タイトルを抽出
  var title = decodeURIComponent(document.getElementById('productTitle').textContent);

  url = 'https://www.amazon.co.jp/dp/' + pid + '/';

  var source = {
    url: url,
    pid: pid,
    title: title
  };

  return source;
}

chrome.extension.sendMessage({
  action: 'getSource',
  source: amazon()
});
