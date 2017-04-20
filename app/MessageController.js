app.controller('MessageController', function MyCtrl($http, $scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, Socialshare, $rootScope) {
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

     //| orderBy:i.ExpirationDate:reverse"
    $scope.markRead = function (msgId) {

        console.log("adding read by");

        firebase.database().ref('/Content/Messages/' + msgId).once('value', function (msgsnapshot) {

            var msgObject = msgsnapshot.val();
            if (msgObject.ReadBy) {
                var findid = _.contains(msgObject.ReadBy, $scope.user.Details.$id);
                if (!findid) {
                    msgObject.ReadBy.push($scope.user.Details.$id);
                    firebase.database().ref('/Content/Messages/' + msgId).set(msgObject);
                }
            }
            else {
                msgObject.ReadBy = [$scope.user.Details.$id];
                firebase.database().ref('/Content/Messages/' + msgId).set(msgObject);
            }
        });
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
        $scope.reverse = true;

        $scope.ShowMessages.sort(function (a, b) {
            var ad = new Date(b.ExpirationDate);
            var bd = new Date(a.ExpirationDate);

            if (ad == bd)
                return 1;
            else if (ad > bd)
                return 0;
            else
                return 1;

            return parseFloat(a.price) - parseFloat(b.price);
        });

        $scope.$apply();
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

    $scope.init = function () {
        firebase.database().ref('/Content/Messages').once('value', function (msgsnapshot) {
            $scope.AllMessages = msgsnapshot.val();
            //$scope.RefreshMessages();

            var hosCounter = 0;
            var hosLength = 0;
            try {
                hosLength = Object.keys($scope.user.Details.horse_ids).length;
            } catch (errrrr) {
                hosLength = 0;
            }

            for (var i in $scope.user.Details.horse_ids) {
                firebase.database().ref('/horses/' + i).on('value', function (snapshot) {
                    var horse = snapshot.val();
                    if (horse && horse.associations) {
                        for (var i = 0; i < horse.associations.length; i++) {
                            if (!_.contains($scope.UserOrg, horse.associations[i].filter)) {
                                $scope.UserOrg.push(horse.associations[i].filter);
                            }
                        }
                    }
                    hosCounter++;
                    if (hosCounter == hosLength) {
                        $rootScope.IsUnreadMessageExistForUser = false;
                        $scope.RefreshMessages();
                        for (var msgCounter = 0; msgCounter < $scope.ShowMessages.length; msgCounter++) {
                            $scope.markRead($scope.ShowMessages[msgCounter].Id);
                        }
                        //$rootScope.$broadcast("messageReadComplete", {});
                        //console.log($scope.ShowMessages);
                    }
                })
            }
        })
    }

    $scope.init();

    $scope.$on('messageLoad', function (event, args) {
        $scope.init();
    });

    //this code for change in database in horse image remove 

    /*

    $scope.Start = function (i) {

        if (i > $scope.HorseArrayData.length)
            return;

        var horse = $scope.HorseArrayData[i]; 
        var str = ";base64,";
        if (horse && horse.photo) {
            if (horse.photo.indexOf(str) > 0) {
               
                var id = horse.$id;
                var pic = horse.photo.replace("data:image/jpeg;base64,", "");
                pic = pic.replace("data:image/png;base64,", "");
                var blob = b64toBlob(pic, "image/png");
                var metadata = {
                    'contentType': blob.type
                };

                var fname = generateUniqueID() + ".jpg";
                var storageRef = firebase.storage().ref();
                storageRef.child('horses/' + fname).put(blob, metadata).then(function (snapshot) {
                    var url = snapshot.metadata.downloadURLs[0];

                   

                    firebase.database().ref('/horses/' + id + '/photo').set(url);
                    $scope.Start(i+1);

                }).catch(function (error) {
                    console.error('Upload failed:', error);
                });
            }
            else{
                $scope.Start(i+1);
            }
        }
        else{
            $scope.Start(i+1);
        }
    }


    

    $scope.HorseArrayData= [];
    $scope.ChangeHorseImages = function () {

        
        var ref = firebaseService.FIREBASEENDPOINT();
        $rootScope.appHorses = $firebaseArray(ref.child('horses'));
        $rootScope.appHorses.$loaded().then(function (dataArray) {
            
            debugger;
            $scope.HorseArrayData = dataArray;

            $scope.Start(0);

            
            
        });

    }

    $scope.ChangeHorseImages();
    */

});
