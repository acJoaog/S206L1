describe('Criando cenarios de testes para o site steam', () => {

  it('Caso de Teste para acessar um jogo da steam com verificação de idade não passando', () => {
    cy.visit('https://store.steampowered.com')
    cy.get('#store_nav_search_term').type("CyberPunk 2077")
    cy.get('#store_search_link > img').click()
    cy.get('[href="https://store.steampowered.com/app/1091500/Cyberpunk_2077/?snr=1_7_7_151_150_1"] > .search_capsule > img').click()
    cy.get('#view_product_page_btn > span').click()
    cy.get('.newmodal_content > :nth-child(1)').should('contain.text','Insira uma data válida')
  })

  it('Caso de Teste para acessar um jogo da steam com verificação de idade passando', () => {
    cy.visit('https://store.steampowered.com')
    cy.get('#store_nav_search_term').type("CyberPunk 2077")
    cy.get('#store_search_link > img').click()
    cy.get('[href="https://store.steampowered.com/app/1091500/Cyberpunk_2077/?snr=1_7_7_151_150_1"] > .search_capsule > img').click()
    cy.get('#ageYear').select('2000')
    cy.get('#view_product_page_btn > span').click()
    cy.url().should('include', 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/');
  })

  it("Caso de teste: Tentando fazer um login invalido", ()=> {
    cy.visit('https://help.steampowered.com/pt-br/wizard/Login?redir=%2Fpt-br%2Fwizard%2FHome%3Fgamepad%3D0')
    cy.get(':nth-child(1) > .newlogindialog_TextInput_2eKVn').type("$NomeInValido$")
    cy.get(':nth-child(2) > .newlogindialog_TextInput_2eKVn').type("&SenhaInválida&")
    cy.get('.newlogindialog_SubmitButton_2QgFE').click()
    cy.get('.newlogindialog_FormError_1Mcy9').should('have.text','Verifique a sua senha e nome de usuário e tente novamente.')
  })

  it("Caso de teste: Adicionando um jogo no carrinho com sucesso", ()=> {

    cy.visit("https://store.steampowered.com/?l=portuguese")
    cy.get('#store_nav_search_term').type("Tyrant's Blessing")
    cy.get('#store_search_link > img').click()
    cy.get('[href="https://store.steampowered.com/app/1520760/Tyrants_Blessing/?snr=1_7_7_151_150_1"] > .search_capsule > img').click()
    cy.get('#btn_add_to_cart_536017 > span').click()
    cy.get('.cart_status_message').should("contain.text", "Item adicionado ao carrinho!")
  })

  it("Caso de teste: Mudando linguagem do site", ()=> {

    cy.visit("https://store.steampowered.com/")
    cy.get('#language_pulldown').click()
    cy.get('[href="?l=polish"]').click()
    cy.get('.home_cluster_ctn > .home_page_content > .home_page_content_title').should("contain.text", "Wyróżnione i polecane")
  })

  it("Caso de teste: Procurando um jogo com falha (nao existe o jogo)", ()=> {

    cy.visit("https://store.steampowered.com/?l=portuguese")
    cy.get('#store_nav_search_term').type("sg54a5fg1as5g")
    cy.get('#store_search_link > img').click()
    cy.get('#search_results_filtered_warning_persistent > :nth-child(1)').should("have.text", "0 resultados correspondem à sua busca. Um título foi excluído de acordo com as suas preferências.")
  })

})
