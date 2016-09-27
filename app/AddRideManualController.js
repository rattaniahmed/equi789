app.controller('AddRideManualController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    $scope.init = function () {
        $(function () {
            $('#StartRide').datetimepicker();
        });

        $(function () {
            $('#EndRide').datetimepicker();
        });


        $(function () {
            $('#RideTime').datetimepicker({
                format: 'LT'
            });
        });

        $(function () {
            $('#TotalTime').datetimepicker({
                format: 'LT'
            });
        });





    }

    console.log("AddRideManualController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.horses = $firebaseArray(ref.child('rides'));
    $scope.users = $firebaseArray(ref.child('users'));

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
        $scope.  addride.end_time = document.getElementById("EndRide").value;
        $scope. addride.ride_time = document.getElementById("RideTime").value;
        $scope.addride.total_time = document.getElementById("TotalTime").value;
       
        console.log($scope.addride)
        blockUI.start("Adding horse details.....");
        $scope.horses.$add($scope.addride).then(function (ref)

        {
            debugger;
            var id = ref.key();
            console.log("added record with id " + id);
            swal("", "Your stable details has been added success fully", "success");
            //$location.path('my-stable.html');

            $scope.user.Details.horse_ids[id] = {
                created_at: ""
            };

            //$scope.user.Details.horse_ids.push(id);
            storageService.setObject("CU", $scope.user);

            var userRef = $scope.users.$getRecord($scope.user.Auth.uid);
            userRef.horse_ids[id] = {
                created_at: ""
            };

            $scope.users.$save(userRef).then(function (res) {
                console.log(res);
                //$scope.user.Details.profile = userRef.profile;
                $scope.$apply(function () {
                    blockUI.stop();
                });

                window.location.reload();
            });


        });

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



   


});