
app.controller('AccountController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI) {

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.users = $firebaseArray(ref.child('users'));

    $scope.SendMail = function (email) {

        var TO = email;
        //TO = "vishal.kumar1145@gmail.com";

        var Subject = "Welcome message from Equitrack.com";

        var html = "Thanks for joining us."

        //html += "<br/><br/><br/>";

        //html += "<table>"
        //html += "<tr>      <td>First Name :- </td>  <td> " + ReplaceNull($scope.first_name) + "</td>        </tr>"
        //html += "<tr>      <td>Last Name :- </td>  <td> " + ReplaceNull($scope.last_name) + "</td>        </tr>"
        //html += "<tr>      <td>Email :- </td>  <td> " + ReplaceNull($scope.email) + "</td>        </tr>"
        //html += "<tr>      <td>Mobile :- </td>  <td> " + ReplaceNull($scope.mobile) + "</td>        </tr>"
        //html += "<tr>      <td>Message :- </td>  <td> " + ReplaceNull($scope.msg) + "</td>        </tr>"
        //html += "</table>"

        html += "<br/><br/><br/>";

        html += "Equitrack Team</br>"


        var inputData = PrepareRequestForMail("TEST", TO, "", "", Subject, html, "");



        var mailgunUrl = "myequitrack.com";
        var mailgunApiKey = window.btoa("api:key-d1a5b9de325143c036cf1701b359c325")

       
            $http({
                "method": "POST",
                "url": "https://api.mailgun.net/v3/" + mailgunUrl + "/messages",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + mailgunApiKey
                },
                data: "from=" + "test@example.com" + "&to=" + "vishal.kumar1145@gmail.com" + "&subject=" + "MailgunTest" + "&text=" + "EmailBody"
            }).then(function (success) {
                console.log("SUCCESS " + JSON.stringify(success));
            }, function (error) {
                console.log("ERROR " + JSON.stringify(error));
            });


        //$.ajax({
        //    type: 'POST',
        //    //url: "http://localhost:51912/api/mail",
        //    url: "https://52.41.72.28/mailws/api/mail",
        //    dataType: 'json',
        //    data: JSON.stringify(inputData),
        //    async: true,
        //    success: function (response) {
        //        //$scope.$apply(function () {
        //        //    blockUI.stop();
        //        //    $scope.first_name = "";
        //        //    $scope.last_name = "";
        //        //    $scope.email = "";
        //        //    $scope.mobile = "";
        //        //    $scope.msg = "";
        //        //});
        //    },
        //    error: function (reposnse) {
        //        console.log("Unknown error occured");
        //    }
        //});

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

var isAdmin =  0;
 try{
isAdmin = user.isAdmin;
 }catch(err){
isAdmin = 0 ;
 }

 if(isAdmin == 1)
storageService.setObject("isAdmin", true);
else
storageService.setObject("isAdmin", false);


                    swal("", "You have success fully logged In, You being redirect to dashboard.", "success");
                    if(isAdmin == 1)
                    {
$scope.$apply(function () {
                        $location.path('static.html');
                    });
                    }
                    else{
                    $scope.$apply(function () {
                        $location.path('dashboard.html');
                    });
                    }
                }
            });
        }
    }
   
    $scope.reset = function () {

        if (!ValidateControl(['email']))
            return;
        else {
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
        }
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

app.controller('SettingsController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI) {

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

});

