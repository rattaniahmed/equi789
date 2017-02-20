app.controller('MembersController', function ($scope, storageService, firebaseService, $firebaseArray, $routeParams, $rootScope) {

    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 10,
        enableFiltering: false,
        scrollable: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
        },
        columnDefs: [
           { name: 'email', headerCellClass: 'blue', field: 'email' },
          { name: 'display_name', enableFiltering: false, headerCellClass: 'blue', filed: 'Display_Name' },
          { name: 'first_name', headerCellClass: 'blue', filed: 'first_name' },
          { name: 'last_name', headerCellClass: 'blue', filed: 'last_name' },
         { name: 'TotalRides', headerCellClass: 'blue', filed: 'Total Rides' },
          { name: 'TotalHorses', headerCellClass: 'blue', filed: 'Total Horses' },
        { name: 'TotalTime', headerCellClass: 'blue', filed: 'Total Time' },
         { name: 'TotalDistance', headerCellClass: 'blue', filed: 'Total Distance' }

        ],
        exporterLinkLabel: 'get your csv here',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [5, 5, 5, 5] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 600,
        exporterPdfHeader: { text: "Members Detail", style: 'headerStyle' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true, margin: [260, 10, 100, 0] };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true, margin: [300, 0, 60, 60] };
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
            ['first_name', 'last_name', 'display_name', 'email'].forEach(function (field) {
                try {
                    if (row.entity[field]) {
                        if (row.entity[field].match(matcher)) {
                            match = true;
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


   

    $scope.example15customTexts = { buttonDefaultText: 'Select Users' };
    $scope.example15settings = { enableSearch: true, buttonDefaultText: 'Select Riders' };
    $scope.customFilter = '';


    $scope.stables = [];
    $scope.example15model = [];
    $scope.AllHorses = [];

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.Init = function () {
        LoadingState();
        if ($rootScope.isDataLoaded) {

            $scope.AllHorses = $rootScope.getOrgHorses();
            $scope.Users = $rootScope.getOrgUsers($scope.AllHorses);

            for (var usrCounter = 0; usrCounter < $scope.Users.length; usrCounter++) {

                var horseIds = $rootScope.getHorseIds($scope.Users[usrCounter]);
                var rideIds = $rootScope.getRideIds(horseIds);
                var commulativeData = getCommulativeData(rideIds, $rootScope.backendHorseRides);

                $scope.Users[usrCounter].TotalRides = commulativeData.total_rides;
                $scope.Users[usrCounter].TotalHorses = horseIds.length;
                $scope.Users[usrCounter].TotalTime = commulativeData.totalDuration;
                $scope.Users[usrCounter].TotalDistance = commulativeData.miles;
            }

            $scope.gridOptions.data = $scope.Users;

            UnLoadingState();

        }
    }


    $scope.Init();
    $scope.$on('DataLoaded', function (event, data) {
        $scope.Init();
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
            delete $scope.gridOptions.data[i].horse_ids;
            delete $scope.gridOptions.data[i].sync;
            delete $scope.gridOptions.data[i].birthday;
            delete $scope.gridOptions.data[i].isAdmin;
            delete $scope.gridOptions.data[i].passion;
            delete $scope.gridOptions.data[i].profile;

            downloadData.push($scope.gridOptions.data[i]);
        }
        JSONToCSVConvertor(downloadData, "Members Data", true);
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
