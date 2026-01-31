import { cardMovement } from "./general.js";

const CLUE_CHARACTERS = ["Proffessor Plum", "Colonel Mustard", "Mr. Green", "Mrs. White", "Ms. Scarlett", "Mrs. Peacock"]
const CLUE_WEAPONS = ["Revolver", "Lead Pipe", "Rope", "Candlestick", "Wrench", "Dagger"]
const CLUE_ROOMS = ["Library", "Hall", "Kitchen", "Study", "Lounge", "Conservatory", "Billiard Room", "Ballroom", "Dining Room"]

const CARD_LIBRARY = [CLUE_CHARACTERS, CLUE_WEAPONS, CLUE_ROOMS]
const CARD_TITLES = ["Character Selector", "Weapon Selector", "Room Selector"]

const checklist = document.querySelector('.checklist');
const checklistButton = document.querySelector('.checklist-button');
const answerSection = document.querySelector('.answer-section');
const submitButton = document.querySelector('.submit-button');

const murdering = {
    character: CLUE_CHARACTERS[Math.floor(Math.random() * CLUE_CHARACTERS.length)],
    weapon: CLUE_WEAPONS[Math.floor(Math.random() * CLUE_WEAPONS.length)],
    rooms: CLUE_ROOMS[Math.floor(Math.random() * CLUE_ROOMS.length)]
}

const userGuess = {}

checklist.innerHTML += `<h4>Characters</h4>`
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
    
    Object.values(murdering).forEach(card => {
        cardContainer.innerHTML += `<div class="card-container">
            <div class="card-tilt">
                <div class="card">
                    <div class="card-front">
                        <img src="./images/logo.png" alt="clue-logo">
                    </div>

                    <div class="card-back">
                        <img src="./images/cards/${card}.png" alt="${card}">
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
    answerSection.insertAdjacentHTML('beforeend', `<h2>${CARD_TITLES[i]} (Selected: <span class="guess-${i}">None</span>)</h2><section class="card-list list-${i}"></section>`);

    const cardList = document.querySelector(`.list-${i}`);
    const guess = document.querySelector(`.guess-${i}`);
    
    CARD_LIBRARY[i].forEach(card => {
        cardList.innerHTML += `<article class="selector-card">
                <img src="./images/cards/${card}.png" alt="${card}" class="${Object.keys(murdering)[i]}">
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
        answerText.innerHTML = `It\'s time for the big reveal! Flip each card to see whether or not you guessed correctly. Refresh the page for a completely different set of cards. <strong>Your guess: ${userGuess["character"]}, ${userGuess["weapon"]}, ${userGuess["rooms"]}</strong>`
        answerSection.innerHTML = '<section class="card-section"></section>';
        generateReveal();
        cardMovement();
    };
});

const innerSections = document.querySelectorAll(".inner-section");

innerSections.forEach((section, i) => {
    section.innerHTML += `<img src="./images/cards/${CLUE_ROOMS[i]}.png" alt="image of a ${CLUE_ROOMS[i]}" class="rooms-to-find">`
});