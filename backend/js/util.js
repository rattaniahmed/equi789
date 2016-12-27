
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

//app.service('StorageService', function () {

//    this.setObject = function (key, obj) {
//        window.localStorage.setItem(key, JSON.stringify(obj));
//    }
//    this.getObject = function (key) {
//        return JSON.parse(window.localStorage.getItem(key));
//    }
//});


//function setUser(user) {

//    window.localStorage.setItem("userName", user.UserName);
//}


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
    if (IsNull(url) || url == "images/placeholder.png")
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

function DrawMap(flightPlanCoordinates) {


    if (flightPlanCoordinates == null || flightPlanCoordinates.length == 0) {

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
    else if(flightPlanCoordinates[0] ==null||    flightPlanCoordinates[0] == ''||    flightPlanCoordinates[0] == undefined)
    {
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




function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function sendMail()
{

}

function getCity(id){
 if (id < 200)
            return  'Noida';
        else if (id < 400 && id > 200)
            return 'Mumbai';
        else if (id < 600 && id > 400)
            return 'Delhi';
        else
            return 'Haryana';
            }


function checkNull(obj){

if(obj == null || obj =='' || obj== undefined || obj=='undefined')
return true;
else
return false;
}


function validateLogin() {

    var user = window.localStorage.getItem("userName");
    if (user == null) {

        return false;
    }
    else 
        return true;

}

function Display(modalToShow) {

    for (var cnt in modals) {
        console.log(modals[cnt]);
        if (modals[cnt] != modalToShow)
            $('#' + modals[cnt]).modal('hide');
    }

    $('#' + modalToShow).modal('show');
}

function Display2(callback) {

    $('#signin').modal('show');


}

function showLoading(isShow){
if(isShow)
 $('#loadingModal').modal('show');
 else
  $('#loadingModal').modal('hide');
}


function ConvertTo2DArray(data, colcount) { 

        var i = 0;

        var productList = [];
        var counter = 0;

        
        for (i = 0; i < data.length; i = i + colcount) {

            var row = [];

            for (var j = 0; j < colcount; j++) {

                if (counter >= data.length)
                    break;

                row.push(data[counter]);

                //$scope.productList[i][j] = data[counter];

                counter++;

            }

            productList.push(row);
        }

        return productList;
    }


    function UpdateObjectImageUrl(obj, propname, baseUrl) {
        obj[propname] = baseUrl + obj[propname];
    }

    function UpdateImageUrl(list, propname, baseUrl) {

        var len = list.length;

        for (var cnt = 0; cnt < len; cnt++) {
            list[cnt][propname] = baseUrl + list[cnt][propname];
        }

        return list;
    }

    function Update2DImageUrlByPropName(list, innerListPropName, propname, baseUrl) {

        var len = list.length;

        for (var cnt = 0; cnt < len; cnt++) {

            var innerList = list[cnt];
            var innerLen = innerList.length;

            for (var innerCnt = 0; innerCnt < innerLen; innerCnt++) {
                innerList[innerCnt][propname] = baseUrl + innerList[innerCnt][propname];
            }
        }
    }


    function Update2DImageUrlByIndex(list,  propname, baseUrl) {

        var len = list.length;

        for (var cnt = 0; cnt < len; cnt++) {

            var innerList = list[cnt];
            var innerLen = innerList.length;

            for (var innerCnt = 0; innerCnt < innerLen; innerCnt++) {

                innerList[innerCnt][propname] = baseUrl + innerList[innerCnt][propname];
            }
        }
    }

//utility function
function PrepareRequestByValueOnly(prcid, inputString) {
    var inputData = {};
    inputData.PRCID = prcid;
    inputData.IsValueOnly = true;


    var dataArray = [];

    if (inputString != null && inputString.length > 0) {
        var arr = inputString.split("|");
        for (var c = 0 ; c < arr.length; c++) {
            var KeyValue = {};
            KeyValue.Value = arr[c];
            dataArray.push(KeyValue);
        }
    }

    inputData.DataArray = dataArray;
    return inputData;
}

function PrepareRequestBySeprator(prcid, inputString) {
    var inputData = {};
    inputData.PRCID = prcid;

    var dataArray = [];

    if (inputString != null && inputString.length > 0) {
        var arr = inputString.split("|");
        for (var c = 0 ; c < arr.length; c++) {
            var keyvalstring = arr[c].split("=");
            var KeyValue = {};
            KeyValue.Key = keyvalstring[0].trim();
            KeyValue.Value = keyvalstring[1];
            dataArray.push(KeyValue);
        }
    }

    inputData.DataArray = dataArray;
    return inputData;
}


//used when we pass | seprated values only
function CallByValueOnly(prcid, inputString, success, failure, showsuccessmessage, showfailuremessage) {

    var inputData = PrepareRequestByValueOnly(prcid, inputString);

    ExecuteService(inputData, success, failure, showsuccessmessage, showfailuremessage);
}

function PostByValueOnly(prcid, inputString, success, failure, showsuccessmessage, showfailuremessage) {

    var inputData = PrepareRequestByValueOnly(prcid, inputString);
    inputData.IsBidirectional = true;

    ExecuteService(inputData, success, failure, showsuccessmessage, showfailuremessage);
}


//use when we pass key value seprated by | as = 
function CallBySeprator(prcid, inputString, success, failure, showsuccessmessage, showfailuremessage) {
    var inputData = PrepareRequestBySeprator(prcid, inputString);
    inputData.IsBidirectional = true;

    ExecuteService(inputData, success, failure, showsuccessmessage, showfailuremessage);
}

function CallBySepratorWithoutLoading(prcid, inputString, success, failure, showsuccessmessage, showfailuremessage) {
    var inputData = PrepareRequestBySeprator(prcid, inputString);
    inputData.IsBidirectional = true;

    ExecuteServiceWithOutLoading(inputData, success, failure, showsuccessmessage, showfailuremessage);
}

function MultiCallBySeprator(prcid, inputString, success, failure, showsuccessmessage, showfailuremessage) {
    var inputData = PrepareRequestBySeprator(prcid, inputString);
    inputData.IsBidirectional = true;

    MultiExecuteService(inputData, success, failure, showsuccessmessage, showfailuremessage);
}

function PostBySeprator(prcid, inputString, success, failure, showsuccessmessage, showfailuremessage) {
    var inputData = PrepareRequestBySeprator(prcid, inputString);

    ExecuteService(inputData, success, failure, showsuccessmessage, showfailuremessage);
}



//use when we pass keyvalue as object
function CallBykeyValue(prcid, inputDataArray, success, failure, showsuccessmessage, showfailuremessage) {
    var inputData = {};
    inputData.PRCID = prcid;
    inputData.DataArray = inputDataArray;

    ExecuteService(inputData, success, failure, showsuccessmessage, showfailuremessage);
}

function PostBykeyValue(process, inputDataArray, success, failure, showsuccessmessage, showfailuremessage) {
    var inputData = {};
    var arr = process.split("|");
    inputData.PRCID = arr[0];
    inputData.MHDID = arr[0];
    inputData.DataArray = inputDataArray;
    inputData.IsBidirectional = true;

    ExecuteService(inputData, success, failure, showsuccessmessage, showfailuremessage);
}



//use when we pass key value seprated by | as = 
function CallByDataObject(process, data, success, failure, showsuccessmessage, showfailuremessage) {

    var inputData = {};
    var arr = process.split("|");
    inputData.PRCID = arr[0];
    inputData.MHDID = arr[1];
    inputData.DataArray = data;
    inputData.IsBidirectional = true;

    ExecuteService(inputData, success, failure, showsuccessmessage, showfailuremessage);
}

function DataSetCallByDataObject(model, data, success, failure, showsuccessmessage, showfailuremessage) {

    var inputData = {};
    var arr = model.split("|");
    inputData.Model = arr[0];
    if (arr.length == 2)
        inputData.Method = arr[1];
    else
        inputData.Method = "GET";
    inputData.DataArray = data;
    inputData.IsBidirectional = true;

    ExecuteDataSetService(inputData, success, failure, showsuccessmessage, showfailuremessage);
}


// actual api call
function ExecuteService(inputData, success, failure, showsuccessmessage, showfailuremessage) {
//var rootUrl = 'http://localhost:53670/api/shared'; //global.settings.getServiceUrl();

//always change rooturl in reference.js file for testing
var rootUrl = global.settings.getServiceUrl();

    $.ajax({
        type: 'POST',
        url: rootUrl, //'api/Shared',
        dataType: 'json',
        //data: JSON.stringify(inputData),
        data: inputData,
        async: true,
        success: function (response) {
            // $('#loadingModal').hide();
            if (response.Code == "P00001") {
                if (showsuccessmessage !== undefined && showsuccessmessage)
                    { //alert(response.Message);
                    console.log(response.Message);}
                if (success !== undefined)
                    success(response.Data);
            }
            else {
                if (showfailuremessage !== undefined && showfailuremessage)
                    alert(response.Message);
                if (failure !== undefined)
                    alert(response.Message);
//                    failure(response);
            }
        },
        error: function (reposnse) {
            console.log("Unknown error occured");
        }
    });

}

// actual api call
function ExecuteDataSetService(inputData, success, failure, showsuccessmessage, showfailuremessage) {
    //var rootUrl = 'http://localhost:53670/api/shared'; //global.settings.getServiceUrl();

    //always change rooturl in reference.js file for testing
    var rootUrl = global.settings.getDataSetServiceUrl();

    $.ajax({
        type: 'POST',
        url: rootUrl, //'api/Shared',
        dataType: 'json',
        //data: JSON.stringify(inputData),
        data: inputData,
        async: true,
        success: function (response) {
            // $('#loadingModal').hide();
            if (response.Code == "P00001") {
                if (showsuccessmessage !== undefined && showsuccessmessage) { //alert(response.Message);
                    console.log(response.Message);
                }
                if (success !== undefined)
                    success(response.Data);
            }
            else {
                if (showfailuremessage !== undefined && showfailuremessage)
                    alert(response.Message);
                if (failure !== undefined)
                    alert(response.Message);
                //                    failure(response);
            }
        },
        error: function (reposnse) {
            console.log("Unknown error occured");
        }
    });

}



// actual api call
function MultiExecuteService(inputData, success, failure, showsuccessmessage, showfailuremessage) {

 $('#loadingModal').modal('show');

//var rootUrl = 'http://localhost:53670/api/shared'; //global.settings.getServiceUrl();

//always change rooturl in reference.js file for testing
var rootUrl = global.settings.getMultiServiceUrl();

    $.ajax({
        type: 'POST',
        url: rootUrl, //'api/Shared',
        dataType: 'json',
        data: JSON.stringify(inputData),
        async: true,
        success: function (response) {
            $('#loadingModal').hide();
            if (response.Code == "P00001") {
                if (showsuccessmessage !== undefined && showsuccessmessage)
                    { //alert(response.Message);
                    console.log(response.Message);}
                if (success !== undefined)
                    success(response.Data);
            }
            else {
                if (showfailuremessage !== undefined && showfailuremessage)
                    alert(response.Message);
                if (failure !== undefined)
                    alert(response.Message);
//                    failure(response);
            }
        },
        error: function (reposnse) {
            console.log("Unknown error occured");
        }
    });

}

// actual api call
function ExecuteServiceWithOutLoading(inputData, success, failure, showsuccessmessage, showfailuremessage) {
//var rootUrl = 'http://localhost:53670/api/shared'; //global.settings.getServiceUrl();

//always change rooturl in reference.js file for testing
var rootUrl = global.settings.getServiceUrl();

    $.ajax({
        type: 'POST',
        url: rootUrl, //'api/Shared',
        dataType: 'json',
        data: JSON.stringify(inputData),
        async: true,
        success: function (response) {
            if (response.Code == "P00001") {
                if (showsuccessmessage !== undefined && showsuccessmessage)
                    alert(response.Message);
                if (success !== undefined)
                    success(response.Data);
            }
            else {
                if (showfailuremessage !== undefined && showfailuremessage)
                    alert(response.Message);
                if (failure !== undefined)
                    failure(response);
            }
        },
        error: function (reposnse) {
            alert("Unknown error occured");
        }
    });

}


function ExecuteAJAX(url, inputData, success, failure, showsuccessmessage, showfailuremessage) {

    //alert(url);
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: url, //'/Login/ValidateUser',
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        data: JSON.stringify(inputData),
        success: function (response) {
            if (response.Code == "P00001") {
                if (showsuccessmessage !== undefined && showsuccessmessage)
                    alert(response.Message);
                if (success !== undefined)
                    success(response.Data);
            }
            else {
                if (showfailuremessage !== undefined && showfailuremessage)
                    alert(response.Message);
                if (failure !== undefined)
                    failure(response);
            }
        },
        error: function (reposnse) {
            //alert("Unknown error occured");
            console.log("Unknown error occured");
        }
    });

}

function ExecuteAJAXByGet(urlAndData, success, failure, showsuccessmessage, showfailuremessage) {

    $('#loadingModal').modal('show');
    urlAndData = global.settings.url + urlAndData;
    //alert(urlAndData);
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: urlAndData,
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        //data: JSON.stringify(inputData),
        success: function (response) {
            $('#loadingModal').modal('hide');
            if (response.Code == "P00001") {
                if (showsuccessmessage !== undefined && showsuccessmessage)
                    bootbox.alert(response.Message);
                if (success !== undefined)
                    success(response.Data);
            }
            else {
                if (showfailuremessage !== undefined && showfailuremessage)
                    bootbox.alert(response.Message);
                if (failure !== undefined && failure != null)
                    failure(response);
            }
        },
        error: function (reposnse) {
            $('#loadingModal').modal('hide');
            bootbox.alert("Unknown error occured");
        }
    });

}

