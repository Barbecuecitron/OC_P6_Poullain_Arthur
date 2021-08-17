
//api_url = "http://localhost:8000/api/v1/titles"

async function getMOVIES(target,arg,range_from,range_to) {
    const api_url ="http://localhost:8000/api/v1/titles/?"+ arg
    const response = await fetch(api_url);
    const data = await response.json();
    const body = document.body;
    const targetted_div = document.getElementById(target);
    
    for (let movie_count = range_from; movie_count < range_to; movie_count++) {
            console.log(data.results[movie_count]);
            const newdiv = document.createElement('div');
            newdiv.classList = "movie-poster";
            const img = document.createElement("img");
            img.src = data.results[movie_count].image_url;
            img.alt = data.results[movie_count].title;
            // img.classList = "movie-poster";
            newdiv.appendChild(img);
            targetted_div.appendChild(newdiv);
            const overlay = document.createElement('div')
            overlay.classList = "overlay"
            newdiv.appendChild(overlay)
        }
    // const poster = document.getElementsByClassName(movie-poster);
    // poster.style.display = "flex";
    // poster.style.flexDirection = "column";
}