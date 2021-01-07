import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors/';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import { BannerContext } from '../Context/BannerContext';

const useStyles = makeStyles({
	banner: (props) => ({
		width: '100%',
		backgroundColor: props.backgroundColor,
		color: 'white',
		textAlign: 'center',
		position: 'absolute',
		top: 15,
		left: 0,
		zIndex: 1000,
	}),
});

const bannerColorCode = {
	Error: red[500],
	Success: green[500],
};

export const Banner = () => {
	const { bannerMessage } = useContext(BannerContext);
	const props = { backgroundColor: bannerColorCode[bannerMessage.code] };
	const classes = useStyles(props);

	return (
		<Slide data-testid="banner" direction="right" in={!!bannerMessage.text}>
			<Typography className={classes.banner} variant="body1" color="secondary">
				{bannerMessage.text}
			</Typography>
		</Slide>
	);
};
