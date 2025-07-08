const InteractiveComponent = require('./InteractiveComponent');

/**
 * Represents a form component on a webpage. Extends InteractiveComponent with specific methods
 * for handling form-specific interactions and assertions.
 */
class Form extends InteractiveComponent {
    /**
     * Submits the form by triggering the submit event using Cypress .trigger().
     *
     * @param {Object} [options] - Options object for Cypress .trigger(), e.g., { force: true }.
     * @returns {Form} This instance of Form for chaining calls.
     */
    submit(options) {
        this.get().trigger('submit', options);
        return this;
    }
}

module.exports = Form;