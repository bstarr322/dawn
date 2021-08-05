class CollectionListComponent extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('[data-swiper-slider]');
    this.thumbSlider = this.querySelector('[data-swiper-thumb-slider]');

    this.previousButton = this.thumbSlider.querySelector('[data-slider-previous]');
    this.nextButton = this.thumbSlider.querySelector('[data-slider-next]');

    this.sliderInstance = null;
    this.thumbSliderInstance = null;

    if (this.slider) {
      this.initSlider();
    }
  }

  initSlider() {
    this.thumbSliderInstance = new Swiper(this.thumbSlider, {
      spaceBetween: 0,
      slidesPerView: 1,
      speed: 300,
      effect: "fade",
      allowTouchMove: false,
    });

    this.sliderInstance = new Swiper(this.slider, {
      spaceBetween: 0,
      slidesPerView: 'auto',
      speed: 600,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        750: {
          centeredSlides: false,
          loop: false
        }
      },
      thumbs: {
        swiper: this.thumbSliderInstance
      },
      mousewheel: {
        forceToAxis: true
      },
    });

    this.initEvents();
  }

  initEvents() {
    // previous
    if(this.previousButton != null) {
      this.previousButton.addEventListener('click', () => {
        this.sliderInstance.slidePrev();
      });
    }

    // next
    if(this.nextButton != null) {
      this.nextButton.addEventListener('click', () => {
        this.sliderInstance.slideNext();
      });
    }
  }
}

customElements.define('collection-list-component', CollectionListComponent);
