app.controller('MessageController', function MyCtrl($http, $scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, Socialshare) {
    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.user = storageService.getObject("CU");
    console.log("MessageController");

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }
    $scope.ShowMessages = [];
    $scope.RefreshMessages = function () {
        for(var i=0;i< $scope.UserOrg.length;i++)
        {
            var even = _.find($scope.AllMessages, function (num) { return num.OrganisationId == $scope.UserOrg[i]; });
            $scope.ShowMessages.push(even);
            $scope.$apply();
          
        }
    }
    
    $scope.AllMessages = [];
    $scope.UserOrg= [];

    var ref = firebaseService.FIREBASEENDPOINT();   
    $scope.messages = $firebaseArray(ref.child('Content').child('Messages'));
    $scope.messages.$loaded().then(function (dataArray) {

        console.log(dataArray);
        $scope.AllMessages = dataArray;
        $scope.$apply();
        
        for (var i in $scope.user.Details.horse_ids) {
            

            firebase.database().ref('/horses/' + i).on('value', function (snapshot) {
                var horse = snapshot.val();
                if (horse.associations)
                {
                    for (var i = 0; i < horse.associations.length; i++)
                    {
                        if (!_.contains($scope.UserOrg, horse.associations[i].filter))
                        {
                            $scope.UserOrg.push(horse.associations[i].filter);
                        }
                        
                    }
                    $scope.RefreshMessages();

                }
                

            })

        }
        

    }).catch(function (error) {
        console.log("Error in loading details");
    });




 

});
