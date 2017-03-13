'use strict';

$(function () {

  $('.test').animate({ opacity: 0 }, 1000);

  setTimeout(function () {
    $('.test').animate({ opacity: 1 }, 1000);
  }, 1000);
});