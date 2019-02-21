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
  $('.js-card-slider').owlCarousel({
    loop: false,
    margin: 10,
    nav: false,
    dot: true,
    items: 1,
    onChange: syncSliders
  });


  $(".js-vertical-slider .nav-slider__item").on('click', function () {
  const $this = $(this);
  const index = $this.index();
  const items = $(".js-vertical-slider .nav-slider__item");
  items.removeClass('active');
  $this.addClass('active');
  $(".js-card-slider").trigger('to.owl', index);
  return false;
});
const slides = 3;
const step = 100;
const slideTotall = $(".js-vertical-slider .nav-slider__items").children().length;
const slide = $(".js-vertical-slider .nav-slider__item");

for (let i = 0; i < slides; i++) {
  $(slide[i]).addClass('visible');
};

if (slideTotall <= slides) {
  $('.js-next .icon, .js-prev .icon').removeClass('show');
  $('.js-next .icon-disabled, .js-prev .icon-disabled').addClass('show');
} else {
  $('.js-next .icon, .js-prev .icon-disabled').addClass('show');
  $('.js-next .icon-disabled, .js-prev .icon').removeClass('show');
}

$('.js-next, .js-prev').on('click', function () {
  const slideVisible = $('.js-vertical-slider .visible').toArray();
  const indexFirst = $(slideVisible[0]).index();
  const indexLast = $(slideVisible[slideVisible.length - 1]).index();

  if ($(this).hasClass('js-next')) {
    if (indexLast < (slideTotall - 1)) {
      $('.js-prev .icon').addClass('show');
      $('.js-prev .icon-disabled').removeClass('show');

      $(slideVisible[0]).removeClass('visible');
      $(slideVisible[slideVisible.length - 1]).next().addClass('visible');
      $('.js-vertical-slider .nav-slider__items').css('transform' , `translateY(-${step * (indexFirst + 1)}px)`);
    } else {
      $('.js-next .icon').removeClass('show');
      $('.js-next .icon-disabled').addClass('show');
    }
  }

  if ($(this).hasClass('js-prev')) {
    if (indexFirst > 0) {
      $('.js-next .icon').addClass('show');
      $('.js-next .icon-disabled').removeClass('show');

      $(slideVisible[0]).prev().addClass('visible');
      $(slideVisible[slideVisible.length - 1]).removeClass('visible');
      $('.js-vertical-slider .nav-slider__items').css('transform' , `translateY(-${step * (indexFirst - 1)}px)`);
    } else {
      $('.js-prev .icon').removeClass('show');
      $('.js-prev .icon-disabled').addClass('show');
    }
  }
  return;
})

function syncSliders(event) {
  event_name = event.property.name;
  if(event_name=='position') {
    const currentIndex = event.item.index;
    const nextIndex = event.property.value;

    const items = $(".js-vertical-slider .nav-slider__item");
    items.removeClass('active');
    items.eq(nextIndex).addClass('active');

    if (currentIndex < nextIndex) {
      $('.js-next').trigger('click');
    } else {
      $('.js-prev').trigger('click');
    }
  }
}

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
    const self = this,
      sliders = $('.js-range');

    $('.js-range').each(function() {
      var slider = $(this);

      const input_min = slider.siblings('.inputbox').find('input[data-handler="0"]')[0];
      //console.log('input_min', input_min);
      const input_max = slider.siblings('.inputbox').find('input[data-handler="1"]')[0];

      const inputs = [input_min, input_max];

      const min = parseInt(input_min.getAttribute('min'), 10);
      const max = parseInt(input_max.getAttribute('max'), 10);

      noUiSlider.create(slider.get(0), {
        start: [min, max],
        connect: true,
        tooltips: false,
        range: {
          'min': min,
          'max': max
        }
      });

      slider.get(0).noUiSlider.on('update', function(values, handle) {
        inputs[handle].value = Math.round(values[handle]);
      });

      const iconsLeft = slider.find('.noUi-handle[data-handle="0"]')[0];
      iconsLeft.classList += 'icon range-left';
      const iconsRight = slider.find('.noUi-handle[data-handle="1"]')[0];
      iconsRight.classList += 'icon range-right';

      $('.js-reset').on('click', function() {
        slider.get(0).noUiSlider.reset();
      });

      $(input_min).on('change', function() {
        const inputValue = $(this).val();
        slider.get(0).noUiSlider.set([inputValue, null]);
      });

      $(input_max).on('change', function() {
        const inputValue = $(this).val();
        slider.get(0).noUiSlider.set([null, inputValue]);
      })

    });
  };
