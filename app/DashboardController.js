app.controller('DashboardController', function MyCtrl($http, $scope,$rootScope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, Socialshare) {


   // var ref = firebaseService.FIREBASEENDPOINT();   
    $scope.user = storageService.getObject("CU");
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
            // console.log(image)
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
                var url = snapshot.metadata.downloadURLs[0];
                // console.log(url)
            }).catch(function (error) {
                // console.error('Upload failed:', error);
            });


        }, function (error) {
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

        // console.log($scope.ShareObject);
        // console.log($scope.user);

        if ($scope.RideExist) {
            return true;
        }
        else {
            alert("No ride details exist for sharing");
            return false;
        }
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
                    data.push([i, rideObjecth.speed[i].speed])
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
            }, xaxis: {
                show: !1
            },
            colors: ["#fff"]    
        });
});
    }
   



    //$scope.SocialShare = function () {
    //    if ($scope.RideExist) {
    //        FB.ui($scope.ShareObject, function (response) {
    //            // console.log(response);
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
    $scope.init=function(){
    $scope.loadingcord = true;

   // var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
   // $scope.horses = $firebaseArray(ref.child('horses'));
    //$scope.horses.$loaded().then(function (dataArray) {

        var ids = [];
        var vals = [];
debugger
for (var j = 0; j < $rootScope.appHorses.horseList.length; j++) {
            try {
                var horse = $rootScope.appHorses.horseList[j].HORSEOBJ;
        //angular.forEach($scope.user.Details.horse_ids, function (value, key) {
            //// console.log(value);
            // console.log(key);
            //var horse = $rootScope.appHorses.$getRecord(key);
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
                    // console.log(errloop);
                }

                // console.log(horse);
            }
}catch(err){}
}
     //   });


        var max = Math.max.apply(Math, vals);

        for (var i = 0; i < ids.length; i++) {
            var o = ids[i];
            if (o.Val == max)
                $scope.rideId = o.Id;// '-KP44cqcDIZo4G5-ziq4'
        }



    //    $scope.rides = $firebaseArray(ref.child('rides'));
       // $scope.rides.$loaded().then(function (dataArray) {
            var ride = $rootScope.appHorseRides.$getRecord($scope.rideId);
            // console.log(ride)

            if (ride != null) {
                $scope.RideExist = true;
                if (ride.ismanualride == "1") {


                    //$scope.socialshareurlstring = GetSharingUrl(ride, storageService.getNodeJSAppURL());

                    //firebase.database().ref('/horses/' + ride.horse_firebase_key + '/').on('value', function (snapshot) {
                    var horseobj =$rootScope.appHorses.$getRecord(ride.horse_firebase_key);
 //$scope.horses.$getRecord(ride.horse_firebase_key);
                    $scope.loadingcord = false;
$scope.$apply();
                    DrawManualRideOnMap(ride);
                    $scope.ShareObject = GetShareObjectByRide(horseobj, ride);
                    //})



                }
                else {
                        var id = $scope.rideId;
                    firebase.database().ref('/coords/' + id).once('value', function (snapshot) {
                    var coord = snapshot.val();
                  //  $scope.coords = $firebaseArray(ref.child('coords'));
                   // $scope.coords.$loaded().then(function (dataArray) {
                        $scope.loadingcord = false;
                        $scope.$apply();
                      //  var coord = $scope.coords.$getRecord(id);
                        DrawAutomatedRideOnMap(coord)
                        // console.log(coord);
                        //$scope.socialshareurlstring = GetSharingUrlByCord(ride, coord, storageService.getNodeJSAppURL());
                        //// console.log(horse);

                        var horseobj = $rootScope.appHorses.$getRecord(ride.horse_firebase_key);
                 //   $scope.horses.$getRecord(ride.horse_firebase_key);

                        $scope.ShareObject = GetShareObjectByCoordinate(horseobj, ride, coord);

                    });
                }
                $scope.graph1(ride);
                $scope.graph2(ride);
                $scope.graph3(ride);
            }
            else {
                $scope.RideExist = false;
                $scope.loadingcord = false;
                DrawMap([]);
            }

           

            $.unblockUI();
       // }).catch(function (err) {
       // });



   // }).catch(function (error) {
        // console.log("Error in loading details");
//});


}
   $scope.init();
    
 $scope.$on('horseLoaded', function (event, args) {

        $scope.init();
        $scope.$apply();

    });
    
});