app.controller('StableController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {

    sessionService.CHECKSESSION();
    

    $scope.user = storageService.getObject("CU");

    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.users = $firebaseArray(ref.child('users'));

    console.log($scope.user);

    $scope.stables = [];

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    //$scope.users = $firebaseArray(ref.child('users'));
    $scope.horses = $firebaseArray(ref.child('horses'));
    $scope.horses.$loaded().then(function (dataArray) {
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
                            debugger;
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
            debugger;

            blockUI.start("Removing horse.....");
            $scope.horses.$remove(stb).then(function (ref) {
                debugger;
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

                delete $scope.user.Details.horse_ids[id];

                $scope.users.$save(userRef).then(function (res) {
                    console.log(res);
                    //$scope.user.Details.profile = userRef.profile;
                    $scope.$apply(function () {
                        blockUI.stop();
                    });

                    window.location.reload();
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

    debugger;
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
                debugger;
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


    
    debugger;

    $scope.totalRidesDetails = [];
    $scope.totalLength = 0;
    $scope.totalDistance = 0.0;
    $scope.totalDuration = 0;
    $scope.totalEnergy = 0;
    $scope.totalCalories = 0;
    $scope.totalAverageSpeed = 0.0;
    $scope.totalTopSspeed = 0;

    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.rides.$loaded().then(function (dataArray) {
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id

       
        var totalTopSspeed = [];
        var averageSpeed = 0.0;
        debugger;
        for (var id in $scope.stb.ride_ids) {
            var ride = $scope.rides.$getRecord(id);
            debugger;
            //$scope.totalRidesDetails.push(ride);
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

        $scope.totalDistance = parseFloat(Math.round($scope.totalDistance * 100) / 100).toFixed(2); 
        $scope.totalEnergy = parseFloat(Math.round($scope.totalEnergy * 100) / 100).toFixed(2);
        $scope.totalCalories = parseFloat(Math.round($scope.totalCalories * 100) / 100).toFixed(2);

        $scope.totalAverageSpeed = averageSpeed / $scope.totalLength;

        $scope.totalAverageSpeed = parseFloat(Math.round($scope.totalAverageSpeed * 100) / 100).toFixed(2);

        $scope.totalDuration = hhmmss($scope.totalDuration);

        $scope.totalTopSspeed = Math.max.apply(Math, totalTopSspeed);

        $scope.totalTopSspeed = parseFloat(Math.round($scope.totalTopSspeed * 100) / 100).toFixed(2);

    }).catch(function (err) {

    });

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    

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

        horseRef.age = '';//ReplaceNull($scope.stb.age);
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

            $scope.$apply(function () {
                blockUI.stop();
            });

            storageService.setObject("CS", horseRef);
            swal("", "Your stable details has been added edied success fully", "success");
            console.log(res);

            window.location.reload();

        });

    }

});

app.controller('AddStableDetailsController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {
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


    $("#addphoto").change(function () {
        readURL(this);
    });


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

    $scope.stbadd = {
        associations: $scope.assolist,
        average_speed: "0.0",
        birthday: "",
        calories: "0.0",
        distance: "0.0",
        duration: "00:00:00",
        energy: "0.0",
        horse_name: "",
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
            debugger;
            var id = ref.key();
            console.log("added record with id " + id);
            swal("", "Your stable details has been added success fully", "success");
            //$location.path('my-stable.html');

            $scope.user.Details.horse_ids[id] = {
                created_at: ""
            };

            //$scope.user.Details.horse_ids.push(id);
            storageService.setObject("CU",$scope.user);

            var userRef = $scope.users.$getRecord($scope.user.Auth.uid);
            userRef.horse_ids[id] = {
                created_at: ""
            };

            $scope.users.$save(userRef).then(function (res) {
                console.log(res);
                //$scope.user.Details.profile = userRef.profile;
                $scope.$apply(function () {
                    blockUI.stop();
                });

                window.location.reload();
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
    $scope.history = $firebaseArray(ref.child('rides'));
    $scope.history.$loaded().then(function (dataArray) {
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
        debugger;

        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        $scope.histories = [];

        for (var id in $scope.stb.ride_ids) {

            var horseHistory = $scope.history.$getRecord(id);
            var time = $scope.stb.ride_ids[id];

            var date = new Date(parseInt(time));
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
                    Year:year,
                    MonthYear: monthyear,
                    MonthInt:monthInt,
                    DataArray: [horseHistory]
                });
            }
            else {
                $scope.histories[k].DataArray.push(horseHistory)
            }
        }


        
        $scope.historiesToDisplay = [];
        for (var l = 0 ; l < $scope.histories.length; l++) {
            debugger;
            var history = $scope.histories[l];
            
            var totalDistance = 0.0;
            var totalDuration = 0;
            var totalEnergy = 0;
            var totalCalories = 0;
            var totalAverageSpeed = 0.0;
            var totalTopSspeed = [];
            var averageSpeed = 0.0;


            for (var inner = 0; inner < history.DataArray.length; inner++) {

                debugger;

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

            debugger;
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
    

});

app.controller('AllHistoryController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {


    //$(function () {
    //    $('#dp3').datepicker({
    //        viewMode: 'years'
    //    });

    //});

    console.log("AllHistoryController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    $scope.stb = storageService.getObject("CS");

    $scope.historyCache = storageService.getObject("CHIST");

    console.log($scope.stb);

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    $scope.SeeMap = function (his) {
        storageService.setObject("RIFM", his.$id);
        $location.path('ridemap.html');
        console.log(his.ride_ids);
    }

    $scope.RideDetail = function (his) {
        storageService.setObject("RIDEDETAILID", his.$id);
        $location.path('ride-detail.html');
        console.log(his.ride_ids);
    }


    $scope.histories = [];

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.history = $firebaseArray(ref.child('rides'));
    $scope.history.$loaded().then(function (dataArray) {
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        $scope.histories = [];

        for (var id in $scope.stb.ride_ids) {

            var horseHistory = $scope.history.$getRecord(id);
            var time = $scope.stb.ride_ids[id];

            var date = new Date(parseInt(time));
            var month = monthNames[date.getMonth()];
            var year = date.getFullYear();



            if ($scope.historyCache.Month == month && $scope.historyCache.Year == year) {
                horseHistory.ActualTime = time;
                horseHistory.TimeToDisplay = date.format("mmmm d, yyyy h:MM:ss TT");
                horseHistory.total_time = hhmmss(horseHistory.total_time);
                $scope.histories.push(horseHistory);
            }
        }

        $scope.histories = $scope.histories.sort(function (a, b) {
            return new Date(b.ActualTime).getTime() - new Date(a.ActualTime).getTime()
        });


        //$scope.histories = horseHistory;
    }).catch(function (err) {

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

app.controller('DashboardController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, Socialshare) {

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.user = storageService.getObject("CU");
    console.log("DashboardController");

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }


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
            
            for (var i in horse.ride_ids) {
                ids.push({
                    Id: i, Val: horse.ride_ids[i]
                })
                vals.push(horse.ride_ids[i]);
            }

           
            console.log(horse);
        });


        var max = Math.max.apply(Math, vals);

        for (var i = 0; i < ids.length; i++) {
            var o = ids[i];
            if (o.Val == max)
                $scope.rideId = o.Id;// '-KP44cqcDIZo4G5-ziq4'
        }



        //var ref1 = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
        $scope.coords = $firebaseArray(ref.child('coords'));
        $scope.coords.$loaded().then(function (dataArray) {
            // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
            var id = $scope.rideId;
            var coord = $scope.coords.$getRecord(id);
            $scope.Map(coord);
            console.log(coord);
        }).catch(function (err) {

        });

        

    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $scope.Map = function (flightPlanCoordinates) {

        var lat = 0;
        var lng = -180;
        if (flightPlanCoordinates.length > 2)
        {
            var index = parseInt((flightPlanCoordinates.length - 1) / 2);
            lat = flightPlanCoordinates[0].lat;
            lng = flightPlanCoordinates[0].lng;
        }
        else
        {
            lat = 0;
            lng = -180;
        }
        
       
        var cen = { lat: lat, lng: lng };
        var ori = new google.maps.LatLng(flightPlanCoordinates[0].lat, flightPlanCoordinates[0].lng);
        var dest = new google.maps.LatLng(flightPlanCoordinates[flightPlanCoordinates.length - 1].lat, flightPlanCoordinates[flightPlanCoordinates.length - 1].lng);
       
        var directionsService = new google.maps.DirectionsService();

        //var map = new google.maps.Map(document.getElementById('map'), {
        //    zoom: 7,
        //    center: cen,
        //    zoomControl: true,
        //    zoomControlOptions: {
        //        position: google.maps.ControlPosition.TOP_RIGHT
        //    }
        //});

        //var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });


        var toDisplay = [];

        for (var i = 0 ; i < 4; i++) {
            //toDisplay.push({
            //    location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
            //    stopover: true
            //});
            toDisplay.push(flightPlanCoordinates[i]);
        }

        debugger;

        toDisplay = [
          { lat: 37.772, lng: -122.214 },
          { lat: 21.291, lng: -157.821 },
          { lat: -18.142, lng: 178.431 },
          { lat: -27.467, lng: 153.027 }
        ];


        //if (flightPlanCoordinates.length > 8) {

        //    for (var i = 1 ; i <= 3; i++) {
        //        toDisplay.push({
        //            location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
        //            stopover: true
        //        });
        //    }

        //    for (var i = flightPlanCoordinates.length - 5 ; i <= flightPlanCoordinates.length - 2; i++) {
        //        toDisplay.push({
        //            location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
        //            stopover: true
        //        });
        //    }

        //}
        //else {
        //    for (var i = 0 ; i < flightPlanCoordinates.length; i++) {
        //        toDisplay.push({
        //            location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
        //            stopover: true
        //        });
        //    }
        //}

        //var request = {
        //    origin: ori, 
        //    destination: dest,
        //    travelMode: 'BICYCLING',
        //    waypoints: toDisplay
        //};

        //directionsService.route(request, function (result, status) {
        //    if (status == 'OK') {
        //        directionsDisplay.setDirections(result);
        //    }
        //});

        console.log(flightPlanCoordinates);
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: ori,//{ lat: 0, lng: -180 },
            //mapTypeId: 'terrain'
        });

        //flightPlanCoordinates = [
        //  { lat: 37.772, lng: -122.214 },
        //  { lat: 21.291, lng: -157.821 },
        //  { lat: -18.142, lng: 178.431 },
        //  { lat: -27.467, lng: 153.027 }
        //];

        var flightPath = new google.maps.Polyline({
            path: toDisplay,
            //geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);

       
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

        //$scope.Map();
        $scope.graph1();
        $scope.graph2();        $scope.graph3();

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

   

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.rides.$loaded().then(function (dataArray) {
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
        var id = $scope.rideId;
        var lastRide = $scope.rides.$getRecord(id);
        $scope.ride_time_to_display = hhmmss(lastRide.ride_time);
        $scope.total_time_to_display = hhmmss(lastRide.total_time);
        $scope.lastRide = lastRide;
        console.log($scope.lastRide);
    }).catch(function (err) {

    });

    $scope.UpdateNotes = function () {

        debugger;
        blockUI.start("Updating notes details.....");

        var rideRef = $scope.rides.$getRecord($scope.rideId);
        rideRef.notes = ReplaceNull($scope.lastRide.notes);

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
        $scope.graph2();        $scope.graph3();

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

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }



    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.rides = $firebaseArray(ref.child('rides'));
    $scope.rides.$loaded().then(function (dataArray) {
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
        var id = $scope.rideId;
        var lastRide = $scope.rides.$getRecord(id);
        $scope.ride_time_to_display = hhmmss(lastRide.ride_time);
        $scope.total_time_to_display = hhmmss(lastRide.total_time);
        $scope.lastRide = lastRide;
        console.log($scope.lastRide);
    }).catch(function (err) {

    });

    $scope.UpdateNotes = function () {

        debugger;
        blockUI.start("Updating notes details.....");

        var rideRef = $scope.rides.$getRecord($scope.rideId);
        rideRef.notes = ReplaceNull($scope.lastRide.notes);

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
        $scope.graph2();        $scope.graph3();

    }

    //$scope.Start();

});

app.controller('RideMapController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService) {

    console.log("HistoryController");
    sessionService.CHECKSESSION();
    $scope.user = storageService.getObject("CU");

    $scope.stb = storageService.getObject("CS");

    $scope.rideId = storageService.getObject("RIFM");

    try {
        //$scope.rideId = $scope.stb.ride_ids[0];
        console.log($scope.rideId)
    }
    catch (err) {

    }

    var ref = firebaseService.FIREBASEENDPOINT();
    $scope.coords = $firebaseArray(ref.child('coords'));
    $scope.coords.$loaded().then(function (dataArray) {
        // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
        var id = $scope.rideId;
        var coord = $scope.coords.$getRecord(id);
        if (coord == null)
            coord = [];
        $scope.Map(coord);
        console.log(coord);
    }).catch(function (err) {

    });


    console.log($scope.stb);

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }



   
   
    $scope.Map = function (flightPlanCoordinates) {

        var lat = 0;
        var lng = -180;
        if (flightPlanCoordinates.length > 2) {
            var index = parseInt((flightPlanCoordinates.length - 1) / 2);
            lat = flightPlanCoordinates[index].lat;
            lng = flightPlanCoordinates[index].lng;
        }
        else {
            lat = 0;
            lng = -180;
        }




        var directionsService = new google.maps.DirectionsService();

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: { lat: lat, lng: lng },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
        });

        var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });

        var toDisplay = [];

        if (flightPlanCoordinates.length > 8) {

            for (var i = 1 ; i <= 3; i++) {
                toDisplay.push({
                    location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
                    stopover: true
                });
            }

            for (var i = flightPlanCoordinates.length - 5 ; i <= flightPlanCoordinates.length - 2; i++) {
                toDisplay.push({
                    location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
                    stopover: true
                });
            }

        }
        else {
            for (var i = 0 ; i < flightPlanCoordinates.length; i++) {
                toDisplay.push({
                    location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
                    stopover: true
                });
            }
        }


        var request = {
            origin: flightPlanCoordinates[0],
            destination: flightPlanCoordinates[flightPlanCoordinates.length - 1],
            travelMode: 'BICYCLING',
            waypoints: toDisplay
        };

        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(result);
            }
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
        $scope.graph2();        $scope.graph3();

    }

    $scope.Start();

});


