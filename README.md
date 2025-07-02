# Cypress PCOM Boilerplate

## Overview
This repository serves as a foundational Cypress boilerplate project designed to streamline the process of writing end-to-end (E2E) tests. By leveraging the Page Component Object Model (PCOM), this boilerplate provides a structured and scalable approach to test automation.

## Key Features
- **Cross-Environment Testing**: Easily configure and run tests across multiple environments.
- **Cross-Device Testing**: Support for testing on various devices to ensure responsiveness and compatibility.
- **Multi-Language Applications**: Built-in support for testing applications with multiple languages.
- **Test Tagging**: Organize and execute tests efficiently using tags.

## Getting Started
This section guides you through setting up the project on your local machine.

## How to Install

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kersov/cypress-pcom-boilerplate.git
    cd cypress-pcom-boilerplate
    ```

2.  **Install dependencies:**
    Make sure you have Node.js and npm installed. Then, run the following command in the project root to install the necessary dependencies:
    ```bash
    npm install
    ```

## How to Use

This boilerplate is designed to help you write End-to-End (E2E) tests using Cypress, following the Page Component Object Model (PCOM) for a structured and maintainable test suite.

### Project Structure Overview

Before diving into running tests, it's helpful to understand the basic project structure:

-   `cypress/`: Contains all Cypress-related files.
    -   `e2e/`: Your test files (specs) go here.
    -   `fixtures/`: Test data (e.g., JSON files) used in your tests.
    -   `support/`: Reusable custom commands, PCOM setup, and utilities.
        -   `components/`: Base and custom UI component classes.
            -   `base/`: The core set of generic component classes provided by this boilerplate.
            -   `custom/`: (Create this directory for your project-specific components that extend base components).
        -   `pages/`: Page Object classes.
        -   `utils/`: Utility functions.
        -   `commands.js`: Custom Cypress commands.
        -   `e2e.js`: Main support file, loaded before each spec file.
        -   `pages.js`: Central registration for Page Objects.
        -   `components.js`: Central registration/export for globally accessible components (optional).
-   `cypress.config.js`: Cypress configuration file.
-   `package.json`: Project metadata, dependencies, and npm scripts.

### Writing Tests

1.  **Create Page Objects**:
    *   For each page in your application, create a corresponding Page Object class in `cypress/support/pages/*/`.
    *   In each Page Object, instantiate the components present on that page using the base components or your custom components.

2.  **Define Components**:
    *   Use the base components from `cypress/support/components/base/` directly or extend them to create custom components in `cypress/support/components/*/` for more specific UI elements.
    *   A component encapsulates interactions with a specific part of the UI (e.g., a navigation bar, a search form).

3.  **Write Spec Files**:
    *   Create your test files (e.g., `login.cy.js`) in the `cypress/e2e/` directory.
    *   Use your Page Objects and use their methods and components to interact with your application.

### Running Tests

You can run tests using the npm scripts defined in `package.json`. These scripts often follow a pattern like `npm run test:e2e:<env>:<site>:<locale>:<device>`.

Here are some examples based on the scripts currently available in `package.json`:

```bash
# Run all tests for the 'main' site in the 'dev' environment and 'default' locale, across all defined devices
npm run test:e2e:dev:main:default

# Run tests specifically on mobile for 'main' site, 'dev' environment, 'default' locale
npm run test:e2e:dev:main:default:mobile

# Run tests specifically on tablet for 'main' site, 'dev' environment, 'default' locale
npm run test:e2e:dev:main:default:tablet

