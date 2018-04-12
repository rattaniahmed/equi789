
app.controller('vieworgmemberController', function ($scope, storageService, firebaseService, $firebaseArray) {

    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 10,
        enableFiltering: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            //$scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
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
                name: "delete member", headerCellClass: 'blue',  cellTemplate: '<div>' +
                    '<div>   <div class="actionclass" ng-click="grid.appScope.RemoveMember(row,col)" class="ui-grid-cell-contents" title="TOOLTIP" style="text-align:center;"><i class="fa fa-trash"></i></div> </div>',
                enableFiltering: false },
                
                
        ],

    };
    
    $scope.user = JSON.parse(localStorage.getItem("adminObject"));
    
    $scope.init = function () {
        $scope.user = JSON.parse(localStorage.getItem("adminObject"));
        if ($scope.user) {
            $("#loadingModal").show();
            var ref = firebaseService.FIREBASEENDPOINT();
            $scope.totalmemberref = $firebaseArray(ref.child('Members').child($scope.user.OrganisationNumber));
            $scope.totalmemberref.$loaded().then(function (dataArray) {
                $scope.totalmember = dataArray;
                $scope.gridOptions.data = dataArray;
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
                    firebase.database().ref('/Members/' + $scope.user.OrganisationNumber+'/' + row.entity.$id).remove(function (error) {
                        if (error) { }
                        else {
                            $scope.gridOptions.data = _.reject($scope.gridOptions.data, function (num) { return num.$id == row.entity.$id; });
                            swal("", "This member has been deleted", "success");

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
                    firebase.database().ref('/Members/' + $scope.user.OrganisationNumber + '/' + row.entity.$id + '/status').set(true, function (error) {
                        //   firebase.database().ref('/Members/' + $scope.user.OrganisationNumber + '/' + row.entity.$id).remove(function (error) {
                        if (error) { }
                        else {
                            //$scope.gridOptions.data = _.reject($scope.gridOptions.data, function (num) { return num.$id == row.entity.$id; });
                            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                                if ($scope.gridOptions.data[i].$id == row.entity.$id) {
                                    $scope.gridOptions.data[i].$id.status = true;
                                }
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
                    firebase.database().ref('/Members/' + $scope.user.OrganisationNumber + '/' + row.entity.$id + '/status').set(false, function (error) {
                        //   firebase.database().ref('/Members/' + $scope.user.OrganisationNumber + '/' + row.entity.$id).remove(function (error) {
                        if (error) { }
                        else {
                            //$scope.gridOptions.data = _.reject($scope.gridOptions.data, function (num) { return num.$id == row.entity.$id; });
                            for (var i = 0; i < $scope.gridOptions.data.length; i++) {
                                if ($scope.gridOptions.data[i].$id == row.entity.$id) {
                                    $scope.gridOptions.data[i].$id.status = false;
                                }
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
});
