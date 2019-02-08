$(document).ready(function() {

  const owlOptions_6 = {
    pagination: false,
    nav: true,
    navText: ['<span class="icon slider-prev"></span><span class="icon slider-prev-disabled"></span>',
      '<span class="icon slider-next"></span><span class="icon slider-next-disabled"></span>'
    ],
    scrollPerPage: true,
    margin: 30,
    responsive: {
      1200: {
        nav: true,
        items: 6
      },
      979: {
        nav: true,
        items: 3
      },
      400: {
        items: 2,
        nav: false
      },
      0: {
        items: 1,
        nav: false
      }
    }
  };
  const owlOptions_4 = {
    pagination: false,
    nav: true,
    navText: ['<span class="icon slider-prev"></span><span class="icon slider-prev-disabled"></span>',
      '<span class="icon slider-next"></span><span class="icon slider-next-disabled"></span>'
    ],
    scrollPerPage: true,
    margin: 30,
    responsive: {
      1200: {
        nav: true,
        items: 4
      },
      979: {
        nav: true,
        items: 2
      },
      400: {
        items: 2,
        nav: false
      },
      0: {
        items: 1,
        nav: false
      }
    }
  };
  const owlOptions_1 = {
    loop: true,
    margin: 10,
    nav: false,
    dot: true,
    items: 1
  };

  $('.js-slider-cert').owlCarousel(owlOptions_6);
  $('.js-slider-project').owlCarousel(owlOptions_4);
  $('.js-slider-feedback').owlCarousel(owlOptions_6);

  // main slider

  const startCarousel = () => $('.js-main-slider').owlCarousel(owlOptions_1);
  const stopCarousel = () => $('.js-main-slider').trigger('destroy.owl.carousel');
  if ($(window).width() > 970) {
    startCarousel();
  }
  $(window).resize(function() {
    if ($(window).width() < 970) {
      stopCarousel();
    } else {
      startCarousel();
    }
  });

  //catalog

  if ($('.catalog-form__group').length > 0) {
    $('.catalog-form__group').scrollbar();
  }

  //  $('.catalog-form__group').scrollbar();

  //map

  if ($('.map').length > 0) {
    ymaps.ready(function() {
      const myMap = new ymaps.Map('map', {
        center: [59.90346452755569, 30.249322752639735],
        controls: ['trafficControl'],
        zoom: 17
      }, {
        searchControlProvider: 'yandex#search',
        suppressMapOpenBlock: true
      });
    });
  }

  //noUi
  if ($('.js-range').length > 0) {
    const rangeSlider0 = document.getElementsByClassName('js-range')[0];
    const rangeSlider1 = document.getElementsByClassName('js-range')[1];

    const rangeSlider0Min = $(rangeSlider0).siblings('.inputbox').find('input[data-handler="0"]')[0];
    const rangeSlider0Max = $(rangeSlider0).siblings('.inputbox').find('input[data-handler="1"]')[0];

    const rangeSlider1Min = $(rangeSlider1).siblings('.inputbox').find('input[data-handler="0"]')[0];
    const rangeSlider1Max = $(rangeSlider1).siblings('.inputbox').find('input[data-handler="1"]')[0];

    const inputs0 = [rangeSlider0Min, rangeSlider0Max];
    const inputs1 = [rangeSlider1Min, rangeSlider1Max];

    const min0 = parseInt(rangeSlider0Min.getAttribute('min'), 10);
    const max0 = parseInt(rangeSlider0Max.getAttribute('max'), 10);

    const min1 = parseInt(rangeSlider1Min.getAttribute('min'), 10);
    const max1 = parseInt(rangeSlider1Max.getAttribute('max'), 10);

    noUiSlider.create(rangeSlider0, {
      start: [min0, max0],
      connect: true,
      tooltips: false,
      range: {
        'min': min0,
        'max': max0
      }
    });

    noUiSlider.create(rangeSlider1, {
      start: [min1, max1],
      connect: true,
      tooltips: false,
      range: {
        'min': min1,
        'max': max1
      }
    });

    const iconsLeft = document.querySelectorAll('.noUi-handle[data-handle="0"]');
    const iconsRight = document.querySelectorAll('.noUi-handle[data-handle="1"]');


    for (i = 0; i < iconsLeft.length; i++) {
      iconsLeft[i].classList += 'icon range-left';
    }

    for (i = 0; i < iconsRight.length; i++) {
      iconsRight[i].classList += 'icon range-right';
    }

    rangeSlider0.noUiSlider.on('update', function(values, handle) {
      inputs0[handle].value = values[handle];
    });

    rangeSlider1.noUiSlider.on('update', function(values, handle) {
      inputs1[handle].value = values[handle];
    });
  }

  //modal
  //close modal
  $('.js-modal').on('click', function() {
    $(document).mouseup(function(e) {
      var container = $(".modal");
      if (e.target != container[0] && container.has(e.target).length === 0) {
        $('.modal').modal('hide')
      }
    });
  });

  $('#confirmCurrentCity').on('click', function() {
    $('.modal').modal('hide');
  });

  // go to choiceCity
  $('#choiceCityBtn').on('click', function() {
    $('.modal').modal('hide');
    $('#choiceCity').modal('show');
  });

  //my popover

  $('[data-toggle="popover"] input').change(function() {
    $('.mypopover').removeClass('show');
    if (this.checked) {
      const el = $(this);
      const parentTop = $('.catalog-form').offset().top;
      const top = el.offset().top - parentTop - 5;
      console.log(top);
      $('.mypopover').css('top', top);
      $('.mypopover').addClass('show');
    }
  });

  //navbar
  $('ul.navbar-dropdown').on('click', function(event) {
    // The event won't be propagated up to the document NODE and
    // therefore delegated events won't be fired
    event.stopPropagation();
  })
  $('.js-sub-catalog[data-id]').on('mouseover', function(e) {
    e.stopPropagation();
    const $this = $(this);
    const id = $this.data('id');
    const elWidth = $this.outerWidth();
    const parentWidth = $this.parents('.navbar-nav').outerWidth();
    const catalogWidth = parentWidth - elWidth;
    $('.navbar__subcatalog').css('width', catalogWidth);
    //console.log('elWidth', parentWidth);
    if (id !== undefined && id > 0) {
      const $sub = $('#sub_' + id);
      if ($sub.length > 0) {
        $('.sub-catalog').not($sub).removeClass('activate');
        $sub.addClass('activate');
      }
    }
  });

  // close windows
  $('body').on('click', function(e) {
    if ($(e.target).closest('.sub-catalog').length === 0) {
      $('.sub-catalog').removeClass('activate');
    };
    if ($('.sub-catalog').hasClass('activate')) {
      e.stopPropagation();
    }
  });
  $(document).keyup(function(e) {
    if (e.key === "Escape") {
      $('.sub-catalog').removeClass('activate');
    }
    if ($('.sub-catalog').hasClass('activate')) {
      e.stopPropagation();
    }
  });

  const searchResult = () => {
    const width = $(window).width();
    const left = $('.js-search').offset().left;
    const elWidth = width - left - 15;
    // console.log(left);
    $('.search-result').css('width', elWidth);
  };

  if ($(window).width() < 992) {
    searchResult();
  }
  $(window).resize(function() {
    if ($(window).width() < 992) {
      searchResult();
    } else {
      $('.search-result').css('width', '');
    }
  });

  $(document).mouseup(function(e) {
    var container = $(".search-result").closest('form');
    if (e.target != container[0] && container.has(e.target).length === 0) {
      $('#header_search_result').text('');
    }
  });



});
