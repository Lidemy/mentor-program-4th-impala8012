/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 5002;

const userController = require('./controllers/user');
const prizeController = require('./controllers/prize');

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
  return moment(time).format('YYYY-MM-DD HH:mm');
}

function redirectBack(req, res) {
  res.redirect('back');
}

// 登入處理
app.get('/', prizeController.index);
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.logout);

app.get('/prize', prizeController.prize);
app.get('/admin', checkPermission, prizeController.admin);
app.get('/add-prize', checkPermission, prizeController.add);
app.post('/add-prize', checkPermission, prizeController.handleAdd, redirectBack);
app.get('/edit-prize/:id', checkPermission, prizeController.edit);
app.post('/edit-prize/:id', checkPermission, prizeController.handleEdit, redirectBack);
app.get('/delete-prize/:id', checkPermission, prizeController.delete, redirectBack);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
