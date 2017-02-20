app.controller('HorsesController', function ($scope, storageService, firebaseService, $firebaseArray, $routeParams, $rootScope) {

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
          { name: 'OrganizationNumber', enableFiltering: false, headerCellClass: 'blue' },
          { name: 'birthday', headerCellClass: 'blue' },
          { name: 'registration', headerCellClass: 'blue' },
          { name: 'weight', headerCellClass: 'blue' },
          { name: 'TotalRides', headerCellClass: 'blue', field: 'TotalRides' },
           { name: 'TotalTime', headerCellClass: 'blue', field: 'TotalTime' },
          { name: 'TotalDistance', headerCellClass: 'blue', field: 'TotalDistance' },
          { name: 'TopSpeed', headerCellClass: 'blue', field: 'TopSpeed' },
          { name: 'TotalEnergy', headerCellClass: 'blue', field: 'TotalEnergy' }
          //{ name: 'energy', headerCellClass: 'blue' },
          //{ name: 'calories', headerCellClass: 'blue' },

        ],
        exporterLinkLabel: 'get your csv here',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [5, 5, 5, 5] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'black', fillColor: '#dedede' },
        exporterPdfOrientation: 'landscap',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 600,
        exporterPdfHeader: { text: "Hourse Detail", style: 'headerStyle' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: "background-color:green" };
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

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.rides = $firebaseArray(ref.child('rides'));

    
    $scope.example15model = [];
    $scope.example15customTexts = { buttonDefaultText: 'Select Users' };

    $scope.example15settings = { enableSearch: true, buttonDefaultText: 'Select Riders' };
    $scope.customFilter = '';

    $scope.Init = function () {
        LoadingState();

        if ($rootScope.isDataLoaded) {
            $scope.AllHorses = $rootScope.getOrgHorses();
            $scope.Users = $rootScope.getOrgUsers($scope.AllHorses);

            var maps = getHorseUserMap($scope.Users);

            var Organisation = JSON.parse(localStorage.getItem('adminObject'));

            for (var counter = 0; counter < $scope.AllHorses.length; counter++) {

                $scope.AllHorses[counter].OrganizationNumber = "";
                if ($scope.AllHorses[counter].associations) {
                    var og = _.find($scope.AllHorses[counter].associations, function (oginner) { return oginner.filter == Organisation.OrganisationNumber });
                    if (og)
                        $scope.AllHorses[counter].OrganizationNumber = og.number;
                }

                $scope.AllHorses[counter].Member = "";

                var member = _.find(maps, function (singlemap) { return singlemap.HorseId == $scope.AllHorses[counter].$id });
                if (member) {
                    $scope.AllHorses[counter].Member = member.Detail.email;
                    $scope.AllHorses[counter].MemberId = member.Detail.$id;
                }
                var rideIds = []
                if ($scope.AllHorses[counter].ride_ids)
                    rideIds = Object.keys($scope.AllHorses[counter].ride_ids);

                var commulativeData = getCommulativeData(rideIds, $rootScope.backendHorseRides);
                $scope.AllHorses[counter].TotalRides = commulativeData.total_rides;
                $scope.AllHorses[counter].TotalTime = commulativeData.totalDuration;
                $scope.AllHorses[counter].TotalDistance = commulativeData.miles;
                $scope.AllHorses[counter].TopSpeed = commulativeData.top_speed;
                $scope.AllHorses[counter].TotalEnergy = commulativeData.energy;

            }

            $scope.gridOptions.data = $scope.AllHorses;

            $scope.example15data = _.map($scope.Users, function (elem) { return { id: elem.$id, label: elem.first_name + " " + elem.last_name } });

            UnLoadingState();

        }
    }

    $scope.Init();
    $scope.$on('DataLoaded', function (event, data) {
        $scope.Init();
    });


    $scope.SelectItem = function () {

        $scope.SearchData = []
        if ($scope.example15model.length > 0) {
            LoadingState();
            for (var i = 0; i < $scope.example15model.length; i++) {               
                var user = _.findWhere($scope.Users, { $id: $scope.example15model[i].id });
                console.log(user);
                var rows = _.filter($scope.AllHorses, function (record) { return record.MemberId == user.$id });

                for (var counter = 0; counter < rows.length; counter++) {
                    $scope.SearchData.push(rows[counter]);
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
            delete $scope.gridOptions.data[i].MemberId;
            delete $scope.gridOptions.data[i].notes;
            delete $scope.gridOptions.data[i].photo;

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
