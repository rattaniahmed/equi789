﻿
app.controller('AccountController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, $http) {

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.users = $firebaseArray(ref.child('users'));

    $scope.SendMail = function (email) {

        var TO = email;
        //TO = "vishal.kumar1145@gmail.com";

        var Subject = "Welcome message from Equitrack.com";
        var html = "Thanks for joining us. You can contibue login at Equitrack.com"

        //html += "<br/><br/><br/>";

        //html += "<table>"
        //html += "<tr>      <td>First Name :- </td>  <td> " + ReplaceNull($scope.first_name) + "</td>        </tr>"
        //html += "<tr>      <td>Last Name :- </td>  <td> " + ReplaceNull($scope.last_name) + "</td>        </tr>"
        //html += "<tr>      <td>Email :- </td>  <td> " + ReplaceNull($scope.email) + "</td>        </tr>"
        //html += "<tr>      <td>Mobile :- </td>  <td> " + ReplaceNull($scope.mobile) + "</td>        </tr>"
        //html += "<tr>      <td>Message :- </td>  <td> " + ReplaceNull($scope.msg) + "</td>        </tr>"
        //html += "</table>"

        //html += "<br/><br/><br/>";

        //html += "Equitrack Team</br>"


        //var inputData = PrepareRequestForMail("TEST", TO, "", "", Subject, html, "");


        //var url = 'https://plucky-vision-140010.appspot.com/sendmail?To=' + TO + '&Subject=' + Subject + '&HTML=' + html;
        var url = storageService.getNodeJSAppURL() + 'sendmail?To=' + TO + '&Subject=' + Subject + '&HTML=' + html;

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });

    }


    //$scope.tempLogin = function () {

    //    var uid = 'b8a5ed1c-8ff9-49b9-a229-49a2b98b7af0';
    //    var authData = null;
    //    var user = $scope.users.$getRecord(uid);
    //    user.profile = CleanProfileUrl('');
    //    var obj = {
    //        Auth: authData,
    //        Details: user
    //    };
    //    storageService.setObject("CU", obj);
    //    $scope.$apply(function () {
    //        $location.path('dashboard.html');
    //    });


    //}



    $scope.login = function () {

        if (!ValidateControl(['email', 'password']))
            return;
        else {
            blockUI.start("Validation in progress");
            var ref = firebaseService.FIREBASEENDPOINT();
            ref.authWithPassword({
                email: $scope.email,
                password: $scope.password
            }, function (error, authData) {
                $scope.$apply(function () {
                    blockUI.stop();
                });
                if (error) {
                    swal({ title: "", text: "Invalid user name and password. Please try again", imageUrl: "bower_components/sweetalert/example/images/wrong.png" });
                    //console.log("Login Failed!", error);
                } else {

                    var user = $scope.users.$getRecord(authData.uid);
                    user.profile = CleanProfileUrl(user.profile);
                    var obj = {
                        Auth: authData,
                        Details: user
                    };
                    storageService.setObject("CU", obj);

                    swal("", "You have successfully logged in.  You are now being redirected to your dashboard.", "success");
                    $scope.$apply(function () {
                        $scope.$parent.UpdateLoggedStatus();
                        $location.path('dashboard.html');
                    });
                }
            });
        }
    }
   
    $scope.reset = function () {

        //if (!ValidateControl(['email']))
        //    return;
        //else {
            blockUI.start("Sending password");
            //$location.path('login.html');
            //console.log($scope.users);

            ref.resetPassword({
                email: $scope.email
            }, function (error) {
                $scope.$apply(function () {
                    blockUI.stop();
                });
                if (error === null) {
                    swal("", "Password reset email sent successfully", "success")
                    $scope.$apply(function () {
                        $location.path('login.html');
                    });
                } else {
                    console.log(error);
                    swal({ title: "", text: "Error sending password reset email:", imageUrl: "bower_components/sweetalert/example/images/wrong.png" });
                }
            });
        //}
    }

    $scope.createUser = function () {

        if (!ValidateControl(['first_name', 'last_name', 'email', 'display_name', 'password','repeat_password']))
            return;
        else {
            blockUI.start("Checking existing users");

            ref.createUser({
                email: $scope.email,
                password: $scope.password
                //first_name: ReplaceNull(first_name),
                //last_name: ReplaceNull(last_name),
                //display_name: ReplaceNull(display_name)
            }, function (error, userData) {
                if (error) {
                    $scope.$apply(function () {
                        blockUI.stop();
                    });
                    swal({ title: "Error !!!", text: error.message, imageUrl: "bower_components/sweetalert/example/images/wrong.png" });
                } else {
                    $scope.$apply(function () {
                        blockUI.message('Creating user ...');
                    });

                    var user = {
                        first_name: ReplaceNull($scope.first_name),
                        last_name: ReplaceNull($scope.last_name),
                        email: ReplaceNull($scope.email),
                        display_name: ReplaceNull($scope.display_name),
                        profile: CleanProfileUrl('')
                    }
                    console.log(user);
                    console.log(userData);
                    ref.child('users').child(userData.uid).set({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        display_name: user.display_name,
                        profile: user.profile
                    });

                    $scope.SendMail($scope.email);

                    var ref1 = firebaseService.FIREBASEENDPOINT();
                    ref1.authWithPassword({
                        email: $scope.email,
                        password: $scope.password
                    }, function (error, authData) {
                        $scope.$apply(function () {
                            blockUI.stop();
                        });
                        if (error) {
                            //swal({ title: "", text: "Invalid user name and password. Please try again", imageUrl: "bower_components/sweetalert/example/images/wrong.png" });
                            //console.log("Login Failed!", error);
                            var obj = {
                                Auth: userData,
                                Details: user
                            };
                            storageService.setObject("CU", obj);
                            //swal("", "You have success fully logged In, You being redirect to dashboard.", "success");
                            $scope.$apply(function () {
                                $location.path('dashboard.html');
                            });
                        } else {
                            var user1 = $scope.users.$getRecord(authData.uid);
                            var obj = {
                                Auth: userData,
                                Details: user1
                            };
                            storageService.setObject("CU", obj);
                            //swal("", "You have success fully logged In, You being redirect to dashboard.", "success");
                            $scope.$apply(function () {
                                $location.path('dashboard.html');
                            });
                        }
                    });


                    console.log("Successfully created user account with uid:", userData.uid);
                }
            });
        }
    }

});

app.controller('SettingsController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, $rootScope) {

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.users = $firebaseArray(ref.child('users'));

    $scope.aedit = false;
    $scope.sedit = false;
    $scope.ImageUploaded = false;

    $scope.user = storageService.getObject("CU");
    if ($scope.user == null)
        $location.path('/');

    console.log($scope.user);

   
    $scope.UpdateMode = function (type) {
        if (type == 1) {
            if ($scope.aedit) {
                console.log("in update code");

                blockUI.start("Updating profile...");

                var userRef = $scope.users.$getRecord($scope.user.Auth.uid);
                userRef.first_name = ReplaceNull($scope.user.Details.first_name);
                userRef.last_name = ReplaceNull($scope.user.Details.last_name);
                userRef.display_name = ReplaceNull($scope.user.Details.display_name);
                userRef.birthday = ReplaceNull($scope.user.Details.birthday);
                userRef.location = ReplaceNull($scope.user.Details.location);
                userRef.passion = ReplaceNull($scope.user.Details.passion);

                if ($scope.ImageUploaded) {

                    //$scope.$apply(function () {
                    //    blockUI.message('Uploading profile image ...');
                    //});

                    var file = document.getElementById('fileInput').files[0];
                    var metadata = {
                        'contentType': file.type
                    };

                    var fname = $scope.user.Auth.uid + '.png';
                    var storageRef = firebase.storage().ref();

                    storageRef.child('profile/' + fname).put(file, metadata).then(function (snapshot) {
                        userRef.profile = snapshot.metadata.downloadURLs[0];

                        $scope.users.$save(userRef).then(function (res) {
                            $scope.user.Details.profile = userRef.profile;
                        });

                        $scope.aedit = !$scope.aedit;

                        $scope.$apply(function () {
                            blockUI.stop();
                        });

                    }).catch(function (error) {
                        // [START onfailure]
                        console.error('Upload failed:', error);
                        // [END onfailure]

                        $scope.$apply(function () {
                            blockUI.stop();
                        });
                    });
                }
                else {
                    $scope.users.$save(userRef).then(function (res) {
                    });

                    $scope.aedit = !$scope.aedit;

                    $scope.$apply(function () {
                        blockUI.stop();
                    });


                }




            }
            else
                $scope.aedit = !$scope.aedit;
        }
        if (type == 2) {
            if ($scope.sedit) {

                blockUI.start("Updating password .....");
                var ref = firebaseService.FIREBASEENDPOINT();
                ref.changePassword({
                    email: $scope.user.Auth.password.email,
                    oldPassword: ReplaceNull($scope.oldpassword),
                    newPassword: ReplaceNull($scope.newpassword)
                }, function (error) {
                    $scope.$apply(function () {
                        blockUI.stop();
                    });
                    if (error) {
                        switch (error.code) {
                            case "INVALID_PASSWORD":
                                swal({ title: "", text: "The specified user account password is incorrect.", imageUrl: "bower_components/sweetalert/example/images/wrong.png" });
                                break;
                            case "INVALID_USER":
                                swal({ title: "", text: "The specified user account does not exist.", imageUrl: "bower_components/sweetalert/example/images/wrong.png" });
                                break;
                            default:
                                swal({ title: "", text: "Error changing password:", imageUrl: "bower_components/sweetalert/example/images/wrong.png" });
                        }
                    } else {
                        swal("", "User password changed successfully!", "success");
                    }
                });
            }
            else
                $scope.sedit = !$scope.sedit;
        }
    }

    $scope.UploadPhoto = function () {
        document.getElementById('fileInput').click()
        $scope.ImageUploaded = true;
    }

    console.log($rootScope.appHorses);

    $scope.$on('horseRefEvent', function (event, data) {
        console.log(event);
        console.log(data);
    });
});

