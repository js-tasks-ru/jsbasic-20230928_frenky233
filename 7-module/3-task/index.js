import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
  }

  render(){
    this.elem = createElement(
      `<div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress""></div>
        <div class="slider__steps">
        </div>
      </div>`
    );

    this.addSteps();
    this.initialization();
    this.elem.addEventListener('click', this.changeSliderValue);
  }

  addSteps(){
    const stepsWrapper = this.elem.querySelector('.slider__steps');
    for(let i = 0; i < this.steps; i++){
      stepsWrapper.append(
        createElement(
          '<span></span>'
        )
      );
    };
  }

  initialization(){
    this.thumbSlider = this.elem.querySelector('.slider__thumb');
    this.thumbValue = this.elem.querySelector('.slider__value');
    this.progressBar = this.elem.querySelector('.slider__progress');
    this.stepsHolder = this.elem.querySelectorAll('.slider__steps span');

    this.thumbSlider.style.left = `${this.value/(this.steps - 1) * 100}%`;
    this.thumbValue.textContent = this.value + 1;
    this.progressBar.style.width = `${this.value/(this.steps - 1) * 100}%`;
    this.stepsHolder[this.value].classList.add('slider__step-active');
  }

  changeSliderValue = (event) => {
    let newValue = Math.abs(Math.round(((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth).toFixed(2) * (this.steps - 1)));

    if(this.value != newValue){
      this.thumbSlider.style.left = `${newValue/(this.steps - 1) * 100}%`;
      this.thumbValue.textContent = newValue + 1;
      this.progressBar.style.width = `${newValue/(this.steps - 1) * 100}%`;
      
      this.stepsHolder[newValue].classList.add('slider__step-active');
      this.stepsHolder[this.value].classList.remove('slider__step-active');
      
      this.value = newValue;

      let change = new CustomEvent(
        "slider-change", {
          detail: newValue,
          bubbles: true}
      );
    
      this.elem.dispatchEvent(change);
    }
  }
}
