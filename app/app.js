angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));

var app = angular.module('equitrack', ['ngRoute', 'firebase', 'blockUI','720kb.socialshare']);

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
    $routeProvider.when('/settings.html', {
        templateUrl: 'view/settings.tpl.html',
        controller: 'SettingsController',
    });
    $routeProvider.when('/about-us.html', {
        templateUrl: 'view/about-us.tpl.html',
        controller: 'ViewController',
    });
    $routeProvider.when('/disciplines.html', {
        templateUrl: 'disciplines.tpl.html',
        controller: 'ViewController',
    });
    $routeProvider.when('/sponsors.html', {
        templateUrl: 'view/sponsors.tpl.html',
        controller: 'ViewController',
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
    $routeProvider.when('/terms.html', {
        templateUrl: 'view/about-us.tpl.html',
        controller: 'ViewController',
    });

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

    var endPoint = "https://myequitrack.firebaseio.com";

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
        setObject: function (key,data) {
            localStorage.setItem(key, JSON.stringify(data));
        },
        getObject: function (key) {
            var obj = localStorage.getItem(key);
            if (obj == null || obj == '' || obj == "undefined")
                return null;
            else
                return JSON.parse(obj);
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

app.controller('ViewController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, storageService, blockUI) {

    


    $scope.isLogged = 0;

    $scope.UpdateLoggedStatus = function () {
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

            blockUI.start("Sending message");

            var TO = $scope.email;
            //To ="vishal.kumar1145@gmail.com";
            TO = "rattaniahmed@gmail.com";

            var Subject = "New message on Conatct us screen on Equitrack.com";

            var html = "There is new contact us request on the portal and below are the details."

            html += "<br/><br/><br/>";

            html += "<table>"
            html += "<tr>      <td>First Name :- </td>  <td> " + ReplaceNull($scope.first_name) + "</td>        </tr>"
            html += "<tr>      <td>Last Name :- </td>  <td> " + ReplaceNull($scope.last_name) + "</td>        </tr>"
            html += "<tr>      <td>Email :- </td>  <td> " + ReplaceNull($scope.email) + "</td>        </tr>"
            html += "<tr>      <td>Mobile :- </td>  <td> " + ReplaceNull($scope.mobile) + "</td>        </tr>"
            html += "<tr>      <td>Message :- </td>  <td> " + ReplaceNull($scope.msg) + "</td>        </tr>"
            html += "</table>"

            html += "<br/><br/><br/>";

            html += "Equitrack Team</br>"
            

            var inputData = PrepareRequestForMail("TEST", TO, "", "", Subject, html, "");
                

            $.ajax({
                type: 'POST',
                //url: "http://localhost:51912/api/mail",
                url: "https://52.41.72.28/mailws/api/mail",
                dataType: 'json',
                data: JSON.stringify(inputData),
                async: true,
                success: function (response) {
                    debugger;
                    $scope.$apply(function () {
                        blockUI.stop();
                        $scope.first_name = "";
                        $scope.last_name = "";
                        $scope.email = "";
                        $scope.mobile = "";
                        $scope.msg = "";
                    });
                },
                error: function (reposnse) {
                    console.log("Unknown error occured");
                }
            });
        }

    }
});