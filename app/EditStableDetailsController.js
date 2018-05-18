app.controller('EditStableDetailsController', function MyCtrl($scope, $location,$rootScope, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {

    //var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    //$("#photo").change(function () {
    //    readURL(this);
    //});

    //function readURL(input) {
    //    if (input.files && input.files[0]) {
    //        var reader = new FileReader();

    //        reader.onload = function (e) {
    //            //alert(e.target.result);
    //            $('#editImg').attr('src', e.target.result);
    //            $scope.stb.photo = e.target.result;
    //        }

    //        reader.readAsDataURL(input.files[0]);
    //    }
    //}


    //$scope.OpenEditFileDialog = function () {
    //    $("#addphotonewname").change(function () {
    //        readURL(this);
    //    });
    //    $("#addphotonewname").click();

    //}

    //// console.log("EditStableDetailsController");
    //sessionService.CHECKSESSION();
    //$scope.user = storageService.getObject("CU");

    //$scope.stb = storageService.getObject("CS");

    //$scope.unisonOrg = [];
    //$scope.originalOrganization = [];
    //$scope.Org = [];
    //$scope.FinalOrganisations = [];

    //$scope.initAdmins = function () {

    //    var dataArray = $rootScope.Admins;
    //    if (dataArray) {
    //        $scope.originalOrganization = angular.copy(dataArray);

    //        for (var i = 0; i <= dataArray.length; i++) {
    //            try {
    //                if (dataArray[i].Role == "Organisation") {
    //                    if (dataArray[i].ShowInEquiTrack == "1") {
    //                        $scope.Org.push(dataArray[i]);
    //                    }
    //                }
    //            }
    //            catch (e) {

    //            }
    //        }

    //        if ($scope.stb.associations != undefined) {
    //            for (var i = 0 ; i < $scope.stb.associations.length; i++) {
    //                try {
    //                    if (!IsNull($scope.stb.associations[i].name)) {
    //                        var organizaton = _.findWhere($scope.Org, { OrganisationNumber: $scope.stb.associations[i].filter });
    //                        if (organizaton) {
    //                            $scope.FinalOrganisations.push({
    //                                Options: $scope.Org,
    //                                SelectedOrganisation: organizaton,
    //                                UserId: $scope.stb.associations[i].number
    //                            });
    //                        }
    //                    }
    //                    else {
    //                        $scope.FinalOrganisations.push({
    //                            Options: $scope.Org,
    //                            SelectedOrganisation: "",
    //                            UserId: ""
    //                        });
    //                    }
    //                }
    //                catch (err) {

    //                }
    //            }
    //        }

    //        else {


    //            for (var i = 0; i < $scope.Org.length; i++) {
    //                $scope.Org[$scope.Org.length - i] = $scope.Org[$scope.Org.length - 1 - i];

    //            }
    //            $scope.Org[0] = {
    //                DisplayName: "",
    //                OrganisationName: "",
    //                OrganisationNumber: "Select"
    //            }
    //            $scope.stb.associations = [];
    //            $scope.stb.associations.push($scope.Org[0])
    //            $scope.FinalOrganisations.push({
    //                Options: $scope.Org,
    //                SelectedOrganisation: $scope.Org[0],
    //                UserId: ""
    //            });

    //        }

    //        // console.log(dataArray);
    //    }
    //}

    //$scope.initAdmins();

    //$scope.AddNewOrganisation = function () {

    //    $scope.FinalOrganisations.push({
    //        Options: $scope.Org,
    //        SelectedOrganisation: $scope.Org[0],
    //        UserId:""
    //    });

    //}

    //$scope.RemoveOrganisation = function (index) {

    //    $scope.FinalOrganisations.splice(index, 1);

    //}


    //$scope.OnOrganisaionChange = function (FinalOrg) {
    //    // console.log(FinalOrg);
    //    // console.log(FinalOrg.SelectedOrganisation);
    //    //$scope.orgnumber= item.OrganisationNumber
    //}
   

 

    //$scope.Logout = function () {
    //    storageService.setObject("CU", null);
    //    $location.path('/');
    //}

   
    ////$scope.horses = $firebaseArray(ref.child('horses'));

    //$scope.SaveMedicalStable = function () {
    //    $("#medical").modal('hide');
    //    var horseRef = $scope.stb;
    //    horseRef.medical = ReplaceNull($scope.stb.medical)

    //    var editid = horseRef.$id;
    //    // console.log(horseRef);

    //    var horseRefToUpdate = angular.copy(horseRef);
    //    delete horseRefToUpdate.$$hashKey;
    //    delete horseRefToUpdate.$id;

    //    firebase.database().ref('/horses/' + editid).set(horseRefToUpdate);

    //    //firebase.database().ref('/horses/' + $scope.stb.$id + '/medical').set(medical);
    //    //storageService.setObject("CS", $scope.stb);

    //    storageService.setObject("CS", horseRef);
    //    swal("", "Your stable details has been added edied success fully", "success");
    //    //window.location.reload();

    //}

    //$scope.SaveNotesStable = function () {
    //    $("#notes").modal('hide');

    //    var horseRef = $scope.stb;
    //    horseRefnotes = ReplaceNull($scope.stb.notes);

    //    var editid = horseRef.$id;
    //    // console.log(horseRef);

    //    var horseRefToUpdate = angular.copy(horseRef);
    //    delete horseRefToUpdate.$$hashKey;
    //    delete horseRefToUpdate.$id;

    //    firebase.database().ref('/horses/' + editid).set(horseRefToUpdate);

    //    storageService.setObject("CS", horseRef);
    //    swal("", "Your stable details has been added edied success fully", "success");

    //    //firebase.database().ref('/horses/' + $scope.stb.$id + '/notes').set(notes);
    //    //storageService.setObject("CS", $scope.stb);
    //}

    //$scope.SaveStable = function () {
    //    debugger;
    //    $("#edit_stable").modal('hide');
    //   // $("#edit_stable").hide();
    //    //var horseRef = $rootScope.appHorses.$getRecord($scope.stb.$id);

    //    var horseRef = $scope.stb; //angular.copy($scope.stb);

    //    //horseRef.age = '';//ReplaceNull($scope.stb.age);
    //    //horseRef.associations = $scope.stb.associations;

    //    var assolistToAdd = [];

    //    for (var i = 0; i < $scope.FinalOrganisations.length; i++) {
    //        var org = {
    //            filter: $scope.FinalOrganisations[i].SelectedOrganisation.OrganisationNumber,
    //            name: $scope.FinalOrganisations[i].SelectedOrganisation.DisplayName,
    //            number: $scope.FinalOrganisations[i].UserId
    //        }
    //        if (org.name) {
    //            if (org.filter) {
    //                if (_.findLastIndex(assolistToAdd, { name: org.name }) == -1) {
    //                    assolistToAdd.push(org);
    //                }
    //            }
    //        }
    //    }
        
    //    if (horseRef.associations) {
    //        for (var i = 0; i < horseRef.associations.length; i++) {

    //            var asssssso = horseRef.associations[i];
    //            //$scope.originalOrganization = angular.copy(dataArray);

    //            var organizaton = _.findWhere($scope.originalOrganization, { OrganisationNumber: asssssso.filter });
    //            if (organizaton) {
    //                if (organizaton.ShowInEquiTrack == "1") { }
    //                else {
    //                    assolistToAdd.push(asssssso);
    //                }
    //            }
    //        }
    //    }

    //    //if (assolistToAdd.length > 0)
    //    horseRef.associations = assolistToAdd;

    //    horseRef.average_speed = ReplaceNull($scope.stb.average_speed);
    //    horseRef.birthday = ReplaceNull($scope.stb.birthday);
    //    horseRef.breed = ReplaceNull($scope.stb.breed);
    //    horseRef.calories = ReplaceNull($scope.stb.calories);
    //    horseRef.distance = ReplaceNull($scope.stb.distance);
    //    horseRef.duration = ReplaceNull($scope.stb.duration);
    //    horseRef.energy = ReplaceNull($scope.stb.energy);
    //    horseRef.horse_name = ReplaceNull($scope.stb.horse_name);
    //    horseRef.notes = ReplaceNull($scope.stb.notes);
    //    horseRef.registration = ReplaceNull($scope.stb.registration);
    //    horseRef.top_speed = ReplaceNull($scope.stb.top_speed);
    //    horseRef.total_rides = ReplaceNull($scope.stb.total_rides);
    //    horseRef.totalrides = ReplaceNull($scope.stb.totalrides);
    //    horseRef.weight = ReplaceNull($scope.stb.weight);
    //    horseRef.photo = ReplaceNull($scope.stb.photo);
    //    horseRef.medical = ReplaceNull($scope.stb.medical);
    //    horseRef.notes = ReplaceNull($scope.stb.notes);

    //    var editid = horseRef.$id;
    //    // console.log(horseRef);
    //    var horseRefToUpdate = angular.copy(horseRef);
    //    delete horseRefToUpdate.$$hashKey;
    //    delete horseRefToUpdate.$id;

    //    var isBase64 = false;
    //    if (horseRefToUpdate && horseRefToUpdate.photo && horseRefToUpdate.photo.substr(0, 10) == "data:image")
    //        isBase64 = true;

    //    if (isBase64) {
    //        var pic = horseRefToUpdate.photo.replace("data:image/jpeg;base64,", "");
    //        pic = pic.replace("data:image/png;base64,", "");
    //        var blob = b64toBlob(pic, "image/png");
    //        var metadata = {
    //            'contentType': blob.type
    //        };
    //        var fname = generateUniqueID() + ".jpg";
    //        var storageRef = firebase.storage().ref();
    //        storageRef.child('horses/' + fname).put(blob, metadata).then(function (snapshot) {
    //            var url = snapshot.metadata.downloadURLs[0];
    //            horseRefToUpdate.photo = url;
    //            firebase.database().ref('/horses/' + editid).set(horseRefToUpdate);
    //            storageService.setObject("CS", horseRef);
    //            swal("", "Your stable details has been added edied success fully", "success");
    //            window.location.reload();
    //        }).catch(function (error) {
    //            // console.error('Upload failed:', error);
    //        });
    //    }
    //    else {
    //        firebase.database().ref('/horses/' + editid).set(horseRefToUpdate);
    //        storageService.setObject("CS", horseRef);
    //        swal("", "Your stable details has been added edied success fully", "success");
    //        window.location.reload();
    //    }


    //    //$rootScope.appHorses.$save(horseRef).then(function (res) {
    //    //    storageService.setObject("CS", horseRef);
    //    //    swal("", "Your stable details has been added edied success fully", "success");

    //    //});

    //}
});
