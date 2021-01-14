it('End to end test', () => {
	cy.visit('http://localhost:3000/');

	// OMDb search
	const initialResultCardsLength = 0;
	cy.get('[data-testid=search-result-card]').should(
		'have.length',
		initialResultCardsLength
	);

	const initialSearchInput = 'funny';
	const secondSearchInput = 'hell';
	cy.get('[data-testid=search-bar]')
		.type(initialSearchInput)
		.then(() => {
			cy.get('[data-testid=search-result-card]').should((resultCards) => {
				expect(resultCards).to.have.length.greaterThan(
					initialResultCardsLength
				);
			});
		})
		.then((resultCards) => {
			cy.log(resultCards.length);
			// next result page button
			cy.get('[data-testid=next-page-button]')
				.click()
				.wait(1000)
				.then(() => {
					cy.get('[data-testid=search-result-card]')
						.its('length')
						.should('be.greaterThan', resultCards.length);
				});
			cy.get('[data-testid=search-result-card]');
		})
		.then((resultCards2) => {
			cy.log(resultCards2.length);
			cy.get('[data-testid=search-bar]').type(
				`${'{backspace}'.repeat(initialSearchInput.length)}${secondSearchInput}`
			);
			cy.wait(1000).then(() => {
				cy.get('[data-testid=search-result-card]')
					.its('length')
					.should('be.lessThan', resultCards2.length);
			});
		});

	// nominating movies check state of submit button
	cy.get('[data-testid=submit-nomination-button]').should('be.disabled');
	cy.get('[data-testid=nominate-button]').first().click();
	cy.get('[data-testid=nominate-button]').first().click();
	cy.get('[data-testid=nominate-button]').first().click();
	cy.get('[data-testid=nominate-button]').first().click();
	cy.get('[data-testid=submit-nomination-button]').should('be.disabled');

	cy.get('[data-testid=nominate-button]').first().click();
	cy.get('[data-testid=submit-nomination-button]').should('not.be.disabled');

	// banner shows when 5 movies are nominated
	cy.get('[data-testid=banner]')
		.contains('You have nominated 5 movies')
		.should('have.length', 1);

	// error banner shows when > 5 movies are nominated
	cy.get('[data-testid=nominate-button]').first().click();
	cy.get('[data-testid=submit-nomination-button]').should('be.disabled');
	cy.get('[data-testid=banner]')
		.contains('🚨 You can only nominate 5 movies')
		.should('have.length', 1);

	// remove nomination button
	cy.get('[data-testid=remove-nomination-button]').first().click();
	cy.get('[data-testid=banner]')
		.contains('You have nominated 5 movies')
		.should('have.length', 1);

	// submit nominations
	cy.get('[data-testid=submit-nomination-button]').should('not.be.disabled');
	cy.get('[data-testid=submit-nomination-button]').click();
	cy.get('[data-testid=nomination-result-card]')
		.its('length')
		.should('be.greaterThan', 4);
	cy.get('[data-testid=voted-emoji]').should('have.length', 5);

	//try returning to nomination page when nomination has been submitted
	cy.wait(1000).visit('http://localhost:3000/');
	cy.get('[data-testid=banner]')
		.contains('You have already submitted your nomination')
		.should('have.length', 1);

	//clearing cache
	cy.get('[data-testid=clear-local-storage-button]').click();
	cy.get('[data-testid=search-bar]').should('have.length', 1);

	//try viewing results page without nomination submission
	cy.wait(1000).visit('http://localhost:3000/results');
	cy.get('[data-testid=banner]')
		.contains('Please submit nominations before viewing the result page')
		.should('have.length', 1);
});
