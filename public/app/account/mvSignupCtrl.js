(function (ngapp) {

    var mvSignupCtrl = function ($scope, mvUser) {
        $scope.signup = function () {
            var newUserData = {
                username: $scope.email,
                password: $scope.password,
                firstname: $scope.firstname,
                lastname: $scope.lastname
            };

            mvAuth.createUser(newUserData).then(function () {
                mvNotifier.notify('User account created!');
                $location.path("/");
            }, function(reason) {
                mvNotifier.error(reason);
            });
        }
    };

    ngapp.controller("mvSignupCtrl", ["$scope", "mvUser", mvSignupCtrl]);

}(window.angular.module('app')));