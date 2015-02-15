
// Handle notifications
angular.module('app').value('toastr', toastr)

angular.module('app').factory('mvNotifier', ['toastr', function(toastr){
    // THIS CODE IS KIND OF STUPID. wraps toastr library in a service
    // globally accessible anyhow
    return {
        notifySuccess: function(message){
            toastr.success(message)
        },
        notifyFail: function(message){
            toastr.error(message)
        }
    }
}])
