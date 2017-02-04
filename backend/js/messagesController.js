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
        console.log("Error in loading details" + error);
    });

    $scope.OnOrganisaionChange = function (FinalOrg) {
        console.log(FinalOrg);
        $scope.FinalOrg = FinalOrg;
        //$scope.orgnumber= item.OrganisationNumber
    }

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

app.controller('messagesController', function ($scope, storageService, firebaseService, $firebaseArray) {

    console.log("messagesController");


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Messages'));
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
