app.controller('editmessagesController', function ($scope, $routeParams, storageService, firebaseService, $firebaseArray, $http) {

    console.log("editmessagesController" + $routeParams.id);

    //$scope.url = "http://localhost:5000/download.html?id=";
    $scope.url = "https://myequitrack.com/download.html?id=";


    $scope.editId = $routeParams.id;
    $scope.Question = {};
    $scope.showSendContent = false;

    $scope.SendMail = function () {

        $("#loadingModal").show();

        var TO = $scope.Question.EmailId;
        //TO = "vishal.kumar1145@gmail.com";

        var Subject = "Equitrack - Reports";
        var html = "Your report is ready for download.  Please click on this link : " + $scope.DownloadLink;

        //html += "<br/><br/><br/>";

        //html += "<table>"
        //html += "<tr>      <td>First Name :- </td>  <td> " + ReplaceNull($scope.first_name) + "</td>        </tr>"
        //html += "<tr>      <td>Last Name :- </td>  <td> " + ReplaceNull($scope.last_name) + "</td>        </tr>"
        //html += "<tr>      <td>Email :- </td>  <td> " + ReplaceNull($scope.email) + "</td>        </tr>"
        //html += "<tr>      <td>Mobile :- </td>  <td> " + ReplaceNull($scope.mobile) + "</td>        </tr>"
        //html += "<tr>      <td>Message :- </td>  <td> " + ReplaceNull($scope.msg) + "</td>        </tr>"
        //html += "</table>"

        //html += "<br/><br/><br/>";

        //html += "Equitrack Team</br>"


        //var inputData = PrepareRequestForMail("TEST", TO, "", "", Subject, html, "");


        //var url = 'https://plucky-vision-140010.appspot.com/sendmail?To=' + TO + '&Subject=' + Subject + '&HTML=' + html;
        var url = storageService.getNodeJSAppURL() + 'sendmail?To=' + TO + '&Subject=' + Subject + '&HTML=' + html;

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });


        $("#loadingModal").hide();
        alert("Mail has been sent success fully to the specified user");

    }

    var icArray = ['ingo_icon.png', 'Calendar_Icon.png', 'Camera_Icon1.png', 'Camera_Icon2.png', 'Clock_Icon.png', 'Coupon_Icon.png', 'Email_Icon1.png', 'Email_Icon2.png', 'Important_Icon.png', 'File_Icon.png', 'Gift_Icon.png', 'Heart_Icon.png', 'Horse_Icon1.png', 'Horse_Icon2.png', 'Horse_Icon3.png', 'Info_Icon.png', 'Map_Icon1.png', 'Map_Icon2.png', 'Money_Icon1.png', 'Money_Icon2.png', 'Movie_Icon.png', 'News_Icon.png', 'People_Icon.png', 'Picture_Icon.png', 'Question_Icon1.png', 'Question_Icon2.png', 'Rain_Icon.png', 'Rules_Icon.png', 'Smile_Icon.png', 'Star_Icon.png', 'Trophy_Icon.png'];

    $scope.icons = [];
    for (var iCounter = 0; iCounter < icArray.length; iCounter++) {
        $scope.icons.push({
            url: 'images/' + icArray[iCounter],
            id: iCounter,
            useclass: 'imgNonSelect'
        });
    }

    
    $scope.imageSelect = function (index, id_icon) {
        $scope.img = _.findWhere($scope.icons, { id: index }).url;

        for (var counter = 0; counter < $scope.icons.length; counter++) {
            if (counter == index)
                $scope.icons[counter].useclass = 'imgSelect'
            else
                $scope.icons[counter].useclass = 'imgNonSelect'
        }
    }


 
    $scope.setFile = function (element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();

        reader.onload = function (event) {
            $scope.Question.MessageImage = event.target.result
            $scope.$apply()

        }
        // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    }


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Messages'));
    $scope.Imgaes = [];

    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        if ($routeParams.id == -1) {
            //alert("here");
        }
        else {
            $scope.showSendContent = true;
            $scope.Question = $scope.images.$getRecord($routeParams.id);
            // $scope.exdt = $scope.Question.Expiry;
            //if ($scope.Question.MessageImage == "" || $scope.Question.MessageImage == undefined) {
            //    $scope.Question.selectoption = "Text";

            //} else {
            //    $scope.Question.selectoption = "Image";


            //}

            if ($scope.Question) {
                if ($scope.Question.MessageImage)
                    $scope.selectoption = $scope.filterOption[1];
                else
                    $scope.selectoption = $scope.filterOption[0];


                $("#name").val($scope.Question.MessageText);
                $("#linktitle").val($scope.Question.LinkTitle),
                $("#expiry").val($scope.Question.ExpirationDate);

                $("#title").val($scope.Question.AnnouncementTitle);
                $("#link").val($scope.Question.Embeddedlink);
                $("#optionType").val($scope.Question.selectoption);


                console.log("added selected icon " + $scope.Question.AnnouncementType);
                for (var counter = 0; counter < $scope.icons.length; counter++) {
                    if ($scope.Question.AnnouncementType == $scope.icons[counter].url)
                        $scope.icons[counter].useclass = 'imgSelect'
                    else
                        $scope.icons[counter].useclass = 'imgNonSelect'
                }



                //$scope.option();


            }

        }
    }).catch(function (error) {
        console.log("Error in loading details");
    });

  
    //$scope.OnOrganisaionChange = function (FinalOrg) {
    //    console.log(FinalOrg);
    //    $scope.FinalOrg = FinalOrg;
    //    //$scope.orgnumber= item.OrganisationNumber
    //}

    //$scope.Collopse = function (image) {

    //    console.log(image);

    //    $("#link_" + image.$id).addClass("collapsed");
    //    $("#div_" + image.$id).addClass("in");

    //}

    //////$scope.EditQuestionModal = function (image) {
    //////    $scope.cntId = image.$id;
    //////    //$("#addphoto").click();
    //////    debugger;

    //////    $("#name").val(image.MessageText);
    //////    $("#expiry").val(image.Expiry);
    //////    $("#editmodal").modal('show');
    //////}


    $scope.filterOption = ['Text', 'Image'];
    $scope.selectoption = $scope.filterOption[0];

    //$scope.option = function () {filterOption
    //    var e = document.getElementById("optionType");
    //    $scope.selectoption = e.options[e.selectedIndex].text;
    //}
    $scope.EditQuestion = function () {
        
        
        if ($scope.selectoption == "Image") {
            if (file) {
                var file = document.getElementById('trigger').files[0];
                $("#loadingModal").show();
                var metadata = {
                    'contentType': file.type
                };

                var fname = new Date().getMilliseconds() + file.name.substring(file.name.indexOf("."));

                var storageRef = firebase.storage().ref();
                storageRef.child('profile/' + fname).put(file, metadata).then(function (snapshot) {

                    debugger;
                    var url = snapshot.metadata.downloadURLs[0];



                    if ($scope.img == undefined) {
                        $scope.img = $scope.Question.AnnouncementType;
                    }

                    console.log(url);
                    var imageRef = $scope.images.$getRecord($routeParams.id);
                    imageRef.AnnouncementTitle = $("#title").val();
                    imageRef.ExpirationDate = $("#expiry").val();
                    imageRef.Embeddedlink = $("#link").val();
                    imageRef.AnnouncementType = $scope.img,
                    imageRef.MessageImage = url,
                    imageRef.LinkTitle = $("#linktitle").val(),
                    imageRef.OrganisationId = $scope.user.OrganisationNumber;
                    if (imageRef.AnnouncementTitle == "" || imageRef.AnnouncementTitle.length > 36) {
                        alert("Please fill AnnouncementTitle with limited character");
                        return;
                    }
                    $scope.images.$save(imageRef).then(function (res) {

                        console.log(res);

                        $scope.showSendContent = true;
                        $scope.DownloadLink = $scope.url + $routeParams.id;



                    });
                    window.location.href = "#/messages";
                    $("#loadingModal").hide();
                });
            } else {
                if ($scope.img == undefined) {
                    $scope.img = $scope.Question.AnnouncementType;
                }

                // console.log(url);
                var imageRef = $scope.images.$getRecord($routeParams.id);
                imageRef.AnnouncementTitle = $("#title").val();
                //imageRef.MessageText = $("#name").val();
                imageRef.ExpirationDate = $("#expiry").val();
                imageRef.Embeddedlink = $("#link").val();
                imageRef.AnnouncementType = $scope.img,
                imageRef.MessageImage = $scope.Question.MessageImage,
                 imageRef.LinkTitle = $("#linktitle").val(),
                imageRef.OrganisationId = $scope.user.OrganisationNumber;
                if (imageRef.AnnouncementTitle == "" || imageRef.AnnouncementTitle.length > 36) {
                    alert("Please fill AnnouncementTitle with limited character");
                    return;
                }
                $scope.images.$save(imageRef).then(function (res) {

                    $("#reportModal").hide();
                    console.log(res);

                    $scope.showSendContent = true;
                    $scope.DownloadLink = $scope.url + $routeParams.id;



                });
                window.location.href = "#/messages";
                $("#loadingModal").hide();
            }
        } else {

            $("#loadingModal").show();
            if ($scope.img == undefined) {
                $scope.img = $scope.Question.AnnouncementType;
            }
            var imageRef = $scope.images.$getRecord($routeParams.id);
            imageRef.AnnouncementTitle = $("#title").val();
            imageRef.MessageText = $("#name").val();
            imageRef.ExpirationDate = $("#expiry").val();
            imageRef.Embeddedlink = $("#link").val();
            imageRef.AnnouncementType = $scope.img;
            //imageRef.MessageImage =url,
            imageRef.OrganisationId = $scope.user.OrganisationNumber;
            imageRef.LinkTitle = $("#linktitle").val();
            if (imageRef.AnnouncementTitle == "" || imageRef.AnnouncementTitle.length > 36) {
                alert("Please fill AnnouncementTitle with limited character");
                return;
            }
            if (imageRef.MessageText == "" || imageRef.MessageText.length > 200) {
                alert("Please fill Announcement with limited character");
                return;
            }
            $scope.images.$save(imageRef).then(function (res) {

                console.log(res);

                $scope.showSendContent = true;
                $scope.DownloadLink = $scope.url + $routeParams.id;



            });
            window.location.href = "#/messages";
            $("#loadingModal").hide();
        }
    }

    $scope.Delete = function () {
        $("#loadingModal").show();
        var question = $scope.Question;
        $scope.images.$remove(question).then(function (ref) {
            debugger;
            var id = ref.key();

            $("#loadingModal").hide();
            window.location.href = "#/messages"

        });

    }


    $scope.Cancle = function () {
        window.location.href = "#/messages";
    }



    $scope.AddQuestion = function () {        
        if ($scope.selectoption == "Image") {
            var file = document.getElementById('trigger').files[0];
            if (file) {
                $("#loadingModal").show();
                var metadata = {
                    'contentType': file.type
                };

                var fname = new Date().getMilliseconds() + file.name.substring(file.name.indexOf("."));
                var ext = fname.substr(fname.lastIndexOf('.') + 1);
                console.log("extecion is" + ext);

                if (ext == 'jpg' || ext == 'jpeg' || ext == 'gif' || ext == 'png' || ext == 'bmp') {
                    var storageRef = firebase.storage().ref();
                    storageRef.child('profile/' + fname).put(file, metadata).then(function (snapshot) {

                        debugger;
                        var url = snapshot.metadata.downloadURLs[0];


                        console.log(url);
                        if ($scope.img == undefined) {
                            $scope.img = "";
                        }
                        var toAdd = {
                            AnnouncementTitle: $("#title").val(),
                            //MessageText: $("#name").val(),
                            ExpirationDate: $("#expiry").val(),
                            Embeddedlink: $("#link").val(),
                            AnnouncementType: $scope.img,
                            Read: 0,
                            MessageImage: url,
                            LinkTitle: $("#linktitle").val(),
                            OrganisationId: $scope.user.OrganisationNumber
                        }
                        if (toAdd.ExpirationDate == "") {
                            alert("Please fill Expiration Date");
                            $("#loadingModal").hide();
                            return;
                        }
                        if (toAdd.AnnouncementTitle == "" || toAdd.AnnouncementTitle.length > 36) {
                            alert("Please fill AnnouncementTitle with limited character");

                            $("#loadingModal").hide();
                            return;
                        }
                        $scope.images.$add(toAdd).then(function (ref) {

                            var id = ref.key();
                            console.log("added record with id " + id);
                            $("#loadingModal").hide();
                            window.location.href = "#/messages";
                           

                        });
                    });
                } else {
                    alert("Please Enter only .mp3 .mp4 or .webm Formats");
                    //$scope.option();
                    return;
                }
            }
            else {
                alert("Please Enter only .mp3 .mp4 or .webm Formats");
                $("#loadingModal").hide();
                //$scope.option();
                return;

                //if ($scope.img == undefined) {
                //    $scope.img = "";
                //}
                //var toAdd = {
                //    //AnnouncementTitle: $("#title").val(),
                //    //MessageText: $("#name").val(),
                //    Expiry: $("#expiry").val(),
                //    Embeddedlink: $("#link").val(),
                //    AnnouncementType: $scope.img,
                //    Read: 0,
                //    MessageImage: url,
                //    LinkTitle: $("#linktitle").val(),
                //    OrganisationId: $scope.user.OrganisationNumber
                //}

                //$scope.images.$add(toAdd).then(function (ref) {

                //    var id = ref.key();
                //    console.log("added record with id " + id);
                //    $("#loadingModal").hide();
                //    window.location.href = "#/messages/";
                //    window.location.reload();

                //});

            }
        } else {
            if (!$scope.img) {
                $scope.img = "";
            }
            var toAdd = {
                AnnouncementTitle: $("#title").val(),
                MessageText: $("#name").val(),
                ExpirationDate: $("#expiry").val(),
                Embeddedlink: $("#link").val(),
                AnnouncementType: $scope.img,
                Read: 0,
                LinkTitle: $("#linktitle").val(),
                OrganisationId: $scope.user.OrganisationNumber
            }
            if (toAdd.ExpirationDate == "") {
                alert("Please fill Expiration Date");
                return;
            }

            if (toAdd.AnnouncementTitle == "" || toAdd.AnnouncementTitle.length > 36) {
                alert("Please fill AnnouncementTitle with limited character");
                return;
            }
            if (toAdd.MessageText == "" || toAdd.MessageText.length > 200) {
                alert("Please fill Announcement with limited character");
                return;
            }

            $("#loadingModal").show();
            $scope.images.$add(toAdd).then(function (ref) {
                var id = ref.key();
                console.log("added record with id " + id);
                $("#loadingModal").hide();
                window.location.href = "#/messages";
            }).catch(function (error) {
                console.log(error);
            });
          
        }
    }

    $scope.Action = function () {
        if ($routeParams.id == -1)
            $scope.AddQuestion();
        else
            $scope.EditQuestion();
    }

    //$scope.option();


});
