// fetching data from JSON
async function getMovies() {
    const response = await fetch("data/movie.json");
    const movies = await response.json();
    
    return movies;
}

// creating the HTML structure for data (movies)
async function createItemCard({title, year, director, studio, posterURL, description, cast, genre}) {
    const film = document.createElement("tr");

    const film_title = document.createElement("td");
    film_title.classList.add("film-name");
    film_title.textContent = title;

    const release_year = document.createElement("td");
    release_year.classList.add("release_year");
    release_year.textContent = year;
    
    const film_director = document.createElement("td");
    film_director.classList.add("director");
    film_director.textContent = director;
    
    const film_studio = document.createElement("td");
    film_studio.classList.add("studio-distributor");
    film_studio.textContent = studio;

    const poster = document.createElement("td");
    const image = document.createElement("img");
    image.classList.add("poster");
    image.src = posterURL;
    poster.appendChild(image);

    const film_info = document.createElement("td");
    // const p_info = document.createElement("p");
    // p_info.classList.add("film-info");
    // p_info.textContent = description;
    // film_info.appendChild(p_info);
    film_info.textContent = description;

    const main_casts = document.createElement("td");
    // const castList = document.createElement("p");
    // const castText = cast.join(", ");
    // castList.textContent = castText;
    // main_casts.appendChild(castList);
    main_casts.textContent = cast.join(", ");

    const genres = document.createElement("td");
    // const genreList = document.createElement("p");
    // const genreText = genre.join(", ");
    // genreList.textContent = genreText;
    // genres.appendChild(genreList);
    genres.textContent = genre.join(", ");
    
    film.append(film_title, release_year, film_director, film_studio, film_info, main_casts, genres);
    // when user click on movie
    // button.addEventListener('click', () => {
    //     alert(`Thank you for your interest in the ${name}. Unfortunately, the cart is unavailable at this time.`)
    // });

    return film;
}

// add the data to the container
// -> show movies on the website
async function createItems() {    
    const movies = await getMovies();

    const container = document.querySelector("#container");

    for (const movie of movies) {
        const card = await createItemCard(movie);
        container.appendChild(card);
    }
}

export default createItems;