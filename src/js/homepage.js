let allMovies = [];
let allPeople = [];

Promise.all([
  fetch('/movie_data').then(res => res.json()),
  fetch('/people_data').then(res => res.json())
])
.then(([movies, people]) => {
  populateTrending(movies);
  populateWatchlist(movies);
  populateActorPanel(people, movies);
});

/*movie population functions*/

function populateTrending(movies) {
  const movie = movies[Math.floor(Math.random() * movies.length)];
  const section = document.getElementById('trending');

  section.innerHTML = `
    <h2>Trending</h2>
    <div class="trending-item">
      <img src="${movie.posterURL}" alt="${movie.title} poster" />
      <div class="trending-info">
        <h3>${movie.title} (${movie.year})</h3>
        <p><strong>Genre:</strong> ${movie.genre.join(', ')}</p>
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>Cast:</strong> ${movie.cast.join(', ')}</p>
        <p>${movie.description}</p>
        <button onclick="addToWatchlist(${movie.id})">+ Watchlist</button>
      </div>
    </div>
  `;
}

function populateWatchlist(movies) {
  const section = document.getElementById('watchlist');

  const cards = movies.map(movie => `
    <div class="movie-card" data-id="${movie.id}">
      <img src="${movie.posterURL}" alt="${movie.title} poster" />
      <p>${movie.title}</p>
      <button onclick="addToWatchlist(${movie.id})">+ Watchlist</button>
    </div>
  `).join('');

  section.innerHTML = `
    <h2>What to Watch</h2>
    <div class="movie-list">${cards}</div>
  `;
}

function addToWatchlist(id) {
  const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

  if (!watchlist.includes(id)) {
    watchlist.push(id);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    alert('Movie added to your watchlist!');
  } else {
    alert('Sorry, this movie is already in your watchlist.');
  }
}

/*actor population functions*/

function populateActorPanel(people, movies) {
  const validPeople = people.filter(person => person.bio !== null);
  const randomPerson = validPeople[Math.floor(Math.random() * validPeople.length)];

  const panel = document.getElementById('actor-panel');

  panel.innerHTML = `
    <h2>${randomPerson.name}</h2>
    <p>Born: ${randomPerson.dateOfBirth}</p>
    <p>${randomPerson.bio}</p>
    <h3>Movies & Shows</h3>
    <ul>
      ${buildMovieLinks(randomPerson.movies, movies)}
    </ul>
  `;
}

function buildMovieLinks(personMovies, allMovies) {
  return personMovies.map(title => {
    const match = allMovies.find(m => m.title === title);
    if (match) {
      return `<li><a href="movie-info.html?id=${match.id}">${title}</a></li>`;
    }
    return `<li>${title}</li>`;
  }).join('');
}

const searchInput = document.getElementById('search');
const searchForm = document.getElementById('search-container');
const navbar = document.querySelector('.navbar');

const dropdown = document.createElement('div');
dropdown.id = 'search-dropdown';
searchForm.appendChild(dropdown);

Promise.all([
  fetch('../data/movie.json').then(res => res.json()),
  fetch('../data/people.json').then(res => res.json())
])
.then(([movies, people]) => {
  allMovies = movies;
  allPeople = people;
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  if (query.length === 0) {
    dropdown.innerHTML = '';
    dropdown.style.display = 'none';
    return;
  }

  const movieResults = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(query)
  );

  const peopleResults = allPeople.filter(person =>
    person.name && person.name.toLowerCase().includes(query)
  );

  displayDropdown(movieResults, peopleResults);
});

searchForm.addEventListener('submit', event => {
  event.preventDefault();
});

document.addEventListener('click', event => {
  if (!navbar.contains(event.target)) {
    dropdown.innerHTML = '';
    dropdown.style.display = 'none';
  }
});

function displayDropdown(movieResults, peopleResults) {
  dropdown.innerHTML = '';

  if (movieResults.length === 0 && peopleResults.length === 0) {
    dropdown.innerHTML = '<div class="dropdown-item">Sorry, No results found!</div>';
    dropdown.style.display = 'block';
    return;
  }

  movieResults.forEach(movie => {
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.innerHTML = `
      ${movie.title}
      <span class="dropdown-tag movie-tag">Movie</span>
    `;
    item.addEventListener('click', () => {
      window.location.href = `movie-info.html?id=${movie.id}`;
    });
    dropdown.appendChild(item);
  });

  peopleResults.forEach(person => {
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.innerHTML = `
      ${person.name}
      <span class="dropdown-tag person-tag">Person</span>
    `;
    item.addEventListener('click', () => {
      window.location.href = `person-info.html?name=${encodeURIComponent(person.name)}`;
    });
    dropdown.appendChild(item);
  });

  dropdown.style.display = 'block';
}