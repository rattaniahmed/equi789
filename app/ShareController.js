app.controller('ShareController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService, $http) {

   

    $scope.ClosedShareModel = function () {
        $("#sharemodal").hide();
    }

    $scope.ShareWithFb = function () {
        if ($scope.IsDataExist()) {
            FB.ui($scope.ShareObject, function (response) {
                console.log(response);
            });
        }
    }


    $scope.SendPdf = function () {
        if ($scope.IsDataExist()) {

            var val = $("#shareemailaddress").val();

            var email = $scope.user.Details.email;
            if (val)
                email = val;

            var url = storageService.getNodeJSAppURL() + 'sendpdf?&MS=' + $scope.ShareObject.title + '&TO=' + email + '&IU=' + $scope.ShareObject.picture;

            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });

            swal("", "The PDF report has been sent to your email address", "success");
        }
    }
});
