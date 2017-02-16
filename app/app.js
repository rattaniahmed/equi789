angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));

var app = angular.module('equitrack', ['ngRoute', 'ngSanitize', 'firebase', 'blockUI', '720kb.socialshare', '720kb.datepicker', 'ngCsv', 'mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);

app.config(function ($routeProvider, $locationProvider, blockUIConfig) {
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
        templateUrl: 'home.tpl.html',
        controller: 'ViewController',
    });
    $routeProvider.when('/signup.html', {
        templateUrl: 'view/signup.tpl.html',
        controller: 'AccountController',
    });
    $routeProvider.when('/login.html', {
        templateUrl: 'view/login.tpl.html',
        controller: 'AccountController',
    });
    $routeProvider.when('/forgot-password.html', {
        templateUrl: 'view/forgot-password.tpl.html',
        controller: 'AccountController',
    });
    $routeProvider.when('/share.html', {
        templateUrl: 'view/share.tpl.html',
        controller: 'ShareController',
    });
    $routeProvider.when('/settings.html', {
        templateUrl: 'view/settings.tpl.html',
        controller: 'SettingsController',
    });
    $routeProvider.when('/about-us.html', {
        templateUrl: 'view/about-us.tpl.html',
        controller: 'ViewController',
    });
    $routeProvider.when('/disciplines.html', {
        templateUrl: 'view/disciplines.tpl.html',
        controller: 'ViewController',
    });
    $routeProvider.when('/terms.html', {
        templateUrl: 'view/term.tpl.html',
        controller: 'ViewController',
    });
    $routeProvider.when('/sponsors.html', {
        templateUrl: 'view/sponsors.tpl.html',
        controller: 'SponsersController',
    });
    $routeProvider.when('/dashboard.html', {
        templateUrl: 'view/dashboard.tpl.html',
        controller: 'DashboardController',
    });
    $routeProvider.when('/my-stable.html', {
        templateUrl: 'view/my-stable.tpl.html',
        controller: 'StableController',
    });
    $routeProvider.when('/my-stable-details.html', {
        templateUrl: 'view/my-stable-details.tpl.html',
        controller: 'StableDetailsController',
    });
    $routeProvider.when('/last-ride.html', {
        templateUrl: 'view/last-ride.tpl.html',
        controller: 'LastRideController',
    });

    $routeProvider.when('/faq.html', {
        templateUrl: 'view/faq.tpl.html',
        controller: 'FAQController',
    });

    $routeProvider.when('/news.html', {
        templateUrl: 'view/news.tpl.html',
        controller: 'NewsController',
    });


    $routeProvider.when('/download.html', {
        templateUrl: 'view/download.tpl.html',
        controller: 'DownloadController',
    });

    $routeProvider.when('/Calendar.html', {
        templateUrl: 'view/Calendar.tpl.html',
        controller: 'CalendarController',
    });
    $routeProvider.when('/ride-detail.html', {
        templateUrl: 'view/ride-detail.tpl.html',
        controller: 'RideDetailController',
    });

    $routeProvider.when('/ridemap.html', {
        templateUrl: 'view/ridemap.tpl.html',
        controller: 'RideMapController',
    });

    $routeProvider.when('/ride-history.html', {
        templateUrl: 'view/ride-history.tpl.html',
        controller: 'HistoryController',
    });

    $routeProvider.when('/ride-history-all.html', {
        templateUrl: 'view/ride-history-all.tpl.html',
        controller: 'AllHistoryController',
    });

    $routeProvider.when('/contact.html', {
        templateUrl: 'view/contact.tpl.html',
        controller: 'ViewController',
    });

    //$routeProvider.when('/mapModal.html', {
    //    templateUrl: 'view/mapModal.tpl.html',
    //    controller: 'MapModalController',
    //});
    

    //$routeProvider.when('/terms.html', {
    //    templateUrl: 'view/about-us.tpl.html',
    //    controller: 'ViewController',
    //});

    $routeProvider.when('/static.html', {
        templateUrl: 'view/static.tpl.html',
        controller: 'StaticContentController',
    });
    

    $routeProvider.otherwise({
        // redirectTo: '/'
    });

    blockUIConfig.autoBlock = false;
}
);

app.factory('firebaseService', function () {

    var endPoint = getFireBaseEndPoint();

    return {
        FIREBASEENDPOINT: function () {
            return new Firebase(endPoint); //firebase.database().ref(); //new Firebase(endPoint);
        },       
        USERS: function () {
            return new Firebase(endPoint + "/users");
        }
    }

});

