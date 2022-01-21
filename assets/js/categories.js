const getTopMovies = async () => {
    const data = await fetch(`${API_PATH}/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc`)
        .then((response) => response.json())
        .then((json) => json.results)
        .catch((err) => err);
    return data;
}

const getTopTvShows = async () => {
    const data = await fetch(`${API_PATH}/discover/tv?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc`)
        .then((response) => response.json())
        .then(json => json.results)
        .catch(err => err);
    return data;
}

const getMoviesByGenre = async (genres) => {
    const genresList = genres.join(',');
    const data = await fetch(`${API_PATH}/discover/movie?api_key=${API_KEY}&with_genres=${genresList}language=pt-BR&sort_by=popularity.desc`)
        .then((response) => response.json())
        .then((json) => json.results)
        .catch((err) => err);
    console.log(data);
    return data;
}

const getTvShowsByGenre = async (genres) => {
    
    const genresObj = await fetch(`${API_PATH}/genre/tv/list?api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((json) => json.genres)
        .catch((err) => err);
    
    console.log(genresObj);

    let genresIds = [];
    genresObj.forEach((item) => {
        if (genres.includes(item.name)) genresIds.push(item.id);
    })
    genresIds = genresIds.join(',');

    const data = await fetch(`${API_PATH}/discover/tv?api_key=${API_KEY}&with_genres=${genresIds}&language=pt-BR&sort_by=popularity.desc`)
        .then((response) => response.json())
        .then((json) => json.results)
        .catch((err) => err);

    console.log(data);
    return data;
}

getTvShowsByGenre(['Family']);