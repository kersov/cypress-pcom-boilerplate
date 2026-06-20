const page = require('../../support/pages/testapp/TestAppPage');
const secondPage = require('../../support/pages/testapp/SecondPage');

describe('BasicPage', { tags: '@self' }, () => {
    it('open() and URL/title assertions', () => {
        const env = String(Cypress.env('env'));
        page.open()
            .verifyPageIsOpened()
            .shouldHavePath('/')
            .shouldHaveTitle(`PCOM Test App (${env.toUpperCase()})`)
            .shouldContainTitle('PCOM Test App');
    });

    it('serves the environment-specific version of the app', () => {
        const env = String(Cypress.env('env'));
        page.open();
        page.envBanner.shouldHaveText(env.toUpperCase());
        page.envBanner.shouldHaveAttribute('data-env', env);
    });

    it('open() forwards visit options, shouldHaveQueryParam() checks the query', () => {
        page.open({ qs: { foo: 'bar' } })
            .shouldHaveQueryParam('foo', 'bar')
            .shouldHaveQueryParam('foo');
    });

    it('reload() keeps the page open', () => {
        page.open().reload().verifyPageIsOpened();
        page.title.shouldBeVisible();
    });

    it('goBack() and goForward() navigate the history', () => {
        page.open();
        page.internalLink.click();
        secondPage.shouldHavePath();
        page.goBack().shouldHavePath('/');
        page.goForward();
        secondPage.shouldHavePath();
    });

    it('scrollToBottom() and scrollToTop() scroll the window', () => {
        page.open().scrollToBottom();
        cy.window().its('scrollY').should('be.greaterThan', 0);
        page.scrollToTop();
        cy.window().its('scrollY').should('eq', 0);
    });

    it('component registry exposes components by uid', () => {
        expect(page.hasComponent('actionButton')).to.be.true;
        expect(page.getComponent('actionButton')).to.eq(page.actionButton);
        expect(page.hasComponent('nonexistent')).to.be.false;
    });
});
