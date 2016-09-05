/// <reference path="../views/directives/leftNav.html" />
/// <reference path="../views/directives/leftNav.html" />
/// <reference path="../views/directives/leftNav.html" />
// create the module and name it app
var app = angular.module('app', ['ngRoute','firebase']);

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


        .when('/faq', {
         templateUrl: 'views/faq.html',
         controller: 'faqController'
     })

     .when('/nh', {
         templateUrl: 'views/nh.html',
         controller: 'nhController'
     })

         .when('/nh/:id', {
             templateUrl: 'views/nh.html',
             controller: 'nhController'
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
        setObject: function (key, data) {
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


app.controller('loginController', function ($scope, StorageService, ActionService) {

    //$scope.dummyAdmin = { username: 'admin@demo.com', password: 'admin', isAdmin: 1, displayName: 'Administrator', designation: 'Administrator', Face: 'images/img.jpg' };
    //$scope.dummySpe = { username: 'spe@demo.com', password: 'admin', isAdmin: 1, displayName: 'Test Specialist', designation: 'Specilist', Face: 'images/img.jpg' };
    //$scope.dummyPat = { username: 'pat@demo.com', password: 'admin', isAdmin: 1, displayName: 'Test patient', designation: 'Patient', Face: 'images/img.jpg' };

    //$scope.user = { username: '', password: '' };

    //$scope.compareAndStore = function (dummy) {
        
    //    if ($scope.user.username == dummy.username && $scope.user.password == dummy.password) {
    //        StorageService.setObject('user', dummy);
    //        return true;
    //    }
    //    else
    //        return false;

    //}

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
            //url: 'http://demo.ithours.com/passit/api/MultiPart',
            //url:"http://localhost:51912/api/MultiPart",
            url:u,
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

    //$scope.validateUser = function () {

    //    debugger;

    //    var obj = {
    //        Expression: { "EmailId": $scope.user.username, "Password": $scope.user.password }
    //    };

    //    console.log(obj);
    //    //DataSetCallByDataObject('UserRole',obj, $scope.success, $scope.failure, null, null);
    //    CallByDataObject('Account|ValidateUser', obj, $scope.success, $scope.failure, null, null);
    //}


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.users = $firebaseArray(ref.child('users'));

    $scope.login = function () {

        //if (!ValidateControl(['email', 'password']))
        //    return;
        //else {
            blockUI.start("Validation in progress");
            var ref = firebaseService.FIREBASEENDPOINT();
            ref.authWithPassword({
                email: $scope.email,
                password: $scope.password
            }, function (error, authData) {
                $scope.$apply(function () {
                    blockUI.stop();
                });
                if (error) {
                    swal({ title: "", text: "Invalid user name and password. Please try again", imageUrl: "bower_components/sweetalert/example/images/wrong.png" });
                    //console.log("Login Failed!", error);
                } else {
                    var user = $scope.users.$getRecord(authData.uid);
                    user.profile = CleanProfileUrl(user.profile);
                    var obj = {
                        Auth: authData,
                        Details: user
                    };
                    storageService.setObject("CU", obj);

                    var isAdmin = 0;
                    try {
                        isAdmin = user.isAdmin;
                    } catch (err) {
                        isAdmin = 0;
                    }

                    if (isAdmin == 1)
                        storageService.setObject("isAdmin", true);
                    else
                        storageService.setObject("isAdmin", false);


                    swal("", "You have success fully logged In, You being redirect to dashboard.", "success");
                    if (isAdmin == 1) {
                        $scope.$apply(function () {
                            $location.path('static.html');
                        });
                    }
                    else {
                        $scope.$apply(function () {
                            $location.path('dashboard.html');
                        });
                    }
                }
            });
        //}
    }

  

   
});

app.controller('homeController', function ($scope, storageService) {

   // $scope.user = StorageService.getObject('user');
   
});

app.controller('mainController', function ($scope, storageService) {

    //$scope.user = storageService.getObject('user');

    //$scope.isAdmin = false;
    //$scope.isSpe = false;
    //$scope.isPAT = false;

    //for (var cnt = 0; cnt < $scope.user.Roles.length; cnt++) {
    //    if ($scope.user.Roles[cnt] == "Admin")
    //        $scope.isAdmin = true;
    //}

    //if ($scope.user.username == "spe@demo.com")
    //    $scope.isSpe = true;

    //if ($scope.user.username == "pat@demo.com")
    //    $scope.isPAT = true;

    //console.log($scope.user);
    //console.log($scope.user);



    

});