app.controller('StableController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    sessionService.CHECKSESSION();
    

    $scope.user = storageService.getObject("CU");

    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.users = $firebaseArray(ref.child('users'));
    $scope.users.$loaded().then(function (dataArray) {
        var user = $scope.users.$getRecord($scope.user.Auth.uid);
        user.profile = CleanProfileUrl(user.profile);
        var obj = {
            Auth: $scope.user.Auth,
            Details: user
        };
        $scope.user = obj;
        storageService.setObject("CU", obj);
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    console.log($scope.user);

    $scope.stables = [];

    $scope.loadingcord = true;
    $scope.ZeroStable = false;

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    //$scope.users = $firebaseArray(ref.child('users'));
    $scope.horses = $firebaseArray(ref.child('horses'));
    $scope.horses.$loaded().then(function (dataArray) {
        $scope.loadingcord = false;

        angular.forEach($scope.user.Details.horse_ids, function (value, key) {
            //console.log(value);

            console.log(key);
            var horse = $scope.horses.$getRecord(key);
            if (horse != null) {
                horse.photo = CleanHorseProfileUrl(horse.photo);


                try {
                    var today = new Date();
                    var d = new Date(horse.birthday);
                    if (Object.prototype.toString.call(d) === "[object Date]") {
                        // it is a date
                        if (isNaN(d.getTime())) {  // d.valueOf() could also work
                        }
                        else {
                            var diff = today - d;
                            var days = parseInt(diff / 1000 / 60 / 60 / 24 );
                            console.log(days);
                             
                            var year = parseInt(days / 365);


                            if (year == 1)
                                horse.AgeToDisplay = "1 year, ";
                            else
                                horse.AgeToDisplay = year + " years, ";

                            var remainDay = parseInt(days % 365);

                            var month = parseInt(remainDay / 30);

                            if (month == 1)
                                horse.AgeToDisplay += "1 month ";
                            else
                                horse.AgeToDisplay += month + " months ";

                            //horse.AgeToDisplay += "old";
                        }
                    }
                    else {
                        // not a date
                    }
                }
                catch (err) { }


                $scope.stables.push(horse);
            }

            console.log(horse);
        });

        if ($scope.stables.length == 0) {
            $scope.ZeroStable = true;
        }

    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $scope.selectedStable = null;
    $scope.rideDetail = function (stb) {
        storageService.setObject("CS", stb); //$scope.selectedStable = stb;
    }

    $scope.DeleteHorse = function (stb) {

        swal({
            title: "Are you sure?", text: "This horse will be deleted from the web and all devices, do you wish to continue!",
            type: "warning", showCancelButton: true,
            confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {

            blockUI.start("Removing horse.....");
            $scope.horses.$remove(stb).then(function (ref) {
                var id = ref.key();
                if(stb.$id == id){
                    console.log("Deleted success fully");
                }
                //console.log("added record with id " + id);               
                //$location.path('my-stable.html');

                //$scope.user.Details.horse_ids[id] = {
                //    created_at: ""
                //};

                delete $scope.user.Details.horse_ids[id];

                //$scope.user.Details.horse_ids.push(id);
                storageService.setObject("CU",$scope.user);

                var userRef = $scope.users.$getRecord($scope.user.Auth.uid);
                //userRef.horse_ids[id] = {
                //    created_at: ""
                //};

                delete userRef.horse_ids[id];

                $scope.users.$save(userRef).then(function (res) {
                    window.location.reload();

                    console.log(res);
                    //$scope.user.Details.profile = userRef.profile;
                    $scope.$apply(function () {
                        blockUI.stop();
                    });

                   
                });


                swal("", "Your horse has been removed success fully", "success");


            });
            
            //swal("Deleted!", "Your imaginary file has been deleted.", "success");
        });

    }

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }


});

app.controller('StableDetailsController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {

    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");
    
    $scope.stb = storageService.getObject("CS");
    $scope.AgeToDisplay = "" ; // 7 year old";

    try{

        var today = new Date();
        var d = new Date($scope.stb.birthday);

        if (Object.prototype.toString.call(d) === "[object Date]") {
            // it is a date
            if (isNaN(d.getTime())) {  // d.valueOf() could also work
                // date is not valid
            }
            else {
                
                var diff = today - d;
                var days = parseInt(diff / 1000 / 60 / 60 / 24);
                console.log(days);

                var year = parseInt(days / 365);


                if (year == 1)
                    $scope.AgeToDisplay = "1 year, ";
                else
                    $scope.AgeToDisplay = year + " years, ";

                var remainDay = parseInt(days % 365);

                var month = parseInt(remainDay / 30);

                if (month == 1)
                    $scope.AgeToDisplay += "1 month ";
                else
                    $scope.AgeToDisplay += month + " months ";

                //$scope.AgeToDisplay += "old";

            }
        }
        else {
            // not a date
        }


    }
    catch (err) {

    }

    for (var i = 0 ; i < 4; i++) {
        try {
            if (IsNull($scope.stb.associations[i].name))
                $scope.stb.associations[i].name = "";

        }
        catch (err) {
            $scope.stb.associations[i].name = "";
        }

        try {
            if (IsNull($scope.stb.associations[i].number))
                $scope.stb.associations[i].number = "";

        }
        catch (err) {
            $scope.stb.associations[i].number = "";
        }
    }

    $scope.OpenAddRidePopup = function () {
        console.log("using this");
        $("#add_ride").modal();
        $('#StartRide').datetimepicker();
        $('#EndRide').datetimepicker();

    }// = "#add_ride"
    $scope.CloseAddRideModal = function () {
        $("#add_ride").hide();
    }

    $scope.totalRidesDetails = [];
    $scope.totalLength = 0;
    $scope.totalDistance = 0.0;
    $scope.totalDuration = 0;
    $scope.totalEnergy = 0;
    $scope.totalCalories = 0;
    $scope.totalAverageSpeed = 0.0;
    $scope.totalTopSspeed = 0;



    $scope.ShareObject = null;

    $scope.SocialShare = function () {

        if ($scope.IsRideExist) {
            FB.ui($scope.ShareObject, function (response) {
                console.log(response);
            });
        }
        else {
            alert("No ride details exist for sharing");
        }

    }

    $scope.IsRideExist = false;

    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.rides.$loaded().then(function (dataArray) {
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id

       
        var totalTopSspeed = [];
        var averageSpeed = 0.0;
        for (var id in $scope.stb.ride_ids) {
            var ride = $scope.rides.$getRecord(id);
            //$scope.totalRidesDetails.push(ride);

            if (ride != null) {

                $scope.IsRideExist = true;

                $scope.totalLength = $scope.totalLength + 1;
                $scope.totalDistance = parseFloat($scope.totalDistance) + parseFloat(ride.total_distance);
                $scope.totalDuration = parseInt($scope.totalDuration) + parseInt(ride.total_time);
                $scope.totalEnergy = parseFloat($scope.totalEnergy) + parseFloat(ride.energy);
                $scope.totalCalories = parseFloat($scope.totalCalories) + parseFloat(ride.calories);
                //$scope.totalAverageSpeed = $scope.totalAverageSpeed + ride.average_speed;
                //$scope.totalTopSspeed = $scope.totalTopSspeed + ride.top_speed;
                averageSpeed = parseFloat(averageSpeed) + parseFloat(ride.average_speed);
                totalTopSspeed.push(parseFloat(ride.top_speed));

                

            }
        }

        $scope.totalDistance = parseFloat(Math.round($scope.totalDistance * 100) / 100).toFixed(2); 
        $scope.totalEnergy = parseFloat(Math.round($scope.totalEnergy * 100) / 100).toFixed(2);
        $scope.totalCalories = parseFloat(Math.round($scope.totalCalories * 100) / 100).toFixed(2);

        $scope.totalAverageSpeed = averageSpeed / $scope.totalLength;

        $scope.totalAverageSpeed = parseFloat(Math.round($scope.totalAverageSpeed * 100) / 100).toFixed(2);

        $scope.totalDuration = hhmmss($scope.totalDuration);

        $scope.totalTopSspeed = Math.max.apply(Math, totalTopSspeed);

        $scope.totalTopSspeed = parseFloat(Math.round($scope.totalTopSspeed * 100) / 100).toFixed(2);


        debugger;
        var horse = $scope.stb;
        var pic = $scope.stb.photo;
        if ($scope.stb.photo.indexOf("horsePlaceHolder") >= 0)
        {
            pic = "https://myequitrack.com/" + pic;

            var obj = {
                method: 'feed',
                title: "I rode " + horse.horse_name + " for " + hhmmss2($scope.totalDuration) + " and covered " + $scope.totalDistance + " miles at an average speed of " + $scope.totalAverageSpeed,
                link: 'https://myequitrack.com/',
                caption: 'https://myequitrack.com/',
                picture: pic,
                description: "Find more details on www.myequitrack.com"
            }

            $scope.ShareObject = obj;

        }
        else
        {
            pic = $scope.stb.photo.replace("data:image/jpeg;base64,", "");
            var blob = b64toBlob(pic, "image/png");
            var metadata = {
                'contentType': blob.type
            };

            var fname = Math.random().toString(36).substring(7) + ".jpg";// +file.name.substring(file.name.indexOf("."));
            var storageRef = firebase.storage().ref();
            storageRef.child('shares/' + fname).put(blob, metadata).then(function (snapshot) {
                debugger;
                var url = snapshot.metadata.downloadURLs[0];
                console.log(url)

                pic = url;

                var obj = {
                    method: 'feed',
                    title: "I rode " + horse.horse_name + " for " + hhmmss2($scope.totalDuration) + " and covered " + $scope.totalDistance + " miles at an average speed of " + $scope.totalAverageSpeed,
                    link: 'https://myequitrack.com/',
                    caption: 'https://myequitrack.com/',
                    picture: pic,
                    description: "Find more details on www.myequitrack.com"
                }

            }).catch(function (error) {
                console.error('Upload failed:', error);
            });

        }
            
       

    }).catch(function (err) {

    });

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }


    $scope.MoveToLastRide = function () {
        if ($scope.IsRideExist)
            $location.path('last-ride.html');
        else
            alert("No ride exist for this horse");
    }

    $scope.markers = [];
    function addMarker(location) {
        if ($scope.markers.length == 2) {
            alert("you can set only start and end marers , to change the position , double click on previous marker to delete");
        }
        else {

            var iconurl = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";

            if ($scope.markers.length == 1) {
                var marker = $scope.markers[0];
                if (marker.icon == iconurl)
                    iconurl = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
            }


            var marker = new google.maps.Marker({
                icon: iconurl,
                position: location,
                map: $scope.map
            });

            $scope.markers.push(marker);

            marker.addListener("dblclick", function () {


                var indexToRemove = -1;
                for (var m = 0 ; m < $scope.markers.length; m++) {
                    var mt = $scope.markers[m];
                    if (marker.position.lat() == mt.position.lat() && marker.position.lng() == mt.position.lng()) {
                        indexToRemove = m;
                    }
                }
                $scope.markers.splice(indexToRemove, 1);

                console.log($scope.markers);

                marker.setMap(null);

            });


        }
    }

    $scope.StartMap = function (lat, lng ) {

        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: lat, lng: lng },
            zoom: 14,
            mapTypeId: 'terrain'
        });

        $scope.map = map;

        $scope.map.addListener('click', function (event) {
            addMarker(event.latLng);
        });

    }

    $scope.initMap = function () {


        var lat = 31.968599;
        var lng = -99.901813;

        navigator.geolocation.getCurrentPosition(function (pos) {
            $scope.StartMap(pos.coords.latitude, lng = pos.coords.longitude);
        }, function () {
            $scope.StartMap(lat, lng);
        }, {
            maximumAge: 0,
            frequency: 3000,
            enableHighAccurancy: true
        });

        


    }

    $scope.initMap();

    

});

