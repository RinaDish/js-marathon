import { generatePlayers, btnController, addLog } from './utils.js'
import Pokemon from './pokemon.js'

class Game {
    getPokemons = async () => {
        const responce = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
        const body = await responce.json();
        return body;
    };

    start = async () => {
        addLog('Start Fighting!');

        const pokemon1 = await this.getPokemons();
        const pokemon2 = await this.getPokemons();

        const player1 = new Pokemon({
            ...pokemon1,
            selectors: 'player1',
        });

        const player2 = new Pokemon({
            ...pokemon2,
            selectors: 'player2',
        });

        generatePlayers(player1, player2);
        player1.attacks.forEach(attack => btnController(attack, player1, player2));
    }

    endGame = (log) => {
        addLog(log);
        addLog('Game over');

        const allButtons = document.querySelectorAll('.control .button');
        allButtons.forEach($item => $item.remove());
        game.start();
    };
}

export const game = new Game();
game.start();