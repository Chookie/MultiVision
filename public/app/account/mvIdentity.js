(function (ngapp) {

    ngapp.factory('mvIdentity', function ($window, mvUser) {
        var currentUser;
        if(!!$window.bootstrappedUserObject) {
            // 6.6 replace with resource
            currentUser = new mvUser();
            // extend = Angular function for copying properties from one object to another
            angular.extend(currentUser, $window.bootstrappedUserObject)
            // using $window (angular variable) instead of just window so can mock it out during tests
            //currentUser = $window.bootstrappedUserObject;
        }
        return {
            //currentUser: undefined,
            currentUser: currentUser,
            isAuthenticated: function () {
                // !! converts the object to a boolean
                return !!this.currentUser;
            }
        }
    });

}(window.angular.module('app')));