// fetch api
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a904b75829fb6c035147a2bafbb6b628&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=a904b75829fb6c035147a2bafbb6b628&query=";

// display data 
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const getMovies = async (APIURL) => {
    const res = await fetch(APIURL);
    const data = await res.json();
    console.log(data);
    showMovies(data.results);
};
const showMovies = (movies) => {
    main.innerHTML = "";
    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMGPATH}${poster_path}" alt="${title}"/>
        <div class="movie-info">
            <h2 class="movie-title">${title}</h2>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`;
        main.appendChild(movieEl);
    });
};

getMovies(APIURL);
const getClassByRate = (vote) => {
    if (vote >= 8) return 'green';
    else if (vote >= 5) return 'orange';
    else return 'red';
};

//searchbar functionality
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});