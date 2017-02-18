/// <reference path="../views/directives/leftNav.html" />
/// <reference path="../views/directives/leftNav.html" />
/// <reference path="../views/directives/leftNav.html" />
// create the module and name it app
var app = angular.module('app', ['ngRoute', 'firebase', '720kb.datepicker', 'ui.grid', 'ui.grid.pagination', 'angularjs-dropdown-multiselect', 'daterangepicker', 'ui.grid.exporter', 'ui.grid.moveColumns']);

// configure our routes
app.config(function ($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeController' //this has ro replace with dashboard controller
        })

        //// route for the about page
        //.when('/index', {
        //    templateUrl: 'index.html',
        //    controller: 'mainController'
        //})

        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })

        .when('/reset', {
            templateUrl: 'views/reset.html',
            controller: 'resetController'
        })

         //.when('/orghome', {
         //    templateUrl: 'views/org/home.html',
         //    controller: 'homeController'
         //})

        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UsersController'
        })

         .when('/ridedetails', {
             templateUrl: 'views/org/ridedetails.html',
             controller: 'RideDetailsController'
         })


      .when('/rides/:id', {
          templateUrl: 'views/RideDetail.html',
          controller: 'rideDetailController'
      })

        .when('/horses/:id', {
            templateUrl: 'views/HorseDetail.html',
            controller: 'HorseDetailController'
        })

      .when('/images', {
          templateUrl: 'views/images.html',
          controller: 'imagesController'
      })

     .when('/pages', {
         templateUrl: 'views/pages.html',
         controller: 'pagesController'
     })


     .when('/static', {
         templateUrl: 'views/static.html',
         controller: 'staticController'
     })


        .when('/sponsers', {
            templateUrl: 'views/sponsers.html',
            controller: 'sponsersController'
        })

    .when('/organisations', {
        templateUrl: 'views/organisations.html',
        controller: 'organisationsController'
    })


     .when('/Horses', {
         templateUrl: 'views/org/Horses.html',
         controller: 'HorsesController'
     })
        .when('/Members', {
            templateUrl: 'views/org/Members.html',
            controller: 'MembersController'
       })

        .when('/faq', {
            templateUrl: 'views/faq.html',
            controller: 'faqController'
        })

        .when('/faq/:id', {
            templateUrl: 'views/editfaq.html',
            controller: 'editFaqController'
        })

     .when('/news', {
         templateUrl: 'views/news.html',
         controller: 'newsController'
     })


         .when('/news/:id', {
             templateUrl: 'views/editnews.html',
             controller: 'editNewsController'
         })

         .when('/nh/:id', {
             templateUrl: 'views/nh.html',
             controller: 'nhController'
         })

         .when('/messages', {
             templateUrl: 'views/messages.html',
             controller: 'messagesController'
         })

 .when('/messages/:id', {
     templateUrl: 'views/editmessages.html',
     controller: 'editmessagesController'
 })

         .when('/report', {
             templateUrl: 'views/report.html',
             controller: 'reportController'
         })

 .when('/report/:id', {
     templateUrl: 'views/editreport.html',
     controller: 'editReportController'
 })

    .when('/alert', {
        templateUrl: 'views/alert.html',
        controller: 'alertController'
    })

     .when('/addSpe', {
         templateUrl: 'views/addSpe.html',
         controller: 'addSpeController'
     })
    

    ;
});

app.factory('firebaseService', function () {

    var endPoint = getFireBaseEndPoint();

    return {
        FIREBASEENDPOINT: function () {
            return new Firebase(endPoint);
        },
        USERS: function () {
            return new Firebase(endPoint + "/users");
        }
    }

});

app.factory('storageService', function () {


    return {
        setObject: function (key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        },
        getObject: function (key) {
            var obj = localStorage.getItem(key);
            if (obj == null || obj == '' || obj == "undefined")
                return null;
            else
                return JSON.parse(obj);
        },
        getNodeJSAppURL: function () {
            return getNodeJsEndPoint();
        }
    }

});

app.factory('sessionService', function (storageService, $location) {


    return {
        CHECKSESSION: function () {
            var user = storageService.getObject("CU");
            if (user == null)
                $location.path('login.html');
        }
    }

});

app.directive('leftnav', function () {

    var directive = {};

    directive.restrict = "E";

    directive.template = '';
    directive.templateUrl = 'views/directives/leftNav.html',
    directive.controller = 'leftNavController',
    //scope is used to distinguish each student element based on criteria.
    directive.scope = {
        obj: '='
    },

    directive.compile = function (element, attributes) {

    }
    return directive;

});


