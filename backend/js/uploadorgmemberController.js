
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
          //  { name: 'member Email', headerCellClass: 'blue', field: 'email' },
         //   { name: 'member id', enableFiltering: false, headerCellClass: 'blue', field: 'member_id' },
          //  { name: 'member Name', headerCellClass: 'blue', field: 'name' },
            //{ name: 'Possible errors', headerCellClass: 'blue', field: 'error' },
        ],

    };
    $scope.Excelsheetcolumn = [
        { name: "Member ID", value: 0 },
        { name: "Member Email", value: 1 },
        { name: "Member Name", value: 2 },
        { name: "Optional", value: 3 }
    ]
    $scope.user = JSON.parse(localStorage.getItem("adminObject"));
    $scope.browseFile = function () {
        $scope.showgrid = false;
       // $("#gridid").css("display", "none");
        document.getElementById('addphoto').click();
    };

    $("#addphoto").change(function () {
        readURL(this);
    });
    //function validateColumnName(name, datarow) {
    //    if (datarow) {
    //        if (datarow.toLocaleLowerCase() != name.toLocaleLowerCase())
    //            return false;
    //        else
    //            return true;
    //    } else {
    //        return false;
    //    }
    //}
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
               // $scope.manipulateData(tempdata);
                $scope.showlistdata = tempdata;
                $scope.mappings = [];
              //  $scope.Excelsheetcolumn.unshift({ name: '--Please select--', value: null });
                for (var c = 0; c < $scope.showlistdata[0].length; c++) {
                    $scope.mappings.push({
                        sourcecol: $scope.showlistdata[0][c],
                        destArray: $scope.Excelsheetcolumn,
                        selecetedDest: null
                    })
                }
                $scope.$apply();
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
    //$scope.uniqueselection = function (array) {
    //    var flags = [], output = [], l = array.length, i;
    //    for (i = 0; i < l; i++) {
    //        if (array[i].selecetedDest) {
    //            if (flags[array[i].selecetedDest.name]) continue;
    //            flags[array[i].selecetedDest.name] = true;
    //            output.push(array[i].selecetedDest.name);
    //        }
    //    }
    //    return output;
    //}

    $scope.uniqueselection1 = function (array) {
        var selected = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i].selecetedDest) {
                if (array[i].selecetedDest.name != "Optional") { 
                    if (selected.indexOf(array[i].selecetedDest.name) >= 0) {
                        return { issuccess: false, maps: [] };
                    } else
                        selected.push(array[i].selecetedDest.name);
                }
            }
        }
        return { issuccess: true, maps: selected };
    }
    

    $scope.getIndexByMapping = function (attrval, array) {
        var selected = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i].selecetedDest) {
                if (array[i].selecetedDest.value == attrval)
                    return i
            }
        }
        return 0;
    }
    $scope.showgrid = false;
    $scope.manipulateData = function (data,mapp) {
        debugger
        var res = $scope.uniqueselection1(mapp);
        if (res.issuccess) {

           // if (res.maps.length != $scope.Excelsheetcolumn.length) {
            if (res.maps.length < 2 || res.maps.indexOf("Member ID") == -1 || res.maps.indexOf("Member Email") == -1) {
                swal('please map all required column-1.Member ID 2.Member Email');
                return;
            }
            debugger;
            //for (k = 0; k < maps.length; k++) {
            //    if (maps.sourcecol == "") { }
            //    if (maps.sourcecol == "") { }
            //}
            for (var cl = 0; cl < mapp.length; cl++) {
                //if (mapp[cl].selecetedDest && mapp[cl].selecetedDest.value != 0 && mapp[cl].selecetedDest.value != 1) {
                    $scope.gridOptions.columnDefs.push({
                        name: mapp[cl].sourcecol, headerCellClass: 'blue', field: mapp[cl].sourcecol
                    });
                //}
            }
            
            //$scope.gridOptions.columnDefs.push({
              //  name: 'membership status', headerCellClass: 'blue', field: 'status'
            //});
            $scope.gridOptions.columnDefs.push({
                name: 'Possible errors', headerCellClass: 'blue', field: 'error'
            });
            $scope.gridOptions.data = [];
            $scope.uploadeddata = [];
            $scope.Errorinrecord = true;
            if (data && data.length > 0) {
                $scope.showgrid = true;
                var alertMsg = "";
                //if (!validateColumnName("Member ID", data[0][0]))
                //    alertMsg += "Member ID  should  be first column";
                //if (!validateColumnName("Member Name", data[0][1]))
                //    alertMsg += "Member Name  should  be first column";
                //if (!validateColumnName("Member Email", data[0][2]))
                //    alertMsg += "Member Email  should  be first column";
                //if (!validateColumnName("Membership Status", data[0][3]))
                //    alertMsg += "Membership Status  should  be second colum";
                if (alertMsg == "") {
                    if (data[0].indexOf("Possible Errors") >= 0) { } else {
                        data[0].push("Possible Errors");
                    }
                    $scope.Errorinrecord = false;
                    var member_Id = [];
                    var memberIdIndex = $scope.getIndexByMapping(0, mapp);
                    var memberEmailIndex = $scope.getIndexByMapping(1, mapp);
                    //var memberstatusIndex = $scope.getIndexByMapping(3, mapp);
                    debugger;
                    //var memberstatusIndex = $scope.getIndexByMappingforoptional(data[0], mapp);

                    // var useremails: any = [];
                    for (var cnt = 1; cnt < data.length; cnt++) {
                        debugger;
                        var possibleErrors = "";
                        //if (!data[cnt][memberNameIndex] || data[cnt][memberNameIndex] == '') {
                        //    possibleErrors += "please currect Member Name";
                        //    $scope.Errorinrecord = true;
                        //}
                        //if (!data[cnt][memberstatusIndex] || data[cnt][memberstatusIndex] == '') {
                        //    possibleErrors += "please currect Membership Status";
                        //    $scope.Errorinrecord = true;
                        //}
                        var obj = {
                            status: true,
                        }
                        var obj1 = {
                            status: true,
                        }
                        debugger;
                        for (var cl = 0; cl < mapp.length; cl++) {
                           // if (mapp[cl].selecetedDest && mapp[cl].selecetedDest.value != 0 && mapp[cl].selecetedDest.value != 1) {
                                if (mapp[cl].selecetedDest && mapp[cl].selecetedDest.value == 0) {
                                    if (!data[cnt][data[0].indexOf(mapp[cl].sourcecol)] || data[cnt][data[0].indexOf(mapp[cl].sourcecol)] == '') {
                                        possibleErrors += "please currect Member ID";
                                        $scope.Errorinrecord = true;
                                    }
                                    if (member_Id.indexOf(data[cnt][data[0].indexOf(mapp[cl].sourcecol)]) >= 0) {
                                        possibleErrors += "Duplicare Member ID";
                                        $scope.Errorinrecord = true;
                                    } else
                                        member_Id.push(data[cnt][data[0].indexOf(mapp[cl].sourcecol)]);
                                    obj.member_id = data[cnt][data[0].indexOf(mapp[cl].sourcecol)]
                                    obj1.member_id = data[cnt][data[0].indexOf(mapp[cl].sourcecol)]
                                }
                                else if (mapp[cl].selecetedDest && mapp[cl].selecetedDest.value == 1) {
                                    if (!data[cnt][data[0].indexOf(mapp[cl].sourcecol)] || data[cnt][data[0].indexOf(mapp[cl].sourcecol)] == '') {
                                        possibleErrors += "please currect Member Email";
                                        $scope.Errorinrecord = true;
                                    }
                                    
                                    obj.email = data[cnt][data[0].indexOf(mapp[cl].sourcecol)]
                                    obj1.email = data[cnt][data[0].indexOf(mapp[cl].sourcecol)]
                                } else {
                                    obj[mapp[cl].sourcecol] = data[cnt][data[0].indexOf(mapp[cl].sourcecol)] || "";
                                    obj1[mapp[cl].sourcecol] = data[cnt][data[0].indexOf(mapp[cl].sourcecol)] || "";
                            }
                               
                           // }
                        }
                        data[cnt][data[0].length] = possibleErrors;
                        obj.error = data[cnt][data[0].length];
                        $scope.uploadeddata.push(obj1);
                        data[cnt] = obj;
                        //  var newobj = obj;

                    }
                   
                    data.splice(0, 1);
                    
                    //$("#gridid").css("display", "block");
                   // setTimeout(function () {
                   // $scope.gridOptions.enableGridMenu = true;
                    $scope.gridOptions.data = data;
                  //  $scope.gridApi.grid.refresh();
                    try {
                        $scope.gridApi.core.refresh();
                    } catch (err) {

                    }

                    //$scope.$apply();
                   // }, 1000);
                   
                }
                else
                    alert(alertMsg);
            } else
                swal('You seems to be uploaded a wrong template file, Please verify or download the sample file')
        } else {
              swal('please map all destination required column');
        }
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
            $scope.orgmember = $firebaseArray(ref.child('Members').child($scope.user.OrganisationNumber));
            for (var i = 0; i < $scope.uploadeddata.length; i++) {
                $scope.orgmember.$add($scope.uploadeddata[i]).then(function (ref) { });
            }
            $scope.uploadeddata = [];
            $scope.gridOptions.data = [];
        } else {
            swal('You seems to be uploaded a wrong template file, Please verify all Member details.Some Member already exist')
        }
        $scope.Errorinrecord = true;
    }

    $scope.init = function () {
        $scope.user = JSON.parse(localStorage.getItem("adminObject"));
        if ($scope.user) {
            $("#loadingModal").show();
            var ref = firebaseService.FIREBASEENDPOINT();
            $scope.totalmemberref = $firebaseArray(ref.child('Members').child($scope.user.OrganisationNumber));
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
