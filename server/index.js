/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';

import Koa from 'koa';
import assert from './assert';
import middleware from './middleware';
import auth from './auth';
import api from './api';

const app = new Koa();

app.keys = ['robu-secret'];
assert(app);
middleware(app);
auth(app);
api(app);

app.use(ctx => ctx.status = 404);

export default app;