(function (ngapp) {

    // Wrap toastr global variable in service so can use in our dependency injection and use that to inject it below
    ngapp.value('mvToastr', window.toastr);


    // Service
    ngapp.factory('mvNotifier', function (mvToastr) {
        mvToastr.options = {"timeOut": "2000", "closeButton": true };
        return{
            notifySuccess: function (msg) {
                mvToastr.success(msg);
                console.log(msg);
            },
            notifyFail: function (msg) {
                mvToastr.error(msg);
                console.log(msg);
            }
        };
    });

}(window.angular.module('app')));