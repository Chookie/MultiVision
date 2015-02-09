(function (angular) {

    var app = angular.module('app');

    var navBarLoginCtrl = function($scope, $http, mvIdentity, mvNotifier) {
        $scope.identity = mvIdentity;
        $scope.signin = function (username, password) {
            $http.post('/login', {username:username, password:password}).then( function (response) {
                if(response.data.success){
                    mvIdentity.currentUser = response.data.user;
                    mvNotifier.notify("You have successfully signed in!")
                } else {
                    mvNotifier.notify("Username/Password combination incorrect")
                }
            });
        };
    };

    app.controller("navBarLoginCtrl", ["$scope","$http", "mvIdentity","mvNotifier", navBarLoginCtrl]);

}(window.angular));