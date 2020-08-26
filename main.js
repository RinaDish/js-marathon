const $btn = document.getElementById('btn-kick');
const $btnFatal = document.getElementById('btn-fatal');

const character = {
    name: 'Pikachu',
    defaultHP: 150,
    damageHP: 150,
    elHp: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    changeHP,
    renderHP,
}

const enemy = {
    name: 'Charmander',
    defaultHP: 150,
    damageHP: 150,
    elHp: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    changeHP,
    renderHP,
}

$btn.addEventListener('click', () => {
    character.changeHP(random(20));
    enemy.changeHP(random(20));
})

$btnFatal.addEventListener('click', () => { //You can use Fatality ones per game. Fatality damages character, enemy or nobody ransomly.
    const fatality = Math.ceil(Math.random() * 3);

    if (fatality === 1) character.changeHP(20);
    else if (fatality === 2) enemy.changeHP(20);

    $btnFatal.disabled = true;
})

const init = () => {
    console.log('Start Game');
    character.renderHP();
    enemy.renderHP();
}

function renderHP() {
    this.elHp.innerText = this.damageHP + ' / ' + this.defaultHP;
    this.elProgressbar.style.width = this.damageHP * (100 / this.defaultHP) + '%';
}

function changeHP(count) {
    if (this.damageHP <= count) {
        this.damageHP = 0;
        $btn.disabled = true;
        $btnFatal.disabled = true;
    } else this.damageHP -= count;

    this.renderHP();
    if (this.damageHP === 0) setTimeout(() => { //Alert doesn't work correctly without setTimeout
        alert(this.name + ' lost =(')
    }, 0);
}

const random = (num) => {
    return Math.ceil(Math.random() * num);
}

init();