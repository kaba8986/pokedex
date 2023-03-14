//GLOBAL DECL
let currentPokemon;
let currPos = 0;
let distanceTop = 95;
let pokeList = [];
let pokenames = [];
let pokeTypes = ['Fire', 'Water', 'Grass', 'Electric', 'Poison', 'Bug', 'Flying', 'Fairy', 'Ground', 'Psychic', 'Fighting'];

let loadLimit = 20;
let isLoading = false;
let listEnd = 250;

const loader = document.querySelector('.loader');




//disable readonly on small viewports
visualViewport.addEventListener('resize', checkViewport);

//FETCH POKEMON DATAS


async function loadPokedex() {
    for(let i = 0; i < loadLimit; i++) {
        let API_URL = `https://pokeapi.co/api/v2/pokemon/${i+1}`;
        let response = await fetch(API_URL);
        currentPokemon = await response.json();
        pokeList.push(currentPokemon)
        renderCards(i);
        pokenames.push(currentPokemon.name);
    }


    if (!isLoading) {
        window.addEventListener('scroll', loadMorePokemons);
    }
}

async function loadMorePokemons() {
    let additionalAmount = checkIfListendReached();
    if(window.scrollY + window.innerHeight >= document.body.clientHeight - 100 && !isLoading) {
        isLoading = true;
        for(let i = loadLimit; i < loadLimit + additionalAmount; i++) {
            let API_URL = `https://pokeapi.co/api/v2/pokemon/${i+1}`;
            let response = await fetch(API_URL);
            currentPokemon = await response.json();
            pokeList.push(currentPokemon);
            renderCards(i);
            pokenames.push(currentPokemon.name);
        }
        loadLimit += 30;
        // offset += 30;
        isLoading = false;
    }
}


function checkIfListendReached() {
    let additionalAmount = 30;
    if(loadLimit + additionalAmount >= listEnd) {
        additionalAmount = listEnd - loadLimit;
    }
    return additionalAmount;
}



//GET BASE INFOS
function getName(i) {
    let pokemon = pokeList[i];
    return capitalize(pokemon.name);
}


function getId(i) {
    let number = i + 1;
    if (number < 10) {
        return `00${number}`
    } else if (number >= 10 && number < 100) {
        return `0${number}`
    } else {
        return number;
    }
}


function getTypes(i) {
    let types = [];
    for (let j = 0; j < pokeList[i]['types'].length; j++) {
        let currType = pokeList[i]['types'][j];
        types.push(capitalize(currType['type']['name']));
    }
    return types;
}


function renderTypes(types) {
    let string = '';
    for (let i = 0; i < types.length; i++) {
        string += /*html*/ `<p><span class="poke-type">${types[i]}</span></p>`
    }
    return string;
}


////////////////RENDER CARDS
function renderCards(i) {
    let types = getTypes(i);
    let cardBox = document.querySelector('#card-box');
    cardBox.innerHTML += /*html*/ `
    <div class="card" id="card-${i}" onclick="showEntry(${i})">
    ${createSingleCard(i, types)}
    </div>`
    document.querySelector(`#card-${i}`).style.backgroundColor = bgColor(i);
}


function createSingleCard(i, types) {
    let string = '';
    string += /*html*/ `
        <span class="poke-id">#${getId(i)}</span>
        <h3>${getName(i)}</h3>
        ${renderTypes(types)}
        <img class="img-small" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png" alt="">`
    return string;
}


function bgColor(i) {
    let types = getTypes(i);
    let color = `var(--default-bg)`;
    for (let j = 0; j < types.length; j++) {
        if (pokeTypes.includes(types[j])) {
            color = `var(--${types[j]})`;
            return color;
        }
    }
    return color;
}


//CREATE POKEMON-ENTRY
function showEntry(i) {
    let types = getTypes(i);
    document.querySelector('.layer').classList.remove('dis-none');
    let container = document.querySelector('.poke-entry-container');
    container.innerHTML = '';
    container.innerHTML = /*html*/ `
    <div class="entry-upper-box">
        <div id ="entry-headline-${i}" class="entry-headline" style="background: ${bgColor(i)}"></div>
        <div id="entry-imgbox-${i}" class="entry-imgbox" style="background: ${bgColor(i)}"></div>
    </div>
    <div id="entry-content-${i}" class="entry-content"></div>`
    renderHeadline(i);
    renderImgBox(i, types);
    renderContent(i);
}


