(function (angular) {

    var app = angular.module('app');

    var navBarLoginCtrl = function($scope, $http) {
        $scope.signin = function (username, password) {
            $http.post('/login', {username:username, password:password}).then( function (response) {
                if(response.data.success){
                    console.log('Logged in!');
                } else {
                    console.log('failed to log in!');
                }
            });
        };
    };

    app.controller("navBarLoginCtrl", ["$scope","$http", navBarLoginCtrl]);

}(window.angular));