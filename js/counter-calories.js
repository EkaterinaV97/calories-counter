import { formatInput } from "./input";

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
    Male: 5
}

export default class Counter {
    constructor(count) {
        this.module = count;
        this.form = this.module.querySelector('.counter__form');                         /* from HTML class .counter-form.  */
        this.modules = this.form.modules;
        this.parameters = this.modules.parameters;

        this.age = this.modules.age;
        this.weight = this.modules.weight;
        this.gender = this.modules.gender;                          /* parameters for formula */
        this.height = this.modules.height;
        this.activity = this.modules.activity;

        this.show = this.modules.show;
        this.hide = this.module.hide;                                /* show or hide element */

        this.result = new Result(this.module)

    }

    CaloriesNorm() {

    }

    InputForm() {
        this.age.value = formatInput(this.age);
        this.weight.value = formatInput(this.weight);
        this.height.value = formatInput(this.height);
        
    }
}