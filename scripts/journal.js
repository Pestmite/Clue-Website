import { journals } from "./data/journal.js";

const book = document.querySelector('.book');

for (let i = 0; i < Object.keys(journals["robot"]).length; i++) {
  book.innerHTML += `<input type="checkbox" name="c${i}" id="c${i}"></input>`
}

book.innerHTML += `<div class="flip-book"></div>`

const flipBook = document.querySelector(".flip-book");

journals["robot"].forEach((entry, i) => {
  if (i + 1 != Object.keys(journals["robot"]).length) {
    flipBook.innerHTML += `<div class="flip" id="p${i}" style="z-index: ${Object.keys(journals["robot"]).length - i};">
      <div class="back">
        ${i != 0 ? `<img src="./images/journal/${journals["robot"][i - 1] ? journals["robot"][i - 1][2] : ""}
        " alt="journal image"><label for="c${i}" class="next-button">Next &rarr;</label>` : `<label for="c${i}" class="next-button">Begin &rarr;</label>`}
      </div>
      <div class="front">
        <h2>${entry[0]}</h2>
        <p>${entry[1]}</p>
        <label for="c${i}" class="back-button">&larr; Back</label>
      </div>
    </div>`
  } else {
    flipBook.innerHTML += `<div class="flip" id="p${i}" style="z-index: ${Object.keys(journals["robot"]).length - i};">
      <div class="back"><label for="c${i}" class="next-button">Next &rarr;</label></div>
      <div class="front back-cover">
        <label for="c${i}" class="back-button">&larr; Back</label>
      </div>
    </div>`
  }
});

journals["robot"].forEach((entry, i) => {
  const page = document.querySelector(`.flip-book #p${i}`);
  const check = document.getElementById(`c${i}`);

  check.addEventListener('click', () => {
    if (check.checked) {
      page.style.transform = "rotateY(-180deg)";
      
      setTimeout(() => {
        page.style.zIndex = i + 1; 
      }, 320);
    } else {
      page.style.transform = "rotateY(0deg)";
      page.style.zIndex = Object.keys(journals["robot"]).length - i;
    }
  });
})