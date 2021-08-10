class SwiperJsComponent extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('[data-swiper-slider]');
    this.previousButton = this.querySelector('[data-slider-previous]');
    this.nextButton = this.querySelector('[data-slider-next]');

    this.sliderInstance = null;

    if (this.slider) {
      this.init();
    }
  }

  init() {
    const { swiperDestroy } = this.slider.dataset;

    if (typeof swiperDestroy === 'undefined' || (swiperDestroy === 'mobile-down' && window.innerWidth >= 750) || (swiperDestroy === 'mobile-up' && window.innerWidth < 750)) {
      this.sliderInstance = this.initSlider(this.slider)

      window.addEventListener('resize', () => {
        if (swiperDestroy == 'mobile-down' && window.innerWidth < 750 && typeof this.sliderInstance !== 'undefined') {
          this.sliderInstance.destroy()
        } else {
          if (typeof this.sliderInstance === 'undefined' || this.sliderInstance === null || this.sliderInstance.destroyed) {
            this.sliderInstance = this.initSlider(this.slider)
          }
        }
      });
    }
  }

  initSlider() {
    const { swiperDestroy, slidesPerView, slidesPerViewTablet, slidesPerViewMobile, slidesGroup, slidesSpeed, slidesSpeedMobile, slidesLoop, slidesThumbs } = this.slider.dataset;
    const settings = {
      // Optional parameters
      speed: parseInt(slidesSpeed) || 300,
      loop: slidesLoop == 'true' ? true : false,
      spaceBetween: 0,
      slidesPerView: slidesPerViewMobile || 1,
      breakpoints: {
        320: {
          speed: parseInt(slidesSpeedMobile) || 300,
          slidesPerGroup: slidesGroup == 'true' ? slidesPerViewMobile : 1,
        },
        // when window width is >= 750px
        750: {
          speed: parseInt(slidesSpeed) || 300,
          slidesPerView: slidesPerViewTablet ? slidesPerViewTablet : 'auto',
          slidesPerGroup: slidesGroup == 'true' ? slidesPerViewTablet : 2,
        },
        990: {
          slidesPerView: slidesPerView ? slidesPerView : 'auto',
          slidesPerGroup: slidesGroup == 'true' ? slidesPerView : 3,
        }
      },
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },

      mousewheel: {
        forceToAxis: true
      },
    };

    const sliderInstance = new Swiper(this.slider, settings);
    return sliderInstance;
  }

  initEvents() {
    // // previous
    // if(this.previousButton != null) {
    //   this.previousButton.addEventListener('click', () => {
    //     this.flickityInstance.previous(true);
    //   });
    // }

    // // next
    // if(this.nextButton != null) {
    //   this.nextButton.addEventListener('click', () => {
    //     this.flickityInstance.next(true);
    //   });
    // }
  }
}

customElements.define('swiperjs-component', SwiperJsComponent);
