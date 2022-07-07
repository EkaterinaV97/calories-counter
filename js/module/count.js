import {formatInput} from '../format/input.js';
import Result from '../module/result.js';

const ActivityRatio = {
    Min: 1.2,
    Low: 1.375,
    Medium: 1.55,
    High: 1.725,
    VeryHigh: 1.9
}

const PercentOfNormal = {
    Min: 0.85,
    Max: 1.15
}

const FormulaNumbers = {
    Weight: 10,
    Height: 6.25,
    Age: 5,
    Female: 161,
    Male: -5
}

export default class Counter {
    constructor(element) {
        this.root = element;
        this.form = this.root.querySelector('.counter__form');
        this.elements = this.form.elements;
        this.parameters = this.elements.parameters.elements;
        this.submit = this.elements.submit;
        this.reset = this.elements.reset;  
        this.age = this.elements.age;
        this.weight = this.elements.weight;
        this.gender = this.elements.gender;                          
        this.height = this.elements.height;
        this.activity = this.elements.activity;

        this.result = new Result(this.root);

        this.parametersAll = Array.from(this.parameters); 
    
        this.InputForm = this.InputForm.bind(this);
        this.ResetForm = this.ResetForm.bind(this);
        this.SubmitFunc = this.SubmitFunc.bind(this);
    }

    /* Ввод параметров в корректном формате */
    InputForm() {
        this.age.value = formatInput(this.age);
        this.weight.value = formatInput(this.weight);
        this.height.value = formatInput(this.height);

        this.submit.disabled = !this.form.checkValidity();
        this.reset.disabled = !this.parametersAll.some((el) => el.value);
    }

    /* Очистить формы */
    ResetForm() {
        this.submit.disabled = true;
        this.submit.disabled = true;
        this.result.hide();
    }

    /* Показать результат */
    SubmitFunc(showResult) {
        showResult.preventDefault();

        const totalCalories = this.getTotalCalories();
        const minimalCalories = this.getMinimalCalories();
        const maximalCalories = this.getMaximalCalories();

        const calories = {
            normal: totalCalories,
            max: maximalCalories,
            min: minimalCalories
        }
        this.result.show(calories);
    }

    addEventListener() {
      this.form.addEventListener("input", this.InputForm);
      this.form.addEventListener("submit", this.SubmitFunc);
      this.form.addEventListener("reset", this.ResetForm);
    }

    init() {
      this.addEventListener();
    }

    /* Общее количество калорий */
    getTotalCalories() {
        const age = FormulaNumbers.Age * this.age.value;
        const weight = FormulaNumbers.Weight * this.weight.value;
        const height = FormulaNumbers.Height * this.height.value;
        const gender = this.gender.value;
        const activity = ActivityRatio[this.activity.value];

        const caloriesNorm = ((weight + height - age - gender) * activity);
        return Math.round(caloriesNorm);

    }

    /* Минимальное кол-во */
    getMinimalCalories(caloriesNorm) {
      return Math.round(caloriesNorm * PercentOfNormal.Min);
    }

   /*  Максимальное кол-во */
    getMaximalCalories(caloriesNorm) {
      return Math.round(caloriesNorm * PercentOfNormal.Max);
    }
}