app.controller('EditStableDetailsController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    $("#photo").change(function () {
        readURL(this);
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                //alert(e.target.result);
                $('#editImg').attr('src', e.target.result);
                $scope.stb.photo = e.target.result;
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    $scope.OpenEditFileDialog = function () {
        $("#addphotonewname").change(function () {
            readURL(this);
        });
        $("#addphotonewname").click();

    }

    console.log("EditStableDetailsController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    $scope.stb = storageService.getObject("CS");
    
    
    
    for (var i = 0 ; i < 4; i++) {
        try {
            if (IsNull($scope.stb.associations[i].name))
                $scope.stb.associations[i].name = "";

        }
        catch (err) {
            $scope.stb.associations[i].name = "";
        }

        try {
            if (IsNull($scope.stb.associations[i].number))
                $scope.stb.associations[i].number = "";

        }
        catch (err) {
            $scope.stb.associations[i].number = "";
        }
    }

    console.log($scope.stb);

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.horses = $firebaseArray(ref.child('horses'));

    $scope.SaveMedicalStable = function () {
        blockUI.start("Updating medical report details.....");
        var horseRef = $scope.horses.$getRecord($scope.stb.$id);
        horseRef.medical = ReplaceNull($scope.stb.medical);

        $scope.horses.$save(horseRef).then(function (res) {

            $scope.$apply(function () {
                blockUI.stop();
            });

            storageService.setObject("CS", horseRef);
            swal("", "Your stable details has been added edied success fully", "success");
            console.log(res);

            window.location.reload();

        });
    }

    $scope.SaveNotesStable = function () {
        blockUI.start("Updating notes details.....");

        var horseRef = $scope.horses.$getRecord($scope.stb.$id);
        horseRef.notes = ReplaceNull($scope.stb.notes);

        $scope.horses.$save(horseRef).then(function (res) {

            $scope.$apply(function () {
                blockUI.stop();
            });

            storageService.setObject("CS", horseRef);
            swal("", "Your stable details has been added edied success fully", "success");
            console.log(res);

            window.location.reload();

        });

        
    }

    $scope.SaveStable = function () {

        blockUI.start("Editing horse details.....");
        var horseRef = $scope.horses.$getRecord($scope.stb.$id);

        //horseRef.age = '';//ReplaceNull($scope.stb.age);
        horseRef.associations = $scope.stb.associations;
        horseRef.average_speed = ReplaceNull($scope.stb.average_speed);
        horseRef.birthday = ReplaceNull($scope.stb.birthday);
        horseRef.breed = ReplaceNull($scope.stb.breed);
        horseRef.calories = ReplaceNull($scope.stb.calories);
        horseRef.distance = ReplaceNull($scope.stb.distance);
        horseRef.duration = ReplaceNull($scope.stb.duration);
        horseRef.energy = ReplaceNull($scope.stb.energy);
        horseRef.horse_name = ReplaceNull($scope.stb.horse_name);
        horseRef.notes = ReplaceNull($scope.stb.notes);
        horseRef.registration = ReplaceNull($scope.stb.registration);
        horseRef.top_speed = ReplaceNull($scope.stb.top_speed);
        horseRef.total_rides = ReplaceNull($scope.stb.total_rides);
        horseRef.totalrides = ReplaceNull($scope.stb.totalrides);
        horseRef.weight = ReplaceNull($scope.stb.weight);
        horseRef.photo = ReplaceNull($scope.stb.photo);
        horseRef.medical = ReplaceNull($scope.stb.medical);
        horseRef.notes = ReplaceNull($scope.stb.notes);

        $scope.horses.$save(horseRef).then(function (res) {

         

            storageService.setObject("CS", horseRef);
            swal("", "Your stable details has been added edied success fully", "success");
            console.log(res);

            window.location.reload();

            $scope.$apply(function () {
                blockUI.stop();
            });

        });

    }

});

app.controller('AddStableDetailsController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    console.log($("#addphotonewname"));

    console.log("AddStableDetailsController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.horses = $firebaseArray(ref.child('horses'));
    $scope.users = $firebaseArray(ref.child('users'));
        
    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    //$('.datepicker').datepicker();

    //$("#addphotonewname").change(function () {
    //    readURL(this);
    //});

    $scope.OpenFileDialog = function () {
        $("#addphotonewname").change(function () {
            readURL(this);
        });
        $("#addphotonewname").click();

    }

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                //alert(e.target.result);
                $('#addImg').attr('src', e.target.result);
                $scope.stbadd.photo = e.target.result;
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $scope.assolist = [
        { name: "", number: "" },
          { name: "", number: "" },
            { name: "", number: "" },
              { name: "", number: "" },
    ];

    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };



    $scope.stbadd = {
        associations: $scope.assolist,
        average_speed: "0.0",
        birthday: "",
        calories: "0.0",
        distance: "0.0",
        duration: "00:00:00",
        energy: "0.0",
        horse_name: "",
        id: generateUUID(),
        notes: "",
        photo: "images/horsePlaceHolder.png",
        registration: "",
        top_speed: "0.0",
        total_rides: "",
        weight: ""
    }


    $scope.SaveStable = function () {

        blockUI.start("Adding horse details.....");
        $scope.horses.$add($scope.stbadd).then(function (ref) {
            var id = ref.key();
            console.log("added record with id " + id);
            swal("", "Your stable details has been added success fully", "success");
            //$location.path('my-stable.html');

            if (IsNull($scope.user.Details.horse_ids)) {
                $scope.user.Details['horse_ids'] = {};
            }
                   
            var dtd123 = new Date();

            var time123 = dtd123.getTime();

            $scope.user.Details.horse_ids[id] = {
                created_at: time123,
                last_updated: time123,
                sync: "1"
            };
            

            //$scope.user.Details.horse_ids.push(id);
            storageService.setObject("CU",$scope.user);

            var userRef = $scope.users.$getRecord($scope.user.Auth.uid);
            if (IsNull(userRef.horse_ids)) {
                userRef['horse_ids'] = {};;
            }

            userRef.horse_ids[id] = {
                created_at: time123,
                last_updated: time123,
                sync: "1"
            };

            $scope.users.$save(userRef).then(function (res) {

                window.location.reload();

                console.log(res);
                //$scope.user.Details.profile = userRef.profile;
                $scope.$apply(function () {
                    blockUI.stop();
                });

                
            });


        });

    }

});

