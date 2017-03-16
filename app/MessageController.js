
app.controller('MessageController', function MyCtrl($http, $scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, Socialshare) {
    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.user = storageService.getObject("CU");
    console.log("DashboardController");

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }


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
        }).catch(function (err) {
        });



    }).catch(function (error) {
        console.log("Error in loading details");
    });




 

});
