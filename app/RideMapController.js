app.controller('RideMapController', function MyCtrl($scope, $rootScope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService, $http) {

    // console.log("HistoryController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    $scope.stb = storageService.getObject("CS");

    $scope.rideId = storageService.getObject("RIFM");
    //$scope.rideId="-KSpPpJKZ5IicOQ-P5kM";

    try {
        //$scope.rideId = $scope.stb.ride_ids[0];
        // console.log($scope.rideId)
    }
    catch (err) {

    }

    $scope.ShareObject = null;

    $scope.SocialShare = function () {

        $("#sharemodal").modal();

    }

    $scope.IsDataExist = function () {
        $("#sharemodal").modal('hide');

        // $(".modal-backdrop").remove();
        //$('body').removeClass('modal-open');


        return true;
    }

    $scope.graph1 = function (rideObject) {


        firebase.database().ref('/heartrates/' + rideObject.$id).once('value', function (snapshot) {
            rideObject.heartrate = snapshot.val();
            var container = $("#graph_3");
            var res = [];

            if (rideObject.heartrate) {

                for (var i = 0; i < rideObject.heartrate.length; i++) {
                    //res.push([rideObject.heartrate[i].time, rideObject.heartrate[i].heartrate])
                    res.push([i, rideObject.heartrate[i].heartrate])
                }
            }

            series = [{
                data: res,
                lines: {
                    fill: true
                }
            }];

            var t = {
                series: {
                    shadowSize: 1
                },
                lines: {
                    show: !0,
                    lineWidth: 2,
                    fill: !0,
                    fillColor: {
                        colors: [{
                            opacity: .3
                        }, {
                            opacity: 1
                        }]
                    }
                },
                yaxis: {
                    min: 0,
                    max: 100,
                    tickColor: "#eee",
                    tickFormatter: function (e) {
                        return e;
                    }
                },
                xaxis: {
                    show: !1
                },
                colors: ["#5FD7FA"],
                grid: {
                    tickColor: "#eee",
                    borderWidth: 0
                }
            },
                a = 30,
                plot = $.plot(container, series, t);
        });
    }



    $scope.graph2 = function (rideObjectg) {

        firebase.database().ref('/altitudes/' + rideObjectg.$id).once('value', function (snapshot) {
            rideObjectg.altitude = snapshot.val();
            var container = $("#graph_2");
            var data = [];

            if (rideObjectg.altitude) {

                for (var i = 0; i < rideObjectg.altitude.length; i++) {
                    //data.push([rideObjectg.altitude[i].time, rideObjectg.altitude[i].altitude])
                    data.push([i, rideObjectg.altitude[i].altitude]);
                }
            }

            $.plot(container, [data], {
                series: {
                    bars: {
                        show: true,
                        barWidth: 0.6,
                        align: "center"
                    }
                },
                grid: {
                    tickColor: "#eee",
                    borderWidth: 0
                },
                xaxis: {
                    show: !1
                },
                colors: ["#3FF3AC"],
            });

        });
    }

    $scope.graph3 = function (rideObjecth) {
        firebase.database().ref('/speeds/' + rideObjecth.$id).once('value', function (snapshot) {
            rideObjecth.speed = snapshot.val();
            var container = $("#graph_1");
            var data = [];

            if (rideObjecth.speed) {

                for (var i = 0; i < rideObjecth.speed.length; i++) {
                    //data.push([rideObjecth.avgspeed[i].time, rideObjecth.avgspeed[i].avgspeed])
                    data.push([i, rideObjecth.speed[i].speed]);
                }
            }

            $.plot(container, [data], {
                series: {
                    shadowSize: 1
                },
                lines: {
                    lineWidth: 3,
                },
                grid: {
                    tickColor: "#FF5F5F",
                    borderWidth: 0,
                    minBorderMargin: 20,
                    labelMargin: 10,
                    backgroundColor: {
                        colors: ["#FF5F5F", "#FF5F5F"]
                    }
                },
                xaxis: {
                    show: !1
                },
                colors: ["#fff"]
            });
        });
    }
   
    $scope.init=function(){
        var coord = [];
        $scope.loadingcord = true;
        //var ref = firebaseService.FIREBASEENDPOINT();
        //$scope.rides = $firebaseArray(ref.child('rides'));

        // $scope.rides.$loaded().then(function (dataArray) {
        // console.log("hererrdfsdfdsfdsf");
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
        $scope.ride = $rootScope.appHorseRides.$getRecord($scope.rideId);
        if ($scope.ride) {
            $scope.graph1($scope.ride);
            $scope.graph2($scope.ride);
            $scope.graph3($scope.ride);

            if ($scope.ride.ismanualride == "1") {
                $scope.loadingcord = false;
                DrawManualRideOnMapNew($scope.ride);
                try {
                    //$scope.$apply();
                }
                catch (err) { }
                $scope.ShareObject = GetShareObjectByRide($scope.stb, $scope.ride);
            }
            else {
                var id = $scope.rideId;
                firebase.database().ref('/coords/' + id).once('value', function (snapshot) {
                    var coord = snapshot.val();
                    // $scope.coords = $firebaseArray(ref.child('coords'));
                    //  $scope.coords.$loaded().then(function (dataArray) {
                    // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
                    $scope.loadingcord = false;

                    DrawAutomatedRideOnMapNew(coord);
                    // console.log(coord);
                    try {
                        $scope.$apply();
                    }
                    catch (err) { }
                    $scope.ShareObject = GetShareObjectByCoordinate($scope.stb, $scope.ride, coord);
                }).catch(function (err) {

                });


            }
        }

    }

    //}).catch(function (err) {
    //    // console.log(err);
    //});



        $scope.init();
    
    $scope.$on('horseLoaded', function (event, args) {

        $scope.init();
        $scope.$apply();

    });

    // console.log($scope.stb);

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }







    

   

});
