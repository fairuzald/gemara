import { carouselImages } from '@/data/carousel-image';
import { collectionData } from '../../src/data/collection-data';

function rgbToHex(rgb: string) {
  const hex = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return hex
    ? `#${(+hex[1]).toString(16).padStart(2, '0')}${(+hex[2])
        .toString(16)
        .padStart(2, '0')}${(+hex[3]).toString(16).padStart(2, '0')}`
    : '';
}

describe('Home Page', () => {
  // Visit home page before each test
  beforeEach(() => {
    cy.visit('/');
  });

  it('Successfully loads page', () => {
    // H1 should be visible and contain text
    cy.dataCy('hero-title')
      .should('be.visible')
      .and('contain.text', 'gemara batch 1');

    // Carousel should be visible and have 2 images
    cy.dataCy('carousels')
      .children()
      .should('have.length', carouselImages.length);

    // Should have image src and alt
    cy.dataCy('carousels')
      .should('be.visible')
      .children()
      .each(($el, index) => {
        // Image should be visible
        cy.wrap($el)
          .find('img')
          .should('be.visible')
          .should('have.attr', 'src', carouselImages[index].url)
          .should('have.attr', 'alt', carouselImages[index].alt);

        // Caption should be visible
        cy.wrap($el)
          .find('h3')
          .should('be.visible')
          .should('contain.text', carouselImages[index].caption);

        cy.wait(4000);
      });

    // About section
    cy.dataCy('about-us-title')
      .should('be.visible')
      .and('contain.text', 'about us');

    cy.dataCy('about-us-description')
      .should('be.visible')
      .and('contain.text', 'Gemara');

    // Collection section
    cy.dataCy('collection-title')
      .should('be.visible')
      .and('contain.text', 'Collection');

    const expectedCollections = collectionData;

    // Collection list should be visible and have 3 items
    cy.dataCy('collection-list')
      .should('be.visible')
      .children()
      .and('have.length', expectedCollections.length);

    // Collection list should have image, title, and description
    cy.dataCy('collection-list')
      .children()
      .each(($el, index) => {
        // Hexa color should match
        cy.wrap($el)
          .should('have.css', 'background-color')
          .then((computedColor) => {
            const expectedColor =
              expectedCollections[index].backgroundColor.toLowerCase();
            const computedHexColor = rgbToHex(
              computedColor.toString(),
            ).toLowerCase();
            expect(computedHexColor).to.equal(expectedColor);
          });

        cy.wrap($el).find('img').should('be.visible');

        cy.wrap($el)
          .find('h3')
          .should('be.visible')
          .and('contain.text', expectedCollections[index].title);

        cy.wrap($el)
          .find('p')
          .should('be.visible')
          .and('contain.text', expectedCollections[index].description);
      });
  });
});
