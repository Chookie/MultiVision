// These are functions used by the router and getting user

(function (ngapp) {

    // $q is for promise
    ngapp.factory('mvAuth', function($http, mvIdentity, $q, mvUser){
        return {
            authenticateUser: function (username, password){
                var dfd = $q.defer();
                $http.post('/login', {username:username, password:password}).then( function (response) {
                    if(response.data.success){
                        // 6.6 converting to use mvUser
                        var user = new mvUser();
                        // extend = Angular function for copying properties from one object to another
                        angular.extend(user, response.data.user);
                        // Now user can call rest methods (resources) and use the isadmin function.
                        mvIdentity.currentUser = user;
                        //mvIdentity.currentUser = response.data.user;
                        dfd.resolve(true);
                    } else {
                        dfd.resolve(false);
                    }
                });
                return dfd.promise;
            },
            logoutUser: function () {
                var dfd = $q.defer();
                $http.post('/logout', {logout: true}).then( function () {
                    mvIdentity.currentUser = undefined;
                    dfd.resolve();
                });
                return dfd.promise;
            },
            authoriseCurrentUserForRoute: function(role) {
                if(mvIdentity.isAuthorised(role)){
                    // True will redirect to route.
                    return true;
                } else {
                    // This will throw a route error event
                    // Use any message you like as long as use same one listenting for route change errors
                    return $q.reject('not authorised');
                }
            }
        }
    });

}(window.angular.module('app')));