app.controller('HistoryController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {

    console.log("HistoryController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");
    $scope.stb = storageService.getObject("CS");

    console.log($scope.stb);
    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    $scope.ShowAllHistory = function (hist) {
        $location.path('ride-history-all.html');
        storageService.setObject("CHIST", hist);
    }

    $scope.histories = [];

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.horserepo = $firebaseArray(ref.child('horses'));

    $scope.loadingcord = true;
    $scope.horserepo.$loaded().then(function (dataArray) {
            //$scope.loadingcord = false;

            
            $scope.stb = $scope.horserepo.$getRecord($scope.stb.$id);
            storageService.setObject("CS", $scope.stb);

            $scope.rides.$loaded().then(function (dataArray) {
                $scope.loadingcord = false;
                var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                $scope.histories = [];

                for (var id in $scope.stb.ride_ids) {
                    var horseHistory = $scope.rides.$getRecord(id);
                    //var time = horseHistory.start_time; //$scope.stb.ride_ids[id];

                    if (horseHistory != null) {
                        var date = new Date(horseHistory.start_time);// //new Date(parseInt(time));
                        var monthInt = parseInt(date.getMonth());
                        var month = monthNames[monthInt];
                        var year = date.getFullYear();

                        var monthyear = month + " " + year;

                        var existIndex = -1;
                        for (var k = 0; k < $scope.histories.length; k++) {
                            var hi = $scope.histories[k];
                            if (hi.MonthYear == monthyear) {
                                existIndex = k;
                                break;
                            }
                        }

                        if (existIndex == -1) {
                            $scope.histories.push({
                                Month: month,
                                Year: year,
                                MonthYear: monthyear,
                                MonthInt: monthInt,
                                DataArray: [horseHistory]
                            });
                        }
                        else {
                            $scope.histories[k].DataArray.push(horseHistory)
                        }
                    }

                }


                $scope.historiesToDisplay = [];
                for (var l = 0 ; l < $scope.histories.length; l++) {
                    var history = $scope.histories[l];

                    var totalDistance = 0.0;
                    var totalDuration = 0;
                    var totalEnergy = 0;
                    var totalCalories = 0;
                    var totalAverageSpeed = 0.0;
                    var totalTopSspeed = [];
                    var averageSpeed = 0.0;


                    for (var inner = 0; inner < history.DataArray.length; inner++) {



                        var ride = history.DataArray[inner];
                        totalDistance = parseFloat(totalDistance) + parseFloat(ride.total_distance);
                        totalDuration = parseInt(totalDuration) + parseInt(ride.total_time);
                        totalEnergy = parseFloat(totalEnergy) + parseFloat(ride.energy);
                        totalCalories = parseFloat(totalCalories) + parseFloat(ride.calories);
                        //$scope.totalAverageSpeed = $scope.totalAverageSpeed + ride.average_speed;
                        //$scope.totalTopSspeed = $scope.totalTopSspeed + ride.top_speed;
                        averageSpeed = parseFloat(averageSpeed) + parseFloat(ride.average_speed);
                        totalTopSspeed.push(parseFloat(ride.top_speed));
                    }


                    history.totalDistance = parseFloat(Math.round(totalDistance * 100) / 100).toFixed(2);
                    history.totalEnergy = parseFloat(Math.round(totalEnergy * 100) / 100).toFixed(2);
                    history.totalCalories = parseFloat(Math.round(totalCalories * 100) / 100).toFixed(2);

                    history.totalAverageSpeed = averageSpeed / history.DataArray.length;

                    history.totalAverageSpeed = parseFloat(Math.round(history.totalAverageSpeed * 100) / 100).toFixed(2);

                    history.totalDuration = hhmmss(totalDuration);

                    history.totalTopSspeedToDisplay = Math.max.apply(Math, totalTopSspeed);

                    history.totalTopSspeedToDisplay = parseFloat(Math.round(history.totalTopSspeedToDisplay * 100) / 100).toFixed(2);



                    $scope.historiesToDisplay.push(history);
                }

                console.log($scope.historiesToDisplay)

            }).catch(function (err) {

            });

      
    }).catch(function (error) {
        console.log("Error in loading details");
    });


    
});

app.controller('NavController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI) {

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.users = $firebaseArray(ref.child('users'));

    $scope.user = storageService.getObject("CU");

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }


});

app.controller('StaticContentController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI) {

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    
    console.log("StaticContentController");

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

$scope.Update= function(type){
    console.log("updateing type :" + type);
}

$scope.UpdateContent = function(){
     console.log("updateing type :" + type);
}
});

app.controller('DashboardController', function MyCtrl($http,$scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, Socialshare) {

    //var isLoggedIn = storageService.getObject("LoggedIn");
    //if (isLoggedIn == 1)
    //{
    //    storageService.setObject("LoggedIn", 0);
    //    window.location.reload();
    //}

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.user = storageService.getObject("CU");
    console.log("DashboardController");

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    $scope.selectedValue = "";

    function SaveImage(url) {


        $http.get(url, {}, {
            headers: {
                'Content-Type': 'image/jpg'
            },
            responseType: 'blob'
        }).then(function (image) {
            debugger;
            console.log(image)
            var blob = new Blob([image.data], {
                type: 'image/jpg'
            });

            //var fr = new FileReader();
            //fr.readAsDataURL(blob);

            var metadata = {
                'contentType': blob.type
            };

            var fname = Math.random().toString(36).substring(7) + ".jpg";// +file.name.substring(file.name.indexOf("."));
            var storageRef = firebase.storage().ref();
            storageRef.child('shares/' + fname).put(blob, metadata).then(function (snapshot) {
                debugger;
                var url = snapshot.metadata.downloadURLs[0];
                console.log(url)
            }).catch(function (error) {
                console.error('Upload failed:', error);
            });


        }, function (error) {
            debugger;
            deferred.reject(error);
        });

    }

    $scope.ShareObject = null;

    $scope.RideExist = false;
    $scope.SocialShare = function () {
        if ($scope.RideExist) {
            FB.ui($scope.ShareObject, function (response) {
                console.log(response);
            });
        }
        else {
            alert("No ride details exist for sharing")
        }
    }

    //SaveImage("https://maps.googleapis.com/maps/api/staticmap?zoom=8&size=600x300&maptype=roadmap&markers=color:green%7Clabel:G%7C&markers=color:red%7Clabel:C%7C&key=AIzaSyA2cpd_C0zOoAanqP0aWaKxxSuDDiRWPT0&path=color:red|weight:3||");
    //$.blockUI({
    //    message: '<img src="images/loading.gif" />',
    //});
    $scope.loadingcord = true;

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    //$scope.users = $firebaseArray(ref.child('users'));
    $scope.horses = $firebaseArray(ref.child('horses'));
    $scope.horses.$loaded().then(function (dataArray) {

        var ids = [];
        var vals = [];

        angular.forEach($scope.user.Details.horse_ids, function (value, key) {
            //console.log(value);
            console.log(key);
            var horse = $scope.horses.$getRecord(key);
            if (horse != null) {
                try {
                    for (var i in horse.ride_ids) {
                        ids.push({
                            Id: i, Val: horse.ride_ids[i]
                        })
                        vals.push(horse.ride_ids[i]);
                    }
                }
                catch (errloop) {
                    console.log(errloop);
                }

                console.log(horse);
            }
        });


        var max = Math.max.apply(Math, vals);

        for (var i = 0; i < ids.length; i++) {
            var o = ids[i];
            if (o.Val == max)
                $scope.rideId = o.Id;// '-KP44cqcDIZo4G5-ziq4'
        }


       
        $scope.rides = $firebaseArray(ref.child('rides'));
        $scope.rides.$loaded().then(function (dataArray) {
            var ride = $scope.rides.$getRecord($scope.rideId);
            console.log(ride)

            if (ride != null) {
                $scope.RideExist = true;
                if (ride.ismanualride == "1") {


                    debugger;
                    //$scope.socialshareurlstring = GetSharingUrl(ride, storageService.getNodeJSAppURL());

                    //firebase.database().ref('/horses/' + ride.horse_firebase_key + '/').on('value', function (snapshot) {
                    var horseobj = $scope.horses.$getRecord(ride.horse_firebase_key);
                    $scope.loadingcord = false;
                    DrawManualRideOnMap(ride);
                    $scope.ShareObject = GetShareObjectByRide(horseobj, ride);
                    //})



                }
                else {
                    $scope.coords = $firebaseArray(ref.child('coords'));
                    $scope.coords.$loaded().then(function (dataArray) {
                        debugger;
                        $scope.loadingcord = false;
                        var id = $scope.rideId;
                        var coord = $scope.coords.$getRecord(id);
                        DrawAutomatedRideOnMap(coord)
                        console.log(coord);
                        //$scope.socialshareurlstring = GetSharingUrlByCord(ride, coord, storageService.getNodeJSAppURL());
                        //console.log(horse);

                        var horseobj = $scope.horses.$getRecord(ride.horse_firebase_key);

                        $scope.ShareObject = GetShareObjectByCoordinate(horseobj, ride, coord);

                    });
                }
            }
            else {
                $scope.RideExist = false;
                $scope.loadingcord = false;
                DrawMap([]);
            }
            


            $.unblockUI();
        }).catch(function (err) {
        });

        

    }).catch(function (error) {
        console.log("Error in loading details");
    });


  

    $scope.graph1 = function () {

        var container = $("#graph_1");

        var maximum = container.outerWidth() / 2 || 300;
        var data = [];
        function getRandomData() {
            if (data.length) { data = data.slice(1); }
            while (data.length < maximum) {
                var previous = data.length ? data[data.length - 1] : 50;
                var y = previous + Math.random() * 10 - 5;
                data.push(y < 0 ? 0 : y > 100 ? 70 : y);
            }
            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }
            return res;
        }
        series = [{
            data: getRandomData(),
            lines: {
                fill: true
            }
        }];

        var t = {
            series: {
                shadowSize: 1
            },
            lines: {
                show: !0,
                lineWidth: 2,
                fill: !0,
                fillColor: {
                    colors: [{
                        opacity: .3
                    }, {
                        opacity: 1
                    }]
                }
            },
            yaxis: {
                min: 0,
                max: 100,
                tickColor: "#eee",
                tickFormatter: function (e) {
                    return e + "%"
                }
            },
            xaxis: {
                show: !1
            },
            colors: ["#5FD7FA"],
            grid: {
                tickColor: "#eee",
                borderWidth: 0
            }
        },
        a = 30,
        plot = $.plot(container, series, t);

    }

    $scope.graph2 = function () {

        var container = $("#graph_2");

        var data = [["4:00", 10], ["4:30", 8], ["5:00", 4], ["5:30", 13], ["6:00", 17], ["6:30", 9], ["7:00", 5], ["7:30", 9], ["8:00", 7], ["8:30", 4]];
        $.plot(container, [data], {
            series: {
                bars: {
                    show: true,
                    barWidth: 0.6,
                    align: "center"
                }
            },
            grid: {
                tickColor: "#eee",
                borderWidth: 0
            },
            xaxis: {
                mode: "categories",
                tickLength: 0
            },
            colors: ["#3FF3AC"],
        });


    }

    $scope.graph3 = function () {
        var container = $("#graph_3");

        var data = [[0, 4.9], [1, 5], [2, 5.1], [3, 5], [4, 4.9], [5, 5], [6, 5.1], [7, 5], [8, 4.9], [9, 5], [10, 5.1], [11, 5], [12, 5], [13, 4.9], [14, 5]];

        $.plot(container, [data], {
            series: {
                shadowSize: 1
            },
            lines: {
                lineWidth: 3,
            },
            grid: {
                tickColor: "#FF5F5F",
                borderWidth: 0,
                minBorderMargin: 20,
                labelMargin: 10,
                backgroundColor: {
                    colors: ["#FF5F5F", "#FF5F5F"]
                }
            },
            colors: ["#fff"]
        });
    }

    $scope.Start = function () {

        $scope.graph1();
        $scope.graph2();
        $scope.graph3();

    }

    $scope.Start();
});

