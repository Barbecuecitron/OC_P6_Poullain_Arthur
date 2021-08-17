
//api_url = "http://localhost:8000/api/v1/titles"

async function getMOVIES(target,arg) {
    const api_url ="http://localhost:8000/api/v1/titles/?"+ arg
    const response = await fetch(api_url);
    const data = await response.json();
    const body = document.body;
    const W = screen.width
    const H = screen.height
    const targetted_div = document.getElementById(target);

    for (let movie_count = 0; movie_count < 4; movie_count++) {
            console.log(data.results[movie_count])
            const img = document.createElement("img");
            img.src = data.results[movie_count].image_url
            img.style.marginLeft = "10px"
            targetted_div.appendChild(img)
        }
    const poster = document.getElementsByClassName(movie-poster);
    poster.style.display = "flex";
    poster.style.flexDirection = "column";
}