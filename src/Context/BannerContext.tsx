import React, { createContext, useState, useEffect, useContext } from 'react';

export enum BannerCodeTypes {
	Error = 'Error',
	Success = 'Success',
	None = '',
}

interface IBanner {
	text: string;
	code: BannerCodeTypes;
}

type BannerContextValue = {
	bannerMessage: IBanner;
	setBannerMessage: React.Dispatch<React.SetStateAction<IBanner>>;
};

type BannerContextProviderProps = { children: React.ReactNode };
export const BannerContext = createContext<null | BannerContextValue>(null);

const bannerInitialState: IBanner = {
	text: '',
	code: BannerCodeTypes.None,
};

export const BannerContextProvider = ({
	children,
}: BannerContextProviderProps) => {
	const [bannerMessage, setBannerMessage] = useState<IBanner>(
		bannerInitialState
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			setBannerMessage(bannerInitialState);
		}, 5000);

		return () => clearTimeout(timer);
	}, [bannerMessage]);

	return (
		<BannerContext.Provider value={{ bannerMessage, setBannerMessage }}>
			{children}
		</BannerContext.Provider>
	);
};

export const useSetBannerMessage = () => {
	const context = useContext(BannerContext);
	if (context) {
		return context.setBannerMessage;
	} else {
		throw new Error(
			'setBannerMessage must be used within a <BannerContextProvider>'
		);
	}
};

export const useBannerMessage = () => {
	const context = useContext(BannerContext);
	if (context) {
		return context.bannerMessage;
	} else {
		throw new Error(
			'setBannerMessage must be used within a <BannerContextProvider>'
		);
	}
};
