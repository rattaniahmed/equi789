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
                    // console.error('Upload failed:', error);
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

   // debugger;
   // $scope.ChangeHorseImages();

    $scope.DeleteRide = function (id) {

        $scope.ride = $scope.rides.$getRecord(id);
        $scope.rides.$remove($scope.ride).then(function (ref) {
            var id = ref.key();
            if ($scope.ride.$id == id) {
                // console.log("Deleted success fully");
            }
        });

    }


    $scope.DeleteNew = function () {
        firebase.database().ref('/rides/-KbaYmT2MaC_5IMiQwdv').set(null);
    }


    $scope.ChangeHorseImagesnew = function () {
        var ref = firebaseService.FIREBASEENDPOINT();
        $scope.rides = [];
        $scope.ridearray = [];
            $scope.horses = $firebaseArray(ref.child('horses'));
            $scope.horses.$loaded().then(function (dataArray) {
                $scope.Allhorse = dataArray;
                $scope.rides = $firebaseArray(ref.child('rides'));
                $scope.rides.$loaded().then(function (dataArray1) {
                    $scope.Allride = dataArray1;

                    for (var i = 0; i <= $scope.Allhorse.length; i++) {
                        try {
                            if ($scope.Allhorse[i] != undefined) {
                                var ids = Object.keys($scope.Allhorse[i].ride_ids);
                                if (ids.length > 0) {
                                    for (var j = 0; j < ids.length; j++) {
                                        $scope.ridearray.push({
                                            RideId: ids[j],
                                            HorseId: $scope.Allhorse[i].$id
                                        });
                                    }
                                }
                            }
                        }
                        catch (e) {
                            // console.log(e);
                        }
                    }
                    // console.log($scope.ridearray);
                    // console.log($scope.ridearray.length);
                    // console.log($scope.Allride);
                    // console.log($scope.Allride.length);
                    var finalArray = [];
                    for (var i = 0; i < $scope.Allride.length; i++) {
                        var rid = $scope.Allride[i];
                        var hid = $scope.getHorseId(rid, $scope.ridearray);
                        try {
                            var date = $scope.Allride.$getRecord(rid.$id).start_time;
                        } catch (err) {
                            // console.log(rid);
                        }
                        finalArray.push({ HID: hid, RID: rid.$id, DATE: date});
                    }

                    for (var counter = 0; counter < finalArray.length; counter++) {
                        if (finalArray[counter].HID == "-1") {
                            //$scope.DeleteRide("-Kk43pb4ZmECv1akbhWK");
                            firebase.database().ref('/rides/' + finalArray[counter].RID).set(null);
                        }
                    }

                    
                   // $scope.DeleteRide("-KbaYmT2MaC_5IMiQwdv");

                    //JSONToCSVConvertor(finalArray, "Final Report" + " " + new Date().toString('yyyyMMdd'), true);
                });
            });
    }

    $scope.getHorseId = function (rid, ridearray) {
        var boolean = -1;
        for (var k = 0; k < ridearray.length; k++) {
            if (ridearray[k].RideId == rid.$id) {
                boolean = ridearray[k].HorseId;
                break;
            }

        }
        return boolean;
    }
    

   

        




    //$scope.StartRide = function (i) {

    //    if (i > $scope.RideData.length)
    //        return;

    //    var ride = $scope.RideData[i];
    //    var str = ";base64,";
    //    if (ride && ride.photo) {
    //        if (ride.photo.indexOf(str) > 0) {

    //            var id = ride.$id;
    //            var pic = ride.photo.replace("data:image/jpeg;base64,", "");
    //            pic = pic.replace("data:image/png;base64,", "");
    //            var blob = b64toBlob(pic, "image/png");
    //            var metadata = {
    //                'contentType': blob.type
    //            };

    //            var fname = generateUniqueID() + ".jpg";
    //            var storageRef = firebase.storage().ref();
    //            storageRef.child('horses/' + fname).put(blob, metadata).then(function (snapshot) {
    //                var url = snapshot.metadata.downloadURLs[0];



    //                firebase.database().ref('/horses/' + id + '/photo').set(url);
    //                $scope.Start(i + 1);

    //            }).catch(function (error) {
    //                // console.error('Upload failed:', error);
    //            });
    //        }
    //        else {
    //            $scope.Start(i + 1);
    //        }
    //    }
    //    else {
    //        $scope.Start(i + 1);
    //    }
    //}
    //$scope.RideData = [];
    //$scope.ChangeRideData = function () {


    //    var ref = firebaseService.FIREBASEENDPOINT();
    //    $rootScope.appHorses = $firebaseArray(ref.child('rides'));
    //    $rootScope.appHorses.$loaded().then(function (dataArray) {

    //        debugger;
    //        $scope.RideData = dataArray;

    //        $scope.Start(0);



    //    });

    //}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //$scope.StartRideCord = function (i) {

    //    //if (i > $scope.RideData.length)
    //    //    return;

    //    //var ride = $scope.RideData[i];
    //    //var str = ";base64,";
    //    //if (ride && ride.photo) {
    //    //    if (ride.photo.indexOf(str) > 0) {

    //    //        var id = ride.$id;
    //    //        var pic = ride.photo.replace("data:image/jpeg;base64,", "");
    //    //        pic = pic.replace("data:image/png;base64,", "");
    //    //        var blob = b64toBlob(pic, "image/png");
    //    //        var metadata = {
    //    //            'contentType': blob.type
    //    //        };

    //    //        var fname = generateUniqueID() + ".jpg";
    //    //        var storageRef = firebase.storage().ref();
    //    //        storageRef.child('horses/' + fname).put(blob, metadata).then(function (snapshot) {
    //    //            var url = snapshot.metadata.downloadURLs[0];



    //    //            firebase.database().ref('/horses/' + id + '/photo').set(url);
    //    //            $scope.Start(i + 1);

    //    //        }).catch(function (error) {
    //    //            // console.error('Upload failed:', error);
    //    //        });
    //    //    }
    //    //    else {
    //    //        $scope.Start(i + 1);
    //    //    }
    //    //}
    //    //else {
    //    //    $scope.Start(i + 1);
    //    //}
    //}


    //$scope.StartUpdateRide = function () {

    //}

    //$scope.updateRide = function (rideId) {
    //    //var rideId = "-KbnP4EcoYDiqQxFVolC";
    //    var rideRef = $rootScope.appHorses.$getRecord(rideId);
    //    var coord = $scope.coords.$getRecord(rideId);
    //    if (coord) {
    //        if (rideRef && (!(rideRef.start_cord))) {
    //            var len = coord.length;
    //            var start_cord = { lat: coord[0].lat, lng: coord[0].lng }
    //            var end_cord = { lat: coord[len - 1].lat, lng: coord[len - 1].lng }
    //            var coords = true;
    //            // console.log(rideId);
    //            firebase.database().ref('/rides/' + rideId + '/start_cord').set(start_cord);
    //            firebase.database().ref('/rides/' + rideId + '/end_cord').set(end_cord);
    //            firebase.database().ref('/rides/' + rideId + '/coords').set(coords);
    //        }
    //    }
    //}

    //$scope.ChangeRideData = function () {
    //    var ref = firebaseService.FIREBASEENDPOINT();
    //    $rootScope.appHorses = $firebaseArray(ref.child('rides'));
    //    $rootScope.appHorses.$loaded().then(function (ridedataArray) {
    //        $scope.coords = $firebaseArray(ref.child('coords'));
    //        $scope.coords.$loaded().then(function (corddataArray) {

    //            debugger;

    //            $scope.RideData = ridedataArray;
    //            $scope.CordData = corddataArray;

    //            //$scope.Start(0);

                
    //            for (var rcounter = 0; rcounter < $scope.RideData.length; rcounter++) {
    //                var rideId = $scope.RideData[rcounter].$id;
    //                $scope.updateRide(rideId);
    //                //// console.log("UPdated ride - " + rideId);
    //            }
    //        });

    //    });
    //}
    //debugger;
    //$scope.ChangeRideData();

});

