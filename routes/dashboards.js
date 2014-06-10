exports.getApp = getApp;

var Dashboards = require('jsoncan-dashboard');
var can        = require('../db/can');
var debug      = require('debug')('dashboard');
var path       = require('path');
var tables     = {};

tables.site = {
  basic: {
    title         : '网站信息',
    description   : '维护网站的基础信息',
    max           : 1,
    defaultAction : 'view'
  },
  list : false,
  view : {
    showFields: ['name', 'headText', 'footText', 'css', 'logo|image', 'background|image|thumb_200'],
  },
  delete : false
};

tables.seo = {
  basic: {
    title         : 'seo设置',
    description   : 'seo设置',
    max           : 1,
    defaultAction : 'view'
  },
  list: false,
  delete: false
};

tables.cats =  {
  basic: {
    title       : '分类导航',
    description : '分类导航管理'
  },
  list: { 
    showFields : ['name|link', 'seq', 'postsCount'],
    order      : ['seq']
  },
  view: {
    showFields: ['name', 'seq', 'css', 'background|image|thumb_200', 'postsCount', 'posts'],
    hasMany: {
      table         : 'posts',
      title         : '文章',
      viewLinkField : 'title|link',
      order         : ['created', true],
      limit         : 100
    }
  }
};

tables.posts = {
  basic: {
    title       : '文章',
    description : '文章管理',
    formLayout: [{title : 8, _cat : 4}, 'meta_description', 'meta_keywords', 'summary', 'content', 'image', ['isPublic', '__submit']]
  },
  list: {
    showFields: ['image|thumb_100|link', 'title|link', '_cat.name|link', 'isPublic', 'created'],
    dropdown: {
      name  : 'cats.name',
      title : '所属分类',
    },
    order    : ['created', true],
    pageSize : 10
  },
  view: {
    showFields: ['id', '_cat.name|link', 'title', 'summary', 'content', 'isPublic', 'image|image', 'image|thumbs', 'created', 'modified']
  }
};

/*tables.postImages = {
  basic: {
    title       : '文章图片',
    description : '文章图片管理',
    formLayout: [{ title : 5, seq: 2, _post: 5}, 'image', 'memo']
  }, 
  list: {
    showFields: ['seq', 'title', 'image|thumb|link', '_post.title|link', 'created'],
    dropdown: {
      name  : 'posts.title',
      title : '所属文章',
      order : ['created', true],
      filters: {
        hasImages: true,
        imagesCount: ['>', 0]
      }
    },
    pageSize: 10
  },
  view: {
    showFields : ['seq', 'title', 'image|image', 'memo', '_post.title|link', 'created', 'modified'],
    isFormat   : true
  }
};
*/

tables.pages = {
  basic: {
    title: '页面',
    description: '独立页面管理'
  },
  list: {
    showFields: ['name', 'title', 'created', 'modified'],
    order: ['created', true]
  }
};

function getApp (settings) {
  var dashboards;

  dashboards = new Dashboards(can, settings, tables);
  dashboards.addIndexPage();
  
  return dashboards.app;
}