﻿
app.controller('organisationsController', function ($scope, storageService, firebaseService, $firebaseArray) {



    console.log("organisation");
    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('admin'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        debugger;
                console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $scope.UpdateImage = function (image, index) {
        $scope.cntId = image.$id;
       
        
        $("#nameedit").val(image.DisplayName);
        $("#numberedit").val(image.OrganisationNumber);
        $("#useridedit").val(image.UserId);
        if (image.ShowInEquiTrack)
        {
            if (image.ShowInEquiTrack == "1") {
                $("#checkboxedit").prop('checked', true)
            }
            else{
                $("#checkboxedit").prop('checked', false);
            }

        }
        else
            $("#checkboxedit").prop('checked', false);
        if (image.AllowMessaging) {
            if (image.AllowMessaging == "1") {
                $("#checkboxeditMessage").prop('checked', true)
            }
            else {
                $("#checkboxeditMessage").prop('checked', false);
            }

        }
        else
            $("#checkboxeditMessage").prop('checked', false);
        if (image.ShowAllData) {
            if (image.ShowAllData == "1") {
                $("#checkboxeditData").prop('checked', true)
            }
            else {
                $("#checkboxeditData").prop('checked', false);
            }

        }
        else
            $("#checkboxeditData").prop('checked', false);

        $scope.photo = image.Url;
        $("#editmodal").show();
    }
   

    $scope.UpdateImageData = function () {

        $("#loadingModal").show();
        $("#editmodal").hide();
        var ShowInEquiTrack = "0";
        if ($('#checkboxedit').is(":checked")) {
            ShowInEquiTrack = "1";
        }
        var AllowMessaging = "0";
        if ($('#checkboxeditMessage').is(":checked")) {
            AllowMessaging = "1";
        }
        var ShowAllData = "0";
        if ($('#checkboxeditData').is(":checked")) {
            ShowAllData = "1";
        }
            var file = document.getElementById('imagefileedit').files[0];
            if (file != undefined) {

                var metadata = {
                    'contentType': file.type
                };

                var fname = new Date().getMilliseconds() + file.name.substring(file.name.indexOf("."));

                var storageRef = firebase.storage().ref();

                storageRef.child('profile/' + fname).put(file, metadata).then(function (snapshot) {

                    debugger;
                    var url = snapshot.metadata.downloadURLs[0];
                    $("#loadingModal").show();

                    var imageRef = $scope.images.$getRecord($scope.cntId);
                    imageRef.Url = url;
                    imageRef.DisplayName = $("#nameedit").val();
                    imageRef.OrganisationNumber = $("#numberedit").val();
                    imageRef.UserId = $("#useridedit").val();
                    imageRef.ShowInEquiTrack = ShowInEquiTrack;
                    imageRef.AllowMessaging = AllowMessaging;
                    imageRef.ShowAllData = ShowAllData;


                    $scope.images.$save(imageRef).then(function (ref) {
                        debugger;
                        var id = ref.key();
                        console.log("added record with id " + id);
                        $("#loadingModal").hide();
                        window.location.reload();

                    });



                }).catch(function (error) {
                    console.error('Upload failed:', error);
                });
            } else {
                var imageRef = $scope.images.$getRecord($scope.cntId);
                imageRef.Url = $scope.photo;
                imageRef.DisplayName = $("#nameedit").val();
                imageRef.OrganisationNumber = $("#numberedit").val();
                imageRef.UserId = $("#useridedit").val();
                imageRef.ShowInEquiTrack = ShowInEquiTrack;
                imageRef.AllowMessaging = AllowMessaging;
                imageRef.ShowAllData = ShowAllData;


                $scope.images.$save(imageRef).then(function (ref) {
                    debugger;
                    var id = ref.key();
                    console.log("added record with id " + id);
                    $("#loadingModal").hide();
                    window.location.reload();

                });
            }

    }

    $scope.closeEditModel = function () {

        $("#editmodal").hide();
    }

    $scope.RemoveSponser = function (image) {
        $("#loadingModal").show();
        $scope.images.$remove(image).then(function (ref) {
            debugger;
            var id = ref.key();
            $("#loadingModal").hide();
        });

    }
  
    $scope.AddSponser = function ()
    {
        debugger;
        console.log($scope.checkbox);

       
        if (($("#namenew").val() == '') || ($("#numbernew").val() == '') || ($("#passwordnew").val() == '') || ($("#useridnew").val() == '') || ($("#filenew").val() == '')) {
            alert('Please Enter All Field Of Form ');
            return;
        }
        else {
            $("#loadingModal").show();

            $("#modalid").hide();

            var file = document.getElementById('filenew').files[0];
            var metadata = {
                'contentType': file.type
            };

            var fname = new Date().getMilliseconds() + file.name.substring(file.name.indexOf("."));
            var storageRef = firebase.storage().ref();
            storageRef.child('profile/' + fname).put(file, metadata).then(function (snapshot) {
              
                debugger;
                var url = snapshot.metadata.downloadURLs[0];
                
              
                
                var ShowInEquiTrack = "0";
                if ($('#checkboxadd').is(":checked")) {
                    ShowInEquiTrack = "1";
                }

                var AllowMessaging = "0";
                if ($('#checkboxaddMessage').is(":checked")) {
                    AllowMessaging = "1";
                }
                var ShowAllData = "0";
                if ($('#checkboxaddData').is(":checked")) {
                    ShowAllData = "1";
                }
                var toAdd = {
                    ShowAllData:ShowAllData,
                    AllowMessaging: AllowMessaging,
                    ShowInEquiTrack: ShowInEquiTrack,
                    DisplayName: $("#namenew").val(),
                    OrganisationName: $("#namenew").val(),
                    OrganisationNumber: $("#numbernew").val(),
                    Password: $("#passwordnew").val(),
                    Role: "Organisation",
                    UserId: $("#useridnew").val(),
                    Url:url

                }

                if (_.findLastIndex($scope.images, { DisplayName: toAdd.DisplayName }) == -1) {
                    $scope.images.$add(toAdd).then(function (ref) {
                        debugger;
                        var id = ref.key();
                        console.log("added record with id " + id);
                      

                    });
                 }
                $("#loadingModal").hide();

                window.location.reload();
            }).catch(function (error) {
                console.error('Upload failed:', error);
            });

        }
    }
});

