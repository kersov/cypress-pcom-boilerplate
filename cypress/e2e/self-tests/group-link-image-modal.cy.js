const page = require('../../support/pages/testapp/TestAppPage');
const secondPage = require('../../support/pages/testapp/SecondPage');

describe('Group mixin, Link, Image and Modal', { tags: '@self' }, () => {
    beforeEach(() => {
        page.open();
    });

    describe('Group', () => {
        it('first(), last() and eq() pick single elements', () => {
            page.todoItems.first().shouldContainText('Buy milk');
            page.todoItems.last().shouldContainText('Walk the dog');
            page.todoItems.eq(1).shouldContainText('Pay bills');
        });

        it('filter() and not() narrow the group', () => {
            page.todoItems.filter('.done').shouldHaveCount(1);
            page.todoItems.not('.done').shouldHaveCount(2);
        });

        it('contains() finds an element by content', () => {
            page.todoItems.contains('Pay bills').shouldHaveClass('done');
        });

        it('find() locates descendants', () => {
            page.todoItems.find('.badge').shouldHaveCount(3);
        });

        it('each() iterates over all elements', () => {
            const texts = [];
            page.todoItems.each(($el) => {
                texts.push($el.text());
            });
            cy.then(() => {
                expect(texts).to.have.length(3);
                expect(texts[0]).to.contain('Buy milk');
            });
        });
    });

    describe('Link', () => {
        it('href assertions', () => {
            page.internalLink.shouldHaveHref('/second.html');
            page.internalLink.shouldNotHaveHref('/other.html');
        });

        it('external and internal link assertions', () => {
            page.externalLink.shouldBeExternalLink();
            page.internalLink.shouldBeInternalLink();
        });

        it('visitURL() navigates to the link href', () => {
            page.internalLink.visitURL();
            secondPage.shouldHavePath();
        });

        it('removeTarget() makes a target=_blank link open in the same tab', () => {
            page.blankLink.shouldHaveAttribute('target', '_blank');
            page.blankLink.removeTarget().shouldNotHaveAttribute('target');
            page.blankLink.click();
            secondPage.shouldHavePath();
        });
    });

    describe('Image', () => {
        it('source and alt assertions', () => {
            page.logoImage.shouldHaveSource('/logo.png');
            page.logoImage.shouldHaveAlt('PCOM logo');
        });

        it('shouldBeLoaded() verifies the image actually loaded', () => {
            page.logoImage.shouldBeLoaded();
        });
    });

    describe('Modal', () => {
        it('opens and closes', () => {
            page.modal.shouldNotBeVisible();
            page.openModalButton.click();
            page.modal.shouldBeVisible().shouldContainText('Modal content');
            page.closeModalButton.click();
            page.modal.shouldNotBeVisible();
        });
    });
});
