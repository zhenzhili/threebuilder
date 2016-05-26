/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';

import app from './server';
import {
    connectDatabase,
    registerLocalClient,
    registerAdminUser,
} from './server/db';

import config from './config';

const port = process.env.PORT || 3000;

(async() => {
    try {
        const info = await connectDatabase(config.mongo.url);
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    } catch (error) {
        console.error('Unable to connect to database');
    }

    try {
        await registerLocalClient();
        await registerAdminUser();
        await app.listen(config.app.port);
        console.log(`Server started on port ${config.app.port}`);
    } catch (error) {
        console.log(error);
    }
})();