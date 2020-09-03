import { player1, player2 } from './players.js'
import { generatePlayers, btnController } from './utils.js'

const $attackPlayers1 = document.querySelector('#attackPlayers1');
const $attackPlayers2 = document.querySelector('#attackPlayers2');

player1.attacks.forEach(attack => btnController(attack, $attackPlayers1, player2))
player2.attacks.forEach(attack => btnController(attack, $attackPlayers2, player1))

const init = () => {
    generatePlayers();

    const $body = document.querySelector('div.body');
    const $chronicle = document.createElement('h3');
    const $start = document.createElement('p');

    $chronicle.innerText = 'Chronicle';
    $body.appendChild($chronicle);
    $start.innerText = 'Start Fighting!';
    $body.appendChild($start);
};

init();