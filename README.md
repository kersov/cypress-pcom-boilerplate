# Cypress PCOM Boilerplate

## Overview
This repository serves as a foundational Cypress boilerplate project designed to streamline the process of writing end-to-end (E2E) tests. By leveraging the Page Component Object Model (PCOM), this boilerplate provides a structured and scalable approach to test automation.

## Key Features
- **Cross-Environment Testing**: Easily configure and run tests across multiple environments.
- **Cross-Device Testing**: Support for testing on various devices to ensure responsiveness and compatibility.
- **Multi-Language Applications**: Built-in support for testing applications with multiple languages.
- **Test Tagging**: Organize and execute tests efficiently using tags.

## Getting Started

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
    -   `fixtures/`: (Create as needed) Test data (e.g., JSON files) used in your tests.
    -   `support/`: Reusable PCOM setup and utilities.
        -   `components/`: Base and custom UI component classes.
            -   `base/`: The core set of generic component classes provided by this boilerplate.
            -   `custom/`: (Create this directory for your project-specific components that extend base components).
        -   `pages/`: Page Object classes.
            -   `base/`: Contains `BasicPage`, the base class for all Page Objects.
        -   `utils/`: Utility functions (environment variables, URLs, devices, site config).
        -   `e2e.js`: Main support file, loaded before each spec file. Registers `@cypress/grep`, `cypress-wait-until`, and loads `pages.js`.
        -   `pages.js`: Central registration for Page Objects (loads `components.js`).
        -   `components.js`: Central registration for globally accessible components.
-   `cypress.config.js`: Cypress configuration file.
-   `package.json`: Project metadata, dependencies, and npm scripts.

### Writing Tests

1.  **Create Page Objects**:
    *   For each page in your application, create a corresponding Page Object class in `cypress/support/pages/*/`, extending `BasicPage`.
    *   In each Page Object, instantiate the components present on that page using the base components or your custom components.

2.  **Define Components**:
    *   Use the base components from `cypress/support/components/base/` directly or extend them to create custom components in `cypress/support/components/*/` for more specific UI elements.
    *   A component encapsulates interactions with a specific part of the UI (e.g., a navigation bar, a search form).

3.  **Write Spec Files**:
    *   Create your test files (e.g., `login.cy.js`) in the `cypress/e2e/` directory.
    *   Use your Page Objects and use their methods and components to interact with your application.

### Running Tests

You can run tests using the npm scripts defined in `package.json`. These scripts follow the pattern `npm run test:e2e:<env>:<site>:<locale>:<device>`.

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

# Run a single spec file
npx cypress run --env site=main,env=dev,locale=default,mode=desktop --spec cypress/e2e/login.cy.js

# Open the interactive Cypress runner
npx cypress open --env site=main,env=dev,locale=default,mode=desktop
```

Refer to the `scripts` section in `package.json` for all currently configured test execution commands. You can customize or add new scripts to suit your project's needs.

### Test Tagging

The boilerplate registers [@cypress/grep](https://github.com/cypress-io/cypress/tree/develop/npm/grep), so you can tag tests and run subsets of your suite.

Tag a test (or suite) via the `tags` config option:

```js
it('logs in successfully', { tags: '@smoke' }, () => {
    // ...
});

describe('checkout', { tags: ['@regression', '@checkout'] }, () => {
    // ...
});
```

Run only matching tests by passing grep variables alongside the usual ones:

```bash
# Run tests tagged @smoke
npx cypress run --env site=main,env=dev,locale=default,mode=desktop,grepTags=@smoke

