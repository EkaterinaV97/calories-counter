import {formatInput} from '..js\input.js';
import {formatNumber} from '..js\numbers.js'


const counterItems = document.querySelectorAll('.counter')

counterItems.forEach((item) => {
    const counter = new Counter(item);
    return counter.init();
})