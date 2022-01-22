const getTopMovies = async () => {
    return await getResultsList(`/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc`);
}

const getTopTvShows = async () => {
    return await getResultsList(`/discover/tv?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc`);
}

const getTop = async () => {
	const movies = await getTopMovies();
	const tvShows = await getTopTvShows();
	const topMedias = [];
	let m, t;
	m = t = 0;

	for (let i = 0; i < movies.length; i++) {
		if (movies[m].popularity >= tvShows[t].popularity) topMedias.push(movies[m++]);
		else topMedias.push(tvShows[t++]);
	}
	return topMedias;
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

    return await getResultsList(`/discover/movie?api_key=${API_KEY}&with_genres=${genresIds}&language=pt-BR&sort_by=vote_average.desc&vote_count.gte=500&primary_release_date.gte=2000-01-01`);
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

    return await getResultsList(`/discover/tv?api_key=${API_KEY}&with_genres=${genresIds}&language=pt-BR&sort_by=vote_average.desc&vote_count.gte=500&first_air_date.gte=2000-01-01`);
}

const insertImgs = async (className, func, arg) => {
    const itemsList = document.querySelectorAll(`.carrossel.${className} .item img`);
    const moviesList = await func(arg);
    console.log(moviesList);
    itemsList.forEach((item, index) => {
        item.src = `${IMAGES_PATH}${POSTER_SIZE}${moviesList[index].poster_path}`
    })
}

insertImgs('em-alta', getTop);
insertImgs('f-para-familia', getMoviesByGenres, ['Family']);
insertImgs('tv-para-familia', getTvShowsByGenres, ['Family']);


