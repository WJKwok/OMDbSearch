import React, { useState, useEffect, useContext } from 'react';
import debounce from 'lodash/debounce';
import { gql, useMutation } from '@apollo/client';

import { SearchBar } from '../Components/SearchBar';
import { SearchResultCards } from '../Components/SearchResultCards';
import { NominatedList } from '../Components/NominatedList';
import { ProgressBar } from '../Components/ProgressBar';
import { NextPageButton } from '../Components/NextPageButton';
import { ClearLocalStorageButton } from '../Components/ClearLocalStorageButton';

import { OMDdBySearch, createOMDbURL } from '../Services/OMDbRequests';
import { BannerContext } from '../Context/BannerContext';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		paddingTop: 40,
	},
	horizontalScroll: {
		display: 'flex',
		overflowX: 'auto',
		padding: '20px 0px',
	},
});

export const Nomination = (props) => {
	const classes = useStyles();
	const { setBannerMessage } = useContext(BannerContext);

	const [searchInput, setSearchInput] = useState('');
	const setSearchInputDebounced = debounce(setSearchInput, 500);

	const [currentResultPage, setCurrentResultPage] = useState(1);
	const [searchResults, setSearchResults] = useState({});
	const [nominatedMovies, setNominatedMovies] = useState({});
	const [nominationSubmitted, setNominationSubmitted] = useState(false);

	const minNominatedMoviesLength = 5;

	useEffect(() => {
		if (localStorage.getItem('userNomination')) {
			const nominatedMoviesLocalStorage = JSON.parse(
				localStorage.getItem('userNomination')
			);
			setNominatedMovies(nominatedMoviesLocalStorage);
		}

		if (localStorage.getItem('nominationSubmitted')) {
			const nominationSubmittedLocalStorage = JSON.parse(
				localStorage.getItem('nominationSubmitted')
			);
			setNominationSubmitted(nominationSubmittedLocalStorage);
		}
	}, []);

	useEffect(async () => {
		const OMDbRequestUrl = createOMDbURL(searchInput);
		const results = await OMDdBySearch(OMDbRequestUrl);
		setSearchResults(results);
		setCurrentResultPage(1);
		console.log(results);
	}, [searchInput]);

	const nominationClickHandler = (movie) => {
		const newNominatedMovies = { ...nominatedMovies, ...movie };
		setNominatedMovies(newNominatedMovies);
		localStorage.setItem('userNomination', JSON.stringify(newNominatedMovies));
	};

	const removeNominationHandler = (movieId) => {
		const nominatedMoviesCopy = {
			...nominatedMovies,
		};
		delete nominatedMoviesCopy[movieId];
		setNominatedMovies(nominatedMoviesCopy);
		localStorage.setItem('userNomination', JSON.stringify(nominatedMoviesCopy));
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

	const [submitNominations] = useMutation(NOMINATE_MOVIES, {
		onCompleted() {
			setBannerMessage({
				text: 'Submission completed. Your nominations are highlighted 🥳',
				code: 'Success',
			});
			setNominationSubmitted(true);
			localStorage.setItem('nominationSubmitted', JSON.stringify(true));
			props.history.push('/results');
		},
		variables: {
			movieInputs: Object.keys(nominatedMovies).map((movieKey) => {
				const movieData = nominatedMovies[movieKey];
				delete movieData.Type;
				return movieData;
			}),
		},
	});

	return (
		<div className={classes.root}>
			{nominationSubmitted ? (
				<ClearLocalStorageButton
					clearSubmission={() => {
						setNominationSubmitted(false);
						setNominatedMovies({});
					}}
				/>
			) : (
				<>
					<SearchBar searchInputUpdate={setSearchInputDebounced} />
					<div className={classes.horizontalScroll}>
						{searchResults.Response === 'True' ? (
							<>
								<SearchResultCards
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
						submitHandler={submitNominations}
					/>
					<NominatedList
						nominatedMovies={nominatedMovies}
						removeNominationHandler={removeNominationHandler}
					/>
				</>
			)}
		</div>
	);
};

const NOMINATE_MOVIES = gql`
	mutation nominateMovies($movieInputs: [MovieInput]!) {
		nominateMovies(movieInputs: $movieInputs) {
			Title
			voteCount
		}
	}
`;
