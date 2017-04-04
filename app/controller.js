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
           
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
           
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
                   
                } else {

                    var user = $scope.users.$getRecord(authData.uid);
                    if (user) {
                        user.profile = CleanProfileUrl(user.profile);

                        var obj = {
                            Auth: authData,
                            Details: user
                        };

                        storageService.setObject("CU", obj);
                    }
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

        
            blockUI.start("Sending password");
           

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
                            
                            var obj = {
                                Auth: userData,
                                Details: user
                            };
                            storageService.setObject("CU", obj);
                           
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
                      
                        console.error('Upload failed:', error);
                       

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
      
    }).catch(function (error) {
        console.log("Error in loading details");
    });




});

app.controller('FAQController', function ($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService) {


});

app.controller('NewsController', function ($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI, sessionService, $sce) {


    
    var id = $location.search().id;
    
    var ref = firebaseService.FIREBASEENDPOINT(); 
    $scope.images = $firebaseArray(ref.child('Content').child('News'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        $scope.news = $scope.Imgaes.$getRecord(id);

        $scope.news.Content = $sce.trustAsHtml($scope.news.Content.toString());
        $scope.news.Title = $sce.trustAsHtml($scope.news.Title.toString());

     
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

    var ref = firebaseService.FIREBASEENDPOINT();   
  
    $scope.horses = $firebaseArray(ref.child('horses'));
    $scope.horses.$loaded().then(function (dataArray) {
        var ids = [];

        angular.forEach($scope.user.Details.horse_ids, function (value, key) {
          
            
            var horse = $scope.horses.$getRecord(key);

            try {
                for (var i in horse.ride_ids) {
                    ids.push(i);
                }
            }
            catch (errloop) {
                console.log(errloop);
            }

            
        });


        $scope.history = $firebaseArray(ref.child('rides'));
        $scope.history.$loaded().then(function (dataArray) {
           

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
                    
                    label: h.horse_name,
                    onClick: function (args) {
                        console.log(args.calendarEvent.ride_id);
                        storageService.setObject("RIDEDETAILID", args.calendarEvent.ride_id);
                        $location.path('ride-detail.html');
                        console.log(args.calendarEvent.ride_id);

                    }
                }];


                var eve = {
                    
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
    showHide=function(bool) {
        if (bool) {
            $("#message").show();
        }
        else {
            $("#message").hide();
        }

      
    }
    $scope.UserOrg = [];
    $scope.RefreshMessagess = function () {
        $scope.user = storageService.getObject("CU");
        if ($scope.user) {
            for (var i in $scope.user.Details.horse_ids) {

                var horse = $rootScope.appHorses.$getRecord(i);

                if (horse && horse.associations) {
                    for (var i = 0; i < horse.associations.length; i++) {
                        if (!_.contains($scope.UserOrg, horse.associations[i].filter)) {
                            $scope.UserOrg.push(horse.associations[i].filter);
                        }

                    }
                    // $scope.RefreshMessages();

                }



            }
        }
        var ShowMessages = [];
        //for (var i = 0; i < $scope.UserOrg.length; i++) {

        for (var mcounter in $rootScope.appMessages) {
            var msgToAdd = $rootScope.appMessages[mcounter];
            msgToAdd.Id = mcounter;
            if (parseInt($rootScope.appMessages[mcounter].AllowMessageToAll) == 1) {
                ShowMessages.push(msgToAdd);
            } else {
                if ($scope.UserOrg) {
                    for (var i = 0; i < $scope.UserOrg.length; i++) {
                        if ($rootScope.appMessages[mcounter].OrganisationId == $scope.UserOrg[i]) {
                            ShowMessages.push(msgToAdd);
                        }
                    }
                }
            }
        }

        return ShowMessages;
        // $scope.$apply();

    }

    $scope.IsUnreadMessageExist = function () {
        $scope.RefreshMessages = $scope.RefreshMessagess();
        var toReturn = false;
        try{
            $scope.user = storageService.getObject("CU");
            if ($scope.user) {
                for (var i = 0; i < $scope.RefreshMessages.length; i++) {
                    if ($scope.RefreshMessages[i].ReadBy) {
                        var findid = _.contains($scope.RefreshMessages[i].ReadBy, $scope.user.Details.$id);
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
    //showHide($scope.showBedge);
    $scope.$on('messageLoad', function (event, args) {
        $scope.showBedge = $scope.IsUnreadMessageExist();
        showHide($scope.showBedge);
        //$scope.$apply();
    });
   
});


app.controller('StaticContentController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, blockUI) {

    var ref = firebaseService.FIREBASEENDPOINT();  
    
  

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
























