app.controller('MessageController', function MyCtrl($http, $scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, Socialshare) {
    var ref = firebaseService.FIREBASEENDPOINT();  
    $scope.user = storageService.getObject("CU");
    if (!($scope.user)) {
        alert("Please Login to view the Messages");
        return;
    }

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }
    $scope.ShowMessages = [];
    $scope.RefreshMessages = function () {
        $scope.ShowMessages = [];
       

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
       
        $scope.reverse = true;

    }
    $scope.openLink = function (msg) {
      
       
        var a = msg.Id;
        firebase.database().ref('/Content/Messages/' + a).once('value', function (msgsnapshot) {
         
           var msgObject = msgsnapshot.val();
           if (msgObject.ReadBy) {
               var findid = _.contains(msgObject.ReadBy, $scope.user.Details.$id);
               if (!findid) {
                   msgObject.ReadBy.push($scope.user.Details.$id);
                   
               }
           }
           else {
               msgObject.ReadBy = [$scope.user.Details.$id];
             
           }

           if (msgObject.ReadBy) {
               msgObject.Read = parseInt(msgObject.Read) + 1;
           } else
               msgObject.ReadBy = 1;

           
           firebase.database().ref('/Content/Messages/' + a).set(msgObject);
           
        });
        window.open(msg.Embeddedlink, '_blank');
    }
    $scope.AllMessages = [];
    $scope.UserOrg= [];            

    
    $scope.messages = $firebaseArray(ref.child('Content').child('Messages'));
  
    firebase.database().ref('/Content/Messages').on('value', function (msgsnapshot) {


       
        $scope.AllMessages = msgsnapshot.val();
       
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
