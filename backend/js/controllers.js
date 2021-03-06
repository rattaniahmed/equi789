﻿
app.controller('imagesController', function ($scope, storageService, firebaseService, $firebaseArray) {



    $("#addphoto").change(function () {
        readURL(this);
    });


    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                //alert(e.target.result);
                //$('#addImg').attr('src', e.target.result);
                $scope.photo = e.target.result;
                $scope.UpdateImageData();
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Images'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $scope.UpdateImage = function (image,index) {
        $scope.cntIndex = image.$id;
        $("#addphoto").click();
    }

    $scope.UpdateImageData = function () {


        $("#loadingModal").show();
        var file = document.getElementById('addphoto').files[0];
        var metadata = {
            'contentType': file.type
        };

        var fname = new Date().getMilliseconds() + file.name.substring(file.name.indexOf("."));
        var storageRef = firebase.storage().ref();
        storageRef.child('profile/' + fname).put(file, metadata).then(function (snapshot) {

            var url = snapshot.metadata.downloadURLs[0];

            $("#loadingModal").show();

            var imageRef = $scope.images.$getRecord($scope.cntIndex);
            imageRef.Url = url;

            $scope.images.$save(imageRef).then(function (res) {

                $("#loadingModal").hide();
                window.location.reload();

            });



        }).catch(function (error) {
        });




        


      


    }

});

app.controller('pagesController', function ($scope, storageService, firebaseService, $firebaseArray) {


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Pages'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        CKEDITOR.replace('editor1');

        $scope.itemSelected = $scope.Imgaes[0];

        CKEDITOR.on("instanceReady", function (event) {           
            CKEDITOR.instances.editor1.setData($scope.itemSelected.$value);
        });


//test comment       


    }).catch(function (error) {
        console.log("Error in loading details");
    });

    
    $scope.onCategoryChange = function (itemSelected) {

        CKEDITOR.instances.editor1.setData($scope.itemSelected.$value);
    }

    $scope.UpdateContent = function () {
        var updated = CKEDITOR.instances.editor1.getData();
        var toUpdate = $scope.Imgaes.$getRecord($scope.itemSelected.$id);
        toUpdate.$value = updated;

        $("#loadingModal").show();

        $scope.images.$save(toUpdate).then(function (res) {
            $("#loadingModal").hide();
            window.location.reload();
        });

    }

   

});

app.controller('staticController', function ($scope, storageService, firebaseService, $firebaseArray) {

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Static').child('HomePage'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
       
        $scope.categories = [];

        angular.forEach(dataArray, function (value, key) {
            //$scope.Sections.push(value.$id);

            for (var p in value) {
                if (p != "$id" && p != "$priority") {
                    var cat = {};
                    cat.name = value.$id;
                    cat.key = p;
                    cat.val = value[p];

                    $scope.categories.push(cat);
                }
            }
           

        });


        CKEDITOR.replace('editor1');

        $scope.itemSelected = $scope.categories[0];

        CKEDITOR.on("instanceReady", function (event) {
            CKEDITOR.instances.editor1.setData($scope.itemSelected.val);
        });

        


    }).catch(function (error) {
        console.log("Error in loading details");
    });

 

    $scope.onCategoryChange = function (itemSelected) {

        CKEDITOR.instances.editor1.setData($scope.itemSelected.val);
    }

    $scope.UpdateContent = function () {
        var updated = CKEDITOR.instances.editor1.getData();
        var toUpdate = $scope.Imgaes.$getRecord($scope.itemSelected.name);
        toUpdate[$scope.itemSelected.key] = updated;

        $("#loadingModal").show();
        $scope.images.$save(toUpdate).then(function (res) {

            $("#loadingModal").hide();
            window.location.reload();

        });


    }

  
});

