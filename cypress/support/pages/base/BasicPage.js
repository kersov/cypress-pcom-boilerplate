/**
 * Represents a basic webpage that can have components added to it.
 */
class BasicPage {
    /**
     * Creates an instance of BasicPage.
     * @param {string} path - The URL path for the page. May contain `:token` placeholders (e.g., '/users/:id').
     */
    constructor(path) {
        this.path = path;
        this.currentPath = undefined;
        this.components = new Map();
    }

    /** COMPONENT MANAGEMENT */

    /**
     * Adds a component to the page and its nested components if any.
     * @param {object} component - The component object to be added.
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    addComponent(component) {
        this.components.set(component.uid, component);

        // Add nested components at the same level
        component.getNestedComponents().forEach(nestedComponent => {
            this.components.set(nestedComponent.uid, nestedComponent);
        });
        return this;
    }

    /**
     * Gets a component by its unique identifier.
     * @param {string} uid - The unique identifier of the component to retrieve.
     * @return {object|undefined} Returns the component if found, or undefined if not.
     */
    getComponent(uid) {
        return this.components.get(uid);
    }

    /**
     * Gets a component by its unique identifier.
     * @deprecated Use getComponent() instead.
     * @param {string} id - The unique identifier of the component to retrieve.
     * @return {object|undefined} Returns the component if found, or undefined if not.
     */
    getComponentById(id) {
        return this.getComponent(id);
    }

    /**
     * Checks whether a component is registered on the page.
     * @param {string} uid - The unique identifier of the component.
     * @return {boolean} True if the component is registered, false otherwise.
     */
    hasComponent(uid) {
        return this.components.has(uid);
    }

    /** PATH RESOLUTION */

    /**
     * Resolves the page path, substituting `:token` placeholders with the provided parameters.
     * @param {object} [params] - Values for `:token` placeholders, keyed by token name.
     * @return {string} The resolved path.
     */
    getPath(params) {
        let path = this.path;
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                path = path.replace(`:${key}`, encodeURIComponent(value));
            });
        }
        return path;
    }

    /** NAVIGATION */

    /**
     * Opens the page in the browser.
     * @param {object} [options] - Options object. The `params` property is used to substitute
     *                             `:token` placeholders in the path; all other properties are
     *                             forwarded to cy.visit() (e.g., { failOnStatusCode: false }).
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    open(options = {}) {
        const { params, ...visitOptions } = options;
        this.currentPath = this.getPath(params);
        cy.visit(this.currentPath, visitOptions);
        return this;
    }

    /**
     * Reloads the current page using cy.reload(), forwarding any arguments
     * (e.g., forceReload boolean and/or options object).
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    reload(...args) {
        cy.reload(...args);
        return this;
    }

    /**
     * Navigates back in the browser history.
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    goBack() {
        cy.go('back');
        return this;
    }

    /**
     * Navigates forward in the browser history.
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    goForward() {
        cy.go('forward');
        return this;
    }

    /**
     * Scrolls the window to the top of the page.
     * @param {object} [options] - Options object for cy.scrollTo(), e.g., { duration: 500 }.
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    scrollToTop(options) {
        cy.scrollTo('top', options);
        return this;
    }

    /**
     * Scrolls the window to the bottom of the page.
     * @param {object} [options] - Options object for cy.scrollTo(), e.g., { duration: 500 }.
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    scrollToBottom(options) {
        cy.scrollTo('bottom', options);
        return this;
    }

    /** ASSERTION METHODS */

    /**
     * Verifies that the current URL includes the page's path.
     * Uses the last opened path when the page was opened with params.
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    verifyPageIsOpened() {
        cy.url().should('include', this.currentPath || this.getPath());
        return this;
    }

    /**
     * Asserts that the current location pathname exactly equals the page's path
     * (or the provided path).
     * @param {string} [path] - Optional explicit path to assert against. Defaults to the last
     *                          opened path, or the resolved page path.
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    shouldHavePath(path) {
        cy.location('pathname').should('eq', path || this.currentPath || this.getPath());
        return this;
    }

    /**
     * Asserts that the document title exactly equals the given title.
     * @param {string} title - The expected document title.
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    shouldHaveTitle(title) {
        cy.title().should('eq', title);
        return this;
    }

    /**
     * Asserts that the document title contains the given text.
     * @param {string} text - The substring expected in the document title.
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    shouldContainTitle(text) {
        cy.title().should('include', text);
        return this;
    }

    /**
     * Asserts that the current URL contains a query parameter, optionally with a specific value.
     * @param {string} name - The query parameter name.
     * @param {any} [value] - Optional expected value of the query parameter.
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    shouldHaveQueryParam(name, value) {
        cy.location('search').should((search) => {
            const params = new URLSearchParams(search);
            expect(params.has(name), `query param "${name}"`).to.be.true;
            if (value !== undefined) {
                expect(params.get(name), `query param "${name}"`).to.eq(String(value));
            }
        });
        return this;
    }
}

module.exports = BasicPage;
