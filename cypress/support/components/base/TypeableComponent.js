const InteractiveComponent = require('./InteractiveComponent');

/**
 * Represents a component that allows typing and provides related assertions.
 */
class TypeableComponent extends InteractiveComponent {
    /**
     * Clears the content from the component using Cypress .clear().
     *
     * @param {Object} [options] - Options object for Cypress .clear(), e.g., { force: true }.
     * @returns {TypeableComponent} This instance of TypeableComponent for chaining calls.
     */
    clear(options) {
        this.get().clear(options);
        return this;
    }

    /** ASSERTION METHODS */

    /**
     * Asserts that the component has a minimum length constraint set to an expected value.
     * @param {number} expectedLength - The expected minimum length to check for.
     * @returns {TypeableComponent} This instance of TypeableComponent for chaining calls.
     */
    shouldHaveMinLength(expectedLength) {
        this.shouldHaveAttribute('minlength', expectedLength.toString());
        return this;
    }

    /**
     * Asserts that the component has a maximum length constraint set to an expected value.
     * @param {number} expectedLength - The expected maximum length to check for.
     * @returns {TypeableComponent} This instance of TypeableComponent for chaining calls.
     */
    shouldHaveMaxLength(expectedLength) {
        this.shouldHaveAttribute('maxlength', expectedLength.toString());
        return this;
    }

    /**
     * Asserts that the input is readonly.
     * @returns {TypeableComponent} This instance of TypeableComponent for chaining calls.
     */
    shouldBeReadonly() {
        this.shouldHaveAttribute('readonly');
        return this;
    }

    /**
     * Asserts that the input is required.
     * @returns {TypeableComponent} This instance of TypeableComponent for chaining calls.
     */
    shouldBeRequired() {
        this.shouldHaveAttribute('required');
        return this;
    }
}

module.exports = TypeableComponent;