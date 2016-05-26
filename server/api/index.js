/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';
import convert from 'koa-convert';
import Router from 'koa-router';
import importDir from 'import-dir';
import users from './routes/users'
import User from '../models/user';

//const routes = importDir('./routes');

export default function api(app) {
    const router = new Router({ prefix:'/api' });

    router
        .get('/users', async ctx =>{console.log(1); ctx.body = await User.find({})});

    //Object.keys(routes).forEach(name => routes[name](router));

    app.use(convert(router.routes()));
    app.use(convert(router.allowedMethods()));
}