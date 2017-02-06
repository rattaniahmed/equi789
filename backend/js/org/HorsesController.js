app.controller('HorsesController', function ($scope, storageService, firebaseService, $firebaseArray, $routeParams) {

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
          { name: 'Member', headerCellClass: 'blue' },
          { name: 'horse_name', enableFiltering: false, headerCellClass: 'blue' },
          { name: 'Organization Number', enableFiltering: false, headerCellClass: 'blue' },
          { name: 'birthday', headerCellClass: 'blue' },
          { name: 'registration', headerCellClass: 'blue' },
          { name: 'weight', headerCellClass: 'blue' },
          { name: 'Total_rides', headerCellClass: 'blue', filed: 'Rides' },
           { name: 'Total time', headerCellClass: 'blue'},
          { name: 'miles', headerCellClass: 'blue', filed: 'miles' },
          { name: 'top_speed', headerCellClass: 'blue', filed: 'Top speed' },
          { name: 'energy', headerCellClass: 'blue', filed: 'energy' }
          //{ name: 'energy', headerCellClass: 'blue' },
          //{ name: 'calories', headerCellClass: 'blue' },

        ],
        exporterLinkLabel: 'get your csv here',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [5, 5, 5, 5] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 500,
        exporterPdfHeader: { text: "Hourse Detail", style: 'headerStyle' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true, margin: [260, 10, 100, 0] };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true, margin: [300, 0, 60, 0] };
            return docDefinition;
        },
    };
   

    $scope.export = function (type) {
        //if ($scope.export_format == type) {
        //    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
        //    $scope.gridApi.exporter.csvExport( 'All', 'All', myElement );
        //} else if ($scope.export_format == type) {
        $scope.gridApi.exporter.pdfExport("all", "all");
        //};
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
                try {
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

    
    $scope.example15model = [];

    $scope.example15customTexts = { buttonDefaultText: 'Select Users' };

    $scope.users = $firebaseArray(ref.child('users'));
    $scope.users.$loaded().then(function (dataArray) {
        LoadingState();
        $scope.AllDBUsers = dataArray;

        //$scope.example15data = _.map(dataArray, function (elem) { return { id: elem.$id, label: elem.first_name +" "+ elem.last_name } });
        console.log(dataArray);
    });
    $scope.example15settings = { enableSearch: true, buttonDefaultText: 'Select Riders' };
    $scope.customFilter = '';


    $scope.AllHorses = [];

    $scope.horses = $firebaseArray(ref.child('horses'));

    $scope.rides.$loaded().then(function (rideDataArray) {

        $scope.horses.$loaded().then(function (dataArray) {




            for (var i = 0; i <= dataArray.length; i++) {
                try {
                    if (dataArray[i]) {
                        if (dataArray[i].horse_name != undefined) {
                            $scope.org = JSON.parse(localStorage.getItem('adminObject'));
                            var evens = _.filter(dataArray[i].associations, function (num) { return num.filter == $scope.org.OrganisationNumber; });
                            if (evens.length > 0) {
                                //$scope.AllHorses.push(dataArray[i]);

                                var horse = dataArray[i];


                                var totalTopSspeed = [];
                                var averageSpeed = 0.0;
                                var totalLength = 0;

                                $scope.totalDistance = 0.0;
                                $scope.totalDuration = 0;
                                $scope.totalEnergy = 0;
                                $scope.totalCalories = 0;
                                $scope.totalAverageSpeed = 0.0;
                                $scope.totalTopSspeed = 0.0;

                                for (var id in horse.ride_ids) {
                                    var ride = $scope.rides.$getRecord(id);

                                    if (ride != null) {


                                        //$scope.totalLength = $scope.totalLength + 1;
                                        totalLength = _.size(horse.ride_ids);
                                        $scope.totalDistance = parseFloat($scope.totalDistance) + parseFloat(ride.total_distance);
                                        $scope.totalDuration = parseInt($scope.totalDuration) + parseInt(ride.total_time);
                                        $scope.totalEnergy = parseFloat($scope.totalEnergy) + parseFloat(ride.energy);
                                        $scope.totalCalories = parseFloat($scope.totalCalories) + parseFloat(ride.calories);
                                        //$scope.totalAverageSpeed = $scope.totalAverageSpeed + ride.average_speed;
                                        //$scope.totalTopSspeed = $scope.totalTopSspeed + ride.top_speed;
                                        averageSpeed = parseFloat(averageSpeed) + parseFloat(ride.average_speed);
                                        totalTopSspeed.push(parseFloat(ride.top_speed));



                                    }
                                }

                                var tempDuration = $scope.totalDuration;

                                $scope.totalDistance = parseFloat(Math.round($scope.totalDistance * 100) / 100).toFixed(2);
                                $scope.totalEnergy = parseFloat(Math.round($scope.totalEnergy * 100) / 100).toFixed(2);
                                $scope.totalCalories = parseFloat(Math.round($scope.totalCalories * 100) / 100).toFixed(2);
                                if (averageSpeed > 0) {
                                    $scope.totalAverageSpeed = averageSpeed / totalLength;

                                    $scope.totalAverageSpeed = parseFloat(Math.round($scope.totalAverageSpeed * 100) / 100).toFixed(2);
                                }
                                $scope.totalDuration = ReplaceTime(hhmmss($scope.totalDuration));
                                if (totalTopSspeed.length > 0) {
                                    $scope.totalTopSspeed = Math.max.apply(Math, totalTopSspeed);

                                    $scope.totalTopSspeed = parseFloat(Math.round($scope.totalTopSspeed * 100) / 100).toFixed(2);
                                }




                                horse.total_rides = totalLength;
                                horse.top_speed = $scope.totalTopSspeed  + " mph";
                                horse.energy = $scope.totalCalories + " cal";
                                horse.miles = $scope.totalDistance+" miles";

                                $scope.AllHorses.push(horse);

                            }
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }




            $scope.Users = [];
            var userhorsemap = [];
            for (var counter = 0; counter < $scope.AllDBUsers.length; counter++) {

                if ($scope.AllDBUsers[counter].horse_ids) {

                    var ids = Object.keys($scope.AllDBUsers[counter].horse_ids);
                    console.log(ids);

                    for (var i in $scope.AllHorses) {
                        var evens = _.filter(ids, function (num) { return num == $scope.AllHorses[i].$id; });
                        if (evens.length > 0) {
                            if (!(_.contains($scope.Users, $scope.AllDBUsers[counter]))) {
                                $scope.Users.push($scope.AllDBUsers[counter]);
                            }
                            $scope.AllHorses[i].Member = $scope.AllDBUsers[counter].email;
                        }
                    }
                }
            }



            $scope.gridOptions.data = $scope.AllHorses;

            $scope.example15data = _.map($scope.Users, function (elem) { return { id: elem.$id, label: elem.first_name + " " + elem.last_name } });

            UnLoadingState();



        });


    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $scope.SelectItem = function () {

        $scope.SearchData = []
        var tempHorseArray = [];
        console.log($scope.example15model);
        if ($scope.example15model.length > 0) {
            LoadingState();
            for (var i = 0; i < $scope.example15model.length; i++) {
                var data = _.findWhere($scope.Users, { $id: $scope.example15model[i].id })
                if (data.horse_ids != undefined) {

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



    $scope.Download = function () {
        var downloadData = [];
        for (var i = 0; i < $scope.gridOptions.data.length; i++) {
            delete $scope.gridOptions.data[i].horse_firebase_key;
            delete $scope.gridOptions.data[i].start_cord;
            delete $scope.gridOptions.data[i].$$hashKey;
            delete $scope.gridOptions.data[i].$priority;
            delete $scope.gridOptions.data[i].$id;
            delete $scope.gridOptions.data[i].end_cord;
            delete $scope.gridOptions.data[i].coords;
            downloadData.push($scope.gridOptions.data[i]);
        }
        JSONToCSVConvertor(downloadData, "Horses Data", true);
    }

    $scope.EmailSend = function () {

        $('#sharemodal').show();
        //swal('Email functionlity in progess and will be deployed soon')
    }
    $scope.ClosedShareModel = function () {
        $("#sharemodal").hide();
    }
    $scope.SendPdf = function () {

        if (document.getElementById("shareemailaddress").value == "") {
            alert("Please Enter your Email Id");
            return;
        } else {
            $("#sharemodal").hide();
            swal('', 'Your report will be Email to you shortly', 'success');
        }
    }
});
