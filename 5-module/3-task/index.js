function initCarousel() {
    const carousel = document.querySelector('[data-carousel-holder]');
    const carouselSlider = document.querySelector('.carousel__inner');
    const carouselArrowLeft = document.querySelector('.carousel__arrow_left');
    const carouselArrowRight = document.querySelector('.carousel__arrow_right');

    let currentPosition = 0;

    carouselArrowLeft.style.display = 'none';
    carousel.addEventListener('click', event =>{
        let target = event.target.closest('DIV');
        if(target.classList.contains('carousel__arrow')){
            if(target.classList.contains('carousel__arrow_right')){
                currentPosition -= carouselSlider.offsetWidth;

            }
            else if(target.classList.contains('carousel__arrow_left')){
                currentPosition += carouselSlider.offsetWidth;
            }
            carouselSlider.style.transform = `translateX(${currentPosition}px)`;
            
            carouselArrowLeft.style.display = '';
            carouselArrowRight.style.display = '';
            if(!currentPosition){
                carouselArrowLeft.style.display = 'none';
            }
            if(currentPosition === -3 * carouselSlider.offsetWidth){
                carouselArrowRight.style.display = 'none';
            }
        }
    });
}