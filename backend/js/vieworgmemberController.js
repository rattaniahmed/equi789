
app.controller('vieworgmemberController', function ($scope, storageService, firebaseService, $firebaseArray) {

    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 10,
        enableFiltering: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
        },
        columnDefs: [
            {
                name: "membership status", headerCellClass: 'blue', cellTemplate: '<div style="text-align:center;">' +
                '<a ng-show=\"row.entity.status\">Active</a>    <a ng-show=\"!row.entity.status\">Inactive</a>' +
                '</div>', enableFiltering: false, field: 'status' },


                { name: 'member Email', headerCellClass: 'blue', field: 'email' ,
                cellTemplate: '<div style="cursor: row.cursor"><a href="mailto:{{row.entity.email}}?subject=AQHA HBR Program Membership {{row.entity.email}}"target="_blank">{{row.entity.email}}</a></div>'
            },
           
            { name: 'member id', enableFiltering: false, headerCellClass: 'blue', field: 'member_id' },
        { name: 'member name', enableFiltering: false, headerCellClass: 'blue', field: 'member_name' },
            {
                name: "optional information", headerCellClass: 'blue', cellTemplate: '<div style="text-align:center;" ng-click="grid.appScope.ViewOptional(row,col)">' +
                '<a class="blueactionclass">View Optional Data</a>' +
                '</div>', enableFiltering: false },
            {
                name: "Manage membership", headerCellClass: 'blue', cellTemplate: '<div style="text-align:center;">' +
                '<a class="actionclass" ng-show=\"row.entity.status\" ng-click="grid.appScope.Activemember(row,col)">Deactivate Membership </a>    <a class="greenactionclass" ng-show=\"!row.entity.status\" ng-click="grid.appScope.Dctivemember(row,col)">Activate Membership</a>' +
                '</div>', enableFiltering: false, field: 'status' },
            {
                name: "Actions", headerCellClass: 'blue',  cellTemplate: '<div>' +
                    '<div style="text-align:center;">   <div class="actionclass"  ng-click="grid.appScope.ViewOptionaledit (row,col)" class="ui-grid-cell-contents" title="TOOLTIP" style="text-align:center;display:inline;"><i class="fa fa-edit" style="color: #3c9cdd;"></i></div> &emsp; '+
                    '   <div class="actionclass" ng-click="grid.appScope.RemoveMember(row,col)" class="ui-grid-cell-contents" title="TOOLTIP" style="text-align:center;display:inline;"><i class="fa fa-trash"></i></div> </div>',
                
                    enableFiltering: false
                 },
                
                 
        ],

    };
    $scope.filterValue = '';
    $scope.Search = function () {
        $scope.filterValue = document.getElementById("search").value;
        $scope.gridApi.grid.refresh();
    }
    $scope.singleFilter = function (renderableRows) {

        var matcher = new RegExp($scope.filterValue);
        renderableRows.forEach(function (row) {

            var match = false;
            // Object.keys(row.entity).
            ['email', 'member_id', 'member_name'].forEach(function (field) {
                try {
                    if (row && row.entity) {
                        if (row.entity[field]) {
                            if (row.entity[field].match(matcher)) {
                                match = true;
                            }
                        }
                    }
                }
                catch (e) {
                    match = false;
                    console.log(e);
                }
            });

            row.visible = match;

        });
        return renderableRows;
    }

    
    $scope.user = JSON.parse(localStorage.getItem("adminObject"));
    
    $scope.ViewOptionaledit = function (row, col) {
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

        $("#OptionalModal11").show();
    }
    $scope.saveedit = function () {
        swal({
            title: "Are you sure?",
            text: "Do you want to save these changes?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Save Changes",
            closeOnConfirm: false
        },
            function () {

                try {
                    {
                        debugger;
                        $scope.tempdata = $scope.gridOptions.data;
                   
                    var obj = {};
                    var obj1 = {};
                    var id = null;
                    var memNumber = null;
                    var memEmail = null;
                    for (var i = 0; i < $scope.viewobj.length; i++) {
                        if ($scope.viewobj[i].pname == '$id') {
                            id = $scope.viewobj[i].val
                        }
                        if ($scope.viewobj[i].pname == 'email') {
                            memEmail = $scope.viewobj[i].val
                        }
                        if ($scope.viewobj[i].pname == 'member_id') {
                            memNumber = $scope.viewobj[i].val
                        }
                        obj[$scope.viewobj[i].pname] = $scope.viewobj[i].val;
                        if ($scope.viewobj[i].pname != 'error' && $scope.viewobj[i].pname != '$id' && $scope.viewobj[i].pname != '$priority' && $scope.viewobj[i].pname != '$$hashKey') {
                            obj1[$scope.viewobj[i].pname] = $scope.viewobj[i].val;
                        }
                    }
                    $scope.tempdata[$scope.index] = obj;
                    var Idcount = 0;
                    var Ecount = 0;
                    for (var j = 0; j < $scope.tempdata.length; j++) {
                        debugger;
                        console.log($scope.tempdata[j].member_id == memNumber);
                        if ($scope.tempdata[j].member_id == memNumber) {
                            debugger;
                            Idcount++;
                        }
                        if ($scope.tempdata[j].email == memEmail) {
                            debugger;
                            Ecount++;
                        }
                    }
                    //$scope.gridOptions[$scope.index] = obj;

                    // var id = $scope.viewobj[$scope.index].val;
                    debugger;
                    if (Idcount >1) {
                        swal("!Oops", "Member Id already exist", "error");
                    } else if (Ecount > 1) {
                        swal("!Oops", "Member Email already exist", "error");
                    } else {
                        firebase.database().ref('/members/' + $scope.user.OrganisationNumber + '/' + id).set(obj1, function (error) {
                            if (error) {
                                swal("", "Please try again", "error");
                            } else {
                                //$scope.gridOptions[$scope.index] = obj
                                window.location.reload();
                                swal("", "This member has been Update successfully", "success");
                            }
                        });
                        $("#OptionalModal11").hide();
                    }
                }
                } catch (err){ }
                });
    }
