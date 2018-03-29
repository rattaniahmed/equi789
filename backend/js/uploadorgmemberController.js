
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
            { name: 'member id', enableFiltering: false, headerCellClass: 'blue', field: 'member ID' },
            ////// //{ name: 'MessageImage', enableFiltering: false, headerCellClass: 'blue', field: 'MessageImage', cellTemplate: '<div style="text-align:center;">' + "<img width=\"40px\" ng-src=\"{{grid.getCellValue(row, col)}}\"></div>", },
            //{ name: 'association ID', enableFiltering: false, headerCellClass: 'blue', field: 'association ID', cellTemplate: '<div style="text-align:center;">' + "<img ng-show=\"row.entity.ImageExist\" width=\"40px\" src=\"{{row.entity.MessageImage}}\"></div>", },
            { name: 'association id', enableFiltering: false, headerCellClass: 'blue', field: 'association ID' },
            { name: 'membership status', headerCellClass: 'blue', field: 'Membership status' },
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
    manipulateClassesData(data) {

        //this.destroyTable("datatablesClass");
        debugger;
        if (data && data.length > 0 && data[0].length == 3) {
            var alertMsg = "";

            if (!this.validateColumnName("Member ID", data[0][0]))
                alertMsg += "Member ID  should  be first column";
            if (!this.validateColumnName("Association ID", data[0][1]))
                alertMsg += "Association ID  be second colum";
            if (!this.validateColumnName("Membership status", data[0][1]))
                alertMsg += "Membership status  should  be second colum";
           
            if (alertMsg == "") {
                data[0].push("Possible Errors");
                $scope.Errorinrecord = false;
                var usernames = [];
                // var useremails: any = [];
                for (var cnt = 1; cnt < data.length; cnt++) {

                    var possibleErrors = "";

                    if (!data[cnt][0] || data[cnt][0] == '') {
                        possibleErrors += "please currect Member ID";
                        this.Errorinrecord = true;
                    }

                    if (usernames.indexOf(data[cnt][0]) >= 0) {
                        possibleErrors += "Duplicare Member ID";
                        this.Errorinrecord = true;
                    } else
                        usernames.push(data[cnt][0]);
                   
                    data[cnt][2] = possibleErrors;
                }
                data.splice(0, 1);


               // this.datatablesClass.dataRows = data;
              //  var self = this;
               // setTimeout(function () {
                  //  self.initTable("datatablesClass");
               // }, 500)
            }
            else
                alert(alertMsg);
        } else
            this.itHoursService.showErrorMessage("Oops!", "You seems to be uploaded a wrong template file, Please verify or download the sample file");
    }
});
