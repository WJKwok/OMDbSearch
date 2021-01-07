import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		marginBottom: 10,
	},
	progressDiv: {
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

	const exceededGoal = current > goal;
	const progress = exceededGoal ? 100 : (current / goal) * 100;

	return (
		<div className={classes.root}>
			<div className={classes.progressDiv}>
				<LinearProgress
					className={classes.progressBar}
					variant="determinate"
					color={exceededGoal ? 'secondary' : 'primary'}
					value={progress}
				/>
				<Typography className={classes.progressNumber} variant="body1">
					{current}/{goal}
				</Typography>
				<Button variant="outlined" disabled={current !== goal}>
					Nominate
				</Button>
			</div>
			{exceededGoal && (
				<Typography variant="body1" color="secondary">
					You can only nominate 5 movies, please remove {current - goal}
				</Typography>
			)}
		</div>
	);
};
