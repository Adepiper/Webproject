const addMovieModalEl = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdropEl = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModalEl.querySelector('button');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModalEl.querySelectorAll('input');
const entrytextSection = document.getElementById('entry-text');
const movies = [];

const toggleMovieModal = () => {
  addMovieModalEl.classList.add('visible');
  toggleBackDrop();
};

const clearInputs = () => {
  userInputs.forEach((input) => {
    input.value = '';
  });
};

const updateUi = () => {
  if (movies.length === 0) {
    entrytextSection.style.display = 'block';
  } else {
    entrytextSection.style.display = 'none';
  }
};

const closeMovieModal = () => {
  addMovieModalEl.classList.remove('visible');
};

const removeMovieModal = () => {
 closeMovieModal()
};

const toggleBackDrop = () => {
  backdropEl.classList.toggle('visible');
};

const deleteMovieHandler = (id) => {
  const deleteMovieModal = document.getElementById('delete-modal');
  deleteMovieModal.classList.add('visible');
  toggleBackDrop();
  deleteMovie(id);
};

const deleteMovie = (id) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === id) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoots = document.getElementById('movie-list');
  listRoots.children[movieIndex].remove();
};

const renderNewMovieELement = (id, title, image, rating) => {
  const newMovieELement = document.createElement('li');
  newMovieELement.className = 'movie-element';
  newMovieELement.innerHTML = `
    <div class="movie-element__image">
    <img src="${image}" alt="" alt="${title}" />
  </div>
  <div class="movie-elemt__info">
    <h2>${title}</h2>
    <p>${rating}/5</p>
  </div>
    `;
  newMovieELement.addEventListener('click', deleteMovieHandler.bind(null, id));
  document.querySelector('#movie-list').append(newMovieELement);
};

const addMovie = () => {
  const title = userInputs[0].value;
  const img = userInputs[1].value;
  const rtg = userInputs[2].value;

  if (
    title.trim() === '' ||
    img.trim() === '' ||
    rtg.trim() === '' ||
    +rtg < 0 ||
    +rtg > 5
  ) {
    alert('error');
  }

  const newMovie = {
    id: Math.random().toString(),
    title,
    img,
    rtg,
  };

  movies.push(newMovie);
  closeMovieModal();
  clearInputs();
  renderNewMovieELement(newMovie.id, title, img, rtg);
  updateUi();
};

startAddMovieBtn.addEventListener('click', toggleMovieModal);
cancelAddMovieBtn.addEventListener('click', toggleMovieModal);
confirmAddMovieBtn.addEventListener('click', addMovie);
