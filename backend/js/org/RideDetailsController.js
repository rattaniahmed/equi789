app.controller('RideDetailsController', function ($scope, storageService, firebaseService, $firebaseArray, $routeParams, $rootScope) {

    console.log("rideDetailController");

    $scope.date = {
        startDate: moment().subtract(1, "days"),
        endDate: moment()
    };
    var Organisation = JSON.parse(localStorage.getItem('adminObject'));
    $scope.custompdfheader = {
        columns: [
        //  { alignment: 'left', image: 'data:image/jpeg;base64,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' },
          {
              text: Organisation.DisplayName + "\n Horse Rides Summary Report", alignment: 'center', fontSize: 10
          },

          { text: '\nReport Range:\nJanuary 2017', alignment: 'right', fontSize: 6 }

        ]
    };

    $scope.opts = {
        locale: {
            applyClass: 'btn-green',
            applyLabel: "Use",
            fromLabel: "From",
            toLabel: "To",
            cancelLabel: 'Cancel',
            customRangeLabel: 'Custom range',
            daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            firstDay: 1,
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'
            ]
        },
        ranges: {
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()]
        }
    };

    var srirachaSauce = 1;
    var myAwesomeSortFn = function (a1, b1, rowA, rowB, direction) {

        //a = moment(a1, 'M/D/YYYY HH:MM:SS A')
        //b = moment(b1, 'M/D/YYYY HH:MM:SS A')

        //if (rowA.entity.CreateTime == rowB.entity.CreateTime) return 0;
        //if (rowA.entity.CreateTime < rowB.entity.CreateTime) return -1;

        //var a2 = parseInt(rowA.entity.CreateTime);
        //var b2 = parseInt(rowB.entity.CreateTime);

        //var a = new Date(a2);
        //var b = new Date(b2);
        try{
            var a = Date.parse(a1);
            var b = Date.parse(b1);

            if (a == b) return 0;
            if (a > b) return -1;

            return srirachaSauce;
        }catch(err){
            return -1;
        }
    };

    var myAwesomeSortFnForInt = function (a1, b1, rowA, rowB, direction) {

        //a = moment(a1, 'M/D/YYYY HH:MM:SS A')
        //b = moment(b1, 'M/D/YYYY HH:MM:SS A')

        //if (rowA.entity.CreateTime == rowB.entity.CreateTime) return 0;
        //if (rowA.entity.CreateTime < rowB.entity.CreateTime) return -1;

        //var a2 = parseInt(rowA.entity.CreateTime);
        //var b2 = parseInt(rowB.entity.CreateTime);

        //var a = new Date(a2);
        //var b = new Date(b2);
        try {
            var a = parseFloat(a1);
            var b = parseFloat(b1);

            if (a == b) return 0;
            if (a > b) return -1;

            return srirachaSauce;
        } catch (err) {
            return -1;
        }
    };

    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 10,
        enableFiltering: false,
        enableColumnResizing:true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);
        },

        columnDefs: [
           { name: 'Member', headerCellClass: 'blue' },
           { name: 'Horse', headerCellClass: 'blue', field: 'Horse' },
          { name: 'MembershipNumber', headerCellClass: 'blue', field: 'MembershipNumber' },
          { name: 'total_distance', enableFiltering: false, headerCellClass: 'blue', sortingAlgorithm: myAwesomeSortFnForInt },
          { name: 'total_times', headerCellClass: 'blue' },
          { name: 'top_speed', headerCellClass: 'blue', sortingAlgorithm: myAwesomeSortFnForInt },
          { name: 'average_speed', headerCellClass: 'blue', sortingAlgorithm: myAwesomeSortFnForInt },
          { name: 'start_time', headerCellClass: 'blue', sortingAlgorithm: myAwesomeSortFn },
          { name: 'end_time', headerCellClass: 'blue', sortingAlgorithm: myAwesomeSortFn },
          { name: 'location', headerCellClass: 'blue' },
          { name: 'weather', headerCellClass: 'blue' },
          { name: 'energy', headerCellClass: 'blue', sortingAlgorithm: myAwesomeSortFnForInt },
          { name: 'calories', headerCellClass: 'blue', sortingAlgorithm: myAwesomeSortFnForInt }

        ],
        exporterLinkLabel: 'get your csv here',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [5, 5, 5, 5] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfOrientation: 'landscape',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 500,
        exporterPdfHeader: angular.copy($scope.custompdfheader),
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true, margin: [300, 0, 60, 0] };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true, margin: [300, 0, 60, 0] };
            return docDefinition;
        },
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
                  //(new Date).clearTime().addSeconds(rides.total_time).toString('H:mm:ss');
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

    $scope.export = function (type) {
        //if ($scope.export_format == type) {
        //    var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
        //    $scope.gridApi.exporter.csvExport( 'All', 'All', myElement );
        //} else if ($scope.export_format == type) {
        $scope.gridApi.exporter.pdfExport("all", "all");
        //};
    }


    $scope.renderCalender = function () {

        var cb = function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
            $('#reportrangeride span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        };

        var optionSet1 = {
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
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
            console.log("show event fired");
        });
        $('#reportrangeride').on('hide.daterangepicker', function () {
            console.log("hide event fired");
        });
        $('#reportrangeride').on('apply.daterangepicker', function (ev, picker) {
            console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
            $scope.endDateForFilter = picker.endDate;
            $scope.startDateForFilter = picker.startDate;
            //$scope.FilterGraphs($scope.startDateForFilter, $scope.endDateForFilter);
            $scope.date = {
                startDate: picker.startDate,
                endDate: picker.endDate
            };
            console.log("applying date");
            $scope.$apply();
        });
        $('#reportrangeride').on('cancel.daterangepicker', function (ev, picker) {
            console.log("cancel event fired");
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
            ['total_distance', 'total_time','calories', 'energy','top_speed', 'average_speed', 'high_heart_rate', 'weather', 'Member', 'MembershipNumber', 'Horse', 'total_distance'].forEach(function (field) {
                try {
                    if (row && row.entity) {
                        if (row.entity[field]) {
                            if (row.entity[field].match(matcher)) {
                                match = true;
                            }
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


    $scope.stables = [];

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.example15model = [];
    $scope.example14model = [];
    $scope.example15customTexts = { buttonDefaultText: 'Select Users' };
    $scope.example14customTexts = { buttonDefaultText: 'Select Horse' };
    $scope.example15settings = { enableSearch: true, buttonDefaultText: 'Select Riders' };
    $scope.customFilter = '';

    $scope.AllRides = [];
    $scope.AllHorses = [];
    $scope.example14data = [];

    $scope.Init = function () {
        LoadingState();
        
        if ($rootScope.isDataLoaded) {
            $scope.renderCalender();
            $scope.org = JSON.parse(localStorage.getItem('adminObject'));
            $scope.AllHorses = $rootScope.getOrgHorses();
            $scope.Users = $rootScope.getOrgUsers($scope.AllHorses);
           // $scope.Rides = $rootScope.getOrgRides($scope.AllHorses);
            var maps = getHorseUserMap($scope.Users);
            var Organisation = JSON.parse(localStorage.getItem('adminObject'));
            var rideIdsTOFetch = [];

            for (var counter = 0; counter < $scope.AllHorses.length; counter++) {
                var horse = $scope.AllHorses[counter];
                if (horse && horse.ride_ids) {
                    for (var rideid in horse.ride_ids) {
                        var rideDetails = $rootScope.backendHorseRides.$getRecord(rideid);
                        if (rideDetails) {
                            //rideDetails.CreateTime = horse.ride_ids[rideid];

                            rideDetails.MembershipNumber = "";
                           
                            if (horse.associations) {
                                var og = _.find(horse.associations, function (oginner) { return oginner.filter == Organisation.OrganisationNumber });
                                if (og)
                                    rideDetails.MembershipNumber = og.number;
                            }
                            
                            rideDetails.Member = "";
                            var member = _.find(maps, function (singlemap) { return singlemap.HorseId == horse.$id });
                            if (member) {
                                rideDetails.Member = member.Detail.email;
                                rideDetails.MemberId = member.Detail.$id;
                            }

                            rideDetails.Horse = horse.horse_name;
                            // rides.total_time = hhmmss(rides.total_time);
                            rideDetails.total_times = hhmmss(rideDetails.total_time);

                            rideIdsTOFetch.push(rideDetails);
                        }
                    }
                }
            }

            $scope.gridOptions.data = rideIdsTOFetch;
            $scope.example15data = _.map($scope.Users, function (elem) { return { id: elem.$id, label: elem.first_name + " " + elem.last_name } });
            UnLoadingState();
        }
    }

    $scope.Init();
    $scope.$on('DataLoaded', function (event, data) {
        $scope.Init();
    });


    $scope.example14settings = { enableSearch: true, dynamicTitle: false, buttonDefaultText: 'Select Horse' };

    $scope.SelectUser = function () {

    }



    $scope.SelectItem = function () {
        try {
            if ($scope.example14model.length > 0) {
                LoadingState();
                $scope.SearchData = [];
                for (var i = 0; i < $scope.example14model.length; i++) {
                    var data = _.findWhere($scope.AllHorses, { $id: $scope.example14model[i].id })
                    if (data.ride_ids != undefined) {
                        for (var id in data.ride_ids) {
                            // tempHorseArray.push(id)
                            var rides = $scope.Rides.$getRecord(id);
                            $scope.SearchData.push(rides);
                        }

                    }
                }

                
                UnLoadingState();
                $scope.gridOptions.data = $scope.SearchData;




            }
            if (moment($scope.date.endDate._d).format('MM/DD/YYYY') != moment(new Date()).format('MM/DD/YYYY')) {
                var rides = [];
                for (var i in $scope.rideIdsTOFetch) {
                    if (moment($scope.rideIdsTOFetch[i].start_time).format('MM/DD/YYYY') >= moment($scope.date.startDate._d).format('MM/DD/YYYY') && moment($scope.rideIdsTOFetch[i].end_time).format('MM/DD/YYYY') <= moment($scope.date.endDate._d).format('MM/DD/YYYY')) {
                        rides.push($scope.rideIdsTOFetch[i]);
                    }
                  
                }
                $scope.gridOptions.data = rides;
                console.log($scope.gridOptions.data);
            }

            if ($scope.example15model.length > 0) {
                LoadingState();
                $scope.SearchData = [];
                for (var i = 0; i < $scope.example15model.length; i++) {
                    var user = _.findWhere($scope.Users, { $id: $scope.example15model[i].id })
                    for (var ridekeys in user.horse_ids) {
                        var data = _.findWhere($scope.AllHorses, { $id: ridekeys })
                        var evens = _.filter(data.associations, function (num) { return num.name == $scope.org.OrganisationName; });
                        if (evens.length > 0) {
                            $scope.SearchData.push(data);
                        }
                    }
                }
                $scope.example14data = _.map($scope.SearchData, function (elem) { return { id: elem.$id, label: elem.horse_name } });
                UnLoadingState();

            }
        }
        catch (e) {
            console.log(e);
        }
    }

    $scope.Download = function () {
        var downloadData = $scope.getCurrentGridData();
        JSONToCSVConvertor(downloadData, "Horse Rides Data", true);
        
    }



    $scope.PrintDiv = function () {
        var prtContent = document.getElementById("datagridID");
        var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
        WinPrint.document.write(prtContent.innerHTML);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
    }


    $scope.EmailSend = function () {
        $('#sharemodal').show();
        //swal('Email functionlity in progess and will be deployed soon')
    }
    $scope.ClosedShareModel = function () {
        $("#sharemodal").hide();
    }
    //$scope.SendPdf = function () {

    //    if (document.getElementById("shareemailaddress").value == "") {
    //        alert("Please Enter your Email Id");
    //        return;
    //    } else {
    //        $("#sharemodal").hide();
    //        swal('', 'Your report will be Email to you shortly', 'success');

    //    }
    //}

    $scope.getCurrentGridData = function () {
        var downloadData = [];
        for (var i = 0; i < $scope.gridOptions.data.length; i++) {
            var colArray = ["Member", "Horse", "MembershipNumber", "total_distance", "total_times", "top_speed", "average_speed", "start_time", "end_time", "location", "weather", "energy", "calories"]
            var row = {};
            for (var counter = 0; counter < colArray.length; counter++) {
                row[colArray[counter]] = $scope.gridOptions.data[i][colArray[counter]];
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
            debugger;

            var downloadData = $scope.getCurrentGridData();
            var csv = GetCSVFromArrayObject(downloadData, true);
            var datatosend = {
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
                    console.log(response);
                },
                error: function (reposnse) {
                    console.log("Unknown error occured");
                }
            });
            // SendDataTONOdeJSBAckend(datatosend)
            swal('', 'Your report has been sent.', 'success');
        }
    }

});
