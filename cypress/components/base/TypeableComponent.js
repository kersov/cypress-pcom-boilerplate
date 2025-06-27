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

    /**
     * Asserts that the input is readonly.
     * @returns {Input} This instance for chaining.
     */
    shouldBeReadonly() {
        this.shouldHaveAttribute('readonly');
        return this;
    }

    /**
     * Asserts that the input is required.
     * @returns {Input} This instance for chaining.
     */
    shouldBeRequired() {
        this.shouldHaveAttribute('required');
        return this;
    }
}

module.exports = TypeableComponent;