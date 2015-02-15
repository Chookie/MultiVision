
// Handle notifications

angular.module('app').factory('mvNotifier', function(){
    return {
        notifySuccess: function(message){
            window.toastr.success(message)
        },
        notifyFail: function(message){
            window.toastr.error(message)
        }
    }
});
