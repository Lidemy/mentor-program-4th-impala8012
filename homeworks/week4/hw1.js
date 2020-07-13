const request = require('request');

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, Response, body) => {
    if (error) {
      console.log(error);
      return;
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
  },
);
