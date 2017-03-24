app.controller('MessageController', function MyCtrl($http, $scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, Socialshare) {
    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.user = storageService.getObject("CU");
    if (!($scope.user)) {
        alert("Please Login for showing Messages");
        return;
    }
    console.log("MessageController");

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }
    $scope.ShowMessages = [];
    $scope.RefreshMessages = function () {
        $scope.ShowMessages = [];
        //for (var i = 0; i < $scope.UserOrg.length; i++) {
        for (var mcounter in $scope.AllMessages) {
           // for (var mcounter = 0; mcounter < $scope.AllMessages.length; mcounter++) {
            if ($scope.AllMessages[mcounter].AllowMessageToAll) {
                $scope.ShowMessages.push($scope.AllMessages[mcounter]);
                } else {
                    for (var i = 0; i < $scope.UserOrg.length; i++) {
                        if ($scope.AllMessages[mcounter].OrganisationId == $scope.UserOrg[i])
                            $scope.ShowMessages.push($scope.AllMessages[mcounter]);
                    }
                }
            }
        //}
        $scope.$apply();
    }
    
    $scope.AllMessages = [];
    $scope.UserOrg= [];

    var ref = firebaseService.FIREBASEENDPOINT();   
    $scope.messages = $firebaseArray(ref.child('Content').child('Messages'));
   // $scope.messages.$loaded().then(function (dataArray) {
    firebase.database().ref('/Content/Messages').on('value', function (msgsnapshot) {

        console.log(msgsnapshot.val());
        $scope.AllMessages = msgsnapshot.val();
        $scope.$apply();
        $scope.RefreshMessages();
        for (var i in $scope.user.Details.horse_ids) {
            firebase.database().ref('/horses/' + i).on('value', function (snapshot) {
                var horse = snapshot.val();
                if (horse.associations) {
                    for (var i = 0; i < horse.associations.length; i++) {
                        if (!_.contains($scope.UserOrg, horse.associations[i].filter)) {
                            $scope.UserOrg.push(horse.associations[i].filter);
                        }

                    }
                    $scope.RefreshMessages();

                }


            })
        }
    })

});
