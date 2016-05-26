/**
 * Created by lizhenzhi on 2016/5/26.
 */
'use strict';
angular.module('robu')
    .factory('HttpInterceptor', ['$q', '$window', 'localStorageService', function($q, $window, localStorageService){
        return {
            request: function(config){
                config.headers = config.headers || {};
                var token = localStorageService.get('token');
                if(token){
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            responseError: function(response){
                if(response.status === 401 || response.status === 403) {
                    $window.location.replace('/signin.html');
                }
                return $q.reject(response);
            }
        };
    }]);