
let currentPokemon;

async function loadPokedex() {
    let url = 'https://pokeapi.co/api/v2/pokemon/ditto';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);

    renderPokeInfo();
}

function renderPokeInfo() {
    document.getElementById('poke-name').innerHTML = currentPokemon['name'];
}

function toggleSearch() {
    document.querySelector('.search-bar').classList.toggle('active-menu');
    document.querySelector('#pokeball').classList.toggle('rotate-ball');
}