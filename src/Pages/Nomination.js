import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

import { SearchBar } from '../Components/SearchBar';
import { ResultCards } from '../Components/ResultCards';

import { OMDdBySearch } from '../Services/OMDbRequests';

export const Nomination = () => {
	const [searchInput, setSearchInput] = useState('');
	const setSearchInputDebounced = debounce(setSearchInput, 500);

	const [searchResults, setSearchResults] = useState({});
	const [nominatedMovies, setNominatedMovies] = useState({});

	useEffect(async () => {
		const OMDbRequestUrl = ` http://www.omdbapi.com/?s=${searchInput}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
		const results = await OMDdBySearch(OMDbRequestUrl);
		setSearchResults(results);
		console.log(results);
	}, [searchInput]);

	const nominationClickHandler = (movie) => {
		setNominatedMovies({ ...nominatedMovies, ...movie });
		console.log('nominatedMovies', nominatedMovies);
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
		</>
	);
};