// go to
  $(".js-toTabs").on("click", function(event) {
   event.preventDefault();
   const href = $(this).attr('href');
   const tab = $('.nav-tabs-lg a[href="'+href+'"]');
   var id = $(href);
   tab.tab('show');

    var top = $(tab).offset().top-50;
    $('body,html').animate({scrollTop: top}, 1500);
  });

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
      //console.log(top);
      $('.mypopover').css('top', top);
      $('.mypopover').addClass('show');
    }
  });

  $('.noUi-handle').mouseup(function() {
    $('.mypopover').removeClass('show');
    const el = $(this);
    const parentTop = $('.catalog-form').offset().top;
    const top = el.offset().top - parentTop - 5;
    //console.log(top);
    $('.mypopover').css('top', top);
    $('.mypopover').addClass('show');
  });

  $('.js-reset').on('click', function(e) {
    const $this = $(this);
    const form = $this.parents('form');
    form.trigger("reset");
    $('.mypopover').removeClass('show');
  });

  //navbar
  $('.js-sub-catalog[data-id]').on('mouseover', function(e) {
    e.stopPropagation();
    const $this = $(this);
    const id = $this.data('id');
    const elWidth = $this.outerWidth();
    const parentWidth = $this.parents('.navbar-nav').outerWidth();
    const catalogWidth = parentWidth - elWidth;
    $('.navbar__subcatalog').css('width', catalogWidth);
    if (id !== undefined && id > 0) {
      const $sub = $('#sub_' + id);
      if ($sub.length > 0) {
        $('.sub-catalog').not($sub).removeClass('activate');
        $sub.addClass('activate');
      }
    }
  });

  // close
  $('body').on('click', function(e) {
    if ($(e.target).closest('.sub-catalog').length === 0) {
      $('.sub-catalog').removeClass('activate');
    };
    if ($('.sub-catalog').hasClass('activate')) {
      e.stopPropagation();
    }
  });
  $('.dropdown').on('show.bs.dropdown', function() {
    $('.dropdown-toggle').on('click', function(e) {
      $('.sub-catalog').removeClass('activate');
    });
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
    const container = $(".search-result").closest('form');
    if (e.target != container[0] && container.has(e.target).length === 0) {
      $('#header_search_result').text('');
    }
  });

  //rating
  $('.js-stars .icon').on('mouseover', function(e) {
    var grade = $(this).parent().index()

    $(this).parents('.js-stars ').find('.icon').each(function(e) {
      if (e <= grade) {
        $(this).addClass('star-o');
        $(this).removeClass('star');
      } else {
        $(this).removeClass('star-o');
        $(this).addClass('star');
      }
    });
    $(this).click(function() {
      $(this).addClass('star-o').removeClass('star');
      $(this).prevAll().addClass('star-o').removeClass('star');
      $(this).parents('.js-stars ').children('input').val(grade);
    });
  }).on('mouseout', function() {
    $(this).parents('.js-stars ').find('.icon').each(function() {
      $(this).addClass('star');
      $(this).removeClass('star-o');
    });
  });
  $('.js-stars').on('mouseout', function() {
    const inputValue = parseInt($(this).children('input').val(), 10);
    const rating = $(this).children().eq(inputValue);

    if (inputValue > 0) {
      rating.children('.icon').addClass('star-o').removeClass('star');
      rating.prevAll().children('.icon').addClass('star-o').removeClass('star');
    }
  });


  //form
  function serializeFormJSON() {
    const o = {};
    const a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  $.fn.serializeFormJSON = serializeFormJSON;
  $(document).on('click', '.js-submit', function(e) {
    e.preventDefault();
    const $this = $(this);
    const form = $this.parents('form');
    const url = form.attr('action');

    $.ajax({
      type: 'POST',
      url: `${url}?_format=json`,
      data: JSON.stringify(form.serializeFormJSON()),
      contentType: 'application/json'
    });
  });

  $(function () {
      var $this = $("[data-timer]");
      if ($this.length < 1) return;
      var timerDescription = $this.prop('title');
      var dateArr = $this.data("timer").split(",");
      dateArr = $.map(dateArr, function (elem) {
          return parseInt(elem);
      });

      dateArr[1]--;
      var date = new Date(dateArr[0], dateArr[1], dateArr[2], dateArr[3], dateArr[4], dateArr[5]);

      $this.countdown({
          until: date,
          padZeroes: true
      });
  });



});
