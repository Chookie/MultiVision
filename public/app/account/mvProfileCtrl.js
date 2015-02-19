angular.module('app')
       .controller('mvProfileCtrl', ['$scope', 'mvAuth', 'mvIdentity','mvNotify',
        function ($scope,mvAuth,mvIdentity,mvNotify) {
    $scope.email = mvIdentity.currentUser.email;
    $scope.firstname = mvIdentity.currentUser.firstname;
    $scope.lastname = mvIdentity.currentUser.lastname;

    $scope.update = function (){
        var userData = {
            email: $scope.email,
            firstname: $scope.firstname,
            lastname: $scope.lastname
        };
        if($scope.password && $scope.password.length > 0) {
            userData.password = $scope.password;
        }

        mvAuth.updateCurrentUser(userData).then(function () {
            mvNotify.success("Your user account has been updated");
        }, function (reason) {
            mvNotify.error(reason);
        });
    }
}]);