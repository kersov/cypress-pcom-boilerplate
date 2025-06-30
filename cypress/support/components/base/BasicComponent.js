/**
 * Represents a basic component on a webpage.
 */
class BasicComponent {
    /** CONSTRUCTION */
    /**
     * Creates a new instance of BasicComponent.
     * @param {string} id - The unique identifier for this component.
     * @param {string|function|object} [options] - Selector string, callback function, or options object with selector, text, and/or callback.
     */
    constructor(id, options) {
        this.id = id;
        this.selector = '';
        this.text = '';
        this.callback = undefined;
        if (typeof options === 'string') {
            this.selector = options;
        } else if (typeof options === 'function') {
            this.callback = options;
        } else if (typeof options === 'object' && options !== null) {
            if (typeof options.selector === 'string') {
                this.selector = options.selector;
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
     * Finds a descendant element within this component using a selector.
     * @param {string} selector - The selector to find within this component.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>}
     */
    find(selector) {
        return this.get().find(selector);
    }

    /**
     * Adds a nested component to this component.
     * @param {BasicComponent} component - The component to add as a child of this component.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    addNestedComponent(component) {
        this.nestedComponents.set(component.id, component);
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
     * Clicks on the component.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    click() {
        this.get().click();
        return this;
    }

    /**
     * Clicks on the component if it is visible within a specified timeout.
     * @param {number} [timeout=Cypress.env('COMMANDTIMEOUT')] - The maximum time to wait for the element to be visible.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    clickIfVisible(timeout = Cypress.env('commandTimeout')) {
        const interval = 100;
        cy.get('body').then(($body) => {
            const startTime = new Date().getTime();
            cy.waitUntil(() => {
                const elapsedTime = new Date().getTime() - startTime;
                if (elapsedTime + interval >= timeout) {
                    return new Cypress.Promise((resolve) => resolve(true));
                }
                return $body.find(this.selector).length > 0;
            }, {
                timeout: timeout,
                interval: interval
            }).then(() => {
                const element = $body.find(this.selector);
                if (element && element.is(':visible')) {
                    element.click();
                }
            });
        });
    }

    /**
     * Performs a double-click on the component.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    doubleClick() {
        this.get().dblclick();
        return this;
    }

    /**
     * Performs a right-click (context menu click) on the component.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    rightClick() {
        this.get().rightclick();
        return this;
    }

    /**
     * Focuses on the component.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    focus() {
        this.get().focus();
        return this;
    }

    /**
     * Removes focus from the component.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    blur() {
        this.get().blur();
        return this;
    }

    /**
     * Hovers over the component.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    hover() {
        this.get().trigger('mouseover');
        return this;
    }

    /**
     * Scrolls the component into view.
     * @param {boolean} [smooth=false] - Whether to scroll smoothly
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    scrollIntoView(smooth = false) {
        this.get().scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
        return this;
    }

    /**
     * Presses the Enter key on the component.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    pressEnter() {
        this.get().type('{enter}');
        return this;
    }

    /**
     * Presses the Space key on the component.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    pressSpace() {
        this.get().type(' ');
        return this;
    }

    /**
     * Presses the Up Arrow key on the component.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    pressUpArrow() {
        this.get().type('{uparrow}');
        return this;
    }

    /**
     * Presses the Down Arrow key on the component.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    pressDownArrow() {
        this.get().type('{downarrow}');
        return this;
    }

    /** ASSERTION METHODS */

    /**
     * Asserts that the component meets a given condition.
     * @param {string} assertion - The assertion to make about the component. Must be a valid Chai assertion.
     * @param {any} [value] - Optional value to compare against in the assertion.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    should(assertion, value) {
        if (!assertion) {
            // Fail the test if no assertion is provided
            throw new Error('Assertion must be provided to should().');
        }
        if (typeof(value) !== 'undefined') {
            this.get().should(assertion, value);
        } else {
            this.get().should(assertion);
        }
        return this;
    }

    /**
     * Allows multiple assertions to be chained using AND logic.
     * @param {string} condition - The first assertion condition.
     * @param {...any} args - Additional arguments for subsequent assertions.
     * @returns {BasicComponent} This instance of BasicComponent for chaining calls.
     */
    and(condition, ...args) {
        this.should(condition, ...args);
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