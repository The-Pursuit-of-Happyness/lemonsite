'use strict';

module.exports = appInfo => {
    const config = {};

    config.debug = true;

    config.label = '';

    config.logger = {
        dir: 'logs',
        consoleLevel: 'DEBUG',
    };

    config.cors = {
        origin: 'http://localhost:3000',
        credentials: true,
    }

    config.mongoose = {
        url: 'mongodb://localhost:27017/admin',
    };

    config.security = {
        csrf: {
            enable: false,
        }
    };

    config.appView = {
        devServer: 'http://localhost:3000/'
    }


    return config;
};
