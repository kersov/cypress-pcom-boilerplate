const { getEnvVariable } = require('./envUtils');

/**
 * Generates the base URL for testing based on environment variables and configurations.
 * 
 * The function constructs the URL by checking various environment variable combinations
 * in a specific order of precedence. For sandbox environments, it directly retrieves
 * the URL from the environment variables without credentials handling.
 *
 * @param {Object} config - Cypress configuration object
 * @returns {string} The generated base URL for testing
 */
function getBaseURL(config) {
    const site = config.env.site;
    const env = config.env.env;
    const locale = config.env.locale;
    if (env === 'sandbox') {
        return getEnvVariable({config, variable: 'url', env, site, locale});
    }
    const username = getEnvVariable({config, variable: 'username', env, site, locale});
    const password = getEnvVariable({config, variable: 'password', env, site, locale});
    const urlMask = {
      main: {
        dev: `https://${username}:${password}@example.cypress.io`,
        stg: `https://${username}:${password}@example.cypress.io`,
        prod: `https://example.cypress.io`
      }
    };
    return urlMask[site][env];
}

module.exports = { getBaseURL };