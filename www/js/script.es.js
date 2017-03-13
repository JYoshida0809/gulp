$(() => {

  $('.test').animate({opacity:0},1000);

  setTimeout(() => {
    $('.test').animate({opacity:1},1000)
  },1000);

});
