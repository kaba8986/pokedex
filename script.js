
let currentPokemon;
let pokeList = [];
let pokeTypes = ['Fire', 'Water', 'Grass', 'Electric', 'Poison'];

//FETCH POKEMON DATAS
async function loadPokedex() {
    for(let i = 0; i < 21; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i+1}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokeList.push(currentPokemon)
        renderCard(i)
    }
}


//GET DETAILS FUNCTIONS
function getName(i) {
    let pokemon = pokeList[i];
    return capitalize(pokemon.name);
}


function getTypes(i) {
    let types = [];
    for(let j = 0; j < pokeList[i]['types'].length; j++) {
        let currType = pokeList[i]['types'][j];
        types.push(capitalize(currType['type']['name']));
    }
    return types;
}


function renderTypes(types) {
    let string = '';
    for(let i = 0; i < types.length; i++) {
        string += /*html*/ `<p><span class="poke-type">${types[i]}</span></p>`
    }
    return string;
}


//RENDER MINI-CARDS
function renderCard(i) {
    let types = getTypes(i);
    let cardBox = document.querySelector('#card-box');
    cardBox.innerHTML += /*html*/ `
    <div class="card" id="card-${i}" onclick="">
        <span class="poke-id">#${i}</span>
        <h3>${getName(i)}</h3>
        ${renderTypes(types)}
        <img class="img-small" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png" alt="">
    </div>
    `
    document.querySelector(`#card-${i}`).style.backgroundColor = bgColor(i);
}


function bgColor(i) {
    let types = getTypes(i);
    console.log(types);
    let color = `var(--default-bg)`;
    for(let j = 0; j < types.length; j++) {
        if(pokeTypes.includes(types[j])) {
            color = `var(--${types[j]})`;
            return color;
        }
    }
    return color;
}


//GENERAL FUNCTIONS

function toggleSearch() {
    document.querySelector('.search-bar').classList.toggle('active-search');
    if(document.querySelector('.search-bar').classList.contains('active-search')){
        document.querySelector('#pokeball').style.transform = 'rotate(-300deg)';
        document.querySelector('#input-field').removeAttribute('readonly'); 
    } else {
        document.querySelector('#pokeball').style.transform = 'rotate(300deg)';  
        document.querySelector('#input-field').readOnly = 'true';
    }
}


function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}



//CREATE POKEMON-ENTRY

function showEntry(i, currentPokemon) {
    console.log();
    document.querySelector('.layer').classList.toggle('dis-none');
    let container = document.querySelector('.poke-entry-container');
    container.innerHTML = '';
    container.innerHTML += /*html*/ `
    <div class="entry-headline">
        <span id="entry-id">#${i}</span>
        <i id="close-entry" class="fa-solid fa-xmark" onclick="closeEntry()"></i>
    </div>
    <div id="entry-imgbox-${i}" class="entry-imgbox">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png" alt="">
    </div>
    `

    console.log(bgColor(currentPokemon));
}

function closeEntry() {
    document.querySelector('.layer').classList.toggle('dis-none');
}

