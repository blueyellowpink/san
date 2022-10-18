module.exports = {
    apps: [
        {
            name: 'dev::cainance-account',
            script: 'npx cross-env NODE_ENV=dev babel-node --extensions ".ts" index.ts',
        },
    ],
    deploy: {
        dev: {
            user: 'fedora',
            host: 'dev.howlcity.io',
            key: '~/.ssh/hwl-dev',
            ref: 'origin/dev',
            repo: ' git@gitlab.com:k2827/account-service.git',
            path: '/home/fedora/cainance/dev/account-service',
            'post-deploy':
                'export PM2_HOME=~/.pm2 && yarn && pm2 startOrRestart ecosystem.config.js --only dev::cainance-account',
        },
    },
};
