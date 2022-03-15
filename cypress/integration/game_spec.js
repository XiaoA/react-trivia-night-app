describe('Trivia Game', () => {
  it('plays a game of trivia', () => {
    // Load game
    const user = cy;
    user.visit('/')
    cy.get('[href="/game"]')
      .click()

    // user.click('Quick Game')
    user.url('include', '/game')

    cy.get('.timer > :nth-child(1)')
      .should('have.text', 'Remaining')

    cy.get('.timer > :nth-child(3)')
      .should('have.text', 'seconds')

    cy.get('.card-header-title')
      .should('have.text', 'Score: 0Question 1/5')


    // Question 1
      user.contains('In Norse mythology')
      user.contains('True')
      user.contains('False')
  })
})


