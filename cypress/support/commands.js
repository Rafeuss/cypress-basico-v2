Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Garcia')
    cy.get('#email').type('test@test.com')
    cy.get('#open-text-area').type('Test')
    cy.contains('button', 'Enviar').click()
})