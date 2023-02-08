const dateElement = document.querySelector('.current-time');

const currentDate = new Date();
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

dateElement.textContent = currentDate.toLocaleDateString('en-US', options);
