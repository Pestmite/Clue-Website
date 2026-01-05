import { goTopDown } from "./three.js";

const header = document.querySelector('header');
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

/* Header disappearing */
/* let startY = 0;
let HIDEMIN = 80;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;

  if (currentY > HIDEMIN) {
    if (currentY > startY && innerWidth > 800) {
      header.style.transform = 'translateY(-150%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
  } else {
    header.style.transform = 'translateY(0)';
  }

  startY = currentY;
}); */

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

/* Get Started */
getStarted.addEventListener('click', () => {
  main.classList.remove('pre-start');
  preHero.classList.add('started');

  goTopDown();
});

main.classList.remove('pre-start');
  preHero.classList.add('started');

  goTopDown();