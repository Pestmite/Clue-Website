const header = document.querySelector('header');
const subheaderLink = document.querySelectorAll('a[href^="#"]')

subheaderLink.forEach(navLink => {
  navLink.addEventListener('click', function (event) {
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });

    event.preventDefault();
  });
});

let startY = 0;
let HIDEMIN = 80;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;

  if (currentY > HIDEMIN) {
    if (currentY > startY && innerWidth > 660) {
      header.style.transform = 'translateY(-150%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
  } else {
    header.style.transform = 'translateY(0)';
  }

  startY = currentY;
});