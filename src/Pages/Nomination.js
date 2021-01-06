import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

import { SearchBar } from '../Components/SearchBar';

import { OMDdBySearch } from '../Services/OMDbRequests';

export const Nomination = () => {
	const [searchInput, setSearchInput] = useState('');
	const setSearchInputDebounced = debounce(setSearchInput, 500);

	const [searchResults, setSearchResults] = useState({});

	useEffect(async () => {
		const OMDbRequestUrl = ` http://www.omdbapi.com/?s=${searchInput}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
		const results = await OMDdBySearch(OMDbRequestUrl);
		setSearchResults(results);
		console.log(results);
	}, [searchInput]);

	return (
		<>
			<SearchBar searchInputUpdate={setSearchInputDebounced} />
			{searchResults.Response === 'True' ? (
				<p>Results Available</p>
			) : (
				<p>{searchResults.Error}</p>
			)}
		</>
	);
};
