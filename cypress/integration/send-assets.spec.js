const formattedAddresses = [
  'WYWRYK42XADLY3O62N52BOLT27DMPRA3WNBT2OBRT65N6OEZQWD4OSH6PI',
]
const assetId = '33698417'

describe('Send assets Page', () => {
  beforeEach(() => {
    cy.visit('/send-assets')
  })

  it('Should send to multiple address with or without the recipient opt-in', () => {
    cy.wait(3000)
    cy.get('[data-testid=multiple-address-radio]').click({ force: true })
    cy.get('[data-testid=file-input]').attachFile('sample.csv')
    cy.get('[data-testid=assetId-input]').should('be.visible')
    cy.get('input').eq(2).type(`${assetId}`, { force: true })
    cy.wait(3000)
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
    cy.wait(3000)
    cy.contains(`${formattedAddresses[0]}`).click({ force: true })
    cy.get('[data-testid=submit-btn]').click({ force: true })
  })

  it('Should not send to escrow if recipient is not opted in', () => {
    cy.wait(3000)
    cy.get('[data-testid=multiple-address-radio]').click({ force: true })
    cy.get('[data-testid=file-input]').attachFile('sample.csv')
    cy.get('[data-testid=assetId-input]').should('be.visible')
    cy.get('input').eq(6).click()
    cy.get('input').eq(2).type(`${assetId}`, { force: true })
    cy.wait(3000)
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
    cy.wait(3000)
    cy.contains(`${formattedAddresses[0]}`).click({ force: true })
    cy.get('[data-testid=submit-btn]').click({ force: true })
  })

  it('Should send to single address with or without the recipient opt-in and redeem', () => {
    cy.wait(3000)
    cy.get('[data-testid=single-address-radio]').click({ force: true })
    cy.get('[data-testid=assetId-input]').should('be.visible')
    cy.get('input').eq(5).type(1, { force: true })
    cy.get('input').eq(6).type(`${formattedAddresses[0]}`, { force: true })
    cy.get('input').eq(2).type(`${assetId}`, { force: true })
    cy.wait(3000)
    cy.get('.MuiAutocomplete-popper li[data-option-index="0"]').click()
    cy.wait(3000)
    cy.contains(`${formattedAddresses[0]}`).click({ force: true })
    cy.wait(300)
    // cy.get('[data-testid=submit-btn]').click()
    // cy.contains('Send Assets').click()
    // cy.wait(10000)
    // cy.get('[data-testid=shareableLink]')
    //   .should('have.attr', 'href')
    //   .then((href) => {
    //     cy.visit(href)
    //   })
    // cy.wait(3000)
    // cy.get('[data-testid=receiverAddress-input]').type(
    //   `${formattedAddresses[0]}`
    // )
    // cy.wait(3000)
    // cy.get('[data-testid=submit-btn]').click()
    // cy.wait(5000)
    // cy.get('[data-testid=statusMessage]').should('contain', 'confirmed')
  })
})
