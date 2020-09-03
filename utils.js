import { player1, player2 } from './players.js'
import { pokemons } from './pokemons.js';
import logs from './logs.js'

export const random = (min, max) => Math.ceil(Math.random() * (max - min) + min);

export const addLog = (logString) => {
    const $body = document.querySelector('div.body');

    const $lastLog = document.querySelector('p');
    const $newLog = document.createElement('p');

    $newLog.innerText = logString;

    $body.insertBefore($newLog, $lastLog);
};

export const generateLog = (pers, count) => {
    const logStrings = pers === player2 ? logs(pers.name, player1.name) : logs(pers.name, player2.name);
    return `${logStrings[random(0, logStrings.length - 1)]} - ${count} [${pers.hp.current}/${pers.hp.total}]`;
};

export const endGame = (log) => {
    addLog(log);
    addLog('Game over');

    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => $item.remove());
};

export const getRandomPokemon = () => pokemons[random(0, pokemons.length) - 1]

const disableButton = (button) => {
    let count = 0;
    return function (clickLimit) {
        count += 1;

        if (count >= clickLimit) {
            button.disabled = true
        };

        addLog(`${button.innerText} - left ${clickLimit - count} click`)
    }
};

export const btnController = (attack, div, player) => {
    const $attackBtn = document.createElement('button');
    $attackBtn.classList.add('button');
    $attackBtn.innerText = attack.name;

    const btnCount = disableButton($attackBtn);
    $attackBtn.addEventListener('click', () => {
        btnCount(attack.maxCount);
        player.changeHP(random(attack.minDamage, attack.maxDamage));
    })
    div.appendChild($attackBtn);
}

export const generatePlayers = () => {
    player1.renderHP();
    player2.renderHP();

    const $namePl1 = document.querySelector('#name-player1');
    $namePl1.innerText = player1.name;
    const $namePl2 = document.querySelector('#name-player2');
    $namePl2.innerText = player2.name;

    const $imgPl1 = document.querySelector('div.player1 > img');
    $imgPl1.setAttribute('src', player1.img)
    const $imgPl2 = document.querySelector('div.player2 > img');
    $imgPl2.setAttribute('src', player2.img)
}