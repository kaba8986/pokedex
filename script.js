
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

function buildCard(i, currentPokemon) {
    let types = getTypes(currentPokemon);
    let cardBox = document.querySelector('#card-box');
    cardBox.innerHTML += /*html*/ `
    <div class="card" id="card-${i}">
        <span class="poke-id">#${i}</span>
        <h3>${capitalize(currentPokemon['name'])}</h3>
        ${addTypes(types)}
        <img class="img-small" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" alt="">
    </div>
    `
    cardBgColor(currentPokemon);
}

function cardBgColor(currentPokemon) {
    let types = getTypes(currentPokemon);
    console.log(types);
    for(let i = 0; i < pokeTypes.length; i++) {
        if(types.indexOf(pokeTypes[i]) > -1) {
            document.querySelector(`#card-${currentPokemon['id']}`).style.backgroundColor = `var(--${pokeTypes[i]})`
            return;
        } else {
            document.querySelector(`#card-${currentPokemon['id']}`).style.backgroundColor = `var(--default-bg)`
        }
    }
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

/*
`<p><span class="poke-type">${type['type']['name']}</span></p>`
*/

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



