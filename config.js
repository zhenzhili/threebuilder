var path = require('path')
    , _ = require('lodash')

    , root = __dirname

    , domain = 'http://www.robu-tech.com'
    , domainTest = 'http://localhost:3000'
    , secret = 'robusecret'

    ;

var baseConfig = {
    secret: secret
    , env: process.env.NODE_ENV
    , root: root
    , asserts: {
        images: path.join(root, 'client/images')
        , scripts: path.join(root, 'client/scripts')
        , bower_components: path.join(root, 'client/bower_components')
        , views: path.join(root, 'client/views')
        , fonts: path.join(root, 'client/fonts')
    }
};

var envConfig = {
    development: {
        domain: domainTest
        , app: {
            port: 3000
        }
        , asserts: {
            styles: path.join(root, 'client/.tmp/styles')
        }
        , minifier: {
            collapseWhitespace: false
            , removeComments: false
        }
        , mongo: {
            url: 'mongodb://localhost:27017/log'
        }
    }
    , production: {
        app: {
            port: process.env.PORT || 3000
            , cacheTime: 7 * 24 * 60 * 60 * 1000 /* default caching time (7 days) for static files, calculated in milliseconds */
        }
        , asserts: {
            styles: path.join(root, 'client/styles')
        }
        , minifier: {
            collapseWhitespace: true
            , removeComments: true
        }
        , mongo: {
            url: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || ('mongodb://localhost:27017/robu')
        }
    }
};

// override the base configuration with the platform specific values
module.exports = _.merge(baseConfig, envConfig[baseConfig.env || (baseConfig.env = 'development')]);