import React from 'react';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	button: {
		float: 'right',
	},
});

export const ClearLocalStorageButton = ({ clearSubmission }) => {
	const classes = useStyles();

	const clearLocalStorageHandler = () => {
		clearSubmission();
		localStorage.clear();
	};

	return (
		<Button
			className={classes.button}
			data-testid="clear-local-storage-button"
			variant="outlined"
			onClick={clearLocalStorageHandler}
		>
			Clear Local Storage
		</Button>
	);
};
