/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';

import oauth2orize from 'oauth2orize-koa';
import Client from '../../models/client';
import User from '../../models/user';
import AccessToken from '../../models/access-token';
import { isClientAuthenticated } from '../../auth';

const server = oauth2orize.createServer();

server.serializeClient(client => client._id);
server.deserializeClient(async id => await Client.findById(id));

server.exchange(
    oauth2orize.exchange.password(async (client, email, password) => {
        if (!client.trusted) return false;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) return false;

        await AccessToken.findOneAndRemove({ user: user._id });

        const accessToken = await AccessToken.create({
            user: user._id,
            client: client._id,
        });

        return accessToken;
    }));

export default (router) => {
    router
        .post('/auth', isClientAuthenticated(),
            async (ctx, next) => {
                ctx.state.user = ctx.passport.user;
                await next();
            },
            server.token(),
            server.errorHandler());
};