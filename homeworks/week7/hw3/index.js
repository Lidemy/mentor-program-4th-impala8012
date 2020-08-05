// 新增代辦事項
document.querySelector('.add__item').addEventListener('keypress', (e) => {
  if (e.which === 13) {
    const txt = document.querySelector("input[type='text']").value;
    if (!txt) {
      e.preventDefault();
    } else {
      const div = document.createElement('div');
      div.classList.add('list');
      div.innerHTML = `
          <div class="item">
            <input type="checkbox" class="checkbox" />
            <p class="content">${txt}</p>
            <i class="far fa-trash-alt close__btn"></i>
          </div>
          `;
      document.querySelector('.list__container').appendChild(div);
      document.querySelector('.add__item').value = '';
    }
  }
});

document.querySelector('.list__container').addEventListener('click', (e) => {
  // 刪除代辦事項
  if (e.target.classList.contains('close__btn')) {
    e.target.parentNode.parentNode.remove();
  }

  // 設定以完成
  if (e.target.type === 'checkbox') {
    const element = e.target.closest('.item');
    if (element) {
      element.querySelector('.content').classList.toggle('complete');
    }
  }
});
