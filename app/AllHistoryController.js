app.controller('AllHistoryController', function MyCtrl($scope,$rootScope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    console.log("AllHistoryController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");
    $scope.stb = storageService.getObject("CS");
  
    
    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    $scope.SeeMap = function (his) {
        storageService.setObject("RIFM", his.$id);
        $location.path('ridemap.html');
        console.log(his.ride_ids);
    }

    $scope.RideDetail = function (his) {
        storageService.setObject("RIDEDETAILID", his.$id);
        $location.path('ride-detail.html');
        console.log(his.ride_ids);
    }

    var ref = firebaseService.FIREBASEENDPOINT();
  

    $scope.UpdateRide=function(obj)
    {
        console.log(obj);
        console.log("opening modal");
        storageService.setObject("EditedRideObject", obj);
        
        $("#add_ride").modal();
        $('#StartRide').datetimepicker();
        $('#EndRide').datetimepicker();
        $scope.addride = storageService.getObject("EditedRideObject")

        $("#StartRide").val($scope.addride.start_time);
        $("#EndRide").val($scope.addride.end_time);
        $("#Weather").val($scope.addride.weather);
        $("#Distance").val($scope.addride.total_distance);

        //$scope.$apply();
    }

    $scope.test = function (id) {
        console.log(id);
        blockUI.start("Deleting Ride.....");
        $rootScope.appHorseRides.$remove(id).then(function (ref) {
            debugger;
            var id = ref.key();

            for (var i = 0; i <= $scope.stb.ride_ids.length; i++) {
                if ($scope.stb.ride_ids[i] == id) {
                    console.log("Deleted success fully");
                }
            }



            //console.log("added record with id " + id);               
            //$location.path('my-stable.html');

            //$scope.user.Details.horse_ids[id] = {
            //    created_at: ""
            //};

            delete $scope.stb.ride_ids[id];

            //$scope.user.Details.horse_ids.push(id);
            storageService.setObject("CS", $scope.stb);


            //userRef.horse_ids[id] = {
            //    created_at: ""
            //};

            var currenthorseRef = $scope.horserepo.$getRecord($scope.stb.$id);
            delete currenthorseRef.ride_ids[id];

            $scope.horserepo.$save(currenthorseRef).then(function (res) {

                console.log(res);

                //$scope.$apply(function () {
                //    blockUI.stop();
                //});

                swal("", "Your Ride has been removed success fully", "success");
                //$location.path('ride-history.html');

               
                window.location.reload();

                
            }).catch(function (errs) {
                console.log(errs);

                //$scope.$apply(function () {
                //    blockUI.stop();
                //});

                swal("", "Your Ride has been removed success fully", "success");
                //$location.path('ride-history.html');


                window.location.reload();

            });;

        }).catch(function (err) {
            console.log(err);
        });
      
    }

    $rootScope.DeleteRide = function (id) {
        debugger;


        swal({
            title: "Are you sure?", text: "This Ride will be deleted from the web and all devices, do you wish to continue!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function () {

            $scope.test(id);
        });

    }
    $scope.histories = [];

    $scope.Init = function () {
        $scope.stb = storageService.getObject("CS");
        $scope.historyCache = storageService.getObject("CHIST");
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        $scope.histories = [];

        for (var id in $scope.stb.ride_ids) {

            var horseHistory = $rootScope.appHorseRides.$getRecord(id);
          

            if (horseHistory != null) {
                //var date = new Date(parseInt(time));
                var date = new Date(horseHistory.start_time.replace('p.m.', 'PM'));

                var month = monthNames[date.getMonth()];
                var year = date.getFullYear();



                if ($scope.historyCache.Month == month && $scope.historyCache.Year == year) {
                    horseHistory.ActualTime = date;
                    horseHistory.TimeToDisplay = date.format("mmmm d, yyyy h:MM:ss TT");
                    horseHistory.total_time = hhmmss(horseHistory.total_time);
                    $scope.histories.push(horseHistory);
                }
            }

        }

        $scope.histories = $scope.histories.sort(function (a, b) {
                      return b.ActualTime.getTime() - a.ActualTime.getTime()
        });


    }

    $scope.Init();

    $scope.AddRideTODAtabase = function (currentRide) {

        blockUI.start("Updating horse Ride.....");

        //var ridenode = ref.child('rides').child(currentRide.$id);
        //ridenode.$set()


        //$scope.history.$set(currentRide).then(function (ref) {
        $scope.history.$save(currentRide).then(function (ref) {
            debugger;
            //var id = ref.key();
            console.log("added record with id " + id);

            //swal("", "Your Ride has been added success fully", "success");
            //$location.path('my-stable.html');
            debugger;

            if (IsNull($scope.currenthorse.ride_ids)) {
                $scope.currenthorse['ride_ids'] = {};
            }

            var d = new Date();
            $scope.currenthorse.ride_ids[currentRide.$id] = d.getTime();

            //$scope.user.Details.horse_ids.push(id);
            storageService.setObject("CS", $scope.currenthorse);

            var currenthorseRef = $scope.horserepo.$getRecord($scope.currenthorse.$id);

            if (IsNull(currenthorseRef.ride_ids)) {
                currenthorseRef['ride_ids'] = {};
            }

            currenthorseRef.ride_ids[currentRide.$id] = d.getTime();

            $scope.horserepo.$save(currenthorseRef).then(function (res) {


                //$('#map').modal('show');

                window.location.reload();

                console.log(res);
                //$scope.user.Details.profile = userRef.profile;
                $scope.$apply(function () {
                    blockUI.stop();
                });
                swal("", "Your Ride has been updated success fully", "success");

            }).catch(function (err) {
                console.log(err);

            });


        });
    }


    $scope.UpdateRideToDataBase = function () {

        debugger;

        $scope.addride.start_time = document.getElementById("StartRide").value;
        $scope.addride.end_time = document.getElementById("EndRide").value;
        $scope.addride.weather = document.getElementById("Weather").value;
        $scope.addride.total_distance = document.getElementById("Distance").value;

        var startTime = new Date($scope.addride.start_time);
        var endTime = new Date($scope.addride.end_time);
        if (startTime < endTime) {
            if (endTime <= new Date() && startTime < new Date()) {
                var distance = $scope.addride.total_distance;
                var time = (endTime - startTime) / (1000 * 60 * 60);
                var speed = distance / time;

                $scope.addride.average_speed = speed;
                $scope.addride.ride_time = time;
                $scope.addride.top_speed = speed;
                $scope.addride.total_time = time;
                $scope.addride.ismanualride = 1;


                console.log($scope.addride)


                //storageService.setObject("IsADDRideMode", 1);

                storageService.setObject("EditedRideObject", $scope.addride);

                //$("#add_ride").hide();
                //$("#editMapModal").show();

                $scope.AddRideTODAtabase($scope.addride);
            }
            else {

                alert("Start date and end date  Cannot be greater than today date")

            }

        }
        else {
            alert("Start date Cannot be greater than End date")
        }


        //google.maps.event.trigger(map, 'resize', {});

    }


    $scope.$on('horseModified', function (event, args) {
        console.log("get the horse add event in stable page"); // 'Data to send'

        var localHorse = storageService.getObject("CS");
        if (localHorse.$id == args.data.key && args.data.event == "child_changed") {
            var horseNew = $rootScope.appHorses.$getRecord(localHorse.$id);
            storageService.setObject("CS", horseNew);
            $scope.Init();
        }
    });


    //$scope.$on('ridesModified', function (event, args) {
    //    $scope.historyCache = storageService.getObject("CHIST");
    //    var localHorse = storageService.getObject("CS");
    //    var horseridesNew = $rootScope.appHorseRides.$getRecord(args.data.key);
    //    localHorse.ride_ids.push(args.data.key);
    //    storageService.setObject("CS", localHorse);
    //    $scope.historyCache.DataArray.push(horseridesNew);
    //    storageService.setObject("CHIST", $scope.historyCache);
    //        $scope.Init();
      
    //});

    $scope.$on('ridesLoaded', function (event, args) {

        $scope.Init();

    });

});



