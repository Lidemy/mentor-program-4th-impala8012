/* eslint-disable consistent-return */
const db = require('../models');

const { User } = db;


const userController = {
  login: (req, res) => {
    res.render('login');
  },
  handleLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '有地方忘了填了');
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
      res.redirect('/admin');
    }).catch(() => {
      req.flash('errorMessage', '發生問題');
      return next();
    });
  },
  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },
};

module.exports = userController;