app.factory('storageService', function () {


    return {
        setObject: function (key,data) {
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

app.run(function ($rootScope, $sce, firebaseService, $firebaseArray, storageService) { // instance-injector

    //firebase.database().ref('/users/41880a58-e099-422a-bc69-becbe974d3f0/').on('value', function (snapshot) {
    //    console.log(snapshot);
    //    console.log(snapshot.val())
    //})

    var ref = firebaseService.FIREBASEENDPOINT();
    $rootScope.homepage = $firebaseArray(ref.child('Content').child('Static').child('HomePage'));
    $rootScope.homepage.$loaded().then(function (dataArray) {
        $rootScope.DynamucContent = {};
        angular.forEach(dataArray, function (value, key) {
            //$scope.DynamucContent[value.Key] = value.Url;
            var groupNode = $rootScope.homepage.$getRecord(value.$id);

            for (var prop in groupNode) {
                if (prop != "$id" && prop != "$priority") {
                    var toConvert = groupNode[prop].toString();
                    if (prop == "ConatctUsEmail") {
                        //alert("here");
                        toConvert = "E-mail: -" + toConvert;
                    }
                    $rootScope.DynamucContent[prop] = $sce.trustAsHtml(toConvert);
                }
            }

        });
    }).catch(function (error) {
        console.log("Error in loading details");
    });



    $rootScope.images = $firebaseArray(ref.child('Content').child('Images'));
    $rootScope.images.$loaded().then(function (dataArray) {
        $rootScope.DynamucImages = {};
        angular.forEach(dataArray, function (value, key) {
            $rootScope.DynamucImages[value.Key] = value.Url;
        });
    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $rootScope.pages = $firebaseArray(ref.child('Content').child('Pages'));
    $rootScope.pages.$loaded().then(function (dataArray) {
        $rootScope.DynamucPages = {};
        angular.forEach(dataArray, function (value, key) {
            var toConvert = value.$value.toString();
            $rootScope.DynamucPages[value.$id] = $sce.trustAsHtml(toConvert);
        });
    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $rootScope.news  = $firebaseArray(ref.child('Content').child('News'));
    $rootScope.news.$loaded().then(function (dataArray) {
        $rootScope.newses = [];
        for (var i = 0; i < dataArray.length; i++) {
            var n = dataArray[i];
            n.Content = $sce.trustAsHtml(n.Content.toString());
            n.Title = $sce.trustAsHtml(n.Title.toString());
            $rootScope.newses.push(n);
        }
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $rootScope.faq = $firebaseArray(ref.child('Content').child('FAQ'));
    $rootScope.faq.$loaded().then(function (dataArray) {
        $rootScope.faqs=[];
        for (var i = 0; i < dataArray.length; i++) {
            var f = dataArray[i];
            f.AnswerText= $sce.trustAsHtml(f.AnswerText.toString());
            f.QuestionText = $sce.trustAsHtml(f.QuestionText.toString());
            $rootScope.faqs.push(f);
        }
    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $rootScope.appHorses = $firebaseArray(ref.child('horses'));
    $rootScope.appHorses.$loaded().then(function (dataArray) {
        $rootScope.$broadcast("horseLoaded", { data: event });
        $rootScope.appHorses.$watch(function (event) {
            console.log(event);
            $rootScope.$broadcast("horseModified", { data: event });
        });
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $rootScope.appHorseRides = $firebaseArray(ref.child('rides'));
    $rootScope.appHorseRides.$loaded().then(function (dataArray) {
        $rootScope.$broadcast("ridesLoaded", { data: event });
        $rootScope.appHorseRides.$watch(function (event) {
            console.log(event);
            $rootScope.$broadcast("ridesModified", { data: event });
        });
    }).catch(function (error) {
        console.log("Error in loading details");
    });;

    $rootScope.appUsers = $firebaseArray(ref.child('users'));
    $rootScope.appUsers.$loaded().then(function (dataArray) {
        $rootScope.appUsers.$watch(function (event) {
            debugger;
            console.log(event);
            var userToLocal = storageService.getObject("CU");
            if (event.key == userToLocal.Auth.uid)
            {
                var userNew = $rootScope.appUsers.$getRecord(userToLocal.Auth.uid);
                userNew.profile = CleanProfileUrl(userNew.profile);
                var obj = {
                    Auth: userToLocal.Auth,
                    Details: userNew
                };
                storageService.setObject("CU", obj);
                $rootScope.$broadcast("userModified", { data: event });
            }
        });
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    

});

app.controller('ViewController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, storageService, blockUI, $http, firebaseService) {

    $scope.isLogged = 0;

    $scope.UpdateLoggedStatus = function () {
        console.log("calling function");
        var user = storageService.getObject("CU");
        if(user == null)
            $scope.isLogged = 0;
        else
        {
         var isAdmin =  storageService.getObject("isAdmin");
         if(isAdmin)
            $scope.isLogged = 2;
            else
            $scope.isLogged = 1;
        }
    }

    $scope.UpdateLoggedStatus();

    $scope.StartTrack = function () {

        var user = storageService.getObject("CU");
        if (user == null)
            $location.path('login.html');
        else
            $location.path('dashboard.html');
    }

    $scope.isActive = function (href) {
        if (typeof href === 'object') {
            return !($.inArray($location.path(), href) < 0);
        } else {
            return href == $location.path();
        }
    }


    $scope.go = function (index) {
        $location.path('/view' + index);
    };

    $scope.ContactUs = function () {

        
        if (!ValidateControl(['first_name', 'email', 'msg']))
            return;
        else {

            //blockUI.start("Sending message");

            var TO = $scope.email;
            ///TO ="vishal.kumar1145@gmail.com";
            //TO = "rattaniahmed@gmail.com";
            //TO = "support@myequitrack.com";
            //TO = "info@myequitrack.com";
            TO = "equitrackapp@gmail.com";

            var Subject = "New message on Conatct us screen on Equitrack.com";

            var html = 'New contact message from the user " ' + ReplaceNull($scope.first_name) + ' '+ ReplaceNull($scope.last_name) + ' ( ' + ReplaceNull($scope.email) + ' ) "  and Message is - ' + ReplaceNull($scope.msg);

           
            var url = storageService.getNodeJSAppURL() + 'sendmailnew?TO=' + TO + '&Subject=' + Subject + '&HTML=' + html;

            debugger;
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });
            
            $scope.first_name = "";
            $scope.last_name = "";
            $scope.email = "";
            $scope.mobile = "";
            $scope.msg = "";

            swal({
                title: "",
                text: "Thanks for contacting us, We will get back to you as soon as possible.",
                timer: 2000,   
                showConfirmButton: false,
                imageUrl: "bower_components/sweetalert/example/images/thumbs-up.jpg"
            });


        }

    }
    


    



});