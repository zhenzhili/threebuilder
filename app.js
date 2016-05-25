/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';

'use strict';

import app from './server';
import {
    connectDatabase
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
        await app.listen(port);
        console.log(`Server started on port ${port}`);
    } catch (error) {
        console.log(error);
    }
})();