
app.controller('organisationsController', function ($scope, storageService, firebaseService, $firebaseArray) {



    console.log("organisation");
    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('admin'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;

                console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $scope.UpdateImage = function (image, index) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        debugger;

        $("#nameedit").val(image.DisplayName);
        $("#numberedit").val(image.OrganisationNumber);
        $("#useridedit").val(image.UserId);
       // $("#imagefileedit").val(image.Url);
        $scope.photo = image.Url;
        $("#editmodal").show();
    }


    $scope.UpdateImageData = function () {

        $("#loadingModal").show();
        $("#editmodal").hide();
        //var file = document.getElementById('imagefileedit').files[0];
        //var metadata = {
        //    'contentType': file.type
        //};

        //var fname = new Date().getMilliseconds() + file.name.substring(file.name.indexOf("."));
       
            var file = document.getElementById('imagefileedit').files[0];

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

                var toAdd = {

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

