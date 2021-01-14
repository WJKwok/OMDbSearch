export const OMDdBySearch = async (url) => {
	const results = await fetch(url)
		.then((response) => response.json())
		.then((data) => data);
	return results;
};

export const createOMDbURL = (searchInput, page = 1) => {
	return ` https://www.omdbapi.com/?s=${searchInput}&type=movie&page=${page}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
};
