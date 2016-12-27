﻿app.controller('HorsesController', function ($scope, storageService, firebaseService, $firebaseArray, $routeParams) {

    console.log("HorsesController jhghhjhgjhgjhgjhg");


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
              { name: 'birthday', headerCellClass: 'blue' },
              { name: 'registration', headerCellClass: 'blue' },
              { name: 'weight', headerCellClass: 'blue' }
              //{ name: '$id', headerCellClass: 'blue' },
              //{ name: 'end_time', headerCellClass: 'blue' },
              //{ name: 'location', headerCellClass: 'blue' },
              //{ name: 'weather', headerCellClass: 'blue' },
              //{ name: 'energy', headerCellClass: 'blue' },
              //{ name: 'calories', headerCellClass: 'blue' },
          
          ]
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

                var match = false;
               // Object.keys(row.entity).
                ['horse_name', 'birthday', 'registration', 'weight'].forEach(function (field) {
                    try{
                        if (row.entity[field].match(matcher)) {
                            match = true;
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

    $scope.example15model = [];
    
    $scope.example15customTexts = { buttonDefaultText: 'Select Users' };
    
            $scope.users = $firebaseArray(ref.child('users'));
            $scope.users.$loaded().then(function (dataArray) {
                LoadingState();
                $scope.AllDBUsers = dataArray;

                //$scope.example15data = _.map(dataArray, function (elem) { return { id: elem.$id, label: elem.first_name +" "+ elem.last_name } });
                console.log(dataArray);
            });
            $scope.example15settings = { enableSearch: true, buttonDefaultText :'Select Riders'};
            $scope.customFilter = '';
            

            $scope.AllHorses = [];
       
            $scope.horses = $firebaseArray(ref.child('horses'));

            $scope.horses.$loaded().then(function (dataArray) {
                for (var i = 0; i <= dataArray.length; i++) {
                    try {
                        if (dataArray[i].horse_name != undefined) {
                            $scope.org = JSON.parse(localStorage.getItem('adminObject'));
                            var evens = _.filter(dataArray[i].associations, function (num) { return num.name == $scope.org.OrganisationName; });
                            if (evens.length>0) {
                                $scope.AllHorses.push(dataArray[i]);
                            }
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                }

                console.log($scope.AllHorses);
                $scope.gridOptions.data = $scope.AllHorses;
                
                
                $scope.Users = [];
                
                for (var counter = 0; counter < $scope.AllDBUsers.length; counter++) {

                    if ($scope.AllDBUsers[counter].horse_ids) {

                        var ids = Object.keys($scope.AllDBUsers[counter].horse_ids);
                        console.log(ids);

                        for (var i in $scope.AllHorses) {
                            var evens = _.filter(ids, function (num) { return num == $scope.AllHorses[i].$id; });
                            if (evens.length > 0) {
                                if (!(_.contains($scope.Users,$scope.AllDBUsers[counter])))
                                {
                                    $scope.Users.push($scope.AllDBUsers[counter]);
                                }
                                
                            }
                         
                        }

                    }
                }
                
                console.log($scope.Users);

                $scope.example15data = _.map($scope.Users, function (elem) { return { id: elem.$id, label: elem.first_name + " " + elem.last_name } });
             
                UnLoadingState();

            });

           



            $scope.SelectItem = function () {
            
                $scope.SearchData = []
                var tempHorseArray = [];
                console.log($scope.example15model);
                if ($scope.example15model.length > 0) {
                    LoadingState();
                    for (var i = 0; i < $scope.example15model.length; i++)
                    {
                       var data =_.findWhere($scope.Users, { $id: $scope.example15model[i].id })
                       if (data.horse_ids != undefined)
                       {
                           
                           for (var id in data.horse_ids) {
                              // tempHorseArray.push(id)
                               var horse = $scope.horses.$getRecord(id);
                               var evens = _.filter(horse.associations, function (num) { return num.name == $scope.org.OrganisationName; });
                               if (evens.length > 0) {
                                   $scope.SearchData.push(horse);
                               }
                             
                           }
                           
                        }
                    }
                    UnLoadingState();
                    $scope.gridOptions.data = $scope.SearchData;
             
                   


                }
            }

});