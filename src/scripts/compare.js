$(document).ready(function() {

  //определяем высоту ячеек
  var RowHeight = (row) => {
    let maxHeight = 0;

    $('.comparision [data-row="' + row + '"]').each(function() {
      let elHeight = parseInt($(this).outerHeight(), 10);

      if (elHeight > Math.max(maxHeight)) {
        maxHeight = elHeight;
      }
      return maxHeight;
    });

    $('.comparision [data-row="' + row + '"]').css('height', maxHeight);
    $('.comparision-item__column').addClass('visible');
    $('.comparision__names').addClass('visible');
  };

  var SetHeight = () => {
    $('.comparision__name').each(function() {
      let el = $(this).data('row');
      RowHeight(el);
    });
  };

  var owlOptions_compareSlider = {
    margin: 0,
    loop: false,
    autoWidth: true,
    items: 4,
    nav: true,
    navClass: ['owl-prev nav-fixed', 'owl-next nav-fixed'],
    navText: ['<span class="icon arrow-next-sm"></span><span class="icon arrow-next-sm_red"></span>',
      '<span class="icon arrow-next-sm"></span><span class="icon arrow-next-sm_red"></span>'
    ],
    onInitialized: SetHeight,
  };

  $('.js-slider-compare').owlCarousel(owlOptions_compareSlider);

  $(window).resize(function() {
    SetHeight();
  });

  //row:hover

  $('.comparision [data-row]').mouseenter(function() {
    var rowNumber = $(this).data('row');
    $('.comparision [data-row]').filter('[data-row="' + rowNumber + '"]').addClass('hover');
  });

  $('.comparision [data-row]').mouseleave(function() {
    $('.comparision [data-row]').removeClass('hover');
  });

  //product card:hover

  $('.comparision .product-card').mouseenter(function() {
    var currentCard = $(this);
    var nextCard = currentCard.closest('.owl-item').next()
    nextCard.find('.product-card').addClass('hover');;
  });

  $('.comparision .product-card').mouseleave(function() {
    $('.comparision .product-card').removeClass('hover');
  });


  $(window).scroll(function() {
    $('.js-sticky').each(function() {
      var scrolled = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      var top = $(this).offset().top;
      var bottom = $('.comparision').offset().top + $('.comparision').outerHeight();
      var translate = (scrolled) < (bottom - 300) ? (scrolled - top) : (bottom - top - 300);
      var border = $('.product-card__sticky-wrapper').offset().top

      if (scrolled > top) {
        $(this).children().css('transform', 'translateY(' + translate + 'px)');
        $(this).children().addClass("sticky");
        if (scrolled > border) {
          $('.sticky').addClass('sticky_shadow')
        } else {
          $('.sticky').removeClass('sticky_shadow')
        }
      } else {
        $(this).children().css('transform', '');
        $('.sticky').removeClass('sticky_shadow')
        $(this).children().removeClass('sticky');
      }
    });
  });

  if ($('.nav-fixed').length > 0) {
    $('.nav-fixed').each(function() {
      var top = $(this).offset().top;
      var bottom = $(this).offset().top + $(this).outerHeight();
      var iconPOsition = 280; // css
      window.onscroll = function() {
        var scrolled = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var elHeight = $('.nav-fixed').outerHeight();
        if (scrolled > top) {
          var translate = (scrolled) < (bottom - iconPOsition - 60) ? (scrolled - top) : (bottom - iconPOsition - top - 100);
          $('.nav-fixed').css('transform', 'translateY(' + translate + 'px)');
        } else {
          $('.nav-fixed').css('transform', '');

        }
      };
    });
  }

  if ($(window).width() > 768) {
    $('.comparision__header-wrapper').children('.comparision__sticky').addClass('js-sticky');
  }

  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.comparision__header-wrapper').children('.comparision__sticky').removeClass('js-sticky');
    } else {
      $('.comparision__header-wrapper').children('.comparision__sticky').addClass('js-sticky');
    }
  });
});
