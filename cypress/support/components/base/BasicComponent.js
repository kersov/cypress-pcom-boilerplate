/**
 * Represents a basic component on a webpage.
 */
class BasicComponent {
    /** CONSTRUCTION */
    /**
     * Creates a new instance of BasicComponent.
     * @param {string} uid - The unique identifier for this component.
     * @param {string|function|object} [options] - Selector string, callback function, or options object with selector, text, and/or callback.
     */
    constructor(uid, options) {
        this.uid = uid;
        this.selector = '';
        this.text = '';
        this.callback = undefined;
        this.id = undefined;
        const setSelector = (selector) => {
            this.selector = selector;
            if (selector.startsWith('#')) {
                this.id = selector.substring(1);
            }
        };
        if (typeof options === 'string') {
            setSelector(options);
        } else if (typeof options === 'function') {
            this.callback = options;
        } else if (typeof options === 'object' && options !== null) {
            if (typeof options.selector === 'string') {
                setSelector(options.selector);
            }
            if (typeof options.text === 'string') {
                this.text = options.text;
            }
            if (typeof options.callback === 'function') {
                this.callback = options.callback;
            }
        }
        this.nestedComponents = new Map();
    }

    /**
     * Returns the Cypress chainable for the component using callback if available.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
     */
    getByCallback() {
        if (!this.callback) {
            throw new Error('No callback defined for this component.');
        }
        return this.callback();
    }

    /**
     * Returns the Cypress chainable for the component's selector (if selector is set).
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
     */
    getBySelector() {
        return cy.get(this.selector);
    }

    /**
     * Returns the Cypress chainable for the component's text using cy.contains.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
     */
    getByText() {
        return cy.contains(this.text);
    }

    /**
     * Returns the Cypress chainable for the component using selector if available, otherwise by text, otherwise by callback.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
     */
    get() {
        if (this.callback) {
            return this.getByCallback();
        } else if (this.selector) {
            return this.getBySelector();
        } else if (this.text) {
            return this.getByText();
        } else {
            throw new Error('Neither selector, text, nor callback is defined for this component.');
        }
    }

    /**
     * Adds a nested component to this component.
     * @param {BasicComponent} component - The component to add as a child of this component.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    addNestedComponent(component) {
        this.nestedComponents.set(component.uid, component);
        return this;
    }

    /**
     * Returns an array containing all nested components of this component.
     * @returns {BasicComponent[]} An array containing the nested components of this component.
     */
    getNestedComponents() {
        return Array.from(this.nestedComponents.values());
    }

    /** ACTION METHODS */

