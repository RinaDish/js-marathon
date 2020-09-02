import { player1, player2 } from './players.js'
import { random, endGame, addLog, getRandomCharacter } from './utils.js'
import { $btn, $btnFatal, $btnHeal } from './domElements.js'

let disabledBtn = 0;

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


$btn.addEventListener('click', () => {
    player1.changeHP(random(20));
    player2.changeHP(random(20));
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

const init = () => {
    player1.renderHP();
    player2.renderHP();

    const $body = document.querySelector('div.body');
    const $chronicle = document.createElement('h3');
    const $start = document.createElement('p');

    $chronicle.innerText = 'Chronicle';
    $body.appendChild($chronicle);
    $start.innerText = 'Start Fighting!';
    $body.appendChild($start);
};

init();