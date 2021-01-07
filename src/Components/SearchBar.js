import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
	},
}));

export const SearchBar = ({ searchInputUpdate }) => {
	const classes = useStyles();

	return (
		<Paper data-testid="search-bar" component="form" className={classes.root}>
			<InputBase
				className={classes.input}
				placeholder="Search Movie"
				inputProps={{ 'aria-label': 'search movie' }}
				onChange={(e) => searchInputUpdate(e.target.value)}
			/>
			<IconButton
				type="submit"
				className={classes.iconButton}
				aria-label="search"
				onClick={(e) => e.preventDefault()}
			>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};
