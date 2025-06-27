const InteractiveComponent = require('./InteractiveComponent');

/**
 * Represents a component that allows typing and provides related assertions.
 */
class TypeableComponent extends InteractiveComponent {
    /**
     * Types text into the component.
     * @param {string} text - The text to type.
     * @param {object} [options={}] - Optional options for typing (see Cypress.type() documentation).
     * @returns {TypeableComponent} This instance of TypeableComponent for chaining calls.
     */
    type(text, options = {}) {
        cy.get(this.selector).type(text, options);
        return this;
    }

    /**
     * Clears the content from the component.
     * @returns {TypeableComponent} This instance of TypeableComponent for chaining calls.
     */
    clear() {
        cy.get(this.selector).clear();
        return this;
    }

    /** ASSERTION METHODS */

    /**
     * Asserts that the component has a specific value.
     * @param {string} value - The expected value to check for.
     * @returns {TypeableComponent} This instance of TypeableComponent for chaining calls.
     */
    shouldHaveValue(value) {
        this.should('have.value', value);
        return this;
    }

    /**
     * Asserts that the component does not have a specific value.
     * @param {string} value - The expected value to check against.
     * @returns {TypeableComponent} This instance of TypeableComponent for chaining calls.
     */
    shouldNotHaveValue(value) {
        this.should('not.have.value', value);
        return this;
    }

    /**
     * Asserts that the component has a minimum length constraint set to an expected value.
     * @param {number} expectedLength - The expected minimum length to check for.
     * @returns {TypeableComponent} This instance of TypeableComponent for chaining calls.
     */
    shouldHaveMaxLength(expectedLength) {
        this.shouldHaveAttribute('minlength', expectedLength.toString());
        return this;
    }

    /**
     * Asserts that the component has a maximum length constraint set to an expected value.
     * @param {number} expectedLength - The expected maximum length to check for.
     * @returns {TypeableComponent} This instance of TypeableComponent for chaining calls.
     */
    shouldHaveMainLength(expectedLength) {
        this.shouldHaveAttribute('maxlength', expectedLength.toString());
        return this;
    }
}

module.exports = TypeableComponent;