app.controller('ShareController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService) {

    console.log("ShareController");
    sessionService.CHECKSESSION();

    $scope.type = $location.search().type;
    $scope.id = $location.search().id;

    var ref = firebaseService.FIREBASEENDPOINT();

    $scope.Map = function (flightPlanCoordinates) {

        var lat = 0;
        var lng = -180;
        if (flightPlanCoordinates.length > 2) {
            var index = parseInt((flightPlanCoordinates.length - 1) / 2);
            lat = flightPlanCoordinates[index].lat;
            lng = flightPlanCoordinates[index].lng;
        }
        else {
            lat = 0;
            lng = -180;
        }




        var directionsService = new google.maps.DirectionsService();

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: { lat: lat, lng: lng },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT
            },
        });

        var directionsDisplay = new google.maps.DirectionsRenderer({ map: map });

        var toDisplay = [];

        if (flightPlanCoordinates.length > 8) {

            for (var i = 1 ; i <= 3; i++) {
                toDisplay.push({
                    location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
                    stopover: true
                });
            }

            for (var i = flightPlanCoordinates.length - 5 ; i <= flightPlanCoordinates.length - 2; i++) {
                toDisplay.push({
                    location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
                    stopover: true
                });
            }

        }
        else {
            for (var i = 0 ; i < flightPlanCoordinates.length; i++) {
                toDisplay.push({
                    location: new google.maps.LatLng(flightPlanCoordinates[i].lat, flightPlanCoordinates[i].lng),
                    stopover: true
                });
            }
        }


        var request = {
            origin: flightPlanCoordinates[0],
            destination: flightPlanCoordinates[flightPlanCoordinates.length - 1],
            travelMode: 'BICYCLING',
            waypoints: toDisplay
        };

        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(result);
            }
        });


    }
   

    $scope.Start = function () {
        if ($scope.type == 1) {
            $scope.coords = $firebaseArray(ref.child('coords'));
            $scope.coords.$loaded().then(function (dataArray) {
                // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
                var coord = $scope.coords.$getRecord($scope.id);
                $scope.Map(coord);
                console.log(coord);
            }).catch(function (err) {

            });
        } else if ($scope.type == 2) {
            $scope.coords = $firebaseArray(ref.child('coords'));
            $scope.coords.$loaded().then(function (dataArray) {
                // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
                var coord = $scope.coords.$getRecord($scope.id);
                $scope.Map(coord);
                console.log(coord);
            }).catch(function (err) {

            });

        } else if ($scope.type == 3) {

            $scope.coords = $firebaseArray(ref.child('coords'));
            $scope.coords.$loaded().then(function (dataArray) {
                // var id = "-KNYvexIXEDLpdaZPBi1";//$scope.stb.$id
                var coord = $scope.coords.$getRecord($scope.id);
                $scope.Map(coord);
                console.log(coord);
            }).catch(function (err) {

            });
        }

    }

    $scope.Start();

});


