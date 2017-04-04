//adding the text comment 


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

//        'Today': [moment(), moment()],
//'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],

        var optionSet1 = {                     
            ranges: {
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
            $scope.MainGraph($scope.startDateForFilter, $scope.endDateForFilter);
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

    function gd(year, month, day) {
        return new Date(year, month - 1, day).getTime();
    }

    $scope.GetMainGraphDataSet1 = function (dateFilterStart, dateFilterEnd) {

        var dates = [];
        for (var counter = 0; counter < $scope.Users.length; counter++) {
            var user = $scope.Users[counter];
            if (user.horse_ids) {
                for (var horseId in user.horse_ids) {
                    var horseDetailObject = user.horse_ids[horseId];
                    if (horseDetailObject) {
                        if (horseDetailObject.created_at) {

                            var time = moment(new Date(parseInt(horseDetailObject.created_at)));
                            if (dateFilterStart && dateFilterEnd) {
                                if (time >= dateFilterStart && time <= dateFilterEnd) {
                                    var dateString = $scope.getDateForEquitrack(horseDetailObject.created_at);
                                    var isExist = false;
                                    for (var dateCounter = 0; dateCounter < dates.length; dateCounter++) {
                                        if (dates[dateCounter].dateString == dateString) {
                                            isExist = true;
                                            dates[dateCounter].counterValue = dates[dateCounter].counterValue + 1;
                                        }
                                    }
                                    if (!isExist) {
                                        dates.push({
                                            dateToApply: horseDetailObject.created_at,
                                            dateString: dateString,
                                            counterValue: 1
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        

        dates.sort(function compare(a, b) {
            if (a.dateToApply < b.dateToApply)
                return -1;
            if (a.dateToApply > b.dateToApply)
                return 1;
            return 0;
        });



        
        var toShow = [];
        var days= moment(dateFilterEnd).diff(moment(dateFilterStart-1), 'days');
        var startCounter = 0;
        while (startCounter < days) {
            var graphvalue = 0;
            var mv = moment(dateFilterStart).add(startCounter,'days');
            //var datestringtocompare = mv.year().toString() + mv.month().toString() + mv.date().toString();
            var monthvalue = parseInt(mv.format('M'))
            if (monthvalue > 0)
                monthvalue = monthvalue - 1;

            var datestringtocompare = mv.year().toString() + monthvalue.toString() + mv.date().toString();
            for (var finalCounter = 0; finalCounter < dates.length; finalCounter++) {
                if (datestringtocompare == dates[finalCounter].dateString) {
                    graphvalue = dates[finalCounter].counterValue;
                }
            }
            toShow.push(graphvalue);
            startCounter++;
        }

        console.log("befre to show");
        console.log(toShow);


        var data = {
            name: 'Horses',
            data:toShow
        }

        //{
        //    name: 'Horses',
        //    data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
        //        1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
        //        27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
        //        26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
        //        24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
        //        22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
        //        10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
        //}

        

        return data;

    }

    $scope.GetMainGraphDataSet2 = function (dateFilterStart, dateFilterEnd) {

        var dates = [];
        for (var counter = 0; counter < $scope.AllHorses.length; counter++) {
            var horseObject = $scope.AllHorses[counter];
            if (horseObject.ride_ids) {
                for (var rideId in horseObject.ride_ids) {
                    var time = moment(new Date(parseInt(horseObject.ride_ids[rideId])));
                    if (dateFilterStart && dateFilterEnd) {
                        if (time >= dateFilterStart && time <= dateFilterEnd) {
                            var dateString = $scope.getDateForEquitrack(horseObject.ride_ids[rideId]);
                            var isExist = false;
                            for (var dateCounter = 0; dateCounter < dates.length; dateCounter++) {
                                if (dates[dateCounter].dateString == dateString) {
                                    isExist = true;
                                    dates[dateCounter].counterValue = dates[dateCounter].counterValue + 1;
                                }
                            }
                            if (!isExist) {
                                dates.push({
                                    dateToApply: horseObject.ride_ids[rideId],
                                    dateString: dateString,
                                    counterValue: 1
                                })
                            }
                        }
                    }
                }
            }
        }

        dates.sort(function compare(a, b) {
            if (a.dateToApply < b.dateToApply)
                return -1;
            if (a.dateToApply > b.dateToApply)
                return 1;
            return 0;
        });


        var toShow = [];
        var days = moment(dateFilterEnd).diff(moment(dateFilterStart-1), 'days');
        var startCounter = 0;
        while (startCounter < days) {
            var graphvalue = 0;
            var mv = moment(dateFilterStart).add(startCounter, 'days');

            var monthvalue = parseInt(mv.format('M'))
            if (monthvalue > 0)
                monthvalue = monthvalue - 1;

            var datestringtocompare = mv.year().toString() + monthvalue.toString() + mv.date().toString();
            for (var finalCounter = 0; finalCounter < dates.length; finalCounter++) {
                if (datestringtocompare == dates[finalCounter].dateString) {
                    graphvalue = dates[finalCounter].counterValue;
                }
            }
            toShow.push(graphvalue);
            startCounter++;
        }


        var data = {
            name: 'Rides',
            data: toShow
        }

        return data;
    }

    $scope.getDataToShow = function (dateFilterStart, dateFilterEnd) {

        var usersDataArray = [];
        var horseDataArray = [];
        var rideDataArray = [];


        var UsersCount = 0;
        var HorseCount = 0;
        var RidesCount = 0;


        for (var userCounter = 0 ; userCounter < $scope.Users.length; userCounter++) {
            var user = $scope.Users[userCounter];
            console.log(user.horse_ids);

            if (user) {
                try{
                    if (user.createtime) {
                        var time = moment(new Date(parseInt(user.createtime)));
                        if (dateFilterStart && dateFilterEnd) {
                            if (time > dateFilterStart && time < dateFilterEnd) {
                                usersDataArray.push($scope.getDateForEquitrack(user.createtime));
                                UsersCount++;
                            }
                        } else {
                            usersDataArray.push($scope.getDateForEquitrack(user.createtime));
                            UsersCount++;
                        }
                    }
                    else {
                        usersDataArray.push($scope.getDateForEquitrack(new Date().getTime()));
                        UsersCount++;
                    }
                }
                catch (error) {

                }

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
                        console.log(horseObject);
                        if (horseObject) {
                            if (horseObject.ride_ids) {
                                for (var rideId in horseObject.ride_ids) {
                                    var timeValue = horseObject.ride_ids[rideId];
                                    var ridetime = moment(new Date(parseInt(timeValue)));
                                    if (dateFilterStart && dateFilterEnd) {
                                        //if (ridetime > dateFilterStart && ridetime < dateFilterEnd) {
                                        var rideObj = $rootScope.backendHorseRides.$getRecord(rideId);
                                        if (InDefinedTimeRangForHomePage(rideObj, dateFilterStart, dateFilterEnd)) {
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
            }
        }


        var usergroups = _.groupBy(usersDataArray, function (num) { return Math.floor(num); });
        var usersDataToReturn = [];
        for (var usergroupkey in usergroups) {
            usersDataToReturn.push(usergroups[usergroupkey].length);
        }

        var groups = _.groupBy(horseDataArray, function (num) { return Math.floor(num); });
        var horseDataToReturn = [];
        for (var groupkey in groups) {
            horseDataToReturn.push(groups[groupkey].length);
        }

        var ridegroups = _.groupBy(rideDataArray, function (num) { return Math.floor(num); });
        var rideDataToReturn = [];
        for (var rideGroupkey in groups) {
            rideDataToReturn.push(groups[rideGroupkey].length);
        }

        return {
            UsersData: usersDataToReturn,
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


    $scope.MainGraphOld = function (startDate, endDate) {

        //var data1 = [
        //         [gd(2012, 1, 1), 17],
        //         [gd(2012, 1, 2), 74],
        //         [gd(2012, 1, 3), 6],
        //         [gd(2012, 1, 4), 39],
        //         [gd(2012, 1, 5), 20],
        //         [gd(2012, 1, 6), 85],
        //         [gd(2012, 1, 7), 7]
        //];

        //var data2 = [
        //  [gd(2012, 1, 1), 82],
        //  [gd(2012, 1, 2), 23],
        //  [gd(2012, 1, 3), 66],
        //  [gd(2012, 1, 4), 9],
        //  [gd(2012, 1, 5), 119],
        //  [gd(2012, 1, 6), 6],
        //  [gd(2012, 1, 7), 9]
        //];

        var data1 = $scope.GetMainGraphDataSet1(startDate, endDate);
        var data2 = $scope.GetMainGraphDataSet2(startDate, endDate);

        console.log(data1);
        console.log(data2);

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

        

    }


    $scope.MainGraph = function (startDate, endDate) {

        try{
            var data1 = $scope.GetMainGraphDataSet1(startDate, endDate);
            var data2 = $scope.GetMainGraphDataSet2(startDate, endDate);

            var dataArray = [ data1, data2];

            Highcharts.chart('container', {
                chart: {
                    type: 'area'
                },
                colors: ['#eed093', '#f1cc82'],
                title: {
                    text: 'Horses and Rides Over Time'
                },
                subtitle: {
                    text: 'Source: <a target="_blank" href="https://myequitrack.com/">' +
                        'EquiTrack - Your Competitive Advantage'
                },
                xAxis: {
                    allowDecimals: false,
                    labels: {
                        formatter: function () {
                            var mv = moment(startDate).add(this.value, 'days');
                            //return this.value; // clean, unformatted number for year
                            return mv.format('MMM D')
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Horse-Ride'
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                //tooltip: {
                //    pointFormat: '<b>{point.y:,.0f}</b> {series.name} registered'// {point.x}'
                //},
                tooltip: {
                    formatter: function () {
                        var mv = moment(startDate).add(this.x, 'days');
                        //return this.value; // clean, unformatted number for year
                        var dateString =  mv.format('MMM D')
                        var s = '<b> ' + dateString + '</b>';

                        $.each(this.points, function () {
                            s += '<br/><b>' + this.y + ' </b> ' + this.series.name + ' registered';
                            //' + this.series.name + ': ' +
                            //this.y + 'm';
                        });

                        return s;
                    },
                    shared: true
                },
                plotOptions: {
                    area: {
                        pointStart: 0,
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 1,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: dataArray
            });
        }
        catch (err) {
            console.log("unable to make highchats")
        }
    }


    $scope.Init = function () {        
         LoadingState();
         if ($rootScope.isDataLoaded) {
            $scope.AllHorses = $rootScope.getOrgHorses();
            $scope.Users = $rootScope.getOrgUsers($scope.AllHorses);

            angular.element(document).ready(function () {
                $scope.renderCalender();
                $scope.TotalGraphs();
                $scope.FilterGraphs($scope.startDateForFilter, $scope.endDateForFilter);
                $scope.MainGraph($scope.startDateForFilter, $scope.endDateForFilter);
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
