const TypeableComponent = require('./TypeableComponent');
const Label = require('./Label');

/**
 * Represents an input component, extending TypeableComponent.
 */
class Input extends TypeableComponent {

    /** ACTION METHODS */

    /**
     * Checks a checkbox input if it's not already checked.
     * Accepts any arguments and passes them to Cypress .check().
     * @returns {Input} This instance of Input for chaining calls.
     */
    check(...args) {
        this.get().check(...args);
        return this;
    }

    /**
     * Unchecks a checkbox input if it's checked.
     * Accepts any arguments and passes them to Cypress .uncheck().
     * @returns {Input} This instance of Input for chaining calls.
     */
    uncheck(...args) {
        this.get().uncheck(...args);
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
        this.get().should('be.checked');
        return this;
    }

    /**
     * Asserts that the input is a checkbox and is not checked.
     * @returns {Input} This instance of Input for chaining calls.
     */
    shouldNotBeChecked() {
        this.get().should('not.be.checked');
        return this;
    }

    /**
     * Creates a Label component and adds it as an attribute to this Input.
     * If uid or options are not provided, defaults are used:
     *   - uid: this.uid + '-label'
     *   - selector: 'label[for="' + this.id + '"]' (if this.id exists)
     * @param {string} [uid] - The unique identifier for the Label component.
     * @param {string|function|object} [options] - Selector string, callback function, or options object for the Label component (can include selector, text, callback).
     * @returns {Label} The created Label component.
     */
    addLabel(uid = `${this.uid}-label`, options = `label[for="${this.id}"]`) {
        this.label = new Label(uid, options);
        return this.label;
    }

    /**
     * Returns the Label component associated with this Input, or null if none exists.
     * @returns {Label|null}
     */
    getLabel() {
        return this.label || null;
    }
}

module.exports = Input;
