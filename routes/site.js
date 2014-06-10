exports.home       = home;
exports.getSite    = getSite;
exports.getSeo     = getSeo;
exports.getPost    = getPost;
exports.getPosts   = getPosts;
exports.getCat     = getCat;
exports.getCats    = getCats;
exports.postsInCat = postsInCat;
exports.post       = post;

var path       = require('path');
var can        = require('../db/can');
var yi         = require('yi');
var POST_LIMIT = 10;

function timeStart (res) {
  res.locals.timer = new Date();
}

function timeEnd (res) {
  res.locals.timer = new Date() - res.locals.timer;
}

function getSite (req, res, next) {
  timeStart(res);

  res.locals.timer = new Date();
  can.open('site').query().limit(1).exec(function (e, records) {
    if (e) { next(e); } else  {
      res.locals.site = records[0] || {};
      // console.log(res.locals.site);
      next();
    }
  });
}

function getSeo (req, res, next) {
  can.open('seo').query().limit(1).exec(function (e, records) {
    if (e) { next(e); } else  {
      res.locals.seo = records[0] || {};
      next();
    }
  });
}

function getCats (req, res, next) {
  var Cat = can.open('cats');
  var query = Cat.query().select('id, name').order('seq');

  query.exec(function (e, records) {
    
    if (e) { next(e); } else if (yi.isEmpty(records)) {
      next( new Error('no data found!'));
    } else {
      res.locals.cats = records;
      next();
    }

  });
}

function getCat (req, res, next) {
  var Cat = can.open('cats');
  var id  = req.params.cat;

  res.locals.currentCat = {};

  if ( ! id) { return next(); }

  Cat.finder('id', id).exec(function (e, record) {
    
    if (e) { next(e); } else if ( ! record ) {
      next(new Error('no category found!'));
    } else {
      res.locals.currentCat = record;
      next();
    }

  }); 
}

function getPosts (req, res, next) {
  var page  = parseInt(req.params.page || 1, 10);
  var cat   = req.params.cat;
  var Post  = can.open('posts');
  var query = Post.query().select('id, title, image, content, created').order('created', true).limit(POST_LIMIT + 1).format();

  if (page > 1) {
    query.skip((page - 1) * POST_LIMIT);
  }

  if (cat) {
    query.where('_cat', res.locals.currentCat._id);
  }

  query.exec(function (e, records) {
    
    if (e) { next(e); } else {

      if (records.length > POST_LIMIT) {
        records.pop();
        res.locals.older = getNeighbourPage(req, page, true);
      }

      if (page > 1) {
        res.locals.newer = getNeighbourPage(req, page);
      }

      // console.log(res.locals);

      res.locals.posts = records;
      next();
    }

  });
}

function getPost (req, res, next) {
  var id   = req.params.id;
  var Post = can.open('posts');

  Post.findBy('id', id).ref('cats').format().exec(function (e, record) {
    if (e) { next(e); } else if (! record ) { next(new Error('no post found')); } else {
      res.locals.post = record;
      res.locals.currentCat = record._cat;
      // console.log(record);
      next();
    }
  });
}

function  home (req, res, next) {
  timeEnd(res);
  res.render('index');
}

function postsInCat (req, res, next) {
  timeEnd(res);
  res.render('category');
}

function post (req, res, next) {
  timeEnd(res);
  res.render('post');
}

function getNeighbourPage (req, page, isOlder) {
  var p = req.path;
  var nb = '/page/' + (isOlder ? page + 1 : page - 1);

  if (p.indexOf('/page/') == -1) {
    p = path.join(p, '/page/1');
  }

  return p.replace('/page/' + page, nb );
}
