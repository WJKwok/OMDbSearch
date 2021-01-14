import React, { useState, useEffect, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { MovieCardHorizontal } from '../Components/MovieCardHorizontal';
import { ClearLocalStorageButton } from '../Components/ClearLocalStorageButton';

import { BannerContext } from '../Context/BannerContext';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: 20,
	},
	nominatedCards: {
		paddingTop: 20,
	},
	cardVoteWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	rank: {
		width: '3ch',
	},
	votes: {
		width: '6ch',
		padding: 5,
		marginLeft: 5,
		backgroundColor: theme.palette.primary.light,
		borderRadius: '10%',
		color: 'white',
	},
}));

export const Results = (props) => {
	const classes = useStyles();
	const { setBannerMessage } = useContext(BannerContext);
	const { loading, data } = useQuery(GET_NOMINATION);
	const [nominatedMovies, setNominatedMovies] = useState({});

	useEffect(() => {
		if (localStorage.getItem('userNomination')) {
			const nominatedMoviesLocalStorage = JSON.parse(
				localStorage.getItem('userNomination')
			);
			setNominatedMovies(nominatedMoviesLocalStorage);
		}

		if (!localStorage.getItem('nominationSubmitted')) {
			setBannerMessage({
				text: 'Please submit nominations before viewing the result page 😏',
				code: 'Error',
			});
			props.history.push('/');
		}
	}, []);

	return (
		<>
			{loading && <p>Loading results...</p>}
			{data && (
				<div className={classes.root}>
					<ClearLocalStorageButton
						additionalAction={() => props.history.push('/')}
					/>
					<div className={classes.nominatedCards}>
						{data.getNominations.map((nominee, index) => (
							<div key={nominee.imdbID} className={classes.cardVoteWrapper}>
								<Typography
									className={classes.rank}
									variant="body1"
									gutterBottom
								>
									{index + 1}.
								</Typography>
								<MovieCardHorizontal movie={nominee} />
								<Typography
									className={classes.votes}
									variant="body1"
									gutterBottom
								>
									{nominee.voteCount}
									{nominee.imdbID in nominatedMovies ? ' 👍' : null}
								</Typography>
							</div>
						))}
					</div>
				</div>
			)}
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
