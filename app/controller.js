app.controller('AccountController', function MyCtrl($scope, $location, $firebaseObject,
    $firebaseArray, firebaseService, storageService, blockUI, $http, $rootScope) {

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.users = $firebaseArray(ref.child('users'));

    $scope.SendMail = function (email) {

        var TO = email;
        //TO = "vishal.kumar1145@gmail.com";

       

        //var url = storageService.getNodeJSAppURL() + 'sendmail?To=' + TO + '&Subject=' + Subject + '&HTML=' + html;
        var url = storageService.getNodeJSAppURL() + 'welmail?To=' + TO;

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

    $scope.login2 = function () {
        firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).catch(function (error) {
            // Handle Errors here.
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

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
                    $rootScope.$broadcast("messageLoad", {});
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
                        profile: user.profile,
                        createtime :new Date().getTime()
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

    $scope.testing = function () {
        $scope.vm.calendarView = 'day';
        $scope.vm.viewDate = '12/11/2015';
    }

    $scope.colors = [calendarConfig.colorTypes.warning, calendarConfig.colorTypes.info, calendarConfig.colorTypes.important];

    $scope.actions = [
        {
            //label: '<i class=\'glyphicon glyphicon-zoom-out\'></i>',
            label: 'View Details',
            onClick: function (args) {
                console.log(args.calendarEvent.ride_id);

                storageService.setObject("RIDEDETAILID", args.calendarEvent.ride_id);
                $location.path('ride-detail.html');
                console.log(args.calendarEvent.ride_id);


            }
        }
    ];


    $scope.vm.timespanClicked = function (date, cell) {
        console.log(date);
        console.log(cell);

        if ($scope.vm.calendarView === 'month') {
            if (($scope.vm.cellIsOpen && moment(date).startOf('day').isSame(moment($scope.vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                $scope.vm.cellIsOpen = false;
            } else {
                $scope.vm.cellIsOpen = true;
                $scope.vm.viewDate = date;
                $scope.vm.calendarView = 'day';
            }
        }
    }

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

                var h = $scope.horses.$getRecord(horseHistory.horse_firebase_key);

                $scope.actions = [{
                    //label: '<i class=\'glyphicon glyphicon-zoom-out\'></i>',
                    label: h.horse_name,
                    onClick: function (args) {
                        console.log(args.calendarEvent.ride_id);
                        storageService.setObject("RIDEDETAILID", args.calendarEvent.ride_id);
                        $location.path('ride-detail.html');
                        console.log(args.calendarEvent.ride_id);

                    }
                }];


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

app.controller('NavController', function MyCtrl($scope, $location,$rootScope, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI) {

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.users = $firebaseArray(ref.child('users'));

    $scope.user = storageService.getObject("CU");

    $scope.Logout = function () {
        storageService.setObject("CU", null);
        $location.path('/');
    }

    $scope.IsUnreadMessageExist = function () {
        var toReturn = false;
        try{
            $scope.user = storageService.getObject("CU");
            if ($scope.user) {
                for(var i=0;i<$rootScope.appMessages.length;i++) {
                    if ($rootScope.appMessages[i].ReadBy) {
                        var findid = _.contains($rootScope.appMessages[i].ReadBy, $scope.user.Details.$id);
                        if (!findid) {
                            //msgObject.ReadBy.push($scope.user.Details.$id);
                            //msgObject.Read = parseInt(msgObject.Read) + 1;
                            toReturn =true;
                        }
                    }
                    else {
                        toReturn =true;
                        //msgObject.ReadBy = [$scope.user.Details.$id];
                        //msgObject.Read = 1;
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

    $scope.showBedge = false;
    $scope.$on('messageLoad', function (event, args) {
        $scope.showBedge = $scope.IsUnreadMessageExist();
        $scope.$apply();
    });

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

app.controller('DownloadController', function ($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService) {

    $scope.showDownloadButton = false;
    $scope.showAlertButton = false;

    $scope.HorsesData = [];
    $scope.RidesData = [];
    $scope.CordsData = [];

    $scope.rows = [];

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.organisation = $firebaseArray(ref.child('admin'));
    $scope.organisation.$loaded().then(function (dataArray) {
        $scope.association = _.filter(dataArray, function (num) { return num.Role == "Organisation"; });

    }).catch(function (error) {
        console.log("Error in loading details" + error);
    });


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
            $scope.Orghorses = [];
            $scope.horses = $firebaseArray(ref.child('horses'));
            $scope.horses.$loaded().then(function (dataArray) {
                $scope.HorsesData = dataArray;

                for(var i in dataArray)
                {
                    if( dataArray[i].associations != undefined)
                    {
                        var orgh=_.find(dataArray[i].associations, function (num) { return num.number == $scope.ReportConfig.AssociationsId; });
                        if (orgh != undefined)
                        {
                            $scope.Orghorses.push(dataArray[i]);
                        }
                        
                    }
                   
                }
               
                $scope.rides = $firebaseArray(ref.child('rides'));
                $scope.rides.$loaded().then(function (rideArray) {
                    $scope.RidesData = rideArray;


                    $scope.coords = $firebaseArray(ref.child('coords'));
                    $scope.coords.$loaded().then(function (cordsArray) {

                        $scope.CordsData = cordsArray;

                        $scope.rows = [];
                        $scope.getHeader = [];
                        $scope.isHeaderCreated = false;
                        angular.forEach($scope.Orghorses, function (value, key) {

                            var row = {}

                            //horse name logic
                            if (!$scope.isHeaderCreated)
                                $scope.getHeader.push("Horse Name");
                            row.HorseName = value.horse_name;

                            
                            //if($scope.ReportConfig.IsAssociations1 =="1"){
                            //    if (!$scope.isHeaderCreated)
                            //        $scope.SetAssociationHeader(1, $scope.getHeader);
                            //    $scope.SetAssociationData(1, row, value.associations);
                            //}

                            //if ($scope.ReportConfig.IsAssociations2 == "1") {
                            //    if (!$scope.isHeaderCreated)
                            //        $scope.SetAssociationHeader(2, $scope.getHeader);
                            //    $scope.SetAssociationData(2, row, value.associations);
                            //}

                            //if ($scope.ReportConfig.IsAssociations3 == "1") {
                            //    if (!$scope.isHeaderCreated)
                            //        $scope.SetAssociationHeader(3, $scope.getHeader);
                            //    $scope.SetAssociationData(3, row, value.associations);
                            //}

                            //if ($scope.ReportConfig.IsAssociations4 == "1") {
                            //    if (!$scope.isHeaderCreated)
                            //        $scope.SetAssociationHeader(4, $scope.getHeader);
                            //    $scope.SetAssociationData(4, row, value.associations);
                            //}
                            
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























