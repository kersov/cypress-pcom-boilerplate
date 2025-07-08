const BasicComponent = require('./BasicComponent');

/**
* A class representing a link component on a webpage. Extends BasicComponent.
* @extends BasicComponent
*/
class Link extends BasicComponent {
   /**
    * Visits the URL associated with this link, and asserts that it loads successfully.
    * @returns {Link} - The current instance of the Link object to allow for method chaining.
    */
    visitURL() {
        this.get()
            .should('have.attr', 'href') // Ensure it has an href attribute
            .then((href) => {
                // Visit the URL directly
                cy.visit(href);
            });
        return this;
    }

    /**
     * Opens the link in a new tab by setting target='_blank'.
     * @returns {Link} This instance of Link for chaining calls.
     */
    openInNewTab() {
        this.invoke('attr', 'target', '_blank');
        return this;
    }

    /** LINK-SPECIFIC ASSERTION METHODS */

    /**
     * Asserts that the link has a specific href attribute value.
     * @param {string} expectedHref - The expected href value to check against.
     * @returns {Link} This instance of Link for chaining calls.
     */
    shouldHaveHref(expectedHref) {
        this.shouldHaveAttribute('href', expectedHref);
        return this;
    }

    /**
     * Asserts that the link does not have a specific href attribute value.
     * @param {string} unexpectedHref - The unexpected href value to check against.
     * @returns {Link} This instance of Link for chaining calls.
     */
    shouldNotHaveHref(unexpectedHref) {
        this.shouldNotHaveAttribute('href', unexpectedHref);
        return this;
    }

    /**
     * Asserts that the link is external (based on href starting with http:// or https://).
     * @returns {Link} This instance of Link for chaining calls.
     */
    shouldBeExternalLink() {
        this.invoke('attr', 'href').then(href => {
            cy.wrap(href).should('match', /^(http|https):\/\//);
        });
        return this;
    }

    /**
     * Asserts that the link is internal (based on relative path or starting with /).
     * @returns {Link} This instance of Link for chaining calls.
     */
    shouldBeInternalLink() {
        this.invoke('attr', 'href').then(href => {
            cy.wrap(href).should('not.match', /^(http|https):\/\//);
            cy.wrap(href).should('not.contain', '#');
        });
        return this;
    }
}

module.exports = Link;