import { contactList, socialIconData } from '../../src/data/footer-data';

describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Footer should be visible and have correct content', () => {
    // Check if the footer is visible
    cy.get('footer').should('exist').scrollIntoView().should('be.visible');

    // Check if the logo is visible and has the correct image
    cy.dataCy('footer-logo')
      .should('be.visible')
      .should('have.prop', 'tagName', 'IMG')
      .should('have.attr', 'src', '/logo.svg')
      .and('have.attr', 'alt', 'Logo');

    // Check the contact information
    cy.dataCy('footer-contact-us')
      .should('be.visible')
      .should('contain.text', 'Contact Us');

    cy.dataCy('footer-contact-list')
      .should('be.visible')
      .should('have.prop', 'tagName', 'UL')
      .children('li')
      .should('have.length', contactList.length);

    // Check if each contact information is visible and has the correct text
    cy.dataCy('footer-contact-list')
      .children('li')
      .each(($el, index) => {
        cy.wrap($el)
          .should('be.visible')
          .should(
            'contain.text',
            `${contactList[index].name}: ${contactList[index].text}`,
          );
      });

    // Check the social media links
    cy.dataCy('footer-contact-icon')
      .should('be.visible')
      .should('have.prop', 'tagName', 'UL')
      .children('li')
      .should('have.length', socialIconData.length);

    // Check if each social media link is visible and has the correct href and image
    cy.dataCy('footer-contact-icon')
      .should('be.visible')
      .children('li')
      .each(($el, index) => {
        cy.wrap($el)
          .find('a')
          .should('have.attr', 'href', socialIconData[index].href)
          .should('have.attr', 'target', '_blank')
          .find('img')
          .should('be.visible')
          .should('have.attr', 'src', socialIconData[index].url)
          .and('have.attr', 'alt', socialIconData[index].alt);
      });

    cy.dataCy('footer-copyright')
      .should('be.visible')
      .should('contain.text', '2024 Gemara');
  });
});
