describe('User Registration', () => {
  it('Registers a new user', () => {

    // TODO: Ensure user is dropped from db after each run
    const user = cy;
    user.visit('/register')
    user.get('input[name=email]').
      type('cypress-user@example.com')
    user.get('input[name=password]')
      .type('password')
    user.get('input[name=password_confirmation]')
      .type('password')
    user.get('input[name=username]')
      .type('cypressuser')
    user.get('form > .button')
      .click()
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

describe('User Registration Errors', () => {
  // Invalid email
  it('displays errors when email input is invalid', () => {
    const user = cy;
    user.visit('/register')
    user.get('input[name=email]').
      type('cypress-user')
    user.get('input[name=password]')
      .type('password')
    user.get('input[name=password_confirmation]')
      .type('password')
    user.get('input[name=username]')
      .type('cypressuser')
    user.get('form > .button').click()
    user.get('.error-message')
      .should('have.text', 'Invalid email address.')
  })

  // Email already registered
  it('displays errors when email is already registered ', () => {
    const user = cy;
    user.visit('/register')
    user.get('input[name=email]').
      type('cypress-user@example.com')
    user.get('input[name=password]')
      .type('password')
    user.get('input[name=password_confirmation]')
      .type('password')
    user.get('input[name=username]')
      .type('cypressuser')
    user.get('form > .button').click()
    user.get('.error-list')
      .should('have.text', "Validation failed: Email has already been taken")
  })

  // Blank Password
  it('displays errors when password input is blank', () => {
    user.visit('/register')
    user.get('input[name=email]').
      type('cypress-user@example.com')
    user.get('input[name=password]')
      .type('')
    user.get('input[name=password_confirmation]')
      .type('password')
    user.get('input[name=username]')
      .type('cypressuser')
    user.get('form > .button').click()
    user.get('.error-message')
      .should('have.text', 'Password is required')
    user.get('.error-list')
      .should('have.text', "Validation failed: Password can't be blank")
  })

  // Password too short
  it('displays errors when password length is too short', () => {
    const user = cy;
    user.visit('/register')
    user.get('input[name=email]').
      type('cypress-user@example.com')
    user.get('input[name=password]').
      type('cypress')
    user.get('input[name=password_confirmation]').
      type('cypress')
    user.get('input[name=username]')
      .type('cypressuser')
    user.get('form > .button').click()
    user.get('.error-message')
      .should('have.text', 'Password must be at least 8 characters')
    user.get('.error-list')
      .should('have.text', "Validation failed: Password is too short (minimum is 8 characters)")
  })

  // Blank Password Confirmation
  it('displays errors when password confirmation input is blank', () => {
    user.visit('/register')
    user.get('input[name=email]').
      type('cypress-user@example.com')
    user.get('input[name=password]')
      .type('password')
    user.get('input[name=password_confirmation]')
      .type('')
    user.get('input[name=username]')
      .type('cypressuser')
    user.get('form > .button').click()
    user.get('.error-message')
      .should('have.text', 'Password must match')
    user.get('.error-list')
      .should('have.text', "Validation failed: Password Confirmation can't be blank")
  })


  // Password Confirmation Doesn't Match Password
  it('displays errors when password length is too short', () => {
    const user = cy;
    user.visit('/register')
    user.get('input[name=password]').
      type('cypress')
    user.get('form > .button').click()
    user.get('.error-message')
      .should('have.text', 'Passwords must match.')
    user.get('.error-list')
      .should('have.text', "Validation failed: Passwords must match")
  })


  // Blank Username
  it('displays errors when username input is blank', () => {
    user.visit('/register')
    user.get('input[name=email]').
      type('cypress-user@example.com')
    user.get('input[name=password]')
      .type('password')
    user.get('input[name=password_confirmation]')
      .type('password')
    user.get('input[name=username]')
      .type('')
    user.get('form > .button').click()
    user.get('.error-message')
      .should('have.text', 'You must select a unique username.')
  })

})
