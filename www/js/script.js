'use strict';

// test
$('.test').animate({ opacity: 0 }, 1000);

setTimeout(function () {
  $('.test').animate({ opacity: 1 }, 1000);
}, 1000);

// accordion
$('.accordion__ttl').on('click', function () {
  $(this).stop().add($(this).next()).toggleClass('open');
});