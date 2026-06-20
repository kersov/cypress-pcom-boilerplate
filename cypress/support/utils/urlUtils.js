const { getEnvVariable } = require('./envUtils');

/**
 * Resolves the base URL for the current site/env/locale from environment variables.
 *
 * URLs are defined exclusively via environment variables (cypress.env.json,
 * CYPRESS_* system variables, or --env CLI args) using the hierarchical lookup:
 * `env.site.locale.url` → `env.site.url` → `env.url` → `url`.
 * Credentials for basic auth, if needed, belong in the URL itself
 * (e.g. "https://user:password@host").
 *
 * @param {Object} config - Cypress configuration object
 * @returns {string} The base URL for testing
 * @throws {Error} When no URL is configured for the given site/env/locale.
 */
function getBaseURL(config) {
    const site = config.env.site;
    const env = config.env.env;
    const locale = config.env.locale;
    const url = getEnvVariable({config, variable: 'url', env, site, locale});
    if (!url) {
        throw new Error(
            `No base URL configured for site="${site}", env="${env}", locale="${locale}". ` +
            `Define a "url" environment variable, e.g. "${env}.${site}.url" in cypress.env.json, ` +
            'a CYPRESS_ system variable, or --env url=...'
        );
    }
    return url;
}

module.exports = { getBaseURL };
