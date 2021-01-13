import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MovieCardHorizontal } from './MovieCardHorizontal';

const useStyles = makeStyles({
	root: {
		padding: '20px 0px',
	},
});

export const NominatedList = ({ nominatedMovies, removeNominationHandler }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{Object.keys(nominatedMovies).map((movieId) => (
				<MovieCardHorizontal
					movie={nominatedMovies[movieId]}
					removeNominationHandler={removeNominationHandler}
				/>
			))}
		</div>
	);
};
