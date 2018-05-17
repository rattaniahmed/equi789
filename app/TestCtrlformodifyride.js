app.controller('TestCtrlforride', function MyCtrl($scope, $location, $firebaseObject, firebaseService, $rootScope, $firebaseArray) {
    debugger
    $scope.changeRide = function (index) {
        var timeout = 10;
        var maxloop = 1000;
        var maxride = $scope.RidesArrayData.length < maxloop ? $scope.RidesArrayData.length - 1 : maxloop;

        var ride = $scope.RidesArrayData[index];

        if (ride.heartrate) {
            timeout = 300;
            firebase.database().ref('/heartrates/' + ride.$id).set(ride.heartrate);
            firebase.database().ref('/rides/' + ride.$id + '/heartrate').set(null);
        }
        if (ride.altitude) {
            timeout = 300;
            firebase.database().ref('/altitudes/' + ride.$id).set(ride.altitude);
            firebase.database().ref('/rides/' + ride.$id + '/altitude').set(null);
        }
        if (ride.speed) {
            timeout = 300;
            firebase.database().ref('/speeds/' + ride.$id).set(ride.speed);
            firebase.database().ref('/rides/' + ride.$id + '/speed').set(null);
        }

        if (index < maxride) {
            setTimeout(function () {
                $scope.changeRide(index + 1);
            }, timeout);
        }

    //if (ride.altitude)
    //    if (ride.speed)
    ////push to new heartrates 
    //firebase.database().ref('/rides/' + ride.$id + '/hearat').set(null);

    //if (ride.contins, heartrate spped or alltiute){
    //    firebase.database().ref('/rides/' + ride.$id + '/hearat').set(null);

    //    if (ride.contins, heartrate spped or alltiute){
    //        firebase.database().ref('/rides/' + ride.$id + '/hearat').set(null);

    //        if (index < 4) {
    //            setTimeout(function () {
    //                $scope.changeRide(index + 1);
    //            }, 300);
    //        }
        }

    $scope.ManipualteRide = function () {
        var ref = firebaseService.FIREBASEENDPOINT();
        $scope.appRides = $firebaseArray(ref.child('rides'));
        $scope.appRides.$loaded().then(function (dataArray) {

            $scope.RidesArrayData = [];

            for (var i = 0; i < dataArray.length; i++) {
                
                    var ride = dataArray[i];
                    if (ride.heartrate || ride.altitude || ride.speed) {
                        $scope.RidesArrayData.push(ride);
                    }
                
            }

            console.log($scope.RidesArrayData.length);

            if ($scope.RidesArrayData.length > 1)
                $scope.changeRide(0);

        });
    }


    $scope.ManipualteHorse = function () {
        var ref = firebaseService.FIREBASEENDPOINT();
        $scope.appHorses = $firebaseArray(ref.child('horses'));
        $scope.appHorses.$loaded().then(function (dataArray) {

            $scope.finalArray = [];

            $scope.horse_ids = [];
            for (var i = 0; i < dataArray.length; i++) {
                var horse = dataArray[i];
                if (!horse.user_firebase_key) {
                    $scope.horse_ids.push(horse.$id);
                }
            }

            console.log($scope.horse_ids.length);

            if ($scope.horse_ids.length > 1) {
                $scope.appUsers = $firebaseArray(ref.child('users'));
                $scope.appUsers.$loaded().then(function (dataArray1) {

                    for (var i = 0; i < dataArray1.length; i++) {
                        var user = dataArray1[i];
                        if (user.horse_ids) {
                            for (var j in user.horse_ids) {
                                var hid = j;
                                if ($scope.horse_ids.indexOf(hid) >= 0) {
                                    $scope.finalArray.push({ HID: hid, UID: user.$id });
                                }
                            }
                        }
                    }
                    console.log($scope.finalArray);
                    debugger
                    if ($scope.finalArray.length > 1) {
                        $scope.changeHorse(0);
                    }

                });
            }
        });
    }

    $scope.changeHorse=function (index) {
        var timeout = 10;
        var maxloop = 1;
        var maxride = $scope.finalArray.length < maxloop ? $scope.finalArray.length - 1 : maxloop;

        var horse = $scope.finalArray[index];

      //  if (horse) {
            timeout = 300;
            firebase.database().ref('/horses/' + horse.HID + '/user_firebase_key').set(horse.UID);
      //  }

        if (index < maxride) {
            setTimeout(function () {
                $scope.changeHorse(index + 1);
            }, timeout);
        }
    }
});

  