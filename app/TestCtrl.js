app.controller('TestCtrl', function MyCtrl($scope, $location, $firebaseObject, firebaseService, $rootScope, $firebaseArray) {

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
                    $scope.Start(i + 1);

                }).catch(function (error) {
                    console.error('Upload failed:', error);
                });
            }
            else {
                $scope.Start(i + 1);
            }
        }
        else {
            $scope.Start(i + 1);
        }
    }

    $scope.HorseArrayData = [];
    $scope.ChangeHorseImages = function () {


        var ref = firebaseService.FIREBASEENDPOINT();
        $rootScope.appHorses = $firebaseArray(ref.child('horses'));
        $rootScope.appHorses.$loaded().then(function (dataArray) {

            debugger;
            $scope.HorseArrayData = dataArray;

            $scope.Start(0);



        });

    }

    debugger;
    $scope.ChangeHorseImages();

});