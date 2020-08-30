const $btn = document.getElementById('btn-kick');
const $btnFatal = document.getElementById('btn-fatal');
const $btnHeal = document.getElementById('btn-heal');
const $log = document.createElement('p');
const $body = document.querySelector('div.body');

let disabledBtn = 0;

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

const disableButton = (button) => {
    let count = 0;
    return function (clickLimit) {
        count += 1;
        console.log(count);

        if (count >= clickLimit) {
            button.disabled = true
            disabledBtn += 1;
        };

        if (disabledBtn === 3) endGame('Standoff')
        addLog(`${button.innerText} - left ${clickLimit - count} click`)
    }
};

const disableKick = disableButton($btn);
const disableFatal = disableButton($btnFatal);
const disableHeal = disableButton($btnHeal);

const getRandomCharacter = () => {
    const randomNum = random(3);

    if (randomNum === 1) return character;
    else if (randomNum === 2) return enemy;
    else return;
}

$btn.addEventListener('click', () => {
    character.changeHP(random(20));
    enemy.changeHP(random(20));
    disableKick(15);
});

$btnFatal.addEventListener('click', () => { //You can use Fatality ones per game. Fatality damages character, enemy or nobody randomly.
    const personage = getRandomCharacter();

    if (personage != undefined) personage.changeHP(20);
    else addLog('The kick missed -_-');

    disableFatal(1);
});

$btnHeal.addEventListener('click', () => { //You can use Heal ones per game. It heal character, enemy or nobody randomly.
    const personage = getRandomCharacter();

    if (personage != undefined) personage.changeHP(-20);
    else addLog('The heal missed -_-');

    disableHeal(1);
});

function renderHP() {
    this.elHp.innerText = this.damageHP + ' / ' + this.defaultHP;
    this.elProgressbar.style.width = this.damageHP * (100 / this.defaultHP) + '%';
};

function changeHP(count) {
    if (this.damageHP <= count) {
        this.damageHP = 0;
    }
    else if (this.damageHP > this.defaultHP) this.damageHP = this.defaultHP
    else this.damageHP -= count;

    this.renderHP();

    const { name, damageHP, defaultHP } = this;
    const logStrings = this === enemy ? logs(name, character.name) : logs(name, enemy.name);
    const log = `${logStrings[random(logStrings.length - 1)]} - ${count} [${damageHP}/${defaultHP}]`;
    addLog(log);

    if (damageHP === 0) endGame(`${name} lost =<`);
};

const endGame = (log) => {
    setTimeout(() => { //Alert doesn't work correctly without setTimeout
        alert(`${log}\nGame over`);
        addLog(log);
        addLog('Game over');
    }, 0);

    if ($btn.disabled != true ||
        $btnFatal.disabled != true ||
        $btnHeal.disabled != true) {
        $btn.disabled = true;
        $btnFatal.disabled = true;
        $btnHeal.disabled = true;
    }
}

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