app.controller('homeController', function ($scope, firebaseService,$firebaseArray, storageService) {

    // $scope.user = StorageService.getObject('user');
    $scope.Totalhorsemap = [];
    var ref = firebaseService.FIREBASEENDPOINT();

    //$scope.horses.$loaded().then(function (dataArray) {
     
    //    $scope.Totalhorsemap = dataArray;
    //    $scope.Init();
    //}).catch(function (error) {
    //    console.log("Error in loading details");
    //});
    //    $scope.rides = $firebaseArray(ref.child('rides'));
    //$scope.rides.$loaded().then(function (dataArray) {
     
    //    $scope.TotalRidesmap = dataArray;
    //    }).catch(function (error) {
    //        console.log("Error in loading details");
    //    });
        //$scope.users = $firebaseArray(ref.child('users'));
        //$scope.users.$loaded().then(function (dataArray) {
        //    $scope.TotalMembermap = dataArray;
    //});
    $scope.AllHorses = [];
    $scope.AllDBUsers = [];
    


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
                    console.log(ids);

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
        $scope.Init=function(){
            angular.element(document).ready(function () {
            
                var horse = [];
                for(j=0;j<12;j++){
                    count = 0;
                    for (i = 0; i < $scope.horseCreate.length; i++) {
                        
                        for (var k = 0; k < (_.values($scope.horseCreate[i])).length; k++)
                            for (var l = 0; l < _.values((_.values($scope.horseCreate[0]))[0]).length; l++) {

                                if ((_.values((_.values($scope.horseCreate[0]))[0]))[0].created_at) {
                                    if (new Date(parseInt((_.values((_.values($scope.horseCreate[0]))[0]))[0].created_at)).getMonth() == j) {
                                        count++;
                                    }
                                }
                            }
                        horse[j] = count;
                    }
                   
                }
                //arr=[2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6];
                $(".sparkline_one").sparkline(horse, {
                    type: 'bar',
                    height: '40',
                    barWidth: 9,
                    colorMap: {
                        '7': '#a1a1a1'
                    },
                    barSpacing: 2,
                    barColor: '#eed093'
                });


                $(".sparkline_two").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6, 7, 5, 4, 3, 5, 6], {
                    type: 'line',
                    width: '200',
                    height: '40',
                    lineColor: '#26B99A',
                    fillColor: 'red',
                    lineWidth: 2,
                    spotColor: '#eed093',
                    minSpotColor: '#eed093'
                });


            });

            angular.element(document).ready(function () {

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

            });
        }

    $scope.renderCalender = function () {

        var cb = function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        };

        var optionSet1 = {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            minDate: '01/01/2012',
            maxDate: '12/31/2015',
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
   
});

app.controller('mainController', function ($scope, storageService) {

    
    $scope.Check = function () {

        $scope.user = null;
        var obj = localStorage.getItem("adminObject");
        if (obj == null || obj == '' || obj == "undefined")
            $scope.user = null;
        else
            $scope.user = JSON.parse(obj);
        if ($scope.user.Role == "Organisation")
        {
            $scope.title = "Organisation Panel";
        }
        else {
            $scope.title = "Admin Panel";
            $scope.user.Url = "/images/logo.png";
        }

        if ($scope.user == null) {
            window.location.href = "login.html";
        }

    }

    $scope.Check();

    $scope.Logout = function () {
        localStorage.setItem("adminObject", null);
        window.location.href = "login.html";
    }
    

});




var loginapp = angular.module('loginapp', ['ngRoute', 'firebase']);


loginapp.controller('loginController', function ($scope, $firebaseArray) {

    console.log("loginController");

    $scope.test = function () {
        var formData = new FormData();
        var file = document.getElementById('myFile').files[0];
        formData.append('myFile', file);
        formData.append("PRCID", "UPDPROIMG"); //this is type either Audio or Video
        formData.append("MPType", "0"); //this is type either Audio or Video
        formData.append("UserId", "2"); //this is userid 
        formData.append("UDF1", ""); //this is group id
        formData.append("UDF2", "");
        formData.append("UDF3", "");
        formData.append("UDF4", "");
        formData.append("UDF5", "");
        formData.append("UDF6", "");


        var u = global.settings.getMultiServiceUrl();

        $.ajax({
            url: u,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                alert(data);
            },
            error: function (data) {
                console.log(data);
                alert(data);
            }


        });



        //var xhr = new XMLHttpRequest();



        //xhr.open('post', '/', true);

        //xhr.upload.onprogress = function (e) {
        //    if (e.lengthComputable) {
        //        var percentage = (e.loaded / e.total) * 100;
        //        $('div.progress div.bar').css('width', percentage + '%');
        //    }
        //};

        //xhr.onerror = function (e) {
        //    //showInfo('An error occurred while submitting the form. Maybe your file is too big');
        //};

        //xhr.onload = function () {
        //    showInfo(this.statusText);
        //};

        //xhr.send(formData);
    }

    $scope.success = function (data) {
        UpdateObjectImageUrl(data[0], "ProfileURL", global.settings.getImageBaseUrl());
        StorageService.setObject('user', data[0]);
        $('#loadingModal').modal('hide');
        window.location = "index.html#/home";
    }

    $scope.failure = function () {
        bootbox.alert("Invalid username and password.Please contact support");
    }

   

    var ref = new Firebase(getFireBaseEndPoint());

    $scope.users = $firebaseArray(ref.child('admin'));

    $scope.login = function () {
        $("#loadingModal").show();
        $scope.users.$loaded().then(function (dataArray) {
            var found = false;
            $("#loadingModal").hide();
            angular.forEach(dataArray, function (value, key) {
                var user = $scope.users.$getRecord(value.$id);
                console.log(user);
                try {
                    if (user.UserId == $("#usrval").val() && user.Password == $("#pwdval").val()) {
                        found = true;
                        localStorage.setItem("adminObject", JSON.stringify(user));
                    }
                } catch (error)
                {
                   // alert("Please Enter Correct Name and Password");
                }
            });
            
            if (found)
                window.location.href = "start.html";
            else
                alert("You are not authorised to visit the application !!!");

        });

        



        //ref.authWithPassword({
        //    email: $("#usrval").val(),
        //    password: $("#pwdval").val()
        //}, function (error, authData) {
        //    $("#loadingModal").hide();
        //    if (error) {
        //        alert("Invlid User name and passord !!!");
        //    } else {
        //        var user = $scope.users.$getRecord(authData.uid);
        //        var isAdmin = 0;
        //        try {
        //            isAdmin = user.isAdministrator;
        //        } catch (err) {
        //            isAdmin = 0;
        //        }
        //        if (isAdmin == 1) {
        //            localStorage.setItem("adminObject", JSON.stringify(user));
        //            window.location.href = "start.html";
        //        }
        //        else
        //            alert("You are not authorised to visit the application !!!");
        //    }
        //});
    }
});
