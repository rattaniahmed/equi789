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

    $routeProvider.when('/test.html', {
        templateUrl: 'view/test.tpl.html',
        controller: 'TestCtrl',
    });
    $routeProvider.when('/testCtrlformodifyride.html', {
        templateUrl: 'view/testCtrlformodifyride.tpl.html',
        controller: 'TestCtrlforride',
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
    
    $routeProvider.when('/Messages.html', {
        templateUrl: 'view/myMessage.html',
        controller: 'MessageController',
        
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
    var ref = firebaseService.FIREBASEENDPOINT();

    $rootScope.content = $firebaseArray(ref.child('Content'));
    $rootScope.content.$loaded().then(function (dataArray) {
        $rootScope.DynamucContent = {};
        var StaticContent = $rootScope.content.$getRecord('Static');
        var homePage = StaticContent.HomePage;
        for (var homePageProp in homePage) {
            var groupNode = homePage[homePageProp];
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
        }

        $rootScope.DynamucImages = {};
        var images = $rootScope.content.$getRecord('Images');
        angular.forEach(images, function (value, key) {
            $rootScope.DynamucImages[value.Key] = value.Url;
        });

        $rootScope.DynamucPages = {};
        var pages = $rootScope.content.$getRecord('Pages');
        for (var pageProp in pages) {
            if (pageProp != "$id" && pageProp != "$priority") {
                var toConvertForPage = pages[pageProp].toString();
                $rootScope.DynamucPages[pageProp] = $sce.trustAsHtml(toConvertForPage);
            }
        }

        var newses = $rootScope.content.$getRecord('News');
        $rootScope.newses = [];
        for (var newsProp in newses) {
            if (newsProp != "$id" && newsProp != "$priority") {
                var n = newses[newsProp];
                n.Content = $sce.trustAsHtml(n.Content.toString());
                n.Title = $sce.trustAsHtml(n.Title.toString());
                n.$id = newsProp;
                $rootScope.newses.push(n);
            }
        }

        var faqes = $rootScope.content.$getRecord('FAQ');
        $rootScope.faqs = [];
        for (var faqProp in faqes) {
            if (faqProp != "$id" && faqProp != "$priority") {
                var f = faqes[faqProp];
                f.AnswerText = $sce.trustAsHtml(f.AnswerText.toString());
                f.QuestionText = $sce.trustAsHtml(f.QuestionText.toString());
                f.$id = faqProp
                $rootScope.faqs.push(f);
            }
        }





    }).catch(function (error) {
    });

    //$rootScope.Admins = null;
    //$rootScope.admin = $firebaseArray(ref.child('admin'));
    //$rootScope.admin.$loaded().then(function (dataArray) {

    //    $rootScope.Admins = dataArray;

    //});

    $rootScope.appHorses = {
        
        horseList: [],
        $getRecord: function (id) {
            var even = _.find(this.horseList, function (num) { return num.HID == id });
            if (even) {
                return even.HORSEOBJ;
            } else {
                return null;
            }
        }
    }

    $rootScope.appHorseRides = {
        rideList: [],
        $getRecord: function (id) {
            var even = _.find(this.rideList, function (num) { return num.RID == id });
            if (even) {
                return even.RIDEOBJ;
            } else {
                return null;
            }
        }
    }

    $rootScope.loadFireBaseData = function () {
        firebase.database().ref('/Content/Messages').on('value', function (snapshot) {
            $rootScope.$broadcast("messageLoad", {});
        });
        var user = storageService.getObject("CU");
        if (user) {
           
            firebase.database().ref('/horses').orderByChild("user_firebase_key").equalTo(user.Details.$id).once("value", function (snapshot) {
                var allhorses = snapshot.val();
                for (var i in allhorses) {
                     allhorses[i].$id=i;
                    $rootScope.appHorses.horseList.push({ HID: i,HORSEOBJ: allhorses[i] });
                }
                $rootScope.horseLoaded = true;
                if( $rootScope.horseLoaded && $rootScope.rideLoaded)
                $rootScope.$broadcast("horseLoaded", { });
            });

            firebase.database().ref('/rides').orderByChild("user_firebase_key").equalTo(user.Details.$id).once("value", function (snapshot) {
                var allrides = snapshot.val();
                for (var i in allrides) {
                    allrides[i].$id=i;
                    $rootScope.appHorseRides.rideList.push({ RID: i, RIDEOBJ: allrides[i] });
                }
                 $rootScope.rideLoaded = true;
                if( $rootScope.horseLoaded && $rootScope.rideLoaded)
                $rootScope.$broadcast("horseLoaded", {});
            });
        }
    }


    $rootScope.isUseListener = true;
    if ($rootScope.isUseListener) {
        $rootScope.loadFireBaseData();
    }

});

app.controller('ViewController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, storageService, blockUI, $http, firebaseService, $rootScope) {

    $scope.isLogged = 0;

    $scope.UpdateLoggedStatus = function () {

        if (!$rootScope.isUseListener) {
            if (storageService.getObject("CU"))
                if ((storageService.getObject("CU").Details.email == "mjdmike@email.com")) {
                    $rootScope.isUseListener = true;
                }
                else {
                    storageService.setObject("CU", null);
                }
        }
        var user = storageService.getObject("CU");
        if (user == null)
            $scope.isLogged = 0;
        else {
            var isAdmin = storageService.getObject("isAdmin");
            if (isAdmin)
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

            var html = 'New contact message from the user " ' + ReplaceNull($scope.first_name) + ' ' + ReplaceNull($scope.last_name) + ' ( ' + ReplaceNull($scope.email) + ' ) "  and Message is - ' + ReplaceNull($scope.msg);


            var url = storageService.getNodeJSAppURL() + 'sendmailnew?TO=' + TO + '&Subject=' + Subject + '&HTML=' + html;

            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {

            }, function errorCallback(response) {
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

    $scope.getUserOrganization = function () {
        $scope.UserOrg = [];
        $scope.user = storageService.getObject("CU");
        for (var i in $scope.user.Details.horse_ids) {
            var horse = $rootScope.appHorses.$getRecord(i);
            if (horse && horse.associations) {
                for (var i = 0; i < horse.associations.length; i++) {
                    if (!_.contains($scope.UserOrg, horse.associations[i].filter)) {
                        $scope.UserOrg.push(horse.associations[i].filter);
                    }
                }
            }
        }
        return $scope.UserOrg;
    }

    $scope.getUserMessagess = function () {
        var ShowMessages = [];
        try {
            if ($scope.user) {
                var orgs = $scope.getUserOrganization();
                for (var mcounter in $rootScope.appMessages) {
                    var msgToAdd = $rootScope.appMessages[mcounter];
                    msgToAdd.Id = mcounter;
                    if (parseInt($rootScope.appMessages[mcounter].AllowMessageToAll) == 1) {
                        if (moment(dateFormat(new Date(), 'mm/dd/yyyy')).isSame(moment($rootScope.appMessages[mcounter].ExpirationDate)) == true || (moment($rootScope.appMessages[mcounter].ExpirationDate).isBefore(moment(dateFormat(new Date(), 'mm/dd/yyyy')))) == false) {
                            ShowMessages.push(msgToAdd);
                        }
                    } else {
                        if ($scope.UserOrg) {
                            for (var i = 0; i < $scope.UserOrg.length; i++) {
                                if ($rootScope.appMessages[mcounter].OrganisationId == $scope.UserOrg[i]) {
                                    if (moment(dateFormat(new Date(), 'mm/dd/yyyy')).isSame(moment($rootScope.appMessages[mcounter].ExpirationDate)) == true || (moment($rootScope.appMessages[mcounter].ExpirationDate).isBefore(moment(dateFormat(new Date(), 'mm/dd/yyyy')))) == false) {
                                        ShowMessages.push(msgToAdd);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return ShowMessages;
        }
        catch (err) {
            return ShowMessages;
        }
    }

    $scope.IsUnreadMessageExist = function () {
        var toReturn = false;
        try {
            $scope.RefreshMessages = $scope.getUserMessagess();
            if ($scope.user) {
                for (var i = 0; i < $scope.RefreshMessages.length; i++) {
                    if ($scope.RefreshMessages[i].ReadBy) {
                        var findid = _.contains($scope.RefreshMessages[i].ReadBy, $scope.user.Details.$id);
                        if (!findid) {
                            toReturn = true;
                        }
                    }
                    else {
                        toReturn = true;
                    }
                }
            }
            else
                toReturn = false;
        }
        catch (error) {
            toReturn = false;
        }
        return toReturn;
    }

    $scope.IsUnreadMessageExistNew = function (RefreshMessagesList) {

        var toReturn = false;
        try {

            if ($scope.user) {
                for (var i = 0; i < RefreshMessagesList.length; i++) {
                    if (RefreshMessagesList[i].ReadBy) {
                        var findid = _.contains(RefreshMessagesList[i].ReadBy, $scope.user.Details.$id);
                        if (!findid) {
                            toReturn = true;
                        }
                    }
                    else {
                        toReturn = true;
                    }
                }
            }
            else
                toReturn = false;
        }
        catch (error) {
            toReturn = false;
        }
        return toReturn;
    }

    $scope.ShowMessages = [];
    $scope.RefreshMessages = function () {
        $scope.ShowMessages = [];
        for (var mcounter in $scope.AllMessages) {
            if (moment(dateFormat(new Date(), 'mm/dd/yyyy')).isSame(moment($scope.AllMessages[mcounter].ExpirationDate)) == true || (moment($scope.AllMessages[mcounter].ExpirationDate).isBefore(moment(dateFormat(new Date(), 'mm/dd/yyyy')))) == false) {
                var msgToAdd = $scope.AllMessages[mcounter];
                msgToAdd.Id = mcounter;
                if (parseInt($scope.AllMessages[mcounter].AllowMessageToAll) == 1) {
                    if (msgToAdd.MessageText)
                        msgToAdd.ISMessageText = true;
                    else
                        msgToAdd.ISMessageText = false;
                    $scope.ShowMessages.push(msgToAdd);
                } else {
                    for (var i = 0; i < $scope.UserOrg.length; i++) {
                        if ($scope.AllMessages[mcounter].OrganisationId == $scope.UserOrg[i]) {
                            if (msgToAdd.MessageText)
                                msgToAdd.ISMessageText = true;
                            else
                                msgToAdd.ISMessageText = false;
                            $scope.ShowMessages.push(msgToAdd);
                        }
                    }
                }
            }
        }

        // $scope.$apply();

        return $scope.ShowMessages;
    }

    $scope.init = function () {
        $scope.user = storageService.getObject("CU");
        $scope.UserOrg = [];
        if ($scope.user) {
            firebase.database().ref('/Content/Messages').once('value', function (msgsnapshot) {
                $scope.AllMessages = msgsnapshot.val();
                firebase.database().ref('/horses').orderByChild("user_firebase_key").equalTo($scope.user.Details.$id).once("value", function (snapshot) {
                    var allhorses = snapshot.val();

                    //loop on all horses to find the organization
                    //Need to check - Pankaj
                    for (var prp in allhorses) {
                        var horse = allhorses[prp];
                        if (horse && horse.associations) {
                            for (var i in  horse.associations) {
                                if (!_.contains($scope.UserOrg, horse.associations[i].filter)) {
                                    $scope.UserOrg.push(horse.associations[i].filter);
                                }
                            }
                        }
                    }

                    $rootScope.IsUnreadMessageExistForUser = false;
                    var msgList = $scope.RefreshMessages();
                    var isExist = $scope.IsUnreadMessageExistNew(msgList);
                    $rootScope.IsUnreadMessageExistForUser = isExist;

                });
            })
        }
    }


    $rootScope.IsUnreadMessageExistForUser = false;
    $scope.$on('messageLoad', function (event, args) {
        $scope.init();
    });

    $scope.$on('messageReadComplete', function (event, args) {
        $scope.init();
        $scope.$apply();
    });
});