const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateCountAndTotal();
  }
});

movieSelect.addEventListener('change', e => {
  ticketPrice = parseInt(e.target.value);
  updateCountAndTotal();

  localStorage.setItem('selectedMovie', e.target.selectedIndex);
});

const updateCountAndTotal = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;

  const selectedSeatsIndex = [...selectedSeats].map(selectedSeat =>
    [...seats].indexOf(selectedSeat)
  );
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));
};

const populateUI = () => {
  const selectedSeatsIndex = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIndex = parseInt(localStorage.getItem('selectedMovie'));

  seats.forEach((seat, index) => {
    if (selectedSeatsIndex && selectedSeatsIndex.includes(index)) {
      seat.classList.add('selected');
    }
    if (selectedMovieIndex) {
      movieSelect.selectedIndex = selectedMovieIndex;
      ticketPrice = parseInt(movieSelect.value);
    }
  });

  updateCountAndTotal();
};

populateUI();