app.controller('sponsersController', function ($scope, storageService, firebaseService, $firebaseArray) {

       var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Sponsers'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $scope.UpdateImage = function (image, index) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();

        $("#titleedit").val(image.DisplayName);
        $("#linkedit").val(image.HrefLink);
        $scope.photo = image.Url;
        $("#editmodal").modal('show');
    }

    $scope.UpdateImageData = function () {

        $("#loadingModal").show();
        $("#editmodal").hide();
        var file = document.getElementById('fileedit').files[0];
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
            imageRef.DisplayName = $("#titleedit").val();
            imageRef.HrefLink = $("#linkedit").val();

           

            $scope.images.$save(imageRef).then(function (ref) {
                var id = ref.key();
                $("#loadingModal").hide();
                window.location.reload();

            });



        }).catch(function (error) {
        });



    }

    $scope.RemoveSponser = function (image) {
        $("#loadingModal").show();
        $scope.images.$remove(image).then(function (ref) {
            var id = ref.key();
            $("#loadingModal").hide();
        });

    }

    $scope.AddSponser = function () {

       
        $("#loadingModal").show();

        var file = document.getElementById('filenew').files[0];
        var metadata = {
            'contentType': file.type
        };

        var fname = new Date().getMilliseconds() + file.name.substring(file.name.indexOf("."));
        var storageRef = firebase.storage().ref();
        storageRef.child('profile/' + fname).put(file, metadata).then(function (snapshot) {

            var url = snapshot.metadata.downloadURLs[0];

            var toAdd = {
                Url: url,
                DisplayName:$("#titlenew").val(),
                HrefLink:$("#linknew").val()
            }

            $("#modalid").hide();

            $scope.images.$add(toAdd).then(function (ref) {
                var id = ref.key();
                $("#loadingModal").hide();

                window.location.reload();

            });

            

        }).catch(function (error) {
        });


    }
});

