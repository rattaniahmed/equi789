app.controller('HistoryController', function MyCtrl($scope, $rootScope,$location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {

    // console.log("HistoryController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");
   

    // console.log($scope.stb);
    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    $scope.ShowAllHistory = function (hist) {
        $location.path('ride-history-all.html');
        storageService.setObject("CHIST", hist);
    }

    $scope.histories = [];

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
   


    $scope.Init = function () {
        $scope.stb = storageService.getObject("CS");

        //$scope.stb = $rootScope.appHorses.$getRecord($scope.stb.$id);
        //storageService.setObject("CS", $scope.stb);

        $scope.loadingcord = false;
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $scope.histories = [];

        for (var id in $scope.stb.ride_ids) {
            var horseHistory = $rootScope.appHorseRides.$getRecord(id);
            //var time = horseHistory.start_time; //$scope.stb.ride_ids[id];

            if (horseHistory != null) {
                var date = new Date(horseHistory.start_time.replace('p.m.', 'PM'));// //new Date(parseInt(time));
                var monthInt = parseInt(date.getMonth());
                var month = monthNames[monthInt];
                var year = date.getFullYear();

                var monthyear = month + " " + year;

                var existIndex = -1;
                for (var k = 0; k < $scope.histories.length; k++) {
                    var hi = $scope.histories[k];
                    if (hi.MonthYear == monthyear) {
                        existIndex = k;
                        break;
                    }
                }

                if (existIndex == -1) {
                    $scope.histories.push({
                        Month: month,
                        Year: year,
                        MonthYear: monthyear,
                        MonthInt: monthInt,
                        DataArray: [horseHistory]
                    });
                }
                else {
                    $scope.histories[k].DataArray.push(horseHistory)
                }
            }

        }


        $scope.historiesToDisplay = [];
        for (var l = 0 ; l < $scope.histories.length; l++) {
            var history = $scope.histories[l];

            var totalDistance = 0.0;
            var totalDuration = 0;
            var totalEnergy = 0;
            var totalCalories = 0;
            var totalAverageSpeed = 0.0;
            var totalTopSspeed = [];
            var averageSpeed = 0.0;


            for (var inner = 0; inner < history.DataArray.length; inner++) {



                var ride = history.DataArray[inner];
                totalDistance = parseFloat(totalDistance) + parseFloat(ride.total_distance);
                totalDuration = parseInt(totalDuration) + parseInt(ride.total_time);
                totalEnergy = parseFloat(totalEnergy) + parseFloat(ride.energy);
                totalCalories = parseFloat(totalCalories) + parseFloat(ride.calories);
                //$scope.totalAverageSpeed = $scope.totalAverageSpeed + ride.average_speed;
                //$scope.totalTopSspeed = $scope.totalTopSspeed + ride.top_speed;
                averageSpeed = parseFloat(averageSpeed) + parseFloat(ride.average_speed);
                totalTopSspeed.push(parseFloat(ride.top_speed));
            }


            history.totalDistance = parseFloat(Math.round(totalDistance * 100) / 100).toFixed(2);
            history.totalEnergy = parseFloat(Math.round(totalEnergy * 100) / 100).toFixed(2);
            history.totalCalories = parseFloat(Math.round(totalCalories * 100) / 100).toFixed(2);

            history.totalAverageSpeed = averageSpeed / history.DataArray.length;

            history.totalAverageSpeed = parseFloat(Math.round(history.totalAverageSpeed * 100) / 100).toFixed(2);

            history.totalDuration = hhmmss(totalDuration);

            history.totalTopSspeedToDisplay = Math.max.apply(Math, totalTopSspeed);

            history.totalTopSspeedToDisplay = parseFloat(Math.round(history.totalTopSspeedToDisplay * 100) / 100).toFixed(2);



            $scope.historiesToDisplay.push(history);
        }

        // console.log($scope.historiesToDisplay)

    }

    $scope.Init();

    $scope.$on('horseLoaded', function (event, args) {
        $scope.Init();
    });
    $scope.$on('horseModified', function (event, args) {
        // console.log("get the horse add event in stable page"); // 'Data to send'

        var localHorse = storageService.getObject("CS");
        if (localHorse.$id == args.data.key && args.data.event == "child_changed") {
            var horseNew = $rootScope.appHorses.$getRecord(localHorse.$id);
            storageService.setObject("CS", horseNew);
            $scope.Init();
        }
    });

    $scope.$on('ridesLoaded', function (event, args) {
        $scope.Init();
    });
});
