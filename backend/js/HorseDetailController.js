app.controller('HorseDetailController', function ($scope, $routeParams, storageService, firebaseService, $firebaseArray) {

    console.log("HorseDetailController");
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
          { name: 'horse_name', enableFiltering: false, headerCellClass: 'blue' },
          { name: 'registration', displayName: 'Breed', headerCellClass: 'blue' },
          { name: 'birthday', headerCellClass: 'blue' },

          {
              name: " ", cellTemplate: '<div style="text-align:center;">' +
                      '<a href="#/rides/{{row.entity.$id}}" >Rides</a>' +
                      '</div>', enableFiltering: false
          },
        {
            name: "    ", cellTemplate: '<div>' +
                    '<div>   <div ng-click="grid.appScope.RemoveHorse(row,col)" class="ui-grid-cell-contents" title="TOOLTIP" style="text-align:center;">Remove</div> </div>',
            enableFiltering: false
        }
        ]
    };


    $scope.RemoveHorse = function (row, col) {
        swal({
            title: "Are you sure?",
            text: "You Want to delete horse!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
        function () {

            //get horse object
            $scope.horse = $scope.horses.$getRecord(row.entity.$id);

            //remve object from horse ref
            $scope.horses.$remove($scope.horse).then(function (ref) {

                var id = ref.key();
                if ($scope.horse.$id == id) {
                    console.log("Deleted success fully");
                }

            })

            // delete fom user's object 
            delete $scope.user.horse_ids[row.entity.$id];

            // delete rides of horse 
            angular.forEach($scope.horse.ride_ids, function (value, key) {
                var ride = $scope.rides.$getRecord(key);

                $scope.rides.$remove(ride).then(function (ref) {

                    var id = ref.key();
                    console.log("ride Deleted success fully");
                });

                try {
                    var cordToRemove = $scope.coords.$getRecord(key);
                    $scope.coords.$remove(cordToRemove).then(function (ref) {
                        var id = ref.key();
                        console.log("corods Deleted success fully");
                    });
                }
                catch (corddeleteerro) {

                }



            });


            $scope.stables = [];
            angular.forEach($scope.user.horse_ids, function (value, key) {
                //console.log(value);
                console.log(key);
                var horse = $scope.horses.$getRecord(key);
                if (horse != null) {

                    $scope.stables.push(horse);
                }
                console.log($scope.stables);
                $scope.gridOptions.data = $scope.stables;

            });

            $scope.users.$save($scope.user).then(function (res) {
                window.location.reload();
            });

            swal("Deleted!", "Your imaginary file has been deleted.", "success");
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
            ['horse_name', 'registration', 'birthday'].forEach(function (field) {
                if (row.entity[field].match(matcher)) {
                    match = true;
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
    $scope.users = $firebaseArray(ref.child('users'));



    $scope.onCategoryChange = function (user) {
        $scope.gridOptions.data = $scope.GetUserHorse($scope.user);
    }

    $scope.coords = $firebaseArray(ref.child('coords'));
    $scope.coords.$loaded().then(function (dataArray) {
        console.log("coords loaded ");
    });

    $scope.users.$loaded().then(function (dataArray) {

        $scope.userToShow = [];
        angular.forEach(dataArray, function (value, key) {
            $scope.userToShow.push(value);
        });
        $scope.itemSelected = $scope.userToShow[0];
        $scope.user = $scope.users.$getRecord($scope.editId);

        $scope.horses = $firebaseArray(ref.child('horses'));
        $scope.horses.$loaded().then(function (dataArray) {

            console.log(dataArray);
            angular.forEach($scope.user.horse_ids, function (value, key) {
                //console.log(value);
                console.log(key);
                //var horse = value;// $scope.horses.$getRecord(key);
                var horse = $scope.horses.$getRecord(key);
                if (horse != null) {
                    horse.photo = "";//CleanHorseProfileUrl(horse.photo);


                    try {
                        var today = new Date();
                        var d = new Date(horse.birthday);
                        if (Object.prototype.toString.call(d) === "[object Date]") {
                            // it is a date
                            if (isNaN(d.getTime())) {  // d.valueOf() could also work
                            }
                            else {
                                var diff = today - d;
                                var days = parseInt(diff / 1000 / 60 / 60 / 24);
                                debugger;
                                console.log(days);

                                var year = parseInt(days / 365);


                                if (year == 1)
                                    horse.AgeToDisplay = "1 year, ";
                                else
                                    horse.AgeToDisplay = year + " years, ";

                                var remainDay = parseInt(days % 365);

                                var month = parseInt(remainDay / 30);

                                if (month == 1)
                                    horse.AgeToDisplay += "1 month ";
                                else
                                    horse.AgeToDisplay += month + " months ";

                                //horse.AgeToDisplay += "old";
                            }
                        }
                        else {
                            // not a date
                        }
                    }
                    catch (err) { }


                    $scope.stables.push(horse);
                }
                console.log($scope.stables);

            });

            $scope.gridOptions.data = $scope.stables;
            //$scope.gridOptions.data = $scope.GetUserHorse($scope.user); //$scope.stables;  = .horse_ids

        }).catch(function (error) {
            console.log("Error in loading details");
        });

    });
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.rides.$loaded().then(function (dataArray) {
        // $scope.horses = dataArray;
    }).catch(function (error) {
        console.log("Error in loading details");
    });
});
