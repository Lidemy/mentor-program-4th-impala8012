/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const requiredInput = document.querySelectorAll(
    ".required + input[type='text']",
  );
  const inputs = document.querySelectorAll('input');
  const radios = document.querySelectorAll("input[type='radio']");
  let noValue = false;
  // 選取所有必填的input(radio btn 除外)
  for (let i = 0; i < requiredInput.length; i++) {
    if (!requiredInput[i].value) {
      requiredInput[i].nextElementSibling.classList.remove('hide-error');
      noValue = true;
    } else {
      requiredInput[i].nextElementSibling.classList.add('hide-error');
    }
  }

  let radioContent;
  // 選取必填的 radio btn
  const checkValue = [...radios].some(radio => radio.checked);
  if (checkValue) {
    document
      .querySelector('.signup__type2')
      .nextElementSibling.classList.add('hide-error');
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        radioContent = radios[i].id;
      }
    }
  } else {
    document
      .querySelector('.signup__type2')
      .nextElementSibling.classList.remove('hide-error');
    noValue = true;
  }

  const info = {
    nickname: inputs[0].value,
    email: inputs[1].value,
    phone: inputs[2].value,
    type: radioContent,
    source: inputs[5].value,
    others: inputs[6].value,
  };
  // === true
  if (noValue) {
    alert('有打星號的資料沒有填到喔~(☉д⊙)');
    e.preventDefault();
  } else {
    alert(
      `
    資料填寫完畢
    你的暱稱 : ${info.nickname},
    電子郵件: ${info.email},
    手機號碼: ${info.phone},
    報名類型為: ${info.type}
    得知來源: ${info.source},
    其他: ${info.others}
    `,
    );
  }
});
