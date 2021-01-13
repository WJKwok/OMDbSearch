import React from 'react';
import { MovieCard } from './MovieCard';

export const SearchResultCards = ({
	searchResults,
	nominationClickHandler,
	nominatedMovies,
}) => {
	return searchResults.map((movie) => {
		const alreadyNominated = movie.imdbID in nominatedMovies;
		return (
			<MovieCard
				movie={movie}
				alreadyNominated={alreadyNominated}
				nominationClickHandler={nominationClickHandler}
			/>
		);
	});
};
