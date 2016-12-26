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
}


function CleanProfileUrl(url) {
    if (IsNull(url))
        return "images/duser.png";
    else
        return url;
}

function CleanHorseProfileUrl(url) {
    if (IsNull(url) || url== "images/placeholder.png")
        return "images/horsePlaceHolder.png";
    else
        return url;
}


function ValidateControl(ctrls) {

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


function DrawManualMap(flightPlanCoordinates) {

    try {
        delete flightPlanCoordinates.$id;
    }
    catch (err) {
        console.log(err);
    }

    try {
        delete flightPlanCoordinates.$priority;
    }
    catch (err) {
        console.log(err);
    }

    if (flightPlanCoordinates == null || flightPlanCoordinates.length == 0) {

        var map = new google.maps.Map(document.getElementById('map'), {
            //zoom: 14,
            zoom: 4,
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
    else if (flightPlanCoordinates[0] == null || flightPlanCoordinates[0] == '' || flightPlanCoordinates[0] == undefined) {
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

        lat = flightPlanCoordinates[0].lat;
        lng = flightPlanCoordinates[0].lng;



        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: lat, lng: lng },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            mapTypeId: 'terrain'
        });

        //var directionsService = new google.maps.DirectionsService;
        //var directionsDisplay = new google.maps.DirectionsRenderer;

        //directionsDisplay.setMap(map);

        //directionsService.route({
        //    origin: flightPlanCoordinates[0],
        //    destination: flightPlanCoordinates[flightPlanCoordinates.length - 1],
        // }, function (response, status) {
        //    if (status === 'OK') {
        //        directionsDisplay.setDirections(response);
        //    } else {
        //        window.alert('Directions request failed due to ' + status);
        //    }
        //});

        var polcors = [];
        for (var i = 0 ; i < flightPlanCoordinates.length; i++) {
            var co = flightPlanCoordinates[i];
            try {
                var newco = { lat: co.lat, lng: co.lng }
                polcors.push(newco);
            }
            catch (err) {

            }
        }


        var marker = new google.maps.Marker({
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            position: polcors[0],
            map: map
        });

        var marker1 = new google.maps.Marker({
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            position: polcors[polcors.length - 1],
            map: map
        });

        //marker.setMap(map);
        //marker1.setMap(map);

        //var flightPath = new google.maps.Polyline({
        //    //path: flightPlanCoordinates,
        //    path: polcors,
        //    geodesic: true,
        //    strokeColor: '#FF0000',
        //    strokeOpacity: 1.0,
        //    strokeWeight: 2
        //});

        //flightPath.setMap(map);

        google.maps.event.trigger(map, 'resize', {});

    }
}


function DrawMap(flightPlanCoordinates) {

    try{
        delete flightPlanCoordinates.$id;
    }
    catch (err) {
        console.log(err);
    }

    try {
        delete flightPlanCoordinates.$priority;
    }
    catch (err) {
        console.log(err);
    }

    if (flightPlanCoordinates == null || flightPlanCoordinates.length == 0) {

        var map = new google.maps.Map(document.getElementById('map'), {
            //zoom: 14,
            zoom: 4,
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
    else if (flightPlanCoordinates[0] == null || flightPlanCoordinates[0] == '' || flightPlanCoordinates[0] == undefined) {
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

        lat = flightPlanCoordinates[0].lat;
        lng = flightPlanCoordinates[0].lng;

        

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: lat, lng: lng },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            mapTypeId: 'terrain'
        });

        //var directionsService = new google.maps.DirectionsService;
        //var directionsDisplay = new google.maps.DirectionsRenderer;

        //directionsDisplay.setMap(map);

        //directionsService.route({
        //    origin: flightPlanCoordinates[0],
        //    destination: flightPlanCoordinates[flightPlanCoordinates.length - 1],
        // }, function (response, status) {
        //    if (status === 'OK') {
        //        directionsDisplay.setDirections(response);
        //    } else {
        //        window.alert('Directions request failed due to ' + status);
        //    }
        //});

        var polcors = [];
        for (var i = 0 ; i < flightPlanCoordinates.length; i++) {
            var co = flightPlanCoordinates[i];
            try {
                var newco = { lat: co.lat, lng: co.lng }
                polcors.push(newco);
            }
            catch(err){

            }
        }


        var marker = new google.maps.Marker({
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            position: polcors[0],
            map: map
        });

        var marker1 = new google.maps.Marker({
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            position: polcors[polcors.length - 1],
            map: map
        });

        //marker.setMap(map);
        //marker1.setMap(map);

        var flightPath = new google.maps.Polyline({
           //path: flightPlanCoordinates,
            path:polcors,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);

        google.maps.event.trigger(map, 'resize', {});

    }
}

function DrawManualRideOnMap(ride) {
    var coord = [];
    if (ride.coords) {
        coord.push(ride.start_cord);
        coord.push(ride.end_cord);
    }
    DrawManualMap(coord);
}

function DrawAutomatedRideOnMap(coord) {
    if (coord == null)
        coord = [];
    DrawMap(coord);
}

function GetSharingUrl(ride,baseUrl) {
    var url = "";

    var ti = "Equitrack - Ride Map";
    if (!IsNull(ride.location))
        ti = ride.location;

    if (ride.start_cord != null && ride.end_cord != null) {
        var sc = ride.start_cord.lat + "%2C" + ride.start_cord.lng;
        var ec = ride.end_cord.lat + "%2C" + ride.start_cord.lng;
        url = baseUrl+ "sharemap?Title=" + ti + "&Start=" + sc + "&End=" + ec;
    }
    else {
        url = baseUrl + "sharemap?Title=" + ti;
    }
    return url;
}


function GetSharingUrlByCord(ride, cords , baseUrl) {

    var url = "";

    var ti = "Equitrack - Ride Map";
    if (!IsNull(ride.location))
        ti = ride.location;

    var start = '';
    var end = '';

    if (cords == null) {
        url = baseUrl + "sharemap?Title=" + ti;
    }
    else {

        var last = cords.length - 1;
        var sc = cords[0].lat + "%2C" + cords[0].lng;
        var ec = cords[last].lat + "%2C" + cords[last].lng;
        url = baseUrl + "sharemap?Title=" + ti + "&Start=" + sc + "&End=" + ec;
        start = sc;
        end = ec;
    }

    var gurl = 'https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=600x400&maptype=roadmap&markers=color:green%7Clabel:G%7C' + start + '&markers=color:red%7Clabel:C%7C' + end + '&key=AIzaSyA2cpd_C0zOoAanqP0aWaKxxSuDDiRWPT0&path=color:red|weight:3|' + start + '|' + end;
    console.log(gurl);
    return gurl;
}

function GetShareObjectByRide(horse , ride) {

    
   
    var ti = "Equitrack - Rides Map";
    if (!IsNull(ride.location))
        ti = ride.location;

    ti = "Find more details on www.myequitrack.com";

    var start = '';
    var end = '';

    if (ride.start_cord != null && ride.end_cord != null) {
        start = ride.start_cord.lat + "," + ride.start_cord.lng;
        end = ride.end_cord.lat + "," + ride.start_cord.lng;
    }
    ride.ride_time = 144;

    var gurl = 'https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=600x400&maptype=roadmap&markers=color:green%7Clabel:G%7C' + start + '&markers=color:red%7Clabel:C%7C' + end + '&key=AIzaSyA2cpd_C0zOoAanqP0aWaKxxSuDDiRWPT0'//&path=color:red|weight:2|' + start + '|' + end
    var link = "https://www.google.com/maps/dir/" + start + "/" + end;
    var title = "I rode " + horse.horse_name + " for " + hhmmss2(ride.ride_time) + " and covered " + ride.total_distance + " miles at an average speed of " + ride.average_speed;

    var obj = {
        method: 'feed',
        title: title, //"Ride taken on " + ride.start_time, //horseName,//'This is horse name with ride start and end time',
        link: link,// 'https://www.google.com/maps/place/Nacogdoches,+TX/@33.1689148,-93.2097426,6z/data=!4m21!1m15!4m14!1m6!1m2!1s0x8863f80e5b170141:0x850cb92ad6b577f6!2sMurfreesboro,+TN!2m2!1d-86.39027!2d35.8456213!1m6!1m2!1s0x864c19f77b45974b:0xb9ec9ba4f647678f!2sDallas,+TX!2m2!1d-96.7969879!2d32.7766642!3m4!1s0x8637895fa4158787:0x88db1616dcfba3ee!8m2!3d31.6042705!4d-94.6554565',
        caption: 'https://myequitrack.com/',
        picture: gurl,
        description: ti
    }

    //var obj ={
    //    method: 'feed',
    //    title: 'This is horse name with ride start and end time',
    //    link: 'https://www.google.com/maps/place/Nacogdoches,+TX/@33.1689148,-93.2097426,6z/data=!4m21!1m15!4m14!1m6!1m2!1s0x8863f80e5b170141:0x850cb92ad6b577f6!2sMurfreesboro,+TN!2m2!1d-86.39027!2d35.8456213!1m6!1m2!1s0x864c19f77b45974b:0xb9ec9ba4f647678f!2sDallas,+TX!2m2!1d-96.7969879!2d32.7766642!3m4!1s0x8637895fa4158787:0x88db1616dcfba3ee!8m2!3d31.6042705!4d-94.6554565',
    //    caption: 'https://myequitrack.com/',
    //    picture: 'https://maps.googleapis.com/maps/api/staticmap?center=Williamsburg,Brooklyn,NY&zoom=13&size=600x400&markers=color:red%7Clabel:S%7C11211%7C11206%7C11222&key=AIzaSyA2cpd_C0zOoAanqP0aWaKxxSuDDiRWPT0',
    //    description: 'This is ride location if provide else become blank'
    //}

    return obj;
}

function GetShareObjectByCoordinate(horse, ride, cords) {

    //var horseName =''
    //if (IsNull(horse.Name))
    //    horseName = horse.Name;

    var ti = "Equitrack - Rides Map";
    if (!IsNull(ride.location))
        ti = ride.location;

    ti = "Find more details on www.myequitrack.com";

    var start = '';
    var end = '';

    if (cords == null) {
        url = baseUrl + "sharemap?Title=" + ti;
    }
    else {
        var last = cords.length - 1;
        start = cords[0].lat + "," + cords[0].lng;
        end = cords[last].lat + "," + cords[last].lng;
    }

    var gurl = 'https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=600x400&maptype=roadmap&markers=color:green%7Clabel:G%7C' + start + '&markers=color:red%7Clabel:C%7C' + end + '&key=AIzaSyA2cpd_C0zOoAanqP0aWaKxxSuDDiRWPT0' //&path=color:red|weight:2|' + start + '|' + end
    var link = "https://www.google.com/maps/dir/" + start + "/" + end;
    var title = "I rode " + horse.horse_name + " for " + hhmmss2(ride.ride_time) + " and covered " + ride.total_distance + " miles at an average speed of " + ride.average_speed;

    var obj = {
        method: 'feed',
        title: title, //"Ride taken on " + ride.start_time, //horseName,//'This is horse name with ride start and end time',
        link: link, //'https://www.google.com/maps/place/Nacogdoches,+TX/@33.1689148,-93.2097426,6z/data=!4m21!1m15!4m14!1m6!1m2!1s0x8863f80e5b170141:0x850cb92ad6b577f6!2sMurfreesboro,+TN!2m2!1d-86.39027!2d35.8456213!1m6!1m2!1s0x864c19f77b45974b:0xb9ec9ba4f647678f!2sDallas,+TX!2m2!1d-96.7969879!2d32.7766642!3m4!1s0x8637895fa4158787:0x88db1616dcfba3ee!8m2!3d31.6042705!4d-94.6554565',
        caption: 'https://myequitrack.com/',
        picture: gurl,
        description: ti
    }

    //var obj ={
    //    method: 'feed',
    //    title: 'This is horse name with ride start and end time',
    //    link: 'https://www.google.com/maps/place/Nacogdoches,+TX/@33.1689148,-93.2097426,6z/data=!4m21!1m15!4m14!1m6!1m2!1s0x8863f80e5b170141:0x850cb92ad6b577f6!2sMurfreesboro,+TN!2m2!1d-86.39027!2d35.8456213!1m6!1m2!1s0x864c19f77b45974b:0xb9ec9ba4f647678f!2sDallas,+TX!2m2!1d-96.7969879!2d32.7766642!3m4!1s0x8637895fa4158787:0x88db1616dcfba3ee!8m2!3d31.6042705!4d-94.6554565',
    //    caption: 'https://myequitrack.com/',
    //    picture: 'https://maps.googleapis.com/maps/api/staticmap?center=Williamsburg,Brooklyn,NY&zoom=13&size=600x400&markers=color:red%7Clabel:S%7C11211%7C11206%7C11222&key=AIzaSyA2cpd_C0zOoAanqP0aWaKxxSuDDiRWPT0',
    //    description: 'This is ride location if provide else become blank'
    //}

    return obj;
}

function GetStaticMapUrl(cords) {

}

function DrawMap2(map, flightPlanCoordinates, flightPath,  directionsService, directionsDisplay) {



    var lat = flightPlanCoordinates[0].lat;
    var lng = flightPlanCoordinates[0].lng;

    //var directionsService = new google.maps.DirectionsService;
    //var directionsDisplay = new google.maps.DirectionsRenderer;

    //var map = new google.maps.Map(document.getElementById('map'), {
    //    zoom: 14,
    //    center: { lat: lat, lng: lng },
    //    zoomControl: true,
    //    zoomControlOptions: {
    //        position: google.maps.ControlPosition.TOP_RIGHT
    //    },
    //    mapTypeId: 'terrain'
    //});

    map.setCenter(new google.maps.LatLng(lat, lng));

    //if (reRequest) {
    //    directionsDisplay.setMap(null);
    //    //directionsDisplay.setDirections(null);
    //    directionsDisplay = null;
    //}

    //directionsDisplay.setMap(map);

    directionsService.route({
        origin: flightPlanCoordinates[0],
        destination: flightPlanCoordinates[flightPlanCoordinates.length - 1],
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });


    

    //var flightPath = new google.maps.Polyline({
    //    path: flightPlanCoordinates,
    //    geodesic: true,
    //    strokeColor: '#FF0000',
    //    strokeOpacity: 1.0,
    //    strokeWeight: 2
    //});

    flightPath.setMap(map);

}


function pad(num) {
    return ("0" + num).slice(-2);
}

function hhmmss(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60)
    minutes = minutes % 60;
    return pad(hours) + ":" + pad(minutes) + ":" + pad(secs);
}


function hhmmss2(secs) {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60)
    minutes = minutes % 60;
    if (hours > 0)
        return pad(hours) + " hours " + pad(minutes) + " minutes " + pad(secs) + " seconds";
    else if (minutes > 0)
        return pad(minutes) + " minutes " + pad(secs) + " seconds";
    else
        return pad(secs) + " seconds";
}

function initparallax() {

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



function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}