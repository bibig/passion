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
  clearFiles(path.join(__dirname, '../public/uploads/posts/*'), fn);
}

function rock () {
  var can = require('../db/can');
  var filler = new Filler(can, {
    reset  : true,
    images : path.join(__dirname, './images'),
    lang   : 'cn',
    tables : {
      site  : 1,
      seo   : 1,
      cats  : 10,
      posts : 150,
      pages : 5
    }
  });

  console.log('ready to fill db');
  filler.run(function () {
    console.log('done');  
  });
}

clearImages(function (e) {
  if (e) {console.error(e);} else {
    rock();
  }
});