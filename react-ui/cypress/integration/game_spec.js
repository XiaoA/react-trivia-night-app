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
    user.contains('In Greek mythology, who led the Argonauts in search of the Golden Fleece?')
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



  it('correctly displays user answers when the game ends', () => {
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
    user.contains('True').click()
    user.contains('False')

    user.wait(20000)

    // Question 2
    user.contains('In Greek mythology, who led the Argonauts in search of the Golden Fleece?')
    user.contains('Jason').click()
    user.contains('Castor')
    user.contains('Daedalus')
    user.contains('Odysseus')

    user.wait(20000)

    // Question 3
    user.contains('The Japanese god Izanagi successfully returned his wife Izanami from the Underworld.')
    user.contains('True')
    user.contains('False').click()

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
    user.contains('Egyptian').click()
    user.contains('Greek')
    user.contains('Hindu')

    user.wait(20000)

    // Game Over - Show Stats

    user.get(':nth-child(1) > .content > .columns > .column > .card > h2')
      .should('have.text', 'Game Over!')

    user.get('.game-stats > div > h3')
      .should('have.text', 'You got 3 of 5 correct.')

    user.get(':nth-child(2) > .content > .columns > .column > .card > h2')
      .should('have.text', 'Your Answers')


    // Display Table Header Row


    user.get('thead > tr > :nth-child(1)')
      .should('have.text', 'Question Number')

    user.get('thead > tr > :nth-child(2)')
      .should('have.text', 'Correct Answer')


    user.get('thead > tr > :nth-child(3)')
      .should('have.text', 'Your Answer')

    user.get('thead > tr > :nth-child(4)')
      .should('have.text', 'Correct?')


    // Display Question 1 Row
    user.get('tbody > :nth-child(1) > :nth-child(1)')
      .should('have.text', '1')

    user.get('tbody > :nth-child(1) > :nth-child(2)')
      .should('have.text', 'True')

    user.get('tbody > :nth-child(1) > :nth-child(3)')
      .should('have.text', 'True')

    user.get('tbody > :nth-child(1) > :nth-child(4)')
      .should('have.text', 'true')

    // Display Question 2 Row
    user.get('tbody > :nth-child(2) > :nth-child(1)')
      .should('have.text', '2')

    user.get('tbody > :nth-child(2) > :nth-child(2)')
      .should('have.text', 'Jason')

    user.get('tbody > :nth-child(2) > :nth-child(3)')
      .should('have.text', 'Jason')

    user.get('tbody > :nth-child(2) > :nth-child(4)')
      .should('have.text', 'true')

    // Display Question 3 Row
    user.get('tbody > :nth-child(3) > :nth-child(1)')
      .should('have.text', '3')

    user.get('tbody > :nth-child(3) > :nth-child(2)')
      .should('have.text', 'False')

    user.get('tbody > :nth-child(3) > :nth-child(3)')
      .should('have.text', 'False')

    user.get('tbody > :nth-child(3) > :nth-child(4)')
      .should('have.text', 'true')

    // Display Question 4 Row
    user.get('tbody > :nth-child(4) > :nth-child(1)')
      .should('have.text', '4')

    user.get('tbody > :nth-child(4) > :nth-child(2)')
      .should('have.text', 'Paris')

    user.get('tbody > :nth-child(4) > :nth-child(3)')
      .should('have.text', 'skipped')

    user.get('tbody > :nth-child(4) > :nth-child(4)')
      .should('have.text', 'false')


    // Display Question 5 Row
    user.get('tbody > :nth-child(5) > :nth-child(1)')
      .should('have.text', '5')

    user.get('tbody > :nth-child(5) > :nth-child(2)')
      .should('have.text', 'Norse')

    user.get('tbody > :nth-child(5) > :nth-child(3)')
      .should('have.text', 'Egyptian')

    user.get('tbody > :nth-child(5) > :nth-child(4)')
      .should('have.text', 'false')
  })
})




