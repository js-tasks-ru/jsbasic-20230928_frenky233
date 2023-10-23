function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let hidingText = document.querySelector('#text');
  button.addEventListener('click', () => hidingText.hidden = !hidingText.hidden);
}
