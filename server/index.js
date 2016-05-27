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

app.proxy = true;

app.use(assert());
app.use(auth());
app.use(api());
app.use(middleware());

export default app;