import Pokemon from './pokemon.js';
import { getRandomPokemon } from './utils.js'

export let pokemon1 = getRandomPokemon();
export let pokemon2 = getRandomPokemon();

export let player1 = new Pokemon({
    ...pokemon1,
    selectors: 'player1',
});

export let player2 = new Pokemon({
    ...pokemon2,
    selectors: 'player2',
});