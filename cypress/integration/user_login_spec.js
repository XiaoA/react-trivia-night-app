describe('User Login', () => {
  it('redirects authenticated user to dashboard', () => {

    const user = cy;
    user.visit('/login')
    user.get('input[name=email]').type('cypress-user@example.com')
    user.get('input[name=password]').type('password')
    user.get('form > .button').click()
    user.url('include', '/dashboard')

    // Display Page Title
    user.get('h1.has-text-centered')
      .should('have.text', 'Dashboard')

    // Display User Profile (Center)
    user.get(':nth-child(2) > .card > .card-header > .card-header-title').should('have.text', 'cypressuser')

    user.get('.card-content > :nth-child(1) > a')
      .should('have.text', 'Play Trivia!')

    user.get(':nth-child(2) > .card > .card-content > :nth-child(2)')
      .should('have.text', 'Log out')

    // Display User Stats (Left)

    user.get(':nth-child(1) > .card > .card-header > .card-header-title')
      .should('have.text', 'My Stats')

    user.get(':nth-child(1) > .card > .card-content > :nth-child(1)')
      .should('have.text', 'Total Questions')

    user.get(':nth-child(1) > .card > .card-content > :nth-child(2)')
      .should('have.text', 'Correct Questions')

    user.get(':nth-child(1) > .card > .card-content > :nth-child(3)')
      .should('have.text', 'Incorrect Questions')
  });
})