function ExecuteAJAXByGet2(urlAndData, success, failure, showsuccessmessage, showfailuremessage) {

    $('#loadingModal').modal('show');
    urlAndData = global.settings.url + urlAndData;
    //alert(urlAndData);
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: urlAndData,
        contentType: 'application/json; charset=utf-8',
        async: true,
        processData: false,
        cache: false,
        //data: JSON.stringify(inputData),
        success: function (response) {
            $('#loadingModal').modal('hide');
            if (response.Code == "P00001") {
                if (showsuccessmessage !== undefined && showsuccessmessage)
                    bootbox.alert(response.Message);
                if (success !== undefined)
                    success(response.Data);
            }
            else {
                if (showfailuremessage !== undefined && showfailuremessage)
                    bootbox.alert(response.Message);
                if (failure !== undefined && failure != null)
                    failure(response);
            }
        },
        error: function (reposnse) {
            $('#loadingModal').modal('hide');
            //bootbox.alert("Unknown error occured");
        }
    });

}



function ExeecuteRequestByValue (prcid, inputVal, success, failure, showsuccessmessage, showfailuremessage) {

    urlAndData = global.settings.getServiceUrl() + prcid;
    if (inputVal != "" || inputVal != null)
        urlAndData = urlAndData + "&Param=" + inputVal;

    $('#loadingModal').modal('show');

    $.ajax({
        type: 'GET',
        url: urlAndData,
        dataType: 'json',
        data: null,
        async: true,
        success: function (response) {
            $('#loadingModal').modal('hide');
            if (response.Code == "P00001") {
                if (showsuccessmessage !== undefined && showsuccessmessage)
                    bootbox.alert(response.Message);
                if (success !== undefined)
                    success(response.Data);
            }
            else {
                if (showfailuremessage !== undefined && showfailuremessage)
                    bootbox.alert(response.Message);
                if (failure !== undefined && failure != null)
                    failure(response);
            }
        },
        error: function (reposnse) {
            $('#loadingModal').modal('hide');
            bootbox.alert("Unknown error occured");
        }
    });

}



