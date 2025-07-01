const BasicComponent = require('./BasicComponent');

/**
 * Represents an interactive component on a webpage. Extends BasicComponent with specific methods
 * for handling enabled/disabled states and value assertions.
 */
class InteractiveComponent extends BasicComponent {

    /** ACTION METHODS */

    /**
     * Enables the interactive component by removing the 'disabled' attribute or setting it to false.
     * @returns {InteractiveComponent} This instance of InteractiveComponent for chaining calls.
     */
    enable() {
        this.get().removeAttr('disabled');
        return this;
    }

    /**
     * Disables the interactive component by adding the 'disabled' attribute or setting it to true.
     * @returns {InteractiveComponent} This instance of InteractiveComponent for chaining calls.
     */
    disable() {
        this.get().attr('disabled', 'true');
        return this;
    }

    /** ASSERTION METHODS */

    /**
     * Asserts that the component is enabled (not disabled).
     * @returns {InteractiveComponent} This instance of InteractiveComponent for chaining calls.
     */
    shouldBeEnabled() {
        this.should('not.be.disabled');
        return this;
    }

    /**
     * Asserts that the component is disabled.
     * @returns {InteractiveComponent} This instance of InteractiveComponent for chaining calls.
     */
    shouldBeDisabled() {
        this.should('be.disabled');
        return this;
    }

    /**
     * Asserts that the component has a specific value.
     * @param {string} value - The expected value to check for.
     * @returns {InteractiveComponent} This instance of InteractiveComponent for chaining calls.
     */
    shouldHaveValue(value) {
        this.should('have.value', value);
        return this;
    }

    /**
     * Asserts that the component does not have a specific value.
     * @param {string} value - The expected value to check against.
     * @returns {InteractiveComponent} This instance of InteractiveComponent for chaining calls.
     */
    shouldNotHaveValue(value) {
        this.should('not.have.value', value);
        return this;
    }
}

module.exports = InteractiveComponent;