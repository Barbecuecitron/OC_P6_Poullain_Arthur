//API_URL = "http://localhost:8000/api/v1/titles"

const API_BASE = "http://localhost:8000/api/v1";

const categories = [
  {
    id: "best_movie",
    title: "Meilleur film",
    query: "sort_by=-imdb_score",
    start: 0,
    end: 1,
    visibleItems: 1,
  },
  {
    id: "best_rated",
    title: "Les mieux notés",
    query: "sort_by=-imdb_score",
    start: 1,
    end: 8,
    visibleItems: 4,
  },
  {
    id: "old_movies",
    title: "Films d'un autre temps",
    query: "sort_by=year",
    start: 0,
    end: 7,
    visibleItems: 4,
  },
  {
    id: "anime_movies",
    title: "Films d'animation",
    query: "genre_contains=animation",
    start: 0,
    end: 7,
    visibleItems: 4,
  },
  {
    id: "history_movies",
    title: "Films & Récits Historiques",
    query: "genre_contains=history",
    start: 0,
    end: 7,
    visibleItems: 4,
  },
];
// Remplacer par une fonction qui peuple la modale
const url_base = "http://localhost:8000/api/v1/";

async function getMovies(query, start, end) {
  const movies = [];
  let apiURL = `${API_BASE}/titles/?${query}`;

  while (movies.length < end - start && apiURL) {
    const response = await fetch(apiURL);
    const data = await response.json();
    movies.push(...data.results);
    apiURL = data.next;
  }

  //  http://localhost:8000/api/v1/titles/499549 lien qui sauve des vies

  // We retrieve 5 by 5, if we want 7, we retrieve 10 and slice(0, 7) to have the 7 firsts
  // Way better than our previous version where we had to check if the number was a %5
  slicedMovies = movies.slice(start, end);
  movieDict = {};
  for (const movie of slicedMovies) {
    movieID = movie.id;
    movieDict[movieID] = { title: movie.title, image_url: movie.image_url };
  }
  console.log(movieDict);
  return movieDict;
}

// Loop through our parent's ( parameter ) children and push them in a loop
function getMoviesPostersFromNode(node) {
  const moviePosters = [];

  for (const childNode of node.childNodes) {
    if (childNode.className === "movie-poster") {
      moviePosters.push(childNode);
    }
  }

  return moviePosters;
}
// Get the previous Posters if available
function previous(e) {
  const parentDiv = e.target.parentNode;
  const moviePosters = getMoviesPostersFromNode(parentDiv);

  let lastVisible = null;
  let previousHidden = true;
  for (let i = moviePosters.length - 1; i >= 0; i--) {
    const currentPoster = moviePosters[i];

    if (currentPoster.hidden === false && lastVisible === null) {
      lastVisible = currentPoster;
    }

    if (
      currentPoster.hidden === true &&
      previousHidden === false &&
      lastVisible !== null
    ) {
      lastVisible.hidden = true;
      currentPoster.hidden = false;
      break;
    }

    previousHidden = currentPoster.hidden;
  }
}

// Next poster if available
function next(e) {
  const parentDiv = e.target.parentNode;
  const moviePosters = getMoviesPostersFromNode(parentDiv);

  let firstVisible = null;
  let previousHidden = true;
  for (let i = 0; i < moviePosters.length; i++) {
    const currentPoster = moviePosters[i];

    if (currentPoster.hidden === false && firstVisible === null) {
      firstVisible = currentPoster;
    }

    if (
      currentPoster.hidden === true &&
      previousHidden === false &&
      firstVisible !== null
    ) {
      firstVisible.hidden = true;
      currentPoster.hidden = false;
      break;
    }

    previousHidden = currentPoster.hidden;
  }
}
function deleteModal(modal) {
  for (let item of modal) {
    item.remove();
  }
}

// Retrieve our extra movie informations on click
async function getMoviesInfos(movieID) {
  const extraInfos = [];
  // const urlBase = "http://localhost:8000/api/v1/titles/";
  // alert(movieID);
  const url = `http://localhost:8000/api/v1/titles/${movieID}`;
  const response = await fetch(url);
  // alert(apiURL);
  const data = await response.json();
  console.log(data);
  return data;
}

