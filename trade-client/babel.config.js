module.exports = function (api) {
    api.cache(true);

    return {
        presets: ['@babel/preset-typescript', '@babel/preset-env'],
        plugins: [
            [
                'module-resolver',
                {
                    extensions: ['.js', '.ts'],
                    root: ['./src'],
                },
            ],
        ],
    };
};