app.controller('LastRideController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService) {

    console.log("HistoryController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    $scope.stb = storageService.getObject("CS");
    console.log($scope.stb);

    var ids = [];
    var vals = [];
    for (var i in $scope.stb.ride_ids)
    {
        ids.push({
            Id: i, Val: $scope.stb.ride_ids[i]
        })
        vals.push($scope.stb.ride_ids[i]);
    }

    var max = Math.max.apply(Math, vals);

    for (var i = 0; i < ids.length; i++) {
        var o = ids[i];
        if (o.Val == max)
            $scope.rideId = o.Id;// '-KP44cqcDIZo4G5-ziq4'
    }

    

    try{
        //$scope.rideId = $scope.stb.ride_ids[0];
        console.log($scope.rideId)
        storageService.setObject("RIFM", $scope.rideId);
    }
    catch (err) {

    }


    console.log($scope.stb);

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    $scope.ShareObject = null;

    $scope.SocialShare = function () {

        FB.ui($scope.ShareObject, function (response) {
            console.log(response);
        });

    }


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.rides.$loaded().then(function (dataArray) {
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
        var id = $scope.rideId;
        var lastRide = $scope.rides.$getRecord(id);
        $scope.ride_time_to_display = hhmmss(lastRide.ride_time);
        $scope.total_time_to_display = hhmmss(lastRide.total_time);


        $scope.freestyle_time_to_display = hhmmss(lastRide.freestyle_time);
        $scope.hotwalk_time_to_display = hhmmss(lastRide.hotwalk_time);

        if (IsNull(lastRide.ground_condition))
            $("#gndcondition").val("Select");
        else
            $("#gndcondition").val(lastRide.ground_condition);


        $scope.lastRide = lastRide;
        console.log($scope.lastRide);

        if ($scope.lastRide.ismanualride == "1") {

            $scope.ShareObject = GetShareObjectByRide($scope.stb,$scope.lastRide);
        }
        else {
            $scope.coords = $firebaseArray(ref.child('coords'));
            $scope.coords.$loaded().then(function (dataArray) {
                debugger;
                var coord = $scope.coords.$getRecord(id);
                $scope.ShareObject = GetShareObjectByCoordinate($scope.stb,$scope.lastRide, coord);
            });
        }


    }).catch(function (err) {

    });

    $scope.UpdateNotes = function () {

        blockUI.start("Updating notes details.....");

        var rideRef = $scope.rides.$getRecord($scope.rideId);
        rideRef.notes = ReplaceNull($scope.lastRide.notes);
        rideRef.ground_condition =  $("#gndcondition").val();

        $scope.rides.$save(rideRef).then(function (res) {

            $scope.$apply(function () {
                blockUI.stop();
            });

            //storageService.setObject("CS", rideRef);
            swal("", "Your notes details has been edited success fully", "success");
            console.log(res);

            window.location.reload();

        });

    }


    $scope.graph1 = function () {

        var container = $("#graph_1");

        var maximum = container.outerWidth() / 2 || 300;
        var data = [];
        function getRandomData() {
            if (data.length) { data = data.slice(1); }
            while (data.length < maximum) {
                var previous = data.length ? data[data.length - 1] : 50;
                var y = previous + Math.random() * 10 - 5;
                data.push(y < 0 ? 0 : y > 100 ? 70 : y);
            }
            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }
            return res;
        }
        series = [{
            data: getRandomData(),
            lines: {
                fill: true
            }
        }];

        var t = {
            series: {
                shadowSize: 1
            },
            lines: {
                show: !0,
                lineWidth: 2,
                fill: !0,
                fillColor: {
                    colors: [{
                        opacity: .3
                    }, {
                        opacity: 1
                    }]
                }
            },
            yaxis: {
                min: 0,
                max: 100,
                tickColor: "#eee",
                tickFormatter: function (e) {
                    return e + "%"
                }
            },
            xaxis: {
                show: !1
            },
            colors: ["#5FD7FA"],
            grid: {
                tickColor: "#eee",
                borderWidth: 0
            }
        },
        a = 30,
        plot = $.plot(container, series, t);

    }



    $scope.graph2 = function () {

        var container = $("#graph_2");

        var data = [["4:00", 10], ["4:30", 8], ["5:00", 4], ["5:30", 13], ["6:00", 17], ["6:30", 9], ["7:00", 5], ["7:30", 9], ["8:00", 7], ["8:30", 4]];
        $.plot(container, [data], {
            series: {
                bars: {
                    show: true,
                    barWidth: 0.6,
                    align: "center"
                }
            },
            grid: {
                tickColor: "#eee",
                borderWidth: 0
            },
            xaxis: {
                mode: "categories",
                tickLength: 0
            },
            colors: ["#3FF3AC"],
        });


    }

    $scope.graph3 = function () {
        var container = $("#graph_3");

        var data = [[0, 4.9], [1, 5], [2, 5.1], [3, 5], [4, 4.9], [5, 5], [6, 5.1], [7, 5], [8, 4.9], [9, 5], [10, 5.1], [11, 5], [12, 5], [13, 4.9], [14, 5]];

        $.plot(container, [data], {
            series: {
                shadowSize: 1
            },
            lines: {
                lineWidth: 3,
            },
            grid: {
                tickColor: "#FF5F5F",
                borderWidth: 0,
                minBorderMargin: 20,
                labelMargin: 10,
                backgroundColor: {
                    colors: ["#FF5F5F", "#FF5F5F"]
                }
            },
            colors: ["#fff"]
        });
    }

    $scope.Start = function () {

        $scope.graph1();
        $scope.graph2();
        $scope.graph3();

    }

    //$scope.Start();

});

