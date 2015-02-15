(function (angular) {

    var app = angular.module('app', ['ngResource','ngRoute']);

    app.config( function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        // Tell angular that when directed to root, route to our main partial
        // app.js then gets this and returns the right page.
        $routeProvider
            .when('/',{ templateUrl: '/partials/main/main', controller: 'mainCtrl'})
            .when('/admin/users', {templateUrl: '/partials/admin/user-list', controller: 'mvUserListCtrl'});
    });

}(window.angular));