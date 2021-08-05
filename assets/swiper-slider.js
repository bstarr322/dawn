class SwiperJsComponent extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('[data-swiper-slider]');
    this.previousButton = this.querySelector('[data-slider-previous]');
    this.nextButton = this.querySelector('[data-slider-next]');

    this.swiperInstance = null;

    if (this.slider) {
      this.init();
    }
  }

  init() {
    const { swiperDestroy } = this.slider.dataset;

    if (typeof swiperDestroy === 'undefined' || (swiperDestroy === 'mobile-down' && window.innerWidth >= 750) || (swiperDestroy === 'mobile-up' && window.innerWidth < 750)) {
      this.swiperInstance = this.initSwiper(this.slider)

      window.addEventListener('resize', () => {
        if (swiperDestroy == 'mobile-down' && window.innerWidth < 750 && typeof this.swiperInstance !== 'undefined') {
          this.swiperInstance.destroy()
        } else {
          if (typeof this.swiperInstance === 'undefined' || this.swiperInstance === null || this.swiperInstance.destroyed) {
            this.swiperInstance = this.initSwiper(this.slider)
          }
        }
      });
    }
  }

  initSwiper() {
    const { swiperDestroy, slidesPerView, slidesPerViewTablet, slidesPerViewMobile, slidesGroup, slidesSpeed, slidesSpeedMobile, slidesLoop } = this.slider.dataset;
    console.log(slidesGroup=='true')
    const sliderInstance = new Swiper(this.slider, {
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
    });
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
