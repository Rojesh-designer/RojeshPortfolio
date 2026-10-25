(function($) {
    "use strict";

    $(document).ready(function() {
      // Isotope Grid
      initIsotope();

      // Lightbox configuration
      if (typeof lightbox !== 'undefined') {
        lightbox.option({
          'resizeDuration': 200,
          'wrapAround': true,
          'fitImagesInViewport': true
        });
      }

      // Testimonial Swiper
      if (typeof Swiper !== 'undefined') {
        var testimonialSwiper = new Swiper(".testimonial-swiper", {
          spaceBetween: 24,
          pagination: {
            el: ".testimonial-swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 2,
            }
          },
        });
      }

      // Navbar scroll effect
      $(window).on('scroll', function() {
        if ($(window).scrollTop() > 30) {
          $('.floating-nav').addClass('nav-scrolled');
        } else {
          $('.floating-nav').removeClass('nav-scrolled');
        }
      });
      $(window).trigger('scroll');

      // Smooth scroll for hash links
      $('a[href^="#"]').on('click', function(e) {
        var targetHref = $(this).attr('href');
        if (targetHref && targetHref.length > 1 && $(targetHref).length) {
          e.preventDefault();
          $('html, body').stop().animate({
            scrollTop: $(targetHref).offset().top - 80
          }, 500);

          // Close offcanvas if open
          var offcanvasEl = document.getElementById('offcanvasNavbar');
          if (offcanvasEl && typeof bootstrap !== 'undefined') {
            var bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
            if (bsOffcanvas) {
              bsOffcanvas.hide();
            }
          }
        }
      });

    }); // End document ready

    // Init Isotope
    var initIsotope = function() {
      var $grid = $('.grid');
      if (!$grid.length) return;

      var onImagesLoaded = function() {
        var $buttonGroup = $('.button-group');
        var $checked = $buttonGroup.find('.is-checked');
        var initialFilter = $checked.length ? $checked.attr('data-filter') : '*';

        var isotopeInstance = $grid.isotope({
          itemSelector: '.portfolio-item',
          percentPosition: true,
          filter: initialFilter,
          transitionDuration: '0.4s'
        });

        // Filter button click
        $buttonGroup.on('click', 'a', function(e) {
          e.preventDefault();
          var filterValue = $(this).attr('data-filter');
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $(this).addClass('is-checked');
          isotopeInstance.isotope({ filter: filterValue });
        });
      };

      if (typeof $.fn.imagesLoaded !== 'undefined') {
        $grid.imagesLoaded(onImagesLoaded);
      } else {
        onImagesLoaded();
      }
    };

})(jQuery);