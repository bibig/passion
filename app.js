var config     = require('./config');
var glory      = require('glory')(config);
var path       = require('path');
var Authlogic  = require('authlogic');
var site       = require('./routes/site');
var dashboards = require('./routes/dashboards');
var app        = glory.app;
var authlogic  = Authlogic.create(config.authlogic);

var posts_middlewares = [site.getSite, site.getSeo, site.getPages, site.getCats, site.getCat, site.getPosts];

authlogic.initRoot();
app.locals.isProduction = glory.isProduction;
app.use(config.authlogic.mount, authlogic.app);

app.get('/', posts_middlewares, site.home);
app.get('/page/:page', posts_middlewares, site.home);
app.get('/cat/:cat', posts_middlewares, site.postsInCat);
app.get('/cat/:cat/page/:page', posts_middlewares, site.postsInCat);
app.get('/post/:id', [site.getSite, site.getSeo, site.getPost], site.post);
app.get('/pages/:id', [site.getSite, site.getSeo, site.getPage], site.page);


app.all(config.dashboards.mount, authlogic.memberOnly());
app.all(config.dashboards.mount + '/*', authlogic.memberOnly());

app.use(config.dashboards.mount, dashboards.getApp(config.dashboards));

glory.ready(function () {
  if ( ! glory.isProduction ) {
    console.log('glory listen on:' + glory.app.get('port'));  
  }
});