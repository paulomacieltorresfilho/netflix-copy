const mainMovie = document.getElementsByClassName('filme-principal')[0];
const imagesPath = 'https://image.tmdb.org/t/p/w1280';


const loadMainMovie = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`)
        .then((response) => response.json())
        .then((json) => json.results[Math.floor(Math.random() * json.results.length)])
        .catch((err) => console.log('Um erro ocorreu!: ', err.message));
    const image = data['backdrop_path'];
    console.log(data);
    console.log(image);
    mainMovie.style.background = `linear-gradient(rgba(0, 0, 0, .40), rgba(0, 0, 0, .40)100%), url(${imagesPath + image})`;
    mainMovie.style.backgroundSize = 'cover';
    return data;
}

loadMainMovie();