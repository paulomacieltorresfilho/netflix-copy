const mainMovieDiv = document.getElementsByClassName('filme-principal')[0];
const mainMovie = {
    title: document.querySelectorAll('.filme-principal .titulo')[0],
    description: document.querySelectorAll('.filme-principal .descricao')[0]
}


const loadMainMovie = async () => {
    const data = await fetch(`${API_PATH}/movie/popular?api_key=${API_KEY}&language=pt-BR`)
        .then((response) => response.json())
        .then((json) => json.results[Math.floor(Math.random() * json.results.length)])
        .catch((err) => console.log('Um erro ocorreu!: ', err.message));
    const image = data['backdrop_path'];
    mainMovieDiv.style.background = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)12%),  url(${IMAGES_PATH + image})`;
    mainMovieDiv.style.backgroundSize = 'cover';
    mainMovie.title.innerHTML = data['title'];
    mainMovie.description.innerHTML = data['overview'];
    return data;
}

loadMainMovie();