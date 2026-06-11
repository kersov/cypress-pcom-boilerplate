const BasicPage = require('../base/BasicPage');
const BasicComponent = require('../../components/base/BasicComponent');
const Button = require('../../components/base/Button');
const Checkbox = require('../../components/base/Checkbox');
const Form = require('../../components/base/Form');
const Group = require('../../components/base/Group');
const Image = require('../../components/base/Image');
const Input = require('../../components/base/Input');
const Label = require('../../components/base/Label');
const Link = require('../../components/base/Link');
const List = require('../../components/base/List');
const ListItem = require('../../components/base/ListItem');
const Modal = require('../../components/base/Modal');
const MultiSelect = require('../../components/base/MultiSelect');
const Radio = require('../../components/base/Radio');
const Select = require('../../components/base/Select');
const TextArea = require('../../components/base/TextArea');

class TodoItems extends Group(ListItem) {}

/**
 * Page object for the self-test app home page (test-app/public/index.html).
 * Exposes one component per supported base class so the self-tests can verify
 * every universal method against a real DOM.
 */
class TestAppPage extends BasicPage {
    constructor() {
        super('/');

        this.title = new Label('title', '#page-title');
        this.envBanner = new Label('envBanner', '#env-banner');
        this.message = new BasicComponent('message', '#message');
        this.messageByCallback = new BasicComponent('messageByCallback', () => cy.get('#message'));
        this.emptyElement = new BasicComponent('emptyElement', '#empty-element');
        this.missingElement = new BasicComponent('missingElement', '#does-not-exist');

        this.actionButton = new Button('actionButton', '#action-btn');
        this.clickCount = new Label('clickCount', '#click-count');
        this.lastEvent = new Label('lastEvent', '#last-event');
        this.disabledButton = new Button('disabledButton', '#disabled-btn');
        this.disabledButtonResult = new Label('disabledButtonResult', '#disabled-btn-result');
        this.delayedButton = new Button('delayedButton', '#delayed-btn');
        this.delayedResult = new Label('delayedResult', '#delayed-result');
        this.cookieBanner = new BasicComponent('cookieBanner', '#cookie-banner');
        this.cookieButton = new Button('cookieButton', { text: 'Accept Cookies' });
        this.hoverBox = new BasicComponent('hoverBox', '#hover-box');

        this.keyInput = new Input('keyInput', '#key-input');
        this.lastKey = new Label('lastKey', '#last-key');
        this.focusInput = new Input('focusInput', '#focus-input');

        this.form = new Form('form', '#test-form');
        this.formResult = new Label('formResult', '#form-result');
        this.nameInput = new Input('nameInput', '#name-input');
        this.emailInput = new Input('emailInput', '#email-input');
        this.readonlyInput = new Input('readonlyInput', '#readonly-input');
        this.termsCheckbox = new Checkbox('termsCheckbox', '#terms-checkbox');
        this.colorRadios = new Radio('colorRadios', '.color-radio');
        this.greenRadio = new Radio('greenRadio', '#radio-green');
        this.countrySelect = new Select('countrySelect', '#country-select');
        this.fruitsSelect = new MultiSelect('fruitsSelect', '#fruits-select');
        this.commentTextArea = new TextArea('commentTextArea', '#comment-textarea');

        this.todoList = new List('todoList', '#todo-list');
        this.todoItems = new TodoItems('todoItems', '#todo-list .item');

        this.internalLink = new Link('internalLink', '#internal-link');
        this.externalLink = new Link('externalLink', '#external-link');
        this.blankLink = new Link('blankLink', '#blank-link');

        this.logoImage = new Image('logoImage', '#logo-img');

        this.openModalButton = new Button('openModalButton', '#open-modal-btn');
        this.modal = new Modal('modal', '#modal');
        this.closeModalButton = new Button('closeModalButton', '#close-modal-btn');

        this.bottomMarker = new BasicComponent('bottomMarker', '#bottom-marker');

        Object.values(this).forEach((value) => {
            if (value && typeof value.uid === 'string' && typeof value.get === 'function') {
                this.addComponent(value);
            }
        });
    }
}

module.exports = new TestAppPage();
