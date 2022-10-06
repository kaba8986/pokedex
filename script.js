
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

function getId(i) {
    let number = i+1;
    if(number < 10) {
        return `00${number}`
    } else if (number >= 10 && number < 100) {
        return `0${number}`
    } else {
        return number;
    }
}


////////////////RENDER MINI-CARDS
function renderCard(i) {
    let types = getTypes(i);
    let cardBox = document.querySelector('#card-box');
    cardBox.innerHTML += /*html*/ `
    <div class="card" id="card-${i}" onclick="showEntry(${i})">
        <span class="poke-id">#${getId(i)}</span>
        <h3>${getName(i)}</h3>
        ${renderTypes(types)}
        <img class="img-small" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png" alt="">
    </div>
    `
    document.querySelector(`#card-${i}`).style.backgroundColor = bgColor(i);
}


function bgColor(i) {
    let types = getTypes(i);
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
function showEntry(i) {
    let types = getTypes(i);
    document.querySelector('.layer').classList.toggle('dis-none');
    let container = document.querySelector('.poke-entry-container');
    container.innerHTML = '';
    container.innerHTML = /*html*/ `
    <div class="entry-headline" style="background: ${bgColor(i)}">
        <span id="entry-id">#${getId(i)}</span>
        <i id="close-entry" class="fa-solid fa-xmark" onclick="closeEntry()"></i>
    </div>
    <div id="entry-imgbox-${i}" class="entry-imgbox" style="background: ${bgColor(i)}">
        <h3>${getName(i)}</h3>
        ${renderTypes(types)}
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png" alt="">
    </div>
    <div id="entry-content-${i}" class="entry-content">
        <nav id="entry-nav-${i}" class="entry-nav">
            <a href="#" class="nav-link">About</a>
            <a href="#" class="nav-link  active-link">Stats</a>
            <a href="#" class="nav-link">Evolution</a>
            <a href="#" class="nav-link">Moves</a>
        </nav>
        <div id="entry-main-${i}" class="entry-main"></div>
    </div>
    `
    renderStats(i);
}


function closeEntry() {
    document.querySelector('.layer').classList.toggle('dis-none');
}

//RENDER STATS
function renderStats(i) {
    let stats = getStats(i);
    let content = document.querySelector(`#entry-main-${i}`);
    content.innerHTML = '';
    for(let j = 0; j < stats.length; j++) {
        content.innerHTML += /*html*/ `
        <div class="stats-line">
            <div class="stats-label">${stats[j][0]}</div>
            <div class="stats-value">${stats[j][1]}</div>
            <div class="stats-bar">
                <div class="bar-line" id="bar-line-${i}-${j}"></div>
            </div>
        </div>
    `;
    renderBarLine(i, j, stats[j][1]);
    }
}


function getStats(i) {
    let values = [['HP'], ['Attack'], ['Defense'], ['Sp. Atk'], ['Sp. Def'], ['Speed']];
    for(let j = 0; j < pokeList[j]['stats'].length; j++) {
        let curStat = pokeList[i]['stats'][j];
        values[j].push(curStat['base_stat']);
    }
    return values;
}


function renderBarLine(i, j, val) {
    let barline = document.querySelector(`#bar-line-${i}-${j}`);
    barline.style.width = `${val}%`;
    if(val <= 50) {
        barline.style.backgroundColor = 'red';
    }
}