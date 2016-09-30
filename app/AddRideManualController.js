app.controller('AddRideManualController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    $scope.init = function () {
        $(function () {
            $('#StartRide').datetimepicker();
        });

        $(function () {
            $('#EndRide').datetimepicker();
        });


        //$(function () {
        //    $('#RideTime').datetimepicker({
        //        format: 'LT'
        //    });
        //});

        //$(function () {
        //    $('#TotalTime').datetimepicker({
        //        format: 'LT'
        //    });
        //});





    }

    console.log("AddRideManualController");
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

    //$('.datepicker').datepicker();

    $("#addphoto").change(function () {
        readURL(this);
    });


    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                //alert(e.target.result);
                $('#addImg').attr('src', e.target.result);
                $scope.stbadd.photo = e.target.result;
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $scope.init();
    $scope.assolist = [
        { name: "", number: "" },
          { name: "", number: "" },
            { name: "", number: "" },
              { name: "", number: "" },
    ];

    $scope.addride = {
        average_heart_rate:"",
        average_speed: "",
        calories:"",
        end_time: "",
        energy: "",
        ground_condition: "",
        high_heart_rate:"",
        location:"",
        ride_time:"",
        start_time:"",
        top_speed:"",
        total_distance:"",
        total_time:"",
        weather: "",
        ismanualride:1
    }
   
    $scope.SaveStable = function () {
       
        $scope.addride.start_time = document.getElementById("StartRide").value;
        $scope.addride.end_time = document.getElementById("EndRide").value;
        //$scope.addride.ride_time = document.getElementById("RideTime").value;
        //$scope.addride.total_time = document.getElementById("TotalTime").value;

        console.log($scope.addride)
        storageService.setObject("AddedRIDE", $scope.addride);
        $("#add_ride").hide();
        $("#mapModal").show();
    }


    //var places = new google.maps.places.Autocomplete(document.getElementById('location'));
    //google.maps.event.addListener(places, 'place_changed', function () {
    //    var place = places.getPlace();
    //    var address = place.formatted_address;
    //    var latitude = place.geometry.location.lat();
    //    var longitude = place.geometry.location.lng();
    //    var mesg = "Address: " + address;
    //    mesg += "\nLatitude: " + latitude;
    //    mesg += "\nLongitude: " + longitude;
    //    alert(mesg);
    //});


    $scope.location=function()
    {

        var map_options = {
            center: new google.maps.LatLng(-6.21, 106.84),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), map_options);

        var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-6, 106.6),
            new google.maps.LatLng(-6.3, 107)
        );

        var input = document.getElementById("location");
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo("bounds", map);

        var marker = new google.maps.Marker({ map: map });

        google.maps.event.addListener(autocomplete, "place_changed", function () {
            var place = autocomplete.getPlace();

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(15);
            }

            marker.setPosition(place.geometry.location);
        });

        google.maps.event.addListener(map, "click", function (event) {
            marker.setPosition(event.latLng);
        });

    }
    $scope.location();
    $scope.CheckNumber=function(event)
    {
       

        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 13 || event.keyCode == 8 || event.keyCode == 9) { }
        else
        {
            alert("Only Digits you can press")
            event.preventDefault();
        }

    }

    //$scope.initMap=function() {
    //    var directionsService = new google.maps.DirectionsService;
    //    var directionsDisplay = new google.maps.DirectionsRenderer;
    //    var map = new google.maps.Map(document.getElementById('map'), {
    //        zoom: 7,
    //        center: { lat: 41.85, lng: -87.65 }
    //    });
    //    directionsDisplay.setMap(map);

    //    //var onChangeHandler = function () {
    //    //    calculateAndDisplayRoute(directionsService, directionsDisplay);
    //    //};
    //    //document.getElementById('pac-input').addEventListener('change', onChangeHandler);
    //    //document.getElementById('pac-input1').addEventListener('change', onChangeHandler);

    //        var input = document.getElementById('pac-input');
    //        var searchBox = new google.maps.places.SearchBox(input);
    //        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    //        // Bias the SearchBox results towards current map's viewport.
    //        map.addListener('bounds_changed', function () {
    //            searchBox.setBounds(map.getBounds());
    //        });
    //        searchBox.addListener('places_changed', function () {
    //            //        var places = searchBox.getPlaces();

    //            //        if (places.length == 0) {
    //            //            return;
    //            //        }
    //            console.log("Sdfsdfdsf");
    //        });

    //        var input1 = document.getElementById('pac-input1');
    //        var searchBox1 = new google.maps.places.SearchBox(input1);
    //        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input1);

    //    // Bias the SearchBox results towards current map's viewport.
    //        map.addListener('bounds_changed', function () {
    //            searchBox.setBounds(map.getBounds());
    //        });
    //        searchBox.addListener('places_changed', function () {
    //            //        var places = searchBox.getPlaces();

    //            //        if (places.length == 0) {
    //            //            return;
    //            //        }
    //            console.log("Sdfsdfdsf");
    //        });

    //}

    //function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    //    directionsService.route({
    //        origin: document.getElementById('pac-input').value,
    //        destination: document.getElementById('pac-input1').value,
    //        travelMode: 'DRIVING'
    //    }, function (response, status) {
    //        if (status === 'OK') {
    //            directionsDisplay.setDirections(response);
    //        } else {
    //            window.alert('Directions request failed due to ' + status);
    //        }
    //    });
    //}
    //$scope.initMap();
   


    $scope.SaveMap = function ()
    {
   
        var currentRide = storageService.getObject("AddedRIDE");

        
        debugger;
        //var obj = {  0: { lat: 23.4545, lng: 12.4546565 }, 1: { lat: 23.4545, lng: 12.4546565 } } ;

        //var currentRide = ///get from local storageService

        currentRide.start_cord = { lat: 23.3454354, lng: 12.3454354 };
        currentRide.end_cord = { lat: 23.3454354, lng: 12.3454354 };

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

            });


        });

   }


});