var Equitrack = angular.module("equitrack", ["firebase"]);

Equitrack.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            template: 'page 1',
            controller: HomeCtrl
        }).
        when('/login', {
            template: 'Login User',
            controller: LoginCtrl
        }).
        when('/register', {
            template: 'Register User',
            controller: RegisterCtrl
        }).
        when('/404', {
            template: '404 not found',
            // controller: RegisterCtrl
        }).
        otherwise({redirectTo: '404'});
    $locationProvider.html5Mode( true );
}]);

// Equitrack.factory('Page', function(){
//     var ref = new Firebase("https://myequitrack.firebaseio.com");
//     var siteTitle = 'Equitrack';
//     var title = 'default';
//     var user = {};
//     return {
//         title: function() { return title; },
//         setTitle: function(newTitle) { title = newTitle; },
//         isLogin: function() { return user.login; },
//         login: function(user, pass) {
//             user.login = true;
//             user.user = user;
//         },
//         register: function (email, pass) {
//             ref.createUser({
//               email    : "bobtony@firebase.com",
//               password : "correcthorsebatterystaple"
//             }, function(error, userData) {
//               if (error) {
//                 console.log("Error creating user:", error);
//               } else {
//                 console.log("Successfully created user account with uid:", userData.uid);
//               }
//             });
//         }
//     };
// });

function MainCtrl($scope, Page) {
    $scope.Page = Page;
}
function HomeCtrl($scope, Page) {
    Page.setTitle('home');
}
function LoginCtrl($scope, Page) {
    Page.setTitle('Login');
    Page.login('username', 'password');
}
function RegisterCtrl($scope, Page) {
    Page.setTitle('Logout');
}
