import React from 'react';
import { useQuery, gql } from '@apollo/client';

export const Results = () => {
	useQuery(GET_NOMINATION, {
		onCompleted({ getNominations }) {
			console.log('nominations: ', getNominations);
		},
	});

	return <p>Results Page</p>;
};

const GET_NOMINATION = gql`
	query getNominations {
		getNominations {
			Poster
			Title
			Year
			imdbID
			voteCount
		}
	}
`;
