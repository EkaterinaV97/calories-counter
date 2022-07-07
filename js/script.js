import Counter from '../js/module/count.js'


const countCalories = document.querySelectorAll('.counter');

countCalories.forEach((element) => {
  const counter = new Counter(element);
  counter.init();
});