import logs from './logs.js';
import { game } from './main.js';


export const random = (min, max) => Math.ceil(Math.random() * (max - min) + min);

export const addLog = (logString) => {
    const $body = document.querySelector('div.body');

    const $lastLog = document.querySelector('p');
    const $newLog = document.createElement('p');

    $newLog.innerText = logString;

    $body.insertBefore($newLog, $lastLog);
};

export const generateLog = (pers, count, player1, player2) => {
    const logStrings = pers === player2 ? logs(pers.name, player1.name) : logs(pers.name, player2.name);
    return `${logStrings[random(0, logStrings.length - 1)]} - ${count} [${pers.hp.current}/${pers.hp.total}]`;
};

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

const damage = async () => {
    const getDamage = async () => {
        const responce = await fetch('https://reactmarathon-api.netlify.app/api/fight?player1id=25&attackId=1&player2id=1');
        const body = await responce.json();
        return body;
    };

    return await getDamage();
}

export const btnController = (attack, enemy, player) => {
    const $div = document.querySelector('div.control');
    const $attackBtn = document.createElement('button');
    $attackBtn.classList.add('button');
    $attackBtn.innerText = attack.name;

    const btnCount = disableButton($attackBtn);
    $attackBtn.addEventListener('click', async () => {
        const { kick } = await damage();

        btnCount(attack.maxCount);
        player.changeHP(kick.player1, player, enemy);
        enemy.changeHP(kick.player2, enemy, player);

        if (player.hp.current === 0) game.endGame(`${player.name} lost =<`)
        else if (enemy.hp.current === 0) game.endGame(`${enemy.name} lost =<`);

    })
    $div.appendChild($attackBtn);
}

export const generatePlayers = (player1, player2) => {
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