//app.controller('TestCtrl', function MyCtrl($scope, $location, $firebaseObject, firebaseService, $rootScope, $firebaseArray) {
//    $scope.ChangeHorseImages = function () {
//        var ref = firebaseService.FIREBASEENDPOINT();
//       // $scope.users = $firebaseArray(ref.child('users'));
//        //$scope.users.$loaded().then(function (dataArray) {

//           // $scope.AllDBUsers = dataArray;
//        $scope.ridearray = [];
//            $scope.horses = $firebaseArray(ref.child('horses'));
//            $scope.horses.$loaded().then(function (dataArray) {
//                $scope.Allhorse = dataArray;
//                $scope.rides = $firebaseArray(ref.child('rides'));
//                $scope.rides.$loaded().then(function (dataArray1) {
//                    $scope.Allride = dataArray1;

//                    for (var i = 0; i <= $scope.Allhorse.length; i++) {
//                        try {
//                            if ($scope.Allhorse[i] != undefined) {
//                                var ids = Object.keys($scope.Allhorse[i].ride_ids);
//                                if (ids.length > 0) {
//                                    for (var j = 0; j < ids.length; j++) {
//                                        $scope.ridearray.push({
//                                            RideId: ids[j],
//                                            HorseId: $scope.Allhorse[i].$id
//                                        });
//                                    }
//                                }
//                            }
//                        }
//                        catch (e) {
//                            // console.log(e);
//                        }
//                    }

