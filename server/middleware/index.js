/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';

import convert from 'koa-convert';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import session from "koa-session2";

export default function middleware(app) {
    app.use(convert(logger()));
    app.use(convert(helmet()));
    app.use(convert(cors()));
    app.use(convert(bodyParser()));
    app.use(session({
        key: "robu-log",   //default "koa:sess"
    }));
}