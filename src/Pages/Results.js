import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { MovieCardHorizontal } from '../Components/MovieCardHorizontal';

const useStyles = makeStyles((theme) => ({
	cardVoteWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	rank: {
		width: '3ch',
	},
	votes: {
		width: '3ch',
		padding: 5,
		marginLeft: 5,
		backgroundColor: theme.palette.primary.light,
		borderRadius: '30%',
		color: 'white',
		textAlign: 'center',
	},
}));

export const Results = () => {
	const classes = useStyles();
	const { loading, data } = useQuery(GET_NOMINATION);

	const [nominatedMovies, setNominatedMovies] = useState({});
	const [nominationSubmitted, setNominationSubmitted] = useState();

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

	return (
		<>
			{loading && <p>Loading results...</p>}
			{data &&
				data.getNominations.map((nominee, index) => (
					<div key={nominee.imdbID} className={classes.cardVoteWrapper}>
						<Typography className={classes.rank} variant="body1" gutterBottom>
							{index + 1}.
						</Typography>
						<MovieCardHorizontal movie={nominee} />
						<Typography className={classes.votes} variant="body1" gutterBottom>
							{nominee.voteCount}
							{nominee.imdbID in nominatedMovies ? '👍' : null}
						</Typography>
					</div>
				))}
		</>
	);
};

const GET_NOMINATION = gql`
	query getNominations {
		getNominations {
			Poster
			Title
			Year
			imdbID
			voteCount
		}
	}
`;
