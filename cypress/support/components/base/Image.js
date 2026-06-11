const BasicComponent = require('./BasicComponent');

/**
 * Represents an image component on a webpage. Extends BasicComponent.
 */
class Image extends BasicComponent {
    /** ASSERTION METHODS */

    /**
     * Asserts that the image has a specific src attribute value.
     * @param {string} expectedSource - The expected src value to check for.
     * @returns {Image} This instance of Image for chaining calls.
     */
    shouldHaveSource(expectedSource) {
        this.shouldHaveAttribute('src', expectedSource);
        return this;
    }

    /**
     * Asserts that the image has a specific alt attribute value.
     * @param {string} expectedAlt - The expected alt value to check for.
     * @returns {Image} This instance of Image for chaining calls.
     */
    shouldHaveAlt(expectedAlt) {
        this.shouldHaveAttribute('alt', expectedAlt);
        return this;
    }

    /**
     * Asserts that the image has actually loaded (naturalWidth > 0), catching broken images.
     * @returns {Image} This instance of Image for chaining calls.
     */
    shouldBeLoaded() {
        this.get().should(($img) => {
            expect($img[0].naturalWidth, 'image natural width').to.be.greaterThan(0);
        });
        return this;
    }
}

module.exports = Image;
