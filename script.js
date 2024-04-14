const list = document.querySelector('.players__list');
const cardWidth = 394;
const gap = 20;
let currentIndex = 0;
const counters = document.querySelectorAll('.players__counter_type_active');
let totalCount = list.children.length - 2;
let scrollAmount = 300;

function updateScrollAmount() {

  scrollAmount = window.innerWidth < 650 ? scrollAmount + gap : cardWidth + gap;

}

updateScrollAmount() 

window.addEventListener('resize', updateScrollAmount);



function handleButtonClick(direction) {
  if (direction === 'left') {
    currentIndex = Math.max(currentIndex - 1, 0);
  } else if (direction === 'right') {
    if (window.innerWidth < 650) {
      currentIndex = (currentIndex + 1) % (totalCount + 2);
    } else {
      currentIndex = (currentIndex + 1) % totalCount;
    }
  }
  updateListPosition();
  updateCounters();
}

function updateListPosition() {
  const newPosition = -(currentIndex * (window.innerWidth < 650 ? scrollAmount + gap : cardWidth + gap));
  list.style.transform = `translateX(${newPosition}px)`;
}

console.log(window.innerWidth)

function updateCounters() {
  counters.forEach(counter => {
    counter.textContent = (currentIndex + (window.innerWidth < 650 ? 1 : 3)).toString();
  });
}

let intervalId = setInterval(() => {
  currentIndex = (currentIndex + 1) % totalCount;
  updateListPosition();
  updateCounters();
}, 4000);

const links = document.querySelectorAll('.header__link');

links.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
}

document.querySelectorAll('.players__button_type_left').forEach(button => {
  button.addEventListener('click', () => {
    clearInterval(intervalId); // Очищаем текущий интервал
    handleButtonClick('left');
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalCount;
      updateListPosition();
      updateCounters();
    }, 4000);
  });
});

document.querySelectorAll('.players__button_type_right').forEach(button => {
  button.addEventListener('click', () => {
    clearInterval(intervalId);
    handleButtonClick('right');
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalCount;
      updateListPosition();
      updateCounters();
    }, 4000);
  });
});


// Для второго списка
const listTransformation = document.querySelector('.transformation__stages_type_mobile');
const cardWidthTransformation = 324;
const gapTransformation = 16;
let currentIndexTransformation = 0;
const totalCountTransformation = listTransformation.children.length;
const marksTransformation = document.querySelectorAll('.transformation__mark');

function handleButtonClickTransformation(direction) {
  const scrollAmount = cardWidthTransformation + gapTransformation;

  if (direction === 'left') {
    currentIndexTransformation = Math.max(currentIndexTransformation - 1, 0);
  } else if (direction === 'right') {
    currentIndexTransformation = (currentIndexTransformation + 1) % totalCountTransformation;
  }

  updateListPositionTransformation();
  updateCounterTransformation();
  scrollListTransformation(scrollAmount);
}

function updateListPositionTransformation() {
  const newPosition = -(currentIndexTransformation * (cardWidthTransformation + gapTransformation));
  listTransformation.style.transform = `translateX(${newPosition}px)`;
}

function updateCounterTransformation() {
  const activeMarkIndex = currentIndexTransformation % marksTransformation.length;

  marksTransformation.forEach(mark => mark.classList.remove('transformation__mark-active'));
  marksTransformation[activeMarkIndex].classList.add('transformation__mark-active');

  // Добавление класса и отключение кнопки
  const leftButton = document.querySelector('.transformation__button_type_left');
  if (currentIndexTransformation === 0) {
    leftButton.classList.add('transformation__button_type_disabled');
    leftButton.disabled = true;
  } else {
    leftButton.classList.remove('transformation__button_type_disabled');
    leftButton.disabled = false;
  }
}

function scrollListTransformation(amount) {
  const newPosition = -(currentIndexTransformation * (cardWidthTransformation + gapTransformation));
  listTransformation.style.transition = 'transform 0.5s ease-in-out';
  listTransformation.style.transform = `translateX(${newPosition - amount}px)`;

  setTimeout(() => {
    listTransformation.style.transition = 'none';
    listTransformation.style.transform = `translateX(${newPosition}px)`;
  }, 500);
}

document.querySelectorAll('.transformation__button_type_left').forEach(button => {
  button.addEventListener('click', () => handleButtonClickTransformation('left'));
});

document.querySelectorAll('.transformation__button_type_right').forEach(button => {
  button.addEventListener('click', () => handleButtonClickTransformation('right'));
});
