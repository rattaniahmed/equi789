
app.controller('imagesController', function ($scope, storageService, firebaseService, $firebaseArray) {

    //console.log("images");


    $("#addphoto").change(function () {
        readURL(this);
    });


    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                //alert(e.target.result);
                //$('#addImg').attr('src', e.target.result);
                $scope.photo = e.target.result;
                $scope.UpdateImageData();
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Images'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $scope.UpdateImage = function (image,index) {
        $scope.cntIndex = index;
        $("#addphoto").click();
    }

    $scope.UpdateImageData = function () {

        var imageRef = $scope.images.$getRecord($scope.cntIndex);
        imageRef.Url = $scope.photo;

        $scope.images.$save(imageRef).then(function (res) {

            //$scope.$apply(function () {
            //    blockUI.stop();
            //});

            ////storageService.setObject("CS", rideRef);
            //swal("", "Your notes details has been edited success fully", "success");
            //console.log(res);
            console.log(res);
            window.location.reload();

        });


    }

});





app.controller('pagesController', function ($scope, storageService, firebaseService, $firebaseArray) {


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Pages'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;

        //$scope.categories = [];

        //angular.forEach(dataArray, function (value, key) {
        //    //$scope.Sections.push(value.$id);

        //    debugger;


        //    for (var p in value) {
        //        if (p != "$id" && p != "$priority") {
        //            var cat = {};
        //            cat.name = value.$id;
        //            cat.key = p;
        //            cat.val = value[p];

        //            $scope.categories.push(cat);
        //        }
        //    }


        //});

        $scope.itemSelected = $scope.Imgaes[0];


    }).catch(function (error) {
        console.log("Error in loading details");
    });

    function initToolbarBootstrapBindings() {
        var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
            'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
            'Times New Roman', 'Verdana'
        ],
          fontTarget = $('[title=Font]').siblings('.dropdown-menu');
        $.each(fonts, function (idx, fontName) {
            fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
        });
        $('a[title]').tooltip({
            container: 'body'
        });
        $('.dropdown-menu input').click(function () {
            return false;
        })
          .change(function () {
              $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
          })
          .keydown('esc', function () {
              this.value = '';
              $(this).change();
          });

        $('[data-role=magic-overlay]').each(function () {
            var overlay = $(this),
              target = $(overlay.data('target'));
            overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
        });

        if ("onwebkitspeechchange" in document.createElement("input")) {
            var editorOffset = $('#editor').offset();

            $('.voiceBtn').css('position', 'absolute').offset({
                top: editorOffset.top,
                left: editorOffset.left + $('#editor').innerWidth() - 35
            });
        } else {
            $('.voiceBtn').hide();
        }
    }

    function showErrorAlert(reason, detail) {
        var msg = '';
        if (reason === 'unsupported-file-type') {
            msg = "Unsupported format " + detail;
        } else {
            console.log("error uploading file", reason, detail);
        }
        $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
          '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
    }

    $scope.onCategoryChange = function (itemSelected) {

        $('#editor').cleanHtml(itemSelected.val);
    }

    $scope.UpdateContent = function () {
        debugger;
        var updated = $('#editor').cleanHtml();
        var toUpdate = $scope.Imgaes.$getRecord($scope.itemSelected.$id);
        toUpdate.$value = updated;


        $scope.images.$save(toUpdate).then(function (res) {
            console.log(res);
            window.location.reload();
        });

    }

    $scope.Init = function () {



        initToolbarBootstrapBindings();

        $('#editor').wysiwyg({
            fileUploadError: showErrorAlert
        });

        window.prettyPrint;
        prettyPrint();



    }

    $scope.Init();



});




app.controller('staticController', function ($scope, storageService, firebaseService, $firebaseArray) {

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Static').child('HomePage'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
       
        $scope.categories = [];

        angular.forEach(dataArray, function (value, key) {
            //$scope.Sections.push(value.$id);

            debugger;
           

            for (var p in value) {
                if (p != "$id" && p != "$priority") {
                    var cat = {};
                    cat.name = value.$id;
                    cat.key = p;
                    cat.val = value[p];

                    $scope.categories.push(cat);
                }
            }
           

        });

        $scope.itemSelected = $scope.categories[0];

        console.log($scope.Sections);

    }).catch(function (error) {
        console.log("Error in loading details");
    });

    function initToolbarBootstrapBindings() {
        var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
            'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
            'Times New Roman', 'Verdana'
        ],
          fontTarget = $('[title=Font]').siblings('.dropdown-menu');
        $.each(fonts, function (idx, fontName) {
            fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
        });
        $('a[title]').tooltip({
            container: 'body'
        });
        $('.dropdown-menu input').click(function () {
            return false;
        })
          .change(function () {
              $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
          })
          .keydown('esc', function () {
              this.value = '';
              $(this).change();
          });

        $('[data-role=magic-overlay]').each(function () {
            var overlay = $(this),
              target = $(overlay.data('target'));
            overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
        });

        if ("onwebkitspeechchange" in document.createElement("input")) {
            var editorOffset = $('#editor').offset();

            $('.voiceBtn').css('position', 'absolute').offset({
                top: editorOffset.top,
                left: editorOffset.left + $('#editor').innerWidth() - 35
            });
        } else {
            $('.voiceBtn').hide();
        }
    }

    function showErrorAlert(reason, detail) {
        var msg = '';
        if (reason === 'unsupported-file-type') {
            msg = "Unsupported format " + detail;
        } else {
            console.log("error uploading file", reason, detail);
        }
        $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
          '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
    }

    $scope.onCategoryChange = function (itemSelected) {

        $('#editor').cleanHtml(itemSelected.val);
    }

    $scope.UpdateContent = function () {
        debugger;
        var updated = $('#editor').cleanHtml();
        var toUpdate = $scope.Imgaes.$getRecord($scope.itemSelected.name);
        toUpdate[$scope.itemSelected.key] = updated;


        $scope.images.$save(toUpdate).then(function (res) {

            //$scope.$apply(function () {
            //    blockUI.stop();
            //});

            ////storageService.setObject("CS", rideRef);
            //swal("", "Your notes details has been edited success fully", "success");
            //console.log(res);
            console.log(res);
            window.location.reload();

        });


    }

    $scope.Init = function () {



        initToolbarBootstrapBindings();

        $('#editor').wysiwyg({
            fileUploadError: showErrorAlert
        });

        window.prettyPrint;
        prettyPrint();


       
    }

    $scope.Init();

});




app.controller('sponsersController', function ($scope, storageService, firebaseService, $firebaseArray) {

    //console.log("images");


    $("#addphoto").change(function () {
        readURL(this);
    });


    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                //alert(e.target.result);
                //$('#addImg').attr('src', e.target.result);
                $scope.photo = e.target.result;
                $scope.UpdateImageData();
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('Sponsers'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });


    $scope.UpdateImage = function (image, index) {
        $scope.cntIndex = index;
        $("#addphoto").click();
    }

    $scope.UpdateImageData = function () {

        var imageRef = $scope.images.$getRecord($scope.cntIndex);
        imageRef.Url = $scope.photo;

        $scope.images.$save(imageRef).then(function (res) {

            //$scope.$apply(function () {
            //    blockUI.stop();
            //});

            ////storageService.setObject("CS", rideRef);
            //swal("", "Your notes details has been edited success fully", "success");
            //console.log(res);
            console.log(res);
            window.location.reload();

        });


    }

});