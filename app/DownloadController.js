app.controller('DownloadController', function ($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService) {

    $scope.showDownloadButton = false;
    $scope.showAlertButton = false;

    $scope.HorsesData = [];
    $scope.RidesData = [];
    $scope.CordsData = [];

    $scope.rows = [];

    

    //firebase.database().ref('/Content/Messages/' + a).once('value', function (msgsnapshot) {

    //});

    $scope.SetAssociationHeader = function (number, getHeader) {
        var n = "Asssociation " + number;
        getHeader.push(n + " Name");
        getHeader.push(n + " Number");
    }

    $scope.SetAssociationData = function (number, row, asso) {

        var prop = "Asssociation" + number;
        if (asso == null) {
            row[prop + "Name"] = "";
            row[prop + "Number"] = "";
        }
        else {
            row[prop + "Name"] = asso[number - 1].name;
            row[prop + "Number"] = asso[number - 1].number;
        }
    }


    var id = $location.search().id;
    blockUI.start("Fetching report data. It will take a while....");

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);

    //$scope.images = $firebaseArray(ref.child('Content').child('Reports'));
    //$scope.images.$loaded().then(function (dataArray) {

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.organisation = $firebaseArray(ref.child('admin'));
    //$scope.organisation.$loaded().then(function (assodataArray) {
    
        firebase.database().ref('/Content/Reports/' + id).once('value', function (reportsnapshot) {
            //$scope.Imgaes = dataArray;

            $scope.ReportConfig = reportsnapshot.val();// $scope.images.$getRecord(id);

            var date = new Date($scope.ReportConfig.Expiry);
            var current = new Date();

            if (current > date) {
                $scope.showAlertButton = true;
                try {
                    $scope.$apply(function () {
                        blockUI.stop();
                    });
                }
                catch (error) {

                }

            } else {

                firebase.database().ref('/admin/').once('value', function (associationshot) {

                    var assodataArray = associationshot.val();

                    $scope.associations = _.filter(assodataArray, function (num) { return num.Role == "Organisation" && num.OrganisationNumber == $scope.ReportConfig.AssociationsId; });

                    $scope.association = $scope.associations[0];

                    $scope.Orghorses = [];
                    $scope.horses = $firebaseArray(ref.child('horses'));
                    $scope.horses.$loaded().then(function (dataArray) {

                        //firebase.database().ref('/horses').orderBy('filter').startAt('comedy').endAt('comedy').once('value', function (horsessnapshot) {

                        //$scope.HorsesData = horsessnapshot.val();

                        $scope.HorsesData = dataArray;

                        for (var i in dataArray) {
                            if ($scope.association.ShowAllData && $scope.association.ShowAllData == "1") {
                                $scope.Orghorses.push(dataArray[i]);
                            } else {
                                if (dataArray[i] && dataArray[i].associations) {
                                    var orgh = _.find(dataArray[i].associations, function (num) { return num.number == $scope.ReportConfig.AssociationsId; });
                                    if (orgh != undefined) {
                                        $scope.Orghorses.push(dataArray[i]);
                                    }
                                }
                            }
                        }

                        $scope.rides = $firebaseArray(ref.child('rides'));
                        $scope.rides.$loaded().then(function (rideArray) {
                            $scope.RidesData = rideArray;


                            $scope.coords = $firebaseArray(ref.child('coords'));
                            $scope.coords.$loaded().then(function (cordsArray) {

                                $scope.CordsData = cordsArray;

                                $scope.rows = [];
                                $scope.getHeader = [];
                                $scope.isHeaderCreated = false;
                                angular.forEach($scope.Orghorses, function (value, key) {

                                    var row = {}

                                    //horse name logic
                                    if (!$scope.isHeaderCreated)
                                        $scope.getHeader.push("Horse Name");
                                    row.HorseName = value.horse_name;



                                    var totalTopSspeed = [];
                                    var averageSpeed = 0.0;

                                    $scope.totalLength = 0;
                                    $scope.totalTopSspeed = 0.0;
                                    $scope.totalAverageSpeed = 0.0;
                                    $scope.totalDistance = 0.0;
                                    $scope.totalDuration = 0;
                                    $scope.totalEnergy = 0;
                                    $scope.rideCount = 0;

                                    $scope.isRideExist = false;
                                    for (var id in value.ride_ids) {
                                        var ride = $scope.RidesData.$getRecord(id);

                                        if (ride) {

                                            $scope.totalLength = $scope.totalLength + 1;
                                            $scope.totalDistance = parseFloat($scope.totalDistance) + parseFloat(ride.total_distance);
                                            $scope.totalDuration = parseInt($scope.totalDuration) + parseInt(ride.total_time);
                                            $scope.totalEnergy = parseFloat($scope.totalEnergy) + parseFloat(ride.energy);
                                            $scope.totalCalories = parseFloat($scope.totalCalories) + parseFloat(ride.calories);
                                            //$scope.totalAverageSpeed = $scope.totalAverageSpeed + ride.average_speed;
                                            //$scope.totalTopSspeed = $scope.totalTopSspeed + ride.top_speed;
                                            averageSpeed = parseFloat(averageSpeed) + parseFloat(ride.average_speed);
                                            totalTopSspeed.push(parseFloat(ride.top_speed));
                                            $scope.isRideExist = true;

                                            if (ride.ismanualride == 1) {
                                                $scope.rideCount++;

                                            }

                                        }

                                    }

                                    if ($scope.isRideExist) {
                                        $scope.totalDistance = parseFloat(Math.round($scope.totalDistance * 100) / 100).toFixed(2);
                                        $scope.totalEnergy = parseFloat(Math.round($scope.totalEnergy * 100) / 100).toFixed(2);
                                        $scope.totalCalories = parseFloat(Math.round($scope.totalCalories * 100) / 100).toFixed(2);

                                        $scope.totalAverageSpeed = averageSpeed / $scope.totalLength;

                                        $scope.totalAverageSpeed = parseFloat(Math.round($scope.totalAverageSpeed * 100) / 100).toFixed(2);

                                        $scope.totalDuration = hhmmss($scope.totalDuration);

                                        $scope.totalTopSspeed = Math.max.apply(Math, totalTopSspeed);

                                        $scope.totalTopSspeed = parseFloat(Math.round($scope.totalTopSspeed * 100) / 100).toFixed(2);

                                    }
                                    else {
                                        $scope.totalLength = 0;
                                        $scope.totalTopSspeed = 0.0;
                                        $scope.totalAverageSpeed = 0.0;
                                        $scope.totalDistance = 0.0;
                                        $scope.totalDuration = 0;
                                        $scope.totalEnergy = 0;
                                    }


                                    if ($scope.ReportConfig.IsTopSpeed == "1") {
                                        //TopSpeed logic
                                        if (!$scope.isHeaderCreated)
                                            $scope.getHeader.push("Top Speed");
                                        row.TopSpeed = $scope.totalTopSspeed + " mph";
                                    }

                                    if ($scope.ReportConfig.IsAvgSpeed == "1") {
                                        //AvarageSpeed logic
                                        if (!$scope.isHeaderCreated)
                                            $scope.getHeader.push("Avarage Speed");
                                        row.AvarageSpeed = $scope.totalAverageSpeed + " mph";
                                    }

                                    if ($scope.ReportConfig.IsDistance == "1") {
                                        //RideDistance logic
                                        if (!$scope.isHeaderCreated)
                                            $scope.getHeader.push("Ride Distance");
                                        row.RideDistance = $scope.totalDistance + " miles";
                                    }

                                    if ($scope.ReportConfig.IsRideCount == "1") {
                                        //TopSpeed logic
                                        if (!$scope.isHeaderCreated)
                                            $scope.getHeader.push("No of rides");
                                        row.RideCount = $scope.totalLength;
                                    }

                                    if ($scope.ReportConfig.IsHours == "1") {
                                        //TotalHours logic
                                        if (!$scope.isHeaderCreated)
                                            $scope.getHeader.push("Total Hours");
                                        row.TotalHours = $scope.totalDuration;

                                        if (!$scope.isHeaderCreated)
                                            $scope.getHeader.push("Ride Hours");
                                        row.RideHours = $scope.totalDuration;
                                    }

                                    if ($scope.ReportConfig.IsEnergy == "1") {
                                        //EnergyBurned logic
                                        if (!$scope.isHeaderCreated)
                                            $scope.getHeader.push("Energy Burned");
                                        row.EnergyBurned = $scope.totalEnergy + " cal";
                                    }

                                    if ($scope.ReportConfig.IsCords == "1") {
                                        if (!$scope.isHeaderCreated)
                                            $scope.getHeader.push("Start Cordinate");

                                        if (!$scope.isHeaderCreated)
                                            $scope.getHeader.push("Last Cordinate");

                                        var ids = [];
                                        var vals = [];

                                        $scope.coordId = -1;

                                        try {
                                            for (var i in value.ride_ids) {
                                                ids.push({
                                                    Id: i, Val: value.ride_ids[i]
                                                });
                                                vals.push(value.ride_ids[i]);
                                            }
                                        }
                                        catch (errloop) {
                                            // // console.log(errloop);
                                        }

                                        var max = Math.max.apply(Math, vals);

                                        for (var i = 0; i < ids.length; i++) {
                                            var o = ids[i];
                                            if (o.Val == max)
                                                $scope.coordId = o.Id;// '-KP44cqcDIZo4G5-ziq4'
                                        }

                                        if ($scope.coordId == -1) {
                                            row.StartCordinate = "Not Available";
                                            row.LastCordinate = "Not Available";
                                        }
                                        else {
                                            var coordinate = $scope.CordsData.$getRecord($scope.coordId);

                                            if (coordinate != null) {
                                                //StartCordinate logic

                                                try {
                                                    var start = coordinate[0];
                                                    row.StartCordinate = start.lat + "," + start.lng;
                                                }
                                                catch (coorerror) {
                                                    row.StartCordinate = "Not Available";
                                                }

                                                try {
                                                    var end = coordinate[coordinate.length - 1];
                                                    row.LastCordinate = end.lat + "," + end.lng;
                                                }
                                                catch (endcorderror) {

                                                    try {
                                                        var counters = [];
                                                        for (cnt in coordinate) {
                                                            if (cnt != "$priority" && cnt != "$id") {
                                                                counters.push(cnt);
                                                            }
                                                        }
                                                        //var max = Math.max.apply(Math, counters);
                                                        var endindex = counters[counters.length - 1];//coordinate[max];
                                                        var end = coordinate[parseInt(endindex)];
                                                        row.LastCordinate = end.lat + "," + end.lng;
                                                    }
                                                    catch (newerror) {
                                                        row.LastCordinate = "Not Available";
                                                    }

                                                }
                                            }
                                            else {
                                                row.StartCordinate = "Not Available";
                                                row.LastCordinate = "Not Available";
                                            }
                                        }
                                    }

                                    if (!$scope.isHeaderCreated)
                                        $scope.getHeader.push("Manual Ride");
                                    row.ManualRideCount = $scope.rideCount;

                                    $scope.isHeaderCreated = true;

                                    $scope.rows.push(row);

                                });

                                $scope.filename = "EquitrackReport";

                                $scope.showDownloadButton = true;


                                $scope.getArray = $scope.rows;

                                try {
                                    $scope.$apply(function () {
                                        blockUI.stop();
                                    });
                                }
                                catch (error) {

                                }
                            }).catch(function (err) { });

                        }).catch(function (err) { });


                    }).catch(function (error) { // // console.log("Error in loading details"); });


                }).catch(function (error) {
                    // // console.log("Error in loading details" + error);
                });
            }
        }).catch(function (error) {
            // // console.log("Error in loading details");
        });

   
});
