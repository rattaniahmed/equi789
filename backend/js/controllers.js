
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
        $scope.cntIndex = image.$id;
        $("#addphoto").click();
    }

    $scope.UpdateImageData = function () {


        $("#loadingModal").show();
        var file = document.getElementById('addphoto').files[0];
        var metadata = {
            'contentType': file.type
        };

        var fname = new Date().getMilliseconds() + file.name.substring(file.name.indexOf("."));
        var storageRef = firebase.storage().ref();
        storageRef.child('profile/' + fname).put(file, metadata).then(function (snapshot) {

            debugger;
            var url = snapshot.metadata.downloadURLs[0];

            $("#loadingModal").show();

            var imageRef = $scope.images.$getRecord($scope.cntIndex);
            imageRef.Url = url;

            $scope.images.$save(imageRef).then(function (res) {

                $("#loadingModal").hide();
                console.log(res);
                window.location.reload();

            });



        }).catch(function (error) {
            console.error('Upload failed:', error);
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

        $('#editor').cleanHtml(itemSelected.$value);
    }

    $scope.UpdateContent = function () {
        debugger;
        var updated = $('#editor').cleanHtml();
        var toUpdate = $scope.Imgaes.$getRecord($scope.itemSelected.$id);
        toUpdate.$value = updated;

        $("#loadingModal").show();

        $scope.images.$save(toUpdate).then(function (res) {
            console.log(res);
            $("#loadingModal").hide();
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

        $('#editor').cleanHtml(itemSelected.$value);
    }

    $scope.UpdateContent = function () {
        debugger;
        var updated = $('#editor').cleanHtml();
        var toUpdate = $scope.Imgaes.$getRecord($scope.itemSelected.name);
        toUpdate[$scope.itemSelected.key] = updated;

        $("#loadingModal").show();
        $scope.images.$save(toUpdate).then(function (res) {

            $("#loadingModal").hide();
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


    //$("#filenew").change(function () {
    //    readURL(this);
    //});

    //$("#fileedit").change(function () {
    //    readURL(this);
    //});


    //function readURL(input) {
    //    if (input.files && input.files[0]) {
    //        var reader = new FileReader();

    //        reader.onload = function (e) {
    //            //alert(e.target.result);
    //            //$('#addImg').attr('src', e.target.result);
    //            $scope.photo = e.target.result;
    //            //$scope.UpdateImageData();
    //        }

    //        reader.readAsDataURL(input.files[0]);
    //    }
    //}


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
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        debugger;

        $("#titleedit").val(image.DisplayName);
        $("#linkedit").val(image.HrefLink);
        $scope.photo = image.Url;
        $("#editmodal").modal('show');
    }

    $scope.UpdateImageData = function () {

        $("#loadingModal").show();
        $("#editmodal").hide();
        var file = document.getElementById('fileedit').files[0];
        var metadata = {
            'contentType': file.type
        };

        var fname = new Date().getMilliseconds() + file.name.substring(file.name.indexOf("."));
        var storageRef = firebase.storage().ref();
        storageRef.child('profile/' + fname).put(file, metadata).then(function (snapshot) {

            debugger;
            var url = snapshot.metadata.downloadURLs[0];

            $("#loadingModal").show();

            var imageRef = $scope.images.$getRecord($scope.cntId);
            imageRef.Url = url;
            imageRef.DisplayName = $("#titleedit").val();
            imageRef.HrefLink = $("#linkedit").val();

           

            $scope.images.$add(imageRef).then(function (ref) {
                debugger;
                var id = ref.key();
                console.log("added record with id " + id);
                $("#loadingModal").hide();
                window.location.reload();

            });



        }).catch(function (error) {
            console.error('Upload failed:', error);
        });



    }

    $scope.RemoveSponser = function (image) {
        $("#loadingModal").show();
        $scope.images.$remove(image).then(function (ref) {
            debugger;
            var id = ref.key();
            $("#loadingModal").hide();
        });

    }

    $scope.AddSponser = function () {

       
        $("#loadingModal").show();

        var file = document.getElementById('filenew').files[0];
        var metadata = {
            'contentType': file.type
        };

        var fname = new Date().getMilliseconds() + file.name.substring(file.name.indexOf("."));
        var storageRef = firebase.storage().ref();
        storageRef.child('profile/' + fname).put(file, metadata).then(function (snapshot) {

            debugger;
            var url = snapshot.metadata.downloadURLs[0];

            var toAdd = {
                Url: url,
                DisplayName:$("#titlenew").val(),
                HrefLink:$("#linknew").val()
            }

            $("#modalid").hide();

            $scope.images.$add(toAdd).then(function (ref) {
                debugger;
                var id = ref.key();
                console.log("added record with id " + id);
                $("#loadingModal").hide();

                window.location.reload();

            });

            

        }).catch(function (error) {
            console.error('Upload failed:', error);
        });


    }
});

app.controller('faqController', function ($scope, storageService, firebaseService, $firebaseArray) {

    console.log("faqController");


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('FAQ'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.Collopse = function (image) {

        console.log(image);

        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        debugger;

        $("#titleedit").val(image.QuestionText);
        $("#linkedit").val(image.AnswerText);
        $("#editmodal").modal('show');
    }

    $scope.EditQuestion = function () {
        $("#loadingModal").show();
        $("#editmodal").modal('hide');
        var imageRef = $scope.images.$getRecord($scope.cntId);
        imageRef.QuestionText = $("#titleedit").val();
        imageRef.AnswerText = $("#linkedit").val();

        $scope.images.$save(imageRef).then(function (res) {

            $("#loadingModal").hide();
            console.log(res);
            window.location.reload();

        });


    }

    $scope.RemoveQuestion = function (image) {
        $("#loadingModal").show();
        $scope.images.$remove(image).then(function (ref) {
            debugger;
            var id = ref.key();
            $("#loadingModal").hide();

        });

    }

    $scope.AddQuestion = function () {
        $("#modalid").modal('hide');
        $("#loadingModal").show();
        var toAdd = {
            AnswerText: $("#linknew").val(),
            QuestionText: $("#titlenew").val()
        }

        $scope.images.$add(toAdd).then(function (ref) {
            debugger;
            var id = ref.key();
            console.log("added record with id " + id);

            $("#loadingModal").hide();
            window.location.reload();

        });

    }
});

app.controller('newsController', function ($scope, storageService, firebaseService, $firebaseArray) {

    console.log("faqController");


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('News'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;
        console.log(dataArray);
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.Collopse = function (image) {

        console.log(image);

        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        debugger;

        $("#titleedit").val(image.QuestionText);
        $("#linkedit").val(image.AnswerText);
        $("#editmodal").modal('show');
    }

    $scope.EditQuestion = function () {

        var imageRef = $scope.images.$getRecord($scope.cntId);
        imageRef.QuestionText = $("#titleedit").val();
        imageRef.AnswerText = $("#linkedit").val();

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

    $scope.RemoveQuestion = function (image) {

        $scope.images.$remove(image).then(function (ref) {
            debugger;
            var id = ref.key();
            if (stb.$id == id) {
                console.log("Deleted success fully");
            }

        });

    }

    $scope.AddQuestion = function () {

        var toAdd = {
            AnswerText: $("#linknew").val(),
            QuestionText: $("#titlenew").val()
        }

        $scope.images.$add(toAdd).then(function (ref) {
            debugger;
            var id = ref.key();
            console.log("added record with id " + id);


            window.location.reload();

        });

    }

    $scope.Redirect = function () {
        window.location.href = "#/news/-1";
    }
});

app.controller('editNewsController', function ($scope, $routeParams, storageService, firebaseService, $firebaseArray) {

    console.log("editNewsController" + $routeParams.id);

    $scope.editId = $routeParams.id;
    $scope.Question = {};

    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.images = $firebaseArray(ref.child('Content').child('News'));
    $scope.Imgaes = [];
    $scope.images.$loaded().then(function (dataArray) {
        $scope.Imgaes = dataArray;

        if ($routeParams.id == -1) { }
        else {
            $scope.Question = $scope.images.$getRecord($routeParams.id);
            $("#title").val($scope.Question.Title);
            console.log(dataArray);
        }
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    $scope.Collopse = function (image) {

        console.log(image);

        $("#link_" + image.$id).addClass("collapsed");
        $("#div_" + image.$id).addClass("in");

    }

    $scope.EditQuestionModal = function (image) {
        $scope.cntId = image.$id;
        //$("#addphoto").click();
        debugger;

        $("#titleedit").val(image.QuestionText);
        $("#linkedit").val(image.AnswerText);
        $("#editmodal").modal('show');
    }

    $scope.EditQuestion = function () {

        $("#loadingModal").show();
        var imageRef = $scope.images.$getRecord($routeParams.id);
        imageRef.Content = $('#editor').cleanHtml();
        imageRef.Title = $("#title").val();

        $scope.images.$save(imageRef).then(function (res) {

            $("#loadingModal").hide();
            //$scope.$apply(function () {
            //    blockUI.stop();
            //});

            ////storageService.setObject("CS", rideRef);
            //swal("", "Your notes details has been edited success fully", "success");
            //console.log(res);
            console.log(res);
            window.location.href = "#/news"

        });


    }

    $scope.Delete = function () {
        $("#loadingModal").show();
        var question = $scope.Question;
        $scope.images.$remove(question).then(function (ref) {
            debugger;
            var id = ref.key();
            
            $("#loadingModal").hide();
            window.location.href = "#/news"

        });

    }


    $scope.Cancle = function () {
        window.location.href = "#/news";
    }

    $scope.AddQuestion = function () {
        $("#loadingModal").show();
        var toAdd = {
            Content: $('#editor').cleanHtml(),
            Title: $("#title").val()
        }

        $scope.images.$add(toAdd).then(function (ref) {
            debugger;
            var id = ref.key();
            console.log("added record with id " + id);
            $("#loadingModal").hide();
            window.location.href = "#/news"

        });

    }

    $scope.Action = function () {
        if ($routeParams.id == -1)
            $scope.AddQuestion();
        else
            $scope.EditQuestion();
    }

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