    /**

     * Clicks on the component using the same argument patterns as Cypress .click():
     * - click(position)
     * - click(position, options)
     * - click(x, y)
     * - click(x, y, options)
     * @param {string|number} [positionOrX] - Position string (e.g., 'topLeft') or X-coordinate.
     * @param {number|Object} [yOrOptions] - Y-coordinate when first arg is number, or options object when first arg is string.
     * @param {Object} [options] - Options object for click when using X and Y coordinates.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    click(...args) {
        this.get().click(...args);
        return this;
    }

    /**
     * Clicks on the component if it is visible within a specified timeout, forwarding click arguments.
     * @param {number} [timeout=Cypress.env('commandTimeout')] - The maximum time to wait for the element to be visible.
     * @param {string|number} [positionOrX] - Position string (e.g., 'topLeft') or X-coordinate, forwarded to .click().
     * @param {number|Object} [yOrOptions] - Y-coordinate when first arg is number, or options object when first arg is string.
     * @param {Object} [options] - Options object for click when using X and Y coordinates.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    clickIfVisible(timeout = Cypress.env('commandTimeout'), ...args) {
        const interval = 100;
        cy.get('body').then(($body) => {
            const startTime = Date.now();
            cy.waitUntil(() => {
                const elapsed = Date.now() - startTime;
                if (elapsed + interval >= timeout) {
                    return Cypress.Promise.resolve(true);
                }
                if (this.selector) {
                    return $body.find(this.selector).length > 0;
                } else if (this.text) {
                    return $body.find(`*:contains("${this.text}")`).length > 0;
                }
                return false;
            }, { timeout, interval })
            .then(() => {
                if (this.selector) {
                    const element = $body.find(this.selector);
                    if (element && element.is(':visible')) {
                        element.click(...args);
                    }
                } else if (this.text) {
                    const element = $body.find(`*:contains("${this.text}")`);
                    if (element && element.is(':visible')) {
                        element.click(...args);
                    }
                }
            });
        });
        return this;
    }

    /**
     * Performs a double-click on the component using the same argument patterns as Cypress .dblclick():
     * - dblclick(position)
     * - dblclick(position, options)
     * - dblclick(x, y)
     * - dblclick(x, y, options)
     * @param {string|number} [positionOrX] - Position string (e.g., 'topLeft') or X-coordinate.
     * @param {number|Object} [yOrOptions] - Y-coordinate when first arg is number, or options object when first arg is string.
     * @param {Object} [options] - Options object for dblclick when using X and Y coordinates.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    doubleClick(...args) {
        this.get().dblclick(...args);
        return this;
    }

    /**
     * Performs a right-click (context menu click) on the component using the same argument patterns as Cypress .rightclick():
     * - rightclick(position)
     * - rightclick(position, options)
     * - rightclick(x, y)
     * - rightclick(x, y, options)
     * @param {string|number} [positionOrX] - Position string (e.g., 'topLeft') or X-coordinate.
     * @param {number|Object} [yOrOptions] - Y-coordinate when first arg is number, or options object when first arg is string.
     * @param {Object} [options] - Options object for rightclick when using X and Y coordinates.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    rightClick(...args) {
        this.get().rightclick(...args);
        return this;
    }

    /**
     * Focuses on the component using the same argument patterns as Cypress .focus():
     * - focus()
     * - focus(options)
     * @param {Object} [options] - Optional options for Cypress .focus(), e.g., scrollBehavior.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    focus(options) {
        this.get().focus(options);
        return this;
    }

    /**
     * Removes focus from the component. Accepts any options supported by Cypress .blur(), e.g., { force: true }.
     * @param {Object} [options] - Options object for Cypress .blur().
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    blur(options) {
        this.get().blur(options);
        return this;
    }

    /**
     * Scrolls the component into view. Accepts any options supported by Cypress .scrollIntoView(), e.g., { behavior: 'smooth' }.
     * @param {Object} [options] - Options object for Cypress .scrollIntoView().
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    scrollIntoView(options) {
        this.get().scrollIntoView(options);
        return this;
    }

    /**
     * Scrolls the component to a specific position or coordinates using Cypress .scrollTo(), supporting:
     * - scrollTo(position)
     * - scrollTo(position, options)
     * - scrollTo(x, y)
     * - scrollTo(x, y, options)
     * @param {string|number} [xOrPosition] - Position string (e.g., 'topLeft') or X-coordinate.
     * @param {number|Object} [yOrOptions] - Y-coordinate when first arg is number, or options object when first arg is string.
     * @param {Object} [options] - Options object for .scrollTo(), e.g., { ensureScrollable: false }.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    scrollTo(...args) {
        this.get().scrollTo(...args);
        return this;
    }

    /**

     * Types text into the component using Cypress .type().
     *
     * @param {string} text - The text to type into the component.
     * @param {Object} [options] - Options object for Cypress .type(), e.g., { delay: 100 }.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    type(text, options) {
        this.get().type(text, options);
        return this;
    }

    /**
     * Presses the Enter key on the component. Uses the `type` helper method.
     * @param {Object} [options] - Options object for Cypress .type(), e.g., { delay: 100 }.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    pressEnter(options) {
        this.type('{enter}', options);
        return this;
    }

    /**
     * Presses the Space key on the component. Uses the `type` helper method.
     * @param {Object} [options] - Options object for Cypress .type(), e.g., { delay: 100 }.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    pressSpace(options) {
        this.type(' ', options);
        return this;
    }

    /**
     * Presses the Up Arrow key on the component. Uses the `type` helper method.
     * @param {Object} [options] - Options object for Cypress .type(), e.g., { delay: 100 }.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    pressUpArrow(options) {
        this.type('{uparrow}', options);
        return this;
    }

    /**
     * Presses the Down Arrow key on the component. Uses the `type` helper method.
     * @param {Object} [options] - Options object for Cypress .type(), e.g., { delay: 100 }.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    pressDownArrow(options) {
        this.type('{downarrow}', options);
        return this;
    }

    /**
     * Invokes a function or jQuery method on the component using Cypress .invoke().
     * - functionName (Function|string) - Callback or jQuery method/property name to invoke.
     * - options (Object) - Options object to pass to .invoke().
     * - args... - Additional arguments to be given to the function call. No limit on count.
     * @param {Function|string} functionName - Callback function or jQuery method/property name.
     * @param {Object} [options] - Options object for the invoke call.
     * @param {...any} args - Additional arguments for the invoked function or method.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    invoke(...args) {
        this.get().invoke(...args);
        return this;
    }

    /**
     * Triggers a DOM event on the component using Cypress .trigger().
     *
     * Supported argument patterns:
     * - trigger(eventName)
     * - trigger(eventName, options)
     * - trigger(eventName, position)
     * - trigger(eventName, position, options)
     * - trigger(eventName, x, y)
     * - trigger(eventName, x, y, options)
     *
     * @param {string} eventName - The name of the event to be triggered on the DOM element.
     * @param {string} [position] - The position where the event should be triggered. Valid positions: topLeft, top, topRight, left, center, right, bottomLeft, bottom, bottomRight. (see Cypress positions diagram)
     * @param {number} [x] - The distance in pixels from the element's left to trigger the event.
     * @param {number} [y] - The distance in pixels from the element's top to trigger the event.
     * @param {Object} [options] - Options object to change the default behavior of .trigger().
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    trigger(eventName, ...args) {
        this.get().trigger(eventName, ...args);
        return this;
    }

    /**
     * Invokes a jQuery method on the component using Cypress .invoke().
     * @param {string} method - The jQuery method or property to invoke.
     * @param {...any} args - Arguments to pass to the invoked method.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    invoke(method, ...args) {
        this.get().invoke(method, ...args);
        return this;
    }

    /**
     * Triggers a DOM event on the component using Cypress .trigger().
     * @param {string} eventName - The name of the event to trigger.
     * @param {...any} args - Additional arguments to pass to .trigger().
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    trigger(eventName, ...args) {
        this.get().trigger(eventName, ...args);
        return this;
    }

    /**
     * Invokes a jQuery method on the component using Cypress .invoke().
     * @param {string} method - The jQuery method or property to invoke.
     * @param {...any} args - Arguments to pass to the invoked method.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    invoke(method, ...args) {
        this.get().invoke(method, ...args);
        return this;
    }

    /**
     * Triggers a DOM event on the component using Cypress .trigger().
     * @param {string} eventName - The name of the event to trigger.
     * @param {...any} args - Additional arguments to pass to .trigger().
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    trigger(eventName, ...args) {
        this.get().trigger(eventName, ...args);
        return this;
    }

    /** ASSERTION METHODS */