$scope.setCount =function(totalmember){
    debugger;
    $scope.act=0,$scope.deact=0;
    $scope.tcount = totalmember.length;
    for(var i=0;i<totalmember.length;i++)
    {
        if(totalmember[i].status==true)                    
        $scope.act++;                    
        else                    
        $scope.deact++;                    
    }
try{
    $scope.$apply();
}catch(err){

}
}

    $scope.init = function () {
        
        $scope.user = JSON.parse(localStorage.getItem("adminObject"));
        if ($scope.user) {
            $("#loadingModal").show();
            var ref = firebaseService.FIREBASEENDPOINT();
            $scope.totalmemberref = $firebaseArray(ref.child('members').child($scope.user.OrganisationNumber));
            $scope.totalmemberref.$loaded().then(function (dataArray) {
                $scope.gridOptions.data = dataArray;
                $scope.setCount($scope.gridOptions.data);
                try{
                    $scope.$apply();
                }catch(err){
                
                }
               $("#loadingModal").hide();
            }).catch(function (error) {
                console.log("Error in loading details");
            });
        } else {
            swal('Something went wrong please check login details')
        }
    }
    
    $scope.init();
    $scope.RemoveMember = function (row, col) {
        swal({
            title: "Are you sure?",
            text: "Do you want to delete this member?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Delete member",
            closeOnConfirm: false
        },
            function () {

                try {
                    var id = row.entity.$id;
                    firebase.database().ref('/members/' + $scope.user.OrganisationNumber+'/' + row.entity.$id).remove(function (error) {
                        if (error) { }
                        else {
                            $scope.gridOptions.data = _.reject($scope.gridOptions.data, function (num) { return num.$id == row.entity.$id; });
                            
                            $scope.setCount($scope.gridOptions.data);
                            try{
                                $scope.$apply();
                            }catch(err){
                            
                            }
                            swal("", "This member has been deleted", "success");

                        }
                    })
                    } catch (err) {

                }    
                
            });
    }

    $scope.deleteAll=function()
    {
        swal({
            title: "Are you sure?",
            text: "Do you want to delete all members?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Delete members",
            closeOnConfirm: false
        },
        function () {

            try {
                //var id = row.entity.$id;
                firebase.database().ref('/members/' + $scope.user.OrganisationNumber).remove(function (error) {
                    if (error) { }
                    else {
                        //$scope.gridOptions.data = _.reject($scope.gridOptions.data, function (num) { return num.$id == row.entity.$id; });
                        
                        //$scope.setCount($scope.gridOptions.data);
                        try{
                            $scope.$apply();
                        }catch(err){
                        
                        }
                        swal("", "All members have been deleted", "success");
setTimeout(() => {
    window.location.reload();
}, 1000);
                    }
                })
                } catch (err) {

            }    
            
        });
    }

    $scope.Dctivemember = function (row, col) {
        swal({
            title: "Are you sure?",
            text: "Do you want to activate this member?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Activate member",
            closeOnConfirm: false
        },
            function () {

                try {
                    var id = row.entity.$id;
                    firebase.database().ref('/members/' + $scope.user.OrganisationNumber + '/' + row.entity.$id + '/status').set(true, function (error) {
                        //   firebase.database().ref('/Members/' + $scope.user.OrganisationNumber + '/' + row.entity.$id).remove(function (error) {
                        if (error) { }
                        else {
                            //$scope.gridOptions.data = _.reject($scope.gridOptions.data, function (num) { return num.$id == row.entity.$id; });
                            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                                if ($scope.gridOptions.data[i].$id == row.entity.$id) {
                                    $scope.gridOptions.data[i].$id.status = true;
                                }
                            }
                            $scope.setCount($scope.gridOptions.data);
                            try{
                                $scope.$apply();
                            }catch(err){
                            
                            }
                            swal("", "You have successfully activated this member", "success");
                            

                        }
                    })
                } catch (err) { }
            });
    }
    $scope.closemodel = function () {
        $("#OptionalModal").hide();

    }
    $scope.closemodel1 = function () {
        $("#OptionalModal11").hide();

    }
