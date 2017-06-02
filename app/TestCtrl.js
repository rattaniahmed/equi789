app.controller('TestCtrl', function MyCtrl($scope, $location, $firebaseObject, firebaseService, $rootScope, $firebaseArray) {

    //$scope.Start = function (i) {

    //    if (i > $scope.HorseArrayData.length)
    //        return;

    //    var horse = $scope.HorseArrayData[i];
    //    var str = ";base64,";
    //    if (horse && horse.photo) {
    //        if (horse.photo.indexOf(str) > 0) {

    //            var id = horse.$id;
    //            var pic = horse.photo.replace("data:image/jpeg;base64,", "");
    //            pic = pic.replace("data:image/png;base64,", "");
    //            var blob = b64toBlob(pic, "image/png");
    //            var metadata = {
    //                'contentType': blob.type
    //            };

    //            var fname = generateUniqueID() + ".jpg";
    //            var storageRef = firebase.storage().ref();
    //            storageRef.child('horses/' + fname).put(blob, metadata).then(function (snapshot) {
    //                var url = snapshot.metadata.downloadURLs[0];



    //                firebase.database().ref('/horses/' + id + '/photo').set(url);
    //                $scope.Start(i + 1);

    //            }).catch(function (error) {
    //                console.error('Upload failed:', error);
    //            });
    //        }
    //        else {
    //            $scope.Start(i + 1);
    //        }
    //    }
    //    else {
    //        $scope.Start(i + 1);
    //    }
    //}

    //$scope.HorseArrayData = [];
    //$scope.ChangeHorseImages = function () {


    //    var ref = firebaseService.FIREBASEENDPOINT();
    //    $rootScope.appHorses = $firebaseArray(ref.child('horses'));
    //    $rootScope.appHorses.$loaded().then(function (dataArray) {

    //        debugger;
    //        $scope.HorseArrayData = dataArray;

    //        $scope.Start(0);



    //    });

    //}

    //debugger;
    //$scope.ChangeHorseImages();




    //$scope.Start = function (i) {

    //    if (i > $scope.RideData.length)
    //        return;

    //    var ride = $scope.RideData[i];
    //    var str = ";base64,";
    //    if (ride && ride.photo) {
    //        if (ride.photo.indexOf(str) > 0) {

    //            var id = ride.$id;
    //            var pic = ride.photo.replace("data:image/jpeg;base64,", "");
    //            pic = pic.replace("data:image/png;base64,", "");
    //            var blob = b64toBlob(pic, "image/png");
    //            var metadata = {
    //                'contentType': blob.type
    //            };

    //            var fname = generateUniqueID() + ".jpg";
    //            var storageRef = firebase.storage().ref();
    //            storageRef.child('horses/' + fname).put(blob, metadata).then(function (snapshot) {
    //                var url = snapshot.metadata.downloadURLs[0];



    //                firebase.database().ref('/horses/' + id + '/photo').set(url);
    //                $scope.Start(i + 1);

    //            }).catch(function (error) {
    //                console.error('Upload failed:', error);
    //            });
    //        }
    //        else {
    //            $scope.Start(i + 1);
    //        }
    //    }
    //    else {
    //        $scope.Start(i + 1);
    //    }
    //}

    //$scope.RideData = [];
    //$scope.ChangeRideData = function () {


    //    var ref = firebaseService.FIREBASEENDPOINT();
    //    $rootScope.appHorses = $firebaseArray(ref.child('rides'));
    //    $rootScope.appHorses.$loaded().then(function (dataArray) {

    //        debugger;
    //        $scope.RideData = dataArray;

    //        $scope.Start(0);



    //    });

    //}


    $scope.StartRideCord = function (i) {

        //if (i > $scope.RideData.length)
        //    return;

        //var ride = $scope.RideData[i];
        //var str = ";base64,";
        //if (ride && ride.photo) {
        //    if (ride.photo.indexOf(str) > 0) {

        //        var id = ride.$id;
        //        var pic = ride.photo.replace("data:image/jpeg;base64,", "");
        //        pic = pic.replace("data:image/png;base64,", "");
        //        var blob = b64toBlob(pic, "image/png");
        //        var metadata = {
        //            'contentType': blob.type
        //        };

        //        var fname = generateUniqueID() + ".jpg";
        //        var storageRef = firebase.storage().ref();
        //        storageRef.child('horses/' + fname).put(blob, metadata).then(function (snapshot) {
        //            var url = snapshot.metadata.downloadURLs[0];



        //            firebase.database().ref('/horses/' + id + '/photo').set(url);
        //            $scope.Start(i + 1);

        //        }).catch(function (error) {
        //            console.error('Upload failed:', error);
        //        });
        //    }
        //    else {
        //        $scope.Start(i + 1);
        //    }
        //}
        //else {
        //    $scope.Start(i + 1);
        //}
    }


    $scope.StartUpdateRide = function () {

    }

    $scope.updateRide = function (rideId) {
        //var rideId = "-KbnP4EcoYDiqQxFVolC";
        var rideRef = $rootScope.appHorses.$getRecord(rideId);
        var coord = $scope.coords.$getRecord(rideId);
        if (coord) {
            if (rideRef && (!(rideRef.start_cord))) {
                var len = coord.length;
                var start_cord = { lat: coord[0].lat, lng: coord[0].lng }
                var end_cord = { lat: coord[len - 1].lat, lng: coord[len - 1].lng }
                var coords = true;
                firebase.database().ref('/rides/' + rideId + '/start_cord').set(start_cord);
                firebase.database().ref('/rides/' + rideId + '/end_cord').set(end_cord);
                firebase.database().ref('/rides/' + rideId + '/coords').set(coords);
            }
        }
    }

    $scope.ChangeRideData = function () {
        var ref = firebaseService.FIREBASEENDPOINT();
        $rootScope.appHorses = $firebaseArray(ref.child('rides'));
        $rootScope.appHorses.$loaded().then(function (ridedataArray) {
            $scope.coords = $firebaseArray(ref.child('coords'));
            $scope.coords.$loaded().then(function (corddataArray) {

                debugger;

                $scope.RideData = ridedataArray;
                $scope.CordData = corddataArray;

                //$scope.Start(0);

                
                for (var rcounter = 0; rcounter < 500; rcounter++) {
                    var rideId = $scope.RideData[rcounter].$id;
                    $scope.updateRide(rideId);
                    console.log("UPdated ride - " + rideId);
                }
            });

        });
    }
    debugger;
    $scope.ChangeRideData();

});