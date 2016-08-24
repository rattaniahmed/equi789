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
function pad(num) {
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