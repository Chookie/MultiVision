// Wrap toastr global variable in service so can use in our dependency injection and use that to inject it below
angular.module('app').value('mvToastr', toastr);

// Service
angular.module('app').factory('mvNotifier', function (mvToastr) {
    return{
        notify: function (msg) {
            mvToastr.success(msg);
            console.log(msg);
        }
    };
});