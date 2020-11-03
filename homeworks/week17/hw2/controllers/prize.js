/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
const db = require('../models');

const { Prize } = db;

const prizeController = {
  index: (req, res) => {
    Prize.findAll({
      order: [['probability', 'ASC']],
    }).then((prizes) => {
      res.render('index', {
        prizes,
      });
    });
  },
  admin: (req, res) => {
    Prize.findAll({
      order: [['probability', 'ASC']],
    }).then((prizes) => {
      res.render('admin', {
        prizes,
      });
    });
  },
  add: (req, res) => {
    res.render('add_prize');
  },
  handleAdd: (req, res, next) => {
    const {
      name, content, probability, imgURL,
    } = req.body;
    if (!name || !content || !probability || !imgURL) {
      req.flash('errorMessage', '資料輸入不齊全喔');
      return next();
    }
    Prize.create({
      name,
      content,
      probability,
      imgURL,
    }).then(() => {
      res.redirect('/admin');
    });
  },
  delete: (req, res) => {
    Prize.destroy({
      where: {
        id: req.params.id,
      },
    }).then(() => {
      res.redirect('back');
    }).catch(() => {
      res.redirect('/');
    });
  },
  edit: (req, res) => {
    Prize.findOne({
      where: {
        id: req.params.id,
      },
    }).then((prize) => {
      res.render('edit', {
        prize,
      });
    });
  },
  handleEdit: (req, res, next) => {
    const {
      name, content, probability, imgURL,
    } = req.body;
    if (!name || !content || !probability || !imgURL) {
      req.flash('errorMessage', '資料輸入不齊全喔');
      return next();
    }
    Prize.findOne({
      where: {
        id: req.params.id,
      },
    }).then(prize => prize.update({
      name,
      content,
      probability,
      imgURL,
    })).then(() => {
      res.redirect('/admin');
    }).catch(() => next());
  },
  prize: (req, res) => {
    Prize.findAll({
      order: [['probability', 'ASC']],
    }).then((prizes) => {
      const prizeWeight = [];
      const prizeName = [];
      for (const prize of prizes) {
        prizeWeight.push(prize.probability);
        prizeName.push(prize.name);
      }
      // 權重和
      const weightSum = prizeWeight.reduce((preValue, curValue) => preValue + curValue);
      // 產生一個介於0-weightSum之間的隨機權重數
      const random = Math.random() * weightSum;
      // 將多個權重組重組並排序
      const concatWeightArr = prizeWeight.concat(random);
      const sortWeightArr = concatWeightArr.sort((a, b) => a - b);
      //  索引權重
      let randomIndex = sortWeightArr.indexOf(random);
      randomIndex = Math.min(randomIndex, prizeWeight.length - 1);
      // 取出對應的獎項
      const name = prizeName[randomIndex];
      Prize.findOne({
        where: {
          name,
        },
      }).then((prize) => {
        const result = {
          name: prize.name,
          content: prize.content,
          imgURL: prize.imgURL,
        };
        return res.json(result);
      }).catch((err) => {
        console.log('WENT WRONG', err);
      });
    });
  },
};

module.exports = prizeController;
