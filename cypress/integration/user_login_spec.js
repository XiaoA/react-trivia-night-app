describe('Successful User Login', () => {
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

describe('User Login Email Validation Errors', () => {
  it('displays errors when email does not exist in database', () => {
    const user = cy;
    user.visit('/login')
    user.get(':nth-child(1) > .control > .input').type('cypress-invalid-email@example.com')
    user.get(':nth-child(1) > .control > .input').type('password')
    user.get('form > .button').click()

    user.get('.error-link')
      .should('have.text', 'There was a problem with your login. Please make sure your email and password are correct.')
  });

  it('displays errors when email is invalid', () => {
    const user = cy;
    user.visit('/login')
    user.get(':nth-child(1) > .control > .input').type('cypress')
    user.get(':nth-child(1) > .control > .input').type('password')
    user.get('form > .button').click()
    user.get('.error-message')
      .should('have.text', 'Invalid email address.')
  });


  it('displays errors when email input is blank', () => {
    const user = cy;
    user.visit('/login')
    user.get(':nth-child(1) > .control > .input').type('')
    user.get(':nth-child(1) > .control > .input').type('password')
    user.get('form > .button').click()
    user.get('.error-message')
      .should('have.text', 'Email is required.')
  });
})

describe('User Login Password Validation Errors', () => {
  it('displays errors when password does not exist in database', () => {
    const user = cy;
    user.visit('/login')
    user.get(':nth-child(1) > .control > .input').type('cypress-user@example.com')
    user.get(':nth-child(1) > .control > .input').type('invalid!password')
    user.get('form > .button').click()
    user.get('.error-link')
      .should('have.text', 'There was a problem with your login. Please make sure your email and password are correct.')
  });

  it('displays errors when password input is too short', () => {
    const user = cy;
    user.visit('/login')
    user.get(':nth-child(1) > .control > .input').type('cypress-user@example.com')
    user.get(':nth-child(1) > .control > .input').type('passwor')
    user.get('form > .button').click()
    user.get('.error-message')
      .should('have.text', 'Password must be at least 8 characters')
    user.get('.error-link')
      .should('have.text', 'There was a problem with your login. Please make sure your email and password are correct.')
  });

  it('displays errors when password input is blank', () => {
    const user = cy;
    user.visit('/login')
    user.get(':nth-child(1) > .control > .input').type('cypress-user@example.com')
    user.get(':nth-child(1) > .control > .input').type('')
    user.get('form > .button').click()
    user.get('.error-message')
      .should('have.text', 'Password is required')
  });
})
