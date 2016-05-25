/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';

import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: validate({
            validator: 'isEmail',
            message: 'is not valid',
        }),
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
        },
    },
});

userSchema.virtual('confirm_password')
    .set(function setConfirmPassword(value) { this._confirm_password = value; })
    .get(function getConfirmPassword() { return this._confirm_password; });

userSchema.pre('validate', function preValidate(next) {
    if (!this.password) {
        this.invalidate('password', 'is required');
    } else if (this.password.length < 6) {
        this.invalidate('password', 'must be at least 5 characters');
    } else if (this.password !== this.confirm_password) {
        this.invalidate('password', 'doesn\'t match the confirmation password');
    }

    next();
});

export default mongoose.model('User', userSchema);