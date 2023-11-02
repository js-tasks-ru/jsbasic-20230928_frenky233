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
    this.elem.addEventListener('click', this.onClick);
    this.thumbSlider.addEventListener('pointerdown', this.onPointerDown);
  }

  addSteps(){
    const stepsWrapper = this.elem.querySelector('.slider__steps');
    for(let i = 0; i < this.steps; i++){
      stepsWrapper.append(
        createElement('<span></span>')
      );
    };
  }

  initialization(){
    this.thumbSlider = this.elem.querySelector('.slider__thumb');
    this.thumbValue = this.elem.querySelector('.slider__value');
    this.progressBar = this.elem.querySelector('.slider__progress');
    this.stepsHolder = this.elem.querySelectorAll('.slider__steps span');
    this.prevValue = this.value;

    this.moveSlider(this.value / (this.steps - 1));

    this.thumbSlider.ondragstart = () => false;
  }

  onClick = (event) => {
    this.changeSliderValue(Math.round(((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth) * (this.steps - 1)) / (this.steps - 1));
  }

  onPointerDown = () => {
    this.elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = (event) => {
    this.moveSlider((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth);
  }

  onPointerUp = (event) => {
    this.changeSliderValue((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth);
    
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointerup', this.onPointerUp);
    document.removeEventListener('pointermove', this.onPointerMove);
  }

  checkValue(value){
    if(value < 0){
      return 0;
    }
    else if(value > 1){
      return 1;
    }
    return value;
  }

  moveSlider(value){
    value = this.checkValue(value);

    this.thumbValue.textContent = Math.round(value * (this.steps - 1)) + 1;
    this.progressBar.style.width = value * 100 + '%';
    this.thumbSlider.style.left = value * 100 + '%';
    this.stepsHolder[this.prevValue].classList.remove('slider__step-active');
    this.prevValue = Math.round(value * (this.steps - 1));
    this.stepsHolder[Math.round(value * (this.steps - 1))].classList.add('slider__step-active');
  }

  changeSliderValue(value){
    value = Math.round(value * (this.steps - 1)) / (this.steps - 1);
    this.moveSlider(value);
    value = this.checkValue(value);

    if(value * (this.steps - 1) != this.value){
      this.value = this.prevValue;

      let change = new CustomEvent(
        "slider-change", {
          detail: Math.abs(value * (this.steps - 1)),
          bubbles: true}
      );
      this.elem.dispatchEvent(change);
    }
  }
}
