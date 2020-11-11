/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 5001;

const userController = require('./controllers/user');
const articleController = require('./controllers/articles');
const categoryController = require('./controllers/category');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

// 設定給  view 使用的 global 變數
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  res.locals.path = req.path;
  res.locals.formatTime = formatTime;
  next();
});

function checkPermission(req, res, next) {
  if (!req.session.username) {
    res.redirect('/');
  } else {
    return next();
  }
}

function formatTime(time) {
  return moment(time).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm');
}

function redirectBack(req, res) {
  res.redirect('back');
}

// 登入處理
app.get('/', articleController.index);
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.logout);

// 文章處理
app.get('/article/:id', articleController.show);
app.get('/article_list', articleController.lists);
app.get('/add_article', checkPermission, articleController.add);
app.post('/add_article', checkPermission, articleController.handleAddArticle, redirectBack);
app.get('/delete_article/:id', checkPermission, articleController.delete, redirectBack);
app.get('/update_article/:id', checkPermission, articleController.update);
app.post('/update_article/:id', checkPermission, articleController.handleUpdate, redirectBack);
app.get('/admin_article', checkPermission, articleController.admin);

// 分類處理
app.get('/category_list', categoryController.lists);
app.get('/category/:id', categoryController.category);
app.get('/admin_category', checkPermission, categoryController.admin);
app.get('/add_category', checkPermission, categoryController.add);
app.post('/add_category', checkPermission, categoryController.handleAddCategory, redirectBack);
app.get('/delete_category/:id', checkPermission, categoryController.delete, redirectBack);
app.get('/update_category/:id', checkPermission, categoryController.update);
app.post('/update_category/:id', checkPermission, categoryController.handleUpdate, redirectBack);


// 關於我
app.get('/aboutme', userController.aboutme);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
