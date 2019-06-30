import { getApiUrl } from '../utils';

const appendIssueUrl = (bundle, input) => {
    const noTrailingSlash = bundle.authData.gogsUrl.replace(/\/$/, '');

    return {
        ...input,
        issue_url: `${noTrailingSlash}/${bundle.inputDataRaw.repository}/issues/${input.id}`,
    };
};

// get a single issue
const getIssue = async (z, bundle) => {
    const {
        authData: { gogsUrl },
        inputData: { id },
        inputDataRaw: { repository },
    } = bundle;

    const response = await z.request({
        url: getApiUrl(gogsUrl, `repos/${repository}/issues/${id}`),
    });

    return appendIssueUrl(bundle, response.json);
};

// get a list of issues
const listIssues = async (z, bundle) => {
    const {
        authData: { gogsUrl },
        inputData: { repository },
    } = bundle;

    const response = await z.request({
        url: getApiUrl(gogsUrl, `repos/${repository}/issues`),
    });

    const result = response.json.map(item => appendIssueUrl(bundle, item));

    return result;
};

// create a issue
const createIssue = async (z, bundle) => {
    z.console.log(bundle);
    const {
        authData: { gogsUrl },
        inputData: { repository, title, body },
    } = bundle;

    const response = await z.request({
        method: 'POST',
        url: getApiUrl(gogsUrl, `repos/${repository}/issues`),
        body: {
            title,
            body,
        },
    });

    return z.JSON.parse(response.content);
};

const issue = {
    key: 'issue',
    noun: 'Issue',

    get: {
        display: {
            label: 'Get Issue',
            description: 'Gets a issue from repository.',
            hidden: true,
        },
        operation: {
            inputFields: [
                {
                    key: 'repository',
                    dynamic: 'repository',
                    required: true,
                },
                { key: 'id', required: true },
            ],
            perform: getIssue,
        },
    },

    list: {
        display: {
            label: 'View Issues',
            description: 'Lists the issues.',
        },
        operation: {
            inputFields: [
                {
                    key: 'repository',
                    dynamic: 'repositoryList.full_name.full_name',
                },
            ],
            perform: listIssues,
        },
    },

    create: {
        display: {
            label: 'Create Issue',
            description: 'Creates a new issue.',
        },
        operation: {
            inputFields: [
                {
                    key: 'repository',
                    dynamic: 'repositoryList.full_name.full_name',
                    required: true,
                },
                { key: 'title', required: true },
                { key: 'body', required: true },
            ],
            perform: createIssue,
        },
    },

    sample: {
        id: 1,
        state: 'open',
        title: 'Test',
        body: 'Issue content',
        user: {
            id: 1,
            username: 'zapier',
        },
        asignee: null,
        created_at: '2016-03-05T14:56:48-05:00',
    },

    outputFields: [
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Title' },
    ],
};

export default issue;
