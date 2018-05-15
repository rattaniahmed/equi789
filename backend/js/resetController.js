
app.controller('resetController', function ($scope, storageService, firebaseService, $firebaseArray) {



    // console.log("organisation");
    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('admin'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        // console.log(dataArray);
    }).catch(function (error) {
        // console.log("Error in loading details");
    });




    $scope.UpdatePassword = function () {

        var pwd = $("#pwd").val();
        var cpwd = $("#cpwd").val();

        if (pwd && cpwd) {
            if (pwd == cpwd) {
                $("#loadingModal").show();

                var user = getAdminUser();
                // console.log(user);
                var imageRef = $scope.images.$getRecord(user.$id);
                imageRef.Password = pwd;

                $scope.images.$save(imageRef).then(function (ref) {
                    debugger;
                    $("#loadingModal").hide();
                    alert("Password updated success fully");
                    var id = ref.key();
                    // console.log("added record with id " + id);

                    //window.location.reload();

                });
            }
            else
                alert("Password and confirm password are not matching");
        } else {
            alert("Password or confirm password can not be blank");
        }
    }
});

