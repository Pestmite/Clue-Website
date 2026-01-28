import { journals } from "./data/journal.js";

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
  
  for (let i = 0; i < Object.keys(journals[journal]).length; i++) {
    book.innerHTML += `<input type="checkbox" name="c${i}" id="c${i}"></input>`
  }

  book.innerHTML += `<div class="flip-book"></div>`

  const flipBook = document.querySelector(".flip-book");

  journals[journal].forEach((entry, i) => {
    if (i + 1 != Object.keys(journals[journal]).length) {
      flipBook.innerHTML += `<div class="flip" id="p${i}" style="z-index: ${Object.keys(journals[journal]).length - i};">
        <div class="back">
          ${i != 0 ? `<img src="./images/journal/${journals[journal][i - 1] ? journals[journal][i - 1][2] : ""}
          " alt="journal image"><label for="c${i}" class="next-button">Next &rarr;</label>` : `<img src="images/logo.png" alt="cover image" class="cover-image"><h2>Journal</h2><p class="journal-team">${journal} Team</p><label for="c${i}" class="next-button">Begin &rarr;</label>`}
        </div>
        <div class="front">
          <h2>${entry[0]}</h2>
          ${entry[1]}
          <label for="c${i}" class="back-button">&larr; Back</label>
        </div>
      </div>`
    } else {
      flipBook.innerHTML += `<div class="flip" id="p${i}" style="z-index: ${Object.keys(journals[journal]).length - i};">
        <div class="back">
          <img src="./images/journal/${journals[journal][i - 1] ? journals[journal][i - 1][2] : ""}
          " alt="journal image"><label for="c${i}" class="next-button">See back &rarr;</label></div>
        <div class="front back-cover">
          <h2 class="end-title">The End</h2>
          <label for="c${i}" class="back-button">&larr; Back</label>
        </div>
      </div>`
    }
  });

  journals[journal].forEach((entry, i) => {
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
        page.style.zIndex = Object.keys(journals[journal]).length - i;
      }
    });
  })
}

generateBook();