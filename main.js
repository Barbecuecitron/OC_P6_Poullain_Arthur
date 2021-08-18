//API_URL = "http://localhost:8000/api/v1/titles"

async function getMOVIES(target, arg, range_from, range_to) {
  let page_num = 1;
  let API_URL = `http://localhost:8000/api/v1/titles/?${arg}&page=${page_num}`;
  console.log(API_URL);
  console.log(page_num);
  let response = await fetch(API_URL);
  let data = await response.json();
  const body = document.body;
  const targetted_div = document.getElementById(target);
  let compteur = 0;
  // Lets loop from our start to our end idx
  for (let movie_count = range_from; movie_count < range_to; movie_count++) {
    const newdiv = document.createElement("div");
    newdiv.classList = "movie-poster";
    const img = document.createElement("img");
    // Début du validity check
    // Je vérifie si l'élément existe sur ma page
    if (typeof data.results[movie_count] == "undefined") {
      console.log("UNDEFINED ", movie_count);
      page_num++;
      API_URL = `http://localhost:8000/api/v1/titles/?${arg}&page=${page_num}`;
      response = await fetch(API_URL);
      data = await response.json();
      if (movie_count % 5 == 0) {
        movie_count = 0;
      }
      // Sortie de notre validity check
    }

    img.src = data.results[movie_count].image_url;
    img.alt = data.results[movie_count].title;
    newdiv.appendChild(img);
    targetted_div.appendChild(newdiv);
    const overlay = document.createElement("div");
    overlay.classList = "overlay";
    newdiv.appendChild(overlay);
    //  Check if our newdiv's index is greater than 4 so we decide to auto hide it or not
    if (compteur >= 4) {
      newdiv.style.display = "none";
    }
    compteur++;
    if (compteur == range_from + range_to) {
      return;
    }
  }
}
