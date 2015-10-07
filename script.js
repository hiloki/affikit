// Amazon
function amazon(){
  // http://www.amazon.co.jp/%pname&/dp/%pid&
  var url  = document.querySelector('link[rel=canonical]').href;
  var path = url.split('/');
  // 商品のIDを抽出
  var pid = path[path.length - 1];
  // 商品タイトルを抽出
  var title = decodeURI(path[path.length - 3]);

  var image = 'http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&ASIN=' + pid;

  url = 'https://www.amazon.co.jp/dp/' + pid + '/';

  var source = {
    url: url,
    pid: pid,
    image: image,
    title: title
  };

  return source;
}

chrome.extension.sendMessage({
  action: 'getSource',
  source: amazon()
});