function GetRequestByValue(prcid, inputVal, callback) {

    urlAndData = global.settings.getServiceUrl() + prcid;
    if (inputVal != "" || inputVal != null)
        urlAndData = urlAndData + "&Param=" + inputVal;
    //alert(urlAndData);
    $.ajax({
        type: 'GET',
        url: urlAndData,
        dataType: 'json',
        data: null,
        async: true,
        success: function (response) {
            //if (response.Code == "P00001") {
                callback(response);
            //}
        },
        error: function (reposnse) {
            alert("Unknown error occured");
        }
    });

}


function RedirectToLocation(location)
{
    var url = global.settings.getSiteUrl() + location;
    //alert(url);
    window.location.href = url;
}



function repeat(l) {
    var items = [];
    for (var i = 0; i < l; i++) {
        var item = { id: i };
        items.push(item);
    }
    return items;
}


function repeatItem(l,item) {
    var items = [];
    for (var i = 0; i < l; i++) {
        items.push(item);
    }
    return items;
}


function Repeat2D(le,   colCount) {
var items = repeat(le);
return ConvertTo2DArray(items,colCount);
}






function PrepareRequestForMail(prcid, to, sub, msg) {
     var inputData = {};
    inputData.PRCID = prcid;

    var dataArray = [];

   
            var toKey = { Key : "TO", Value :to};
            dataArray.push(toKey);

              var subKey = { Key : "SUB", Value :sub};
            dataArray.push(subKey);

              var msgKey = { Key : "MSG", Value :msg};
            dataArray.push(msgKey);
       

    inputData.DataArray = dataArray;

    console.log(inputData);
    return inputData;
}



