

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const myMovieList = document.getElementById('my-movie-list');
const array_movieList= [];
//let pickedMovie = "test";

//load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=cf0a3c31`;
    const res = await fetch(`${URL}`);
    const data = await res.json();


    if(data.Response == "True"){
        displayMovieList(data.Search)
        }
       ;
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if (searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
        
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){;
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
        `;
    searchList.appendChild(movieListItem);
    }
        
        
        loadMovieDetails();
}

function loadMovieDetails(){
    
    const searchMovieList = searchList.querySelectorAll('.search-list-item');
    searchMovieList.forEach(movie => {
        movie.addEventListener('click', async () => {
            //console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=cf0a3c31`);
            const movieDetails = await result.json();
            //console.log(movieDetails);
            displayMovieDetails(movieDetails);

            //adding clicked movie to an array? we'll see how this goes
        });
    });

}

function displayMovieDetails(details){
    myMovieList.innerHTML="";
    pickedMovie = details;
    resultGrid.innerHTML = `
    <div class = "movie-poster">
    <img src = "${(details.Poster != "N/A") ? details.Poster : "image-not-found.png"}" alt = "Movie Poster">
    </div>
    <div class="movie-info">
    <h3 class= "movie-title">${details.Title}</h3>
    <ul class= "movie-misc-info">
    <li class= "movie-year"> ${details.Year}</li>
    <li class= "movie-rating"> ${details.Rated}</li> 
    </ul>
    <p class = "movie-plot">${details.Plot}</p>
    </div>
    <div class = "add-button">
    <button id= "id-button" onclick="addMovieToList()">Add</button> 
   `;
}

window.addEventListener('click', (event) =>{
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});


function addMovieToList(){
    array_movieList.push(pickedMovie);
    console.log(array_movieList);
}

function displayMyList(){
    myMovieList.innerHTML='
    ';
}