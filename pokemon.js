import { generateLog, addLog } from './utils.js';

class Selectors {
    constructor(name) {
        this.elHp = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
};

export default class Pokemon extends Selectors {
    constructor({ name, hp, type, selectors, attacks = [], img }) {
        super(selectors);

        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks;
        this.img = img;

        this.renderHP();
    }

    renderHP = () => {
        const perc = this.hp.current * (100 / this.hp.total);
        this.elHp.innerText = this.hp.current + ' / ' + this.hp.total;
        this.elProgressbar.style.width = perc + '%';
        if ( perc > 60) this.elProgressbar.setAttribute('class', 'health')
        if (perc < 60 && perc > 20) this.elProgressbar.setAttribute('class', 'health low')
        if (perc < 20 && perc > 0) this.elProgressbar.setAttribute('class', 'health critical')
    };

    changeHP = (count, player, enemy) => {
        this.hp.current -= count;

        if (this.hp.current <= count) this.hp.current = 0
        else if (this.hp.current >= this.hp.total) this.hp.current = this.hp.total

        this.renderHP();

        const log = generateLog(this, count, player, enemy);
        addLog(log);
    }
};