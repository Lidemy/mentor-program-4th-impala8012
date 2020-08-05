document.querySelector('.faq').addEventListener('click', (e) => {
  const element = e.target.closest('.faq__block');
  if (element) {
    const ans = element.querySelector('p');
    ans.classList.toggle('hidden');
  }
});
