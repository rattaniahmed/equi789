app.controller('AddRideManualController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    $scope.init = function () {
        console.log("adding ride manual controller");
        $('#StartRide').datetimepicker();
        $('#EndRide').datetimepicker();
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
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    function getRandamNumber() {

        return Math.floor((Math.random() * 100000) + 1);
    }


    $scope.addride = {
        average_heart_rate:"",
        average_speed: "",
        calories:"",
        end_time: "",
        energy: "",
        ground_condition: "Select",
        high_heart_rate:"",
        location: "",
        id:"",
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
         //  console.log($scope.addride)

           var startTime = new Date($scope.addride.start_time);
           var endTime = new Date($scope.addride.end_time);

           if (startTime < endTime) {
               if (endTime <= new Date() && startTime < new Date()) {
                   var distance = $scope.addride.total_distance;
                   var ttime = (endTime - startTime) / (1000);
                   var time = (endTime - startTime) / (1000 * 60 * 60);
                   var speed = distance / time;
                   speed = speed.toFixed(3);
                   $scope.addride.average_speed = speed;
                   $scope.addride.calories = "0";
                   $scope.addride.energy = "0";
                   $scope.addride.ride_time = ttime;
                   $scope.addride.top_speed = "0";
                   $scope.addride.total_time = ttime;
                   $scope.addride.ismanualride = 1;
                   $scope.addride.id = getRandamNumber(); // generateUUID();
                   $scope.addride.horse_firebase_key = $scope.currenthorse.$id;
                   $scope.addride.freestyle_time = "0";
                   $scope.addride.hotwalk_time = "0";
                   $scope.addride.coords = false;
                   $scope.addride.notes = "";
                   $scope.addride.ground_condition = document.getElementById("gndcondition").value;

                   console.log("adding ride object");
                   console.log($scope.addride);

                   storageService.setObject("IsADDRideMode", 1);

                   storageService.setObject("AddedRIDE", $scope.addride);

                   $("#add_ride").hide();

                   $("#mapModal").show();

                   google.maps.event.trigger(map, 'resize', {});
                   //$scope.AddRideTODAtabase($scope.addride);
               }
               else {

                   alert("Start date and end date  Cannot be greater than today date")

               }

           }
           else {
               alert('Start date Cannot be greater than End date')
           }

       }
        

        //google.maps.event.trigger(map, 'resize', {});
    }

    $scope.CheckNumber=function(event)
    {
       

        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 13 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 190 || event.keyCode == 110 ) { }
        else
        {
            alert("Only Digits you can press")
            event.preventDefault();
        }

    }
   

    

  

});