app.controller('MessageController', function MyCtrl($http, $scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, Socialshare) {
    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.user = storageService.getObject("CU");
    if (!($scope.user)) {
        alert("Please Login to view the Messages");
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
            if (moment(dateFormat(new Date(), 'mm/dd/yyyy')).isSame(moment($scope.AllMessages[mcounter].ExpirationDate)) == true || (moment($scope.AllMessages[mcounter].ExpirationDate).isBefore(moment(dateFormat(new Date(), 'mm/dd/yyyy')))) == false) {
            var msgToAdd = $scope.AllMessages[mcounter];
            msgToAdd.Id = mcounter;
            if (parseInt($scope.AllMessages[mcounter].AllowMessageToAll)==1) {
                $scope.ShowMessages.push(msgToAdd);
            } else {
                for (var i = 0; i < $scope.UserOrg.length; i++) {
                    if ($scope.AllMessages[mcounter].OrganisationId == $scope.UserOrg[i]) {
                        $scope.ShowMessages.push(msgToAdd);
                        }
                    }
                }
            }
        }
       
       // $scope.$apply();

    }
    $scope.openLink = function (msg) {
       // window.location.href = url, '_blank';
       
        var a = msg.Id;
        firebase.database().ref('/Content/Messages/' + a).once('value', function (msgsnapshot) {
          // var uid = "sadsds";
           var msgObject = msgsnapshot.val();
           if (msgObject.ReadBy) {
               var findid = _.contains(msgObject.ReadBy, $scope.user.Details.$id);
               if (!findid) {
                   msgObject.ReadBy.push($scope.user.Details.$id);
                   //msgObject.Read = parseInt(msgObject.Read) + 1;
               }
           }
           else {
               msgObject.ReadBy = [$scope.user.Details.$id];
               //msgObject.Read = 1;
           }

           if (msgObject.ReadBy) {
               msgObject.Read = parseInt(msgObject.Read) + 1;
           } else
               msgObject.ReadBy = 1;

            //msgsnapshot.ref().update(msgObject);
           firebase.database().ref('/Content/Messages/' + a).set(msgObject);
            // firebase.database().ref().child('/Content/Messages/' + a).set(msgObject);
        });
        window.open(msg.Embeddedlink, '_blank');
    }
    $scope.AllMessages = [];
    $scope.UserOrg= [];            

    //var ref = firebaseService.FIREBASEENDPOINT();   
    $scope.messages = $firebaseArray(ref.child('Content').child('Messages'));
   //$scope.messages.$loaded().then(function (dataArray) {
    firebase.database().ref('/Content/Messages').on('value', function (msgsnapshot) {


        console.log(msgsnapshot.val());
        $scope.AllMessages = msgsnapshot.val();
        //$scope.messages = $scope.AllMessages;
       // $scope.$apply();
        $scope.RefreshMessages();
        for (var i in $scope.user.Details.horse_ids) {
            firebase.database().ref('/horses/' + i).on('value', function (snapshot) {
                var horse = snapshot.val();
                if (horse && horse.associations) {
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
