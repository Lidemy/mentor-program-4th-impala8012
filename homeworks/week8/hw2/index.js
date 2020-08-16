/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
// const request = new XMLHttpRequest();
const url = 'https://api.twitch.tv/kraken/streams/?game=';
const clientID = 'g81urzfeshmfzigurropa59jh4vlu0';

// Call API 把資料傳進來
function getGames(cb) {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://api.twitch.tv/kraken/games/top?limit=5', true);
  request.setRequestHeader('Client-ID', clientID);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.addEventListener('load', () => {
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText;
      let games;
      try {
        games = JSON.parse(response);
        const topGames = games.top.map(game => game.game.name);
        console.log(topGames);
        cb(topGames);
      } catch (err) {
        console.log(err);
      }
    }
  });
  request.send();
}

// 拿遊戲的實況列表
function getStreams(name, cb) {
  const request = new XMLHttpRequest();
  request.open('GET', `${url}${encodeURIComponent(name)}&limit=20`, true);
  request.setRequestHeader('Client-ID', clientID);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.addEventListener('load', () => {
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText;
      let data;
      try {
        data = JSON.parse(response);
        cb(data.streams);
      } catch (err) {
        console.log(err);
      }
    }
  });
  request.send();
}

// 第一個進去的畫面
getGames((topGames) => {
  for (let i = 0; i < topGames.length; i++) {
    const li = document.createElement('li');
    li.classList.add('games');
    li.innerText = topGames[i];
    document.querySelector('ul').appendChild(li);
  }
  const firstGame = topGames[0];
  document.querySelector('.game__title').innerText = firstGame;
  getStreams(topGames[0], (data) => {
    appendStreams(data);
    addEmptyBlock();
    addEmptyBlock();
  });
});

// 點選直播
document.querySelector('.nav__top5').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const text = e.target.innerText;
    document.querySelector('.streams').innerHTML = '';
    document.querySelector('.game__title').innerText = text;
    getStreams(text, (data) => {
      appendStreams(data);
      addEmptyBlock();
      addEmptyBlock();
    });
  }
});

// 載入直播版型
function appendStreams(streams) {
  console.log(streams);
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
}

// 預防跑版
function addEmptyBlock() {
  const emptyBlock = document.createElement('div');
  emptyBlock.classList.add('game-empty');
  document.querySelector('.streams').appendChild(emptyBlock);
}
