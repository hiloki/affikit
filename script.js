// Amazon
function amazon(){
  // http://www.amazon.co.jp/%pname&/dp/%pid&
  var url  = document.querySelector('link[rel=canonical]').href;
  var path = url.split('/');
  // 商品のIDを抽出
  var pid = path.pop();
  // 商品タイトルを抽出
  var title;
  var productTitle = document.getElementById('productTitle');
  var ebookProductTitle = document.getElementById('ebooksProductTitle');

  if(ebookProductTitle !== null) {
    title = decodeURIComponent(ebookProductTitle.textContent);
  } else {
    title = decodeURIComponent(productTitle.textContent);
  }

  // タイトル前後に空白があればトル
  title = title.replace(/(^\s+)|(\s+$)/g, "");

  url = 'https://www.amazon.co.jp/dp/' + pid + '/';

  var source = {
    url: url,
    pid: pid,
    title: title
  };

  console.log(source);

  return source;
}

chrome.extension.sendMessage({
  action: 'getSource',
  source: amazon()
});
