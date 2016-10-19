app.controller('AddRideManualController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    $scope.init = function () {

        $(function () {
            $('#StartRide').datetimepicker();
        });

        $(function () {
            $('#EndRide').datetimepicker();
        });
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
        if ($scope.addride.start_time == "" )
        {
            swal({ title: '', text: 'STARTING TIME CAN NOT BE NULL', type: 'warning' });
        }

       else if($scope.addride.end_time == "")
       {
           swal({ title: '', text: 'ENDING TIME CAN NOT BE NULL', type: 'warning' });

         

       }
    

       else if ($scope.addride.total_distance == "") {

           swal({ title: '', text: 'TOTAL DISTANCE TIME CAN NOT BE NULL', type: 'warning' });
     

       }
     


        else {
           console.log($scope.addride)

           var distance =100;
           var time = 110;
           var speed = distance/time;
           
               $scope.addride.average_speed = speed;
               $scope.addride.calories = "0";
               $scope.addride.energy = "0";
               $scope.addride.ride_time = time;
               $scope.addride.top_speed = speed;
               $scope.addride.total_time = time;
               $scope.addride.ismanualride = 1;
           


            storageService.setObject("AddedRIDE", $scope.addride);
            $("#add_ride").hide();
            //$("#mapModal").show();

            $scope.AddRideTODAtabase($scope.addride);
        }
        

        //google.maps.event.trigger(map, 'resize', {});
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
        debugger;
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
   
    $scope.flightPath = null;
    $scope.directionsService = new google.maps.DirectionsService;
    $scope.directionsDisplay = new google.maps.DirectionsRenderer;
    $scope.initAutocomplete = function () {

        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -33.8688, lng: 151.2195 },
            zoom: 14,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            mapTypeId: 'terrain'

        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var input1 = document.getElementById('pac-input1');
        var searchBox1 = new google.maps.places.SearchBox(input1);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input1);

        //// Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });

        map.addListener('bounds_changed1', function () {
            searchBox1.setBounds(map.getBounds());
        });


        var markers = [];
        var markers1 = [];

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.

        $scope.coords = [];
        $scope.startSelected = false;
        $scope.endSelected = false;

        $scope.directionsDisplay.setMap(map);

        searchBox.addListener('places_changed', function () {
            debugger;
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }
            //console.log(markers);
            $scope.startSelected = true;
            $scope.coords[0] = { lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng() };

            if ($scope.startSelected && $scope.endSelected) {

                if ($scope.flightPath != null)
                    $scope.flightPath.setMap(null);


                $scope.flightPath = new google.maps.Polyline({
                    path: $scope.coords,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                DrawMap2(map, $scope.coords, $scope.flightPath, $scope.directionsService, $scope.directionsDisplay);
            }
            //// Clear out the old markers.
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];

            //// For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                //Create a marker for each place.
                //markers.push(new google.maps.Marker({
                //    map: map,
                //    icon: icon,
                //    title: place.name,
                //    position: place.geometry.location
                //}));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });

        searchBox1.addListener('places_changed', function () {
            debugger;
            var places = searchBox1.getPlaces();

            if (places.length == 0) {
                return;
            }
            //console.log(markers);

            $scope.endSelected = true;
            $scope.coords[1] = { lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng() };

            if ($scope.startSelected && $scope.endSelected) {

                if ($scope.flightPath != null)
                    $scope.flightPath.setMap(null);


                $scope.flightPath = new google.maps.Polyline({
                    path: $scope.coords,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                DrawMap2(map, $scope.coords, $scope.flightPath, $scope.directionsService, $scope.directionsDisplay);

            }

            //Clear out the old markers.
            markers1.forEach(function (marker1) {
                marker1.setMap(null);
            });
            markers1 = [];


            //// For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                //markers1.push(new google.maps.Marker({
                //    map: map,
                //    icon: icon,
                //    title: place.name,
                //    position: place.geometry.location
                //}));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    }

    $scope.initAutocomplete();

    $scope.SaveCoods = function () {

        var currentRide = storageService.getObject("AddedRIDE");


        debugger;
        //var obj = {  0: { lat: 23.4545, lng: 12.4546565 }, 1: { lat: 23.4545, lng: 12.4546565 } } ;

        //var currentRide = ///get from local storageService
        
        currentRide.start_cord = $scope.coords[0];
        currentRide.end_cord = $scope.coords[1];

       
        $scope.AddRideTODAtabase(currentRide);

    }




    $scope.CancelCoods = function () {

        var currentRide = storageService.getObject("AddedRIDE");

       
        $scope.AddRideTODAtabase(currentRide);

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


   /* $scope.SaveMap = function () {

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
    */

    jQuery('#mapModal').on('shown.bs.modal', function () {
        google.maps.event.trigger(map, 'resize', {});
        map.setCenter(myLatlng);
    });

});