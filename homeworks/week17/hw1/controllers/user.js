/* eslint-disable consistent-return */
const db = require('../models');

const { User } = db;

const userController = {
  login: (req, res) => {
    res.render('admin/login');
  },
  handleLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '請輸入資料');
      return next();
    }
    User.findOne({
      where: {
        username,
      },
    }).then((user) => {
      if (user.password !== password) {
        req.flash('errorMessage', '使用者或密碼輸入錯誤');
        return next();
      }
      req.session.username = user.username;
      req.session.userId = user.id;
      res.redirect('/');
    }).catch(() => {
      req.flash('errorMessage', '發生問題');
      return next();
    });
  },
  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },
  aboutme: (req, res) => {
    res.render('aboutme');
  },
};

module.exports = userController;