app.controller('RideDetailController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService) {

    console.log("RideDetailController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    $scope.stb = storageService.getObject("CS");
  
    console.log($scope.stb);
    

    //var ids = [];
    //var vals = [];
    //for (var i in $scope.stb.ride_ids) {
    //    ids.push({
    //        Id: i, Val: $scope.stb.ride_ids[i]
    //    })
    //    vals.push($scope.stb.ride_ids[i]);
    //}

    //var max = Math.max.apply(Math, vals);

    //for (var i = 0; i < ids.length; i++) {
    //    var o = ids[i];
    //    if (o.Val == max)
    //        $scope.rideId = o.Id;// '-KP44cqcDIZo4G5-ziq4'
    //}



    try {
        //$scope.rideId = $scope.stb.ride_ids[0];
        console.log($scope.rideId)
        //storageService.setObject("RIDEDETAILID", $scope.rideId);

        $scope.rideId = storageService.getObject("RIDEDETAILID");
    }
    catch (err) {

    }


    console.log($scope.stb);
    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.horserepo = $firebaseArray(ref.child('horses'));
  



    $scope.test=function(id)
    {
        console.log($scope.currentRide);
        $scope.rides.$remove($scope.currentRide).then(function (ref) {
            var id = ref.key();

            for (var i = 0; i <= $scope.stb.ride_ids.length; i++) {
                if ($scope.stb.ride_ids[i] == id) {
                    console.log("Deleted success fully");
                }
            }



            //console.log("added record with id " + id);               
            //$location.path('my-stable.html');

            //$scope.user.Details.horse_ids[id] = {
            //    created_at: ""
            //};

            delete $scope.stb.ride_ids[id];

            //$scope.user.Details.horse_ids.push(id);
            storageService.setObject("CS", $scope.stb);


            //userRef.horse_ids[id] = {
            //    created_at: ""
            //};
            //var currenthorseRef = $scope.horserepo.$getRecord($scope.currenthorse.$id);
            //delete $scope.horserepo.ride_ids[id];

            $scope.horserepo.$save($scope.stb).then(function (res) {
                console.log(res);
                //$scope.user.Details.profile = userRef.profile;
                $scope.$apply(function () {
                    blockUI.stop();
                });

                window.location.reload();
              
            });

        }).catch(function (err) {
            console.log(err);
        });
        swal("", "Your Ride has been removed success fully", "success");
        $location.path('ride-history.html');
    }




    //$scope.toDataUrl = function (url, callback) {
    //    var xhr = new XMLHttpRequest();
    //    //xhr.responseType = 'blob';
    //    xhr.onload = function () {
    //        var reader = new FileReader();
    //        reader.onloadend = function () {
    //            callback(reader.result);
    //        }
    //        reader.readAsDataURL(xhr.response);
    //    };
    //    xhr.open('GET', url, true);
    //    xhr.send();
    //}

    //$scope.toDataUrl('http://www.w3schools.com/howto/img_fjords.jpg', function (base64Img) {
    //    $scope.urldata = base64Img;
    //    console.log(base64Img);
    //});

    //$("img").one("load", function () {
    //    // do stuff
    //}).each(function () {
    //    if (this.complete) $(this).load();
    //});

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    $scope.imgData = canvas.toDataURL("http://www.w3schools.com/howto/img_fjords.jpg", 1.0);

    $scope.PrintPDF = function () {


        

            var pdf = new jsPDF('p', 'pt', 'letter');

            // source can be HTML-formatted string, or a reference
            // to an actual DOM element from which the text will be scraped.
            source = $('#HorseRideDetailNew')[0];

            // we support special element handlers. Register them with jQuery-style 
            // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
            // There is no support for any other type of selectors 
            // (class, of compound) at this time.
            specialElementHandlers = {
                // element with id of "by pass" - jQuery style selector
                '#imgtext': function (element, renderer) {
                    // true = "handled elsewhere, bypass text extraction"
                    console.log(renderer);
                    return true
                }
            };
            margins = {
                top: 80,
                bottom: 60,
                left: 10,
                width: 700
            };
            // all coords and widths are in jsPDF instance's declared units
            // 'inches' in this case
            pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                pdf.save('Test.pdf');
            }, margins);
    }



  
    //$scope.PrintHorsePDF = function () {
    //    html2canvas(document.getElementById("HorseRideDetailNew"), {
    //        onrendered: function (canvas) {
    //            var image = canvas.toDataURL("image/png");
            
    //            var doc = new jsPDF();
    //            doc.addImage(image, 'JPEG', 20, 20);
             
    //            doc.save('MYTest.pdf');
    //        }
    //    });
    //}


    $scope.DeleteRide = function (id) {



        swal({
            title: "Are you sure?", text: "This Ride will be deleted from the web and all devices, do you wish to continue!",
            type: "warning", showCancelButton: true,
            confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function () {
        
            $scope.test(id);
        });

    }


    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }


    $scope.SeeMap = function (his) {
        storageService.setObject("RIFM", his.$id);
        $location.path('ridemap.html');
        console.log(his.ride_ids);
    }


    $scope.ShareObject = null;

    $scope.SocialShare = function () {

        FB.ui($scope.ShareObject, function (response) {
            console.log(response);
        });

    }



    $scope.currentRide = {};
    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.rides.$loaded().then(function (dataArray) {
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
        var id = $scope.rideId;
        var lastRide = $scope.rides.$getRecord(id);
        $scope.currentRide = lastRide;
        $scope.ride_time_to_display = hhmmss(lastRide.ride_time);
        $scope.total_time_to_display = hhmmss(lastRide.total_time);

        $scope.freestyle_time_to_display = hhmmss(lastRide.freestyle_time);
        $scope.hotwalk_time_to_display = hhmmss(lastRide.hotwalk_time);

        console.log("getting ride id -" + $scope.rideId);
        if (IsNull(lastRide.ground_condition))
            $("#gndcondition").val("Select");
        else
            $("#gndcondition").val(lastRide.ground_condition);
        $scope.lastRide = lastRide;
        console.log($scope.lastRide);

        if ($scope.lastRide.ismanualride == "1") {
            $scope.ShareObject = GetShareObjectByRide($scope.stb,$scope.lastRide);
        }
        else {
            $scope.coords = $firebaseArray(ref.child('coords'));
            $scope.coords.$loaded().then(function (dataArray) {
                debugger;
                var coord = $scope.coords.$getRecord(id);
                $scope.ShareObject = GetShareObjectByCoordinate($scope.stb,$scope.lastRide, coord);
            });
        }


    }).catch(function (err) {

    });

    $scope.UpdateNotes = function () {

        blockUI.start("Updating notes details.....");

        var rideRef = $scope.rides.$getRecord($scope.rideId);
        rideRef.notes = ReplaceNull($scope.lastRide.notes);
        rideRef.ground_condition = $("#gndcondition").val();

        $scope.rides.$save(rideRef).then(function (res) {

            $scope.$apply(function () {
                blockUI.stop();
            });

            //storageService.setObject("CS", rideRef);
            swal("", "Your notes details has been edited success fully", "success");
            console.log(res);

            window.location.reload();

        });

    }


    $scope.graph1 = function () {

        var container = $("#graph_1");

        var maximum = container.outerWidth() / 2 || 300;
        var data = [];
        function getRandomData() {
            if (data.length) { data = data.slice(1); }
            while (data.length < maximum) {
                var previous = data.length ? data[data.length - 1] : 50;
                var y = previous + Math.random() * 10 - 5;
                data.push(y < 0 ? 0 : y > 100 ? 70 : y);
            }
            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }
            return res;
        }
        series = [{
            data: getRandomData(),
            lines: {
                fill: true
            }
        }];

        var t = {
            series: {
                shadowSize: 1
            },
            lines: {
                show: !0,
                lineWidth: 2,
                fill: !0,
                fillColor: {
                    colors: [{
                        opacity: .3
                    }, {
                        opacity: 1
                    }]
                }
            },
            yaxis: {
                min: 0,
                max: 100,
                tickColor: "#eee",
                tickFormatter: function (e) {
                    return e + "%"
                }
            },
            xaxis: {
                show: !1
            },
            colors: ["#5FD7FA"],
            grid: {
                tickColor: "#eee",
                borderWidth: 0
            }
        },
        a = 30,
        plot = $.plot(container, series, t);

    }



    $scope.graph2 = function () {

        var container = $("#graph_2");

        var data = [["4:00", 10], ["4:30", 8], ["5:00", 4], ["5:30", 13], ["6:00", 17], ["6:30", 9], ["7:00", 5], ["7:30", 9], ["8:00", 7], ["8:30", 4]];
        $.plot(container, [data], {
            series: {
                bars: {
                    show: true,
                    barWidth: 0.6,
                    align: "center"
                }
            },
            grid: {
                tickColor: "#eee",
                borderWidth: 0
            },
            xaxis: {
                mode: "categories",
                tickLength: 0
            },
            colors: ["#3FF3AC"],
        });


    }

    $scope.graph3 = function () {
        var container = $("#graph_3");

        var data = [[0, 4.9], [1, 5], [2, 5.1], [3, 5], [4, 4.9], [5, 5], [6, 5.1], [7, 5], [8, 4.9], [9, 5], [10, 5.1], [11, 5], [12, 5], [13, 4.9], [14, 5]];

        $.plot(container, [data], {
            series: {
                shadowSize: 1
            },
            lines: {
                lineWidth: 3,
            },
            grid: {
                tickColor: "#FF5F5F",
                borderWidth: 0,
                minBorderMargin: 20,
                labelMargin: 10,
                backgroundColor: {
                    colors: ["#FF5F5F", "#FF5F5F"]
                }
            },
            colors: ["#fff"]
        });
    }

    $scope.Start = function () {

        $scope.graph1();
        $scope.graph2();
        $scope.graph3();

    }

    //$scope.Start();

});

