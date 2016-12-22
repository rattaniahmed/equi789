

   
app.controller('RideDetailsController', function ($scope, storageService, firebaseService, $firebaseArray, $routeParams) {

        console.log("rideDetailController jhghhjhgjhgjhgjhg");


        $scope.gridOptions = {
            paginationPageSizes: [5, 10, 20],
            paginationPageSize: 10,
            enableFiltering: false,
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
            },
            columnDefs: [
              { name: 'total_distance', enableFiltering: false, headerCellClass: 'blue' },
              { name: 'total_time', headerCellClass: 'blue' },
              { name: 'top_speed', headerCellClass: 'blue' },
              { name: 'average_speed', headerCellClass: 'blue' },
              { name: 'start_time', headerCellClass: 'blue' },
              { name: 'end_time', headerCellClass: 'blue' },
              { name: 'location', headerCellClass: 'blue' },
              { name: 'weather', headerCellClass: 'blue' },
              { name: 'energy', headerCellClass: 'blue' },
              { name: 'calories', headerCellClass: 'blue' },
          
            {
                name: "    ", cellTemplate: '<div>   <div ng-click="grid.appScope.RemoveRide(row,col)" class="ui-grid-cell-contents" title="TOOLTIP" style="text-align:center;">Remove</div>      </div>',
            }]
        };
        $scope.RemoveRide = function (row, col) {
            swal({
                title: "Are you sure?",
                text: "You Want to Delete Ride!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
          function () {
    

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
              var index = -1;
              for (var i = 0 ; i < $scope.rides.length; i++) {//console.log(value);
                  if ($scope.rides[i].$id == row.entity.$id) {           //remove
                      index = i;
                  }
              }

              $scope.rides.splice(index, 1);

              $scope.stables = [];
              angular.forEach($scope.users, function (value, key) {
                  //console.log(value);

                  $scope.stables.push(rides);
                  $scope.gridOptions.data = $scope.stables;

              });

              $scope.horses.$save($scope.horse).then(function (res) {
                  console.log(res);
            

              }).catch(function (err) {
                  console.log(err);
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
              
                var match = true;
                //['total_distance','total_time','top_speed','average_speed'].forEach(function (field) {
                //    try{
                //        if (row.entity[field].match(matcher)) {
                //            match = true;
                //        }}
                //    catch (e) {
                //        //match = true;
                //        console.log(e);
                //    }
                //});
                //if (!match) {
                //    row.visible = false;
                //}
            });
            return renderableRows;
        }

        $('#lstStates').multiselect({
            buttonText: function (options, select) {
                if (options.length === 0) {
                    return 'None selected';
                }
                if (options.length === select[0].length) {
                    return 'All selected (' + select[0].length + ')';
                }
                else if (options.length >= 4) {
                    return options.length + ' selected';
                }
                else {
                    var labels = [];
                    console.log(options);
                    options.each(function () {
                        labels.push($(this).val());
                    });
                    return labels.join(', ') + '';
                }
            }

        });

        $('#lstHorses').multiselect({
            buttonText: function (options, select) {
                if (options.length === 0) {
                    return 'None selected';
                }
                if (options.length === select[0].length) {
                    return 'All selected (' + select[0].length + ')';
                }
                else if (options.length >= 4) {
                    return options.length + ' selected';
                }
                else {
                    var labels = [];
                    console.log(options);
                    options.each(function () {
                        labels.push($(this).val());
                    });
                    return labels.join(', ') + '';
                }
            }

        });


        $scope.stables = [];

        var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
        $scope.rides = $firebaseArray(ref.child('rides'));

    $scope.rides.$loaded().then(function (dataArray) {
        $scope.gridOptions.data = dataArray;
                angular.forEach(dataArray, function (value, key) {
                    //console.log(value);
                    console.log(key);
                    var rides = $scope.rides.$getRecord(key);
                    if (rides != null) {
                        $scope.stables.push(rides);
                    }
                    
                });
                console.log($scope.stables);
               // $scope.gridOptions.data = $scope.stables;
            }).catch(function (error) {
                console.log("Error in loading details");
            });

    $scope.filterValue = '';
    $scope.Search = function () {
        $scope.filterValue = document.getElementById("search").value;
        $scope.gridApi.grid.refresh();
    }


    $scope.example15model = [];
    
    $scope.example15customTexts = { buttonDefaultText: 'Select Users' };
    $scope.example14customTexts = { buttonDefaultText: 'Select Horse' };
            $scope.users = $firebaseArray(ref.child('users'));
            $scope.users.$loaded().then(function (dataArray) {

    //            $scope.example15data = [
    //{ id: 1, label: "David" },
    //{ id: 2, label: "Jhon" },
    //{ id: 3, label: "Lisa" },
    //{ id: 4, label: "Nicole" },
    //{ id: 5, label: "Danny" }];

                $scope.example15data = _.map(dataArray, function (elem) { return { id: elem.$id, label: elem.first_name +" "+ elem.last_name } });
                console.log(dataArray);
            });
            $scope.example15settings = { enableSearch: true, buttonDefaultText :'Select Riders'};
            $scope.customFilter = '';
            


            $scope.example14data=[]
            $scope.horses = $firebaseArray(ref.child('horses'));

            $scope.horses.$loaded().then(function (dataArray) {
                for (var i = 0; i<=dataArray.length; i++)
                {
                    try {
                    if(dataArray[i].horse_name!=undefined)
                    {
                        $scope.example14data.push({ id: dataArray[i].$id, label: dataArray[i].horse_name });
                    }
                }
                    catch(e)
                    {
                        console.log(e);
                    }
                }
             
                console.log(dataArray);

            });

            $scope.example14settings = { enableSearch: true, dynamicTitle:false, buttonDefaultText: 'Select Horse' };

});
