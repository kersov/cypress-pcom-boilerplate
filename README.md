# Cypress PCOM Boilerplate

## Overview
This repository serves as a foundational Cypress boilerplate project designed to streamline the process of writing end-to-end (E2E) tests. By leveraging the Page Component Object Model (PCOM), this boilerplate provides a structured and scalable approach to test automation.

## Key Features
- **Cross-Environment Testing**: Easily configure and run tests across multiple environments.
- **Cross-Device Testing**: Support for testing on various devices to ensure responsiveness and compatibility.
- **Multi-Language Applications**: Built-in support for testing applications with multiple languages.
- **Test Tagging**: Organize and execute tests efficiently using tags.

## Getting Started
To get started with this boilerplate, clone the repository and follow the setup instructions provided in the documentation.

## Base Components

The boilerplate provides a set of reusable base component classes to model and interact with UI elements in a structured way:

- **BasicComponent**: The foundational class for all components. Handles selectors, text, callback-based selection, nested components, and basic actions like click, doubleClick, rightClick, focus, blur, hover, scrollIntoView, and keyboard events. Supports assertions for visibility, existence, emptiness, text, attributes, and classes.
- **InteractiveComponent**: Extends BasicComponent. Adds methods for enabling/disabling components and assertions for enabled/disabled state and value.
- **TypeableComponent**: Extends InteractiveComponent. Adds methods for typing, clearing, and value/length assertions—ideal for inputs and text areas.
- **Input**: Extends TypeableComponent. Adds methods for checking/unchecking/toggling checkboxes, asserting input types, and checking checked state.
- **Button**: Extends InteractiveComponent. Represents button elements. Supports all basic and interactive actions.
- **Checkbox**: Extends Input. Represents checkbox inputs (inherits all Input methods, plus check/uncheck/toggle convenience).
- **Select**: Extends Input. Adds methods for selecting options and asserting available options in dropdowns.
- **TextArea**: Extends TypeableComponent. Represents multi-line text input areas.

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
