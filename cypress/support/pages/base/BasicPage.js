/**
 * Represents a basic webpage that can have components added to it.
 */
class BasicPage {
    /**
     * Creates an instance of BasicPage.
     * @param {string} path - The URL path for the page.
     */
    constructor(path) {
        this.path = path;
        this.components = new Map();
    }

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
     * Gets a component by its ID.
     * @param {string} id - The ID of the component to retrieve.
     * @return {object|undefined} Returns the component if found, or undefined if not.
     */
    getComponentById(id) {
        return this.components.get(id);
    }

    /**
     * Opens the page in the browser.
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    open() {
        cy.visit(this.path);
        return this;
    }

    /**
     * Verifies that the current URL includes the page's path.
     * @return {BasicPage} Returns the instance of BasicPage for method chaining.
     */
    verifyPageIsOpened() {
        cy.url().should('include', this.path);
        return this;
    }
}

module.exports = BasicPage;
