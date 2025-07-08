const Input = require('./Input');

class Select extends Input {
    /** ACTION METHODS */

    /**
     * Selects an option by value in the dropdown using Cypress .select().
     *
     * @param {string} value - The value of the option to select.
     * @param {Object} [options] - Options object for Cypress .select(), e.g., { force: true }.
     * @returns {Select} This instance of Select for chaining calls.
     */
    selectOption(value, options) {
        this.get().select(value, options);
        return this;
    }

    /** ASSERTION METHODS */

    /**
     * Asserts that a specific option exists in the dropdown by its text.
     * @param {string} text - The text content of the option to check for.
     * @returns {Select} This instance of Select for chaining calls.
     */
    shouldHaveOption(text) {
        this.get().find('option').should('contain', text);
        return this;
    }
}

module.exports = Select;