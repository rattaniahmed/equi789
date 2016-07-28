angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));

var app = angular.module('equitrack', ['ngRoute']);

app.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
	$locationProvider.html5Mode(true);  
    $routeProvider.when('/', {
      templateUrl: 'home.tpl.html',
      controller: 'ViewController',
    });
	$routeProvider.when('/signup.html', {
      templateUrl: 'signup.tpl.html',
      controller: 'ViewController',
    });
	$routeProvider.when('/login.html', {
      templateUrl: 'login.tpl.html',
      controller: 'ViewController',
    });
	$routeProvider.when('/forgot-password.html', {
      templateUrl: 'forgot-password.tpl.html',
      controller: 'ViewController',
    });
	$routeProvider.when('/settings.html', {
      templateUrl: 'settings.tpl.html',
      controller: 'ViewController',
    });
	$routeProvider.when('/about-us.html', {
      templateUrl: 'about-us.tpl.html',
      controller: 'ViewController',
    });
	$routeProvider.when('/disciplines.html', {
      templateUrl: 'disciplines.tpl.html',
      controller: 'ViewController',
    });
	$routeProvider.when('/sponsors.html', {
      templateUrl: 'sponsors.tpl.html',
      controller: 'ViewController',
    });
	$routeProvider.when('/dashboard.html', {
      templateUrl: 'dashboard.tpl.html',
      controller: 'ViewController',
    });
	$routeProvider.when('/my-stable.html', {
      templateUrl: 'my-stable.tpl.html',
      controller: 'ViewController',
    });

	$routeProvider.when('/my-stable-details.html', {
      templateUrl: 'my-stable-details.tpl.html',
      controller: 'ViewController',
    });
	$routeProvider.when('/last-ride.html', {
      templateUrl: 'last-ride.tpl.html',
      controller: 'ViewController',
    });
	$routeProvider.when('/ride-history.html', {
      templateUrl: 'ride-history.tpl.html',
      controller: 'ViewController',
    });
	
	$routeProvider.otherwise({
     // redirectTo: '/'
    });
  }
]);
app.controller('ViewController', ['$scope', '$location',
	function MyCtrl($scope, $location) {
	  $scope.isActive = function(href){
				if(typeof href === 'object')
				{
					return !($.inArray($location.path(), href) < 0);
				}else{
					return href == $location.path();
				}
			}
		    $scope.go = function(index) {
      		$location.path('/view' + index);
    	};
	}
]);