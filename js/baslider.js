'use strict';

(function($){
  $.fn.extend({
    beforeAfter: function() {

      $(this).each(function() {

        var baContainer = $(this);
        var percentage = 50;
        var afterImage = $('img:last', baContainer);
        var afterImageH = afterImage.height();
        var afterImageW = afterImage.width();

        $(baContainer).height(afterImageH);

        $('img:first', baContainer).wrap('<div class="ba-slider-before-image"/>').width(afterImageW);
        $('.ba-slider-before-image', baContainer).css({width: percNum(percentage)})
        $('img', baContainer).addClass('ba-slider-image');

        var html = '<div class="ba-control"><div class="ba-control-area"><div class="ba-control-bar"><span class="ba-left-arrow" /><span class="ba-control-handle" /><span class="ba-right-arrow" /></div></div></div>';

        baContainer.append(html);
 
        var slider  = baContainer.find('.ba-control');
        var baBar = slider.find('.ba-control-area');
        var baHoverEl = baContainer.find('*');
        var startOffset, holderOffset, sliderWidth, handleWidth;

        baBar.css({left: percNum(percentage)});

        // EVENTS

        // Resize
        $(window).on('resize', resizeHandler);

        // Drag
        baBar.on('mousedown', function(e) {
          e.preventDefault(); 
          holderOffset = slider.offset().left;
          startOffset = baBar.offset().left - holderOffset;
          sliderWidth = slider.width();
          
          $(document).on('mousemove', moveHandler).on('mouseup', stopHandler);
        });

        // Hover
        baContainer.on('mouseover', function(e) {
          $('.ba-left-arrow, .ba-right-arrow, .ba-control-handle', baContainer).filter(':not(:animated)').fadeIn();
        });
        baContainer.on('mouseleave', function(e) {
             $('.ba-left-arrow, .ba-right-arrow, .ba-control-handle', baContainer).fadeOut();
        });

        // Click
        baContainer.on('click', function(e) {
          e.preventDefault(); 
          var clickX = e.pageX - $(this).offset().left;
          var posP = (clickX / slider.width())*100;

          var posX = Math.round(Math.min(Math.max(0, posP), 100));

          baBar.stop().animate({
            left: percNum(posX)
          });

          $('.ba-slider-before-image', baContainer).stop().animate({
            width: percNum(posX)
          });           
        });

        baContainer.on('touchmove', function(e) {
          e.preventDefault(); 

          var touchX = e.originalEvent.targetTouches[0].pageX;
          var clickX = touchX - slider.offset().left;
          var posP = (clickX / slider.width())*100;

          var posX = Math.round(Math.min(Math.max(0, posP), 100));

          baBar.css({
            left: percNum(posX)
          });

          $('.ba-slider-before-image', baContainer).width(percNum(posX));
        });

        // FUNCTIONS
        function moveHandler(e) {
          var posX = e.pageX - holderOffset;
          var posP = (posX / sliderWidth)*100;

          posX = Math.floor(Math.min(Math.max(0, posP), 100));
          
          baBar.css({
            left: percNum(posX)
          });

          $('.ba-slider-before-image', baContainer).width(percNum(posX));
        }
        function stopHandler() {
          $(document).off('mousemove', moveHandler).off('mouseup', stopHandler);
        }
        function resizeHandler(){
          afterImageH = afterImage.height();
          afterImageW = afterImage.width();
          $('.ba-slider', baContainer).height(afterImageH);
          $('.ba-control', baContainer).height(afterImageH);
          $('.ba-slider-before-image img', baContainer).width(afterImageW);
          baContainer.height(afterImageH);
        }
        function percNum(num) {
          return num + '%';
        }

        // Clean up of overflow issues
        resizeHandler();

      });
    }
  });
})(jQuery);