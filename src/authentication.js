import { getApiUrl } from './utils';

const testAuth = async (z, bundle) => {
    const response = await z.request({
        url: getApiUrl(bundle.authData.gogsUrl, 'user'),
    });

    if (response.status !== 200) {
        throw new Error('Error authenticating with Gogs.');
    }

    return response.json;
};

const authentication = {
    type: 'custom',
    test: testAuth,
    fields: [
        {
            key: 'gogsUrl',
            type: 'string',
            required: true,
            helpText: 'Your Gogs installation URL.',
        },
        {
            key: 'gogsAccessToken',
            type: 'string',
            required: true,
            helpText: 'Create one in Your Settings > Applications',
        },
        {
            key: 'username',
            type: 'string',
            required: false,
            computed: true,
        },
    ],
    connectionLabel: '{{username}}',
};

export default authentication;
