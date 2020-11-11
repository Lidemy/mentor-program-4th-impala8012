const background = document.querySelector('.background');
const prizeBlock = document.querySelector('.prize__block');
const prizeResult = document.querySelector('.prize__result');
const btn = document.querySelector('.btn-prize');

function checkStatus(response) {
  if (response.status >= 200 && response.status < 400) {
    return response.json();
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function getPrize(data) {
  const { name, content, imgURL } = data;
  prizeBlock.classList.add('hide');
  prizeResult.classList.remove('hide');
  prizeResult.querySelector('h2').innerText = name;
  prizeResult.querySelector('p').innerText = content;
  background.style.background = `url(${imgURL}) center / cover no-repeat`;
}

function getPrizeAPI() {
  return fetch('/prize')
    .then(checkStatus)
    .then(getPrize)
    .catch((err) => {
      console.log('STH WENT WRONG', err);
    });
}

btn.addEventListener('click', getPrizeAPI);
