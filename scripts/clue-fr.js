import { cardMovement } from "./general.js";

export const CLUE_CHARACTERS = ["Proffessor Plum", "Colonel Mustard", "Mr. Green", "Mrs. White", "Ms. Scarlett", "Mrs. Peacock"]
export const CLUE_WEAPONS = ["Revolver", "Lead Pipe", "Rope", "Candlestick", "Wrench", "Dagger"]
const CLUE_ROOMS = ["Library", "Hall", "Kitchen", "Study", "Lounge", "Conservatory", "Billiard Room", "Ballroom", "Dining Room"]

const CLUE_CHARACTERS_FR = ["Professeur Plum", "Colonel Mustard", "M. Green", "Mme White", "Mme Scarlett", "Mme Peacock"]
export const CLUE_WEAPONS_FR = ["Revolver", "Tuyau en plomb", "Corde", "Chandelier", "Clé", "Dague"]
const CLUE_ROOMS_FR = ["Bibliothèque", "Hall", "Cuisine", "Bureau", "Salon", "Véranda", "Salle de billard", "Salle de bal", "Salle à manger"]

const CARD_LIBRARY = [CLUE_CHARACTERS, CLUE_WEAPONS, CLUE_ROOMS]
const CARD_LIBRARY_FR = [CLUE_CHARACTERS_FR, CLUE_WEAPONS_FR, CLUE_ROOMS_FR]
const CARD_TITLES = ["Character Selector", "Weapon Selector", "Room Selector"]
const CARD_TITLES_FR = ["Sélecteur de personnage", "Sélecteur d'arme", "Sélecteur de pièce"]

const checklist = document.querySelector('.checklist');
const checklistButton = document.querySelector('.checklist-button');
const answerSection = document.querySelector('.answer-section');
const submitButton = document.querySelector('.submit-button');
const turnUpOpacity = document.querySelector('.turn-up-opacity');

const rand_ints = [Math.floor(Math.random() * CLUE_CHARACTERS.length), Math.floor(Math.random() * CLUE_WEAPONS.length), Math.floor(Math.random() * CLUE_ROOMS.length)]

export const murdering = {
    character: CLUE_CHARACTERS[rand_ints[0]],
    weapon: CLUE_WEAPONS[rand_ints[1]],
    rooms: CLUE_ROOMS[rand_ints[2]]
}

export const murdering_fr = {
    character: CLUE_CHARACTERS_FR[rand_ints[0]],
    weapon: CLUE_WEAPONS_FR[rand_ints[1]],
    rooms: CLUE_ROOMS_FR[rand_ints[2]]
}

const userGuess = {}

checklist.innerHTML += `<h4>Personnages</h4>`
CLUE_CHARACTERS.forEach(character => {
    checklist.innerHTML += `<div class="checklist-item"><input type="checkbox" id="${character.toLowerCase()}">
        <label for="${character.toLowerCase()}">${character}</label></div>`;
});

checklist.innerHTML += `<h4>Weapons</h4>`
CLUE_WEAPONS.forEach(weapon => {
    checklist.innerHTML += `<div class="checklist-item"><input type="checkbox" id="${weapon.toLowerCase()}">
        <label for="${weapon.toLowerCase()}">${weapon}</label></div>`;
});

checklist.innerHTML += `<h4>Rooms</h4>`
CLUE_ROOMS.forEach(room => {
    checklist.innerHTML += `<div class="checklist-item"><input type="checkbox" id="${room.toLowerCase()}">
        <label for="${room.toLowerCase()}">${room}</label></div>`;
});

checklistButton.addEventListener('click', () => {
    checklist.classList.toggle('hidden');
});

const checklistItem = document.querySelectorAll('.checklist-item');
checklistItem.forEach(item => {
    item.addEventListener('change', () => {
        item.classList.toggle('strikethrough');
    });
});

function generateReveal() {
    const cardContainer = document.querySelector('.card-section');
    
    Object.values(murdering_fr).forEach((card, i) => {
        cardContainer.innerHTML += `<div class="card-container">
            <div class="card-tilt">
                <div class="card">
                    <div class="card-front">
                        <img src="./images/cards/backs/${CARD_TITLES[i]}.png" alt="clue-logo" class="card-${CARD_TITLES[i].slice(0, 3)}">
                    </div>

                    <div class="card-back">
                        <img src="./images/cards/${Object.values(murdering)[i]}.png" alt="${card}">
                        <div class="card-info">
                            <p>${card}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    });
}

for (let i = 0; i < 3; i++) {
    answerSection.insertAdjacentHTML('beforeend', `<h2>${CARD_TITLES_FR[i]} (Sélectionné: <span class="guess-${i}">Aucun</span>)</h2><section class="card-list list-${i}"></section>`);

    const cardList = document.querySelector(`.list-${i}`);
    const guess = document.querySelector(`.guess-${i}`);
    
    CARD_LIBRARY_FR[i].forEach((card, j) => {
        cardList.innerHTML += `<article class="selector-card">
                <img src="./images/cards/${CARD_LIBRARY[i][j]}.png" alt="${card}" class="${Object.keys(murdering)[i]}">
                <div class="card-info">
                    <p>${card}</p>
                </div>
            </article>`
    });

    const selectorCards = cardList.querySelectorAll('.selector-card');

    selectorCards.forEach(card => {
        const cardInfo = card.querySelector('p');
        card.addEventListener('click', () => {
            guess.innerHTML = cardInfo.innerHTML;
            userGuess[Object.keys(murdering)[i]] = guess.innerHTML

            selectorCards.forEach(card => {
                card.classList.remove('selected-card');
            });

            card.classList.add('selected-card');
            
            if (Object.keys(userGuess).length === 3) {
                submitButton.classList.add('can-submit');
            };
        });
    });
};

submitButton.addEventListener('click', () => {
    if (submitButton.classList.contains('can-submit')) {
        const answerText = document.querySelector('#answer .inner-section p');
        answerText.innerHTML = `C'est l'heure de dévoiler les résultats ! Retournez chaque carte pour voir si vous avez bien deviné. Actualisez la page pour obtenir un tout nouveau jeu de cartes. <strong>Votre réponse : ${userGuess["character"]}, ${userGuess["weapon"]}, ${userGuess["rooms"]}</strong>`
        answerSection.innerHTML = '<section class="card-section"></section>';
        generateReveal();
        cardMovement();
    };
});

const innerSections = document.querySelectorAll(".inner-section");

let shuffledClueRooms = CLUE_ROOMS.sort(() => Math.random() - 0.5);
shuffledClueRooms = shuffledClueRooms.filter(item => item !== murdering.rooms);

innerSections.forEach((section, i) => {
    const imgHTML = `<img src="./images/cards/${shuffledClueRooms[i]}.png" alt="image of a ${CLUE_ROOMS[i]}" class="rooms-to-find">`;
    
    section.insertAdjacentHTML('beforeend', imgHTML);
});

const roomsToFind = document.querySelectorAll('.rooms-to-find');

turnUpOpacity.addEventListener('click', () => {
  roomsToFind.forEach(room => {
    room.classList.toggle('high-opacity');
  });
});