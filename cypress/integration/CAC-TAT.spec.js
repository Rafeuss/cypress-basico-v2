/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   beforeEach(function() {
    cy.visit('./src/index.html')
   })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    //formulario com sucesso
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teset, Teste, teset, Teste, teset, Teste, teset, Teste, teset, Teste, teset'
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Garcia')
        cy.get('#email').type('test@test.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    //formulario com e-mail invalido
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Garcia')
        cy.get('#email').type('test@test,com')
        cy.get('#open-text-area').type('test')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    //formulario telefone com string
    it('campo de telefone continua vazio quando preenchido com valor não numérico', function(){
       cy.get('#phone')
         .type('abcdefghij')
         .should('have.value', '')
    })
    //clicar no botão torna um campo obrigatório
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Garcia')
        cy.get('#email').type('test@test.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('test')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    //escreve nos campos e valida, depois limpa e valida
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
          .type('Rafael')
          .should('have.value', 'Rafael')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Garcia')
          .should('have.value', 'Garcia')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('test@test.com')
          .should('have.value', 'test@test.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('1234567890')
          .should('have.value', '1234567890')
          .clear()
          .should('have.value', '')
          cy.contains('button', 'Enviar').click()         
    })
    //enviar formulario invalido, sem preencher campos obrigatorios
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        //cy.get('button[type="submit"]').click() se tiver um bom seletor
        
        cy.get('.error').should('be.visible')
    })
    //comando customizado para enviar formulário valido (necessario criar o comando em suport/commands.js)
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        
        cy.get('.success').should('be.visible')
    })
    //abre a seleção e busca pelo texto
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')          
    })
    //abre seleçao e busca pelo value
   it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')  
   })
   // abre seleção e busca por índice
    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })
    //marca o radio feedback e verifica se foi clicado
    it('marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
    })
    //maneira de checkar todos os radio sem ser encadeada/abreviada
    it('marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
      cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('have.value', 'elogio')
      cy.get('input[type="radio"][value="ajuda"]')
      .check()
      .should('have.value', 'ajuda')
    })
    //maneira simplificada para checkar todos os radios
    it('marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })
    //checa os checkbox, marca todos e desmarca o ultimo
    it('marca ambos checkboxes, depois desmarca o último', function() {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    //vai exibir uma mensagem de erro quando clicar no checkbox telefone e ele for obrigatorio
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.get('#firstName').type('Rafael')
      cy.get('#lastName').type('Garcia')
      cy.get('#email').type('test@test.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('test')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
    })
    //faz seleção de um arquivo
    it('seleciona um arquivo da pasta fixtures', function() {
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    //simula arrastar um arquivo para o campo
    it('seleciona um arquivo simulando um drag-and-drop', function() {
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    //passa o comando para buscar arquivo e da um nome pro arquivo para nao precisar passar todo o caminho
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })     
    })
    //clica no link e abre em outra aba
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    //remove o target _blank (não abre em outra pagina)
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
      cy.contains('Talking About Testing').should('be.visible')  
    })
    
})
