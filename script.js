

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');

//load movies from API
async function loadMovies(searchTerm){
    const URL = 'https://omdbapi.com/?s=${searchTerm}&page=1&apikey=cf0a3c31';
    const res = await fetch(`${URL}`);
    const data = await res.json();


    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if (searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }

function displayMovieList(movies){
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx ++){
        let movieListItem = document.createElement('div'); //creating a div within the HTML
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add('search-list-item');
        if (movies[idx].Poster != "N/A"){
            moviePoster = movies[idx].Poster; 
            
        }else {
            moviePoster = "movie-not-found.jpg";
        }

        //the little thumbnail that displays in the list
        movieListItem.innerHTML = `
            <div class = "search-item-thumbnail">
                <img src = "${moviePoster}">
            </div>
            
            <div class = "search-item-info">
                <h3>${movies[idx].Title}</h3>
                <p>${movies[idx].Year}</p>
            </div>
        `}
        loadMovieDetails();
}

function loadMovieDetails(){
    
}
}