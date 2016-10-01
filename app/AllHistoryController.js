app.controller('AllHistoryController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    //$(function () {
    //    $('#dp3').datepicker({
    //        viewMode: 'years'
    //    });

    //});

    console.log("AllHistoryController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    $scope.stb = storageService.getObject("CS");

    $scope.historyCache = storageService.getObject("CHIST");

    console.log($scope.stb);

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
    $scope.ridesrepo = $firebaseArray(ref.child('rides'));
    $scope.horserepo = $firebaseArray(ref.child('horses'));


    $scope.UpdateRide=function(obj)
    {
        storageService.setObject("EditedRideObject", obj);
        $("#add_ride").show();

    }

    $scope.test = function (id) {
        console.log(id);
        blockUI.start("Deleting Ride.....");
        $scope.ridesrepo.$remove(id).then(function (ref) {
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
            //var currenthorseRef = $scope.horserepo.$getRecord($scope.currenthorse.$id);
            //delete $scope.horserepo.ride_ids[id];

            $scope.horserepo.$save($scope.stb).then(function (res) {
                console.log(res);
                
                $scope.$apply(function () {
                    blockUI.stop();
                });

                swal("", "Your Ride has been removed success fully", "success");
                //$location.path('ride-history.html');

                window.location.reload();

            });

        }).catch(function (err) {
            console.log(err);
        });
      
    }






    $scope.DeleteRide = function (id) {



        swal({
            title: "Are you sure?", text: "This Ride will be deleted from the web and all devices, do you wish to continue!",
            type: "warning", showCancelButton: true,
            confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {

            $scope.test(id);
        });

    }
    $scope.histories = [];

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.history = $firebaseArray(ref.child('rides'));
    $scope.history.$loaded().then(function (dataArray) {
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        $scope.histories = [];

        for (var id in $scope.stb.ride_ids) {

            var horseHistory = $scope.history.$getRecord(id);
            //var time = $scope.stb.ride_ids[id];


            //var date = new Date(parseInt(time));
            var date = new Date(horseHistory.start_time);

            var month = monthNames[date.getMonth()];
            var year = date.getFullYear();



            if ($scope.historyCache.Month == month && $scope.historyCache.Year == year) {
                horseHistory.ActualTime = date;
                horseHistory.TimeToDisplay = date.format("mmmm d, yyyy h:MM:ss TT");
                horseHistory.total_time = hhmmss(horseHistory.total_time);
                $scope.histories.push(horseHistory);
            }
        }

        $scope.histories = $scope.histories.sort(function (a, b) {
            //return new Date(b.ActualTime).getTime() - new Date(a.ActualTime).getTime()
            return b.ActualTime.getTime() - a.ActualTime.getTime()
            //return a > b;
        });


        //$scope.histories = horseHistory;
    }).catch(function (err) {

    });


});
