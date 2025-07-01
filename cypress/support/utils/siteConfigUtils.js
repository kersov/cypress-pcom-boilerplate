const { getBaseURL } = require('./urlUtils');

/**
 * Retrieves and configures site-specific settings based on environment variables.
 *
 * This function sets up configuration properties by reading from Cypress environment
 * variables, providing default values where necessary. It returns an object containing:
 * - Base URL for the site (generated using urlUtils)
 * - Default command timeout
 * - Page load timeout
 * - Retry configurations for both run and open modes
 *
 * @param {Object} config - The Cypress configuration object
 * @returns {Object} An object containing site-specific configurations
 * 
 * @example
 * // Example usage in cypress.config.js:
 * module.exports = defineConfig({
 *   e2e: {
 *     setupNodeEvents(on, config) {
 *       const siteConfig = getSiteConfig(config);
 *       return siteConfig;
 *     },
 *   },
 * });
 */
function getSiteConfig(config) {
    config.env.site = config.env.site || 'main';
    config.env.env = config.env.env || 'dev';
    config.env.locale = config.env.locale || 'default';
    config.env.retries = config.env.retries || 0;
    config.env.loadTimeout = config.env.loadTimeout || 60000;
    config.env.commandTimeout = config.env.commandTimeout || 4000;
    return {
        baseUrl: getBaseURL(config),
        defaultCommandTimeout: config.env.commandTimeout,
        pageLoadTimeout: config.env.loadTimeout,
        retries: {
            runMode: config.env.retries,
            openMode: config.env.retries,
        }
    };
}

module.exports = { getSiteConfig };