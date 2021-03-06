﻿app.controller('HorsesController', function ($scope, storageService, firebaseService, $firebaseArray, $routeParams, $rootScope) {
    var srirachaSauce = 1;
    var myAwesomeSortFnForInt = function (a1, b1, rowA, rowB, direction) {

      
        try {
            var a = parseFloat(a1.replace(" miles", ""));
            var b = parseFloat(b1.replace(" miles", ""));

            if (a == b) return 0;
            if (a > b) return -1;

            return srirachaSauce;
        } catch (err) {
            return -1;
        }
    };
    var myAwesomeSortFnForEnergyInt = function (a1, b1, rowA, rowB, direction) {

        try {
            var a = parseFloat(a1.replace(" col", ""));
            var b = parseFloat(b1.replace(" col", ""));

            if (a == b) return 0;
            if (a > b) return -1;

            return srirachaSauce;
        } catch (err) {
            return -1;
        }
    };
    var myAwesomeSortFnForEmail = function (a1, b1, rowA, rowB, direction) {


        try {
           // var a = parseFloat(a1.replace(" col", ""));
           // var b = parseFloat(b1.replace(" col", ""));

if(a < b) return -1;
    if(a > b) return 1;
    return 0;
           // var textA = a.toUpperCase();
            //var textB = b.toUpperCase();
          ////  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            // return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            
        } catch (err) {
            return -1;
        }
    };
    var myAwesomeSortFnForTopSpeedInt = function (a1, b1, rowA, rowB, direction) {


        try {
            var a = parseFloat(a1.replace(" mph", ""));
            var b = parseFloat(b1.replace(" mph", ""));

            if (a == b) return 0;
            if (a > b) return -1;

            return srirachaSauce;
        } catch (err) {
            return -1;
        }
    };
    
    var layout = {
        "content": []
    }

    var Organisation=JSON.parse(localStorage.getItem('adminObject'));
    //layout.content.push(    {
    //    "text": "Lorem ipsum dolor sit amet,consectetur adipiscing",
    //    "fontSize": 15
    //});
    
    //layout.content.push({
    //    "image": 'https://images.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
    //    "width": 150,
    //    "height": 150,
    //    "text": ""
    //});
    
    //layout.content.push({
    //    "text": "Lorem ipsum dolor sit amet,consectetur adipiscing",
    //    "fontSize": 15

    //});

    $scope.date = {
        startDate: moment().subtract(29, "days"),
        endDate: moment()
    };

    $scope.custompdfheader = {
        columns: [
        //  { alignment: 'left', image: 'data:image/jpeg;base64,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' },
          {
              text: Organisation.DisplayName+"\n Horses Summary Report", alignment: 'center', fontSize: 10
          },
         
          { text: 'Report Range:\nJanuary 2017', alignment: 'right', fontSize: 6}
           
        ]
    };
   
    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        enableSorting: true,
        paginationPageSize: 10,
        enableFiltering: false,
        enableColumnResizing: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
        },
        columnDefs: [
            {
                name: 'EquiTrack Email', displayName: 'EquiTrack Email', headerCellClass: 'blue', enableFiltering: false,
                cellTemplate: '<div style="cursor: row.cursor"><a href="mailto:{{row.entity.Member}}?subject=Congratulations from {{row.entity.OGNAME}}"target="_blank">{{row.entity.Member}}</a></div>'
            },
            {
                name: 'Member Email', headerCellClass: 'blue', enableFiltering: false, enableFiltering: false,
                cellTemplate: '<div style="cursor: row.cursor"><a href="mailto:{{row.entity.Orgmember}}?subject=Congratulations from {{row.entity.OGNAME}}"target="_blank">{{row.entity.Orgmember}}</a></div>'
            },
            { name: 'Member ID', displayName: 'Member ID', enableFiltering: false, field: 'Orgnumber', headerCellClass: 'blue' },

            { name: 'Member Name', displayName: 'Member Name', enableFiltering: false, headerCellClass: 'blue', field: 'member_name' },

            { name: 'horse_name', enableFiltering: false, headerCellClass: 'blue', field: 'horse_name'},
          
            { name: 'Registered Name', enableFiltering: false, field: 'aqharegname',headerCellClass: 'blue' },
            { name: 'Registration Number', enableFiltering: false, field: 'aqharegnum', headerCellClass: 'blue' },
            { name: 'Breed', enableFiltering: false, field: 'registration', headerCellClass: 'blue' },
        //  { name: 'RidingProgram', enableFiltering: false, headerCellClass: 'blue' },
          //{ name: 'birthday', headerCellClass: 'blue' },
          //{ name: 'registration', headerCellClass: 'blue' },
         // { name: 'weight', headerCellClass: 'blue' },
          { name: 'TotalRides', headerCellClass: 'blue', enableFiltering: false, field: 'TotalRides', type:'number' },
          { name: 'TotalTime', headerCellClass: 'blue', field: 'TotalTime', enableFiltering: false, },
          { name: 'TotalDistance', headerCellClass: 'blue', field: 'TotalDistance', sortingAlgorithm: myAwesomeSortFnForInt },
          //{ name: 'TopSpeed', headerCellClass: 'blue', field: 'TopSpeed', sortingAlgorithm: myAwesomeSortFnForTopSpeedInt },
         // { name: 'TotalEnergy', headerCellClass: 'blue', field: 'TotalEnergy' , sortingAlgorithm: myAwesomeSortFnForEnergyInt }
          //{ name: 'energy', headerCellClass: 'blue' },
          //{ name: 'calories', headerCellClass: 'blue' },

        ],
        exporterLinkLabel: 'get your csv here',
        exporterPdfDefaultStyle: { fontSize: 8 },
        exporterPdfTableStyle: { margin: [5, 5, 5, 5] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'black', fillColor: '#dedede' },
        exporterPdfOrientation: 'landscap',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 600,
        //exporterPdfHeader: { image: layout.content },
        exporterPdfHeader: angular.copy($scope.custompdfheader),
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: "background-color:green" };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { bold: true, margin: [260, 20, 100, 20] };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true, margin: [400, 0, 60, 0] };
            return docDefinition;
        },
    };
    

   // alert("test");


   // $scope.headertext = ["Appaloosa Horse Club Horses Summary Report Report Range:  January 2017"];
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

    $scope.setDateLable = function (start, end) {
        $('#reportrangeride span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    };

    $scope.renderCalender = function () {

        var cb = function (start, end, label) {
            $('#reportrangeride span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        };

        var optionSet1 = {
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'This Year': [moment().startOf('year'), moment().endOf('year')],
                'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
            },
            opens: 'left',
            buttonClasses: ['btn btn-default'],
            applyClass: 'btn-small btn-primary',
            cancelClass: 'btn-small',
            format: 'MM/DD/YYYY',
            separator: ' to ',
            locale: {
                applyLabel: 'Submit',
                cancelLabel: 'Clear',
                fromLabel: 'From',
                toLabel: 'To',
                customRangeLabel: 'Custom',
                daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                firstDay: 1
            }
        };
        $('#reportrangeride span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
        $('#reportrangeride').daterangepicker(optionSet1, cb);
        $('#reportrangeride').on('show.daterangepicker', function () {
        });
        $('#reportrangeride').on('hide.daterangepicker', function () {
        });
        $('#reportrangeride').on('apply.daterangepicker', function (ev, picker) {
            $scope.endDateForFilter = picker.endDate;
            $scope.startDateForFilter = picker.startDate;
            //$scope.FilterGraphs($scope.startDateForFilter, $scope.endDateForFilter);
            $scope.date = {
                startDate: picker.startDate,
                endDate: picker.endDate
            };
            $scope.Init();
            $scope.$apply();
        });
        $('#reportrangeride').on('cancel.daterangepicker', function (ev, picker) {
        });
        $('#options1').click(function () {
            $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
        });
        $('#options2').click(function () {
            $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
        });
        $('#destroy').click(function () {
            $('#reportrangeride').data('daterangepicker').remove();
        });
    }
    $scope.singleFilter = function (renderableRows) {
        $scope.filterValue = $scope.filterValue || "";
        var matcher = new RegExp($scope.filterValue);
        renderableRows.forEach(function (row) {

            var match = false;
            // Object.keys(row.entity).
            ['member_name', 'horse_name', 'registration', 'Orgmember', 'Orgnumber', 'aqharegname', 'Member','aqharegnum', 'MembershipNumber'].forEach(function (field) {
                try {
                    if (row && row.entity) {
                        if (row.entity[field]) {
                            try {
                                if (row.entity[field].toLocaleLowerCase().indexOf($scope.filterValue.toLocaleLowerCase()) > -1) {
                                    //if (row.entity[field].toLocaleLowerCase().match(matcher.toLocaleString())) {
                                    // if (row.entity[field].match(matcher)) {
                                    match = true;
                                }
                            } catch (err){ }
                        }
                    }
                }
                catch (e) {
                    match = false;
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
            RefillGridBacket();
            $scope.AllHorses = $rootScope.getOrgHorses();
            $scope.Users = $rootScope.getOrgUsers($scope.AllHorses);
            $scope.AllHorses = $rootScope.filterOrgHorses($scope.Users, $scope.AllHorses);

            var maps = getHorseUserMap($scope.Users);

            Organisation = JSON.parse(localStorage.getItem('adminObject'));
                if (Organisation.OrganisationNumber != "AQHA-2017") {
                    $scope.gridOptions.columnDefs[1] = { field: $scope.gridOptions.columnDefs[1].name,visible: false };
                    $scope.gridOptions.columnDefs[2] = { field: $scope.gridOptions.columnDefs[2].name,visible: false };
                }
            $scope.showhorse = [];
            var addedCounter = 0;

            for (var counter = 0; counter < $scope.AllHorses.length; counter++) {
                    $scope.AllHorses[counter].MembershipNumber = "";
                    if ($scope.AllHorses[counter].associations) {
                        var og = _.find($scope.AllHorses[counter].associations, function (oginner) { return oginner.filter == Organisation.OrganisationNumber });
                        if (og) {
                            $scope.AllHorses[counter].MembershipNumber = og.number;
                            if (Organisation.OrganisationNumber != "AQHA-2017") {
                                $scope.AllHorses[counter].aqharegname = og.name;
                                $scope.AllHorses[counter].aqharegnum = og.number;

                            }
                            
                        }
                    }

                    $scope.AllHorses[counter].Member = "";
                    var member = _.find(maps, function (singlemap) { return singlemap.HorseId == $scope.AllHorses[counter].$id });
                    if (member) {
                        $scope.AllHorses[counter].Member = member.Detail.email;
                        $scope.AllHorses[counter].MemberId = member.Detail.$id;

                        member.Detail.first_name = member.Detail.first_name || '';
                        member.Detail.last_name = member.Detail.last_name || '';

                        var str = member.Detail.first_name +" "+ member.Detail.last_name;
                        
                        $scope.AllHorses[counter].member_name = str;
                        
                        if (member.Detail['org_membership'] && member.Detail['org_membership'][Organisation.OrganisationNumber]) {
                            $scope.AllHorses[counter].Orgmember = member.Detail['org_membership'][Organisation.OrganisationNumber].member_email
                            $scope.AllHorses[counter].Orgnumber = member.Detail['org_membership'][Organisation.OrganisationNumber].member_number
                        }
                    }
                    var rideIds = []
                    if ($scope.AllHorses[counter].ride_ids)
                        rideIds = Object.keys($scope.AllHorses[counter].ride_ids);

                    var commulativeData = getCommulativeData(rideIds, $rootScope.backendHorseRides, $scope.date);

                    if (commulativeData.total_rides != 0) {
                        
                        $scope.showhorse.push($scope.AllHorses[counter]);
                        $scope.showhorse[addedCounter].OGNAME = Organisation.DisplayName;
                        $scope.showhorse[addedCounter].TotalRides = commulativeData.total_rides;
                        $scope.showhorse[addedCounter].TotalTime = commulativeData.totalDuration;
                        $scope.showhorse[addedCounter].TotalDistance = commulativeData.miles;
                        $scope.showhorse[addedCounter].TopSpeed = commulativeData.top_speed;
                        $scope.showhorse[addedCounter].TotalEnergy = commulativeData.energy;
                        $scope.showhorse[addedCounter].TotalAverageHeartRate = commulativeData.totalAverageHeartRate;

                        addedCounter++;
                    }
                    else {
                        //$scope.showhorse.push($scope.AllHorses[counter]);
                        //$scope.showhorse[addedCounter].OGNAME = Organisation.DisplayName;
                        //$scope.showhorse[addedCounter].TotalRides = 0;
                        //$scope.showhorse[addedCounter].TotalTime = 0;
                        //$scope.showhorse[addedCounter].TotalDistance = 0;
                        //$scope.showhorse[addedCounter].TopSpeed = 0;
                        //$scope.showhorse[addedCounter].TotalEnergy = 0;
                        //$scope.showhorse[addedCounter].TotalAverageHeartRate = 0;
                       // addedCounter++;
                    }

                //}
            }
           
            $scope.gridOptions.data = $scope.showhorse;
            //$scope.gridOptions.data = $scope.AllHorses;

            $scope.example15data = _.map($scope.Users, function (elem) {
                return { id: elem.$id, label: elem.first_name + " " + elem.last_name }
            });

            $scope.setDateLable($scope.date.startDate, $scope.date.endDate);
            UnLoadingState();

        }
    }
    $scope.renderCalender();
    $scope.Init();
    $scope.$on('DataLoaded', function (event, data) {
        $scope.Init();
    });
   
   
    $scope.SelectItem = function () {
        $scope.Init();
        
        LoadingState();

        var isUserFilter = false;
        $scope.tempData = []
       
        if ($scope.example15model.length > 0) {
            for (var i = 0; i < $scope.example15model.length; i++) {               
                var user = _.findWhere($scope.Users, { $id: $scope.example15model[i].id });

                var rows = _.filter($scope.AllHorses, function (record) { return record.MemberId == user.$id });

                for (var counter = 0; counter < rows.length; counter++) {
                    $scope.tempData.push(rows[counter]);
                }

                isUserFilter = true;
            }
        }


        //filter for distance

        var isMileFilter = false;
        $scope.tempData1 = []

        try {
            var mile = $("#miles").val();
            var hour = $("#hours").val();


            var tofilter = $scope.AllHorses;
            if (isUserFilter)
                tofilter = $scope.tempData;

            for (var counter = 0; counter < tofilter.length; counter++) {
                if (mile != "" && hour != "") {
                    if (parseFloat(tofilter[counter].TotalDistance) >= parseFloat(mile)
                        && parseFloat(tofilter[counter].TotalTime) >= parseFloat(hour)) {
                        $scope.tempData1.push(tofilter[counter]);
                        isMileFilter = true;
                    }
                } else if (mile != "") {
                    if (parseFloat(tofilter[counter].TotalDistance) >= parseFloat(mile)) {
                        $scope.tempData1.push(tofilter[counter]);
                        isMileFilter = true;
                    }
                } else if (hour != "") {
                    if (parseFloat(tofilter[counter].TotalTime) >= parseFloat(hour)) {
                        $scope.tempData1.push(tofilter[counter]);
                        isMileFilter = true;
                    }
                }
            }
        } catch (err) {

        }
        
        if (isMileFilter)
            $scope.gridOptions.data = $scope.tempData1;
        else if (isUserFilter)
            $scope.gridOptions.data = $scope.tempData;

        UnLoadingState();
    }


    

    $scope.Download = function () {
        var downloadData = $scope.getCurrentGridData();
        JSONToCSVConvertor(downloadData, "Horses Report" + " " + new Date().toString('yyyyMMdd hhmmss'), true);
    }
    $scope.EmailSend = function () {

        $('#sharemodal').show();
        //swal('Email functionlity in progess and will be deployed soon')
    }
    $scope.ClosedShareModel = function () {
        $("#sharemodal").hide();
    }

    $scope.getCurrentGridData = function () {
        var downloadData = [];
        for (var i = 0; i < $scope.gridOptions.data.length; i++) {
            var colArray = [];
            if (Organisation.OrganisationNumber == "AQHA-2017") {
                colArray = ["Member", "Orgmember", "Orgnumber", "member_name", "horse_name", "aqharegname", "aqharegnum", "registration", "TotalRides", "TotalTime", "TotalDistance", "TotalAverageHeartRate"];
            } else {
                colArray = ["Member", "horse_name", "member_name", "aqharegname", "aqharegnum", "registration", "TotalRides", "TotalTime", "TotalDistance", "TotalAverageHeartRate"];
            }
            var row = {};
            for (var counter = 0; counter < colArray.length; counter++) {
                row[colArray[counter]] = $scope.gridOptions.data[i][colArray[counter]] || "no data";
            }
            downloadData.push(row);
        }
        return downloadData;
    }

    $scope.SendPdf = function () {
        if (document.getElementById("shareemailaddress").value == "") {
            alert("Please Enter your Email Id");
            return;
        } else {
            $("#sharemodal").hide();
            
            var downloadData = $scope.getCurrentGridData();
            var csv = GetCSVFromArrayObject(downloadData, true);
            var datatosend={
                email: document.getElementById("shareemailaddress").value,
                csv: csv
            }
            var url = storageService.getNodeJSAppURL() + 'sendcsvreport';

            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                data: datatosend,
                async: true,
                success: function (response) {
                },
                error: function (reposnse) {
                    console.log("Unknown error occured");
                }
            });
           // SendDataTONOdeJSBAckend(datatosend)
            swal('', 'Your report has been sent.', 'success');
        }
    }
    $scope.checkNuumber = function (event) {


        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 190 || event.keyCode == 110) {
            //document.getElementById("miles")= event.key;
        }
        else if (event.keyCode == 13) {
            $scope.Init();
        }
        else {
            alert("Only Digits you can press")
            event.preventDefault();
        }


    }
});
