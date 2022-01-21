const getTopMovies = async () => {
    return await getResultsList(`/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc`);
}

const getTopTvShows = async () => {
    return await getResultsList(`/discover/tv?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc`);
}

const getMoviesByGenres = async (genres) => {
    const genresObj = await fetch(`${API_PATH}/genre/tv/list?api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((json) => json.genres)
        .catch((err) => err);

    let genresIds = [];
    genresObj.forEach((item) => {
        if (genres.includes(item.name)) genresIds.push(item.id);
    })
    genresIds = genresIds.join(',');

    return await getResultsList(`/discover/movie?api_key=${API_KEY}&with_genres=${genresIds}&language=pt-BR&sort_by=popularity.desc`);
}

const getTvShowsByGenres = async (genres) => {  
    const genresObj = await fetch(`${API_PATH}/genre/tv/list?api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((json) => json.genres)
        .catch((err) => err);

    let genresIds = [];
    genresObj.forEach((item) => {
        if (genres.includes(item.name)) genresIds.push(item.id);
    })
    genresIds = genresIds.join(',');

    return await getResultsList(`/discover/tv?api_key=${API_KEY}&with_genres=${genresIds}&language=pt-BR&sort_by=popularity.desc`);
}

const insertImgs = async (className, func) => {
    const itemsList = document.querySelectorAll(`.carrossel-filmes.${className} .item img`);
    const moviesList = await func();
    console.log(itemsList);
    itemsList.forEach((item, index) => {
        item.src = `${IMAGES_PATH}${POSTER_SIZE}${moviesList[index].poster_path}`
    })
}

insertImgs('em-alta', getTopMovies);