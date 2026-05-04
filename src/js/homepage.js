fetch('/src/data/movie.json')
  .then(res => res.json())
  .then(movies => {
    populateTrending(movies);
    populateWatchlist(movies);
  });

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
    alert('Added to watchlist!');
  } else {
    alert('Already in your watchlist.');
  }
}