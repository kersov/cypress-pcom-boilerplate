const TypeableComponent = require('./TypeableComponent');

/**
 * Represents an input component, extending TypeableComponent.
 */
class Input extends TypeableComponent {

    /** ACTION METHODS */

    /**
     * Checks a checkbox input if it's not already checked.
     * @returns {Input} This instance of Input for chaining calls.
     */
    check() {
        cy.get(this.selector).check();
        return this;
    }

    /**
     * Unchecks a checkbox input if it's checked.
     * @returns {Input} This instance of Input for chaining calls.
     */
    uncheck() {
        cy.get(this.selector).uncheck();
        return this;
    }

    /**
     * Toggles the state of a checkbox input (checks if unchecked, unchecks if checked).
     * @returns {Input} This instance of Input for chaining calls.
     */
    toggle() {
        this.click();
        return this;
    }

    /** ASSERTION METHODS */

    /**
     * Asserts that the input can accept a specific type (e.g., email, password, etc.).
     * @param {string} expectedType - The expected type attribute value to check for.
     * @returns {Input} This instance of Input for chaining calls.
     */
    shouldAcceptType(expectedType) {
        this.shouldHaveAttribute('type', expectedType);
        return this;
    }

    /**
     * Asserts that the input is a checkbox and is checked.
     * @returns {Input} This instance of Input for chaining calls.
     */
    shouldBeChecked() {
        cy.get(this.selector).should('be.checked');
        return this;
    }

    /**
     * Asserts that the input is a checkbox and is not checked.
     * @returns {Input} This instance of Input for chaining calls.
     */
    shouldNotBeChecked() {
        cy.get(this.selector).should('not.be.checked');
        return this;
    }
}

module.exports = Input;