# Run tests specifically on desktop for 'main' site, 'dev' environment, 'default' locale
npm run test:e2e:dev:main:default:desktop
```

To run tests with different configurations (e.g., other sites, environments, or locales), you would typically add new scripts to your `package.json` following a similar pattern, or run Cypress directly with specific environment variables. For example:

```bash
# Example of running Cypress directly for a hypothetical 'stg' environment and 'otherSite'
npx cypress run --env site=otherSite,env=stg,locale=en,mode=desktop
```

Refer to the `scripts` section in `package.json` for all currently configured test execution commands. You can customize or add new scripts to suit your project's needs.

### Page Component Object Model (PCOM)

PCOM is a design pattern that encourages the creation of reusable and maintainable test code. It involves breaking down web pages into components, and then creating objects that represent these components. This boilerplate provides base component classes (see "Base Components" section below) that you can extend to create your own custom components.

## Environment Variables

This project utilizes several environment variables to configure test runs, manage credentials, and define target environments. These variables can be set via system environment variables (e.g., `CYPRESS_VARIABLE_NAME=value`), in a `cypress.env.json` file, or passed via command-line arguments (`--env VARIABLE_NAME=value`).

The `envUtils.js` utility allows for a hierarchical lookup for some variables (like `URL`, `USERNAME`, `PASSWORD`), meaning you can define general variables and override them with more specific ones using a pattern like `ENV.SITE.LOCALE.VARIABLE_NAME` (e.g., `dev.main.en.username`).

### Using `cypress.env.json`

A convenient way to manage your environment variables for Cypress is by using a `cypress.env.json` file in the root of your project. Cypress automatically loads variables from this file. This is particularly useful for storing non-sensitive project-specific settings or overriding default configurations.

**Note:** It's crucial **not** to commit sensitive credentials (like actual production usernames and passwords) directly into `cypress.env.json` if the repository is public or shared. For sensitive data, prefer using system environment variables or a secure secrets management solution.

Here's an example of how `cypress.env.json` might look:

```json
{
  "username": "user",
  "password": "password",
  "retries": 2,
  "loadTimeout": 60000,
  "commandTimeout": 4000,
  "sandbox.url": "https://example.cypress.io"
}
```

In this example:
-   `username` and `password`: Could be used for test accounts on a staging or development environment.
-   `retries`: Overrides the default number of retries for failed tests.
-   `loadTimeout`: Customizes the page load timeout.
-   `commandTimeout`: Adjusts the default command timeout.
-   `sandbox.url`: Defines a specific URL for a "sandbox" environment, which could be accessed in tests via `Cypress.env('sandbox.url')`.

Variables defined in `cypress.env.json` can be accessed in your tests using `Cypress.env('VARIABLE_NAME')`. For example, `Cypress.env('username')` would return `"user"`.

### Commonly Used Environment Variables

Below is a list of commonly used environment variables (which can also be set in `cypress.env.json` as shown above):

*   **`SITE`**:
    *   **Description**: Specifies the target site configuration. This allows different setups or base URLs for various application versions (e.g., 'main', 'clientXSite').
    *   **Default**: `'main'` (as set in `siteConfigUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_SITE=clientA` or in `cypress.env.json`: `{ "SITE": "clientA" }`

*   **`ENV`**:
    *   **Description**: Defines the testing environment (e.g., 'dev', 'stg', 'prod', 'sandbox'). This directs tests to the correct deployment and applies environment-specific settings.
    *   **Default**: `'dev'` (as set in `siteConfigUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_ENV=stg` or via CLI: `--env ENV=stg`

*   **`LOCALE`**:
    *   **Description**: Specifies the locale or language for tests (e.g., 'en-US', 'es-MX', 'default'). Essential for applications with internationalization.
    *   **Default**: `'default'` (as set in `siteConfigUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_LOCALE=fr-CA` or in `cypress.env.json`: `{ "LOCALE": "fr-CA" }`

*   **`MODE`**:
    *   **Description**: Defines the device mode or viewport for testing, used to simulate screen sizes like 'mobile', 'tablet', or 'desktop'. This is often used by the test execution scripts in `package.json`.
    *   **Example**: `CYPRESS_MODE=tablet` or via CLI in scripts: `--env mode=tablet`

*   **`URL`**:
    *   **Description**: The explicit base URL for the application under test. Especially used when `ENV` is 'sandbox'. Can also be defined with higher precedence using the `ENV.SITE.LOCALE.url` pattern (e.g., `dev.main.en.url`).
    *   **Example**: `CYPRESS_URL=http://localhost:8080` or in `cypress.env.json`: `{ "dev.mysite.url": "https://dev.mysite.com" }`

*   **`USERNAME`**:
    *   **Description**: Username for basic authentication or application login. Used by `urlUtils.js` to construct URLs for environments requiring authentication. Can be scoped by `ENV`, `SITE`, and `LOCALE`.
    *   **Example**: `CYPRESS_USERNAME=testUser` or in `cypress.env.json`: `{ "dev.main.en.username": "user123" }`

*   **`PASSWORD`**:
    *   **Description**: Password for basic authentication or application login. Used similarly to `USERNAME` by `urlUtils.js` and can also be scoped.
    *   **Example**: `CYPRESS_PASSWORD=securePassword123` or in `cypress.env.json`: `{ "dev.main.en.password": "Password!" }`

