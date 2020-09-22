/* eslint-disable no-shadow */
/* eslint-disable no-else-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */

const url = 'https://api.twitch.tv/kraken/streams/?game=';
const clientID = 'g81urzfeshmfzigurropa59jh4vlu0';

// 檢查狀態
function checkStatus(response) {
  if (response.status >= 200 && response.status < 400) {
    return response.json();
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function getGamesTitle(data) {
  const games = data;
  const topGames = games.top.map(game => game.game.name);
  for (let i = 0; i < topGames.length; i++) {
    const li = document.createElement('li');
    li.classList.add('games');
    li.innerText = topGames[i];
    document.querySelector('ul').appendChild(li);
  }
  return Promise.resolve(topGames);
}

// Fetch抓前五名的遊戲
function getGames() {
  return fetch('https://api.twitch.tv/kraken/games/top?limit=5', {
    headers: {
      'Client-ID': clientID,
      Accept: 'application/vnd.twitchtv.v5+json',
    },
  });
}

getGames()
  .then(checkStatus)
  .then(getGamesTitle)
  .catch((err) => {
    console.log('SOMETHING WENT WRONG WHILE GETTING GAMES', err);
  })
  .then(appendFirstGames)
  .catch((err) => {
    console.log('STH WENT WRONG WHILE APPENDING GAMES', err);
  });

// 遊戲的實況
function streams(data) {
  const stream = data.streams;
  return Promise.resolve(stream);
}

// 拿遊戲的實況並載入
function getStreams(name) {
  return fetch(`${url}${encodeURIComponent(name)}&limit=20`, {
    headers: {
      'Client-ID': clientID,
      Accept: 'application/vnd.twitchtv.v5+json',
    },
  })
    .then(checkStatus)
    .then(streams)
    .catch((err) => {
      console.log('STH WENT WRONG WHILE GETTING STREAMS', err);
    })
    .then(appendStreams)
    .catch((err) => {
      console.log('STH WENT WRONG WHILE APPENDING STREAMS', err);
    });
}

// 載入第一個的直播
function appendFirstGames(topGames) {
  const firstGame = topGames[0];
  document.querySelector('.game__title').innerText = firstGame;
  getStreams(topGames[0]);
}

// 點選直播
document.querySelector('.nav__top5').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const text = e.target.innerText;
    document.querySelector('.streams').innerHTML = '';
    document.querySelector('.game__title').innerText = text;
    getStreams(text);
  }
});

// 載入直播
function appendStreams(streams) {
  streams.forEach((stream) => {
    const div = document.createElement('div');
    div.classList.add('stream__game');
    div.innerHTML = `
        <div class="preview">
            <img class="stream__pic" src=${stream.preview.medium} >
        </div>
        <div class="content">
            <div class="logo">
                <img class="stream__logo" src=${stream.channel.logo}>
            </div>
            <div class="text">
                <div class="stream__title">${stream.channel.status}</div>
                <div class="stream__name">${stream.channel.display_name}</div>
            </div>
        </div>`;
    document.querySelector('.streams').appendChild(div);
  });
  addEmptyBlock();
  addEmptyBlock();
}

// 預防跑版
function addEmptyBlock() {
  const emptyBlock = document.createElement('div');
  emptyBlock.classList.add('game-empty');
  document.querySelector('.streams').appendChild(emptyBlock);
}