app.controller('RideMapController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService) {

    console.log("HistoryController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    $scope.stb = storageService.getObject("CS");

    $scope.rideId = storageService.getObject("RIFM");
    //$scope.rideId="-KSpPpJKZ5IicOQ-P5kM";
 
    try {
        //$scope.rideId = $scope.stb.ride_ids[0];
        console.log($scope.rideId)
    }
    catch (err) {

    }



    $scope.ShareObject = null;

    $scope.SocialShare = function () {

        FB.ui($scope.ShareObject, function (response) {
            console.log(response);
        });

    }


    var coord=[];
    $scope.loadingcord = true;
    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.rides.$loaded().then(function (dataArray) {
        console.log("hererrdfsdfdsfdsf");
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
        var ride = $scope.rides.$getRecord($scope.rideId);
        if (ride.ismanualride == "1") {
            $scope.loadingcord = false;
            DrawManualRideOnMap(ride);
            try{
                $scope.$apply();
            }
            catch (err) { }
            $scope.ShareObject = GetShareObjectByRide($scope.stb,ride);
        }
        else {

            $scope.coords = $firebaseArray(ref.child('coords'));
            $scope.coords.$loaded().then(function (dataArray) {
                // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
                $scope.loadingcord = false;
                var id = $scope.rideId;
                DrawAutomatedRideOnMap($scope.coords.$getRecord(id));
                console.log(coord);
                try {
                    $scope.$apply();
                }
                catch (err) { }
                $scope.ShareObject = GetShareObjectByCoordinate($scope.stb,ride, coord);
            }).catch(function (err) {

            });

            
        }
    }).catch(function (err) {
        console.log(err);
    });


    
   


    console.log($scope.stb);

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }



   
   
    

    $scope.graph1 = function () {

        var container = $("#graph_1");

        var maximum = container.outerWidth() / 2 || 300;
        var data = [];
        function getRandomData() {
            if (data.length) { data = data.slice(1); }
            while (data.length < maximum) {
                var previous = data.length ? data[data.length - 1] : 50;
                var y = previous + Math.random() * 10 - 5;
                data.push(y < 0 ? 0 : y > 100 ? 70 : y);
            }
            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }
            return res;
        }
        series = [{
            data: getRandomData(),
            lines: {
                fill: true
            }
        }];

        var t = {
            series: {
                shadowSize: 1
            },
            lines: {
                show: !0,
                lineWidth: 2,
                fill: !0,
                fillColor: {
                    colors: [{
                        opacity: .3
                    }, {
                        opacity: 1
                    }]
                }
            },
            yaxis: {
                min: 0,
                max: 100,
                tickColor: "#eee",
                tickFormatter: function (e) {
                    return e + "%"
                }
            },
            xaxis: {
                show: !1
            },
            colors: ["#5FD7FA"],
            grid: {
                tickColor: "#eee",
                borderWidth: 0
            }
        },
        a = 30,
        plot = $.plot(container, series, t);

    }
    
    $scope.graph2 = function () {

        var container = $("#graph_2");

        var data = [["4:00", 10], ["4:30", 8], ["5:00", 4], ["5:30", 13], ["6:00", 17], ["6:30", 9], ["7:00", 5], ["7:30", 9], ["8:00", 7], ["8:30", 4]];
        $.plot(container, [data], {
            series: {
                bars: {
                    show: true,
                    barWidth: 0.6,
                    align: "center"
                }
            },
            grid: {
                tickColor: "#eee",
                borderWidth: 0
            },
            xaxis: {
                mode: "categories",
                tickLength: 0
            },
            colors: ["#3FF3AC"],
        });


    }

    $scope.graph3 = function () {
        var container = $("#graph_3");

        var data = [[0, 4.9], [1, 5], [2, 5.1], [3, 5], [4, 4.9], [5, 5], [6, 5.1], [7, 5], [8, 4.9], [9, 5], [10, 5.1], [11, 5], [12, 5], [13, 4.9], [14, 5]];

        $.plot(container, [data], {
            series: {
                shadowSize: 1
            },
            lines: {
                lineWidth: 3,
            },
            grid: {
                tickColor: "#FF5F5F",
                borderWidth: 0,
                minBorderMargin: 20,
                labelMargin: 10,
                backgroundColor: {
                    colors: ["#FF5F5F", "#FF5F5F"]
                }
            },
            colors: ["#fff"]
        });
    }

    $scope.Start = function () {

        $scope.graph1();
        $scope.graph2();
        $scope.graph3();

    }

    $scope.Start();

});

app.controller('ShareController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService) {

    console.log("ShareController");
    sessionService.CHECKSESSION();

    $scope.type = $location.search().type;
    $scope.id = $location.search().id;

    var ref = firebaseService.FIREBASEENDPOINT();

   

    $scope.Start = function () {
        
    }

    $scope.Start();

});

app.controller('SponsersController', function ($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService) {

   


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Sponsers'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });


  

});

app.controller('FAQController', function ($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService) {




    //var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    //$scope.images = $firebaseArray(ref.child('Content').child('FAQ'));
    //$scope.Imgaes = [];
    //$scope.images.$loaded().then(function (dataArray) {
    //    $scope.Imgaes = dataArray;
    //    console.log(dataArray);
    //}).catch(function (error) {
    //    console.log("Error in loading details");
    //});




});

app.controller('NewsController', function ($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService, $sce) {


    //console.log(newses);
    var id = $location.search().id;
    //alert(id);
    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('News'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        $scope.news = $scope.Imgaes.$getRecord(id);

        $scope.news.Content = $sce.trustAsHtml($scope.news.Content.toString());
        $scope.news.Title = $sce.trustAsHtml($scope.news.Title.toString());

        console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });




});

app.controller('CalendarController', function ($scope, moment, calendarConfig, firebaseService, $firebaseArray, storageService, $location) {


    //events="vm.events"
    //view="vm.calendarView"
    //view-date="vm.viewDate"
    //day-view-split="10"
    $scope.user = storageService.getObject("CU");

    $scope.vm = this;
    $scope.vm.events = [];
    $scope.vm.calendarView = 'month';
    //$scope.vm.viewDate = '12/5/2016';
    //$scope.vm.viewDate = moment().startOf('month').toDate();
    $scope.vm.viewDate = new Date();
    $scope.vm.isCellOpen = false;
    $scope.vm.viewChangeEnabled = true;
    $scope.vm.viewChangeClicked = function (date, nextView) {
        console.log(date, nextView);
        return $scope.vm.viewChangeEnabled;
    };


    $scope.colors = [calendarConfig.colorTypes.warning, calendarConfig.colorTypes.info, calendarConfig.colorTypes.important];

    $scope.actions = [
        {
            //label: '<i class=\'glyphicon glyphicon-zoom-out\'></i>',
            label:'View Details',
            onClick: function (args) {
                console.log(args.calendarEvent.ride_id);

                storageService.setObject("RIDEDETAILID", args.calendarEvent.ride_id);
                $location.path('ride-detail.html');
                console.log(args.calendarEvent.ride_id);


            }
        }
    ];

  


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    //$scope.users = $firebaseArray(ref.child('users'));
    $scope.horses = $firebaseArray(ref.child('horses'));
    $scope.horses.$loaded().then(function (dataArray) {
        var ids = [];

        angular.forEach($scope.user.Details.horse_ids, function (value, key) {
            //console.log(value);
            console.log(key);
            var horse = $scope.horses.$getRecord(key);

            try {
                for (var i in horse.ride_ids) {
                    ids.push(i);
                }
            }
            catch (errloop) {
                console.log(errloop);
            }

            console.log(horse);
        });


        $scope.history = $firebaseArray(ref.child('rides'));
        $scope.history.$loaded().then(function (dataArray) {
            // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id

            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            $scope.histories = [];
            for (var cnt = 0; cnt < ids.length; cnt++) // id in $scope.stb.ride_ids) {
            {
                var id = ids[cnt];
                var horseHistory = $scope.history.$getRecord(id);

                var startDateTime = new Date(horseHistory.start_time);
                var endDateTime = new Date(horseHistory.end_time);


                var eve = {
                    //title: moment(startDateTime).format('HH:MM:SS a') + ' - ' + moment(endDateTime).format('HH:MM:SS a'),
                    title: '',
                    color: $scope.colors[cnt % 3],
                    startsAt: new Date(horseHistory.start_time),
                    endsAt: new Date(horseHistory.end_time),
                    actions: $scope.actions,
                    ride_id: id
                }

                $scope.vm.events.push(eve)
            }
        }).catch(function (err) {

        });





    }).catch(function (error) {
        console.log("Error in loading details");
    });


  
   
      //, {
      //    title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
      //    color: ,
      //    startsAt: moment().subtract(1, 'day').toDate(),
      //    endsAt: moment().add(5, 'days').toDate(),
      //    draggable: true,
      //    resizable: true,
      //    actions: $scope.actions
      //}
    //];

    //$scope.vm.isCellOpen = true;

    //$scope.vm.addEvent = function () {
    //    $scope.vm.events.push({
    //        title: 'New event',
    //        startsAt: moment().startOf('day').toDate(),
    //        endsAt: moment().endOf('day').toDate(),
    //        color: calendarConfig.colorTypes.important,
    //        draggable: true,
    //        resizable: true
    //    });
    //};

    //$scope.vm.eventClicked = function (event) {
    //    alert.show('Clicked', event);
    //};

    //$scope. vm.eventEdited = function (event) {
    //    alert.show('Edited', event);
    //};

    //$scope.vm.eventDeleted = function (event) {
    //    alert.show('Deleted', event);
    //};

    //$scope.vm.eventTimesChanged = function (event) {
    //    alert.show('Dropped or resized', event);
    //};

    //$scope.vm.toggle = function ($event, field, event) {
    //    $event.preventDefault();
    //    $event.stopPropagation();
    //    event[field] = !event[field];
    //};

});

