const authentication = {
    type: 'custom',
    test: {
        url: '{{bundle.authData.gogs_url}}/user',
    },
    fields: [
        {
            key: 'gogs_url',
            type: 'string',
            required: true,
            helpText: 'Your Gogs installation URL.',
        },
        {
            key: 'gogs_access_token',
            type: 'string',
            required: true,
            helpText: 'Create one in Your Settings > Applications',
        },
        {
            key: 'gogs_username',
            type: 'string',
            computed: true,
        },
    ],
    connectionLabel: '{{bundle.authData.gogs_username}}',
};

export default authentication;
