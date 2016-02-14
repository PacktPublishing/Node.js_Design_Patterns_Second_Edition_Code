var urlParse = require('url').parse;
var urlFormat = require('url').format;
var urlResolve = require('url').resolve;
var slug = require('slug');
var path = require('path');
var cheerio = require('cheerio');

module.exports.urlToFilename = function urlToFilename(url) {
  var parsedUrl = urlParse(url);
  var urlPath = parsedUrl.path.split('/')
    .filter(component => {
      return Boolean(component);
    })
    .map(component => {
      return slug(component);
    })
    .join('/');
  var filename = path.join(parsedUrl.hostname, urlPath);
  if(!path.extname(filename).match(/htm/)) {
    filename += '.html';
  }
  return filename;
}


module.exports.getLinkUrl = function getLinkUrl(currentUrl, element) {
  var link = urlResolve(currentUrl, element.attribs.href || "");
  var parsedLink = urlParse(link);
  var currentParsedUrl = urlParse(currentUrl);
  if(parsedLink.hostname !== currentParsedUrl.hostname
    || !parsedLink.pathname) {
      return null;
  }
  return link;
}


module.exports.getPageLinks = function getPageLinks(currentUrl, body) {
  return [].slice.call(cheerio.load(body)('a'))
    .map(element => {
      return module.exports.getLinkUrl(currentUrl, element);
    })
    .filter(element => {
      return !!element;
    });
}
