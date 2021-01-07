import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

import { SearchBar } from '../Components/SearchBar';
import { ResultCards } from '../Components/ResultCards';
import { NominatedList } from '../Components/NominatedList';
import { ProgressBar } from '../Components/ProgressBar';
import { NextPageButton } from '../Components/NextPageButton';

import { OMDdBySearch, createOMDbURL } from '../Services/OMDbRequests';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	horizontalScroll: {
		display: 'flex',
		overflowX: 'auto',
		padding: '20px 0px',
	},
});

export const Nomination = () => {
	const classes = useStyles();
	const [searchInput, setSearchInput] = useState('');
	const setSearchInputDebounced = debounce(setSearchInput, 500);

	const [currentResultPage, setCurrentResultPage] = useState(1);
	const [searchResults, setSearchResults] = useState({});
	const [nominatedMovies, setNominatedMovies] = useState({});

	const minNominatedMoviesLength = 5;

	useEffect(async () => {
		const OMDbRequestUrl = createOMDbURL(searchInput);
		const results = await OMDdBySearch(OMDbRequestUrl);
		setSearchResults(results);
		setCurrentResultPage(1);
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

	const getNextPageOfResults = async () => {
		const nextPageToQuery = currentResultPage + 1;
		const OMDbRequestUrl = createOMDbURL(searchInput, nextPageToQuery);
		const results = await OMDdBySearch(OMDbRequestUrl);
		const appendedSearchResults = {
			...searchResults,
			Search: [...searchResults.Search, ...results.Search],
		};
		setSearchResults(appendedSearchResults);
		setCurrentResultPage((prev) => prev + 1);
	};

	return (
		<>
			<SearchBar searchInputUpdate={setSearchInputDebounced} />
			<div className={classes.horizontalScroll}>
				{searchResults.Response === 'True' ? (
					<>
						<ResultCards
							searchResults={searchResults.Search}
							nominationClickHandler={nominationClickHandler}
							nominatedMovies={nominatedMovies}
						/>
						<NextPageButton onClick={getNextPageOfResults} />
					</>
				) : (
					<p>{searchResults.Error}</p>
				)}
			</div>
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
