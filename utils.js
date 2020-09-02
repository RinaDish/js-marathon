import { player1, player2 } from './players.js'
import { $btn, $btnFatal, $btnHeal } from './domElements.js'
import logs from './logs.js'

export const random = (num) => Math.ceil(Math.random() * num);

export const addLog = (logString) => {
    const $body = document.querySelector('div.body');

    const $lastLog = document.querySelector('p');
    const $newLog = document.createElement('p');

    $newLog.innerText = logString;

    $body.insertBefore($newLog, $lastLog);
};

export const generateLog = (pers, count) => {
    const logStrings = pers === player2 ? logs(pers.name, player1.name) : logs(pers.name, player2.name);
    return `${logStrings[random(logStrings.length - 1)]} - ${count} [${pers.hp.current}/${pers.hp.total}]`;
};

export const endGame = (log) => {
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
};

export const getRandomCharacter = () => {
    const randomNum = random(3);

    if (randomNum === 1) return player1;
    else if (randomNum === 2) return player2;
    else return;
}