// Populate the modal content
async function populateModal(movieID) {
  // Creates the title slot
  movie = await getMoviesInfos(movieID);
  console.log("VOILA LES RESULTATS");
  console.log(movie);

  const movieTitle = document.createElement("div");
  movieTitle.classList.add("popup");
  movieTitle.setAttribute("id", "popup-title");
  movieTitle.innerHTML = `<p>${movie["title"]}</p>`;
  // Image slot
  const movieImg = document.createElement("img");
  movieImg.src = movie.image_url;
  movieImg.alt = movie.title;
  movieImg.setAttribute("id", "popup-img");

  // Genre Slot
  console.log(movie);
  const movieGenres = document.createElement("div");
  movieGenres.classList.add("popup");
  movieGenres.setAttribute("id", "popup-genres");
  const genresAsString = movie["genres"].join(", ");
  movieGenres.innerHTML = `<p>Genres : ${genresAsString}</p>`;

  // Release Date
  const releaseDate = document.createElement("div");
  releaseDate.classList.add("popup");
  releaseDate.setAttribute("id", "popup-releaseDate");
  releaseDate.innerHTML = `<p>Release Date : ${movie.date_published}</p>`;

  // Rated
  const rated = document.createElement("div");
  rated.classList.add("popup");
  rated.setAttribute("id", "popup-rated");
  rated.innerHTML = `<p>Rated : ${movie.rated}</p>`;
  // imdb_score
  const imdbScore = document.createElement("div");
  imdbScore.classList.add("popup");
  imdbScore.setAttribute("id", "popup-imdb_score");
  imdbScore.innerHTML = `<p>Imdb Score : ${movie.imdb_score} / 10</p>`;
  //directors
  const directors = document.createElement("div");
  directors.classList.add("popup");
  directors.setAttribute("id", "popup-directors");
  const directorsAsString = movie["directors"].join(", ");
  directors.innerHTML = `<p>Directed by : ${directorsAsString}</p>`;

  // actors
  const actorsBox = document.createElement("div");
  actorsBox.setAttribute("id", "popup-actorsBox");
  const actors = document.createElement("div");
  actors.classList.add("popup");
  actors.setAttribute("id", "popup-actors");
  const actorsAsString = movie["actors"].join(", ");
  actors.innerHTML = `<p>Starring : ${actorsAsString}</p>`;
  // We append the actors to the box, so it will be automatically added to the document
  // When the box will be too
  actorsBox.appendChild(actors);

  // duration
  const duration = document.createElement("div");
  duration.classList.add("popup");
  duration.setAttribute("id", "popup-duration");
  duration.innerHTML = `<p>${movie.duration} mns</p>`;

  // countries
  const countries = document.createElement("div");
  countries.classList.add("popup");
  countries.setAttribute("id", "popup-countries");
  const countriesAsString = movie["countries"].join(", ");
  countries.innerHTML = `<p>From ${countriesAsString}</p>`;

  // worldwide_gross_income / box office
  const boxOffice = document.createElement("div");
  boxOffice.classList.add("popup");
  boxOffice.setAttribute("id", "popup-boxOffice");
  boxOffice.innerHTML = `<p>Box Office : ${
    movie.worldwide_gross_income || "Test"
  }</p>`;

  // long_description / Resume
  const resume = document.createElement("div");
  resume.classList.add("popup");
  resume.setAttribute("id", "popup-resume");
  resume.innerHTML = `<p>Resume : ${movie.long_description}</p>`;

  // Append every element we want to add into a list so we can loop & add them later on
  const modalElements = [
    movieTitle,
    movieImg,
    movieGenres,
    releaseDate,
    rated,
    imdbScore,
    directors,
    actorsBox,
    duration,
    countries,
    boxOffice,
    resume,
  ];
  return modalElements;
}

// Create the modal skeleton
async function createModal(movieID) {
  const modalSection = document.getElementsByClassName("popup");
  const body = document.body;
  // Let's create the modal div
  const modal = document.createElement("div");
  modal.classList.add("popup");
  modal.classList.add("background");
  modal.setAttribute("id", "modal");

  // Add a special div to wrap the content up
  const modalBase = document.createElement("div");
  modalBase.classList.add("popup", "content");
  modalBase.setAttribute("id", "modal-base");
  const modalElements = await populateModal(movieID);
  for (let htmlElem of modalElements) {
    modalBase.appendChild(htmlElem);
  }
  // Creates the close button
  const button = document.createElement("div");
  button.setAttribute("id", "close-button");
  button.innerHTML += "&times;";

  // Append children to parent elements
  modalBase.appendChild(button);
  modal.appendChild(modalBase);
  body.appendChild(modal);

  // Closes the modal window from the exit button
  button.onclick = function (e) {
    deleteModal(modalSection);
  };

  // Closes the modal window if we click away from it
  window.onclick = function (event) {
    if (event.target.className == "popup background") {
      deleteModal(modalSection);
    }
  };
}

// Creates our desired movie section, called from HTML
async function buildMoviesSection(sectionId) {
  const section = document.getElementById(sectionId);

  for (const category of categories) {
    const movies = await getMovies(
      category.query,
      category.start,
      category.end
    );

    // Create h2 title
    const h2 = document.createElement("h2");
    h2.classList.add(category.id + "_title");
    h2.appendChild(document.createTextNode(category.title));

    // Create div to contains all movie divs
    const carouselDiv = document.createElement("div");
    carouselDiv.classList.add("caroussel-wrapper");

    if (category.end > category.visibleItems) {
      const previousDiv = document.createElement("div");
      previousDiv.classList.add("left-arrow");
      previousDiv.classList.add("arrow");
      previousDiv.appendChild(document.createTextNode("<"));
      previousDiv.onclick = previous;
      carouselDiv.appendChild(previousDiv);
    }

    let i = 0;
    for (const [movieID, movie] of Object.entries(movies)) {
      // Create img node
      const movieInfosHolder = document.createElement("img");
      movieInfosHolder.src = movie.image_url;
      movieInfosHolder.alt = movie.title;

      const movieOverlay = document.createElement("div");
      movieOverlay.classList.add("overlay");
      // Create movie div and add img to it
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie-poster");

      // On click Function to open the modal window
      movieDiv.onclick = function (e) {
        // Customize the modal to fit the current movie
        createModal(movieID);
      };
      movieDiv.appendChild(movieInfosHolder);
      movieDiv.appendChild(movieOverlay);
      // Hide movies if out of scope
      if (i >= category.visibleItems) {
        movieDiv.hidden = true;
      }
      carouselDiv.appendChild(movieDiv);
      i++;
    }

    if (category.end > category.visibleItems) {
      const nextDiv = document.createElement("div");
      nextDiv.classList.add("right-arrow");
      nextDiv.classList.add("arrow");
      nextDiv.appendChild(document.createTextNode(">"));
      nextDiv.onclick = next;
      carouselDiv.appendChild(nextDiv);
    }

    // Create div for category and add title and carousel (list of movies)
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add(category.id + "_section");
    sectionDiv.setAttribute("id", category.id);
    sectionDiv.appendChild(h2);
    sectionDiv.appendChild(carouselDiv);

    // Add category div to section
    section.appendChild(sectionDiv);
  }
}
