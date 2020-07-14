/* eslint-disable no-unused-vars */
const request = require('request');
const process = require('process');

const baseURL = 'https://lidemy-book-store.herokuapp.com/books';
const action = process.argv[2];
const params = process.argv[3];

// 列出20本書籍
function listBooks() {
  request(`${baseURL}?_limit=20`, (
    error,
    response,
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
function readBook(id) {
  request.get(
    `${baseURL}/${id}`,
    (error, response, body) => {
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
function deleteBook(id) {
  request.delete(
    `${baseURL}/${id}`,
    (error, response, body) => {
      if (error) {
        console.log('刪除失敗', error);
      } else {
        console.log(`已刪除id為${id}的書籍`);
      }
    },
  );
}

// 新增書籍
function createBook(name) {
  request.post(
    {
      url: baseURL,
      form: {
        name,
      },
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`已新增書名: ${name}`);
      }
    },
  );
}

// 更新書籍
function updateBook(id, newName) {
  request.patch(
    {
      url: `${baseURL}/${id}`,
      form: {
        name: newName,
      },
    },
    (error, response, body) => {
      if (error) {
        console.log('更新失敗', error);
      } else {
        console.log(`更新id為${id}的書名為${newName}`);
      }
    },
  );
}

switch (action) {
  case 'list':
    listBooks();
    break;
  case 'read':
    readBook(params);
    break;
  case 'delete':
    deleteBook(params);
    break;
  case 'create':
    createBook(params);
    break;
  case 'update':
    updateBook(params, process.argv[4]);
    break;
  default:
    console.log('輸入正確的指令: list, read, create, delete, update');
}
