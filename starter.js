/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';

require("babel-core/register")({
    "presets": [
        "es2015",
        "stage-0"
    ]
});
require("babel-polyfill");

require('./app.js');