$scope.closemodel11 = function () {
        $("#OptionalModal12").hide();

    }
    $scope.Activemember = function (row, col) {
        swal({
            title: "Are you sure?",
            text: "Do you want to deactivate this member?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Deactivate member",
            closeOnConfirm: false
        },
            function () {
             
                try {
                    var id = row.entity.$id;
                    firebase.database().ref('/members/' + $scope.user.OrganisationNumber + '/' + row.entity.$id + '/status').set(false, function (error) {
                        //   firebase.database().ref('/Members/' + $scope.user.OrganisationNumber + '/' + row.entity.$id).remove(function (error) {
                        if (error) { }
                        else {
                            //$scope.gridOptions.data = _.reject($scope.gridOptions.data, function (num) { return num.$id == row.entity.$id; });
                            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                                if ($scope.gridOptions.data[i].$id == row.entity.$id) {
                                    $scope.gridOptions.data[i].$id.status = false;
                                }
                            }
                           
                            $scope.setCount($scope.gridOptions.data);
                            try{
                                $scope.$apply();
                            }catch(err){
                            
                            }
                            swal("", "You have successfully deactivated this member", "success");
                            

                        }
                    })
                } catch (err) { }
            });
    }
    $scope.viewobj = null;
    $scope.ViewOptional = function (row, col) {
        $scope.viewobj = row.entity;
        //delete $scope.viewobj.member_id;
        //delete $scope.viewobj.email;
        //delete $scope.viewobj.status;
        //delete $scope.viewobj
        $("#OptionalModal").show();
    }

    // setTimeout(() => {
    //     $("#loadingModal").hide();
    // }, 2000);

 $scope.openaddmodel = function () {     
        
        $("#OptionalModal12").show();
    }
$scope.addNewMember=function(){
    if(!$scope.MemberName||!$scope.MemberEmail||!$scope.MemberId){
        swal("", "Please fill all member Details", "error");
      }else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.MemberEmail))) {
                  swal("", "Please fill Correct Member Email", "error");               
      }else{
            if($scope.gridOptions.data){
                var exist=false;
                for(var i=0;i<$scope.gridOptions.data.length;i++){
                    if($scope.gridOptions.data[i].member_id==$scope.MemberId){
                            exist=true;
                        }
                 }
                if(exist){
                swal("", "Member Id alresdy exist", "error");
                }else{
                        var obj={
email:$scope.MemberEmail,
member_id:$scope.MemberId,
member_name:$scope.MemberName,
status:true
                            }
                        var ref = firebaseService.FIREBASEENDPOINT();  
                        var refdb = firebase.database().ref('/members/' + $scope.user.OrganisationNumber + '/');
                      //  refdb[finalUploads[i].member_id] = finalUploads[i];
                         firebase.database().ref('/members/' + $scope.user.OrganisationNumber + '/' +$scope.MemberId).set(obj);
                    $("#OptionalModal12").hide();
 }
                }else{
                    $scope.gridOptions.data=[];
 var obj={
email:$scope.MemberEmail,
member_id:$scope.MemberId,
member_name:$scope.MemberName,
status:true
                            }
                        var ref = firebaseService.FIREBASEENDPOINT();  
                        var refdb = firebase.database().ref('/members/' + $scope.user.OrganisationNumber + '/');
                      //  refdb[finalUploads[i].member_id] = finalUploads[i];
                         firebase.database().ref('/members/' + $scope.user.OrganisationNumber + '/' +$scope.MemberId).set(obj);
               $("#OptionalModal12").hide();
}

}
}

});
