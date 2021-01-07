it('End to end test', () => {
	cy.visit('http://localhost:3000/');

	// OMDb search and next result page
	const initialResultCardsLength = 0;
	cy.get('[data-testid=result-card]').should(
		'have.length',
		initialResultCardsLength
	);

	const initialSearchInput = 'funny';
	const secondSearchInput = 'hell';
	cy.get('[data-testid=search-bar]')
		.type(initialSearchInput)
		.then(() => {
			cy.get('[data-testid=result-card]').should((resultCards) => {
				expect(resultCards).to.have.length.greaterThan(
					initialResultCardsLength
				);
			});
		})
		.then((resultCards) => {
			cy.log(resultCards.length);
			cy.get('[data-testid=next-page-button]')
				.click()
				.wait(1000)
				.then(() => {
					cy.get('[data-testid=result-card]')
						.its('length')
						.should('be.greaterThan', resultCards.length);
				});
			cy.get('[data-testid=result-card]');
		})
		.then((resultCards2) => {
			cy.log(resultCards2.length);
			cy.get('[data-testid=search-bar]').type(
				`${'{backspace}'.repeat(initialSearchInput.length)}${secondSearchInput}`
			);
			cy.wait(1000).then(() => {
				cy.get('[data-testid=result-card]')
					.its('length')
					.should('be.lessThan', resultCards2.length);
			});
		});

	// nominating movies
	cy.get('[data-testid=nominate-button]').first().click();
	cy.get('[data-testid=nominate-button]').first().click();
	cy.get('[data-testid=nominate-button]').first().click();
	cy.get('[data-testid=nominate-button]').first().click();
	cy.get('[data-testid=nominate-button]').first().click();

	// banner shows when 5 movies are nominated
	cy.get('[data-testid=banner]')
		.contains('You have nominated 5 movies, you may submit it now 😌')
		.should('have.length', 1);
});
