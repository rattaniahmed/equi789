app.controller('StableDetailsController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI, $http) {

    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    $scope.stb = storageService.getObject("CS");
    $scope.AgeToDisplay = ""; // 7 year old";

    try {

        var today = new Date();
        var d = new Date($scope.stb.birthday);

        if (Object.prototype.toString.call(d) === "[object Date]") {
            // it is a date
            if (isNaN(d.getTime())) {  // d.valueOf() could also work
                // date is not valid
            }
            else {

                var diff = today - d;
                var days = parseInt(diff / 1000 / 60 / 60 / 24);
                console.log(days);

                var year = parseInt(days / 365);


                if (year == 1)
                    $scope.AgeToDisplay = "1 year, ";
                else
                    $scope.AgeToDisplay = year + " years, ";

                var remainDay = parseInt(days % 365);

                var month = parseInt(remainDay / 30);

                if (month == 1)
                    $scope.AgeToDisplay += "1 month ";
                else
                    $scope.AgeToDisplay += month + " months ";

                //$scope.AgeToDisplay += "old";

            }
        }
        else {
            // not a date
        }


    }
    catch (err) {

    }

    //for (var i = 0 ; i < 4; i++) {
    //    try {
    //        if (IsNull($scope.stb.associations[i].name))
    //            $scope.stb.associations[i].name = "";

    //    }
    //    catch (err) {
    //        $scope.stb.associations[i].name = "";
    //    }

    //    try {
    //        if (IsNull($scope.stb.associations[i].number))
    //            $scope.stb.associations[i].number = "";

    //    }
    //    catch (err) {
    //        $scope.stb.associations[i].number = "";
    //    }
    //}

    $scope.OpenAddRidePopup = function () {
        console.log("using this");
        $("#add_ride").modal();
        $('#StartRide').datetimepicker();
        $('#EndRide').datetimepicker();

    }// = "#add_ride"
    $scope.CloseAddRideModal = function () {
        $("#add_ride").hide();
    }

    $scope.totalRidesDetails = [];
    $scope.totalLength = 0;
    $scope.totalDistance = 0.0;
    $scope.totalDuration = 0;
    $scope.totalEnergy = 0;
    $scope.totalCalories = 0;
    $scope.totalAverageSpeed = 0.0;
    $scope.totalTopSspeed = 0;



    $scope.ShareObject = null;

    $scope.SocialShare = function () {

        $("#sharemodal").show();
    }

    $scope.IsDataExist = function () {
        $("#sharemodal").hide();
        $(".modal-backdrop").remove();
        $('body').removeClass('modal-open');

        console.log($scope.ShareObject);
        console.log($scope.user);

        if ($scope.IsRideExist) {
            return true;
        }
        else {
            alert("No ride details exist for sharing");
            return false;
        }
    }




    $scope.IsRideExist = false;

    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.rides.$loaded().then(function (dataArray) {
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id


        var totalTopSspeed = [];
        var averageSpeed = 0.0;
        for (var id in $scope.stb.ride_ids) {
            var ride = $scope.rides.$getRecord(id);
            //$scope.totalRidesDetails.push(ride);

            if (ride != null) {

                $scope.IsRideExist = true;

                $scope.totalLength = $scope.totalLength + 1;
                $scope.totalDistance = parseFloat($scope.totalDistance) + parseFloat(ride.total_distance);
                $scope.totalDuration = parseInt($scope.totalDuration) + parseInt(ride.total_time);
                $scope.totalEnergy = parseFloat($scope.totalEnergy) + parseFloat(ride.energy);
                $scope.totalCalories = parseFloat($scope.totalCalories) + parseFloat(ride.calories);
                //$scope.totalAverageSpeed = $scope.totalAverageSpeed + ride.average_speed;
                //$scope.totalTopSspeed = $scope.totalTopSspeed + ride.top_speed;
                averageSpeed = parseFloat(averageSpeed) + parseFloat(ride.average_speed);
                totalTopSspeed.push(parseFloat(ride.top_speed));



            }
        }

        $scope.totalDistance = parseFloat(Math.round($scope.totalDistance * 100) / 100).toFixed(2);
        $scope.totalEnergy = parseFloat(Math.round($scope.totalEnergy * 100) / 100).toFixed(2);
        $scope.totalCalories = parseFloat(Math.round($scope.totalCalories * 100) / 100).toFixed(2);

        $scope.totalAverageSpeed = averageSpeed / $scope.totalLength;

        $scope.totalAverageSpeed = parseFloat(Math.round($scope.totalAverageSpeed * 100) / 100).toFixed(2);

        $scope.totalDuration = hhmmss($scope.totalDuration);

        $scope.totalTopSspeed = Math.max.apply(Math, totalTopSspeed);

        $scope.totalTopSspeed = parseFloat(Math.round($scope.totalTopSspeed * 100) / 100).toFixed(2);


        debugger;
        var horse = $scope.stb;
        var pic = $scope.stb.photo;
        if ($scope.stb.photo.indexOf("horsePlaceHolder") >= 0) {
            pic = "https://myequitrack.com/" + pic;

            var obj = {
                method: 'feed',
                title: "I rode " + horse.horse_name + " for " + hhmmss2($scope.totalDuration) + " and covered " + $scope.totalDistance + " miles at an average speed of " + $scope.totalAverageSpeed,
                link: 'https://myequitrack.com/',
                caption: 'https://myequitrack.com/',
                picture: pic,
                description: "Find more details on www.myequitrack.com"
            }

            $scope.ShareObject = obj;

        }
        else {
            pic = $scope.stb.photo.replace("data:image/jpeg;base64,", "");
            var blob = b64toBlob(pic, "image/png");
            var metadata = {
                'contentType': blob.type
            };

            var fname = Math.random().toString(36).substring(7) + ".jpg";// +file.name.substring(file.name.indexOf("."));
            var storageRef = firebase.storage().ref();
            storageRef.child('shares/' + fname).put(blob, metadata).then(function (snapshot) {
                debugger;
                var url = snapshot.metadata.downloadURLs[0];
                console.log(url)

                pic = url;

                var obj = {
                    method: 'feed',
                    title: "I rode " + horse.horse_name + " for " + hhmmss2($scope.totalDuration) + " and covered " + $scope.totalDistance + " miles at an average speed of " + $scope.totalAverageSpeed,
                    link: 'https://myequitrack.com/',
                    caption: 'https://myequitrack.com/',
                    picture: pic,
                    description: "Find more details on www.myequitrack.com"
                }

            }).catch(function (error) {
                console.error('Upload failed:', error);
            });

        }



    }).catch(function (err) {

    });

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }


    $scope.MoveToLastRide = function () {
        if ($scope.IsRideExist)
            $location.path('last-ride.html');
        else
            alert("No ride exist for this horse");
    }

    $scope.markers = [];
    function addMarker(location) {
        if ($scope.markers.length == 2) {
            alert("you can set only start and end marers , to change the position , double click on previous marker to delete");
        }
        else {

            var iconurl = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";

            if ($scope.markers.length == 1) {
                var marker = $scope.markers[0];
                if (marker.icon == iconurl)
                    iconurl = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
            }


            var marker = new google.maps.Marker({
                icon: iconurl,
                position: location,
                map: $scope.map
            });

            $scope.markers.push(marker);

            marker.addListener("dblclick", function () {


                var indexToRemove = -1;
                for (var m = 0 ; m < $scope.markers.length; m++) {
                    var mt = $scope.markers[m];
                    if (marker.position.lat() == mt.position.lat() && marker.position.lng() == mt.position.lng()) {
                        indexToRemove = m;
                    }
                }
                $scope.markers.splice(indexToRemove, 1);

                console.log($scope.markers);

                marker.setMap(null);

            });


        }
    }

    $scope.StartMap = function (lat, lng) {

        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: lat, lng: lng },
            zoom: 14,
            mapTypeId: 'terrain'
        });

        $scope.map = map;

        $scope.map.addListener('click', function (event) {
            addMarker(event.latLng);
        });

    }

    $scope.initMap = function () {


        var lat = 31.968599;
        var lng = -99.901813;

        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.StartMap(pos.coords.latitude, lng = pos.coords.longitude);
        }, function () {
            $scope.StartMap(lat, lng);
        }, {
            maximumAge: 0,
            frequency: 3000,
            enableHighAccurancy: true
        });




    }

    $scope.initMap();



});
