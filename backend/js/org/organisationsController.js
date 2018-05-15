
app.controller('organisationsController', function ($scope, storageService, firebaseService, $firebaseArray) {



    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('admin'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
    }).catch(function (error) {
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
        if (image.UpdateData) {
            if (image.UpdateData == "1") {
                $("#checkboxeditUpdateD").prop('checked', true)
            }
            else {
                $("#checkboxeditUpdateD").prop('checked', false);
            }

        }
        else
            $("#checkboxeditUpdateD").prop('checked', false);
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
        if (image.AllowMessageToAll) {
            if (image.AllowMessageToAll == "1") {
                $("#checkboxeditMessageA").prop('checked', true)
            }
            else {
                $("#checkboxeditMessageA").prop('checked', false);
            }

        }
        else
            $("#checkboxeditMessageA").prop('checked', false);

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
        var AllowMessageToAll = "0";
        if ($('#checkboxeditMessageA').is(":checked")) {
            AllowMessageToAll = "1";
        }
        var AllowMessaging = "0";
        if ($('#checkboxeditMessage').is(":checked")) {
            AllowMessaging = "1";
        }
        var ShowAllData = "0";
        if ($('#checkboxeditData').is(":checked")) {
            ShowAllData = "1";
        }
        var UpdateData = "0";
        if ($('#checkboxeditUpdateD').is(":checked")) {
            UpdateData = "1";
        }
            var file = document.getElementById('imagefileedit').files[0];
            if (file != undefined) {

                var metadata = {
                    'contentType': file.type
                };

                var fname = new Date().getMilliseconds() + file.name.substring(file.name.indexOf("."));

                var storageRef = firebase.storage().ref();

                storageRef.child('profile/' + fname).put(file, metadata).then(function (snapshot) {

                    var url = snapshot.metadata.downloadURLs[0];
                    $("#loadingModal").show();

                    var imageRef = $scope.images.$getRecord($scope.cntId);
                    imageRef.Url = url;
                    imageRef.DisplayName = $("#nameedit").val();
                    imageRef.OrganisationNumber = $("#numberedit").val();
                    imageRef.UserId = $("#useridedit").val();
                    imageRef.ShowInEquiTrack = ShowInEquiTrack;
                    imageRef.AllowMessageToAll = AllowMessageToAll;
                    imageRef.AllowMessaging = AllowMessaging;
                    imageRef.ShowAllData = ShowAllData;
                    imageRef.UpdateData = UpdateData;
                    if (imageRef.AllowMessageToAll == 0) {
                        Removemessage(imageRef.OrganisationNumber);
                    }

                    $scope.images.$save(imageRef).then(function (ref) {
                        var id = ref.key();
                      
                        $("#loadingModal").hide();
                        window.location.reload();

                    });



                }).catch(function (error) {
                });
            } else {
                var imageRef = $scope.images.$getRecord($scope.cntId);
                imageRef.Url = $scope.photo;
                imageRef.DisplayName = $("#nameedit").val();
                imageRef.OrganisationNumber = $("#numberedit").val();
                imageRef.UserId = $("#useridedit").val();
                imageRef.ShowInEquiTrack = ShowInEquiTrack;
                imageRef.AllowMessageToAll = AllowMessageToAll;
                imageRef.AllowMessaging = AllowMessaging;
                imageRef.ShowAllData = ShowAllData;
                imageRef.UpdateData = UpdateData;
                if (imageRef.AllowMessageToAll == 0) {
                    Removemessage(imageRef.OrganisationNumber);
                }

                $scope.images.$save(imageRef).then(function (ref) {
                    var id = ref.key();
                   
                    $("#loadingModal").hide();
                    //window.location.reload();

                });
            }

    }

    $scope.closeEditModel = function () {

        $("#editmodal").hide();
    }

    $scope.RemoveSponser = function (image) {
        $("#loadingModal").show();
        Removemessage(image.OrganisationNumber);
        $scope.images.$remove(image).then(function (ref) {
           
            var id = ref.key();
            $("#loadingModal").hide();
        });

    }
  
    $scope.AddSponser = function ()
    {
        

       
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
              
                var url = snapshot.metadata.downloadURLs[0];
                
              
                
                var ShowInEquiTrack = "0";
                if ($('#checkboxadd').is(":checked")) {
                    ShowInEquiTrack = "1";
                }
                var AllowMessageToAll = "0";
                if ($('#checkboxMessage').is(":checked")) {
                    AllowMessageToAll = "1";
                }
                var AllowMessaging = "0";
                if ($('#checkboxaddMessage').is(":checked")) {
                    AllowMessaging = "1";
                }
                var ShowAllData = "0";
                if ($('#checkboxaddData').is(":checked")) {
                    ShowAllData = "1";
                }
                var UpdateData = "0";
                if ($('#checkboxUpdate').is(":checked")) {
                    UpdateData = "1";
                }
                var toAdd = {
                    ShowAllData:ShowAllData,
                    AllowMessaging: AllowMessaging,
                    ShowInEquiTrack: ShowInEquiTrack,
                    AllowMessageToAll: AllowMessageToAll,
                    UpdateData:UpdateData,
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
                        var id = ref.key();
                    });
                }
                window.location.reload();
                $("#loadingModal").hide();

                
            }).catch(function (error) {
            });

        }
    }
});

