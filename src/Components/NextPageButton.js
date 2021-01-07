import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

const useStyles = makeStyles((theme) => ({
	iconButton: {
		padding: 20,
		alignSelf: 'center',
	},
}));

export const NextPageButton = ({ onClick }) => {
	const classes = useStyles();

	return (
		<IconButton
			data-testid="next-page-button"
			className={classes.iconButton}
			aria-label="next result page"
			onClick={onClick}
		>
			<AddCircleOutlineRoundedIcon />
		</IconButton>
	);
};
