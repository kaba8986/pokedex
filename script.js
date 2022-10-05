
let currentPokemon;


async function loadPokedex() {
    for(let i = 1; i < 21; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        buildCard(i, currentPokemon);
    }
}

function buildCard(i, currentPokemon) {
    let cardBox = document.querySelector('#card-box');
    cardBox.innerHTML += /*html*/ `
    <div class="card" id="card-${i}">
        <span class="poke-id">#${i}</span>
        <h3>${capitalize(currentPokemon['name'])}</h3>
        ${getTypes(currentPokemon)}
        <img class="img-small" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" alt="">
    </div>
    `
}


//NOTE:  HOW TO CAPITALIZE TYPES?
function getTypes(currentPokemon) {
    let types = '';
    for(let i = 0; i < currentPokemon['types'].length; i++) { 
        let type = currentPokemon['types'][i]; 
        types += `<p><span class="poke-type">${type['type']['name']}</span></p>`;
    }
    return types;
}



function renderPokeInfo() {
    document.querySelector('#poke-name').innerHTML = currentPokemon['name'];
    document.querySelector('#poke-type-a').innerHTML = currentPokemon['types'][0]['type']['name'];
    document.querySelector('#poke-id').innerHTML = `#${currentPokemon['id']}`;
}

function toggleSearch() {
    document.querySelector('.search-bar').classList.toggle('active-search');
    document.querySelector('#pokeball').classList.toggle('rotate-ball');

}


function getPokeDetails() {
    let id = currentPokemon['id'];
}

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}