# Run tests whose title contains "login"
npx cypress run --env site=main,env=dev,locale=default,mode=desktop,grep=login
```

### Adding a New Site or Environment

Base URLs are resolved in `cypress/support/utils/urlUtils.js` via the `urlMask` object, keyed by site and then environment:

```js
const urlMask = {
  main: {
    dev: `https://${username}:${password}@example.cypress.io`,
    stg: `https://${username}:${password}@example.cypress.io`,
    prod: `https://example.cypress.io`
  }
};
```

To target your own application, edit this map: add an entry for each site you test and each environment within it. The `username`/`password` interpolation supports environments behind HTTP basic auth — remove it for environments that don't need it. The `sandbox` environment is special: it skips the mask entirely and reads the base URL straight from the `url` environment variable (see below), which is handy for local or ad-hoc deployments:

```bash
npx cypress run --env env=sandbox,url=http://localhost:8080
```

### Page Component Object Model (PCOM)

PCOM is a design pattern that encourages the creation of reusable and maintainable test code. It involves breaking down web pages into components, and then creating objects that represent these components. This boilerplate provides base component classes (see "Base Components" section below) that you can extend to create your own custom components.

**Key ideas:**
-   **Pages:** Represent entire pages in your application (e.g., LoginPage, HomePage). They are responsible for providing access to the components on that page.
-   **Components:** Represent individual UI elements or groups of elements (e.g., a login form, a navigation menu, a button). They encapsulate the logic for interacting with those elements.

This structure helps to:
-   **Reduce code duplication:** Common UI elements can be defined once and reused across multiple tests.
-   **Improve maintainability:** If the UI changes, you only need to update the corresponding component object, rather than every test that interacts with that element.
-   **Increase readability:** Tests become easier to understand as they interact with higher-level abstractions (page and component objects) rather than raw selectors.

## Environment Variables

This project utilizes several environment variables to configure test runs, manage credentials, and define target environments. These variables can be set via system environment variables (e.g., `CYPRESS_variable=value`), in a `cypress.env.json` file, or passed via command-line arguments (`--env variable=value`).

**Note on casing:** the variable names are case-sensitive and lowercase/camelCase (`site`, `env`, `loadTimeout`, ...), matching how they are read in `cypress/support/utils/`. When using system environment variables, keep the part after the `CYPRESS_` prefix in the same case (e.g., `CYPRESS_site=clientA`, `CYPRESS_loadTimeout=100000`).

The `envUtils.js` utility allows for a hierarchical lookup for some variables (like `url`, `username`, `password`), meaning you can define general variables and override them with more specific ones using a pattern like `env.site.locale.variable` (e.g., `dev.main.en.username`). Lookup order, most specific first:

1. `env.site.locale.variable` (e.g., `dev.main.en.username`)
2. `env.site.variable` (e.g., `dev.main.username`)
3. `env.variable` (e.g., `dev.username`)
4. `variable` (e.g., `username`)

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
-   `sandbox.url`: The base URL used when running with `env=sandbox` (resolved through the hierarchical lookup described above).

Variables defined in `cypress.env.json` can be accessed in your tests using `Cypress.env('variable')`. For example, `Cypress.env('username')` would return `"user"`.

### Commonly Used Environment Variables

Below is a list of commonly used environment variables (which can also be set in `cypress.env.json` as shown above):

*   **`site`**:
    *   **Description**: Specifies the target site configuration. This allows different setups or base URLs for various application versions (e.g., 'main', 'clientXSite'). Must have a corresponding entry in `urlMask` (see "Adding a New Site or Environment").
    *   **Default**: `'main'` (as set in `siteConfigUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_site=clientA` or via CLI: `--env site=clientA`

*   **`env`**:
    *   **Description**: Defines the testing environment (e.g., 'dev', 'stg', 'prod', 'sandbox'). This directs tests to the correct deployment and applies environment-specific settings.
    *   **Default**: `'dev'` (as set in `siteConfigUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_env=stg` or via CLI: `--env env=stg`

*   **`locale`**:
    *   **Description**: Specifies the locale or language for tests (e.g., 'en-US', 'es-MX', 'default'). Essential for applications with internationalization.
    *   **Default**: `'default'` (as set in `siteConfigUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_locale=fr-CA` or in `cypress.env.json`: `{ "locale": "fr-CA" }`

*   **`mode`**:
    *   **Description**: Defines the device mode or viewport for testing: 'mobile' (360×800), 'tablet' (768×1024), or 'desktop' (1920×1080). Used by the test execution scripts in `package.json`; tests can branch on it via `isMobile()`/`isTablet()`/`isDesktop()` from `deviceUtils.js`.
    *   **Default**: `'desktop'` (as set in `deviceUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_mode=tablet` or via CLI in scripts: `--env mode=tablet`

*   **`url`**:
    *   **Description**: The explicit base URL for the application under test. Used when `env` is 'sandbox'. Can also be defined with higher precedence using the `env.site.locale.url` pattern (e.g., `dev.main.en.url`).
    *   **Example**: `CYPRESS_url=http://localhost:8080` or in `cypress.env.json`: `{ "dev.mysite.url": "https://dev.mysite.com" }`

