﻿function IsProduction() {
    return true;
}


function IsLocalNodeJsRunning() {
    return true;
}


function getFireBaseEndPoint() {
    var endPoint = "https://myequitrackdemo.firebaseio.com";
    if (IsProduction())
        endPoint = "https://myequitrack.firebaseio.com";

    return endPoint;
}

function getNodeJsEndPoint() {
    var url = "https://myequitracknodejsemail.appspot.com/";
    if (IsLocalNodeJsRunning())
        url = "http://localhost:8080/";
    return url;
}