import {formatInput} from '../format/input.js';
import Result from '../module/result.js';

const ActivityRatio = {
    MIN: 1.2,
    LOW: 1.375,
    MEDIUM: 1.55,
    HIGH: 1.725,
    VERYHIGH: 1.9
}

const PercentOfNormal = {
    MIN: 0.85,
    MAX: 1.15
}

const FormulaNumbers = {
    WEIGHT: 10,
    HEIGHT: 6.25,
    AGE: 5
}

const GenderConstant = {
    FEMALE: 161,
    MALE: -5
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
        const age = FormulaNumbers.AGE * this.age.value;
        const weight = FormulaNumbers.WEIGHT * this.weight.value;
        const height = FormulaNumbers.HEIGHT * this.height.value;
        const gender = GenderConstant[this.gender.value.toUpperCase()];
        const activity = ActivityRatio[this.activity.value.toUpperCase()];

        const caloriesNorm = ((weight + height - age - gender) * activity);
        return Math.round(caloriesNorm);
    }

    /* Минимальное кол-во */
    getMinimalCalories() {
      return Math.round(this.getTotalCalories() * PercentOfNormal.MIN);
    }

   /*  Максимальное кол-во */
    getMaximalCalories() {
      return Math.round(this.getTotalCalories() * PercentOfNormal.MAX);
    }
}