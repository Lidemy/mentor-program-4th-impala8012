/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
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
  // 選取必填的 radio btn
  if (radios[0].checked === false && radios[1].checked === false) {
    document
      .querySelector('.signup__type2')
      .nextElementSibling.classList.remove('hide-error');
    noValue = true;
  } else {
    document
      .querySelector('.signup__type2')
      .nextElementSibling.classList.add('hide-error');
  }
  // === true
  if (noValue) {
    alert('有打星號的資料沒有填到喔~(☉д⊙)');
    e.preventDefault();
  } else {
    alert(
      `
    資料填寫完畢
    你的暱稱 : ${inputs[0].value} \n
    電子郵件: ${inputs[1].value} \n
    手機號碼: ${inputs[2].value} \n
    報名類型為: ${document.querySelector("input[type='radio']:checked").id} \n
    得知來源: ${inputs[5].value} \n
    其他: ${inputs[6].value}
    `,
    );
  }
});
