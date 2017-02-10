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

    $scope.icons = [
        { url: 'images/ingo_icon.png', id: 1 },
          { url: 'images/query_icon.png', id: 2 },
            { url: 'images/important_icon.png', id: 3 },
              { url: 'images/news_icon.png', id: 4 },
                { url: 'images/Horse_icon.png', id: 5 },
                { url: 'images/happy_icon.png', id: 6 }
    ]
    $scope.imageSelect = function (id_icon) {
        $scope.img = _.findWhere($scope.icons, { id: id_icon }).url;
    }
    //$scope.SetCheckBoxValue = function (id, value) {
    //    if (value == "1")
    //        $("#" + id).attr("checked", true);
    //    else
    //        $("#" + id).attr("checked", false);
    //}

    //$scope.GetCheckBoxValue = function (id) {
    //    if ($('#' + id).is(":checked"))
    //        return "1";
    //    else
    //        return "0";
    //}
    //$scope.image = '';
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
    $scope.reportDataRef = $firebaseArray(ref.child('Content').child('ReportsData'));



    $scope.images = $firebaseArray(ref.child('Content').child('Messages'));
    $scope.Imgaes = [];


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.organisation = $firebaseArray(ref.child('admin'));
    $scope.organisation.$loaded().then(function (dataArray) {
        $scope.association = _.filter(dataArray, function (num) { return num.Role == "Organisation"; });
        $scope.SelectedOrganisation = $scope.association[0];
        console.log(dataArray);


        $scope.images.$loaded().then(function (dataArray) {
            $scope.Imgaes = dataArray;
            if ($routeParams.id == -1) { }
            else {




                $scope.showSendContent = true;

                $scope.Question = $scope.images.$getRecord($routeParams.id);
               // $scope.exdt = $scope.Question.Expiry;
                if ($scope.Question.MessageImage == "" || $scope.Question.MessageImage==undefined) {
                    $scope.Question.selectoption = "Text";
                   
                } else {
                    $scope.Question.selectoption = "Image";
                    
                   
                }
                $("#name").val($scope.Question.MessageText);

                $("#expiry").val($scope.Question.Expiry);

                $("#title").val($scope.Question.AnnouncementTitle);
                $("#link").val($scope.Question.Embeddedlink);
                $("#optionType").val($scope.Question.selectoption);

                $scope.option();

               


            }
        }).catch(function (error) {
            console.log("Error in loading details");
        });

    }).catch(function (error) {
        console.log("Error in loading details" + error);
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
   
    
    $scope.option = function () {
        var e = document.getElementById("optionType");
        $scope.selectoption = e.options[e.selectedIndex].text;
    }
    $scope.EditQuestion = function () {
        $("#loadingModal").show();
        var file = document.getElementById('trigger').files[0];
        if ($scope.selectoption == "Image") {
            if (file) {
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
                    imageRef.MessageText = $("#name").val();
                    imageRef.Expiry = $("#expiry").val();
                    imageRef.Embeddedlink = $("#link").val();
                    imageRef.AnnouncementType = $scope.img,
                    imageRef.MessageImage = url,
                    imageRef.OrganisationId = $scope.user.OrganisationNumber;

                    $scope.images.$save(imageRef).then(function (res) {

                        $("#reportModal").hide();
                        console.log(res);

                        $scope.showSendContent = true;
                        $scope.DownloadLink = $scope.url + $routeParams.id;



                    });
                    window.location.href = "#/messages/";
                    $("#loadingModal").hide();
                });
            } else {
                if ($scope.img == undefined) {
                    $scope.img = $scope.Question.AnnouncementType;
                }

                console.log(url);
                var imageRef = $scope.images.$getRecord($routeParams.id);
                imageRef.AnnouncementTitle = $("#title").val();
                imageRef.MessageText = $("#name").val();
                imageRef.Expiry = $("#expiry").val();
                imageRef.Embeddedlink = $("#link").val();
                imageRef.AnnouncementType = $scope.img,
                imageRef.MessageImage = url,
                imageRef.OrganisationId = $scope.user.OrganisationNumber;

                $scope.images.$save(imageRef).then(function (res) {

                    $("#reportModal").hide();
                    console.log(res);

                    $scope.showSendContent = true;
                    $scope.DownloadLink = $scope.url + $routeParams.id;



                });
                window.location.href = "#/messages/";
                $("#loadingModal").hide();
            }
        } else {
            if ($scope.img == undefined) {
                $scope.img = $scope.Question.AnnouncementType;
            }
            var imageRef = $scope.images.$getRecord($routeParams.id);
            imageRef.AnnouncementTitle = $("#title").val();
            imageRef.MessageText = $("#name").val();
            imageRef.Expiry = $("#expiry").val();
            imageRef.Embeddedlink = $("#link").val();
            imageRef.AnnouncementType = $scope.img,
            imageRef.MessageImage = url,
            imageRef.OrganisationId = $scope.user.OrganisationNumber;

            $scope.images.$save(imageRef).then(function (res) {

                $("#reportModal").hide();
                console.log(res);

                $scope.showSendContent = true;
                $scope.DownloadLink = $scope.url + $routeParams.id;



            });
            window.location.href = "#/messages/";
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
        $("#loadingModal").show();
        if ($scope.selectoption == "Text") {
            $scope.selectoption = "";
        }
       
        var file = document.getElementById('trigger').files[0];

        if ($scope.selectoption == "Image") {
            if (file) {
                var metadata = {
                    'contentType': file.type
                };

                var fname = new Date().getMilliseconds() + file.name.substring(file.name.indexOf("."));
                var storageRef = firebase.storage().ref();
                storageRef.child('profile/' + fname).put(file, metadata).then(function (snapshot) {

                    debugger;
                    var url = snapshot.metadata.downloadURLs[0];

                    console.log(url);
                    if ($scope.img == undefined) {
                        $scope.img = "";
                    }
                    var toAdd = {
                        //AnnouncementTitle: $("#title").val(),
                        //MessageText: $("#name").val(),
                        Expiry: $("#expiry").val(),
                        Embeddedlink: $("#link").val(),
                        AnnouncementType: $scope.img,
                        Read: 0,
                        MessageImage: url,
                        LinkTitle: $("#linktitle").val(),
                        OrganisationId: $scope.user.OrganisationNumber
                    }

                    $scope.images.$add(toAdd).then(function (ref) {

                        var id = ref.key();
                        console.log("added record with id " + id);
                        $("#loadingModal").hide();
                        window.location.href = "#/messages/";
                        window.location.reload();

                    });
                });
            } else {
                if ($scope.img == undefined) {
                    $scope.img = "";
                }
                var toAdd = {
                    //AnnouncementTitle: $("#title").val(),
                    //MessageText: $("#name").val(),
                    Expiry: $("#expiry").val(),
                    Embeddedlink: $("#link").val(),
                    AnnouncementType: $scope.img,
                    Read: 0,
                    MessageImage: url,
                    OrganisationId: $scope.user.OrganisationNumber
                }

                $scope.images.$add(toAdd).then(function (ref) {

                    var id = ref.key();
                    console.log("added record with id " + id);
                    $("#loadingModal").hide();
                    window.location.href = "#/messages/";
                    window.location.reload();

                });
            
            }
        } else {
            if ($scope.img == undefined) {
                $scope.img = "";
            }
            var toAdd = {
                AnnouncementTitle: $("#title").val(),
                MessageText: $("#name").val(),
                Expiry: $("#expiry").val(),
                Embeddedlink: $("#link").val(),
                AnnouncementType: $scope.img,
                Read: 0,
                //MessageImage: url,
                OrganisationId: $scope.user.OrganisationNumber
            }

            $scope.images.$add(toAdd).then(function (ref) {

                var id = ref.key();
                console.log("added record with id " + id);
                $("#loadingModal").hide();
                window.location.href = "#/messages/";
                window.location.reload();

            });
        }
    }

    $scope.Action = function () {
        if ($routeParams.id == -1)
            $scope.AddQuestion();
        else
            $scope.EditQuestion();
    }

    $scope.option();


});

