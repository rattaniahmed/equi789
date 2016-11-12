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

        //var currentRide = storageService.getObject("AddedRIDE");
        //currentRide.coords = false;
        //$scope.AddRideTODAtabase(currentRide);

        window.location.reload();
    }

    $scope.AddRideTODAtabase = function (currentRide) {

        blockUI.start("Adding horse Ride.....");
        $scope.horses.$add(currentRide).then(function (ref) {
            debugger;
            var id = ref.key();
            console.log("added record with id " + id);

            //swal("", "Your Ride has been added success fully", "success");
            //$location.path('my-stable.html');
            debugger;

            if (IsNull($scope.currenthorse.ride_ids)) {
                $scope.currenthorse['ride_ids'] = {};
            }

            var d = new Date();
            $scope.currenthorse.ride_ids[id] = d.getTime();

            //$scope.user.Details.horse_ids.push(id);
            storageService.setObject("CS", $scope.currenthorse);

            var currenthorseRef = $scope.horserepo.$getRecord($scope.currenthorse.$id);

            if (IsNull(currenthorseRef.ride_ids)) {
                currenthorseRef['ride_ids'] = {};
            }

            currenthorseRef.ride_ids[id] = d.getTime();

            $scope.horserepo.$save(currenthorseRef).then(function (res) {


                //$('#map').modal('show');

                window.location.reload();

                console.log(res);
                //$scope.user.Details.profile = userRef.profile;
                $scope.$apply(function () {
                    blockUI.stop();
                });
                swal("", "Your Ride has been add success fully", "success");

            }).catch(function (err) {
                console.log(err);

            });


        });
    }



});