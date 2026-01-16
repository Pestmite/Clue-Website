import { cardMovement } from "./general.js";

const CLUE_CHARACTERS = ["Proffessor Plum", "Colonel Mustard", "Mr. Green", "Mrs. White", "Ms. Scarlett", "Mrs. Peacock"]
const CLUE_WEAPONS = ["Revolver", "Lead Pipe", "Rope", "Candlestick", "Wrench", "Dagger"]
const CLUE_ROOMS = ["Library", "Hall", "Kitchen", "Study", "Lounge", "Conservatory", "Billiard Room", "Ballroom", "Dining Room"]

const checklist = document.querySelector('.checklist');
const checklistButton = document.querySelector('.checklist-button');
const cardContainer = document.querySelector('.card-section');

const murdering = {
    character: CLUE_CHARACTERS[Math.floor(Math.random() * CLUE_CHARACTERS.length)],
    weapon: CLUE_WEAPONS[Math.floor(Math.random() * CLUE_WEAPONS.length)],
    rooms: CLUE_ROOMS[Math.floor(Math.random() * CLUE_ROOMS.length)]
}

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

cardMovement();