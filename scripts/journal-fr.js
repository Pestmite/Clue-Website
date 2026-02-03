import { journalsFr } from "./data/journal.js";

const book = document.querySelector('.book');
const journalSelectors = document.querySelectorAll('.journal-link');

let journal = "Robot";

journalSelectors.forEach(selector => {
  selector.addEventListener('click', () => {
    journalSelectors.forEach(selector => {
      if (selector.classList.contains('selected')) {
        selector.classList.remove('selected');
      }
    });

    selector.classList.add('selected');
    
    journal = selector.innerHTML;
    generateBook();
  });
});

function generateBook() {
  book.innerHTML = ''
  
  for (let i = 0; i < Object.keys(journalsFr[journal]).length; i++) {
    book.innerHTML += `<input type="checkbox" name="c${i}" id="c${i}"></input>`
  }

  book.innerHTML += `<div class="flip-book"></div>`

  const flipBook = document.querySelector(".flip-book");

  journalsFr[journal].forEach((entry, i) => {
    if (i + 1 != Object.keys(journalsFr[journal]).length) {
      flipBook.innerHTML += `<div class="flip" id="p${i}" style="z-index: ${Object.keys(journalsFr[journal]).length - i};">
        <div class="back">
          ${i != 0 ? `<img src="./images/journal/${journalsFr[journal][i - 1] ? journalsFr[journal][i - 1][2] : ""}
          " alt="journal image"><label for="c${i}" class="next-button">Prochain &rarr;</label>` : `<img src="./images/logo.png" class="cover-image" alt="clue-logo"><h2>Journal</h2><p class="journal-team">Équipe ${journal}</p><label for="c${i}" class="next-button">Commencer &rarr;</label>`}
        </div>
        <div class="front">
          <h2>${entry[0]}</h2>
          ${entry[1]}
          <label for="c${i}" class="back-button">&larr; Arrière</label>
        </div>
      </div>`
    } else {
      flipBook.innerHTML += `<div class="flip" id="p${i}" style="z-index: ${Object.keys(journalsFr[journal]).length - i};">
        <div class="back">
          <img src="./images/journal/${journalsFr[journal][i - 1] ? journalsFr[journal][i - 1][2] : ""}
          " alt="journal image"><label for="c${i}" class="next-button">voir au verso &rarr;</label></div>
        <div class="front back-cover">
          <h2 class="end-title">Fin</h2>
          <label for="c${i}" class="back-button">&larr; Arrière</label>
        </div>
      </div>`
    }
  });

  journalsFr[journal].forEach((entry, i) => {
    const page = document.querySelector(`.flip-book #p${i}`);
    const check = document.getElementById(`c${i}`);

    check.addEventListener('click', () => {
      if (check.checked) {
        page.style.transform = "rotateY(-180deg)";
        
        setTimeout(() => {
          page.style.zIndex = i + 1; 
        }, (320 - i*60));
      } else {
        page.style.transform = "rotateY(0deg)";
        page.style.zIndex = Object.keys(journalsFr[journal]).length - i;
      }
    });
  })
}

generateBook();