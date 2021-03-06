﻿app.controller('LastRideController', function MyCtrl($scope,$rootScope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService, $http) {

    // console.log("LastRideController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    $scope.ShareObject = null;

    $scope.SocialShare = function () {

        $("#sharemodal").modal();


    }

    $scope.IsDataExist = function () {
        $("#sharemodal").modal('hide');
        //$(".modal-backdrop").remove();
        //$('body').removeClass('modal-open');


        return true;
    }
    $scope.Init=function()
    {
        $scope.stb = storageService.getObject("CS");
        // console.log($scope.stb);

        var ids = [];
        var vals = [];
        for (var i in $scope.stb.ride_ids) {
            ids.push({
                Id: i, Val: $scope.stb.ride_ids[i]
            })
            vals.push($scope.stb.ride_ids[i]);
        }

        var max = Math.max.apply(Math, vals);

        for (var i = 0; i < ids.length; i++) {
            var o = ids[i];
            if (o.Val == max)
                $scope.rideId = o.Id;// '-KP44cqcDIZo4G5-ziq4'
        }



        try {
            //$scope.rideId = $scope.stb.ride_ids[0];
            // console.log($scope.rideId)
            storageService.setObject("RIFM", $scope.rideId);
        }
        catch (err) {}
            // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
            var id = $scope.rideId;
            var lastRide = $rootScope.appHorseRides.$getRecord(id);
            if (lastRide) {
                $scope.ride_time_to_display = hhmmss(lastRide.ride_time);
                $scope.total_time_to_display = ReplaceTime(hhmmss(lastRide.total_time));


                $scope.freestyle_time_to_display = hhmmss(lastRide.freestyle_time);
                $scope.hotwalk_time_to_display = hhmmss(lastRide.hotwalk_time);

                if (IsNull(lastRide.ground_condition))
                    $("#gndcondition").val("Select");
                else
                    $("#gndconditionaddride").val(lastRide.ground_condition);


                $scope.lastRide = lastRide;
                // console.log($scope.lastRide);

                if ($scope.lastRide.ismanualride == "1") {

                    $scope.ShareObject = GetShareObjectByRide($scope.stb, $scope.lastRide);
                }
                else {
                    firebase.database().ref('/coords/' + id).once('value', function (snapshot) {
                        var coord = snapshot.val();
                   // var ref = firebaseService.FIREBASEENDPOINT();
                    //$scope.coords = $firebaseArray(ref.child('coords'));
                   // $scope.coords.$loaded().then(function (dataArray) {
                       // var coord = $scope.coords.$getRecord(id);
                        $scope.ShareObject = GetShareObjectByCoordinate($scope.stb, $scope.lastRide, coord);
                    });
                }
            }

    
    }
   

    $scope.UpdateNotes = function () {

 

        var rideRef = $rootScope.appHorseRides.$getRecord($scope.rideId);
        rideRef.notes = ReplaceNull($scope.lastRide.notes);
        rideRef.ground_condition = $("#gndconditionaddride").val();

        $rootScope.appHorseRides.$save(rideRef).then(function (res) {

            swal("", "Your notes details has been edited success fully", "success");
           
        });

    }


    $scope.graph1 = function () {

        var container = $("#graph_1");

        var maximum = container.outerWidth() / 2 || 300;
        var data = [];
        function getRandomData() {
            if (data.length) { data = data.slice(1); }
            while (data.length < maximum) {
                var previous = data.length ? data[data.length - 1] : 50;
                var y = previous + Math.random() * 10 - 5;
                data.push(y < 0 ? 0 : y > 100 ? 70 : y);
            }
            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }
            return res;
        }
        series = [{
            data: getRandomData(),
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
                    return e + "%"
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

    }



    $scope.graph2 = function () {

        var container = $("#graph_2");

        var data = [["4:00", 10], ["4:30", 8], ["5:00", 4], ["5:30", 13], ["6:00", 17], ["6:30", 9], ["7:00", 5], ["7:30", 9], ["8:00", 7], ["8:30", 4]];
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
                mode: "categories",
                tickLength: 0
            },
            colors: ["#3FF3AC"],
        });


    }

    $scope.graph3 = function () {
        var container = $("#graph_3");

        var data = [[0, 4.9], [1, 5], [2, 5.1], [3, 5], [4, 4.9], [5, 5], [6, 5.1], [7, 5], [8, 4.9], [9, 5], [10, 5.1], [11, 5], [12, 5], [13, 4.9], [14, 5]];

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
            colors: ["#fff"]
        });
    }

    $scope.Start = function () {

        $scope.graph1();
        $scope.graph2();
        $scope.graph3();

    }

    //$scope.Start();

    $scope.Init();
    //$scope.$on('ridesModified', function (event, args) {
        
    //        $scope.Init();
    //});

    $scope.$on('horseLoaded', function (event, args) {
        
        $scope.Init();
        $scope.$apply();
      
    });

});
