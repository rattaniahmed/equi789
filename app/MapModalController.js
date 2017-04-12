app.controller('MapModalController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {

    console.log("MapModalController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.coords = $firebaseArray(ref.child('coords'));
    $scope.horses = $firebaseArray(ref.child('rides'));
    $scope.users = $firebaseArray(ref.child('users'));
    $scope.horserepo = $firebaseArray(ref.child('horses'));
    $scope.currenthorse = storageService.getObject("CS");

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }
   
    $scope.CheckNumber=function(event)
    {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 13 || event.keyCode == 8 || event.keyCode == 9) { }
        else
        {
            alert("Only Digits you can press")
            event.preventDefault();
        }
    }

    $scope.SaveCoods = function () {

        if ($scope.markers.length < 2) {
            alert("Please select start and end corodinate before saving the ride");
        }
        else {
            var currentRide = storageService.getObject("AddedRIDE");
            currentRide.start_cord = { lat: $scope.markers[0].position.lat(), lng: $scope.markers[0].position.lng() }
            currentRide.end_cord = { lat: $scope.markers[1].position.lat(), lng: $scope.markers[1].position.lng() }
            currentRide.coords = true;
            $scope.AddRideTODAtabase(currentRide);
        }
    }

    $scope.CancelCoods = function () {

        var currentRide = storageService.getObject("AddedRIDE");
        currentRide.coords = false;
        $scope.AddRideTODAtabase(currentRide);

        //window.location.reload();
    }

    $scope.AddRideTODAtabase = function (currentRide) {
        debugger;
        blockUI.start("Adding horse Ride.....");
        var pushRef = firebase.database().ref('rides').push();
        pushRef.set(currentRide);
        var id = pushRef.key;


        if (IsNull($scope.currenthorse.ride_ids)) {
            $scope.currenthorse['ride_ids'] = {};
        }
        var d = new Date();
        $scope.currenthorse.ride_ids[id] = d.getTime();
        storageService.setObject("CS", $scope.currenthorse);


        firebase.database().ref('/horses/' + $scope.currenthorse.$id + '/ride_ids').set($scope.currenthorse.ride_ids);
        swal("", "Your Ride has been add success fully", "success");
        window.location.reload();
        $scope.$apply(function () {
            blockUI.stop();
        });
    }
});