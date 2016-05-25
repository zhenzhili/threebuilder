/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';

import passport from 'koa-passport';
import compose from 'koa-compose';
import User from '../models/user';

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => {
    (async () => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    })();
});

export default function auth() {
    return compose([
        passport.initialize(),
        passport.session(),
    ]);
}