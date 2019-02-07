// test
$('.test').animate({opacity:0},300);

setTimeout(() => {
  $('.test').animate({opacity:1},300);
},500);


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
    console.log(this._name + 'が歩いてますね！！');
  }
}


var cat1 = new Cat('タマ！です。');
cat1.walk();
