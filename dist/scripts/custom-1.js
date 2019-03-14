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

  $('.js-slider-cert').owlCarousel(owlOptions_6);
  $('.js-slider-project').owlCarousel(owlOptions_4);
  $('.js-slider-feedback').owlCarousel(owlOptions_6);

//   const fancyOpts = {
//     animationEffect: 'fade',
//     transitionEffect: false,
//     infobar: true,
//     arrows: false,
//     toolbar: false,
//     loop: false,
//     afterLoad: function(instance, current) {
//       if (instance.group.length > 1 && current.$content) {
//         const arrowLeft = '<a data-fancybox-next = "" class="btn-fancybox button-next " href="javascript:;"><i class="icon s-right"></i></a>';
//         const arrowRight = '<a data-fancybox-prev = "" class=" btn-fancybox button-prev" href="javascript:;"><i class="icon s-left"></i></a>';
//         current.$content.append(arrowLeft + arrowRight);
//
//         if (current.index === 0) {
//           $('.button-prev').addClass('disabled');
//         }
//         if (current.index === instance.group.length - 1) {
//           $('.button-next').addClass('disabled');
//         }
//       }
//     }
// };

  $('[data-fancybox="certificate"]').fancybox();
  $('[data-fancybox="feedback"]').fancybox();
  $('[data-fancybox="certificate"]').fancybox({
    closeOpacity : false,
    transitionEffect: false,
    animationEffect: 'fade',
    buttons: [
      "close"
    ],
    thumbs : {
      autoStart : true,
      axis      : 'y'
    },
    idleTime: false,
    maxWidth: "95%",
    btnTpl: {
      arrowLeft:
      '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 792.033 792.033"><path d="M617.858,370.896L221.513,9.705c-13.006-12.94-34.099-12.94-47.105,0c-13.006,12.939-13.006,33.934,0,46.874     l372.447,339.438L174.441,735.454c-13.006,12.94-13.006,33.935,0,46.874s34.099,12.939,47.104,0l396.346-361.191     c6.932-6.898,9.904-16.043,9.441-25.087C627.763,386.972,624.792,377.828,617.858,370.896z"/></svg>' +
      "</button>",
      arrowRight:
      '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 792.033 792.033"><path d="M617.858,370.896L221.513,9.705c-13.006-12.94-34.099-12.94-47.105,0c-13.006,12.939-13.006,33.934,0,46.874     l372.447,339.438L174.441,735.454c-13.006,12.94-13.006,33.935,0,46.874s34.099,12.939,47.104,0l396.346-361.191     c6.932-6.898,9.904-16.043,9.441-25.087C627.763,386.972,624.792,377.828,617.858,370.896z"/></svg>' +
      "</button>",
    },
    afterShow: function( instance, current ) {
      const container = $('.fancybox-thumbs__list')[0];
      const ps = new PerfectScrollbar(container);
    },
    beforeClose: function(instance, current){
      const index = current.index;
      //$('.js-slider-cert').trigger('to.owl', index);
    },
  });

});
