import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		alignItems: 'center',
	},
	progressNumber: {
		margin: '0px 10px',
	},
	progressBar: {
		flex: 1,
	},
});

export const ProgressBar = ({ goal, current }) => {
	const classes = useStyles();

	const progress = () => {
		const progressPercentage = (current / goal) * 100;
		return progressPercentage;
	};

	return (
		<div className={classes.root}>
			<LinearProgress
				className={classes.progressBar}
				variant="determinate"
				value={progress()}
			/>
			<Typography className={classes.progressNumber} variant="body1">
				{current}/{goal}
			</Typography>
			<Button disabled={current !== goal}>Nominate</Button>
		</div>
	);
};
