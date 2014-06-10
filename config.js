var path         = require('path');

var authMount    = '/auth';
var cookieSecret = 'passion';
var session      = {
  keys: ['passion', 'blog'],
  maxAge: 60 * 60 * 1000
};

// for glory settings
module.exports = {

  path: __dirname,
  stylus: true,

  authlogic: {
    dbPath       : path.join(__dirname, './db/auths'),
    mount        : authMount,
    cookieSecret : cookieSecret,
    session      : session,
    logo         : '/|xxxx网站|.:navbar-brand|i:eye-open',
    mainToolbars : [
      'http://www.apple.com|i:fa-bolt|apple', 
      'http://www.google.com|i:@|google'
    ],
    rightToolbars: ['/register|注册'],
    footbars: ['iMedia copyright']
  },

  dashboards: {
    mount         : '/admin',
    title         : '后台管理',
    rightToolbars : [authMount + '/logout|i:off|退出'],
    cookieSecret  : cookieSecret,
    session       : session
  },

  port: {
    dev: 3002,
    pro: 9100
  },
  
  cookieSecret : cookieSecret,
  session      : session
};