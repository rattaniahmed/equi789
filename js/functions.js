function IsNull(val) {
    if (val == '' || val == null || val === undefined)
        return true;
    else
        return false;
}

function ReplaceNull(val) {
    if (val == '' || val == null || val === undefined)
        return '';
    else
        return val;
}function CleanProfileUrl(url) {
    if (IsNull(url))
        return "images/duser.png";
    else
        return url;
}function CleanHorseProfileUrl(url) {
    if (IsNull(url) || url== "images/placeholder.png")
        return "images/horsePlaceHolder.png";
    else
        return url;
}function ValidateControl(ctrls) {

    var isValid = true;
    
    for (var i = 0; i < ctrls.length; i++) {
        var c = $("#" + ctrls[i])
        if (IsNull(c.val())) {
            isValid = false;
            //c.toggleClass("has-errors");
            c.css("border", "1px solid red");
        }
        else {
            c.css("border", "1px solid #ffd98c");
        }
    }

    return isValid;

}
function PrepareRequestForMail(prcid, TO, CC, From, Subject, Body, DisplayName) {
    var inputData = {};
    inputData.PRCID = prcid;
    var dataArray = [];
    dataArray.push({ Key: "TO", Value: TO });
    dataArray.push({ Key: "CC", Value: CC });
    dataArray.push({ Key: "From", Value: From });
    dataArray.push({ Key: "Subject", Value: Subject });
    dataArray.push({ Key: "Body", Value: Body });
    dataArray.push({ Key: "DisplayName", Value: DisplayName });
    inputData.DataArray = dataArray;
    console.log(inputData);
    return inputData;
}
function DrawMap(flightPlanCoordinates ) {


    if (flightPlanCoordinates == null || flightPlanCoordinates.length == 0 ) {

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: {
                lat: 40.712784, lng: -74.005941
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            mapTypeId: 'terrain'
        });

    }
    else {
        var lat = 0;
        var lng = -180;
        // if (flightPlanCoordinates.length > 2) {
        //     var index = parseInt((flightPlanCoordinates.length - 1) / 2);
        //     lat = flightPlanCoordinates[index].lat;
        //     lng = flightPlanCoordinates[index].lng;
        // }
        // else {
        //     lat = 0;
        //     lng = -180;
        // }

        lat = flightPlanCoordinates[0].lat;
        lng = flightPlanCoordinates[0].lng;


        var directionsService = new google.maps.DirectionsService();

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: lat, lng: lng },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            mapTypeId: 'terrain'
        });

        var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });

        var toDisplay = [];

        // if (flightPlanCoordinates.length > 8) {

        //     for (var i = 1 ; i <= 3; i++) {
        //         toDisplay.push({
        //             location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
        //             stopover: true
        //         });
        //     }

        //     for (var i = flightPlanCoordinates.length - 5 ; i <= flightPlanCoordinates.length - 2; i++) {
        //         toDisplay.push({
        //             location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
        //             stopover: true
        //         });
        //     }

        // }

        //else {
        for (var i = 0 ; i < flightPlanCoordinates.length; i++) {
            toDisplay.push({
                location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
                stopover: true
            });
        }
        //}


        var request = {
            origin: flightPlanCoordinates[0],
            destination: flightPlanCoordinates[flightPlanCoordinates.length - 1],
            travelMode: 'BICYCLING',
            waypoints: toDisplay
        };

        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(result);
            }
        });

        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);

    }
}function pad(num) {
    return ("0" + num).slice(-2);
}

function hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60)
    minutes = minutes % 60;
    return pad(hours) + ":" + pad(minutes) + ":" + pad(secs);
}function initparallax() {
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
        var s = skrollr.init();
    }
    	 
}
$(document).ready(function() {
    initparallax();
});

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