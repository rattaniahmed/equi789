﻿app.controller('rideDetailController', function ($scope, storageService, firebaseService, $firebaseArray, $routeParams) {

    console.log("rideDetailController");

    $scope.editId = $routeParams.id;

    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 10,
        enableFiltering: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
        },
        columnDefs: [
             { name: 'total_distance', enableFiltering: false },
          { name: 'total_time' },
          { name: 'top_speed' },
          { name: 'average_speed' },
          
        {
            name: "    ", cellTemplate: '<div>   <div ng-click="grid.appScope.RemoveRide(row,col)" class="ui-grid-cell-contents" title="TOOLTIP">Remove</div>      </div>',
        }]
    };
    $scope.RemoveRide = function (row, col) {

        $scope.ride = $scope.rides.$getRecord(row.entity.$id);
        $scope.rides.$remove($scope.ride).then(function (ref) {
            var id = ref.key();
            if ($scope.ride.$id == id) {
                console.log("Deleted success fully");
            }
        });

        delete $scope.horse.ride_ids[row.entity.$id];

        //$scope.horse.ride_ids.splice($scope.horse.ride_ids.indexOf(row.entity.$id), 1);
        $scope.stables = [];
        angular.forEach($scope.horse.ride_ids, function (value, key) {
            //console.log(value);
            console.log(key);
            var rides = $scope.rides.$getRecord(key);
            if (rides != null) {

                $scope.stables.push(rides);
            }
            console.log($scope.stables);
            $scope.gridOptions.data = $scope.stables;

        });


        $scope.horses.$save($scope.horse).then(function (res) {
            console.log(res);
            swal("", "Your Ride has been removed success fully", "success");

        }).catch(function (err) {
            console.log(err);
        });

        //angular.forEach($scope.stables, function (value, key) {

        

        //});
        //$scope.stables
        //$scope.gridOptions.data = $scope.stables;

    }


    $scope.filterValue = '';
    $scope.Search = function () {
        $scope.filterValue = document.getElementById("search").value;
        $scope.gridApi.grid.refresh();
    }

    $scope.singleFilter = function (renderableRows) {
        debugger;
        var matcher = new RegExp($scope.filterValue);
        renderableRows.forEach(function (row) {
            debugger;
            var match = false;
            
            ['total_distance','total_time','top_speed','average_speed'].forEach(function (field) {
                try{
                    if (row.entity[field].match(matcher)) {
                        match = true;
                    }}
                catch (e) {
                    match = true;
                    console.log(e);
                }
            });
            if (!match) {
                row.visible = false;
            }
        });
        return renderableRows;
    }


    $scope.stables = [];

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);

    $scope.horses = $firebaseArray(ref.child('horses'));

    $scope.horses.$loaded().then(function (dataArray) {
        $scope.horse = $scope.horses.$getRecord($scope.editId);

        $scope.rides = $firebaseArray(ref.child('rides'));
        $scope.rides.$loaded().then(function (dataArray) {
            angular.forEach($scope.horse.ride_ids, function (value, key) {
                //console.log(value);
                console.log(key);
                var rides = $scope.rides.$getRecord(key);
                if (rides != null) {
                    


                    $scope.stables.push(rides);
                }
                console.log($scope.stables);
                $scope.gridOptions.data = $scope.stables;
            });
        }).catch(function (error) {
            console.log("Error in loading details");
        });

    });

    


});