    /**

     * Asserts that the component meets a given condition using Cypress .should().
     *
     * Supported argument patterns:
     * - should(callbackFn)
     * - should(chainers)
     * - should(chainers, value)
     * - should(chainers, method, value)
     * - should(chainers, callbackFn)
     *
     * @param {string} [chainers] - Any valid Chai, Chai-jQuery, or Sinon-Chai assertion string.
     * @param {string} [method]   - A method to be called on the chainer (e.g., 'equal').
     * @param {any}    [value]    - Value to assert against the chainer.
     * @param {Function} [callbackFn] - Pass a function that receives the subject for explicit assertions.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    should(...args) {
        if (args.length === 0) {
            throw new Error('Arguments must be provided to should().');
        }
        this.get().should(...args);
        return this;
    }

    /**
     * Chains an assertion using AND logic with Cypress .and().
     *
     * Supported argument patterns:
     * - and(callbackFn)
     * - and(chainers)
     * - and(chainers, value)
     * - and(chainers, method, value)
     * - and(chainers, callbackFn)
     *
     * @param {string} [chainers] - Any valid Chai, Chai-jQuery, or Sinon-Chai assertion string.
     * @param {string} [method]   - A method to be called on the chainer (e.g., 'equal').
     * @param {any}    [value]    - Value to assert against the chainer.
     * @param {Function} [callbackFn] - Pass a function that receives the subject for explicit assertions.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    and(...args) {
        if (args.length === 0) {
            throw new Error('Arguments must be provided to and().');
        }
        this.get().and(...args);
        return this;
    }

    /**
     * Asserts that the component is visible on the page.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldBeVisible() {
        this.should('be.visible');
        return this;
    }

    /**
     * Asserts that the component is not visible on the page.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldNotBeVisible() {
        this.should('not.be.visible');
        return this;
    }

    /**
     * Asserts that the component exists on the page.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldExist() {
        this.should('exist');
        return this;
    }

    /**
     * Asserts that the component does not exist on the page.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldNotExist() {
        this.should('not.exist');
        return this;
    }

    /**
     * Asserts that the component is empty (e.g., has no content).
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldBeEmpty() {
        this.should('be.empty');
        return this;
    }

    /**
     * Asserts that the component is empty (e.g., has no content).
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldNotBeEmpty() {
        this.should('not.be.empty');
        return this;
    }

    /**
     * Asserts that the component has specific text content.
     * @param {string} text - The text content to check for.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldHaveText(text) {
        this.should('have.text', text);
        return this;
    }

    /**
     * Asserts that the component does not have specific text content.
     * @param {string} text - The text content to check against.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldNotHaveText(text) {
        this.should('not.have.text', text);
        return this;
    }

    /**
     * Asserts that the component contains specific text (substring).
     * @param {string} text - The substring to check for in the component's text content.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldContainText(text) {
        this.should('contain', text);
        return this;
    }

    /**
     * Asserts that the component does not contain specific text (substring).
     * @param {string} text - The substring to check against in the component's text content.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldNotContainText(text) {
        this.should('not.contain', text);
        return this;
    }

    /**
     * Asserts that the component has a specific attribute with an optional value.
     * @param {string} attr - The attribute name to check for.
     * @param {any} [value] - Optional value to compare against.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldHaveAttribute(attr, value) {
        if (typeof value !== 'undefined') {
            this.should('have.attr', attr, value);
        } else {
            this.should('have.attr', attr);
        }
        return this;
    }

    /**
     * Asserts that the component does not have a specific attribute with an optional value.
     * @param {string} attr - The attribute name to check against.
     * @param {any} [value] - Optional value to compare against.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldNotHaveAttribute(attr, value) {
        if (typeof value !== 'undefined') {
            this.should('not.have.attr', attr, value);
        } else {
            this.should('not.have.attr', attr);
        }
        return this;
    }

    /**
     * Asserts that the component has a specific class name.
     * @param {string} className - The class name to check for.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldHaveClass(className) {
        this.should('have.class', className);
        return this;
    }

    /**
     * Asserts that the component does not have a specific class name.
     * @param {string} className - The class name to check against.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldNotHaveClass(className) {
        this.should('not.have.class', className);
        return this;
    }

    /**
     * Asserts that the component matches a given selector.
     * @param {string} selector - The selector to match against.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldMatchSelector(selector) {
        this.should('match', selector);
        return this;
    }

    /**
     * Asserts that the component does not match a given selector.
     * @param {string} selector - The selector to check against.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    shouldNotMatchSelector(selector) {
        this.should('not.match', selector);
        return this;
    }
}

module.exports = BasicComponent;