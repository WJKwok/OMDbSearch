export const fallBackMoviePoster = (url) => {
	if (url === 'N/A') {
		return '/images/default-movie-poster.jpg';
	}
	return url;
};
