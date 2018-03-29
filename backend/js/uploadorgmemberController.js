
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
            { name: 'association id', enableFiltering: false, headerCellClass: 'blue', field: 'association_id' },
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
    $scope.manipulateData = function (data) {
        $scope.gridOptions.data = [];
        $scope.Errorinrecord = true;
        if (data && data.length > 0 && data[0].length == 5) {
            var alertMsg = "";
            if (!validateColumnName("Member ID", data[0][0]))
                alertMsg += "Member ID  should  be first column";
            if (!validateColumnName("Association ID", data[0][1]))
                alertMsg += "Association ID  be second colum";
            if (!validateColumnName("Member Name", data[0][2]))
                alertMsg += "Member Name  should  be first column";
            if (!validateColumnName("Member Email", data[0][3]))
                alertMsg += "Member Email  should  be first column";
            if (!validateColumnName("Membership Status", data[0][4]))
                alertMsg += "Membership Status  should  be second colum";
            if (alertMsg == "") {
                data[0].push("Possible Errors");
                $scope.Errorinrecord = false;
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
                        possibleErrors += "please currect Association ID";
                        $scope.Errorinrecord = true;
                    }
                    if (!data[cnt][2] || data[cnt][2] == '') {
                        possibleErrors += "please currect Member Name";
                        $scope.Errorinrecord = true;
                    }
                    if (!data[cnt][3] || data[cnt][3] == '') {
                        possibleErrors += "please currect Member Email";
                        $scope.Errorinrecord = true;
                    }
                    if (!data[cnt][4] || data[cnt][4] == '') {
                        possibleErrors += "please currect Membership Status";
                        $scope.Errorinrecord = true;
                    }
                    data[cnt][5] = possibleErrors;
                    var obj = {
                        member_id: data[cnt][0],
                        association_id: data[cnt][1],
                        name: data[cnt][2],
                        email: data[cnt][3],
                        status: data[cnt][4],
                        error: data[cnt][5],
                    }
                    data[cnt] = obj;
                }
                data.splice(0, 1);
                $scope.gridOptions.data = data;
                $scope.$apply();
            }
            else
                alert(alertMsg);
        } else
            //alert(alertMsg);
        swal('You seems to be uploaded a wrong template file, Please verify or download the sample file')
           // this.itHoursService.showErrorMessage("Oops!", "You seems to be uploaded a wrong template file, Please verify or download the sample file");
    }

    $scope.uplodeRecord=function() {
        var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
        $scope.orgmember = $firebaseArray(ref.child('Content').child('OrganisationMember'));
        $scope.orgmember.$add(toAdd).then(function (ref) {

            var id = ref.key();
            console.log("added record with id " + id);
            $("#loadingModal").hide();
            window.location.href = "#/messages";


        });
            }
       
  
});
