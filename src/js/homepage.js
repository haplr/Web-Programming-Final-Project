
Promise.all([
  fetch('../data/movie.json').then(res => res.json()),
  fetch('../data/people.json').then(res => res.json())
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