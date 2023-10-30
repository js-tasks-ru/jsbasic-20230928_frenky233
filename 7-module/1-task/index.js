import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
  }

  render(){
    this.elem = createElement(
      `<div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner">
          ${this.categories.map(item =>
            createElement(
              `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`
            ).outerHTML).join('')
          }
        </nav>
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>`
    );

    this.initialization();

    this.elem.addEventListener('click', this.onClick)
  }

  initialization(){
    this.ribbonSlider = this.elem.querySelector('.ribbon__inner');
    this.ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    
    this.ribbonArrowRight.classList.add('ribbon__arrow_visible');
    
    this.activeItem = this.elem.querySelector('.ribbon__item');
    this.activeItem.classList.add('ribbon__item_active');
  }

  onClick = (event) => {
    let arrow = event.target.closest('button');
    let item = event.target.closest('a');

    if(arrow){
      if(arrow.classList.contains('ribbon__arrow')){
        if(arrow.classList.contains('ribbon__arrow_left')){
          this.ribbonSlider.scrollBy(-350, 0);
        }
        else if(arrow.classList.contains('ribbon__arrow_right')){
          this.ribbonSlider.scrollBy(350, 0);
        }
        
        this.ribbonArrowLeft.classList.add('ribbon__arrow_visible');
        this.ribbonArrowRight.classList.add('ribbon__arrow_visible');

        this.ribbonSlider.addEventListener('scroll', () => {
          if(!this.ribbonSlider.scrollLeft){
            this.ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
          }
          if(this.ribbonSlider.scrollWidth - this.ribbonSlider.scrollLeft - this.ribbonSlider.clientWidth < 1){
            this.ribbonArrowRight.classList.remove('ribbon__arrow_visible');
          }
        })
      }
    }

    if(item){
      if(item != this.activeItem){
        event.preventDefault();
        item.classList.add('ribbon__item_active');
        this.activeItem.classList.remove('ribbon__item_active');
        this.activeItem = item;

        let add = new CustomEvent(
          "ribbon-select", {
            detail: item.dataset.id,
            bubbles: true}
        );
      
        this.elem.dispatchEvent(add);
      }
    }
  }
}
