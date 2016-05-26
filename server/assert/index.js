/**
 * Created by lizhenzhi on 2016/5/26.
 */
'use strict';

import convert from 'koa-convert';
import serve from 'koa-static';
import mount from 'koa-mount';
import spa  from 'koa-spa';
import path  from 'path';
import config from '../../config';

export default function assert(app) {
    app.use(convert(mount('/images', serve(config.asserts.images))));
    app.use(convert(mount('/scripts', serve(config.asserts.scripts))));
    app.use(convert(mount('/bower_components', serve(config.asserts.bower_components))));
    app.use(convert(mount('/views', serve(config.asserts.views))));
    app.use(convert(mount('/styles', serve(config.asserts.styles))));
    app.use(convert(mount('/fonts', serve(config.asserts.fonts))));
    app.use(convert(spa(path.join(config.root, 'client'), {
        index: 'index.html'
        , static: {
            gzip: true
        }
    })));
}