const Input = require('./Input');

class Select extends Input {
    /** ACTION METHODS */

    /**
     * Selects an option by value in the dropdown.
     * @param {string} value - The value of the option to select.
     * @returns {Select} This instance of Select for chaining calls.
     */
    selectOption(value) {
        cy.get(this.selector).select(value);
        return this;
    }

    /** ASSERTION METHODS */

    /**
     * Asserts that a specific option exists in the dropdown by its text.
     * @param {string} text - The text content of the option to check for.
     * @returns {Select} This instance of Select for chaining calls.
     */
    shouldHaveOption(text) {
        cy.get(this.selector).find('option').should('contain', text);
        return this;
    }
}

module.exports = Select;