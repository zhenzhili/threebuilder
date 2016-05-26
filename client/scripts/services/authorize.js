/**
 * Created by lizhenzhi on 2016/5/26.
 */
'use strict';

angular.module('robu')
    .factory('Authorize', ['$q', 'localStorageService', function($q, localStorageService){
        return {
            getUser: function(){
                return localStorageService.get('user');
            },
            getToken: function(){
                return localStorageService.get('token');
            },
            isAuthorized: function(){
                var deferred = $q.defer();
                var user = exports.getUser();
                var token = exports.getToken();

                if(user && token){
                    deferred.resolve({
                        authorized: true
                    });
                }else{
                    deferred.reject({
                        authorized: false
                    });
                }
                return deferred.promise;
            }
        };
    }]);