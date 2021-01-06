export const OMDdBySearch = async (url) => {
	const results = await fetch(url)
		.then((response) => response.json())
		.then((data) => data);
	return results;
};