function renderHeadline(i) {
    document.querySelector(`#entry-headline-${i}`).innerHTML = /*html*/ `
    <span id="entry-id">#${getId(i)}</span>
    <div class="change-entry">
        <span id="prev-entry" class="entry-slider" onclick="changeEntry(${i}, -1)"><i class="fa-solid fa-circle-chevron-left"></i></span>
        <span id="next-entry" class="entry-slider" onclick="changeEntry(${i}, 1)"><i class="fa-solid fa-circle-chevron-right"></i></span>
    </div>
    <i id="close-entry" class="fa-solid fa-xmark" onclick="closeEntry()"></i>`
}


function renderImgBox(i, types) {
    document.querySelector(`#entry-imgbox-${i}`).innerHTML = /*html*/ `
     <h3>${getName(i)}</h3>
    ${renderTypes(types)}
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png" alt="">`
}


function renderContent(i) {
    document.querySelector(`#entry-content-${i}`).innerHTML = /*html*/ `
        <nav id="entry-nav-${i}" class="entry-nav"></nav>
        <div id="entry-main-${i}" class="entry-main"></div>`
    renderNav(i);
    renderMain(i);
}


function renderNav(i) {
    document.querySelector(`#entry-nav-${i}`).innerHTML = /*html*/ `
        <a href="#" class="nav-link">About</a>
        <a href="#" class="nav-link  active-link">Stats</a>
        <a href="#" class="nav-link">Evolution</a>
        <a href="#" class="nav-link">Moves</a>`
}


//RENDER DETAILS
function renderMain(i) {
    let stats = getStats(i);
    for (let j = 0; j < stats.length; j++) {
        renderStats(i, j, stats);
        renderBarLine(i, j, stats[j][1]);
    }
}


function renderStats(i, j, stats) {
    document.querySelector(`#entry-main-${i}`).innerHTML += /*html*/ `
        <div class="stats-line">
            <div class="stats-label">${stats[j][0]}</div>
            <div class="stats-value">${stats[j][1]}</div>
            <div class="stats-bar">
                <div class="bar-line" id="bar-line-${i}-${j}"></div>
            </div>
        </div>`
}


function getStats(i) {
    let values = [['HP'], ['Attack'], ['Defense'], ['Sp. Atk'], ['Sp. Def'], ['Speed']];
    for (let j = 0; j < pokeList[j]['stats'].length; j++) {
        let curStat = pokeList[i]['stats'][j];
        values[j].push(curStat['base_stat']);
    }
    return values;
}


function renderBarLine(i, j, val) {
    let barline = document.querySelector(`#bar-line-${i}-${j}`);
    barline.style.width = `${val}%`;
    if (val <= 50) {
        barline.style.backgroundColor = 'red';
    }
}



//GENERAL FUNCTIONS
function toggleSearch() {
    document.querySelector('.search-bar').classList.toggle('active-search');
    if (document.querySelector('.search-bar').classList.contains('active-search')) {
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


function scrollToPokemon(name) {
    let i = pokenames.indexOf(name.toLowerCase());
    let card = document.querySelector(`#card-${i}`);
    let targetPos = card.offsetTop;
    window.scrollTo({
        top: targetPos - distanceTop,
        behavior: 'smooth'
    });
    currPos = targetPos;
    showEntry(i);
}


function enter() {
    if (event.key === 'Enter') {
        let input = document.querySelector('#input-field');
        if (checkIfPokemon(input.value)) {
            scrollToPokemon(input.value);
            input.value = '';
        } else {
            alert('There is no such Pokémon listed yet. Scroll down to load some more.');
            input.value = '';
        }
    }
}


function checkIfPokemon(name) {
    return pokenames.indexOf(name.toLowerCase()) > -1;

}


function changeEntry(i, j) {
    if (i == 0 && j == -1) {
        return;
    } else if (i == pokeList.length - 1 && j == 1) {
        return;
    }
    showEntry(i + j);
}


function closeEntry() {
    document.querySelector('.layer').classList.add('dis-none');
}

function checkViewport() {
    if(window.innerWidth <= 600) {
        document.querySelector('#input-field').removeAttribute('readonly');
        distanceTop = 195;
    } else {
        distanceTop = 95;
    }
}


//Infinite Scroll Functions
