
app.controller('uploadorgmemberController', function ($scope, storageService, firebaseService, $firebaseArray) {

    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 10,
        enableFiltering: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            //$scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
        },
        columnDefs: [
            { name: 'member id', enableFiltering: false, headerCellClass: 'blue', field: 'member_id' },
            ////// //{ name: 'MessageImage', enableFiltering: false, headerCellClass: 'blue', field: 'MessageImage', cellTemplate: '<div style="text-align:center;">' + "<img width=\"40px\" ng-src=\"{{grid.getCellValue(row, col)}}\"></div>", },
            //{ name: 'association ID', enableFiltering: false, headerCellClass: 'blue', field: 'association ID', cellTemplate: '<div style="text-align:center;">' + "<img ng-show=\"row.entity.ImageExist\" width=\"40px\" src=\"{{row.entity.MessageImage}}\"></div>", },
           // { name: 'association id', enableFiltering: false, headerCellClass: 'blue', field: 'association_id' },
            { name: 'membership Name', headerCellClass: 'blue', field: 'name' },
            { name: 'membership Email', headerCellClass: 'blue', field: 'email' },
            { name: 'membership status', headerCellClass: 'blue', field: 'status' },
            { name: 'membership errors', headerCellClass: 'blue', field: 'error' },

            //{ name: 'AnnouncementType', headerCellClass: 'blue', cellTemplate: '<div style="text-align:center;">' + "<img width=\"25px\" ng-src=\"{{grid.getCellValue(row, col)}}\" lazy-src></div>", field: 'AnnouncementType' },
            //{ name: 'Read', headerCellClass: 'blue', field: 'Read' },
        ],

    };
    $scope.user = JSON.parse(localStorage.getItem("adminObject"));
    $scope.browseFile = function () {
        document.getElementById('addphoto').click();
    };

    $("#addphoto").change(function () {
        readURL(this);
    });
    function validateColumnName(name, datarow) {
        if (datarow) {
            if (datarow.toLocaleLowerCase() != name.toLocaleLowerCase())
                return false;
            else
                return true;
        } else {
            return false;
        }
    }
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                debugger;
                var data = reader.result;
                var workbook = XLSX.read(data, { type: 'binary' });

                const wsname = workbook.SheetNames[0];
                const ws = workbook.Sheets[wsname];
                var tempdata = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
                $scope.manipulateData(tempdata);
                ///
                //debugger;
                //workbook.SheetNames.forEach(function (sheetName) {
                //    var rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                //    $scope.tempdata.push(rowObject);
                //});
                //for (var i = 0; i < $scope.tempdata.length; i++) {
                //    var data = $scope.tempdata[i];
                //   // $scope.tempdata.push(data);
                //}
                //debugger;
            }

            reader.readAsBinaryString(input.files[0]);
        }
    }
    $scope.Errorinrecord = true;
    $scope.uploadeddata = [];
    $scope.manipulateData = function (data) {
        $scope.gridOptions.data = [];
        $scope.uploadeddata = [];
        $scope.Errorinrecord = true;
        if (data && data.length > 0 && data[0].length == 4) {
            var alertMsg = "";
            if (!validateColumnName("Member ID", data[0][0]))
                alertMsg += "Member ID  should  be first column";
            if (!validateColumnName("Member Name", data[0][1]))
                alertMsg += "Member Name  should  be first column";
            if (!validateColumnName("Member Email", data[0][2]))
                alertMsg += "Member Email  should  be first column";
            if (!validateColumnName("Membership Status", data[0][3]))
                alertMsg += "Membership Status  should  be second colum";
            if (alertMsg == "") {
                data[0].push("Possible Errors");
                $scope.Errorinrecord = false;
                $scope.$apply();
                var member_Id = [];
                // var useremails: any = [];
                for (var cnt = 1; cnt < data.length; cnt++) {
                    var possibleErrors = "";
                    if (!data[cnt][0] || data[cnt][0] == '') {
                        possibleErrors += "please currect Member ID";
                        $scope.Errorinrecord = true;
                    }
                    if (member_Id.indexOf(data[cnt][0]) >= 0) {
                        possibleErrors += "Duplicare Member ID";
                        $scope.Errorinrecord = true;
                    } else
                        member_Id.push(data[cnt][0]);
                   
                    if (!data[cnt][1] || data[cnt][1] == '') {
                        possibleErrors += "please currect Member Name";
                        $scope.Errorinrecord = true;
                    }
                    if (!data[cnt][2] || data[cnt][2] == '') {
                        possibleErrors += "please currect Member Email";
                        $scope.Errorinrecord = true;
                    }
                    if (!data[cnt][3] || data[cnt][3] == '') {
                        possibleErrors += "please currect Membership Status";
                        $scope.Errorinrecord = true;
                    }
                    data[cnt][4] = possibleErrors;
                    var obj = {
                        member_id: data[cnt][0],
                        name: data[cnt][1],
                        email: data[cnt][2],
                        status: data[cnt][3],
                        error: data[cnt][4],
                    }
                    $scope.uploadeddata.push({
                        member_id: data[cnt][0],
                        name: data[cnt][1],
                        email: data[cnt][2],
                        status: data[cnt][3],
                    });
                    data[cnt] = obj;
                  //  var newobj = obj;
                    
                }
                data.splice(0, 1);
                $scope.gridOptions.data = data;
                $scope.$apply();
            }
            else
                alert(alertMsg);
        } else
            swal('You seems to be uploaded a wrong template file, Please verify or download the sample file')
    }

    $scope.uplodeRecord = function () {
       // $scope.Errorinrecord = true;
        var ref = firebaseService.FIREBASEENDPOINT();  
        for (var i = 0; i < $scope.gridOptions.data.length; i++) {
            var val = $scope.gridOptions.data[i];
            var even =_.find($scope.totalmember, function (num) { return num.member_id == val.member_id && num.association_id == val.association_id ; });
            if (even) {
                $scope.gridOptions.data[i].error = "Member already Exist"
                $scope.Errorinrecord = true;
            }   
        }
        if (!$scope.Errorinrecord) {
            $scope.orgmember = $firebaseArray(ref.child('Members').child("fsdfj").child());
            for (var i = 0; i < $scope.uploadeddata.length; i++) {
                $scope.orgmember.$add($scope.uploadeddata[i]).then(function (ref) { });
            }
            $scope.uploadeddata = [];
            $scope.gridOptions.data = [];
        } else {
            swal('You seems to be uploaded a wrong template file, Please verify all Member details')
        }
        $scope.Errorinrecord = true;
    }

    $scope.init = function () {
        $scope.user = JSON.parse(localStorage.getItem("adminObject"));
        if ($scope.user) {
            $("#loadingModal").show();
            var ref = firebaseService.FIREBASEENDPOINT();
            $scope.totalmemberref = $firebaseArray(ref.child('Members').child("fsdfj"));
            $scope.totalmemberref.$loaded().then(function (dataArray) {
                $scope.totalmember = dataArray;
                $("#loadingModal").hide();
            }).catch(function (error) {
                console.log("Error in loading details");
            });
        } else {
            swal('Something went wrong please check login details')
        }
    }
    $scope.init();
});
