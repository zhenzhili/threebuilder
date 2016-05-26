/**
 * Created by lizhenzhi on 2016/5/26.
 */
'use strict';

import convert from 'koa-convert';
import staticCache  from 'koa-static-cache';
import path  from 'path';
import fs  from 'fs';
import config from '../../config';

export default function assert(app) {
    app.use(convert(staticCache("./client", {}, {})));
    app.use(convert(staticCache(path.join(config.root, 'client'))));

    app.use((ctx,next)=>{
        if(ctx.path=="/"){
            ctx.body = fs.createReadStream(path.join(config.root, 'client/index.html'));
            ctx.type = 'html';
        }
        next();
    });
}