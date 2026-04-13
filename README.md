# CSC324 Final Project

## Project Description
Our web application is a movie library platform designed to help users discover, organize, and track movies. At its core, the application allows users to browse a large collection of movies and shows, explore actor and film information, and maintain a personalized watch list to keep track of what they’re currently watching, planning to watch, or have completed. 

Optional feature: The platform also provides recommendations based on trending titles and user activity, helping users find new movies and shows that match their interests. Users can search for specific titles, actors, or genres. Users can follow others’ watch lists. 

The targeted audience of this web application is anyone who watches movies, from casual viewers looking for something new to watch to film enthusiasts interested in exploring cast lists, reviews, and related media.

## Code Structure
* `index.html` — homepage
* `login.html` — login page
* `register.html` — registration page
* `account.html` - user's account page after the log in
* `movie-info.html` — movie details page
* `person-info.html` — actor/director details page
* `people-list.html` — the user's list of favorited people
* `watch-list.html` — user's watchlist
* /css/ — folder containing all CSS files
   *  `style.css` – main stylesheet
* /js/ — folder containing JavaScript files
   * `login.js` – handles login logic
   * `register.js` – handles registration logic
   * `watchlist.js` – fetches and displays movie data
* /data/ — folder containing JSON files (simulated database)
   * `account.json` – user accounts
   * `movie.json` – movie data
   * `people.json` – actor/director data
   * `people-list.json` – user's favorited actor/director data
   * `watch-list.json` – user's watchlist data
* /images/ — folder containing movie posters

## Description of Wireframe/Prototypes
Here is a link to our prototype images: [Wireframe/Prototype Image](https://github.com/user-attachments/files/25500765/protoypes.pdf)

* Navigation: Contains buttons that direct to the following pages 
* Account/Login 
* Logout 
* Watchlist 
* Login Page: The user will be able to sign into their account with a username or email and a password. (The user will be shown links to the Registration and Forgot Password Page) 
* Registration Page: The user will be able to create a new account with a valid email, a unique username, and a strong password. 
* Forgot Password Page: The user will be able to recover their account via the email they registered with. The user will receive an email with instructions to recover their account. 
* Home Page: The user will be able to do the following: 
    * Search for Movies, Actors, and other users. 
    * Movie/TV show recommendations based on watchlist and favorite actors. 
    * View popular/trending tv shows 
    * View popular/trending actors 
* Account Page: The user will be able to do the following: 
    * View account settings 
    * View followers list 
* Movie Info Page: Shows details about a Movie/TV show, along with a list of actors that starred in the show. 
* Actor Info Page: Shows details about an actor, along with a list of movies they starred in. 
* People List Page: Shows the user a list of people (e.g. actors, directors).
