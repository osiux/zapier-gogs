module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    node: '6',
                },
            },
        ],
    ],
    plugins: ['@babel/plugin-transform-regenerator', 'add-module-exports'],
};
