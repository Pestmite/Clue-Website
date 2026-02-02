import { teamInfo } from "./data/bio.js";

const rosterSection = document.querySelector('.roster')
const house = document.querySelector('.clue-house');

const rooms = {
  "Kitchen": { x: 200,  y: 430,  w: 180, h: 90 },
  "Ballroom": { x: 525, y: 165,  w: 190, h: 95 },
  "Study": { x: 290, y: 165,  w: 135, h: 95 },
  "Library": { x: 615,  y: 430, w: 95, h: 90 },
  "Lounge": { x: 200, y: 330, w: 95, h: 65 },
  "Hall": { x: 430, y: 270, w: 240, h: 160 },
  "Billiard Room": { x: 525, y: 430, w: 95, h: 90 },
  "Conservatory": { x: 290, y: 430, w: 150, h: 90 },
  "Dining Room": { x: 290, y: 270, w: 135, h: 100 }
};

const placedDots = [];

function overlaps(x, y, minDist = 2) {
  return placedDots.some(p => {
    const dx = p.x - x;
    const dy = p.y - y;
    return Math.sqrt(dx * dx + dy * dy) < minDist;
  });
}

function randomInRoom(room) {
  let left, top, attempts = 0;

  do {
    left = room.x + Math.random() * room.w;
    top = room.y + Math.random() * room.h;
    attempts++;
  } while (overlaps(left, top) && attempts < 50);

  placedDots.push({ left, top });
  return { left, top };
}

teamInfo.forEach(person => {
  const room = rooms[person.room];
  const pos = randomInRoom(room);

  const dot = document.createElement('div');
  dot.className = 'circle';
  dot.style.left = pos.left + 'px';
  dot.style.top = pos.top + 'px';

  dot.innerHTML += `<span class="circle-text">
    Victim: ${person.name}<br>
    Role: ${person.team}<br>
    Weapon: ${person.weapon}<br>
    Room: ${person.room}<br>
    Last Words: ${person.finalWords}
    </span>
    <div class="dot-img">
      <img src="./images/bio/${person.name}.Dagger.jpeg" alt="${person.name}">
    </div>`
  
  if (person.team.includes('Captain')) {
    dot.classList.add('captain')
  }
  
  rosterSection.appendChild(dot);
});