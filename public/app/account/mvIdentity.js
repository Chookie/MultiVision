angular.module('app').factory('mvIdentity', function (){
    return {
        currentUser: undefined,
        isAuthenticated: function (){
            // !! converts the object to a boolean
            return !!this.currentUser;
        }
    }
});