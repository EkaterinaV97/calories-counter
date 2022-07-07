import {formatNumber} from '../format/number.js';

export default class Result {
    constructor(element) {
      this.counter = element;
      this.root = element.querySelector(".counter__result");
      this.minimalCalories = this.root.querySelector("#calories-minimal");
      this.maximalCalories = this.root.querySelector("#calories-maximal");
      this.normCalories = this.root.querySelector("#calories-norm");
    }
  
    show(calories) {
      this.normCalories.textContent = formatNumber(calories.normal);
      this.maximalCalories.textContent = formatNumber(calories.max);
      this.minimalCalories.textContent = formatNumber(calories.min);
      this.root.classList.remove("counter__result--hidden");
    }
  
    hide() {
      this.normCalories.textContent = 0;
      this.maximalCalories.textContent = 0;
      this.minimalCalories.textContent = 0;
      this.root.classList.add("counter__result--hidden");
    }
  }