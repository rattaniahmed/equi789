
app.controller('UsersController', function ($scope, storageService, firebaseService, $firebaseArray) {

    //console.log("UsersController");
    


    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 10,
        enableFiltering: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
        },
        columnDefs: [
             { name: 'email', enableFiltering: false, headerCellClass: 'blue' },
          { name: 'first_name', headerCellClass: 'blue' },
          { name: 'last_name', headerCellClass: 'blue' },
          { name: 'display_name', headerCellClass: 'blue' },
          {
              name: " ", cellTemplate: '<div style="text-align:center;">' +
                      '<a href="#/horses/{{row.entity.$id}}">Horses</a>' +
                      '</div>'
          },
        {
            name: "    ", cellTemplate: '<div><div ng-click="grid.appScope.RemoveUser(row,col)" class="ui-grid-cell-contents" title="TOOLTIP" style="text-align:center;">Remove</div> </div>',
        }        ]
    };
    

    

    $scope.RemoveUser = function (row, col) {

        swal({
            title: "Are you sure?",
            text: "You Want to Delete User!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
       function () {

   
 
        //get user object
        $scope.user = $scope.users.$getRecord(row.entity.$id);

        //remve object from user ref
        $scope.users.$remove($scope.user).then(function (ref) {

            var id = ref.key();
            if ($scope.user.$id == id) {
             //   console.log("Deleted success fully");
            }

        });

        var index = -1;
        for (var i = 0 ; i < $scope.users.length; i++) {//console.log(value);
            if ($scope.users[i].$id == row.entity.$id) {           //remove
                index = i;
            }
        }
        debugger;
        $scope.users.splice(index, 1);

        $scope.usersArray = [];
        angular.forEach($scope.users, function (value, key) {
            //console.log(value);
            
            $scope.usersArray.push(value);
          

        });

        $scope.gridOptions.data = $scope.usersArray;

        // delete horse of user 
        angular.forEach($scope.user.horse_ids, function (value, key) {
            var horse = $scope.horses.$getRecord(key);

            angular.forEach(horse.ride_ids, function (value, key) {
                var ride = $scope.rides.$getRecord(key);

                $scope.rides.$remove(ride).then(function (ref) {
                
                    var id = ref.key();
                    if (ride.$id == id) {
                      //  console.log("Deleted success fully");
                    }
                });

                try {
                    var cordToRemove = $scope.coords.$getRecord(key);
                    $scope.coords.$remove(cordToRemove).then(function (ref) {
                        var id = ref.key();
                     //   console.log("corods Deleted success fully");
                    });
                }
                catch (corddeleteerro) {

                }



            });
            $scope.horses.$remove(horse).then(function (ref) {
                 
                var id = ref.key();
                if (horse.$id == id) {
                    //console.log("Deleted success fully");
                }
            });

        });

        swal("Deleted!", "User has been deleted success fully.", "success");
});

    }
    $scope.filterValue = '';
    $scope.Search = function () {
        $scope.filterValue = document.getElementById("search").value;
        $scope.gridApi.grid.refresh();
    }

    $scope.singleFilter = function (renderableRows) {
        var matcher = new RegExp($scope.filterValue);
        renderableRows.forEach(function (row) {
            var match = false;
            ['email', 'first_name', 'last_name', 'display_name'].forEach(function (field) {
                if (row.entity[field]) {
                    if (row.entity[field].match(matcher)) {
                        match = true;
                    }
                }
            });
            if (!match) {
                row.visible = false;
            }
        });
        return renderableRows;
    }


    //alert(row.entity.$id);
    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.users = $firebaseArray(ref.child('users'));
    $scope.usersArray = [];
    $scope.users.$loaded().then(function (dataArray) {
        //$scope.usersArray = dataArray;
       // console.log($scope.usersArray);

        angular.forEach(dataArray, function (value, key) {

           
            $scope.usersArray.push(value);

        });


        

       

        $scope.gridOptions.data = $scope.usersArray;


        //$('#example').DataTable({
        //    data: $scope.usersArray,
        //    columns: [
        //        { title: "Email" },
        //        { title: "First Name" },
        //        { title: "Last Name" },
        //        { title: " Show Hourse " },
        //        { title: "Remove " }
        //    ]
        //});


        //$('#example').DataTable({
        //    "bProcessing": true,
        //    "aaData": $scope.usersArray,// <-- your array of objects
        //    "aoColumns": [
        //    { "mData": "first_name" }, // <-- which values to use inside object
        //    { "mData": "last_name" }
        //    ]

        //});
        //$scope.gridOptions.data = $scope.usersArray;
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.horses = $firebaseArray(ref.child('horses'));
    $scope.horses.$loaded().then(function (dataArray) {
       // $scope.horses = dataArray;
    }).catch(function (error) {
        console.log("Error in loading details");
    });
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.rides.$loaded().then(function (dataArray) {
        // $scope.horses = dataArray;
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.coords = $firebaseArray(ref.child('coords'));
    $scope.coords.$loaded().then(function (dataArray) {
        console.log("coords loaded ");
    });
   
    //$scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
    //    if (col.filters[0].term) {
    //        return 'header-filtered';
    //    } else {
    //        return '';
    //    }
    //};
    //$scope.gridOptions = {
    //    enableFiltering: true,
    //    onRegisterApi: function (gridApi) {
    //        $scope.gridApi = gridApi;
    //    },
    //    columnDefs: [
    //// default
    //{ field: 'name', headerCellClass: $scope.highlightFilteredHeader }]
    //};

    //$scope.gridOptions.columnDefs = [
    //  { name: 'first_name'},
    //  { name: 'last_name' },
    //  { name: 'email' },
    //  { name: 'Show Hourse' },
    //  { name: 'Remove' },
    //];




});


