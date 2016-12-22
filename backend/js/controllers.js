﻿
app.controller('imagesController', function ($scope, storageService, firebaseService, $firebaseArray) {

    //console.log("images");


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
        console.log(dataArray);
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

            debugger;
            var url = snapshot.metadata.downloadURLs[0];

            $("#loadingModal").show();

            var imageRef = $scope.images.$getRecord($scope.cntIndex);
            imageRef.Url = url;

            $scope.images.$save(imageRef).then(function (res) {

                $("#loadingModal").hide();
                console.log(res);
                window.location.reload();

            });



        }).catch(function (error) {
            console.error('Upload failed:', error);
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
        debugger;
        var updated = CKEDITOR.instances.editor1.getData();
        var toUpdate = $scope.Imgaes.$getRecord($scope.itemSelected.$id);
        toUpdate.$value = updated;

        $("#loadingModal").show();

        $scope.images.$save(toUpdate).then(function (res) {
            console.log(res);
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

            debugger;
           

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
            debugger;
            CKEDITOR.instances.editor1.setData($scope.itemSelected.val);
        });

        

        console.log($scope.Sections);

    }).catch(function (error) {
        console.log("Error in loading details");
    });

 

    $scope.onCategoryChange = function (itemSelected) {

        CKEDITOR.instances.editor1.setData($scope.itemSelected.val);
    }

    $scope.UpdateContent = function () {
        debugger;
        var updated = CKEDITOR.instances.editor1.getData();
        var toUpdate = $scope.Imgaes.$getRecord($scope.itemSelected.name);
        toUpdate[$scope.itemSelected.key] = updated;

        $("#loadingModal").show();
        $scope.images.$save(toUpdate).then(function (res) {

            $("#loadingModal").hide();
            console.log(res);
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
        console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $scope.UpdateImage = function (image, index) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        debugger;

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

            debugger;
            var url = snapshot.metadata.downloadURLs[0];

            $("#loadingModal").show();

            var imageRef = $scope.images.$getRecord($scope.cntId);
            imageRef.Url = url;
            imageRef.DisplayName = $("#titleedit").val();
            imageRef.HrefLink = $("#linkedit").val();

           

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

    $scope.RemoveSponser = function (image) {
        $("#loadingModal").show();
        $scope.images.$remove(image).then(function (ref) {
            debugger;
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

            debugger;
            var url = snapshot.metadata.downloadURLs[0];

            var toAdd = {
                Url: url,
                DisplayName:$("#titlenew").val(),
                HrefLink:$("#linknew").val()
            }

            $("#modalid").hide();

            $scope.images.$add(toAdd).then(function (ref) {
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
});

app.controller('faqController', function ($scope, storageService, firebaseService, $firebaseArray) {

    console.log("faqController");


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('FAQ'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.Collopse = function (image) {

        console.log(image);

        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        debugger;

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
            console.log(res);
            window.location.reload();

        });


    }

    $scope.RemoveQuestion = function (image) {
        $("#loadingModal").show();
        $scope.images.$remove(image).then(function (ref) {
            debugger;
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
            debugger;
            var id = ref.key();
            console.log("added record with id " + id);

            $("#loadingModal").hide();
            window.location.reload();

        });

    }

    $scope.Redirect = function () {
        window.location.href = "#/faq/-1";
    }

});

app.controller('editFaqController', function ($scope, $routeParams, storageService, firebaseService, $firebaseArray) {

    console.log("editFaqController" + $routeParams.id);

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

            
            console.log(dataArray);
        }
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.Collopse = function (image) {

        console.log(image);

        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        debugger;
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        debugger;

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
            console.log(res);
            window.location.href = "#/faq"

        });


    }

    $scope.Delete = function () {
        $("#loadingModal").show();
        var question = $scope.Question;
        $scope.images.$remove(question).then(function (ref) {
            debugger;
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
            debugger;
            var id = ref.key();
            console.log("added record with id " + id);
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

    console.log("faqController");


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('News'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.Collopse = function (image) {

        console.log(image);

        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        debugger;

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
            AnswerText: $("#linknew").val(),
            QuestionText: $("#titlenew").val()
        }

        $scope.images.$add(toAdd).then(function (ref) {
            debugger;
            var id = ref.key();
            console.log("added record with id " + id);


            window.location.reload();

        });

    }

    $scope.Redirect = function () {
        window.location.href = "#/news/-1";
    }
});

app.controller('editNewsController', function ($scope, $routeParams, storageService, firebaseService, $firebaseArray) {

    console.log("editNewsController" + $routeParams.id);

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

        console.log(image);

        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        debugger;

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
            console.log(res);
            window.location.href = "#/news"

        });


    }

    $scope.Delete = function () {
        $("#loadingModal").show();
        var question = $scope.Question;
        $scope.images.$remove(question).then(function (ref) {
            debugger;
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
            debugger;
            var id = ref.key();
            console.log("added record with id " + id);
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

    console.log("editReportController" + $routeParams.id);

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
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        if ($routeParams.id == -1) { }
        else {

            $scope.showSendContent = true;

            $scope.Question = $scope.images.$getRecord($routeParams.id);
            $("#name").val($scope.Question.Name);
            $("#email").val($scope.Question.EmailId);
            $("#expiry").val($scope.Question.Expiry);

            $scope.SetCheckBoxValue("Associations1", $scope.Question.IsAssociations1);
            $scope.SetCheckBoxValue("Associations2", $scope.Question.IsAssociations2);
            $scope.SetCheckBoxValue("Associations3", $scope.Question.IsAssociations3);
            $scope.SetCheckBoxValue("Associations4", $scope.Question.IsAssociations4);

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



    $scope.Collopse = function (image) {

        console.log(image);

        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        debugger;

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

        imageRef.IsHorseName= 1;
        imageRef.IsAssociations1 = $scope.GetCheckBoxValue("Associations1");
        imageRef.IsAssociations2 = $scope.GetCheckBoxValue("Associations2");
        imageRef.IsAssociations3 = $scope.GetCheckBoxValue("Associations3");
        imageRef.IsAssociations4 = $scope.GetCheckBoxValue("Associations4");


        imageRef.IsCords = $scope.GetCheckBoxValue("cords");
        imageRef.IsDistance = $scope.GetCheckBoxValue("distance");
        imageRef.IsHours = $scope.GetCheckBoxValue("hours");
        imageRef.IsRideCount = $scope.GetCheckBoxValue("ridecount");

        imageRef.IsTopSpeed = $scope.GetCheckBoxValue("topspeed");
        imageRef.IsAvgSpeed = $scope.GetCheckBoxValue("avgspeed");

        imageRef.IsEnergy = $scope.GetCheckBoxValue("energy");
        
        
        $scope.images.$save(imageRef).then(function (res) {

            $("#reportModal").hide();
            console.log(res);

            $scope.showSendContent = true;
            $scope.DownloadLink = $scope.url + $routeParams.id;
        


        });

        


    }

    $scope.Delete = function () {
        $("#loadingModal").show();
        var question = $scope.Question;
        $scope.images.$remove(question).then(function (ref) {
            debugger;
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
        imageRef.IsAssociations1 = $scope.GetCheckBoxValue("Associations1");
        imageRef.IsAssociations2 = $scope.GetCheckBoxValue("Associations2");
        imageRef.IsAssociations3 = $scope.GetCheckBoxValue("Associations3");
        imageRef.IsAssociations4 = $scope.GetCheckBoxValue("Associations4");

        imageRef.IsCords = $scope.GetCheckBoxValue("cords");
        imageRef.IsDistance = $scope.GetCheckBoxValue("distance");
        imageRef.IsHours = $scope.GetCheckBoxValue("hours");
        imageRef.IsRideCount = $scope.GetCheckBoxValue("ridecount");

        imageRef.IsTopSpeed = $scope.GetCheckBoxValue("topspeed");
        imageRef.IsAvgSpeed = $scope.GetCheckBoxValue("avgspeed");

        imageRef.IsEnergy = $scope.GetCheckBoxValue("energy");
       
        $scope.images.$add(imageRef).then(function (ref) {
            debugger;
            var id = ref.key();

            $scope.DownloadLink = $scope.url + id;

            console.log("added record with id " + id);
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
        console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.Collopse = function (image) {

        console.log(image);

        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        debugger;

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
            AnswerText: $("#linknew").val(),
            QuestionText: $("#titlenew").val()
        }

        $scope.images.$add(toAdd).then(function (ref) {
            debugger;
            var id = ref.key();
            console.log("added record with id " + id);


            window.location.reload();

        });

    }

    $scope.Redirect = function () {
        window.location.href = "#/report/-1";
    }
});

app.controller('HorseDetailController', function ($scope, $routeParams,storageService, firebaseService, $firebaseArray) {

    console.log("HorseDetailController");
    $scope.editId = $routeParams.id;

    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 10,
        enableFiltering: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
        },
        columnDefs: [
          { name: 'horse_name', enableFiltering: false, headerCellClass: 'blue' },
          { name: 'registration', displayName: 'Breed', headerCellClass: 'blue' },
          { name: 'birthday', headerCellClass: 'blue' },
         
          {
              name: " ", cellTemplate: '<div style="text-align:center;">' +
                      '<a href="#/rides/{{row.entity.$id}}" >Rides</a>' +
                      '</div>', enableFiltering: false
          },
        {
            name: "    ", cellTemplate: '<div>' +
                    '<div>   <div ng-click="grid.appScope.RemoveHorse(row,col)" class="ui-grid-cell-contents" title="TOOLTIP" style="text-align:center;">Remove</div> </div>',
            enableFiltering: false
        }
        ]
    };


    $scope.RemoveHorse = function (row, col) {
        swal({
            title: "Are you sure?",
            text: "You Want to delete horse!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
        function () {
    
        //get horse object
        $scope.horse = $scope.horses.$getRecord(row.entity.$id);

        //remve object from horse ref
        $scope.horses.$remove($scope.horse).then(function (ref) {

            var id = ref.key();
            if ($scope.horse.$id == id) {
                console.log("Deleted success fully");
            }

        })

        // delete fom user's object 
        delete $scope.user.horse_ids[row.entity.$id];

        // delete rides of horse 
        angular.forEach($scope.horse.ride_ids, function (value, key) {
            var ride = $scope.rides.$getRecord(key);

            $scope.rides.$remove(ride).then(function (ref) {

                var id = ref.key();
                if ($scope.ride.$id == id) {
                    console.log("Deleted success fully");
                }
            });

        });

       
        $scope.stables = [];
        angular.forEach($scope.user.horse_ids, function (value, key) {
            //console.log(value);
            console.log(key);
            var horse = $scope.horses.$getRecord(key);
            if (horse != null) {

                $scope.stables.push(horse);
            }
            console.log($scope.stables);
            $scope.gridOptions.data = $scope.stables;

        });

        $scope.users.$save($scope.user).then(function (res) {
        });

        swal("Deleted!", "Your imaginary file has been deleted.", "success");
        });

    }
    
    $scope.filterValue = '';
    $scope.Search = function () {
        $scope.filterValue = document.getElementById("search").value;
        $scope.gridApi.grid.refresh();
    }

    $scope.singleFilter = function (renderableRows) {
        debugger;
        var matcher = new RegExp($scope.filterValue);
        renderableRows.forEach(function (row) {
            debugger;
            var match = false;
            ['horse_name', 'registration', 'birthday'].forEach(function (field) {
                if (row.entity[field].match(matcher)) {
                    match = true;
                }
            });
            if (!match) {
                row.visible = false;
            }
        });
        return renderableRows;
    }
    $scope.stables = [];

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.users = $firebaseArray(ref.child('users'));
    

    
    $scope.onCategoryChange = function (user) {
        $scope.gridOptions.data = $scope.GetUserHorse($scope.user);
    }

    $scope.users.$loaded().then(function (dataArray) {

        $scope.userToShow = [];
        angular.forEach(dataArray, function (value, key) {
            $scope.userToShow.push(value);
        });
        $scope.itemSelected = $scope.userToShow[0];
        $scope.user = $scope.users.$getRecord($scope.editId);

        $scope.horses = $firebaseArray(ref.child('horses'));
        $scope.horses.$loaded().then(function (dataArray) {

            console.log(dataArray);
            angular.forEach($scope.user.horse_ids, function (value, key) {
                //console.log(value);
                console.log(key);
                //var horse = value;// $scope.horses.$getRecord(key);
                var horse =  $scope.horses.$getRecord(key);
                if (horse != null) {
                    horse.photo = "";//CleanHorseProfileUrl(horse.photo);


                    try {
                        var today = new Date();
                        var d = new Date(horse.birthday);
                        if (Object.prototype.toString.call(d) === "[object Date]") {
                            // it is a date
                            if (isNaN(d.getTime())) {  // d.valueOf() could also work
                            }
                            else {
                                var diff = today - d;
                                var days = parseInt(diff / 1000 / 60 / 60 / 24);
                                debugger;
                                console.log(days);

                                var year = parseInt(days / 365);


                                if (year == 1)
                                    horse.AgeToDisplay = "1 year, ";
                                else
                                    horse.AgeToDisplay = year + " years, ";

                                var remainDay = parseInt(days % 365);

                                var month = parseInt(remainDay / 30);

                                if (month == 1)
                                    horse.AgeToDisplay += "1 month ";
                                else
                                    horse.AgeToDisplay += month + " months ";

                                //horse.AgeToDisplay += "old";
                            }
                        }
                        else {
                            // not a date
                        }
                    }
                    catch (err) { }


                    $scope.stables.push(horse);
                }
                console.log($scope.stables);
                
            });

            $scope.gridOptions.data = $scope.stables;
            //$scope.gridOptions.data = $scope.GetUserHorse($scope.user); //$scope.stables;  = .horse_ids

        }).catch(function (error) {
            console.log("Error in loading details");
        });

    });
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.rides.$loaded().then(function (dataArray) {
        // $scope.horses = dataArray;
    }).catch(function (error) {
        console.log("Error in loading details");
    });
});
