/**
 * Created by lizhenzhi on 2016/5/27.
 */
angular.module('localstorage-mock', [])
    .value('localStorageService', {
        get: function(item) {
            if (item === 'user') {
                return {
                    "createdAt": "2014-07-01T15:20:19.319Z",
                    "name": "我是,皮卡丘",
                    "_id": "53b2d1b3fe19d1782e51bb80"
                };
            } else if (item === 'token') {
                return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1M2IyZDFiM2ZlMTlkMTc4MmU1MWJiODAiLCJuYW1lIjoi562J5aazLOWcqOmbqOS4rSIsImF2YXRhciI6Imh0dHA6Ly9xLnFsb2dvLmNuL3FxYXBwLzEwMTEzNTQ3OS82RTQyODMxNDhFODBENTVBOUMyNTMwQ0VFQTFCOUZFOC8xMDAiLCJpYXQiOjE0MDQyMjgwMTl9.nxpYSJiU81-vEiYUlHNzBot6hqR9F8fc_dVWPbpvIiA';
            }
        }
    });