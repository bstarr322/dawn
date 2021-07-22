class FlickityComponent extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('[data-slider]');
    this.previousButton = this.querySelector('[data-slider-previous]');
    this.nextButton = this.querySelector('[data-slider-next]');
    this.flickityInstance = null;

    if (this.slider) {
      this.init();
    }
  }

  init() {
    const { prevNextButtons, watchCss } = this.slider.dataset;
    this.flickityInstance = new Flickity( this.slider, {
      // options
      cellAlign: 'left',
      contain: true,
      freeScroll: true,
      contain: true,
      prevNextButtons: false,
      pageDots: false,
      watchCSS: watchCss
    });


    this.initEvents();
  }

  initEvents() {
    // previous
    if(this.previousButton != null) {
      this.previousButton.addEventListener('click', () => {
        this.flickityInstance.previous(true);
      });
    }

    // next
    if(this.nextButton != null) {
      this.nextButton.addEventListener('click', () => {
        this.flickityInstance.next(true);
      });
    }
  }
}

customElements.define('flickity-component', FlickityComponent);
