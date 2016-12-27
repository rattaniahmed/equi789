﻿
app.controller('DashboardController', function MyCtrl($http, $scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, Socialshare) {

    //var isLoggedIn = storageService.getObject("LoggedIn");
    //if (isLoggedIn == 1)
    //{
    //    storageService.setObject("LoggedIn", 0);
    //    window.location.reload();
    //}

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.user = storageService.getObject("CU");
    console.log("DashboardController");

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    $scope.selectedValue = "";

    function SaveImage(url) {


        $http.get(url, {}, {
            headers: {
                'Content-Type': 'image/jpg'
            },
            responseType: 'blob'
        }).then(function (image) {
            debugger;
            console.log(image)
            var blob = new Blob([image.data], {
                type: 'image/jpg'
            });

            //var fr = new FileReader();
            //fr.readAsDataURL(blob);

            var metadata = {
                'contentType': blob.type
            };

            var fname = Math.random().toString(36).substring(7) + ".jpg";// +file.name.substring(file.name.indexOf("."));
            var storageRef = firebase.storage().ref();
            storageRef.child('shares/' + fname).put(blob, metadata).then(function (snapshot) {
                debugger;
                var url = snapshot.metadata.downloadURLs[0];
                console.log(url)
            }).catch(function (error) {
                console.error('Upload failed:', error);
            });


        }, function (error) {
            debugger;
            deferred.reject(error);
        });

    }

    $scope.ShareObject = null;

    $scope.SocialShare = function () {

        $("#sharemodal").show();
    }

    

    $scope.RideExist = false;
    


    $scope.IsDataExist = function () {
        $("#sharemodal").hide();
        $(".modal-backdrop").remove();
        $('body').removeClass('modal-open');

        console.log($scope.ShareObject);
        console.log($scope.user);

        if ($scope.RideExist) {
            return true;
        }
        else {
            alert("No ride details exist for sharing");
            return false;
        }
    }


   



    //$scope.SocialShare = function () {
    //    if ($scope.RideExist) {
    //        FB.ui($scope.ShareObject, function (response) {
    //            console.log(response);
    //        });
    //    }
    //    else {
    //        alert("No ride details exist for sharing")
    //    }
    //}

    //SaveImage("https://maps.googleapis.com/maps/api/staticmap?zoom=8&size=600x300&maptype=roadmap&markers=color:green%7Clabel:G%7C&markers=color:red%7Clabel:C%7C&key=AIzaSyA2cpd_C0zOoAanqP0aWaKxxSuDDiRWPT0&path=color:red|weight:3||");
    //$.blockUI({
    //    message: '<img src="images/loading.gif" />',
    //});
    $scope.loadingcord = true;

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    //$scope.users = $firebaseArray(ref.child('users'));
    $scope.horses = $firebaseArray(ref.child('horses'));
    $scope.horses.$loaded().then(function (dataArray) {

        var ids = [];
        var vals = [];

        angular.forEach($scope.user.Details.horse_ids, function (value, key) {
            //console.log(value);
            console.log(key);
            var horse = $scope.horses.$getRecord(key);
            if (horse != null) {
                try {
                    for (var i in horse.ride_ids) {
                        ids.push({
                            Id: i, Val: horse.ride_ids[i]
                        })
                        vals.push(horse.ride_ids[i]);
                    }
                }
                catch (errloop) {
                    console.log(errloop);
                }

                console.log(horse);
            }
        });


        var max = Math.max.apply(Math, vals);

        for (var i = 0; i < ids.length; i++) {
            var o = ids[i];
            if (o.Val == max)
                $scope.rideId = o.Id;// '-KP44cqcDIZo4G5-ziq4'
        }



        $scope.rides = $firebaseArray(ref.child('rides'));
        $scope.rides.$loaded().then(function (dataArray) {
            var ride = $scope.rides.$getRecord($scope.rideId);
            console.log(ride)

            if (ride != null) {
                $scope.RideExist = true;
                if (ride.ismanualride == "1") {


                    debugger;
                    //$scope.socialshareurlstring = GetSharingUrl(ride, storageService.getNodeJSAppURL());

                    //firebase.database().ref('/horses/' + ride.horse_firebase_key + '/').on('value', function (snapshot) {
                    var horseobj = $scope.horses.$getRecord(ride.horse_firebase_key);
                    $scope.loadingcord = false;
                    DrawManualRideOnMap(ride);
                    $scope.ShareObject = GetShareObjectByRide(horseobj, ride);
                    //})



                }
                else {
                    $scope.coords = $firebaseArray(ref.child('coords'));
                    $scope.coords.$loaded().then(function (dataArray) {
                        debugger;
                        $scope.loadingcord = false;
                        var id = $scope.rideId;
                        var coord = $scope.coords.$getRecord(id);
                        DrawAutomatedRideOnMap(coord)
                        console.log(coord);
                        //$scope.socialshareurlstring = GetSharingUrlByCord(ride, coord, storageService.getNodeJSAppURL());
                        //console.log(horse);

                        var horseobj = $scope.horses.$getRecord(ride.horse_firebase_key);

                        $scope.ShareObject = GetShareObjectByCoordinate(horseobj, ride, coord);

                    });
                }
            }
            else {
                $scope.RideExist = false;
                $scope.loadingcord = false;
                DrawMap([]);
            }



            $.unblockUI();
        }).catch(function (err) {
        });



    }).catch(function (error) {
        console.log("Error in loading details");
    });




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

    $scope.Start();
});