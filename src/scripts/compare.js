$(document).ready(function() {

  //определяем высоту ячеек
  const RowHeight = (row) => {
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

  const SetHeight = () => {
    $('.comparision__name').each(function() {
      let el = $(this).data('row');
      RowHeight(el);
    });
  };

  const owlOptions_compareSlider = {
    margin: 0,
    loop: false,
    autoWidth: true,
    items: 4,
    nav: true,
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
    const rowNumber = $(this).data('row');
    $('.comparision [data-row]').filter('[data-row="' + rowNumber + '"]').addClass('hover');
  });

  $('.comparision [data-row]').mouseleave(function() {
      $('.comparision [data-row]').removeClass('hover');
  });

});
