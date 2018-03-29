function IsProduction() {
    return false;
}


function IsLocalNodeJsRunning() {
    return false;
}


function getFireBaseEndPoint() {
   // var endPoint = "https://myequitrackdemo.firebaseio.com";
    var endPoint = "https://demoproject-a35d4.firebaseio.com";
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