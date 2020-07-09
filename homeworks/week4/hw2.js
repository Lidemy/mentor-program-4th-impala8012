/* eslint-disable no-unused-vars */
const request = require('request');
const process = require('process');

const baseURL = 'https://lidemy-book-store.herokuapp.com/books';
// 列出書籍
if (process.argv[2] === 'list') {
  request(`${baseURL}?_limit=20`, (
    error,
    Response,
    body,
  ) => {
    if (error) {
      console.log('讀取失敗', error);
    }
    let json;
    try {
      json = JSON.parse(body);
    } catch (err) {
      console.log(err);
    }
    for (let i = 0; i < json.length; i += 1) {
      console.log(`${json[i].id}  ${json[i].name}`);
    }
  });
}
// 讀取某id書籍
if (process.argv[2] === 'read') {
  request.get(
    `${baseURL}/${process.argv[3]}`,
    (error, Response, body) => {
      if (error) {
        console.log(error);
      }
      let json;
      try {
        json = JSON.parse(body);
      } catch (err) {
        console.log(err);
      }
      console.log(json.name);
    },
  );
}
// 刪除某id書籍
if (process.argv[2] === 'delete') {
  request.delete(
    `${baseURL}/${process.argv[3]}`,
    (error, Response, body) => {
      if (error) {
        console.log('刪除失敗', error);
      } else {
        console.log(`已刪除id為${process.argv[3]}的書籍`);
      }
    },
  );
}
// 新增書籍
if (process.argv[2] === 'create') {
  request.post(
    {
      url: baseURL,
      form: {
        name: process.argv[3],
      },
    },
    (error, Response, body) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`已新增書名: ${process.argv[3]}`);
      }
    },
  );
}
// 更新書籍
if (process.argv[2] === 'update') {
  request.patch(
    {
      url: `${baseURL}/${process.argv[3]}`,
      form: {
        name: process.argv[4],
      },
    },
    (error, Response, body) => {
      if (error) {
        console.log('更新失敗', error);
      } else {
        console.log(`更新id為${process.argv[3]}的書名為${process.argv[4]}`);
      }
    },
  );
}
