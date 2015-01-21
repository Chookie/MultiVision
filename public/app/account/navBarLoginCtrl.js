(function (angular) {

    var app = angular.module('app');

    var navBarLoginCtrl = function($scope) {
        $scope.signin = function (username, password) {
            console.log("I'm not done yet");
        };
    };

    app.controller("navBarLoginCtrl", ["$scope", navBarLoginCtrl]);

}(window.angular));