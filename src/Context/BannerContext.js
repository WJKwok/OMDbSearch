import React, { createContext, useState, useEffect } from 'react';

export const BannerContext = createContext();

const bannerInitialState = {
	text: '',
	code: '',
};

export const BannerContextProvider = (props) => {
	const [bannerMessage, setBannerMessage] = useState(bannerInitialState);

	useEffect(() => {
		const timer = setTimeout(() => {
			setBannerMessage(bannerInitialState);
		}, 5000);

		return () => clearTimeout(timer);
	}, [bannerMessage]);

	return (
		<BannerContext.Provider value={{ bannerMessage, setBannerMessage }}>
			{props.children}
		</BannerContext.Provider>
	);
};
