
app.controller('messagesController', function ($scope, storageService, firebaseService, $firebaseArray) {

    console.log("messagesController");


    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 10,
        enableFiltering: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            //$scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
        },
        columnDefs: [
          { name: 'AnnouncementTitle', enableFiltering: false, headerCellClass: 'blue', field: 'AnnouncementTitle' },
           //{ name: 'MessageImage', enableFiltering: false, headerCellClass: 'blue', field: 'MessageImage', cellTemplate: '<div style="text-align:center;">' + "<img width=\"40px\" ng-src=\"{{grid.getCellValue(row, col)}}\"></div>", },
           { name: 'MessageImage', enableFiltering: false, headerCellClass: 'blue', field: 'MessageImage', cellTemplate: '<div style="text-align:center;">' + "<img ng-show=\"row.entity.ImageExist\" width=\"40px\" src=\"{{row.entity.MessageImage}}\"></div>", },
          { name: 'ExpirationDate', enableFiltering: false, headerCellClass: 'blue', field: 'ExpirationDate' },
          { name: 'Status', headerCellClass: 'blue', field: 'Status' },
          { name: 'AnnouncementType', headerCellClass: 'blue', cellTemplate: '<div style="text-align:center;">' + "<img width=\"25px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src></div>", field: 'AnnouncementType' },
          { name: 'Read', headerCellClass: 'blue', field: 'Read' },
          {
              name: " ", cellTemplate: '<div style="text-align:center;">' +
                      '<a href="#/messages/{{row.entity.$id}}">Edit</a>' +
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
      
        debugger;
        for (cnt = 0; cnt < dataArray.length; cnt++) {

            if (anumber == dataArray[cnt].OrganisationId) {
                var obj = dataArray[cnt];
                var d = Date.parse(dataArray[cnt].ExpirationDate);
                if (today < d) {
                    obj.Status = "Active";
                } else {
                    obj.Status = "Expired";
                }
                obj
                //obj.ImageUrl = obj.AnnouncementType;
                if (obj.MessageImage) {
                    
                }
                else
                    obj.MessageImage = "";

                obj.ImageExist  = false;
                if (obj.MessageImage != "")
                    obj.ImageExist = true;
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
        imageRef.ExpirationDate = $("#expiry").val();
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
            ExpirationDate: $("#expiry").val(),
      
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
