const InteractiveComponent = require('./InteractiveComponent');

/**
 * Represents a form component on a webpage. Extends InteractiveComponent with specific methods
 * for handling form-specific interactions and assertions.
 */
class Form extends InteractiveComponent {
    /**
     * Submits the form by triggering the submit event.
     * @returns {Form} This instance of Form for chaining calls.
     */
    submit() {
        this.get().trigger('submit');
        return this;
    }
}

module.exports = Form;