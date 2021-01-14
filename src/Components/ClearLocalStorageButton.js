import React from 'react';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
});

export const ClearLocalStorageButton = ({ additionalAction }) => {
	const classes = useStyles();

	const clearLocalStorageHandler = () => {
		additionalAction();
		localStorage.clear();
	};

	return (
		<div className={classes.root}>
			<Button
				data-testid="clear-local-storage-button"
				variant="outlined"
				onClick={clearLocalStorageHandler}
			>
				Clear Local Storage
			</Button>
		</div>
	);
};
