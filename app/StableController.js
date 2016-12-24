
app.controller('StableController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    sessionService.CHECKSESSION();


    $scope.user = storageService.getObject("CU");

    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.users = $firebaseArray(ref.child('users'));
    $scope.users.$loaded().then(function (dataArray) {
        var user = $scope.users.$getRecord($scope.user.Auth.uid);
        user.profile = CleanProfileUrl(user.profile);
        var obj = {
            Auth: $scope.user.Auth,
            Details: user
        };
        $scope.user = obj;
        storageService.setObject("CU", obj);
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    console.log($scope.user);

    $scope.stables = [];

    $scope.loadingcord = true;
    $scope.ZeroStable = false;

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    //$scope.users = $firebaseArray(ref.child('users'));
    $scope.horses = $firebaseArray(ref.child('horses'));
    $scope.horses.$loaded().then(function (dataArray) {
        $scope.loadingcord = false;

        angular.forEach($scope.user.Details.horse_ids, function (value, key) {
            //console.log(value);

            console.log(key);
            var horse = $scope.horses.$getRecord(key);
            if (horse != null) {
                horse.photo = CleanHorseProfileUrl(horse.photo);


                try {
                    var today = new Date();
                    var d = new Date(horse.birthday);
                    if (Object.prototype.toString.call(d) === "[object Date]") {
                        // it is a date
                        if (isNaN(d.getTime())) {  // d.valueOf() could also work
                        }
                        else {
                            var diff = today - d;
                            var days = parseInt(diff / 1000 / 60 / 60 / 24);
                            console.log(days);

                            var year = parseInt(days / 365);


                            if (year == 1)
                                horse.AgeToDisplay = "1 year, ";
                            else
                                horse.AgeToDisplay = year + " years, ";

                            var remainDay = parseInt(days % 365);

                            var month = parseInt(remainDay / 30);

                            if (month == 1)
                                horse.AgeToDisplay += "1 month ";
                            else
                                horse.AgeToDisplay += month + " months ";

                            //horse.AgeToDisplay += "old";
                        }
                    }
                    else {
                        // not a date
                    }
                }
                catch (err) { }


                $scope.stables.push(horse);
            }

            console.log(horse);
        });

        if ($scope.stables.length == 0) {
            $scope.ZeroStable = true;
        }

    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $scope.selectedStable = null;
    $scope.rideDetail = function (stb) {
        storageService.setObject("CS", stb); //$scope.selectedStable = stb;
    }

    $scope.DeleteHorse = function (stb) {

        swal({
            title: "Are you sure?", text: "This horse will be deleted from the web and all devices, do you wish to continue!",
            type: "warning", showCancelButton: true,
            confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {

            blockUI.start("Removing horse.....");
            $scope.horses.$remove(stb).then(function (ref) {
                var id = ref.key();
                if (stb.$id == id) {
                    console.log("Deleted success fully");
                }
                //console.log("added record with id " + id);               
                //$location.path('my-stable.html');

                //$scope.user.Details.horse_ids[id] = {
                //    created_at: ""
                //};

                delete $scope.user.Details.horse_ids[id];

                //$scope.user.Details.horse_ids.push(id);
                storageService.setObject("CU", $scope.user);

                var userRef = $scope.users.$getRecord($scope.user.Auth.uid);
                //userRef.horse_ids[id] = {
                //    created_at: ""
                //};

                delete userRef.horse_ids[id];

                $scope.users.$save(userRef).then(function (res) {
                    window.location.reload();

                    console.log(res);
                    //$scope.user.Details.profile = userRef.profile;
                    $scope.$apply(function () {
                        blockUI.stop();
                    });


                });


                swal("", "Your horse has been removed success fully", "success");


            });

            //swal("Deleted!", "Your imaginary file has been deleted.", "success");
        });

    }

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }


});
