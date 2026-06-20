const BasicPage = require('../base/BasicPage');
const Label = require('../../components/base/Label');
const Link = require('../../components/base/Link');

/**
 * Page object for the self-test app second page (test-app/public/second.html).
 */
class SecondPage extends BasicPage {
    constructor() {
        super('/second.html');
        this.title = new Label('title', '#second-title');
        this.homeLink = new Link('homeLink', '#home-link');
        this.addComponent(this.title).addComponent(this.homeLink);
    }
}

module.exports = new SecondPage();