*   **`RETRIES`**:
    *   **Description**: Sets the number of times Cypress will retry failed tests. This applies globally for both `runMode` (headless) and `openMode` (interactive).
    *   **Default**: `0` (as set in `siteConfigUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_RETRIES=1` or in `cypress.env.json`: `{ "retries": 1 }`

*   **`LOAD_TIMEOUT`**:
    *   **Description**: The time (in milliseconds) Cypress waits for a page to fire its `load` event before timing out.
    *   **Default**: `60000` (60 seconds, as set in `siteConfigUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_LOAD_TIMEOUT=100000` or in `cypress.env.json`: `{ "loadTimeout": 100000 }`

*   **`COMMAND_TIMEOUT`**:
    *   **Description**: The default time (in milliseconds) Cypress waits for most commands (e.g., `cy.get()`, `cy.click()`) to complete before timing out.
    *   **Default**: `4000` (4 seconds, as set in `siteConfigUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_COMMAND_TIMEOUT=8000` or in `cypress.env.json`: `{ "commandTimeout": 8000 }`

**Key ideas:**
-   **Pages:** Represent entire pages in your application (e.g., LoginPage, HomePage). They are responsible for providing access to the components on that page.
-   **Components:** Represent individual UI elements or groups of elements (e.g., a login form, a navigation menu, a button). They encapsulate the logic for interacting with those elements.

This structure helps to:
-   **Reduce code duplication:** Common UI elements can be defined once and reused across multiple tests.
-   **Improve maintainability:** If the UI changes, you only need to update the corresponding component object, rather than every test that interacts with that element.
-   **Increase readability:** Tests become easier to understand as they interact with higher-level abstractions (page and component objects) rather than raw selectors.

## Base Components

The boilerplate provides a set of reusable base component classes to model and interact with UI elements in a structured way. These components are located in `cypress/support/components/base/`.

Here's a breakdown of each base component:

-   **`BasicComponent`**:
    *   **Purpose**: The foundational class for all components. It handles common functionalities like element selection (using selectors or callback functions), text retrieval, interaction with nested components, and basic UI actions.
    *   **Key Methods**: `click()`, `doubleClick()`, `rightClick()`, `focus()`, `blur()`, `hover()`, `scrollIntoView()`, `pressEnter()`, `pressEscape()`, etc.
    *   **Key Assertions**: `shouldBeVisible()`, `shouldNotExist()`, `shouldBeEmpty()`, `shouldHaveText()`, `shouldHaveAttr()`, `shouldHaveClass()`, etc.
    *   **Example**:
        ```javascript
        const BasicComponent = require('./cypress/support/components/base/BasicComponent');
        const pageTitle = new BasicComponent('pageTitle', 'h1.main-title');

        pageTitle.shouldBeVisible();
        pageTitle.shouldHaveText('Welcome');
        ```

-   **`InteractiveComponent`**:
    *   **Purpose**: Extends `BasicComponent`. It's designed for elements that users can interact with, adding capabilities to check if a component is enabled or disabled.
    *   **Key Methods**: Inherits all from `BasicComponent`.
    *   **Key Assertions**: `shouldBeEnabled()`, `shouldBeDisabled()`, `shouldHaveValue()`.
    *   **Example**:
        ```javascript
        const InteractiveComponent = require('./cypress/support/components/base/InteractiveComponent');
        const submitButton = new InteractiveComponent('submitButton', '#submit-form');

        submitButton.shouldBeEnabled();
        submitButton.click();
        ```

-   **`TypeableComponent`**:
    *   **Purpose**: Extends `InteractiveComponent`. This component is for elements that accept text input, like input fields and text areas. It provides methods for typing, clearing content, and asserting values.
    *   **Key Methods**: `type()`, `clear()`. Inherits others.
    *   **Key Assertions**: `shouldHaveValue()`, `shouldHaveLength()`. Inherits others.
    *   **Example**:
        ```javascript
        const TypeableComponent = require('./cypress/support/components/base/TypeableComponent');
        const searchBar = new TypeableComponent('searchBar', 'input[type="search"]');

        searchBar.type('Cypress tests');
        searchBar.shouldHaveValue('Cypress tests');
        searchBar.clear().shouldBeEmpty();
        ```

-   **`Input`**:
    *   **Purpose**: Extends `TypeableComponent`. Specifically designed for various HTML `<input>` elements. It adds specialized methods for checkboxes and radio buttons, and assertions for input types.
    *   **Key Methods**: `check()`, `uncheck()`, `toggle()`. Inherits others.
    *   **Key Assertions**: `shouldBeChecked()`, `shouldNotBeChecked()`, `shouldHaveType()`. Inherits others.
    *   **Example**:
        ```javascript
        const Input = require('./cypress/support/components/base/Input');
        const emailInput = new Input('emailInput', '#email');
        const termsCheckbox = new Input('termsCheckbox', '#terms-and-conditions');

        emailInput.type('test@example.com').shouldHaveValue('test@example.com');
        emailInput.shouldHaveType('email');

        termsCheckbox.check().shouldBeChecked();
        termsCheckbox.uncheck().shouldNotBeChecked();
        ```

-   **`Button`**:
    *   **Purpose**: Extends `InteractiveComponent`. Represents clickable button elements.
    *   **Key Methods**: Inherits all from `InteractiveComponent` (e.g., `click()`).
    *   **Key Assertions**: Inherits all from `InteractiveComponent` (e.g., `shouldBeEnabled()`).
    *   **Example**:
        ```javascript
        const Button = require('./cypress/support/components/base/Button');
        const loginButton = new Button('loginButton', 'button#login');

        loginButton.shouldBeVisible().shouldBeEnabled();
        loginButton.click();
        ```

-   **`Checkbox`**:
    *   **Purpose**: Extends `Input`. Tailored for checkbox inputs, inheriting all `Input` methods and providing convenience for checkbox-specific interactions.
    *   **Key Methods**: Inherits `check()`, `uncheck()`, `toggle()` from `Input`.
    *   **Key Assertions**: Inherits `shouldBeChecked()`, `shouldNotBeChecked()` from `Input`.
    *   **Example**:
        ```javascript
        const Checkbox = require('./cypress/support/components/base/Checkbox');
        const newsletterCheckbox = new Checkbox('newsletterCheckbox', '#subscribe-newsletter');

        newsletterCheckbox.check().shouldBeChecked();
        newsletterCheckbox.uncheck().shouldNotBeChecked();
        ```

-   **`Select`**:
    *   **Purpose**: Extends `Input`. Designed for `<select>` dropdown elements. It adds methods for selecting options by value or text and asserting available options.
    *   **Key Methods**: `selectOptionByValue()`, `selectOptionByText()`. Inherits others.
    *   **Key Assertions**: `shouldHaveOption()`, `shouldHaveSelectedOption()`. Inherits others.
    *   **Example**:
        ```javascript
        const Select = require('./cypress/support/components/base/Select');
        const countryDropdown = new Select('countryDropdown', '#country-select');

        countryDropdown.selectOptionByValue('US');
        countryDropdown.shouldHaveSelectedOption('United States');
        countryDropdown.shouldHaveOption('Canada');
        ```

-   **`TextArea`**:
    *   **Purpose**: Extends `TypeableComponent`. Represents multi-line text input areas (`<textarea>`).
    *   **Key Methods**: Inherits `type()`, `clear()` from `TypeableComponent`.
    *   **Key Assertions**: Inherits `shouldHaveValue()`, `shouldHaveLength()` from `TypeableComponent`.
    *   **Example**:
        ```javascript
        const TextArea = require('./cypress/support/components/base/TextArea');
        const commentBox = new TextArea('commentBox', '#comment');

        commentBox.type('This is a test comment.');
        commentBox.shouldHaveValue('This is a test comment.');
        ```

### Defining Page Instances and Registering Components

To follow the PCOM pattern, define your page objects and register components for each page:

**Example: `page.js`**
```js
const ToDoPage = require('./toDoPage');

Cypress.pages = {
  toDoPage: new ToDoPage()
};
```

**Example: `components.js`**
```js
const ToDoList = require('./cypress/support/components/cypress/ToDoList');

module.exports = {
  todoList: new ToDoList('todoList', '.todoapp')
  // Add more components as needed
};
```

In your page class (e.g., `toDoPage.js`), you can import and register components from `components.js` for easy access in your tests.

### Usage Examples

```js
// Example: Using Input component
const Input = require('./cypress/components/base/Input');
const usernameInput = new Input('username', '#username');
usernameInput.type('testuser').shouldHaveValue('testuser');

// Example: Using Button component
const Button = require('./cypress/components/base/Button');
const submitButton = new Button('submit', '#submit');
submitButton.click();

// Example: Using Select component
const Select = require('./cypress/components/base/Select');
const countrySelect = new Select('country', '#country');
countrySelect.selectOption('US').shouldHaveOption('United States');
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or enhancements.

## License
This project is licensed under the terms of the LICENSE file included in this repository.