//                    // console.log($scope.ridearray);
//                    // console.log($scope.ridearray.length);
//                    // console.log($scope.Allride);
//                    // console.log($scope.Allride.length);


//                    var finalArray = [];
//                    for (var i = 0; i < $scope.Allride.length; i++) {
//                        var rid = $scope.Allride[i];
//                        var hid = $scope.getHorseId(rid, $scope.ridearray);
//                        try {
//                            var date = $scope.Allride.$getRecord(rid.$id).start_time;
//                        } catch (err) {
//                            // console.log(rid);
//                        }
//                        finalArray.push({ HID: hid, RID: rid.$id, DATE: date});
//                    }

         
//                    JSONToCSVConvertor(finalArray, "Final Report" + " " + new Date().toString('yyyyMMdd'), true);









//                });



//            });

            
            
               
//           // $getRecord(rideId)
//       // });
//    }

//    $scope.getHorseId = function (rid, ridearray) {
//        var boolean = -1;
//        for (var k = 0; k < ridearray.length; k++) {
//            if (ridearray[k].RideId == rid.$id) {
//                boolean = ridearray[k].HorseId;
//                break;
//            }

//        }
//        return boolean;
//    }
//    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
//        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
//        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

//        var CSV = '';
//        //Set Report title in first row or line

//        //CSV += ReportTitle + '\r\n\n';

//        //This condition will generate the Label/Header
//        if (ShowLabel) {
//            var row = "";

//            //This loop will extract the label from 1st index of on array
//            for (var index in arrData[0]) {
//                //var column_name = replace_columnName(index);
//                //Now convert each value to string and comma-seprated
//                row += index + ',';
//            }

//            row = row.slice(0, -1);

//            //append Label row with line break
//            CSV += row + '\r\n';
//        }

//        //1st loop is to extract each row
//        for (var i = 0; i < arrData.length; i++) {
//            var row = "";

//            //2nd loop will extract each column and convert it in string comma-seprated
//            for (var index in arrData[i]) {
//                row += '"' + arrData[i][index] + '",';
//            }

//            row.slice(0, row.length - 1);

//            //add a line break after each row
//            CSV += row + '\r\n';
//        }

//        if (CSV == '') {
//            alert("Invalid data");
//            return;
//        }

//        //Generate a file name
//        var fileName = "Equitrack_";
//        //this will remove the blank-spaces from the title and replace it with an underscore
//        fileName += ReportTitle.replace(/ /g, "_");

//        //Initialize file format you want csv or xls
//        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

//        // Now the little tricky part.
//        // you can use either>> window.open(uri);
//        // but this will not work in some browsers
//        // or you will not get the correct file extension    

//        //this trick will generate a temp <a /> tag
//        var link = document.createElement("a");
//        link.href = uri;

//        //set the visibility hidden so it will not effect on your web-layout
//        link.style = "visibility:hidden";
//        link.download = fileName + ".csv";

//        //this part will append the anchor tag and remove it after automatic click
//        document.body.appendChild(link);
//        link.click();
//        document.body.removeChild(link);
//    }
//});



