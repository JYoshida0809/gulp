// test
$('.test').animate({opacity:0},300);

setTimeout(() => {
  $('.test').animate({opacity:1},130)
},1500);


class Cat {
  constructor(name){
    this.name = name;
  }
  set name(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  walk() {
    console.log(this._name + 'が歩いてます');
  }
}

var cat1 = new Cat('タマ');
cat1.walk();
