/**
 * Group mixin for component classes.
 * Allows a component to manage a group of child components and provides group-level operations.
 *
 * @template T
 * @param {T} BaseClass - The base component class to extend.
 * @returns {T} A new class extending the base class with group functionality.
 *
 * @example
 * class MyGroup extends Group(BasicComponent) { ... }
 */
function Group(BaseClass) {
    return class extends BaseClass {
        /**
         * Creates a new instance of a Group component.
         * @param {string} uid - The unique identifier for this group component.
         * @param {string|function|object} [options] - Selector string, callback function, or options object with selector, text, and/or callback.
         */
        constructor(uid, options) {
            super(uid, options);
        }

        /**
         * Returns a new Group instance filtered by the provided selector and options.
         * The new instance will have a unique uid based on the original uid and filter criteria.
         * @param {string} selector - The selector to filter elements by.
         * @param {object} [options] - Optional options to pass to Cypress .filter().
         * @returns {any} A new Group instance representing the filtered group.
         */
        filter(selector, options) {
            return this._chain('filter', selector, options);
        }

        /**
         * Helper to create a new Group instance using a Cypress chainable method.
         * @private
         * @param {string} method - The Cypress method name.
         * @param {...any} args - Arguments to pass to the Cypress method.
         * @returns {any} A new Group instance representing the result.
         */
        _chain(method, ...args) {
            const chainedUid = `${this.uid}-${method}-${args.map(String).join('-')}`;
            return new (Group(BaseClass))(chainedUid, () => this.get()[method](...args));
        }

        /**
         * Returns a new Group instance with elements not matching the given filter using Cypress .not().
         *
         * Supported argument patterns:
         * - not(selector)
         * - not(selector, options)
         * - not(index)
         * - not(callback)
         * - not(regex)
         * - not(regex, options)
         *
         * @param {...any} args - Arguments to pass to Cypress .not().
         * @returns {any} A new Group instance representing the result.
         */
        not(...args) {
            return this._chain('not', ...args);
        }

        /**
         * Returns a new Group instance with the element at the specified position using Cypress .eq().
         *
         * Supports retrieving by index from start or end, with optional options:
         * - eq(index)
         * - eq(index, options)
         * - eq(indexFromEnd, options)  // negative index from end
         *
         * @param {number} [index] - Zero-based index of the element to include (e.g., 0 for first).
         * @param {number} [indexFromEnd] - Negative index from end (e.g., -1 for last).
         * @param {Object} [options] - Options object to change default .eq() behavior.
         * @returns {any} A new Group instance representing the result.
         */
        eq(...args) {
            return this._chain('eq', ...args);
        }

        /**
         * Returns a new Group instance with the first element using Cypress .first().
         *
         * @param {Object} [options] - Options object for Cypress .first(), e.g., { timeout: 10000 }.
         * @returns {any} A new Group instance representing the result.
         */
        first(options) {
            return this._chain('first', options);
        }

        /**
         * Returns a new Group instance with the last element using Cypress .last().
         *
         * @param {Object} [options] - Options object for Cypress .last(), e.g., { timeout: 10000 }.
         * @returns {any} A new Group instance representing the result.
         */
        last(options) {
            return this._chain('last', options);
        }

        /**
         * Returns a new Group instance with elements containing the given content or matching selector using Cypress .contains().
         *
         * Supported argument patterns:
         * - contains(content)
         * - contains(content, options)
         * - contains(selector, content)
         * - contains(selector, content, options)
         *
         * @param {string|number|RegExp} content - Get the DOM element containing the content.
         * @param {string} [selector] - Specify a selector to filter DOM elements containing the text.
         * @param {Object} [options] - Pass in an options object to change the default behavior of .contains().
         * @returns {any} A new Group instance representing the result.
         */
        contains(...args) {
            return this._chain('contains', ...args);
        }

        /**
         * Returns a new Group instance with elements found by the given selector using Cypress .find().
         *
         * Supported argument patterns:
         * - find(selector)
         * - find(selector, options)
         *
         * @param {string} selector - A selector used to filter matching descendant DOM elements.
         * @param {Object} [options] - Pass in an options object to change the default behavior of .find().
         * @returns {any} A new Group instance representing the result.
         */
        find(...args) {
            return this._chain('find', ...args);
        }

    };
}

module.exports = Group;
