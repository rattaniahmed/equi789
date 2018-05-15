app.controller('AddStableDetailsController', function MyCtrl($scope,$rootScope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    // console.log($("#addphotonewname"));

    // console.log("AddStableDetailsController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    var ref = firebaseService.FIREBASEENDPOINT();


    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    //$('.datepicker').datepicker();

    //$("#addphotonewname").change(function () {
    //    readURL(this);
    //});

    $scope.OpenFileDialog = function () {
        $("#addphotonewname").change(function () {
            readURL(this);
        });
        $("#addphotonewname").click();

    }

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
    $scope.admin = $firebaseArray(ref.child('admin'));
    $scope.Org = [];

    $scope.FinalOrganisations = [];
    $scope.admin.$loaded().then(function (dataArray) {
        for (var i = 0; i <= dataArray.length; i++) {
            try {
                if (dataArray[i].Role == "Organisation") {
                    if (dataArray[i].ShowInEquiTrack == "1") {
                        $scope.Org.push(dataArray[i]);
                    }
                }
            }
            catch (e) {

            }
        }

        $scope.FinalOrganisations.push({
            Options: $scope.Org,
            SelectedOrganisation: "",
            UserId:""
        });

        //$scope.selectedOrg = $scope.Org[0];

        // console.log(dataArray);
    }).catch(function (error) {
        // console.log("Error in loading details");
    });

    $scope.AddNewOrganisation = function () {

        $scope.FinalOrganisations.push({
            Options: $scope.Org,
            SelectedOrganisation: "",
            UserId: ""
        });

    }

    $scope.RemoveOrganisation = function (index) {

        $scope.FinalOrganisations.splice(index, 1);

    }


    $scope.OnOrganisaionChange = function (FinalOrg) {
        // console.log(FinalOrg);
        // console.log(FinalOrg.SelectedOrganisation);
        //$scope.orgnumber= item.OrganisationNumber
    }

    $scope.orgAsso = { name: "", number: "" };

    $scope.assolist = [
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



    $scope.stbadd = {
        //associations: $scope.assolist,
        average_speed: "0.0",
        birthday: "",
        calories: "0.0",
        distance: "0.0",
        duration: "00:00:00",
        energy: "0.0",
        horse_name: "",
        id: generateUUID(),
        notes: "",
        photo: "images/horsePlaceHolder.png",
        registration: "",
        top_speed: "0.0",
        total_rides: "",
        weight: ""
    }


    $scope.SaveStable = function () {

        var assolistToAdd = [];
        for (var i = 0; i < $scope.FinalOrganisations.length; i++) {
            var org = {
                filter: $scope.FinalOrganisations[i].SelectedOrganisation.OrganisationNumber,
                name: $scope.FinalOrganisations[i].SelectedOrganisation.DisplayName,
                number: $scope.FinalOrganisations[i].UserId
            }
            if (org.filter != undefined) {

                if (_.findLastIndex(assolistToAdd, { name: org.name }) == -1) {
                    assolistToAdd.push(org);
                }
            }
        }
        $scope.stbadd.associations = assolistToAdd;
        $scope.stbadd.id = generateUUID();

        blockUI.start("Adding horse details.....");


        var isBase64 = false;
        if ($scope.stbadd && $scope.stbadd.photo && $scope.stbadd.photo.substr(0, 10) == "data:image")
            isBase64 = true;

        if (isBase64) {
            var pic = $scope.stbadd.photo.replace("data:image/jpeg;base64,", "");
            pic = pic.replace("data:image/png;base64,", "");
            var blob = b64toBlob(pic, "image/png");
            var metadata = {
                'contentType': blob.type
            };

            var fname = generateUniqueID() + ".jpg";
            var storageRef = firebase.storage().ref();
            storageRef.child('horses/' + fname).put(blob, metadata).then(function (snapshot) {

                var url = snapshot.metadata.downloadURLs[0];
                //firebase.database().ref('/horses/' + id + '/photo').set(url);
                //$scope.Start(i + 1);

                $scope.stbadd.photo = url;
                var pushRef = firebase.database().ref('horses').push();
                pushRef.set($scope.stbadd);
                var id = pushRef.key;
                //swal("", "Your stable details has been added success fully", "success");

                if (IsNull($scope.user.Details.horse_ids)) {
                    $scope.user.Details['horse_ids'] = {};
                }
                var dtd123 = new Date();
                var time123 = dtd123.getTime();
                $scope.user.Details.horse_ids[id] = {
                    created_at: time123,
                    last_updated: time123,
                    sync: "1"
                };
                storageService.setObject("CU", $scope.user);

                firebase.database().ref('/users/' + $scope.user.Auth.uid + '/horse_ids').set($scope.user.Details.horse_ids);
                swal("", "Your stable details has been added success fully", "success");

                $scope.stbadd = {
                    //associations: $scope.assolist,
                    average_speed: "0.0",
                    birthday: "",
                    calories: "0.0",
                    distance: "0.0",
                    duration: "00:00:00",
                    energy: "0.0",
                    horse_name: "",
                    id: generateUUID(),
                    notes: "",
                    photo: "images/horsePlaceHolder.png",
                    registration: "",
                    top_speed: "0.0",
                    total_rides: "",
                    weight: ""
                }
                $("#add_stable").modal('hide');

                window.location.reload();
                $scope.$apply(function () {
                    blockUI.stop();
                });


            }).catch(function (error) {
                // console.error('Upload failed:', error);
            });
        }
        else {
            var pushRef = firebase.database().ref('horses').push();
            pushRef.set($scope.stbadd);
            var id = pushRef.key;
            //swal("", "Your stable details has been added success fully", "success");

            if (IsNull($scope.user.Details.horse_ids)) {
                $scope.user.Details['horse_ids'] = {};
            }
            var dtd123 = new Date();
            var time123 = dtd123.getTime();
            $scope.user.Details.horse_ids[id] = {
                created_at: time123,
                last_updated: time123,
                sync: "1"
            };
            storageService.setObject("CU", $scope.user);

            firebase.database().ref('/users/' + $scope.user.Auth.uid + '/horse_ids').set($scope.user.Details.horse_ids);
            swal("", "Your stable details has been added success fully", "success");

            $scope.stbadd = {
                //associations: $scope.assolist,
                average_speed: "0.0",
                birthday: "",
                calories: "0.0",
                distance: "0.0",
                duration: "00:00:00",
                energy: "0.0",
                horse_name: "",
                id: generateUUID(),
                notes: "",
                photo: "images/horsePlaceHolder.png",
                registration: "",
                top_speed: "0.0",
                total_rides: "",
                weight: ""
            }
            $("#add_stable").modal('hide');

            window.location.reload();
            $scope.$apply(function () {
                blockUI.stop();
            });

        }
    }
});
