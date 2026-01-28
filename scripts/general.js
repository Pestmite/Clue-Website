import { goTopDown } from "./three.js";

const notepad = document.querySelector('.checklist-section');
const subheaderLink = document.querySelectorAll('a[href^="#"]');
const menu = document.querySelector('.menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const cursorElement = document.getElementById('cursor');
const preHero = document.querySelector('.pre-hero');
const getStarted = document.querySelector('.pre-hero a');
const main = document.querySelector('main');

/* Satisfying Scrolling */
subheaderLink.forEach(navLink => {
  navLink.addEventListener('click', function (event) {
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });

    event.preventDefault();
  });
});

/* Notebook disappearing */
let startY = 0;
let HIDEMIN = 80;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;

  if (currentY > HIDEMIN) {
    if (currentY > startY) {
      notepad.style.transform = 'translateY(150%)';
    } else {
      notepad.style.transform = 'translateY(0)';
    }
  } else {
    notepad.style.transform = 'translateY(0)';
  }

  startY = currentY;
});

/* Mobile Menu */
menu.addEventListener('click', () => {
  menu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!offScreenMenu.contains(e.target) && !menu.contains(e.target)) {
    offScreenMenu.classList.remove('active');
  };
});

document.addEventListener('mousemove', (e) => {
  cursorElement.style.left = `${e.clientX}px`;
  cursorElement.style.top = `${e.clientY}px`;

  const el = document.elementFromPoint(e.clientX, e.clientY);
  const cursor = window.getComputedStyle(el).cursor;

  if (cursor === "pointer" && !cursorElement.classList.contains('.cursor-pointer')) {
    cursorElement.classList.add('cursor-pointer');
  } else {
    cursorElement.classList.remove('cursor-pointer');
  }
  
  if (cursor === "pointer" || el.classList.contains("left-nav")) {
    cursorElement.classList.add("cursor-pointer");
  } else {
    cursorElement.classList.remove("cursor-pointer");
  }
});

function applyTransform(cardTilt, tiltX, tiltY, flipped) {
  cardTilt.style.transform =
    `rotateX(${tiltX}deg) rotateY(${tiltY + (flipped ? 180 : 0)}deg) translateZ(4px)`;
}

export function cardMovement() {
  const containers = document.querySelectorAll('.card-container');
  
  containers.forEach(container => {
    const cardTilt = container.querySelector('.card-tilt');

    let flipped = false;
    let isFlipping = false;
    let tiltX = 0;
    let tiltY = 0;

    container.addEventListener('mousemove', e => {
      if (isFlipping) return;
      
      const rect = container.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const midX = rect.width / 2;
      const midY = rect.height / 2;

      tiltY = ((x - midX) / midX) * 12;
      tiltX = -((y - midY) / midY) * 12;

      applyTransform(cardTilt, tiltX, tiltY, flipped);
    });

    cardTilt.addEventListener('click', () => {
      isFlipping = true;
      flipped = !flipped;
      applyTransform(cardTilt, tiltX, tiltY, flipped);

      setTimeout(() => {
        isFlipping = false;
      }, 300);
    });
  });
}


/* Get Started */
getStarted.addEventListener('click', () => {
  main.classList.remove('pre-start');
  preHero.classList.add('started');
});

main.classList.remove('pre-start');
preHero.classList.add('started');