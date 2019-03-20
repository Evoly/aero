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
        nav: false,
        margin: 10,
      },
      0: {
        items: 2,
        nav: false,
        margin: 10,
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
  const owlOptions_product = {
    loop: false,
    margin: 10,
    nav: false,
    dot: true,
    items: 1,
    onChange: syncSliders
  };

  $('.js-slider-cert').owlCarousel(owlOptions_6);
  $('.js-slider-project').owlCarousel(owlOptions_4);
  $('.js-slider-feedback').owlCarousel(owlOptions_6);
  $('.js-card-slider').owlCarousel(owlOptions_product);

  const startCarousel = (el, options) => el.owlCarousel(options);
  const stopCarousel = (el) => el.trigger('destroy.owl.carousel');

  $(".js-vertical-slider .nav-slider__item").on('click', function() {
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

  $('.js-next, .js-prev').on('click', function() {
    const slideVisible = $('.js-vertical-slider .visible').toArray();
    const indexFirst = $(slideVisible[0]).index();
    const indexLast = $(slideVisible[slideVisible.length - 1]).index();

    if ($(this).hasClass('js-next')) {
      if (indexLast < (slideTotall - 1)) {
        $('.js-prev .icon').addClass('show');
        $('.js-prev .icon-disabled').removeClass('show');

        $(slideVisible[0]).removeClass('visible');
        $(slideVisible[slideVisible.length - 1]).next().addClass('visible');
        $('.js-vertical-slider .nav-slider__items').css('transform', `translateY(-${step * (indexFirst + 1)}px)`);
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
        $('.js-vertical-slider .nav-slider__items').css('transform', `translateY(-${step * (indexFirst - 1)}px)`);
      } else {
        $('.js-prev .icon').removeClass('show');
        $('.js-prev .icon-disabled').addClass('show');
      }
    }
    return;
  });

  function syncSliders(event) {
    event_name = event.property.name;
    if (event_name == 'position') {
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

  if ($(window).width() > 970) {
    startCarousel($('.js-main-slider'), owlOptions_1);
  }
  $(window).resize(function() {
    if ($(window).width() < 970) {
      stopCarousel($('.js-main-slider'));
    } else {
      startCarousel($('.js-main-slider'), owlOptions_1);
    }
  });

  //scroll
  $('#choiceCity').on('shown.bs.modal', function() {
    const container = $('#choiceCity ul')[0];
    const ps = new PerfectScrollbar(container);
  });

  $('#set-tab').on('shown.bs.tab', function(e) {
    const container = $('.tab-set')[0];
    const ps = new PerfectScrollbar(container);
  })

  if ($('.catalog-form__group').length > 0) {
    $('.catalog-form__group').each(function() {
      const container = $(this)[0];
      const ps = new PerfectScrollbar(container);
    });
  };

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
      const slider = $(this);

      const input_min = slider.siblings('.inputbox').find('input[data-handler="0"]')[0];
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
    const tab = $('.nav-tabs-lg a[href="' + href + '"]');
    const id = $(href);
    tab.tab('show');

    const top = $(tab).offset().top - 50;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });

  //modal
  //close modal
  $('.js-modal').on('click', function() {
    $(document).mouseup(function(e) {
      const container = $(".modal");
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
      $('.mypopover').css('top', top);
      $('.mypopover').addClass('show');
    }
  });

  const showPopover = (el) => {
    $('.mypopover').removeClass('show');
    const parentTop = $('.catalog-form').offset().top;
    const top = el.offset().top - parentTop - 5;

    $('.mypopover').css('top', top);
    $('.mypopover').addClass('show');
  };

  $('.noUi-handle').on('mouseup', function() {
    showPopover($(this));
  });

  $('.noUi-connects').on('click', function() {
    showPopover($(this));
  });

  $('.js-reset').on('click', function(e) {
    const $this = $(this);
    const form = $this.parents('form');
    form.trigger("reset");
    $('.mypopover').removeClass('show');
  });

  //navbar
  $('.js-dropdown').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.sub-catalog').removeClass('activate');
      const cross = $(this).find('.cross');

    if ($(this).hasClass('show')) {
      $(this).removeClass('show');
      cross.addClass('closed');
    } else {
      $('.js-dropdown').removeClass('show');
      $('.cross').not(cross).addClass('closed');
      $(this).addClass('show');
      cross.removeClass('closed');
    }
});

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
    $('.js-dropdown').removeClass('show');
    $('.js-dropdown').find('.cross').addClass('closed');
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
    const grade = $(this).parent().index()

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

  // валидация форм
  function checkInput(el) {
    const $this = el;
    const value = $this.val();
    const inputType = $this.attr('data-type');

    if (inputType === 'text') {
      if (!value.match(/^[\u0400-\u04FF]*$/)) {
        $this.parent().addClass('has-error');
      } else {
        $this.parent().removeClass('has-error');
      }
    }

    // phone
    if (inputType === 'tel') {
      const tel = value.replace(/[^0-9]/g, '');
      if (tel.length !== 11) {
        $this.parent().addClass('has-error');
      } else {
        $this.parent().removeClass('has-error');
      }
    }
    //проверка на пустое значение
    if (el.prop('required') && value === '') {
      $this.parent().addClass('has-error');
    }
  }

  $(document).on('input', '.modal-body input', function() {
    $(this).parent().removeClass('has-error');
    checkInput($(this));
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
    const input = form.find('input');
    const textarea = form.find('textarea');

    input.each(function() {
      checkInput($(this));
    });
    textarea.each(function() {
      checkInput($(this));
    });

    if (!form.find('.has-error').length) {
      $.ajax({
        type: 'POST',
        url: `${url}?_format=json`,
        data: JSON.stringify(form.serializeFormJSON()),
        contentType: 'application/json'
      });
      $('.modal').modal('hide');
    }

  });

  $(function() {
    const $this = $("[data-timer]");
    if ($this.length < 1) return;
    const timerDescription = $this.prop('title');
    let dateArr = $this.data("timer").split(",");
    dateArr = $.map(dateArr, function(elem) {
      return parseInt(elem);
    });

    dateArr[1]--;
    const date = new Date(dateArr[0], dateArr[1], dateArr[2], dateArr[3], dateArr[4], dateArr[5]);

    $this.countdown({
      until: date,
      padZeroes: true
    });
  });

  $('input[name="tel"]').inputmask({
    "mask": "+7 (999) 999-9999"
  });


  if ($('.article__content').length > 0) {

    // nav width
    const navWidth = $('.article .nav').parent().innerWidth();
    $('.article .nav').css('width', navWidth);
    $(window).on('resize', () => {
      const navWidth = $('.article .nav').parent().innerWidth();
      $('.article .nav').css('width', navWidth);
    });
    // формируем меню статьи
    const articleTitle = $('.article__content h2');
    let counter = 1;
    articleTitle.each(function() {
      let id = 'item_' + counter + '';
      $(this).attr('id', id);
      const navText = $(this).html();
      const navItem = '<li><a class="product-list__item list-triangle__link" href="' + id + '" title="' + navText + '">' + navText + '</a></li>';
      $('.article__nav .product-list').append(navItem);
      counter += 1;
    });
  }
  $(document).on("click", '.article__nav a', function(event) {
    event.preventDefault();
    $('.article__nav li').removeClass('active')
    const id = $(this).attr('href'),
      top = $('#' + id + '').offset().top;
    $(this).parent().addClass('active');
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
  if ($('.article__nav').length > 0) {
    const container = $('.article__nav .product-list')[0];
    const ps = new PerfectScrollbar(container);
  };
  $(window).scroll(function() {
    const scroll = $(window).scrollTop();
    if (scroll >= 370) {
      $(".js-fixed").addClass("fixed");
    } else {
      $(".js-fixed").removeClass("fixed");
    }
  });

  //fancybox + thumb slider

  const createThumbSlider = () => {

    const viewportHeight = $('.fancybox-container').height();
    const imgHeight = $('.fancybox-thumbs-y li').height();
    const listHeight = $('.fancybox-thumbs-y ul').height();

    //300 - отступы снизу и сверху , 10 -margin bottom
    const slide = Math.round((viewportHeight - 300) / (imgHeight + 10));
    let thumbHeight = slide * imgHeight + (slide - 1) * 10 + 100;

    if (thumbHeight > listHeight) {
      thumbHeight = listHeight;
    } else {
      if (!($(".button-thumb").length)) {
        $('.fancybox-thumbs-y').addClass('button-show');
        $('.fancybox-thumbs-outer').prepend('<div class="button-thumb button-thumb_up"><button class="fancybox-button fancybox-button--arrow_up">' +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 792.033 792.033"><path d="M617.858,370.896L221.513,9.705c-13.006-12.94-34.099-12.94-47.105,0c-13.006,12.939-13.006,33.934,0,46.874     l372.447,339.438L174.441,735.454c-13.006,12.94-13.006,33.935,0,46.874s34.099,12.939,47.104,0l396.346-361.191     c6.932-6.898,9.904-16.043,9.441-25.087C627.763,386.972,624.792,377.828,617.858,370.896z"/></svg>' +
          "</button></div>");
        $('.fancybox-thumbs-outer').append('<div class="button-thumb button-thumb_down"><button class="fancybox-button fancybox-button--arrow_down">' +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 792.033 792.033"><path d="M617.858,370.896L221.513,9.705c-13.006-12.94-34.099-12.94-47.105,0c-13.006,12.939-13.006,33.934,0,46.874     l372.447,339.438L174.441,735.454c-13.006,12.94-13.006,33.935,0,46.874s34.099,12.939,47.104,0l396.346-361.191     c6.932-6.898,9.904-16.043,9.441-25.087C627.763,386.972,624.792,377.828,617.858,370.896z"/></svg>' +
          "</button></div>");
      }
    };
    $('.fancybox-thumbs-outer').css('height', thumbHeight).css('margin-top', (viewportHeight - thumbHeight) / 2);
    return slide;
  }

  const fancyboxSync = () => {
    const activeSlide = $('.fancybox-thumbs-active');
    const slide = createThumbSlider();

    $('.fancybox-thumbs-y .visible').removeClass('visible');
    activeSlide.addClass('visible');

    const currentIndex = activeSlide.index();
    let step = 0;


    if (currentIndex > (activeSlide.siblings().length-2)){
      step = currentIndex - slide + 2;
    } else {
      step = currentIndex - slide + 1;
    }

    if (currentIndex < slide - 2) {
      for (let i = 0; i < slide - 1; i++) {
        activeSlide.siblings().eq(i).addClass('visible');
      }
     } else {
      for (let i = (currentIndex - slide + 2); i < (currentIndex + 1); i++) {
        activeSlide.siblings().eq(i).addClass('visible');
      };
    }
    goto(step);
};

  const goto = (step) => {
    const itemNav = $('.fancybox-thumbs-y ul');
    const imgHeight = $('.fancybox-thumbs-y li').height();
    $(itemNav).css('transform', `translateY(-${step * (imgHeight + 10)}px)`);
  };

  $(document).on('click', '.fancybox-thumbs-y li', function () {
    $.fancybox.getInstance().Thumbs.update();
    fancyboxSync();
    const slideVisible = $('.fancybox-thumbs-y .visible').toArray();
    const indexFirst = $(slideVisible[0]).index();
    goto(indexFirst);
  });

  $(document).on('click', '.button-thumb_up button', function (){
    const slideVisible = $('.fancybox-thumbs-y .visible').toArray();
    const indexFirst = $(slideVisible[0]).index();
    const indexLast = $(slideVisible[slideVisible.length - 1]).index();

    if (indexFirst === 0) {
      $('.button-thumb_up button').prop('disabled', 'disabled');
    }

    $(slideVisible[0]).prev().addClass('visible');
    $(slideVisible[slideVisible.length - 1]).removeClass('visible');

    const step = (indexFirst - 1);

    goto(step);

    $('.button-thumb_down button').prop('disabled', '');
  })

  $(document).on('click', '.button-thumb_down button', function () {
    const slideVisible = $('.fancybox-thumbs-y .visible').toArray();
    const indexFirst = $(slideVisible[0]).index();
    const indexLast = $(slideVisible[slideVisible.length - 1]).index();

    if (indexLast > ($('.fancybox-thumbs-y li').length - 3)) {
      $('.button-thumb_down button').prop('disabled', 'disabled');
    };

    $(slideVisible[0]).removeClass('visible');
    $(slideVisible[slideVisible.length - 1]).next().addClass('visible');

    const step = (indexFirst + 1);

    goto(step);

    $('.button-thumb_up button').prop('disabled', '');
  });

    const checkButtons = () => {
      $('.button-thumb_up button, .button-thumb_down button').prop('disabled', '');

      const slideVisible = $('.fancybox-thumbs-y .visible').toArray();
      const indexLast = $(slideVisible[slideVisible.length - 1]).index();

      if ($('.visible').eq(0).index() === 0) {
        $('.button-thumb_up button').prop('disabled', 'disabled');
      };

      if (indexLast === ($('.fancybox-thumbs-y li').length - 1)) {
        $('.button-thumb_down button').prop('disabled', 'disabled');
      };
    };

  const fancyOpts = {
    animationEffect: 'fade',
    transitionEffect: false,
    clickContent: false,
    buttons: [
      "close"
    ],
    thumbs: {
      autoStart: true,
      axis: 'y',
      parentEl: '.fancybox-thumbs-outer',
    },
    idleTime: false,
    btnTpl: {
      close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' +
        "</button>",
      arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 792.033 792.033"><path d="M617.858,370.896L221.513,9.705c-13.006-12.94-34.099-12.94-47.105,0c-13.006,12.939-13.006,33.934,0,46.874     l372.447,339.438L174.441,735.454c-13.006,12.94-13.006,33.935,0,46.874s34.099,12.939,47.104,0l396.346-361.191     c6.932-6.898,9.904-16.043,9.441-25.087C627.763,386.972,624.792,377.828,617.858,370.896z"/></svg>' +
        "</button>",
      arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 792.033 792.033"><path d="M617.858,370.896L221.513,9.705c-13.006-12.94-34.099-12.94-47.105,0c-13.006,12.939-13.006,33.934,0,46.874     l372.447,339.438L174.441,735.454c-13.006,12.94-13.006,33.935,0,46.874s34.099,12.939,47.104,0l396.346-361.191     c6.932-6.898,9.904-16.043,9.441-25.087C627.763,386.972,624.792,377.828,617.858,370.896z"/></svg>' +
        "</button>",
    },
    onThumbsShow: createThumbSlider,
    onInit: function(instance) {
      instance.$refs.container.append('<div class="fancybox-thumbs-outer"></div>');
    },
    afterLoad: fancyboxSync,
    afterShow: checkButtons
  };

  $('[data-fancybox="certificate"]').fancybox(fancyOpts);
  $('[data-fancybox="feedback"]').fancybox(fancyOpts);
  $('[data-fancybox="card-slider"]').fancybox(fancyOpts);

// $(document).on('mouseover', '.fancybox-button-outer', function (e) {
//   e.preventDefault();
//   e.stopPropagation();
//     alert('mouse');
//   })
//   $(document).on('click', '.fancybox-button-outer', function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     alert('123');
//     console.log($(this));
//     $(this).children('fancybox-button').trigger('click');
//   });

  $(window).resize(function() {
    if ($(window).width() > 768) {
      $.fancybox.getInstance().Thumbs.update();
    }
  });

  if ($('.trancate-block__content').length > 0) {
    const height = $('.trancate-block__content').outerHeight();

    if (height > 45) {
      $('.js-truncate').css('display', 'block');
    }
  }

  $('.js-truncate').on('click', function (e) {
    e.preventDefault();
    $(this).siblings('.trancate-block__content').toggleClass('show');
  });
});
