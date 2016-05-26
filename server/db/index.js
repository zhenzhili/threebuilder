/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';

import mongoose from 'mongoose';
import Client from '..//models/client';
import User from '../models/user';

export function connectDatabase(uri) {
    return new Promise((resolve, reject) => {
        mongoose.connection
            .on('error', error => reject(error))
            .on('close', () => console.log('Database connection closed.'))
            .once('open', () => resolve(mongoose.connections[0]));
        mongoose.connect(uri);
    });
};

const localClient = {
    name: 'local',
    id: 'local',
    secret: 'local',
};
export async function registerLocalClient() {
    return new Promise((resolve, reject) => {
        (async () => {
            try {
                const client = await Client.findOne({ id: localClient.id });
                if (!client) {
                    await Client.create({
                        name: localClient.name,
                        id: localClient.id,
                        secret: localClient.secret,
                        trusted: true,
                    });
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        })();
    });
};

const adminUser = {
    name: 'admin',
    email: 'lzz19870915@126.com',
    password: 'robuadmin',
};
export async function registerAdminUser() {
    return new Promise((resolve, reject) => {
        (async () => {
            try {
                const user = await User.findOne({ email: adminUser.email });
                if (!user) {
                    await User.create({
                        name: adminUser.name,
                        email: adminUser.email,
                        password: adminUser.password,
                        confirm_password: adminUser.password,
                        admin: true,
                    });
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        })();
    });
};