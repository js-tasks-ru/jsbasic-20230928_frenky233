import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
  }

  render(){
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map( item => 
            createElement(
            `<div class="carousel__slide" data-id="${item.id}">
              <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${item.price.toFixed(2)}</span>
                <div class="carousel__title">${item.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>`).outerHTML).join('')
          }
        </div>
      </div>
    `)

    this.initialization();

    this.elem.addEventListener('click', this.onClick);
  }

  initialization(){
    this.carouselSlider = this.elem.querySelector('.carousel__inner');
    this.carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    this.carouselArrowLeft.style.display = 'none';
    this.currentPosition = 0;
  }
  
  onClick = (event) => {
    let target = event.target.closest('div');
    let button = event.target.closest('button');

    if(target.classList.contains('carousel__arrow')){
      if(target.classList.contains('carousel__arrow_right')){
          this.currentPosition -= this.carouselSlider.offsetWidth;
      }
      else if(target.classList.contains('carousel__arrow_left')){
        this.currentPosition += this.carouselSlider.offsetWidth;
      }
      this.carouselSlider.style.transform = `translateX(${this.currentPosition}px)`;
      
      this.carouselArrowLeft.style.display = '';
      this.carouselArrowRight.style.display = '';
      if(!this.currentPosition){
          this.carouselArrowLeft.style.display = 'none';
      }
      if(this.currentPosition === -(this.slides.length - 1) * this.carouselSlider.offsetWidth){
          this.carouselArrowRight.style.display = 'none';
      }
    }

    if(button){
      let add = new CustomEvent(
        "product-add", {
          detail: this.slides[Math.abs(this.currentPosition / this.carouselSlider.offsetWidth)].id,
          bubbles: true}
      );
    
      this.elem.dispatchEvent(add);
    }
  }
}
