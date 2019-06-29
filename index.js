const authentication = require("./authentication");
const IssueResource = require("./resources/issue");

const appendAccessToken = (request, z, bundle) => {
    if (bundle.authData.gogs_access_token) {
        request.headers.Authorization = `token ${
            bundle.authData.gogs_access_token
        }`;
    }
    return request;
};

// We can roll up all our behaviors in an App.
const App = {
    // This is just shorthand to reference the installed dependencies you have. Zapier will
    // need to know these before we can upload
    version: require("./package.json").version,
    platformVersion: require("zapier-platform-core").version,

    authentication: authentication,

    // beforeRequest & afterResponse are optional hooks into the provided HTTP client
    beforeRequest: [appendAccessToken],

    afterResponse: [],

    // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
    resources: {
        [IssueResource.key]: IssueResource,
    },

    // If you want your trigger to show up, you better include it here!
    triggers: {},

    // If you want your searches to show up, you better include it here!
    searches: {},

    // If you want your creates to show up, you better include it here!
    creates: {},
};

// Finally, export the app.
module.exports = App;
