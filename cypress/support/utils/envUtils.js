/**
 * Retrieves Cypress environment variable by checking in the following order:
 * 1. env.site.locale.variable
 * 2. env.site.variable
 * 3. env.variable
 * 4. variable
 *
 * @param {Object} params - Configuration object containing:
 * @param {string} params.variable - Name of the environment variable to retrieve
 * @param {string} params.env - Environment name/identifier
 * @param {string} params.site - Site name/identifier for scoped variables
 * @param {string} params.locale - Locale/region identifier for further scoping
 * @param {Object} [params.config] - Optional Cypress configuration object
 * @returns {string|undefined} The first found environment variable value that matches in the order of precedence
 */
function getEnvVariable({config, variable, env, site, locale}) {
    const keys = [
        // 1. env.site.locale.variable
        `${env}.${site}.${locale}.${variable}`,
        // 2. env.site.variable
        `${env}.${site}.${variable}`,
        // 3. env.variable
        `${env}.${variable}`,
        // 4. variable
        variable
    ];

    for (const key of keys) {
        const value = config ? config.env[key] : Cypress.env(key);
        if (value !== undefined) {
            return value;
        }
    }

    // If none found, return undefined
    return config ? config.env[variable] : Cypress.env(variable); // Explicitly check the flat variable last
}

module.exports = { getEnvVariable };