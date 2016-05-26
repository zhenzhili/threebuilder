/**
 * Created by lizhenzhi on 2016/5/25.
 */
'use strict';
angular.module('robu', [
    'ui.router',
    'ngResource',
    'angular-loading-bar',
    'LocalStorageModule',
    'ngAnimate'
])
.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider){
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
            url: '^/',
            templateUrl: '/views/home.html',
            controller: 'homeCtrl',
            data: {
                title: 'Robu 首页',
                ctrl: 'home'
            },
            resolve: {
                authorized: ['Authorize', function(Authorize){
                    return Authorize.isAuthorized();
                }]
            }
        });

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push('HttpInterceptor');
}])
.run(['$rootScope', '$window', '$http', 'Authorize', 'localStorageService', function($rootScope, $window, $http, Authorize, localStorageService){
    var user = Authorize.getUser();
    if(!user){
        $window.location.replace('/signin.html');
        return;
    }
    $rootScope.common = $rootScope.common || {
            active: {},
            user: user,
            logout: function(){
                localStorageService.remove('token');
                localStorageService.remove('user');
                $window.location.replace('/signin.html');
            },
            clearDatabase: function(){
                var self = this;
                $http.post('/debug/cleardatabase').then(function(){
                    self.logout();
                });
            }
        };

    /* jshint unused: false */
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $rootScope.common.title = toState.data.title;

        $rootScope.common.active = {};
        $rootScope.common.active[toState.data.ctrl] = 'active';
    });

    /* jshit unused: false */
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
        event.preventDefault();
        if(error.authorized === false){
            $window.location.replace('/signin.html');
        }
    });
}]);