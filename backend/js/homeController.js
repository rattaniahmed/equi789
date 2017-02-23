app.controller('homeController', function ($scope, firebaseService, $firebaseArray, storageService, $rootScope) {

    // $scope.user = StorageService.getObject('user');
    $scope.Totalhorsemap = [];
    var ref = firebaseService.FIREBASEENDPOINT();

    $scope.AllHorses = [];
    $scope.AllDBUsers = [];

    $scope.Old = function () {

        $scope.horses = $firebaseArray(ref.child('horses'));
        $scope.horses.$loaded().then(function (dataArray) {
            for (var i = 0; i <= dataArray.length; i++) {
                try {
                    if (dataArray[i].horse_name != undefined) {
                        $scope.org = JSON.parse(localStorage.getItem('adminObject'));
                        var evens = _.filter(dataArray[i].associations, function (num) { return num.filter == $scope.org.OrganisationNumber; });
                        if (evens.length > 0) {
                            $scope.AllHorses.push(dataArray[i]);
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }


            $scope.horseCreate = [];
            $scope.Users = [];
            $scope.users = $firebaseArray(ref.child('users'));
            $scope.users.$loaded().then(function (dataArray) {

                $scope.AllDBUsers = dataArray;

                for (var counter = 0; counter < $scope.AllDBUsers.length; counter++) {

                    if ($scope.AllDBUsers[counter].horse_ids) {

                        var ids = Object.keys($scope.AllDBUsers[counter].horse_ids);

                        for (var i in $scope.AllHorses) {
                            var evens = _.filter(ids, function (num) { return num == $scope.AllHorses[i].$id; });
                            if (evens.length > 0) {
                                if (!(_.contains($scope.Users, $scope.AllDBUsers[counter]))) {
                                    $scope.Users.push($scope.AllDBUsers[counter]);
                                    console.log($scope.Users);
                                    console.log(_.pluck($scope.Users, 'horse_ids'));
                                    $scope.horseCreate.push(_.pluck($scope.Users, 'horse_ids'));

                                }

                            }

                        }

                    }
                }
                //$scope.example15data = _.map(dataArray, function (elem) { return { id: elem.$id, label: elem.first_name +" "+ elem.last_name } });
                if ($scope.horseCreate)
                    $scope.Init();
                console.log(dataArray);
            });


            $scope.TotalMembermap = dataArray;
            // UnLoadingState();

        });

    }


   
    $scope.endDateForFilter = new Date();
    $scope.startDateForFilter = new Date();
    $scope.startDateForFilter.setTime($scope.endDateForFilter.getTime() - 1000 * 60 * 60 * 24 * 30); // minus the date
    
    console.log($scope.startDateForFilter)

    $scope.renderCalender = function () {

        var cb = function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        };


        var minimum = moment().subtract(5, 'year').format('MM/DD/YYYY');
        var maximum = moment(new Date()).format('MM/DD/YYYY');

        var optionSet1 = {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            minDate: minimum,
            maxDate: maximum,
            dateLimit: {
                days: 60
            },
            showDropdowns: true,
            showWeekNumbers: true,
            timePicker: false,
            timePickerIncrement: 1,
            timePicker12Hour: true,
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
        $('#reportrange span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
        $('#reportrange').daterangepicker(optionSet1, cb);
        $('#reportrange').on('show.daterangepicker', function () {
            console.log("show event fired");
        });
        $('#reportrange').on('hide.daterangepicker', function () {
            console.log("hide event fired");
        });
        $('#reportrange').on('apply.daterangepicker', function (ev, picker) {
            console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
            $scope.endDateForFilter = picker.endDate;
            $scope.startDateForFilter = picker.startDate;
            $scope.FilterGraphs($scope.startDateForFilter, $scope.endDateForFilter);
            $scope.$apply();
        });
        $('#reportrange').on('cancel.daterangepicker', function (ev, picker) {
            console.log("cancel event fired");
        });
        $('#options1').click(function () {
            $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
        });
        $('#options2').click(function () {
            $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
        });
        $('#destroy').click(function () {
            $('#reportrange').data('daterangepicker').remove();
        });
    }

    // $scope.renderReport();
    // $scope.renderCalender();

    $scope.getDateForEquitrack = function (time) {
        time = parseInt(time);
        var date = new Date(time);
        return date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();
    }


    $scope.getDataToShow = function (dateFilterStart, dateFilterEnd) {

        var horseDataArray = [];
        var rideDataArray = [];


        var UsersCount = 1;
        var HorseCount = 0;
        var RidesCount = 0;

        for (var userCounter = 0 ; userCounter < $scope.Users.length; userCounter++) {
            var user = $scope.Users[userCounter];
            console.log(user.horse_ids);
            if (user.horse_ids) {
                for (var horseId in user.horse_ids) {
                    var horseDetailObject = user.horse_ids[horseId];
                    if (horseDetailObject) {
                        if (horseDetailObject.created_at) {
                            var time = moment(new Date(parseInt(horseDetailObject.created_at)));
                            if (dateFilterStart && dateFilterEnd) {
                                if (time > dateFilterStart && time < dateFilterEnd) {
                                    horseDataArray.push($scope.getDateForEquitrack(horseDetailObject.created_at));
                                    HorseCount++;
                                }
                            } else {
                                horseDataArray.push($scope.getDateForEquitrack(horseDetailObject.created_at));
                                HorseCount++;
                            }
                        }
                    }


                    var horseObject = $rootScope.backendHorses.$getRecord(horseId);
                    if (horseObject.ride_ids) {
                        for (var rideId in horseObject.ride_ids) {
                            var timeValue = horseObject.ride_ids[rideId];
                            var ridetime = moment(new Date(parseInt(timeValue)));
                            if (dateFilterStart && dateFilterEnd) {
                                if (ridetime > dateFilterStart && ridetime < dateFilterEnd) {
                                    rideDataArray.push($scope.getDateForEquitrack(timeValue));
                                    RidesCount++;
                                }
                            } else {
                                rideDataArray.push($scope.getDateForEquitrack(timeValue));
                                RidesCount++;
                            }
                        }
                    }
                }
            }
        }


        var groups = _.groupBy(horseDataArray, function (num) { return Math.floor(num); });
        var horseDataToReturn = [];
        for (var groupkey in groups) {
            horseDataToReturn.push(groups[groupkey].length);
        }

        //horseDataToReturn.push(3);

        var ridegroups = _.groupBy(rideDataArray, function (num) { return Math.floor(num); });
        var rideDataToReturn = [];
        for (var rideGroupkey in groups) {
            rideDataToReturn.push(groups[rideGroupkey].length);
        }

        return {
            UsersData: [1],
            HorseData: horseDataToReturn,
            RideData: rideDataToReturn,
            UsersCount: UsersCount,
            HorseCount: HorseCount,
            RidesCount: RidesCount,
            Distance: 10,
            Energy: 5,
            Speed: 25,
            Time: 20
        }
    }

    $scope.ChangeValues = function () {

        var r = Math.floor(Math.random() * 4) + 1;

        $scope.FilterData.Distance = $scope.FilterData.Distance * r;
        $scope.FilterData.Energy = $scope.FilterData.Energy * r;
        $scope.FilterData.Speed = $scope.FilterData.Speed * r;
        $scope.FilterData.Time = $scope.FilterData.Time * r;

        $scope.$apply();
    }


    $scope.TotalGraphs = function () {

        var dataToRepresent = $scope.getDataToShow(null, null);

        $(".sparkline_totalmembers").sparkline(dataToRepresent.UsersData, {
            type: 'bar',
            height: '40',
            barWidth: 9,
            colorMap: {
                '7': '#a1a1a1'
            },
            barSpacing: 1,
            barColor: '#eed093'
        });


        $(".sparkline_totalhourses").sparkline(dataToRepresent.HorseData, {
            type: 'bar',
            height: '40',
            barWidth: 9,
            colorMap: {
                '7': '#a1a1a1'
            },
            barSpacing: 1,
            barColor: '#eed093'
        });

        $(".sparkline_totalrides").sparkline(dataToRepresent.RideData, {
            type: 'bar',
            height: '40',
            barWidth: 9,
            colorMap: {
                '7': '#a1a1a1'
            },
            barSpacing: 1,
            barColor: '#eed093'
        });


        $scope.UsersCount = dataToRepresent.UsersCount
        $scope.HorsesCount = dataToRepresent.HorseCount;
        $scope.RidesCount = dataToRepresent.RidesCount;

    }

    $scope.filterOption = ['Top Horse By', 'Top Member By', 'Top Ride By'];
    $scope.keyfilter = $scope.filterOption[0];

    $scope.FilterGraphs = function (startDate, endDate) {

        var dataToRepresent = $scope.getDataToShow(startDate, endDate);

        $(".sparkline_newmembers").sparkline(dataToRepresent.UsersData, {
            type: 'bar',
            height: '40',
            barWidth: 9,
            colorMap: {
                '7': '#a1a1a1'
            },
            barSpacing: 1,
            barColor: '#eed093'
        });

        $(".sparkline_newhourses").sparkline(dataToRepresent.HorseData, {
            type: 'bar',
            height: '40',
            barWidth: 9,
            colorMap: {
                '7': '#a1a1a1'
            },
            barSpacing: 1,
            barColor: '#eed093'
        });

        $(".sparkline_newrides").sparkline(dataToRepresent.RideData, {
            type: 'bar',
            height: '40',
            barWidth: 9,
            colorMap: {
                '7': '#a1a1a1'
            },
            barSpacing: 1,
            barColor: '#eed093'
        });


        $scope.FilterData = dataToRepresent;
        $scope.FilterUsersCount = dataToRepresent.UsersCount
        $scope.FilterHorsesCount = dataToRepresent.HorseCount;
        $scope.FilterRidesCount = dataToRepresent.RidesCount;
    }


    $scope.MainGraph = function () {

        var data1 = [
                 [gd(2012, 1, 1), 17],
                 [gd(2012, 1, 2), 74],
                 [gd(2012, 1, 3), 6],
                 [gd(2012, 1, 4), 39],
                 [gd(2012, 1, 5), 20],
                 [gd(2012, 1, 6), 85],
                 [gd(2012, 1, 7), 7]
        ];

        var data2 = [
          [gd(2012, 1, 1), 82],
          [gd(2012, 1, 2), 23],
          [gd(2012, 1, 3), 66],
          [gd(2012, 1, 4), 9],
          [gd(2012, 1, 5), 119],
          [gd(2012, 1, 6), 6],
          [gd(2012, 1, 7), 9]
        ];

        //var data1 = [];
        //var data2 = [];

        $("#canvas_dahs").length && $.plot($("#canvas_dahs"), [
          data1, data2
        ], {
            series: {
                lines: {
                    show: false,
                    fill: true
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.4
                },
                points: {
                    radius: 0,
                    show: true
                },
                shadowSize: 2
            },
            grid: {
                verticalLines: true,
                hoverable: true,
                clickable: true,
                tickColor: "#eed093",
                borderWidth: 1,
                color: '#fff'
            },
            colors: ["rgba(238, 208, 147, 0.38)", "rgba(255, 148, 45, 0.38)"],
            xaxis: {
                tickColor: "rgba(238, 208, 147, 0.06)",
                mode: "time",
                tickSize: [1, "day"],
                //tickLength: 10,
                axisLabel: "Date",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 10
            },
            yaxis: {
                ticks: 8,
                tickColor: "rgba(238, 208, 147, 0.06)",
            },
            tooltip: false
        });

        function gd(year, month, day) {
            return new Date(year, month - 1, day).getTime();
        }

    }

    $scope.Init = function () {
        
        //angular.element(document).ready(function () {
        //    $scope.renderCalender();
        //});

        LoadingState();
        if ($rootScope.isDataLoaded) {
            $scope.AllHorses = $rootScope.getOrgHorses();
            $scope.Users = $rootScope.getOrgUsers($scope.AllHorses);

            angular.element(document).ready(function () {
                $scope.TotalGraphs();
                $scope.FilterGraphs($scope.startDateForFilter, $scope.endDateForFilter);
                $scope.MainGraph();
                $scope.renderCalender();
                $scope.$apply();
                UnLoadingState();
            });

        }
    }


    $scope.Init();
    $scope.$on('DataLoaded', function (event, data) {
        $scope.Init();
    });


});
