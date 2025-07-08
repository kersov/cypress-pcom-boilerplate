const Select = require('./Select');

/**
 * Represents a multi-select dropdown component, extending Select.
 */
class MultiSelect extends Select {
    /** ACTION METHODS */

    /**
     * Selects one or more options by value(s) in the multi-select dropdown.
     * @param {string|string[]} values - The value(s) of the option(s) to select.
     * @param {object} [options] - Optional options object for Cypress .select().
     * @returns {MultiSelect} This instance of MultiSelect for chaining calls.
     */
    selectOptions(values, options) {
        this.get().select(values, options);
        return this;
    }

    /**
     * Deselects all selected options in the multi-select dropdown.
     * @returns {MultiSelect} This instance of MultiSelect for chaining calls.
     */
    deselectAll() {
        this.get().invoke('val', []).trigger('change');
        return this;
    }

    /** ASSERTION METHODS */

    /**
     * Asserts that the multi-select has the expected selected values.
     * @param {string[]} expectedValues - The expected selected values.
     * @returns {MultiSelect} This instance of MultiSelect for chaining calls.
     */
    shouldHaveSelectedValues(expectedValues) {
        this.get().invoke('val').should('deep.equal', expectedValues);
        return this;
    }

    /**
     * Asserts that the multi-select includes a specific value among selected values.
     * @param {string} value - The value to check for among selected values.
     * @returns {MultiSelect} This instance of MultiSelect for chaining calls.
     */
    shouldIncludeSelectedValue(value) {
        this.get().invoke('val').should('include', value);
        return this;
    }
}

module.exports = MultiSelect;
