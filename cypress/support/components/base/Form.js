const InteractiveComponent = require('./InteractiveComponent');

/**
 * Represents a form component on a webpage. Extends InteractiveComponent with specific methods
 * for handling form-specific interactions and assertions.
 */
class Form extends InteractiveComponent {
    /**
     * Submits the form using Cypress .submit().
     *
     * @param {Object} [options] - Options object for Cypress .submit(), e.g., { timeout: 10000 }.
     * @returns {Form} This instance of Form for chaining calls.
     */
    submit(options) {
        this.get().submit(options);
        return this;
    }
}

module.exports = Form;