// actual api call
function MailExecuteService(inputData, success, failure, showsuccessmessage, showfailuremessage) {

 $('#loadingModal').modal('show');

//var rootUrl = 'http://localhost:53670/api/shared'; //global.settings.getServiceUrl();

//always change rooturl in reference.js file for testing
var rootUrl = global.settings.getMailServiceUrl();

    $.ajax({
        type: 'POST',
        url: rootUrl, //'api/Shared',
        dataType: 'json',
        data: JSON.stringify(inputData),
        async: true,
        success: function (response) {
            $('#loadingModal').hide();
            if (response.Code == "P00001") {
                if (showsuccessmessage !== undefined && showsuccessmessage)
                    { //alert(response.Message);
                    console.log(response.Message);}
                if (success !== undefined)
                    success(response.Data);
            }
            else {
                if (showfailuremessage !== undefined && showfailuremessage)
                    alert(response.Message);
                if (failure !== undefined)
                    alert(response.Message);
//                    failure(response);
            }
        },
        error: function (reposnse) {
            console.log("Unknown error occured");
        }
    });

}


function GetObjectByControl(controlArray) {
    var obj = {};
    for (var i = 0 ; i < controlArray.length; i++) {
        var control = $("#" + controlArray[i].Name);
        if (control != null) {
            obj[controlArray[i].Name] = control.val();
        }
    }
    return obj;
}




function SetViewByControl(controlArray,obj) {
    for (var i = 0 ; i < controlArray.length; i++) {
        var control = $("#" + controlArray[i].Name);
        if (control != null) {
            control.val(obj[controlArray[i].Name]);
        }
    }
}


function CustomError(message)
{
    this.Message = message;
}


function LoadingState()
{
    $('#loadingModal').show();
}
function UnLoadingState() {
    $('#loadingModal').hide();
}



function getCharArray() {
    var exisitng = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var colors = ["#FF5E00", "#FF0000", "#2700FF", "#00A1FF", "#2700FF", "#1B00FF", "#FF6A00", "#FF00B1", "#00FFF3", "#00FF4E","#FF0099"];
    var toReturn = [];
    for (var cnt = 0; cnt < exisitng.length; cnt++)
    {
        var num = Math.floor((Math.random() * 10) + 1);
        var item = {
            Text: exisitng[cnt],
            //BackColor: 'red;' //Math.floor((Math.random() * 10) + 1)
            BackColor:colors[num],
            Number:num
        };        
        toReturn.push(item);
    }
    console.log(toReturn);
    return toReturn;
}


function GetFormattedDate(date) {
    var todayTime = new Date(date);
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    return month + "/" + day + "/" + year;
}


function getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
}