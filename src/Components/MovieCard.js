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

export const MovieCard = ({
	movie,
	alreadyNominated,
	nominationClickHandler,
}) => {
	const classes = useStyles();

	return (
		<Card data-testid="result-card" key={movie.imdbID} className={classes.card}>
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
					data-testid={
						alreadyNominated ? 'nominated-button-disabled' : 'nominate-button'
					}
					onClick={() =>
						nominationClickHandler({ [movie.imdbID]: { ...movie } })
					}
				>
					Nominate
				</Button>
			</CardActions>
		</Card>
	);
};
