import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { fallBackMoviePoster } from './utils/fallBackMoviePoster';

const useStyles = makeStyles({
	card: {
		minWidth: 200,
		marginRight: 5,
		display: 'flex',
		flexFlow: 'column',
		justifyContent: 'space-between',
	},
	cardMedia: {
		height: 200,
	},
});

export const ResultCards = ({
	searchResults,
	nominationClickHandler,
	nominatedMovies,
}) => {
	const classes = useStyles();

	const card = (movie, alreadyNominated) => (
		<Card key={movie.imdbID} className={classes.card}>
			<div>
				<CardMedia
					className={classes.cardMedia}
					image={fallBackMoviePoster(movie.Poster)}
				/>
				<CardContent>
					<Typography variant="body1" gutterBottom>
						{movie.Title}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{movie.Year}
					</Typography>
				</CardContent>
			</div>
			<CardActions className={classes.cardActions}>
				<Button
					size="small"
					color="primary"
					disabled={alreadyNominated}
					onClick={() =>
						nominationClickHandler({ [movie.imdbID]: { ...movie } })
					}
				>
					Nominate
				</Button>
			</CardActions>
		</Card>
	);

	const resultCards = searchResults.reduce((result, movie) => {
		if (movie.Type === 'movie') {
			const alreadyNominated = movie.imdbID in nominatedMovies;
			const movieCard = card(movie, alreadyNominated);
			result.push(movieCard);
		}
		return result;
	}, []);

	return resultCards;
};