app.controller('DownloadController', function ($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService) {

    $scope.showDownloadButton = false;
    $scope.showAlertButton = false;

    $scope.HorsesData = [];
    $scope.RidesData = [];
    $scope.CordsData = [];

    $scope.rows = [];


    $scope.SetAssociationHeader = function (number, getHeader) {
        var n = "Asssociation " + number;
        getHeader.push(n + " Name");
        getHeader.push(n + " Number");
    }

    $scope.SetAssociationData = function (number, row, asso) {

        var prop = "Asssociation" + number;
        if (asso == null) {
            row[prop + "Name"] = "";
            row[prop + "Number"] = "";
        }
        else {
            row[prop + "Name"] = asso[number - 1].name;
            row[prop + "Number"] = asso[number - 1].number;
        }
    }


    var id = $location.search().id;
    blockUI.start("Fetching report data. It will take a while....");

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Reports'));
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
       
        $scope.ReportConfig = $scope.images.$getRecord(id);

        var date = new Date($scope.ReportConfig.Expiry);
        var current = new Date();

        if (current > date) {
            $scope.showAlertButton = true;
            try{
                $scope.$apply(function () {
                    blockUI.stop();
                });
            }
            catch (error) {

            }
            
        } else {

            $scope.horses = $firebaseArray(ref.child('horses'));
            $scope.horses.$loaded().then(function (dataArray) {
                $scope.HorsesData = dataArray;

                $scope.rides = $firebaseArray(ref.child('rides'));
                $scope.rides.$loaded().then(function (rideArray) {
                    $scope.RidesData = rideArray;


                    $scope.coords = $firebaseArray(ref.child('coords'));
                    $scope.coords.$loaded().then(function (cordsArray) {

                        $scope.CordsData = cordsArray;

                        $scope.rows = [];
                        $scope.getHeader = [];
                        $scope.isHeaderCreated = false;
                        angular.forEach($scope.HorsesData, function (value, key) {

                            var row = {}

                            //horse name logic
                            if (!$scope.isHeaderCreated)
                                $scope.getHeader.push("Horse Name");
                            row.HorseName = value.horse_name;


                            if($scope.ReportConfig.IsAssociations1 =="1"){
                                if (!$scope.isHeaderCreated)
                                    $scope.SetAssociationHeader(1, $scope.getHeader);
                                $scope.SetAssociationData(1, row, value.associations);
                            }

                            if ($scope.ReportConfig.IsAssociations2 == "1") {
                                if (!$scope.isHeaderCreated)
                                    $scope.SetAssociationHeader(2, $scope.getHeader);
                                $scope.SetAssociationData(2, row, value.associations);
                            }

                            if ($scope.ReportConfig.IsAssociations3 == "1") {
                                if (!$scope.isHeaderCreated)
                                    $scope.SetAssociationHeader(3, $scope.getHeader);
                                $scope.SetAssociationData(3, row, value.associations);
                            }

                            if ($scope.ReportConfig.IsAssociations4 == "1") {
                                if (!$scope.isHeaderCreated)
                                    $scope.SetAssociationHeader(4, $scope.getHeader);
                                $scope.SetAssociationData(4, row, value.associations);
                            }
                            
                            var totalTopSspeed = [];
                            var averageSpeed = 0.0;

                            $scope.totalLength = 0;
                            $scope.totalTopSspeed = 0.0;
                            $scope.totalAverageSpeed = 0.0;
                            $scope.totalDistance = 0.0;
                            $scope.totalDuration = 0;
                            $scope.totalEnergy = 0;
                            $scope.rideCount = 0;

                            $scope.isRideExist = false;
                            for (var id in value.ride_ids) {
                                var ride = $scope.RidesData.$getRecord(id);

                                $scope.totalLength = $scope.totalLength + 1;
                                $scope.totalDistance = parseFloat($scope.totalDistance) + parseFloat(ride.total_distance);
                                $scope.totalDuration = parseInt($scope.totalDuration) + parseInt(ride.total_time);
                                $scope.totalEnergy = parseFloat($scope.totalEnergy) + parseFloat(ride.energy);
                                $scope.totalCalories = parseFloat($scope.totalCalories) + parseFloat(ride.calories);
                                //$scope.totalAverageSpeed = $scope.totalAverageSpeed + ride.average_speed;
                                //$scope.totalTopSspeed = $scope.totalTopSspeed + ride.top_speed;
                                averageSpeed = parseFloat(averageSpeed) + parseFloat(ride.average_speed);
                                totalTopSspeed.push(parseFloat(ride.top_speed));
                                $scope.isRideExist = true;
                               
                                if (ride.ismanualride == 1) {
                                    $scope.rideCount++;

                                }
                                   

                                  
                            }

                            if ($scope.isRideExist) {
                                $scope.totalDistance = parseFloat(Math.round($scope.totalDistance * 100) / 100).toFixed(2);
                                $scope.totalEnergy = parseFloat(Math.round($scope.totalEnergy * 100) / 100).toFixed(2);
                                $scope.totalCalories = parseFloat(Math.round($scope.totalCalories * 100) / 100).toFixed(2);

                                $scope.totalAverageSpeed = averageSpeed / $scope.totalLength;

                                $scope.totalAverageSpeed = parseFloat(Math.round($scope.totalAverageSpeed * 100) / 100).toFixed(2);

                                $scope.totalDuration = hhmmss($scope.totalDuration);

                                $scope.totalTopSspeed = Math.max.apply(Math, totalTopSspeed);

                                $scope.totalTopSspeed = parseFloat(Math.round($scope.totalTopSspeed * 100) / 100).toFixed(2);
                             
                            }
                            else {
                                $scope.totalLength = 0;
                                $scope.totalTopSspeed = 0.0;
                                $scope.totalAverageSpeed = 0.0;
                                $scope.totalDistance = 0.0;
                                $scope.totalDuration = 0;
                                $scope.totalEnergy = 0;
                            }

                            
                            if ($scope.ReportConfig.IsTopSpeed == "1") {
                                //TopSpeed logic
                                if (!$scope.isHeaderCreated)
                                    $scope.getHeader.push("Top Speed");
                                row.TopSpeed = $scope.totalTopSspeed + " mph";
                            }

                            if ($scope.ReportConfig.IsAvgSpeed == "1") {
                                //AvarageSpeed logic
                                if (!$scope.isHeaderCreated)
                                    $scope.getHeader.push("Avarage Speed");
                                row.AvarageSpeed = $scope.totalAverageSpeed + " mph";
                            }

                            if ($scope.ReportConfig.IsDistance == "1") {
                                //RideDistance logic
                                if (!$scope.isHeaderCreated)
                                    $scope.getHeader.push("Ride Distance");
                                row.RideDistance = $scope.totalDistance + " miles";
                            }

                            if ($scope.ReportConfig.IsRideCount == "1") {
                                //TopSpeed logic
                                if (!$scope.isHeaderCreated)
                                    $scope.getHeader.push("No of rides");
                                row.RideCount = $scope.totalLength;
                            }

                            if ($scope.ReportConfig.IsHours == "1") {
                                //TotalHours logic
                                if (!$scope.isHeaderCreated)
                                    $scope.getHeader.push("Total Hours");
                                row.TotalHours = $scope.totalDuration;

                                if (!$scope.isHeaderCreated)
                                    $scope.getHeader.push("Ride Hours");
                                row.RideHours = $scope.totalDuration;
                            }

                            if ($scope.ReportConfig.IsEnergy == "1") {
                                //EnergyBurned logic
                                if (!$scope.isHeaderCreated)
                                    $scope.getHeader.push("Energy Burned");
                                row.EnergyBurned = $scope.totalEnergy + " cal";
                            }
                           
                            if ($scope.ReportConfig.IsCords == "1") {
                                if (!$scope.isHeaderCreated)
                                    $scope.getHeader.push("Start Cordinate");

                                if (!$scope.isHeaderCreated)
                                    $scope.getHeader.push("Last Cordinate");

                                var ids = [];
                                var vals = [];

                                $scope.coordId = -1;

                                try {
                                    for (var i in value.ride_ids) {
                                        ids.push({
                                            Id: i, Val: value.ride_ids[i]
                                        });
                                        vals.push(value.ride_ids[i]);
                                    }
                                }
                                catch (errloop) {
                                    console.log(errloop);
                                }

                                var max = Math.max.apply(Math, vals);

                                for (var i = 0; i < ids.length; i++) {
                                    var o = ids[i];
                                    if (o.Val == max)
                                        $scope.coordId = o.Id;// '-KP44cqcDIZo4G5-ziq4'
                                }

                                if ($scope.coordId == -1) {
                                    row.StartCordinate = "Not Available";
                                    row.LastCordinate = "Not Available";
                                }
                                else {
                                    var coordinate = $scope.CordsData.$getRecord($scope.coordId);

                                    if (coordinate != null) {
                                        //StartCordinate logic

                                        try {
                                            var start = coordinate[0];
                                            row.StartCordinate = start.lat + "," + start.lng;
                                        }
                                        catch (coorerror) {
                                            row.StartCordinate = "Not Available";
                                        }

                                        try {
                                            var end = coordinate[coordinate.length - 1];
                                            row.LastCordinate = end.lat + "," + end.lng;
                                        }
                                        catch (endcorderror) {

                                            try {
                                                var counters = [];
                                                for (cnt in coordinate) {
                                                    if (cnt != "$priority" && cnt != "$id") {
                                                        counters.push(cnt);
                                                    }
                                                }
                                                //var max = Math.max.apply(Math, counters);
                                                var endindex = counters[counters.length - 1];//coordinate[max];
                                                var end = coordinate[parseInt(endindex)];
                                                row.LastCordinate = end.lat + "," + end.lng;
                                            }
                                            catch (newerror) {
                                                row.LastCordinate = "Not Available";
                                            }

                                        }
                                    }
                                    else {
                                        row.StartCordinate = "Not Available";
                                        row.LastCordinate = "Not Available";
                                    }
                                }
                            }

                            if (!$scope.isHeaderCreated)
                                $scope.getHeader.push("Manual Ride");
                            row.ManualRideCount = $scope.rideCount;

                            $scope.isHeaderCreated = true;

                            $scope.rows.push(row);

                        });

                        $scope.filename = "EquitrackReport";

                        $scope.showDownloadButton = true;


                        $scope.getArray = $scope.rows;

                        try {
                            $scope.$apply(function () {
                                blockUI.stop();
                            });
                        }
                        catch (error) {

                        }
                    }).catch(function (err) { });
                }).catch(function (err) { });
            }).catch(function (error) { console.log("Error in loading details"); });
        }
        
    }).catch(function (error) {
        console.log("Error in loading details");
    });
});
