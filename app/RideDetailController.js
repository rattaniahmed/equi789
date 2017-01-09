app.controller('RideDetailController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService, $http) {

    console.log("RideDetailController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    $scope.stb = storageService.getObject("CS");

    console.log($scope.stb);



    try {
        console.log($scope.rideId)
        $scope.rideId = storageService.getObject("RIDEDETAILID");
    }
    catch (err) {

    }


    console.log($scope.stb);
    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.horserepo = $firebaseArray(ref.child('horses'));




    $scope.test = function (id) {
        console.log($scope.currentRide);
        $scope.rides.$remove($scope.currentRide).then(function (ref) {
            var id = ref.key();

            for (var i = 0; i <= $scope.stb.ride_ids.length; i++) {
                if ($scope.stb.ride_ids[i] == id) {
                    console.log("Deleted success fully");
                }
            }

            delete $scope.stb.ride_ids[id];

            //$scope.user.Details.horse_ids.push(id);
            storageService.setObject("CS", $scope.stb);


          
            $scope.horserepo.$save($scope.stb).then(function (res) {
                console.log(res);
                //$scope.user.Details.profile = userRef.profile;
                $scope.$apply(function () {
                    blockUI.stop();
                });

                window.location.reload();

            });

        }).catch(function (err) {
            console.log(err);
        });
        swal("", "Your Ride has been removed success fully", "success");
        $location.path('ride-history.html');
    }


    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    $scope.imgData = canvas.toDataURL("http://www.w3schools.com/howto/img_fjords.jpg", 1.0);

    

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


    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }


    $scope.SeeMap = function (his) {
        storageService.setObject("RIFM", his.$id);
        $location.path('ridemap.html');
        console.log(his.ride_ids);
    }


    $scope.ShareObject = null;

    $scope.SocialShare = function () {
        $("#sharemodal").show();
    }
    

    $scope.IsDataExist = function () {
        $("#sharemodal").hide();
        $(".modal-backdrop").remove();
        $('body').removeClass('modal-open');


        return true;
    }


    

   
    $scope.currentRide = {};
    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.rides.$loaded().then(function (dataArray) {
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
        var id = $scope.rideId;
        var lastRide = $scope.rides.$getRecord(id);
        $scope.currentRide = lastRide;
        $scope.ride_time_to_display = hhmmss(lastRide.ride_time);
        $scope.total_time_to_display = hhmmss(lastRide.total_time);

        $scope.freestyle_time_to_display = hhmmss(lastRide.freestyle_time);
        $scope.hotwalk_time_to_display = hhmmss(lastRide.hotwalk_time);

        console.log("getting ride id -" + $scope.rideId);
        if (IsNull(lastRide.ground_condition))
            $("#gndconditionaddride").val("Select");
        else
            $("#gndconditionaddride").val(lastRide.ground_condition);
        $scope.lastRide = lastRide;
        console.log($scope.lastRide);

        if ($scope.lastRide.ismanualride == "1") {
            $scope.ShareObject = GetShareObjectByRide($scope.stb, $scope.lastRide);
        }
        else {
            $scope.coords = $firebaseArray(ref.child('coords'));
            $scope.coords.$loaded().then(function (dataArray) {
                debugger;
                var coord = $scope.coords.$getRecord(id);
                $scope.ShareObject = GetShareObjectByCoordinate($scope.stb, $scope.lastRide, coord);
            });
        }


    }).catch(function (err) {

    });

    $scope.UpdateNotes = function () {

        blockUI.start("Updating notes details.....");

        var rideRef = $scope.rides.$getRecord($scope.rideId);
        rideRef.notes = ReplaceNull($scope.lastRide.notes);
        rideRef.ground_condition = $("#gndconditionaddride").val();

        $scope.rides.$save(rideRef).then(function (res) {
            swal("", "Your notes details has been edited success fully", "success");
            $scope.$apply(function () {
                blockUI.stop();
            });

            //storageService.setObject("CS", rideRef);
            // swal("", "Your notes details has been edited success fully", "success");
            console.log(res);

            window.location.reload();

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

});
