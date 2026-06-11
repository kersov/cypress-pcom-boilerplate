const page = require('../../support/pages/testapp/TestAppPage');

describe('Interactive, typeable and form components', { tags: '@self' }, () => {
    beforeEach(() => {
        page.open();
    });

    describe('InteractiveComponent', () => {
        it('shouldBeEnabled() and shouldBeDisabled()', () => {
            page.actionButton.shouldBeEnabled();
            page.disabledButton.shouldBeDisabled();
        });

        it('enable() makes a disabled element clickable', () => {
            page.disabledButton.enable().shouldBeEnabled();
            page.disabledButton.click();
            page.disabledButtonResult.shouldHaveText('clicked');
        });

        it('disable() disables an enabled element', () => {
            page.actionButton.disable().shouldBeDisabled();
        });

        it('value assertions', () => {
            page.readonlyInput.shouldHaveValue('locked');
            page.readonlyInput.shouldNotHaveValue('open');
        });
    });

    describe('TypeableComponent', () => {
        it('clear() empties the input', () => {
            page.nameInput.type('Alex').shouldHaveValue('Alex');
            page.nameInput.clear().shouldHaveValue('');
        });

        it('length constraint assertions', () => {
            page.nameInput.shouldHaveMinLength(2);
            page.nameInput.shouldHaveMaxLength(10);
        });

        it('readonly and required assertions', () => {
            page.readonlyInput.shouldBeReadonly();
            page.nameInput.shouldBeRequired();
        });
    });

    describe('Input', () => {
        it('shouldAcceptType() asserts the type attribute', () => {
            page.emailInput.shouldAcceptType('email');
        });

        it('addLabel() defaults to the label[for] selector', () => {
            const label = page.nameInput.addLabel();
            label.shouldHaveText('Your name');
            expect(page.nameInput.getLabel()).to.eq(label);
        });
    });

    describe('Checkbox and Radio', () => {
        it('check(), uncheck() and checked assertions', () => {
            page.termsCheckbox.shouldNotBeChecked();
            page.termsCheckbox.check().shouldBeChecked();
            page.termsCheckbox.uncheck().shouldNotBeChecked();
        });

        it('toggle() flips the checkbox state', () => {
            page.termsCheckbox.toggle().shouldBeChecked();
            page.termsCheckbox.toggle().shouldNotBeChecked();
        });

        it('check(value) checks the radio with the given value', () => {
            page.colorRadios.check('green');
            page.greenRadio.shouldBeChecked();
        });
    });

    describe('Select and MultiSelect', () => {
        it('selectOption() selects by value', () => {
            page.countrySelect.selectOption('US').shouldHaveValue('US');
        });

        it('shouldHaveOption() finds an option by text', () => {
            page.countrySelect.shouldHaveOption('Ukraine');
        });

        it('selectOptions() selects multiple values', () => {
            page.fruitsSelect.selectOptions(['apple', 'cherry']);
            page.fruitsSelect.shouldHaveSelectedValues(['apple', 'cherry']);
            page.fruitsSelect.shouldIncludeSelectedValue('apple');
        });

        it('deselectAll() clears the selection', () => {
            page.fruitsSelect.selectOptions(['banana']);
            page.fruitsSelect.deselectAll();
            page.fruitsSelect.shouldHaveSelectedValues([]);
        });
    });

    describe('TextArea and Form', () => {
        it('textarea supports type and clear', () => {
            page.commentTextArea.type('A comment').shouldHaveValue('A comment');
            page.commentTextArea.clear().shouldHaveValue('');
        });

        it('submit() submits the form', () => {
            page.formResult.shouldHaveText('not submitted');
            page.form.submit();
            page.formResult.shouldHaveText('submitted');
        });
    });
});
