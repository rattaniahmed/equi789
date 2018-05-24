
app.controller('StableController', function MyCtrl($scope, $rootScope,$location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    sessionService.CHECKSESSION();

    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.loadingcord = true;
    $scope.ZeroStable = false;
    $scope.getridedetailsforstable = function (ride_ids) {
        $scope.totalDistance = 0.0;

        for (var id in ride_ids) {
            var ride = $rootScope.appHorseRides.$getRecord(id);
            $scope.totalLength = _.size(ride_ids);
            if (ride != null) {
                $scope.totalDistance = parseFloat($scope.totalDistance) + parseFloat(ride.total_distance);
                $scope.totalDuration = parseInt($scope.totalDuration) + parseInt(ride.total_time);
            }
        }


        $scope.totalDistance = parseFloat(Math.round($scope.totalDistance * 100) / 100).toFixed(2);
        
        $scope.totalDuration = ReplaceTime(hhmmss($scope.totalDuration));
        
        return { distance: $scope.totalDistance, time: $scope.totalDuration, ride: $scope.totalLength };
    }
  
    $scope.addHorseToStable = function (horse) {
        $scope.hosCounter++;
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
            var find = _.findLastIndex($scope.stables, { $id: horse.$id });
            if (find == -1) {
                if (horse.ride_ids) {
                    var details = $scope.getridedetailsforstable(horse.ride_ids);
                    horse.details = details;
                }
                $scope.stables.push(horse);
            } else {
                $scope.stables = _.reject($scope.stables, function (num) { return num.$id == horse.$id; });
                if (horse.ride_ids) {
                    var details = $scope.getridedetailsforstable(horse.ride_ids);
                    horse.details = details;
                }
                $scope.stables.push(horse);
                $scope.$apply();
            }
        }
       

    }
    

    $scope.hosCounter = 0;
    $scope.hosLength = 0;
    $scope.Init = function () {

       

        $scope.loadingcord = false;
        $scope.stables = [];
        $scope.user = storageService.getObject("CU");
        if ($scope.user && $scope.user.Details) {


            

          //  var horsKeys = Object.keys($scope.user.Details.horse_ids);
            if ($rootScope.appHorses.horseList.length > 0) {
                $scope.hosLength = $rootScope.appHorses.horseList.length;
                $scope.ZeroStable = false;
                //angular.forEach($scope.user.Details.horse_ids, function (value, key) {
                for (var i = 0; i < $rootScope.appHorses.horseList.length; i++) {
                    var horse = $rootScope.appHorses.horseList[i].HORSEOBJ;
                    if (horse) {
                        //horse.$id = key;
                        $scope.addHorseToStable(horse);
                    }
                } 
                    

                   
               // });
            }
            else
                $scope.ZeroStable = true;
        } else {
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
            try {
                var id = stb.$id;
                firebase.database().ref('/horses/' + stb.$id).remove(function (error) {
                    if (error) { }
                    else {
                        swal("", "Your horse has been removed success fully", "success");
                        var localUser = storageService.getObject("CU");
                        firebase.database().ref('/users/' + getLoggedInUserId() + '/horse_ids/' + id).remove(function (error) {
                            delete localUser.Details.horse_ids[id];
                            storageService.setObject("CU", localUser);
                        });

                        for (var rideIdToDelete in stb.ride_ids) {
                            firebase.database().ref('/rides/' + rideIdToDelete).remove(function (error) {
                                // console.log("ride id deleted");
                            });
                        }

                        $scope.stables = _.reject($scope.stables, function (num) { return num.$id == stb.$id; });
                        $scope.$apply();

                    }
                });
                //window.location.reload();
            }
            catch (errrDelete) {
                // console.log(errrDelete);
            }
        });
    }

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }
  

    $scope.$on('userModified', function (event, data) {
        // console.log("get the horse add event in stable page"); // 'Data to send'
        $scope.Init();
    });

    $scope.$on('horseLoaded', function (event, args) {
        $scope.Init();
        $scope.$apply();
    });
    
    //$scope.$on('ridesLoaded', function (event, args) {
    //    $scope.Init();
    //});
   
});
