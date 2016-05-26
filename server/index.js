/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';

import Koa from 'koa';
// import assert from './assert';
// import middleware from './middleware';
// import auth from './auth';
// import api from './api';

import Router from 'koa-router';
import User from './models/user';
import convert from 'koa-convert';

const app = new Koa();

app.keys = ['robu-secret'];
app.proxy = true;

const router = new Router({ prefix:'/api' });
router
    .get('/users', async ctx =>{console.log(1); ctx.body = await User.find({})});
app.use(convert(router.routes()));
app.use(convert(router.allowedMethods()));

//assert(app);
//auth(app);
//api(app);

export default app;