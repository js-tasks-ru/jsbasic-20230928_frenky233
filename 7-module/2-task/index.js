import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
  }
  
  render() {
    this.elem = createElement(
      `<div class="modal">
        <div class="modal__overlay"></div>
          <div class="modal__inner">
            <div class="modal__header">
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>
              <h3 class="modal__title">
              </h3>
            </div>
            <div class="modal__body">
            </div>
          </div>  
      </div>`
    );
  }

  open(){
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    this.elem.addEventListener('click', this.onClick);
    document.body.addEventListener('keydown', this.escPressed)
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').innerHTML = title;
  }

  setBody(node) {
    this.elem.querySelector('.modal__body').append(node);
  }

  onClick = (event) => {
    const button = event.target.closest('.modal__close');
    if(button){
      this.close();
    }
  }

  escPressed = (event) => {
    if(event.code === 'Escape'){
      document.body.removeEventListener('keydown', this.escPressed)
      this.close();
    }
  }

  close(){
    this.elem.remove();
    document.body.classList.remove('is-modal-open')
  }
}