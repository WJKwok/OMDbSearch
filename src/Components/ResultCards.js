import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
	horizontalScroll: {
		display: 'flex',
		overflowX: 'auto',
		padding: '20px 0px',
	},
});

export const ResultCards = ({ searchResults }) => {
	const classes = useStyles();

	const card = (imdbID, title, year, poster) => (
		<Card key={imdbID} className={classes.card}>
			<CardActionArea>
				<CardMedia className={classes.cardMedia} image={poster} />
				<CardContent>
					<Typography variant="body1" gutterBottom>
						{title}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{year}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.cardActions}>
				<Button size="small" color="primary">
					Nominate
				</Button>
			</CardActions>
		</Card>
	);

	const resultCards = searchResults.reduce((result, movie) => {
		if (movie.Type === 'movie') {
			const movieCard = card(
				movie.imdbID,
				movie.Title,
				movie.Year,
				movie.Poster
			);
			result.push(movieCard);
		}
		return result;
	}, []);

	return <div className={classes.horizontalScroll}>{resultCards}</div>;
};
