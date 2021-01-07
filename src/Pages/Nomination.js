import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

import { SearchBar } from '../Components/SearchBar';
import { ResultCards } from '../Components/ResultCards';
import { NominatedList } from '../Components/NominatedList';
import { ProgressBar } from '../Components/ProgressBar';

import { OMDdBySearch } from '../Services/OMDbRequests';

export const Nomination = () => {
	const [searchInput, setSearchInput] = useState('');
	const setSearchInputDebounced = debounce(setSearchInput, 500);

	const [searchResults, setSearchResults] = useState({});
	const [nominatedMovies, setNominatedMovies] = useState({});

	const minNominatedMoviesLength = 5;

	useEffect(async () => {
		const OMDbRequestUrl = ` http://www.omdbapi.com/?s=${searchInput}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
		const results = await OMDdBySearch(OMDbRequestUrl);
		setSearchResults(results);
		console.log(results);
	}, [searchInput]);

	const nominationClickHandler = (movie) => {
		setNominatedMovies({ ...nominatedMovies, ...movie });
	};

	const removeNominationHandler = (movieId) => {
		const nominatedMoviesCopy = {
			...nominatedMovies,
		};
		delete nominatedMoviesCopy[movieId];
		setNominatedMovies(nominatedMoviesCopy);
	};

	return (
		<>
			<SearchBar searchInputUpdate={setSearchInputDebounced} />
			{searchResults.Response === 'True' ? (
				<ResultCards
					searchResults={searchResults.Search}
					nominationClickHandler={nominationClickHandler}
					nominatedMovies={nominatedMovies}
				/>
			) : (
				<p>{searchResults.Error}</p>
			)}
			<ProgressBar
				current={Object.keys(nominatedMovies).length}
				goal={minNominatedMoviesLength}
			/>
			<NominatedList
				nominatedMovies={nominatedMovies}
				removeNominationHandler={removeNominationHandler}
			/>
		</>
	);
};
