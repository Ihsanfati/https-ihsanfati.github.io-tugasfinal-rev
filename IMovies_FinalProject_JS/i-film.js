const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function(){
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies)
});

document.addEventListener('click', async function(e){ //e = elemen
    if(e.target.classList.contains('modal-detail-button')){
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    }
});

function getMovieDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=965907d7&i=' + imdbid)
        .then(response => response.json())
        .then(m => m);
}

function updateUIDetail(m){
    const movieDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}

function getMovies(keyword){
    return fetch('http://www.omdbapi.com/?apikey=965907d7&s=' + keyword)
        .then(response => response.json())
        .then(response => response.Search);
}

function updateUI(movies){
    let cards = '';
    movies.forEach(m => {
        cards += showCards(m);
    });
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
}

//fungsi untuk menampilkan 'cards' movie
function showCards(m){
    return `<div class="col-md-3 my-5">
                <div class="card mx-5 movie-card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title} (${m.Year})</h5>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal"
                        data-imdbid="${m.imdbID}">
                            Show details!
                        </a>
                    </div>
                </div>
            </div>`;
}

//fungsi untuk menampilkan detail movie saat 'cards' aktif
function showMovieDetail(m){
    return `<div class="container-fluid">  <!-- untuk membuat modal yang dinamis -->
                <div class="row">
                    <div class="col-md-3 my-2">
                        <img src="${m.Poster}" class="img-fluid">  <!-- agar gambar yang ditampilkan dinamis-->
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h5><strong>${m.Title} (${m.Year})</strong></h5>
                            </li>
                            <li class="list-group-item">Director : ${m.Director}</li>
                            <li class="list-group-item">Actors : ${m.Actors}</li>
                            <li class="list-group-item">Writer : ${m.Writer}</li>
                            <li class="list-group-item">Plot : <i>${m.Plot}</i></li>
                        </ul>
                    </div>
                </div>
            </div>`;
}