*   **`username`**:
    *   **Description**: Username for HTTP basic authentication. Used by `urlUtils.js` to construct URLs for environments requiring authentication. Can be scoped by `env`, `site`, and `locale`.
    *   **Example**: `CYPRESS_username=testUser` or in `cypress.env.json`: `{ "dev.main.en.username": "user123" }`

*   **`password`**:
    *   **Description**: Password for HTTP basic authentication. Used similarly to `username` by `urlUtils.js` and can also be scoped.
    *   **Example**: `CYPRESS_password=securePassword123` or in `cypress.env.json`: `{ "dev.main.en.password": "Password!" }`

*   **`retries`**:
    *   **Description**: Sets the number of times Cypress will retry failed tests. This applies globally for both `runMode` (headless) and `openMode` (interactive).
    *   **Default**: `0` (as set in `siteConfigUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_retries=1` or in `cypress.env.json`: `{ "retries": 1 }`

*   **`loadTimeout`**:
    *   **Description**: The time (in milliseconds) Cypress waits for a page to fire its `load` event before timing out.
    *   **Default**: `60000` (60 seconds, as set in `siteConfigUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_loadTimeout=100000` or in `cypress.env.json`: `{ "loadTimeout": 100000 }`

*   **`commandTimeout`**:
    *   **Description**: The default time (in milliseconds) Cypress waits for most commands (e.g., `cy.get()`, `cy.click()`) to complete before timing out.
    *   **Default**: `4000` (4 seconds, as set in `siteConfigUtils.js` if not otherwise provided).
    *   **Example**: `CYPRESS_commandTimeout=8000` or in `cypress.env.json`: `{ "commandTimeout": 8000 }`

## Base Components

The boilerplate provides a set of reusable base component classes to model and interact with UI elements in a structured way. These components are located in `cypress/support/components/base/`.

### Inheritance Tree

```
BasicComponent
├── Image, Label, Link, List, ListItem, Modal
└── InteractiveComponent
    ├── Button, Form
    └── TypeableComponent
        ├── TextArea
        └── Input
            ├── Checkbox, Radio
            └── Select
                └── MultiSelect

Group — a mixin, not a class (see "Group Mixin" below)
```

### Constructing Components

Every component takes a unique id and a locator:

```js
new Button('loginButton', '#login');                          // selector string
new Button('loginButton', { text: 'Log in' });                // located via cy.contains()
new Button('loginButton', () => cy.get('form').find('button')); // callback returning a chainable
```

When more than one locator is provided in an options object (`{selector, text, callback}`), resolution priority is: callback → selector → text.

All action and assertion methods return the component instance, so calls can be chained. Components can also contain other components via `addNestedComponent()` / `getNestedComponents()`.

### Component Reference

-   **`BasicComponent`**:
    *   **Purpose**: The foundational class for all components. It handles element selection (selector, text, or callback), nested components, and basic UI actions.
    *   **Key Methods**: `click()`, `clickIfVisible()`, `doubleClick()`, `rightClick()`, `focus()`, `blur()`, `scrollIntoView()`, `scrollTo()`, `type()`, `pressEnter()`, `pressSpace()`, `pressUpArrow()`, `pressDownArrow()`, `invoke()`, `trigger()`.
    *   **Key Assertions**: `should()`, `and()`, `shouldBeVisible()`, `shouldNotBeVisible()`, `shouldExist()`, `shouldNotExist()`, `shouldBeEmpty()`, `shouldHaveText()`, `shouldContainText()`, `shouldHaveAttribute()`, `shouldHaveClass()`, `shouldMatchSelector()` (each with a `Not` counterpart).
    *   **Example**:
        ```javascript
        const BasicComponent = require('./cypress/support/components/base/BasicComponent');
        const pageTitle = new BasicComponent('pageTitle', 'h1.main-title');

        pageTitle.shouldBeVisible();
        pageTitle.shouldHaveText('Welcome');
        ```

-   **`InteractiveComponent`**:
    *   **Purpose**: Extends `BasicComponent`. It's designed for elements that users can interact with, adding enable/disable handling and value assertions.
    *   **Key Methods**: `enable()`, `disable()`. Inherits others.
    *   **Key Assertions**: `shouldBeEnabled()`, `shouldBeDisabled()`, `shouldHaveValue()`, `shouldNotHaveValue()`.
    *   **Example**:
        ```javascript
        const InteractiveComponent = require('./cypress/support/components/base/InteractiveComponent');
        const submitButton = new InteractiveComponent('submitButton', '#submit-form');

        submitButton.shouldBeEnabled();
        submitButton.click();
        ```

-   **`TypeableComponent`**:
    *   **Purpose**: Extends `InteractiveComponent`. This component is for elements that accept text input, like input fields and text areas.
    *   **Key Methods**: `clear()`. Inherits `type()` and others.
    *   **Key Assertions**: `shouldHaveMinLength()`, `shouldHaveMaxLength()`, `shouldBeReadonly()`, `shouldBeRequired()`. Inherits `shouldHaveValue()` and others.
    *   **Example**:
        ```javascript
        const TypeableComponent = require('./cypress/support/components/base/TypeableComponent');
        const searchBar = new TypeableComponent('searchBar', 'input[type="search"]');

        searchBar.type('Cypress tests');
        searchBar.shouldHaveValue('Cypress tests');
        searchBar.clear().shouldBeEmpty();
        ```

-   **`Input`**:
    *   **Purpose**: Extends `TypeableComponent`. Specifically designed for HTML `<input>` elements. It adds specialized methods for checkboxes and radio buttons, input type assertions, and label association.
    *   **Key Methods**: `check()`, `uncheck()`, `toggle()`, `addLabel()`, `getLabel()`. Inherits others.
    *   **Key Assertions**: `shouldBeChecked()`, `shouldNotBeChecked()`, `shouldAcceptType()`. Inherits others.
    *   **Example**:
        ```javascript
        const Input = require('./cypress/support/components/base/Input');
        const emailInput = new Input('emailInput', '#email');
        const termsCheckbox = new Input('termsCheckbox', '#terms-and-conditions');

        emailInput.type('test@example.com').shouldHaveValue('test@example.com');
        emailInput.shouldAcceptType('email');

        termsCheckbox.check().shouldBeChecked();
        termsCheckbox.uncheck().shouldNotBeChecked();
        ```

-   **`Button`**:
    *   **Purpose**: Extends `InteractiveComponent`. Represents clickable button elements.
    *   **Key Methods / Assertions**: Inherits all from `InteractiveComponent` (e.g., `click()`, `shouldBeEnabled()`).
    *   **Example**:
        ```javascript
        const Button = require('./cypress/support/components/base/Button');
        const loginButton = new Button('loginButton', 'button#login');

        loginButton.shouldBeVisible().shouldBeEnabled();
        loginButton.click();
        ```

-   **`Form`**:
    *   **Purpose**: Extends `InteractiveComponent`. Represents a `<form>` element.
    *   **Key Methods**: `submit()`. Inherits others.

-   **`Checkbox`** / **`Radio`**:
    *   **Purpose**: Extend `Input`. Semantic classes for checkbox and radio inputs, inheriting all `Input` methods.
    *   **Example**:
        ```javascript
        const Checkbox = require('./cypress/support/components/base/Checkbox');
        const newsletterCheckbox = new Checkbox('newsletterCheckbox', '#subscribe-newsletter');

        newsletterCheckbox.check().shouldBeChecked();
        newsletterCheckbox.uncheck().shouldNotBeChecked();
        ```

-   **`Select`**:
    *   **Purpose**: Extends `Input`. Designed for `<select>` dropdown elements.
    *   **Key Methods**: `selectOption(value)`. Inherits others.
    *   **Key Assertions**: `shouldHaveOption(text)`. Inherits others.
    *   **Example**:
        ```javascript
        const Select = require('./cypress/support/components/base/Select');
        const countryDropdown = new Select('countryDropdown', '#country-select');

        countryDropdown.selectOption('US');
        countryDropdown.shouldHaveOption('United States');
        ```

-   **`MultiSelect`**:
    *   **Purpose**: Extends `Select`. For `<select multiple>` elements.
    *   **Key Methods**: `selectOptions(values)`, `deselectAll()`. Inherits others.
    *   **Key Assertions**: `shouldHaveSelectedValues()`, `shouldIncludeSelectedValue()`. Inherits others.

-   **`TextArea`**:
    *   **Purpose**: Extends `TypeableComponent`. Represents multi-line text input areas (`<textarea>`).
    *   **Key Methods / Assertions**: Inherits all from `TypeableComponent` (e.g., `type()`, `clear()`, `shouldHaveValue()`).
    *   **Example**:
        ```javascript
        const TextArea = require('./cypress/support/components/base/TextArea');
        const commentBox = new TextArea('commentBox', '#comment');

        commentBox.type('This is a test comment.');
        commentBox.shouldHaveValue('This is a test comment.');
        ```

-   **`Link`**:
    *   **Purpose**: Extends `BasicComponent`. Represents anchor elements.
    *   **Key Methods**: `visitURL()`, `openInNewTab()`.
    *   **Key Assertions**: `shouldHaveHref()`, `shouldNotHaveHref()`, `shouldBeExternalLink()`, `shouldBeInternalLink()`.

-   **`Image`**, **`Label`**, **`List`**, **`ListItem`**, **`Modal`**:
    *   **Purpose**: Semantic subclasses of `BasicComponent` for the corresponding HTML elements. They inherit all `BasicComponent` behavior and serve as extension points for custom components.

### Group Mixin

`Group` (`cypress/support/components/base/Group.js`) is a **mixin function**, not a class. Apply it to any component class to manage a collection of matching elements with group-level operations such as `filter()`, `not()`, `eq()`, `first()`, `last()`, `contains()`, and `find()`:

```js
const Group = require('./cypress/support/components/base/Group');
const ListItem = require('./cypress/support/components/base/ListItem');

class TodoItems extends Group(ListItem) {}

const items = new TodoItems('todoItems', '.todo-list li');
items.first().shouldContainText('Pay electric bill');
```

## Base Page

Page Objects extend `BasicPage` (`cypress/support/pages/base/BasicPage.js`), which provides:

-   `open()` — visits the page's `path` (relative to the configured `baseUrl`).
-   `verifyPageIsOpened()` — asserts the current URL includes the page's `path`.
-   `addComponent(component)` — registers a component (and its nested components) on the page.
-   `getComponentById(uid)` — retrieves a registered component.

```js
const BasicPage = require('../base/BasicPage');
const Button = require('../../components/base/Button');

class LoginPage extends BasicPage {
    constructor(path) {
        super(path);
        this.loginButton = new Button('loginButton', '#login');
        this.addComponent(this.loginButton);
    }
}

module.exports = LoginPage;
```

## Registering Pages and Components

The support file chain is `e2e.js` → `pages.js` → `components.js`. Register shared component instances in `components.js` and page instances in `pages.js`, attaching them to the global `Cypress` object so specs can access them anywhere:

**`cypress/support/components.js`**
```js
const Button = require('./components/base/Button');

Cypress.components = {};
Cypress.components.loginButton = new Button('loginButton', '#login');
```

**`cypress/support/pages.js`**
```js
require('./components.js');

const LoginPage = require('./pages/custom/LoginPage');

Cypress.pages = {};
Cypress.pages.loginPage = new LoginPage('/login');
```

**Usage in a spec:**
```js
describe('login', () => {
    it('logs in successfully', { tags: '@smoke' }, () => {
        const page = Cypress.pages.loginPage;
        page.open().verifyPageIsOpened();
        page.loginButton.shouldBeVisible().click();
    });
});
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or enhancements.

## License
This project is licensed under the terms of the LICENSE file included in this repository.
