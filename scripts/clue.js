const CLUE_CHARACTERS = ["Proffessor Plum", "Colonel Mustard", "Mr. Green", "Mrs. White", "Ms. Scarlett", "Mrs. Peacock"]
const CLUE_WEAPONS = ["Revolver", "Lead Pipe", "Rope", "Candlestick", "Wrench","Dagger"]
const CLUE_ROOMS = ["Library", "Hall", "Kitchen", "Study", "Lounge", "Conservatory", "Billiard Room", "Ballroom","Dining Room"]

const murdering = {
    character: CLUE_CHARACTERS[Math.floor(Math.random() * CLUE_CHARACTERS.length)],
    weapon: CLUE_WEAPONS[Math.floor(Math.random() * CLUE_WEAPONS.length)],
    rooms: CLUE_ROOMS[Math.floor(Math.random() * CLUE_ROOMS.length)]
}