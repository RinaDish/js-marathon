const $btn = document.getElementById('btn-kick');
const $btnFatal = document.getElementById('btn-fatal');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHp: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character')
}

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHp: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy')
}

$btn.addEventListener('click', function () {
    changeHP(random(20), character);
    changeHP(random(20), enemy);
})

$btnFatal.addEventListener('click', function () { //You can use Fatality ones per game. Fatality damages character, enemy or nobody ransomly.
    const fatality = Math.ceil(Math.random() * 3);

    if (fatality === 1) changeHP(20, character);
    else if (fatality === 2) changeHP(20, enemy);

    $btnFatal.disabled = true;
})

function init() {
    console.log('Start Game');
    renderHP(character);
    renderHP(enemy);
}
function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHp.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    person.elProgressbar.style.width = person.damageHP + '%';
}

function changeHP(count, person) {
    if (person.damageHP <= count) {
        person.damageHP = 0;
        $btn.disabled = true;
        $btnFatal.disabled = true;
        alert(person.name + ' lost =(')
    } else person.damageHP -= count;

    renderHP(person);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}
init();