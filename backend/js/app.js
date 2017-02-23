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

app.run(function ($rootScope,firebaseService, $firebaseArray) {

    $rootScope.isDataLoaded = false;
    $rootScope.isUserLoaded = false;
    $rootScope.isHorseLoaded = false;
    $rootScope.isRidesLoaded = false;

    var ref = firebaseService.FIREBASEENDPOINT();

    $rootScope.getHorseIds = function (user) {
        return Object.keys(user.horse_ids);
    }

    $rootScope.getRideIds = function (horseIds) {
        var ids = [];

        angular.forEach(horseIds, function (horseId, key) {
            var horse = $rootScope.backendHorses.$getRecord(horseId);
            for (var id in horse.ride_ids) {
                ids.push(id);
            }
        });

        return ids;
    }

    $rootScope.getOrgHorses = function () {

        var Organisation = JSON.parse(localStorage.getItem('adminObject'));

        var AllHorses = [];
        angular.forEach($rootScope.backendHorses, function (horse, key) {
            try {
                if (horse.horse_name) {
                    var evens = _.filter(horse.associations, function (num) { return num.filter == Organisation.OrganisationNumber; });
                    if (evens.length > 0) {
                        AllHorses.push(horse);
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        });
        return AllHorses;
    }
    
    $rootScope.getOrgUsers = function (AllHorses) {

        var AllUsers = [];
      
        var Organisation = JSON.parse(localStorage.getItem('adminObject'));

        angular.forEach($rootScope.backendUsers, function (user, key) {
            if (user.horse_ids) {
                var ids = Object.keys(user.horse_ids);

                for (var i in AllHorses) {
                    var evens = _.filter(ids, function (num) { return num == AllHorses[i].$id; });
                    if (evens.length > 0) {
                        if (!(_.contains(AllUsers, user))) {
                            AllUsers.push(user);
                        }
                    }
                }
            }
        });
        return AllUsers;
    }

    $rootScope.backendHorses = $firebaseArray(ref.child('horses'));
    $rootScope.backendHorses.$loaded().then(function (dataArray) {
        $rootScope.isUserLoaded = true;
        if($rootScope.isUserLoaded  &&  $rootScope.isHorseLoaded &&  $rootScope.isRidesLoaded)
        {
            $rootScope.isDataLoaded = true;
            $rootScope.$broadcast("DataLoaded", {});
        }
    }).catch(function (error) {
        console.log("Error in loading users");
    });

    $rootScope.backendHorseRides = $firebaseArray(ref.child('rides'));
    $rootScope.backendHorseRides.$loaded().then(function (dataArray) {
        $rootScope.isHorseLoaded = true;
        if ($rootScope.isUserLoaded && $rootScope.isHorseLoaded && $rootScope.isRidesLoaded) {
            $rootScope.isDataLoaded = true;
            $rootScope.$broadcast("DataLoaded", {});
        }
    }).catch(function (error) {
        console.log("Error in loading horses");
    });;

    $rootScope.backendUsers = $firebaseArray(ref.child('users'));
    $rootScope.backendUsers.$loaded().then(function (dataArray) {
        $rootScope.isRidesLoaded = true;
        if ($rootScope.isUserLoaded && $rootScope.isHorseLoaded && $rootScope.isRidesLoaded) {
            $rootScope.isDataLoaded = true;
            $rootScope.$broadcast("DataLoaded", {});
        }
    }).catch(function (error) {
        console.log("Error in loading rides");
    });

})

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
