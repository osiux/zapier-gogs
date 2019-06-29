// get a single issue
const getIssue = (z, bundle) => {
    const responsePromise = z.request({
        url: `https://jsonplaceholder.typicode.com/posts/${
            bundle.inputData.id
        }`,
    });
    return responsePromise.then(response => z.JSON.parse(response.content));
};

// get a list of issues
const listIssues = z => {
    const responsePromise = z.request({
        url: "https://jsonplaceholder.typicode.com/posts",
        params: {
            order_by: "id desc",
        },
    });
    return responsePromise.then(response => z.JSON.parse(response.content));
};

// find a particular issue by name
const searchIssues = (z, bundle) => {
    const responsePromise = z.request({
        url: "https://jsonplaceholder.typicode.com/posts",
        params: {
            query: `name:${bundle.inputData.name}`,
        },
    });
    return responsePromise.then(response => z.JSON.parse(response.content));
};

// create a issue
const createIssue = (z, bundle) => {
    const responsePromise = z.request({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        body: {
            name: bundle.inputData.name, // json by default
        },
    });
    return responsePromise.then(response => z.JSON.parse(response.content));
};

module.exports = {
    key: "issue",
    noun: "Issue",

    get: {
        display: {
            label: "Get Issue",
            description: "Gets a issue from repository.",
        },
        operation: {
            inputFields: [{ key: "id", required: true }],
            perform: getIssue,
        },
    },

    list: {
        display: {
            label: "New Issue",
            description: "Lists the issues.",
        },
        operation: {
            perform: listIssues,
        },
    },

    search: {
        display: {
            label: "Find Issue",
            description: "Finds a issue by searching.",
        },
        operation: {
            inputFields: [{ key: "name", required: true }],
            perform: searchIssues,
        },
    },

    create: {
        display: {
            label: "Create Issue",
            description: "Creates a new issue.",
        },
        operation: {
            inputFields: [{ key: "name", required: true }],
            perform: createIssue,
        },
    },

    sample: {
        id: 1,
        name: "Test",
    },

    outputFields: [{ key: "id", label: "ID" }, { key: "name", label: "Name" }],
};
