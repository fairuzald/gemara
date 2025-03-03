import navData from '@/data/nav-data';

describe('Navbar Multi Page', () => {
  // Set up the desktop and mobile viewports
  const desktopViewport = 1920;
  const mobileViewport = 375;

  beforeEach(() => {
    cy.visit('/');
  });

  it('Navbar should be visible and have correct semantic on desktop', () => {
    // Set viewport to desktop size
    cy.viewport(desktopViewport, 1080);

    // Check if the logo is visible and has the correct href and image
    cy.dataCy('navbar-logo')
      .should('be.visible')
      .should('have.attr', 'href', '/')
      .find('img')
      .should('have.attr', 'src', '/logo.svg')
      .and('have.attr', 'alt', 'logo');

    // Check if the length of the links is correct
    cy.get('nav')
      .should('be.visible')
      .within(() => {
        cy.get('ul')
          .should('be.visible')
          .children()
          .and('have.length', navData.length);
      });

    // Check if each link is visible and has the correct href
    cy.get('nav ul')
      .should('be.visible')
      .children()
      .each(($el, index) => {
        cy.wrap($el)
          .should('have.prop', 'tagName', 'LI')
          .find('a')
          .should('be.visible')
          .should('have.attr', 'href', navData[index].path)
          .and('contain.text', navData[index].name);
      });

    // Check if the contact us link is visible and has the correct href and label
    cy.dataCy('navbar-contact-us')
      .should('have.prop', 'tagName', 'BUTTON')
      .find('a')
      .should('have.attr', 'href', '/contact-us')
      .and('contain.text', 'Contact Us');
  });

  it('Navbar should be visible and have correct semantic on mobile', () => {
    // Set viewport to mobile size
    cy.viewport(mobileViewport, 640);

    // Before clicking on the toggle button, the navbar should be visible but the links should not be visible
    cy.get('nav').should('be.visible');
    cy.get('nav')
      .should('be.visible')
      .within(() => {
        cy.get('ul').should('not.be.visible');
      });

    // Check if the logo is visible and has the correct href and image

    cy.dataCy('navbar-logo')
      .should('have.attr', 'href', '/')
      .find('img')
      .should('be.visible')
      .should('have.attr', 'src', '/logo.svg')
      .and('have.attr', 'alt', 'logo');

    // Check if the toggle button is visible and has the correct image
    cy.dataCy('navbar-toggle')
      .should('have.prop', 'tagName', 'BUTTON')
      .should('not.be.disabled')
      .find('img')
      .should('exist')
      .should('have.attr', 'src', '/icons/menu-icon.svg')
      .and('have.attr', 'alt', 'Menu Icon');

    // cy.dataCy('navbar-side-bar-bg').should('not.exist');

    // Click on the toggle button and check if the navbar links are visible
    cy.dataCy('navbar-toggle').click();

    // Check if the background is visible
    // cy.dataCy('navbar-side-bar-bg').should('exist');

    // Check if the navbar links are visible
    cy.get('nav')
      .should('exist')
      .within(() => {
        // Check if the close button is visible
        cy.dataCy('navbar-close')
          .should('exist')
          .should('not.be.disabled')
          .find('img')
          .should('have.attr', 'src', '/icons/x-icon.svg')
          .and('have.attr', 'alt', 'close-button');

        // Check if the links are visible and have the correct href and label
        cy.get('ul')
          .children()
          .should('have.length', navData.length)
          .each(($el, index) => {
            cy.wrap($el)
              .should('have.prop', 'tagName', 'LI')
              .find('a')
              .should('be.visible')
              .should('have.attr', 'href', navData[index].path)
              .and('contain.text', navData[index].name);
          });

        // Check if the contact us link is visible and has the correct href and label
        cy.dataCy('navbar-contact-us')
          .should('have.prop', 'tagName', 'BUTTON')
          .find('a')
          .should('have.attr', 'href', '/contact-us')
          .and('contain.text', 'Contact Us');

        // Close navbar
        cy.dataCy('navbar-close').click();
        cy.get('ul').should('not.be.visible');
        cy.dataCy('navbar-toggle').find('img').should('be.visible');
        cy.dataCy('navbar-logo').should('be.visible');
      });
  });

  it('Functionality click link on desktop viewport', () => {
    cy.viewport(desktopViewport, 1080);
    navData.forEach((item) => {
      cy.dataCy('navbar-logo').click();
      cy.location('pathname').should('eq', '/');
      cy.dataCy(
        `navbar-link-${item.name.toLowerCase().split(' ').join('-')}`,
      ).click({ force: true });
      const id = item.path.split('#')[1];
      const path = item.path.split('#')[0];
      // Check if the url is correct
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq(path);

        // if (id) {
        //   expect(loc.hash).to.eq(`#${id}`);
        // }
      });
      cy.wait(500);
    });
  });

  it('Functionality click link on mobile viewport', () => {
    cy.viewport(mobileViewport, 640);

    navData.forEach((item) => {
      cy.dataCy('navbar-toggle').click();
      // Wait for the animation to finish
      cy.get('ul').should('be.visible');
      // Click on the link
      cy.dataCy(
        `navbar-link-${item.name.toLowerCase().split(' ').join('-')}`,
      ).click({ force: true });
      const id = item.path.split('#')[1];
      const path = item.path.split('#')[0];
      // Check if the url is correct
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq(path);
        if (id) {
          expect(loc.hash).to.eq(`#${id}`);
        }
        expect(loc.href).to.eq(`${Cypress.config().baseUrl + item.path}`);
      });
      // Click homepage logo
      cy.dataCy('navbar-logo').click();
      cy.location('pathname').should('eq', '/');
    });
  });
});
