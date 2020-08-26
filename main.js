const $btn = document.getElementById('btn-kick');
const $btnFatal = document.getElementById('btn-fatal');
const $log = document.createElement('p');
const $body = document.querySelector('div.body');

const character = {
    name: 'Pikachu',
    defaultHP: 150,
    damageHP: 150,
    elHp: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    changeHP,
    renderHP,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 150,
    damageHP: 150,
    elHp: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    changeHP,
    renderHP,
};

$btn.addEventListener('click', () => {
    character.changeHP(random(20));
    enemy.changeHP(random(20));
});

$btnFatal.addEventListener('click', () => { //You can use Fatality ones per game. Fatality damages character, enemy or nobody ransomly.
    const fatality = random(3);

    if (fatality === 1) character.changeHP(20);
    else if (fatality === 2) enemy.changeHP(20);
    else addLog('The kick missed -_-');

    $btnFatal.disabled = true;
});

function renderHP() {
    this.elHp.innerText = this.damageHP + ' / ' + this.defaultHP;
    this.elProgressbar.style.width = this.damageHP * (100 / this.defaultHP) + '%';
};

function changeHP(count) {
    if (this.damageHP <= count) {
        this.damageHP = 0;
        $btn.disabled = true;
        $btnFatal.disabled = true;
    } else this.damageHP -= count;

    this.renderHP();

    const logStrings = this === enemy ? logs(this.name, character.name) : logs(this.name, enemy.name);
    const log = `${logStrings[random(logStrings.length - 1)]} - ${count} [${this.damageHP}/${this.defaultHP}]`;
    addLog(log);

    if (this.damageHP === 0) setTimeout(() => { //Alert doesn't work correctly without setTimeout
        alert(this.name + ' lost =(')
        addLog(`${this.name} lost =<`);
    }, 0);
};

const random = (num) => Math.ceil(Math.random() * num);

const logs = (firstName, secondName) => ([
    `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага.`,
    `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага.`,
    `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар.`,
    `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар.`,
    `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар.`,
    `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника`,
    `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника.`,
    `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику.`
]);

const addLog = (logString) => {
    const $lastLog = document.querySelector('p');
    const $newLog = document.createElement('p');

    $newLog.innerText = logString;

    $body.insertBefore($newLog, $lastLog);
}

const init = () => {
    console.log('Start Game');
    character.renderHP();
    enemy.renderHP();

    const $chronicle = document.createElement('h3');
    const $start = document.createElement('p');


    $chronicle.innerText = 'Chronicle';
    $body.appendChild($chronicle);
    $start.innerText = 'Start Fighting!';
    $body.appendChild($start);
};

init();