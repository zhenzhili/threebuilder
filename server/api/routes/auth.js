/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';

import { token } from '../../auth/oauth2';

export default (router) => {
    router
        .post('/auth', token());
};