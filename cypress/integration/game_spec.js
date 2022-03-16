describe('Trivia Game', () => {
  it('plays a game of trivia', () => {
    // Load game
    const user = cy;
    user.visit('/')
    cy.get('[href="/game"]')
      .click()

    // user.click('Quick Game')
    user.url('include', '/game')

    user.get('.timer > :nth-child(1)')
      .should('have.text', 'Remaining')

    user.get('.timer > :nth-child(3)')
      .should('have.text', 'seconds')

    user.get('.card-header-title')
      .should('have.text', 'Score: 0Question 1/5')


    // Question 1
    user.contains('In Norse mythology')
    user.contains('True')
    user.contains('False')
  })

  it('correctly loads all questions, with the correct timing', () => {
    // Load game
    const user = cy;
    user.visit('/')
    cy.get('[href="/game"]')
      .click()

    // user.click('Quick Game')
    user.url('include', '/game')

    user.get('.timer > :nth-child(1)')
      .should('have.text', 'Remaining')

    user.get('.timer > :nth-child(3)')
      .should('have.text', 'seconds')

    user.get('.card-header-title')
      .should('have.text', 'Score: 0Question 1/5')

    // Question 1
    user.contains('In Norse mythology, Thor once dressed as a woman.')
    user.contains('True')
    user.contains('False')

    user.wait(20000)

    // Question 2
    user.contains('Who in Greek mythology, who led the Argonauts in search of the Golden Fleece?')
    user.contains('Jason')
    user.contains('Castor')
    user.contains('Daedalus')
    user.contains('Odysseus')

    user.wait(20000)

    // Question 3
    user.contains('The Japanese god Izanagi successfully returned his wife Izanami from the Underworld.')
    user.contains('True')
    user.contains('False')

    user.wait(20000)

    // Question 4
    user.contains('In Greek Mythology, who killed Achilles?')
    user.contains('Paris')
    user.contains('Hector')
    user.contains('Helen')
    user.contains('Pericles')

    user.wait(20000)

    // Question 5
    user.contains('Nidhogg is a mythical creature from what mythology?')
    user.contains('Norse')
    user.contains('Egyptian')
    user.contains('Greek')
    user.contains('Hindu')

  })
})


