/**
 * Created by lizhenzhi on 2016/5/26.
 */
'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';
import send  from 'koa-send';
import staticCache  from 'koa-static-cache';
import path  from 'path';
import config from '../../config';

export default function assert(app) {
    return compose([
        convert(staticCache(path.join(config.root, 'client'),{gzip:true,maxAge: 365 * 24 * 60 * 60})),
        async function (ctx, next){
            if ('/' == ctx.path){
                await send(ctx, './client/index.html');
            }
            await next();
        }
    ]);

    // app.use(convert(staticCache(path.join(config.root, 'client'),{gzip:true,maxAge: 365 * 24 * 60 * 60})));
    //
    // app.use(async function (ctx, next){
    //     if ('/' == ctx.path){
    //         await send(ctx, './client/index.html');
    //     }
    //     next();
    // });
}