
app.controller('StableController', function MyCtrl($scope, $rootScope,$location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    sessionService.CHECKSESSION();

    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.loadingcord = true;
    $scope.ZeroStable = false;

  
    
    $scope.Init = function () {

        $scope.loadingcord = false;
        $scope.stables = [];
        $scope.user = storageService.getObject("CU");
        angular.forEach($scope.user.Details.horse_ids, function (value, key) {
            $scope.ZeroStable = false;
            console.log(key);
            var horse = $rootScope.appHorses.$getRecord(key);
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

    }


    $scope.Init();

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

            
            $rootScope.appHorses.$remove(stb).then(function (ref) {
                var id = ref.key();
                if (stb.$id == id) {
                    console.log("Deleted success fully");
                }

                var userRef = $rootScope.appUsers.$getRecord(getLoggedInUserId()); // $scope.user.Auth.uid);
                userRef.horse_ids[id] = {
                    created_at: ""
                };

                delete userRef.horse_ids[id];

                $rootScope.appUsers.$save(userRef).then(function (res) {
                    var userToLocal = storageService.getObject("CU");
                    var userNew = $rootScope.appUsers.$getRecord(getLoggedInUserId());
                    userNew.profile = CleanProfileUrl(userNew.profile);
                    var obj = {
                        Auth: userToLocal.Auth,
                        Details: userNew
                    };
                    storageService.setObject("CU", obj);


                   // window.location.reload();

                    console.log(res);
                    //$scope.user.Details.profile = userRef.profile;
                   


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


    $scope.$on('userModified', function (event, data) {
        console.log("get the horse add event in stable page"); // 'Data to send'
        $scope.Init();
    });

});
