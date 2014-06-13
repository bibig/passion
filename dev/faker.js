var path   = require('path');
var Filler = require('filler');

function clearFiles (path, fn) {
  var exec = require('child_process').exec;
  var command = 'rm -rf ' + path;

  exec(command, function(e, stdout, stderr) {
    fn(e);
  }); 
}

function clearImages (fn) {
  console.log('ready clear images');
  clearFiles(path.join(__dirname, '../public/uploads/*'), fn);
}

function rock () {
  var can = require('../db/can');
  var names = ['创业', '产品', '应用软件', '科技', '网站', '人物', '品牌', '硬件', '资讯', '活动', '游戏', '移动', '社交', '投资', '企业'];
  var filler = new Filler(can, {
    reset    : true,
    images   : '/Users/bibig/Dropbox/images',
    lang     : 'cn',
    quantity : {
      site  : 1,
      seo   : 1,
      cats  : 10,
      posts : 150,
      pages : 5
    },
    tables: {
      site: {
        headText   : '欢迎来到xxxx网站',
        footText   : '这里是脚注，爱写什么写什么',
        background : '/Users/bibig/Dropbox/desktop',
        logo       : '/Users/bibig/Dropbox/logo/bibig'
      },
      cats: {
        name       : names,
        background : '/Users/bibig/Dropbox/desktop'
      },
      pages: {
        name       : names,
        background : '/Users/bibig/Dropbox/desktop'
      }
    }
  });

  console.log('ready to fill db');
  filler.run(function (e) {
    if (e) {
      console.error(e);
    }
    console.log('done');
  });
}

clearImages(function (e) {
  if (e) {console.error(e);} else {
    rock();
  }
});