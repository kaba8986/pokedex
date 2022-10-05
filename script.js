
let currentPokemon;
let pokeTypes = ['fire', 'water', 'grass', 'electric', 'poison'];


async function loadPokedex() {
    for(let i = 1; i < 31; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        buildCard(i, currentPokemon);
    }
}

//CREATE MINI-CARDS

function buildCard(i, currentPokemon) {
    let types = getTypes(currentPokemon);
    let cardBox = document.querySelector('#card-box');
    cardBox.innerHTML += /*html*/ `
    <div class="card" id="card-${i}" onclick="showEntry(${i})">
        <span class="poke-id">#${i}</span>
        <h3>${capitalize(currentPokemon['name'])}</h3>
        ${addTypes(types)}
        <img class="img-small" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" alt="">
    </div>
    `
    cardBgColor(currentPokemon);
}


//NOTE:  HOW TO CAPITALIZE TYPES?
function getTypes(currentPokemon) {
    let types = [];
    for(let i = 0; i < currentPokemon['types'].length; i++) { 
        let type = currentPokemon['types'][i]; 
        types.push(`${type['type']['name']}`); 
    }
    return types;
}

function addTypes(types) {
    let string = '';
    for(let i = 0; i < types.length; i++) {
        let type = currentPokemon['types'][i]; 
        string += `<p><span class="poke-type">${type['type']['name']}</span></p>`
    }
    return string;
}


function cardBgColor(currentPokemon) {
    let types = getTypes(currentPokemon);
    for(let i = 0; i < pokeTypes.length; i++) {
        if(types.indexOf(pokeTypes[i]) > -1) {
            document.querySelector(`#card-${currentPokemon['id']}`).style.backgroundColor = `var(--${pokeTypes[i]})`
            return;
        } else {
            document.querySelector(`#card-${currentPokemon['id']}`).style.backgroundColor = `var(--default-bg)`
        }
    }
}


function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

//GENERAL FUNCTIONS
function toggleSearch() {
    document.querySelector('.search-bar').classList.toggle('active-search');
    document.querySelector('#pokeball').classList.toggle('rotate-ball');

}


//CREATE POKEMON-ENTRY

function closeEntry() {
    document.querySelector('.layer').classList.toggle('dis-none');
}

function showEntry(i) {
    document.querySelector('.layer').classList.toggle('dis-none');
    let container = document.querySelector('.poke-entry-container');
    container.innerHTML = '';
    container.innerHTML += /*html*/ `
    <div class="entry-headline">
        <span id="entry-id">#${i}</span>
        <i id="close-entry" class="fa-solid fa-xmark" onclick="closeEntry()"></i>
    </div>
    <div class="entry-imgbox">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" alt="">
    </div>
    `
}


