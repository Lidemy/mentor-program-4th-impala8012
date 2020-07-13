const request = require('request');

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    'Client-ID': 'g81urzfeshmfzigurropa59jh4vlu0',
    Accept: 'application/vnd.twitchtv.v5+json',
  },
};
request.get(options, (error, Response, body) => {
  if (Response.statusCode >= 404) {
    console.log(error);
  }
  let json;
  try {
    json = JSON.parse(body);
  } catch (err) {
    console.log(err);
  }
  // console.log(body);
  // console.log(json);
  // console.log(json.top);
  for (let i = 0; i < json.top.length; i += 1) {
    console.log(`${json.top[i].viewers} ${json.top[i].game.name}`);
  }
});
