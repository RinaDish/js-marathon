import { generateLog, addLog, endGame } from './utils.js';

class Selectors {
    constructor(name) {
        this.elHp = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
};

export default class Pokemon extends Selectors {
    constructor({ name, hp, type, selectors }) {
        super(selectors);

        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;

        this.renderHP();
    }

    renderHP = () => {
        this.elHp.innerText = this.hp.current + ' / ' + this.hp.total;
        this.elProgressbar.style.width = this.hp.current * (100 / this.hp.total) + '%';
    };

    changeHP = (count) => {
        this.hp.current -= count;

        if (this.hp.current <= count) this.hp.current = 0
        else if (this.hp.current >= this.hp.total) this.hp.current = this.hp.total

        this.renderHP();

        const log = generateLog(this, count);
        addLog(log);


        if (this.hp.current === 0) endGame(`${name} lost =<`);
    }
};