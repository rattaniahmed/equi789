app.directive('toogle',  ['$rootScope', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(".nav_bar_btn").click(function(e) {
        		$(".nav_bar_nav").slideToggle();
    		});
			$(window).resize(function(e) {
                $(".nav_bar_nav").removeAttr("style");
            });
        }
    };
}]);

app.directive('ngView',  ['$rootScope', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var a = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows();
                }
            };
            trueMobile = a.any();
            if (null == trueMobile) {
                var s = skrollr.init().refresh();
            }
        }
    };
}]);