app.controller('faqController', function ($scope, storageService, firebaseService, $firebaseArray) {


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('FAQ'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.Collopse = function (image) {

        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();

        $("#titleedit").val(image.QuestionText);
        $("#linkedit").val(image.AnswerText);
        $("#editmodal").modal('show');
    }

    $scope.EditQuestion = function () {
        $("#loadingModal").show();
        $("#editmodal").modal('hide');
        var imageRef = $scope.images.$getRecord($scope.cntId);
        imageRef.QuestionText = $("#titleedit").val();
        imageRef.AnswerText = $("#linkedit").val();

        $scope.images.$save(imageRef).then(function (res) {

            $("#loadingModal").hide();
            window.location.reload();

        });


    }

    $scope.RemoveQuestion = function (image) {
        $("#loadingModal").show();
        $scope.images.$remove(image).then(function (ref) {
            var id = ref.key();
            $("#loadingModal").hide();

        });

    }

    $scope.AddQuestion = function () {
        $("#modalid").modal('hide');
        $("#loadingModal").show();
        var toAdd = {
            AnswerText: $("#linknew").val(),
            QuestionText: $("#titlenew").val()
        }

        $scope.images.$add(toAdd).then(function (ref) {
            var id = ref.key();
            $("#loadingModal").hide();
            window.location.reload();

        });

    }

    $scope.Redirect = function () {
        window.location.href = "#/faq/-1";
    }

});

app.controller('editFaqController', function ($scope, $routeParams, storageService, firebaseService, $firebaseArray) {


    //$scope.$on("ckeditor.ready", function (event) {
    //    $scope.isReady = true;
    //});

    $scope.editId = $routeParams.id;
    $scope.Question = {};

    
    

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('FAQ'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        CKEDITOR.replace('editor1');              
        if ($routeParams.id == -1) { }
        else {

            CKEDITOR.on("instanceReady", function (event) {
                $scope.Question = $scope.images.$getRecord($routeParams.id);
                $("#title").val($scope.Question.QuestionText);
                CKEDITOR.instances.editor1.setData($scope.Question.AnswerText);
            });

            
        }
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.Collopse = function (image) {


        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();

        $("#titleedit").val(image.QuestionText);
        $("#linkedit").val(image.AnswerText);
        $("#editmodal").modal('show');
    }

    $scope.EditQuestion = function () {

        $("#loadingModal").show();
        var imageRef = $scope.images.$getRecord($routeParams.id);
        imageRef.AnswerText = CKEDITOR.instances.editor1.getData(); 
        imageRef.QuestionText = $("#title").val();

        $scope.images.$save(imageRef).then(function (res) {

            $("#loadingModal").hide();
            //$scope.$apply(function () {
            //    blockUI.stop();
            //});

            ////storageService.setObject("CS", rideRef);
            //swal("", "Your notes details has been edited success fully", "success");
            //console.log(res);
            window.location.href = "#/faq"

        });


    }

    $scope.Delete = function () {
        $("#loadingModal").show();
        var question = $scope.Question;
        $scope.images.$remove(question).then(function (ref) {
            var id = ref.key();

            $("#loadingModal").hide();
            window.location.href = "#/news"

        });

    }


    $scope.Cancle = function () {
        window.location.href = "#/faq";
    }

    $scope.AddQuestion = function () {
        $("#loadingModal").show();
        var toAdd = {
            AnswerText: CKEDITOR.instances.editor1.getData(),
            QuestionText: $("#title").val()
        }

        $scope.images.$add(toAdd).then(function (ref) {
            var id = ref.key();
            $("#loadingModal").hide();
            window.location.href = "#/faq"

        });

    }

    $scope.Action = function () {
        if ($routeParams.id == -1)
            $scope.AddQuestion();
        else
            $scope.EditQuestion();
    }

    







});

app.controller('newsController', function ($scope, storageService, firebaseService, $firebaseArray) {



    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('News'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.Collopse = function (image) {


        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();

        $("#titleedit").val(image.QuestionText);
        $("#linkedit").val(image.AnswerText);
        $("#editmodal").modal('show');
    }

    $scope.EditQuestion = function () {

        var imageRef = $scope.images.$getRecord($scope.cntId);
        imageRef.QuestionText = $("#titleedit").val();
        imageRef.AnswerText = $("#linkedit").val();

        $scope.images.$save(imageRef).then(function (res) {

            //$scope.$apply(function () {
            //    blockUI.stop();
            //});

            ////storageService.setObject("CS", rideRef);
            //swal("", "Your notes details has been edited success fully", "success");
            //console.log(res);
            window.location.reload();

        });


    }

    $scope.RemoveQuestion = function (image) {

        $scope.images.$remove(image).then(function (ref) {
            var id = ref.key();
            if (stb.$id == id) {
                console.log("Deleted success fully");
            }

        });

    }

    $scope.AddQuestion = function () {

        var toAdd = {
            AnswerText: $("#linknew").val(),
            QuestionText: $("#titlenew").val()
        }

        $scope.images.$add(toAdd).then(function (ref) {
            var id = ref.key();


            window.location.reload();

        });

    }

    $scope.Redirect = function () {
        window.location.href = "#/news/-1";
    }
});

app.controller('editNewsController', function ($scope, $routeParams, storageService, firebaseService, $firebaseArray) {


    $scope.editId = $routeParams.id;
    $scope.Question = {};

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('News'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        CKEDITOR.replace('editor1');
        if ($routeParams.id == -1) { }
        else {

            CKEDITOR.on("instanceReady", function (event) {
                $scope.Question = $scope.images.$getRecord($routeParams.id);
                $("#title").val($scope.Question.Title);
                CKEDITOR.instances.editor1.setData($scope.Question.Content);
            });


        }
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.Collopse = function (image) {


        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();

        $("#titleedit").val(image.QuestionText);
        $("#linkedit").val(image.AnswerText);
        $("#editmodal").modal('show');
    }

    $scope.EditQuestion = function () {

        $("#loadingModal").show();
        var imageRef = $scope.images.$getRecord($routeParams.id);
        imageRef.Content = CKEDITOR.instances.editor1.getData();
        imageRef.Title = $("#title").val();

        $scope.images.$save(imageRef).then(function (res) {

            $("#loadingModal").hide();
            //$scope.$apply(function () {
            //    blockUI.stop();
            //});

            ////storageService.setObject("CS", rideRef);
            //swal("", "Your notes details has been edited success fully", "success");
            //console.log(res);
            window.location.href = "#/news"

        });


    }

    $scope.Delete = function () {
        $("#loadingModal").show();
        var question = $scope.Question;
        $scope.images.$remove(question).then(function (ref) {
            var id = ref.key();
            
            $("#loadingModal").hide();
            window.location.href = "#/news"

        });

    }


    $scope.Cancle = function () {
        window.location.href = "#/news";
    }

    $scope.AddQuestion = function () {
        $("#loadingModal").show();
        var toAdd = {
            Content:  CKEDITOR.instances.editor1.getData(),
            Title: $("#title").val()
        }

        $scope.images.$add(toAdd).then(function (ref) {
            var id = ref.key();
            $("#loadingModal").hide();
            window.location.href = "#/news"

        });

    }

    $scope.Action = function () {
        if ($routeParams.id == -1)
            $scope.AddQuestion();
        else
            $scope.EditQuestion();
    }



});

app.controller('editReportController', function ($scope, $routeParams, storageService, firebaseService, $firebaseArray, $http) {


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
        var url = storageService.getNodeJSAppURL() + 'sendmailnew?TO=' + TO + '&Subject=' + Subject + '&HTML=' + html;

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
        }, function errorCallback(response) {
        });


        $("#loadingModal").hide();
        alert("Mail has been sent success fully to the specified user");

    }


    $scope.SetCheckBoxValue = function (id, value) {
        if (value == "1")
            $("#" + id).attr("checked", true);
        else
            $("#" + id).attr("checked", false);
    }

    $scope.GetCheckBoxValue = function (id) {
        if ($('#' + id).is(":checked"))
            return "1";
        else
            return "0";
    }

  

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.reportDataRef = $firebaseArray(ref.child('Content').child('ReportsData'));



    $scope.images = $firebaseArray(ref.child('Content').child('Reports'));
    $scope.Imgaes = [];
    

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.organisation = $firebaseArray(ref.child('admin'));
    $scope.organisation.$loaded().then(function (dataArray) {
        $scope.association = _.filter(dataArray, function (num) { return num.Role == "Organisation"; });
        $scope.SelectedOrganisation = $scope.association[0];


        $scope.images.$loaded().then(function (dataArray) {
            $scope.Imgaes = dataArray;
            if ($routeParams.id == -1) { }
            else {




                $scope.showSendContent = true;

                $scope.Question = $scope.images.$getRecord($routeParams.id);

                $("#name").val($scope.Question.Name);
                $("#email").val($scope.Question.EmailId);
                $("#expiry").val($scope.Question.Expiry);
                var index = _.findLastIndex($scope.association, { OrganisationNumber: $scope.Question.AssociationsId });
                //$scope.SelectedOrganisation = $scope.Question.AssociationsId;

                $scope.SelectedOrganisation = $scope.association[index];

                //$scope.SetCheckBoxValue("Associations1", $scope.Question.IsAssociations1);
                //$scope.SetCheckBoxValue("Associations2", $scope.Question.IsAssociations2);
                //$scope.SetCheckBoxValue("Associations3", $scope.Question.IsAssociations3);
                //$scope.SetCheckBoxValue("Associations4", $scope.Question.IsAssociations4);

                $scope.SetCheckBoxValue("hours", $scope.Question.IsHours);
                $scope.SetCheckBoxValue("distance", $scope.Question.IsDistance);
                $scope.SetCheckBoxValue("cords", $scope.Question.IsCords);
                $scope.SetCheckBoxValue("ridecount", $scope.Question.IsRideCount);


                $scope.SetCheckBoxValue("topspeed", $scope.Question.IsTopSpeed);
                $scope.SetCheckBoxValue("avgspeed", $scope.Question.IsAvgSpeed);

                $scope.SetCheckBoxValue("energy", $scope.Question.IsEnergy);

                $scope.DownloadLink = $scope.url + $routeParams.id;


            }
        }).catch(function (error) {
            console.log("Error in loading details");
        });

    }).catch(function (error) {
    });

    $scope.OnOrganisaionChange = function (FinalOrg) {
        $scope.FinalOrg = FinalOrg;
        //$scope.orgnumber= item.OrganisationNumber
    }

    $scope.Collopse = function (image) {


        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        $("#titleedit").val(image.QuestionText);
        $("#linkedit").val(image.AnswerText);
        $("#editmodal").modal('show');
    }

    $scope.EditQuestion = function () {

        $("#reportModal").show();

        var imageRef = $scope.images.$getRecord($routeParams.id);
        imageRef.Name = $("#name").val();
        imageRef.EmailId = $("#email").val();
        imageRef.Expiry = $("#expiry").val();

        imageRef.IsHorseName = 1;
        imageRef.AssociationsId = $scope.SelectedOrganisation.OrganisationNumber;
        //imageRef.IsAssociations1 = $scope.GetCheckBoxValue("Associations1");
        //imageRef.IsAssociations2 = $scope.GetCheckBoxValue("Associations2");
        //imageRef.IsAssociations3 = $scope.GetCheckBoxValue("Associations3");
        //imageRef.IsAssociations4 = $scope.GetCheckBoxValue("Associations4");


        imageRef.IsCords = $scope.GetCheckBoxValue("cords");
        imageRef.IsDistance = $scope.GetCheckBoxValue("distance");
        imageRef.IsHours = $scope.GetCheckBoxValue("hours");
        imageRef.IsRideCount = $scope.GetCheckBoxValue("ridecount");

        imageRef.IsTopSpeed = $scope.GetCheckBoxValue("topspeed");
        imageRef.IsAvgSpeed = $scope.GetCheckBoxValue("avgspeed");

        imageRef.IsEnergy = $scope.GetCheckBoxValue("energy");
        
        
        $scope.images.$save(imageRef).then(function (res) {

            $("#reportModal").hide();

            $scope.showSendContent = true;
            $scope.DownloadLink = $scope.url + $routeParams.id;
        


        });

        


    }

    $scope.Delete = function () {
        $("#loadingModal").show();
        var question = $scope.Question;
        $scope.images.$remove(question).then(function (ref) {
            var id = ref.key();

            $("#loadingModal").hide();
            window.location.href = "#/report"

        });

    }


    $scope.Cancle = function () {
        window.location.href = "#/report";
    }

    $scope.AddQuestion = function () {
        $("#reportModal").show();
        var imageRef = {};

        imageRef.Name = $("#name").val();
        imageRef.EmailId = $("#email").val();
        imageRef.Expiry = $("#expiry").val();

        imageRef.IsHorseName = 1;
        imageRef.AssociationsId = $scope.SelectedOrganisation.OrganisationNumber;
        //imageRef.IsAssociations2 = $scope.GetCheckBoxValue("Associations2");
        //imageRef.IsAssociations3 = $scope.GetCheckBoxValue("Associations3");
        //imageRef.IsAssociations4 = $scope.GetCheckBoxValue("Associations4");

        imageRef.IsCords = $scope.GetCheckBoxValue("cords");
        imageRef.IsDistance = $scope.GetCheckBoxValue("distance");
        imageRef.IsHours = $scope.GetCheckBoxValue("hours");
        imageRef.IsRideCount = $scope.GetCheckBoxValue("ridecount");

        imageRef.IsTopSpeed = $scope.GetCheckBoxValue("topspeed");
        imageRef.IsAvgSpeed = $scope.GetCheckBoxValue("avgspeed");

        imageRef.IsEnergy = $scope.GetCheckBoxValue("energy");
       
        $scope.images.$add(imageRef).then(function (ref) {
            var id = ref.key();

            $scope.DownloadLink = $scope.url + id;

            $("#reportModal").hide();
            //window.location.href = "#/report"

            $scope.showSendContent = true;

        });

    }

    $scope.Action = function () {
        if ($routeParams.id == -1)
            $scope.AddQuestion();
        else
            $scope.EditQuestion();
    }

   


});

app.controller('reportController', function ($scope, storageService, firebaseService, $firebaseArray) {

    console.log("reportController");


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Reports'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
    }).catch(function (error) {
        console.log("Error in loading details");
    });


   
   
    $scope.Collopse = function (image) {


        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();

        $("#titleedit").val(image.QuestionText);
        $("#linkedit").val(image.AnswerText);
        $("#editmodal").modal('show');
    }

    $scope.EditQuestion = function () {

        var imageRef = $scope.images.$getRecord($scope.cntId);
        imageRef.QuestionText = $("#titleedit").val();
        imageRef.AnswerText = $("#linkedit").val();

        $scope.images.$save(imageRef).then(function (res) {

            //$scope.$apply(function () {
            //    blockUI.stop();
            //});

            ////storageService.setObject("CS", rideRef);
            //swal("", "Your notes details has been edited success fully", "success");
            //console.log(res);
            window.location.reload();

        });


    }

    $scope.RemoveQuestion = function (image) {

        $scope.images.$remove(image).then(function (ref) {
            var id = ref.key();
            if (stb.$id == id) {
                console.log("Deleted success fully");
            }

        });

    }

    $scope.AddQuestion = function () {

        var toAdd = {
            AnswerText: $("#linknew").val(),
            QuestionText: $("#titlenew").val()
        }

        $scope.images.$add(toAdd).then(function (ref) {
            var id = ref.key();
            window.location.reload();

        });

    }

    $scope.Redirect = function () {
        window.location.href = "#/report/-1";
    }
});

