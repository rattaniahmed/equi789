﻿app.controller('EditStableDetailsController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $("#photo").change(function () {
        readURL(this);
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                //alert(e.target.result);
                $('#editImg').attr('src', e.target.result);
                $scope.stb.photo = e.target.result;
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    $scope.OpenEditFileDialog = function () {
        $("#addphotonewname").change(function () {
            readURL(this);
        });
        $("#addphotonewname").click();

    }

    console.log("EditStableDetailsController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    $scope.stb = storageService.getObject("CS");


    $scope.Org = [];
    $scope.admin = $firebaseArray(ref.child('admin'));
    $scope.FinalOrganisations = [];
    $scope.admin.$loaded().then(function (dataArray) {
        for (var i = 0; i <= dataArray.length; i++) {
            try {
                if (dataArray[i].Role == "Organisation") {
                    $scope.Org.push(dataArray[i]);
                }
            }
            catch (e) {

            }
        }

        for (var i = 0 ; i < $scope.stb.associations.length; i++) {
            try {
                if (!IsNull($scope.stb.associations[i].name)) {
                    $scope.FinalOrganisations.push({
                        Options: $scope.Org,
                        SelectedOrganisation: $scope.Org[0]
                    });
                }

            }
            catch (err) {

            }
        }

        console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $scope.AddNewOrganisation = function () {

        $scope.FinalOrganisations.push({
            Options: $scope.Org,
            SelectedOrganisation: $scope.Org[0]
        });

    }

    $scope.RemoveOrganisation = function (index) {

        $scope.FinalOrganisations.splice(index, 1);

    }


    $scope.OnOrganisaionChange = function (FinalOrg) {
        console.log(FinalOrg);
        console.log(FinalOrg.SelectedOrganisation);
        //$scope.orgnumber= item.OrganisationNumber
    }
   

    console.log($scope.stb);

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

   
    $scope.horses = $firebaseArray(ref.child('horses'));

    $scope.SaveMedicalStable = function () {
        blockUI.start("Updating medical report details.....");
        var horseRef = $scope.horses.$getRecord($scope.stb.$id);
        horseRef.medical = ReplaceNull($scope.stb.medical);

        $scope.horses.$save(horseRef).then(function (res) {

            $scope.$apply(function () {
                blockUI.stop();
            });

            storageService.setObject("CS", horseRef);
            swal("", "Your stable details has been added edied success fully", "success");
            console.log(res);

            window.location.reload();

        });
    }

    $scope.SaveNotesStable = function () {
        blockUI.start("Updating notes details.....");

        var horseRef = $scope.horses.$getRecord($scope.stb.$id);
        horseRef.notes = ReplaceNull($scope.stb.notes);

        $scope.horses.$save(horseRef).then(function (res) {

            $scope.$apply(function () {
                blockUI.stop();
            });

            storageService.setObject("CS", horseRef);
            swal("", "Your stable details has been added edied success fully", "success");
            console.log(res);

            window.location.reload();

        });


    }

    $scope.SaveStable = function () {

        blockUI.start("Editing horse details.....");
        var horseRef = $scope.horses.$getRecord($scope.stb.$id);

        //horseRef.age = '';//ReplaceNull($scope.stb.age);
        //horseRef.associations = $scope.stb.associations;

        var assolistToAdd = [];

        for (var i = 0; i < $scope.FinalOrganisations.length; i++) {
            var org = {
                name: $scope.FinalOrganisations[i].SelectedOrganisation.DisplayName,
                number: $scope.FinalOrganisations[i].SelectedOrganisation.OrganisationNumber
            }
            assolistToAdd.push(org);
        }
        horseRef.associations = assolistToAdd;

        horseRef.average_speed = ReplaceNull($scope.stb.average_speed);
        horseRef.birthday = ReplaceNull($scope.stb.birthday);
        horseRef.breed = ReplaceNull($scope.stb.breed);
        horseRef.calories = ReplaceNull($scope.stb.calories);
        horseRef.distance = ReplaceNull($scope.stb.distance);
        horseRef.duration = ReplaceNull($scope.stb.duration);
        horseRef.energy = ReplaceNull($scope.stb.energy);
        horseRef.horse_name = ReplaceNull($scope.stb.horse_name);
        horseRef.notes = ReplaceNull($scope.stb.notes);
        horseRef.registration = ReplaceNull($scope.stb.registration);
        horseRef.top_speed = ReplaceNull($scope.stb.top_speed);
        horseRef.total_rides = ReplaceNull($scope.stb.total_rides);
        horseRef.totalrides = ReplaceNull($scope.stb.totalrides);
        horseRef.weight = ReplaceNull($scope.stb.weight);
        horseRef.photo = ReplaceNull($scope.stb.photo);
        horseRef.medical = ReplaceNull($scope.stb.medical);
        horseRef.notes = ReplaceNull($scope.stb.notes);

        $scope.horses.$save(horseRef).then(function (res) {



            storageService.setObject("CS", horseRef);
            swal("", "Your stable details has been added edied success fully", "success");
            console.log(res);

            window.location.reload();

            $scope.$apply(function () {
                blockUI.stop();
            });

        });

    }

});