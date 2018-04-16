
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
    $scope.showcontent=false;
$scope.showbrowsebtn=false;
    $scope.Excelsheetcolumn = [
        { name: "Member ID", value: 0 },
        { name: "Member Email", value: 1 },
        { name: "Member Name", value: 2 },
        { name: "Optional", value: 3 }
    ]
    $scope.user = JSON.parse(localStorage.getItem("adminObject"));
    $scope.browseFile = function () {
        $scope.showgrid = false;
        $scope.showbrowsebtn=true;
       // $("#gridid").css("display", "none");
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
                $scope.showlistdata = tempdata;
                $scope.mappings = [];
                for (var c = 0; c < $scope.showlistdata[0].length; c++) {
                    $scope.mappings.push({
                        sourcecol: $scope.showlistdata[0][c],
                        destArray: $scope.Excelsheetcolumn,
                        selecetedDest: null
                    })
                }
                $scope.showcontent=true;
                $scope.$apply();
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

    $scope.optional=function()
    {
       
       for(i=0;i<$scope.mappings.length;i++)
       {
        $scope.mappings[i].selecetedDest=$scope.mappings[i].destArray[3];
    
      
       }
       
    }
     $scope.msg="--Please Select--";
     $scope.reset=function()
    {
       
       for(i=0;i<$scope.mappings.length;i++)
       {
        $scope.mappings[i].selecetedDest=$scope.msg;
    
      
       }
       
    }

    $scope.showgrid = false;
    $scope.manipulateData = function (data, mapp) {
        debugger
        

        var res = $scope.uniqueselection1(mapp);
        if (res.issuccess) {
            if (res.maps.length < 2 || res.maps.indexOf("Member ID") == -1 || res.maps.indexOf("Member Email") == -1) {

                swal({
                    title: "",
                    text: "<p> Please map the  required fields:</p> <br/><p>1.Member ID</p> <br/><p>&emsp; 2.Member Email</p> ",
                    type: "warning",
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: "OK",
                    html:true
                });
                //swal('Please map the required fields:\n1.Member ID\n2.Member Email ');
              
              
                return
            }
            $scope.showcontent=false;
           
            $scope.gridOptions.columnDefs = new Array();
            $scope.gridOptions.columnDefs.push({
                name: "member_id", headerCellClass: 'blue', field: "member_id"
            });
            $scope.gridOptions.columnDefs.push({
                name: "email", headerCellClass: 'blue', field: "email"
            });
            $scope.gridOptions.columnDefs.push({
                name: "member_name", headerCellClass: 'blue', field: "member_name"
            });

            

            for (var cl = 0; cl < mapp.length; cl++) {
                if (mapp[cl].selecetedDest && mapp[cl].selecetedDest.name == "Optional") {
                    $scope.gridOptions.columnDefs.push({
                        name: mapp[cl].sourcecol+" "+"(Optional)", field: mapp[cl].sourcecol
                    });
                }
            }
            $scope.gridOptions.columnDefs.push({
                name: 'Possible errors', headerCellClass: 'red', field: 'error'
            });

            $scope.gridOptions.columnDefs.push({
                name: "Edit member", headerCellClass: 'blue',  cellTemplate: '<div>' +
                    '<div >   <div class="actionclass" ng-click="grid.appScope.ViewOptional(row,col)" class="ui-grid-cell-contents" title="TOOLTIP" style="text-align:center;"><i class="fa fa-edit"></i></div> </div>',
                enableFiltering: false }
            );

            $scope.gridOptions.data = [];
            $scope.uploadeddata = [];
            $scope.Errorinrecord = true;
            if (data && data.length > 0) {
                $scope.showgrid = true;
                if (data[0].indexOf("Possible Errors") >= 0) { } else {
                    data[0].push("Possible Errors");
                }
                $scope.Errorinrecord = false;
                var member_Id = [];
                var memberIdIndex = $scope.getIndexByMapping(0, mapp);
                var memberEmailIndex = $scope.getIndexByMapping(1, mapp);
                var memberNameIndex = $scope.getIndexByMapping(2, mapp);

                for (var cnt = 1; cnt < data.length; cnt++) {
                    var possibleErrors = "";
                    var obj = {
                        status: true,
                    }
                    var obj1 = {
                        status: true,
                    }
                    debugger;
                    var toLoopArray = $scope.gridOptions.columnDefs;
                    for (var cl = 0; cl < toLoopArray.length; cl++) {
                        var toLoop = toLoopArray[cl];
                        if (toLoop.field == "member_id") {
                            obj.member_id = data[cnt][memberIdIndex] || '';
                            obj1.member_id = data[cnt][memberIdIndex] || '';
                            if (obj.member_id == '') {
                                possibleErrors += "please currect Member ID";
                                $scope.Errorinrecord = true;
                            }
                            if (member_Id.indexOf(data[cnt][memberIdIndex]) >= 0) {
                                possibleErrors += "Duplicate Member ID";
                                $scope.Errorinrecord = true;
                            } else
                                member_Id.push(data[cnt][memberIdIndex]);
                        } else if (toLoop.field == "email") {
                            obj.email = data[cnt][memberEmailIndex] || '';
                            obj1.email = data[cnt][memberEmailIndex] || '';
                            if (obj.email == '' || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.email))) {
                                possibleErrors += "please currect Member email";
                                $scope.Errorinrecord = true;
                            }
                        } else if (toLoop.field == "member_name") {
                            obj.member_name = data[cnt][memberNameIndex] || '';
                            obj1.member_name = data[cnt][memberNameIndex] || '';
                        } else {
                            obj[toLoop.field] = data[cnt][data[0].indexOf(toLoop.field)] || "";
                            obj1[toLoop.field] = data[cnt][data[0].indexOf(toLoop.field)] || "";
                        }



                        // if (mapp[cl].selecetedDest && mapp[cl].selecetedDest.value != 0 && mapp[cl].selecetedDest.value != 1) {
                        //if (mapp[cl].selecetedDest && mapp[cl].selecetedDest.value == 0) {
                        //    if (!data[cnt][data[0].indexOf(mapp[cl].sourcecol)] || data[cnt][data[0].indexOf(mapp[cl].sourcecol)] == '') {
                        //        possibleErrors += "please currect Member ID";
                        //        $scope.Errorinrecord = true;
                        //    }
                        //    if (member_Id.indexOf(data[cnt][data[0].indexOf(mapp[cl].sourcecol)]) >= 0) {
                        //        possibleErrors += "Duplicare Member ID";
                        //        $scope.Errorinrecord = true;
                        //    } else
                        //        member_Id.push(data[cnt][data[0].indexOf(mapp[cl].sourcecol)]);
                        //    obj.member_id = data[cnt][data[0].indexOf(mapp[cl].sourcecol)]
                        //    obj1.member_id = data[cnt][data[0].indexOf(mapp[cl].sourcecol)]
                        //}
                        //else if (mapp[cl].selecetedDest && mapp[cl].selecetedDest.value == 1) {
                        //    if (!data[cnt][data[0].indexOf(mapp[cl].sourcecol)] || data[cnt][data[0].indexOf(mapp[cl].sourcecol)] == '') {
                        //        possibleErrors += "please currect Member Email";
                        //        $scope.Errorinrecord = true;
                        //    }

                        //    obj.email = data[cnt][data[0].indexOf(mapp[cl].sourcecol)]
                        //    obj1.email = data[cnt][data[0].indexOf(mapp[cl].sourcecol)]
                        //} else {
                        //    obj[mapp[cl].sourcecol] = data[cnt][data[0].indexOf(mapp[cl].sourcecol)] || "";
                        //    obj1[mapp[cl].sourcecol] = data[cnt][data[0].indexOf(mapp[cl].sourcecol)] || "";
                        //}
                    }
                    data[cnt][data[0].length] = possibleErrors;
                    obj.error = data[cnt][data[0].length];
                    $scope.uploadeddata.push(obj1);
                    data[cnt] = obj;
                }
                data.splice(0, 1);
                console.log(data);
                $scope.tempdata = data;
                $scope.gridOptions.data = $scope.tempdata;
                
                try {
                    $scope.gridApi.core.refresh();
                } catch (err) {

                }
            }
            else
                swal('You seems to be uploaded a wrong template file, Please verify or download the sample file')
        } else {
           // swal('please map all destination required column');
           swal({
            title: "",
            text: "Please map all destination required column",
            type: "warning",
            confirmButtonColor: '#3085d6',
            confirmButtonText: "OK",
        
        });
        }
    }

    
    $scope.ViewOptional = function (row, col) {
        $scope.index = row.grid.renderContainers.body.visibleRowCache.indexOf(row)
        var viewobj = row.entity;

        $scope.viewobj = [];
        for (p in viewobj) {
            $scope.viewobj.push({
                pname: p,
                val: viewobj[p]
            });
        }

        //delete $scope.viewobj.member_id;
        //delete $scope.viewobj.email;
        //delete $scope.viewobj.status;
        //delete $scope.viewobj

        $("#OptionalModal").show();
    }
    $scope.closemodel = function () {
        $("#OptionalModal").hide();
    }

    $scope.save = function () {
        var obj ={};
        for (var i = 0; i < $scope.viewobj.length; i++) { 
            obj[$scope.viewobj[i].pname] = $scope.viewobj[i].val;
        }

        $scope.tempdata[$scope.index] = obj;


        $scope.gridOptions.data = $scope.tempdata;

        //var t = "temp" + Math.floor(Math.random() * 1000);

        //$scope.gridOptions.columnDefs.push({
        //    name: t,  field: t
        //});

        try {

            //$scope.gridApi.grid.notifyDataChange(uiGridConstants.dataChange.ALL);

            $scope.gridApi.core.refresh();
            //$scope.$apply();

            //$scope.gridOptions.columnDefs.splice($scope.gridOptions.columnDefs.length - 1, 1);

        } catch (err) {

        }

        //$scope.refresh = false;
        //setTimeout(function () {
        //    $scope.refresh = true;
        //    $scope.$apply();
        //}, 100);

        $("#OptionalModal").hide();
        // console.log($scope.viewobj);
       // console.log($scope.tempdata);
       // for(var c=0;c<$scope.tempdata.length;c++)
       // {
           // if ($scope.tempdata[$scope.index].email == $scope.viewobj.email)
        //    {
        //        console.log('asdad');
                //$scope.tempdata[c].email=$scope.viewobj.email;
         //   }
        //}


    }






    $scope.uplodeRecord = function () {
       // $scope.Errorinrecord = true;
        var ref = firebaseService.FIREBASEENDPOINT();  
        var finalUploads = [];
        for (var i = 0; i < $scope.tempdata.length; i++) {
            var val = $scope.gridOptions.data[i];
            var even =_.find($scope.totalmember, function (num) { return num.member_id == val.member_id && num.association_id == val.association_id ; });
            if (even) {
                //$scope.gridOptions.data[i].error = "Member already Exist"
                //$scope.Errorinrecord = true;
            }   else
            {
                delete $scope.tempdata[i].error;
                delete $scope.tempdata[i].undefined;

                finalUploads.push($scope.tempdata[i]);
            }
        }

        if (!$scope.Errorinrecord) {
            $("#loadingModal").show();
            $scope.orgmember = $firebaseArray(ref.child('Members').child($scope.user.OrganisationNumber));
            for (var i = 0; i < finalUploads.length; i++) {
                $scope.orgmember.$add(finalUploads[i]).then(function (ref) { });
            }
           
            setTimeout(function(){
                $("#loadingModal").show();
                swal({
                    title: '',
                    text: 'Data has been uploaded..',
                    timer: 3000
                });
                setTimeout(function(){
                    window.location.href = "#/vieworgmember";
                },3000);    
            },5000);
            //$scope.uploadeddata = [];
            //$scope.gridOptions.data = [];


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
