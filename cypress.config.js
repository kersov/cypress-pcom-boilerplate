/**
 * Cypress configuration file defining E2E testing setup
 * @module cypress.config
 *
 * This configuration file sets up various aspects of the test environment including:
 * - Environment variables management
 * - Viewport settings
 * - Test timeouts
 * - URL configurations
 * - Plugin integrations
 *
 * For more information about Cypress configuration options, visit:
 * https://on.cypress.io/configuration
 */

const { defineConfig } = require('cypress');
const grep = require('@cypress/grep/src/plugin');
const { getSiteConfig } = require('./cypress/support/utils/siteConfigUtils');
const { setViewPort } = require('./cypress/support/utils/deviceUtils');

module.exports = defineConfig({
    e2e: {
        /**
         * Configuration for E2E testing setup
         * @param {Function} on - Cypress event handler
         * @param {Object} config - Initial configuration object
         */
        setupNodeEvents(on, config) {
            // Load site-specific configurations including base URL and timeouts
            const siteConfig = getSiteConfig(config);
            // Initialize the grep plugin for test filtering
            grep(config);
            // Set viewport settings based on device type from environment variables
            setViewPort(config);
            // Merge and return the combined configuration
            return { ...config, ...siteConfig };
        },
    },
});