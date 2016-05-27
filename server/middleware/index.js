/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import session from "koa-session2";
import config from "../../config"

export default function middleware() {
    return compose([
        logger(),
        helmet(),
        cors(),
        bodyParser(),
        session({
            key: config.secret,   //default "koa:sess"
        }),
    ]);
}