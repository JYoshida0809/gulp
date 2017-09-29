'use strict';

// test
$('.test').animate({ opacity: 0 }, 300);

setTimeout(function () {
  $('.test').animate({ opacity: 1 }, 130);
}, 1500);

// accordion
$('.accordion__ttl').on('click', function () {
  $(this).stop().add($(this).next()).toggleClass('open');
});