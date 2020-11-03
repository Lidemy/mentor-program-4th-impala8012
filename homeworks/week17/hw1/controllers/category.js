/* eslint-disable consistent-return */
const db = require('../models');

const Article = db.Articles;
const Category = db.Categories;

const categoryController = {
  admin: (req, res) => {
    Category.findAll({
      where: {
        is_deleted: null,
      },
    }).then((categories) => {
      res.render('admin/admin_categories', {
        categories,
      });
    });
  },
  add: (req, res) => {
    res.render('add_category');
  },
  handleAddCategory: (req, res, next) => {
    const { userId } = req.session;
    const { name } = req.body;
    if (!name || !userId) {
      req.flash('errorMessage', '資料輸入不齊全喔');
      return next();
    }
    Category.create({
      name,
    }).then(() => {
      res.redirect('/admin_category');
    });
  },
  delete: (req, res) => {
    Category.findOne({
      where: {
        id: req.params.id,
      },
    }).then(category => category.update({
      is_deleted: 1,
    })).then(() => {
      res.redirect('/admin_article');
    }).catch(() => {
      res.redirect('/');
    });
  },
  update: (req, res) => {
    Category.findOne({
      where: {
        id: req.params.id,
      },
    }).then((category) => {
      res.render('update_category', {
        category,
      });
    });
  },
  handleUpdate: (req, res, next) => {
    const { name } = req.body;
    const { userId } = req.session;
    if (!name || !userId) {
      req.flash('errorMessage', '資料輸入不齊全喔');
      return next();
    }
    Category.findOne({
      where: {
        id: req.params.id,
      },
    }).then(category => category.update({
      name,
    })).then(() => {
      res.redirect('/admin_category');
    }).catch(() => next());
  },
  lists: (req, res) => {
    Category.findAll({
      where: {
        is_deleted: null,
      },
      include: [{
        model: Article,
        where: {
          is_deleted: null,
        },
      }],
      order: [['id', 'DESC']],
    }).then((categories) => {
      res.render('category_list', {
        categories,
      });
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return res.render('index');
    });
  },
  category: (req, res) => {
    Article.findAll({
      where: {
        CategoryId: req.params.id,
        is_deleted: null,
      },
      include: Category,
      order: [['id', 'DESC']],
    }).then((articles) => {
      if (articles.length > 0) {
        res.render('category', {
          articles,
        });
      }
    });
  },
};

module.exports = categoryController;
