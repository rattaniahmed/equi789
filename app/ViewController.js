app.controller('ViewController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, storageService, blockUI, $http, firebaseService, $rootScope) {

    $scope.isLogged = 0;

    $scope.UpdateLoggedStatus = function () {

        if (!$rootScope.isUseListener) {
            if (storageService.getObject("CU"))
                if ((storageService.getObject("CU").Details.email == "mjdmike@email.com")) {
                    $rootScope.isUseListener = true;
                }
                else {
                    storageService.setObject("CU", null);
                }
        }
        var user = storageService.getObject("CU");
        if (user == null)
            $scope.isLogged = 0;
        else {
            var isAdmin = storageService.getObject("isAdmin");
            if (isAdmin)
                $scope.isLogged = 2;
            else
                $scope.isLogged = 1;
        }
    }

    $scope.UpdateLoggedStatus();

    $scope.StartTrack = function () {

        var user = storageService.getObject("CU");
        if (user == null)
            $location.path('login.html');
        else
            $location.path('dashboard.html');
    }

    $scope.isActive = function (href) {
        if (typeof href === 'object') {
            return !($.inArray($location.path(), href) < 0);
        } else {
            return href == $location.path();
        }
    }

    $scope.go = function (index) {
        $location.path('/view' + index);
    };

    $scope.ContactUs = function () {


        if (!ValidateControl(['first_name', 'email', 'msg']))
            return;
        else {

            //blockUI.start("Sending message");

            var TO = $scope.email;
            ///TO ="vishal.kumar1145@gmail.com";
            //TO = "rattaniahmed@gmail.com";
            //TO = "support@myequitrack.com";
            //TO = "info@myequitrack.com";
            TO = "equitrackapp@gmail.com";

            var Subject = "New message on Conatct us screen on Equitrack.com";

            var html = 'New contact message from the user " ' + ReplaceNull($scope.first_name) + ' ' + ReplaceNull($scope.last_name) + ' ( ' + ReplaceNull($scope.email) + ' ) "  and Message is - ' + ReplaceNull($scope.msg);


            var url = storageService.getNodeJSAppURL() + 'sendmailnew?TO=' + TO + '&Subject=' + Subject + '&HTML=' + html;

            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {

            }, function errorCallback(response) {
            });

            $scope.first_name = "";
            $scope.last_name = "";
            $scope.email = "";
            $scope.mobile = "";
            $scope.msg = "";

            swal({
                title: "",
                text: "Thanks for contacting us, We will get back to you as soon as possible.",
                timer: 2000,
                showConfirmButton: false,
                imageUrl: "bower_components/sweetalert/example/images/thumbs-up.jpg"
            });


        }

    }
    //check this for horseids
    $scope.getUserOrganization = function () {
        $scope.UserOrg = [];
        $scope.user = storageService.getObject("CU");
        //   for (var i in $scope.user.Details.horse_ids) {

        debugger


        for (var j = 0; j < $rootScope.appHorses.horseList.length; j++) {
            try {
                var horse = $rootScope.appHorses.horseList[j].HORSEOBJ;
                if (horse && horse.associations) {
                    debugger
                    for (var j in horse.associations) {

                   // for (var i = 0; i < horse.associations.length; i++) {
                        if (!_.contains($scope.UserOrg, horse.associations[j].filter)) {
                            $scope.UserOrg.push(horse.associations[j].filter);
                        }
                    }
                }
            } catch (err) { }
    }
        //  }
        return $scope.UserOrg;
    }

    $scope.getUserMessagess = function () {
        var ShowMessages = [];
        try {
            if ($scope.user) {
                var orgs = $scope.getUserOrganization();
                for (var mcounter in $rootScope.appMessages) {
                    var msgToAdd = $rootScope.appMessages[mcounter];
                    msgToAdd.Id = mcounter;
                    if (parseInt($rootScope.appMessages[mcounter].AllowMessageToAll) == 1) {
                        if (moment(dateFormat(new Date(), 'mm/dd/yyyy')).isSame(moment($rootScope.appMessages[mcounter].ExpirationDate)) == true || (moment($rootScope.appMessages[mcounter].ExpirationDate).isBefore(moment(dateFormat(new Date(), 'mm/dd/yyyy')))) == false) {
                            ShowMessages.push(msgToAdd);
                        }
                    } else {
                        if ($scope.UserOrg) {
                            for (var i = 0; i < $scope.UserOrg.length; i++) {
                                if ($rootScope.appMessages[mcounter].OrganisationId == $scope.UserOrg[i]) {
                                    if (moment(dateFormat(new Date(), 'mm/dd/yyyy')).isSame(moment($rootScope.appMessages[mcounter].ExpirationDate)) == true || (moment($rootScope.appMessages[mcounter].ExpirationDate).isBefore(moment(dateFormat(new Date(), 'mm/dd/yyyy')))) == false) {
                                        ShowMessages.push(msgToAdd);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return ShowMessages;
        }
        catch (err) {
            return ShowMessages;
        }
    }

    $scope.IsUnreadMessageExist = function () {
        var toReturn = false;
        try {
            $scope.RefreshMessages = $scope.getUserMessagess();
            if ($scope.user) {
                for (var i = 0; i < $scope.RefreshMessages.length; i++) {
                    if ($scope.RefreshMessages[i].ReadBy) {
                        var findid = _.contains($scope.RefreshMessages[i].ReadBy, $scope.user.Details.$id);
                        if (!findid) {
                            toReturn = true;
                        }
                    }
                    else {
                        toReturn = true;
                    }
                }
            }
            else
                toReturn = false;
        }
        catch (error) {
            toReturn = false;
        }
        return toReturn;
    }

    $scope.IsUnreadMessageExistNew = function (RefreshMessagesList) {

        var toReturn = false;
        try {

            if ($scope.user) {
                for (var i = 0; i < RefreshMessagesList.length; i++) {
                    if (RefreshMessagesList[i].ReadBy) {
                        var findid = _.contains(RefreshMessagesList[i].ReadBy, $scope.user.Details.$id);
                        if (!findid) {
                            toReturn = true;
                        }
                    }
                    else {
                        toReturn = true;
                    }
                }
            }
            else
                toReturn = false;
        }
        catch (error) {
            toReturn = false;
        }
        return toReturn;
    }

    $scope.ShowMessages = [];
    $scope.RefreshMessages = function () {
        $scope.ShowMessages = [];
        for (var mcounter in $scope.AllMessages) {
            if (moment(dateFormat(new Date(), 'mm/dd/yyyy')).isSame(moment($scope.AllMessages[mcounter].ExpirationDate)) == true || (moment($scope.AllMessages[mcounter].ExpirationDate).isBefore(moment(dateFormat(new Date(), 'mm/dd/yyyy')))) == false) {
                var msgToAdd = $scope.AllMessages[mcounter];
                msgToAdd.Id = mcounter;
                if (parseInt($scope.AllMessages[mcounter].AllowMessageToAll) == 1) {
                    if (msgToAdd.MessageText)
                        msgToAdd.ISMessageText = true;
                    else
                        msgToAdd.ISMessageText = false;
                    $scope.ShowMessages.push(msgToAdd);
                } else {
                    for (var i = 0; i < $scope.UserOrg.length; i++) {
                        if ($scope.AllMessages[mcounter].OrganisationId == $scope.UserOrg[i]) {
                            if (msgToAdd.MessageText)
                                msgToAdd.ISMessageText = true;
                            else
                                msgToAdd.ISMessageText = false;
                            $scope.ShowMessages.push(msgToAdd);
                        }
                    }
                }
            }
        }

        // $scope.$apply();

        return $scope.ShowMessages;
    }

    $scope.init = function () {
        $scope.user = storageService.getObject("CU");
        $scope.UserOrg = [];
        if ($scope.user) {
            firebase.database().ref('/Content/Messages').once('value', function (msgsnapshot) {
                $scope.AllMessages = msgsnapshot.val();
                firebase.database().ref('/horses').orderByChild("user_firebase_key").equalTo($scope.user.Details.$id).once("value", function (snapshot) {
                    var allhorses = snapshot.val();

                    //loop on all horses to find the organization
                    //Need to check - Pankaj
                    for (var prp in allhorses) {
                        var horse = allhorses[prp];
                        if (horse && horse.associations) {
                            for (var i in horse.associations) {
                                if (!_.contains($scope.UserOrg, horse.associations[i].filter)) {
                                    $scope.UserOrg.push(horse.associations[i].filter);
                                }
                            }
                        }
                    }

                    $rootScope.IsUnreadMessageExistForUser = false;
                    var msgList = $scope.RefreshMessages();
                    var isExist = $scope.IsUnreadMessageExistNew(msgList);
                    $rootScope.IsUnreadMessageExistForUser = isExist;

                });
            })
        }
    }


    $rootScope.IsUnreadMessageExistForUser = false;
    $scope.$on('messageLoad', function (event, args) {
        $scope.init();
    });

    $scope.$on('messageReadComplete', function (event, args) {
        $scope.init();
        $scope.$apply();
    });
});