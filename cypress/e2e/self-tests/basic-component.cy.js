const page = require('../../support/pages/testapp/TestAppPage');

describe('BasicComponent', { tags: '@self' }, () => {
    beforeEach(() => {
        page.open();
    });

    describe('element resolution', () => {
        it('resolves by selector', () => {
            page.message.shouldBeVisible();
        });

        it('resolves by text', () => {
            page.cookieButton.shouldBeVisible();
        });

        it('resolves by callback', () => {
            page.messageByCallback.shouldHaveText('Welcome to the test app');
        });
    });

    describe('click actions', () => {
        it('click() triggers a click event', () => {
            page.actionButton.click();
            page.clickCount.shouldHaveText('1');
            page.lastEvent.shouldHaveText('click');
        });

        it('doubleClick() triggers a dblclick event', () => {
            page.actionButton.doubleClick();
            page.lastEvent.shouldHaveText('dblclick');
        });

        it('rightClick() triggers a contextmenu event', () => {
            page.actionButton.rightClick();
            page.lastEvent.shouldHaveText('contextmenu');
        });

        it('clickIfVisible() clicks a selector-based element once it appears', () => {
            page.delayedResult.shouldHaveText('pending');
            page.delayedButton.clickIfVisible(4000);
            page.delayedResult.shouldHaveText('clicked');
        });

        it('clickIfVisible() clicks a text-based element', () => {
            page.cookieButton.clickIfVisible(2000);
            page.cookieBanner.shouldNotBeVisible();
        });

        it('clickIfVisible() does not fail when the element never appears', () => {
            page.missingElement.clickIfVisible(1000);
            page.title.shouldBeVisible();
        });
    });

    describe('keyboard actions', () => {
        it('type() types text into an element', () => {
            page.keyInput.type('hello');
            page.keyInput.shouldHaveValue('hello');
        });

        it('pressEnter() presses the Enter key', () => {
            page.keyInput.pressEnter();
            page.lastKey.shouldHaveText('Enter');
        });

        it('pressSpace() presses the Space key', () => {
            page.keyInput.pressSpace();
            page.lastKey.shouldHaveText('Space');
        });

        it('pressUpArrow() and pressDownArrow() press arrow keys', () => {
            page.keyInput.pressUpArrow();
            page.lastKey.shouldHaveText('ArrowUp');
            page.keyInput.pressDownArrow();
            page.lastKey.shouldHaveText('ArrowDown');
        });
    });

    describe('focus and scrolling', () => {
        it('focus() and blur() move focus, with focus assertions', () => {
            page.focusInput.focus().shouldBeFocused();
            page.focusInput.blur().shouldNotBeFocused();
        });

        it('scrollIntoView() scrolls the element into view', () => {
            page.bottomMarker.scrollIntoView().shouldBeVisible();
        });
    });

    describe('trigger and then', () => {
        it('trigger() fires a DOM event', () => {
            page.hoverBox.trigger('mouseover');
            page.hoverBox.shouldHaveText('hovered');
        });

        it('then() yields the element to a callback', () => {
            page.message.then(($el) => {
                expect($el.attr('data-role')).to.eq('greeting');
            });
        });
    });

    describe('assertions', () => {
        it('should() and and() forward chainer assertions', () => {
            page.message.should('be.visible');
            page.message.and('have.attr', 'data-role', 'greeting');
        });

        it('visibility and existence assertions', () => {
            page.message.shouldBeVisible().shouldExist();
            page.modal.shouldNotBeVisible();
            page.missingElement.shouldNotExist();
        });

        it('emptiness assertions', () => {
            page.emptyElement.shouldBeEmpty();
            page.message.shouldNotBeEmpty();
        });

        it('text assertions', () => {
            page.title.shouldHaveText('PCOM Test App');
            page.title.shouldNotHaveText('Wrong title');
            page.message.shouldContainText('test app');
            page.message.shouldNotContainText('nonsense');
        });

        it('attribute assertions', () => {
            page.message.shouldHaveAttribute('data-role', 'greeting');
            page.message.shouldHaveAttribute('data-role');
            page.message.shouldNotHaveAttribute('data-missing');
        });

        it('class assertions', () => {
            page.message.shouldHaveClass('info');
            page.message.shouldNotHaveClass('warning');
        });

        it('selector matching assertions', () => {
            page.message.shouldMatchSelector('p.info');
            page.message.shouldNotMatchSelector('div');
        });

        it('shouldHaveCount() asserts the number of matched elements', () => {
            page.todoItems.shouldHaveCount(3);
        });

        it('shouldHaveCss() asserts a CSS property value', () => {
            page.message.shouldHaveCss('color', 'rgb(0, 128, 0)');
            page.message.shouldHaveCss('color');
        });
    });
});
