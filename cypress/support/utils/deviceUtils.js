/**
 * Utilities for managing device emulation and viewport configurations in Cypress tests
 * @module deviceUtils
 */

/**
 * Sets the viewport dimensions based on the configured mode (desktop, tablet, or mobile)
 * 
 * The function reads the 'mode' environment variable to determine the device type.
 * If no mode is specified, it defaults to desktop. It then sets appropriate
 * viewport dimensions in the config object for consistent cross-device testing.
 *
 * @param {Object} config - Cypress configuration object that will be modified
 * 
 * @example
 * // Example usage in cypress.config.js:
 * module.exports = defineConfig({
 *   e2e: {
 *     setupNodeEvents(on, config) {
 *       setViewPort(config);
 *       return config;
 *     },
 *   },
 * });
 */
function setViewPort(config) {
    // Set default value for mode if not provided
    config.env.mode = config.env.mode || 'desktop';
    const mode = config.env.mode;

    // Set viewport size based on mode
    if (mode === 'mobile') {
        config.viewportWidth = 360; // iPhone 6/7/8 width
        config.viewportHeight = 800; // iPhone 6/7/8 height
    } else if (mode === 'tablet') {
        config.viewportWidth = 768; // iPad width
        config.viewportHeight = 1024; // iPad height
    } else {
        config.viewportWidth = 1920; // Default desktop width
        config.viewportHeight = 1080;  // Default desktop height
    }
};

/**
 * Checks if the current test environment is configured as mobile
 *
 * @returns {boolean} True if mode is set to 'mobile', false otherwise
 */
function isMobile() {
    return Cypress.env('mode') === 'mobile';
}

/**
 * Checks if the current test environment is configured as tablet
 *
 * @returns {boolean} True if mode is set to 'tablet', false otherwise
 */
function isTablet() {
    return Cypress.env('mode') === 'tablet';
}

/**
 * Checks if the current test environment is configured as desktop
 *
 * @returns {boolean} True if mode is set to 'desktop', false otherwise
 */
function isDesktop() {
    return Cypress.env('mode') === 'desktop';
}

module.exports = { setViewPort, isMobile, isTablet, isDesktop};