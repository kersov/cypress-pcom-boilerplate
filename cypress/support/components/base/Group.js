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
         * Returns a new Group instance with elements not matching the selector or callback.
         */
        not(...args) {
            return this._chain('not', ...args);
        }

        /**
         * Returns a new Group instance with the element at the specified index.
         */
        eq(index) {
            return this._chain('eq', index);
        }

        /**
         * Returns a new Group instance with the first element.
         */
        first() {
            return this._chain('first');
        }

        /**
         * Returns a new Group instance with the last element.
         */
        last() {
            return this._chain('last');
        }

        /**
         * Returns a new Group instance with elements containing the given text or selector.
         */
        contains(...args) {
            return this._chain('contains', ...args);
        }

        /**
         * Returns a new Group instance with elements found by the given selector.
         */
        find(...args) {
            return this._chain('find', ...args);
        }

    };
}

module.exports = Group;
