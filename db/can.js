
var Jsoncan = require('jsoncan');
var path = require('path');

var timestampFormat = function (s) {
  var d = new Date(s);
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
};

var seqs = function (num) {
  var list = [];
  num = num || 20;
  for (var i = 1; i <= num; i++) { list.push('#' + i); }
  return list;
};

var humanFileSize = function (size) {
  if (size < 1048576) { // 1m
    return parseInt(size * 10 / 1024) / 10  + 'k';
  } else {
    return parseInt(size * 10 / 1048576 ) / 10  + 'm';
  }
};

var tables = {
  
  site: {
    name: {
      type    : 'string',
      text    : '名称',
      max     : 16,
      isInput : true
    },
    headText: {
      type      : 'string',
      text      : '欢迎语',
      required  : true,
      max       : 160,
      isInput   : true,
      inputType : 'rich_textarea',
      rows      : 3
    },
    footText: {
      type      : 'string',
      text      : '脚注',
      required  : true,
      max       : 160,
      isInput   : true,
      inputType : 'rich_textarea',
      rows      : 3
    },
    css: {
      type      : 'string',
      text      : 'css样式',
      isInput   : true,
      inputType : 'textarea',
      rows      : 5
    },
    logo: {
      type        : 'string',
      text        : 'logo',
      isInput     : true,
      inputType   : 'file',
      inputHelp   : '请上传小于4m的图片',
      isImage     : true,
      path        : path.join(__dirname, '../public/uploads/logo'), 
      url         : '/uploads/logo/',
      maxFileSize : 4* 1024 * 1024,
      exts        : ['jpg', 'jpeg', 'gif', 'png'],
      sizeField   : 'size',
      imageSize   : [260],
      thumbs      : [150, 100],
      thumbPath   : false // use default
    },
    background: {
      type        : 'string',
      text        : '主背景',
      isInput     : true,
      inputType   : 'file',
      inputHelp   : '请上传小于4m的图片',
      isImage     : true,
      path        : path.join(__dirname, '../public/uploads/site'), 
      url         : '/uploads/site/',
      maxFileSize : 4* 1024 * 1024,
      exts        : ['jpg', 'jpeg', 'gif', 'png'],
      sizeField   : 'size',
      thumbs      : [200],
      thumbPath   : false // use default
    }
  },

  seo: {
    title_prefix     : { type: 'string', isInput: true },
    title_suffix     : { type: 'string', isInput: true },
    meta_keywords    : { type: 'string', isInput: true },
    meta_description : { type: 'string', isInput: true },
    meta_author      : { type: 'string', isInput: true },
    meta_copyright   : { type: 'string', isInput: true }
  },

  pages: {
    id: {
      type       : 'string',
      text       : 'id',
      required   : true,
      unique     : true,
      min        : 1,
      max        : 20,
      isInput    : true,
      // only use for fake
      lang       : 'en',
      dictionary : '-0123456789_abcdefghijklmnopqrstuvwxyz'
    },
    seq: { 
      type      : 'array', 
      text      : '顺序',
      required  : true,
      values    : seqs(),
      isInput   : true,
      inputType : 'select'
    },
    name: {
      type     : 'string',
      text     : '名称',
      required : true,
      isInput  : true,
      max      : 36,
      min      : 2
    },
    description: {
      type      : 'string',
      text      : '描述',
      required  : true,
      isInput   : true,
      inputType : 'textarea',
      max       : 500
    },
    background: {
      type        : 'string',
      text        : '主背景',
      isInput     : true,
      inputType   : 'file',
      inputHelp   : '请上传小于4m的图片',
      isImage     : true,
      path        : path.join(__dirname, '../public/uploads/pages'), 
      url         : '/uploads/pages/',
      maxFileSize : 4* 1024 * 1024,
      exts        : ['jpg', 'jpeg', 'gif', 'png'],
      sizeField   : 'size',
      thumbs      : [200],
      thumbPath   : false // use default
    },
    css: {
      type      : 'string',
      text      : 'css样式',
      isInput   : true,
      inputType : 'textarea',
      rows      : 5
    },
    meta_description : { 
      type    : 'string', 
      text    : '搜索描述',
      isInput : true 
    },
    meta_keywords : { 
      type    : 'string',
      text    : '搜索关键字',
      isInput : true 
    },
    content: {
      type: 'string',
      required: true,
      isInput: true,
      inputType: 'rich_textarea'
    },
    status: {
      type     : 'int',
      text     : '状态',
      default  : 1,
      required : true
    },
    created :{
      type   : 'created',
      text   : '创建时间',
      format : timestampFormat
    },
    modified: {
      type   : 'modified',
      text   : '更新时间',
      format : timestampFormat
    }
  },

  cats: {
    id: {
      type       : 'string',
      text       : 'id',
      required   : true,
      unique     : true,
      min        : 1,
      max        : 20,
      isInput    : true,
      // only use for fake
      lang       : 'en',
      dictionary : '-0123456789_abcdefghijklmnopqrstuvwxyz'
    },
    seq: { 
      type      : 'array', 
      text      : '顺序',
      required  : true,
      values    : seqs(),
      isInput   : true,
      inputType : 'select'
    },
    name: {
      type     : 'string',
      text     : '导航分类',
      required : true,
      isInput  : true,
      max      : 36,
      min      : 2
    },
    meta_description : { 
      type    : 'string', 
      text    : '搜索描述',
      isInput : true 
    },
    meta_keywords : { 
      type    : 'string',
      text    : '搜索关键字',
      isInput : true 
    },
    description: {
      type      : 'string',
      text      : '描述',
      required  : true,
      isInput   : true,
      inputType : 'textarea',
      max       : 500
    },
    postsCount: {
      type     : 'int',
      text     : '文章条数',
      default  : 0,
      required : true
    },
    background: {
      type        : 'string',
      text        : '主背景',
      isInput     : true,
      inputType   : 'file',
      inputHelp   : '请上传小于4m的图片',
      isImage     : true,
      path        : path.join(__dirname, '../public/uploads/cats'), 
      url         : '/uploads/cats/',
      maxFileSize : 4* 1024 * 1024,
      exts        : ['jpg', 'jpeg', 'gif', 'png'],
      sizeField   : 'size',
      thumbs      : [200],
      thumbPath   : false // use default
    },
    css: {
      type      : 'string',
      text      : 'css样式',
      isInput   : true,
      inputType : 'textarea',
      rows      : 5
    },
    status: {
      type     : 'int',
      text     : '状态',
      default  : 1,
      required : true
    }
  },
  
  posts: {
    id: {
      type     : 'random',
      text     : 'id',
      required : true,
      unique   : true,
      size     : 6
    },
    _cat: {
      type      : 'ref',
      text      : '分类',
      required  : true,
      isIndex   : true,
      isInput   : true,
      inputType : 'select',
      present   : 'name',
      counter   : 'postsCount'
    },
    meta_description : { 
      type    : 'string', 
      text    : '搜索描述',
      isInput : true 
    },
    meta_keywords : { 
      type    : 'string',
      text    : '搜索关键字',
      isInput : true 
    },
    title: {
      type     : 'string',
      text     : '标题',
      required : true,
      max      : 100,
      isInput  : true
    },
    summary: {
      type      : 'string',
      text      : '简介',
      required  : true,
      max       : 1000,
      isInput   : true,
      inputType : 'textarea',
      rows      : 4
    },
    content: {
      type      : 'string',
      text      : '内容',
      required  : true,
      isInput   : true,
      inputType : 'rich_textarea'
    },
    isPublic: { 
      type      : 'boolean', 
      text      : '是否发布', 
      default   : false, 
      format    : function (v) { return v ? '是' : '否'; }, 
      isInput   : true, 
      inputType : 'checkbox'
    },
    image: {
      type           : 'string',
      text           : '图片', 
      max            : 100,
      required       : true,
      isInput        : true,
      inputType      : 'file',
      inputHelp      : '请上传小于4m的图片',
      isImage        : true,
      path           : path.join(__dirname, '../public/uploads/posts'), 
      url            : '/uploads/posts/',
      maxFileSize    : 4* 1024 * 1024,
      exts           : ['jpg', 'jpeg', 'gif', 'png'],
      sizeField      : 'size',
      // cropImage   : 'Center',
      // isFixedSize : true,
      imageSize      : [620],
      thumbs         : [200, 100],
      hasThumb       : true,
      thumbPath      : false // use default
    },
    created :{
      type    : 'created',
      text    : '创建时间',
      isIndex : true,
      format  : timestampFormat
    },
    modified: {
      type   : 'modified',
      text   : '更新时间',
      format : timestampFormat
    }
  }

};

module.exports = new Jsoncan(path.join(__dirname, 'data'), tables);