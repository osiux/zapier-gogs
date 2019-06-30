import { getApiUrl } from '../utils';

const fetchRepositories = async (z, bundle) => {
    const response = await z.request({
        url: getApiUrl(bundle.authData.gogsUrl, 'user/repos'),
    });

    return z.JSON.parse(response.content);
};

const repository = {
    key: 'repository',
    noun: 'Repository',

    list: {
        display: {
            label: 'Repositories',
            description:
                'List of repositories available to authenticated user.',
            hidden: true,
        },
        operation: {
            perform: fetchRepositories,
        },
    },

    outputFields: [
        { key: 'id', label: 'ID' },
        { key: 'full_name', label: 'full_name' },
    ],
};

export default repository;
