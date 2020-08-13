/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
const request = new XMLHttpRequest();
const background = document.querySelector('.background');
const prizeBlock = document.querySelector('.prize');
const prizeResult = document.querySelector('.prize__result');
const btn = document.querySelector('.btn');
const errorMessage = '系統不穩定，再試一次';

btn.addEventListener('click', (e) => {
  request.addEventListener('load', () => {
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText;
      let json;
      try {
        json = JSON.parse(response);
      } catch (err) {
        alert(errorMessage);
        return;
      }
      const { prize } = json;
      let className;
      let title;
      switch (prize) {
        case 'FIRST':
          className = 'first';
          title = '恭喜你中頭獎了！日本東京來回雙人遊！';
          break;
        case 'SECOND':
          className = 'second';
          title = '二獎！90 吋電視一台！';
          break;
        case 'THIRD':
          className = 'third';
          title = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
          break;
        case 'NONE':
          className = 'none';
          title = '銘謝惠顧';
          break;
        default:
          alert(errorMessage);
      }
      background.classList.add(className);
      prizeBlock.classList.add('hide');
      prizeResult.classList.remove('hide');
      prizeResult.querySelector('h2').innerText = title;
    } else {
      alert(errorMessage);
    }
    request.onerror = () => {
      console.log('error');
      alert(errorMessage);
    };
  });
  request.open(
    'GET',
    'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery',
    true,
  );
  request.send();
});
