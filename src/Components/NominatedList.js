import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

import { fallBackMoviePoster } from './utils/fallBackMoviePoster';

const useStyles = makeStyles({
	root: {
		padding: '20px 0px',
	},
	card: {
		display: 'flex',
		marginBottom: 5,
	},
	cardMedia: {
		minWidth: 50,
		marginRight: 5,
	},
});

export const NominatedList = ({ nominatedMovies, removeNominationHandler }) => {
	const classes = useStyles();

	const movieItem = (movie) => (
		<Slide key={movie.imdbID} direction="right" in={true}>
			<Card className={classes.card}>
				<CardMedia
					className={classes.cardMedia}
					image={fallBackMoviePoster(movie.Poster)}
				/>
				<div>
					<CardContent>
						<Typography variant="body1">
							{movie.Title} ({movie.Year})
						</Typography>
					</CardContent>
					<CardActions>
						<Button
							size="small"
							color="primary"
							onClick={() => removeNominationHandler(movie.imdbID)}
						>
							Remove
						</Button>
					</CardActions>
				</div>
			</Card>
		</Slide>
	);

	return (
		<div className={classes.root}>
			{Object.keys(nominatedMovies).map((movieId) =>
				movieItem(nominatedMovies[movieId])
			)}
		</div>
	);
};
