app.controller('rideDetailController', function ($scope, storageService, firebaseService, $firebaseArray, $routeParams) {

    console.log("rideDetailController");

    $scope.editId = $routeParams.id;

    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 10,
        enableFiltering: true,
        columnDefs: [
             { name: 'total_distance', enableFiltering: false },
          { name: 'total_time' },
          { name: 'top_speed' },
          { name: 'average_speed' },
          
        {
            name: "    ", cellTemplate: '<div>   <div ng-click="grid.appScope.RemoveUser(row,col)" class="ui-grid-cell-contents" title="TOOLTIP">Remove</div>      </div>',
        }]
    };

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