app.controller('messagesController', function ($scope, storageService, firebaseService, $firebaseArray) {

    console.log("messagesController");


    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 10,
        enableFiltering: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
        },
        columnDefs: [
          { name: 'MessageText', enableFiltering: false, headerCellClass: 'blue', filed: 'Announcement' },
           { name: 'MessageImage', enableFiltering: false, headerCellClass: 'blue', filed: 'MessageImage', cellTemplate: "<img width=\"40px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>", },
          { name: 'Expiry', enableFiltering: false, headerCellClass: 'blue', filed: 'Expiration Date' },
          { name: 'Status', headerCellClass: 'blue', filed: 'Status' },
          { name: 'AnnouncementType', headerCellClass: 'blue', cellTemplate: "<img width=\"25px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src>", filed: 'Type' },
          { name: 'Read', headerCellClass: 'blue', filed: 'Number of Read' },
          {
              name: " ", cellTemplate: '<div style="text-align:center;">' +
                      '<a href="#/messages/{{row.entity.$id}}" >Edit</a>' +
                      '</div>', enableFiltering: false
          },
         
          //{ name: 'energy', headerCellClass: 'blue' },
          //{ name: 'calories', headerCellClass: 'blue' },

        ],
                 
    };
   
    $scope.user = JSON.parse(localStorage.getItem("adminObject"));

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Messages'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
         
        var anumber = getAdminUser().OrganisationNumber;
        var dataToShow = [];
        // var Date = new Date();
        
        var today = new Date();
      
        
        for (cnt = 0; cnt < dataArray.length; cnt++) {

            if (anumber == dataArray[cnt].OrganisationId) {
                var obj = dataArray[cnt];
                var d = Date.parse(dataArray[cnt].Expiry);
                if (today < d) {
                    obj.Status = "Active";
                } else {
                    obj.Status = "Deactive";
                }
                
                //obj.ImageUrl = obj.AnnouncementType;
                dataToShow.push(obj);
            }

        }

        $scope.gridOptions.data = dataToShow;

        console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });




    //$scope.Collopse = function (image) {

    //    console.log(image);

    //    $("#link_" + image.$id).addClass("collapsed");
    //    $("#div_" + image.$id).addClass("in");

    //}

    //$scope.EditQuestionModal = function (image) {
    //    $scope.cntId = image.$id;
    //    //$("#addphoto").click();
    //    debugger;

    //    $("#titleedit").val(image.QuestionText);
    //    $("#linkedit").val(image.AnswerText);
    //    $("#editmodal").modal('show');
    //}

    $scope.EditQuestion = function () {

        var imageRef = $scope.images.$getRecord($scope.cntId);
        imageRef.MessageText = $("#name").val();
        imageRef.Expiry = $("#expiry").val();
        imageRef.OrganisationId = $scope.user.OrganisationNumber;

        $scope.images.$save(imageRef).then(function (res) {

            //$scope.$apply(function () {
            //    blockUI.stop();
            //});

            ////storageService.setObject("CS", rideRef);
            //swal("", "Your notes details has been edited success fully", "success");
            //console.log(res);
            console.log(res);
            window.location.reload();

        });


    }

    $scope.RemoveQuestion = function (image) {

        $scope.images.$remove(image).then(function (ref) {
            debugger;
            var id = ref.key();
            if (stb.$id == id) {
                console.log("Deleted success fully");
            }

        });

    }

    $scope.AddQuestion = function () {

        var toAdd = {
            MessageText: $("#name").val(),
            Expiry: $("#expiry").val(),
      
            OrganisationId: $scope.user.OrganisationNumber
        }

        $scope.images.$add(toAdd).then(function (ref) {
            debugger;
            var id = ref.key();
            console.log("added record with id " + id);


            window.location.reload();

        });

    }
   
    $scope.Redirect = function () {
        window.location.href = "#/messages/-1";
    }
});
