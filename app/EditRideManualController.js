app.controller('EditRideManualController', function MyCtrl($scope, $location, $firebaseObject, $firebaseArray, firebaseService, storageService, sessionService, blockUI) {

    //$scope.init = function () {
    //    $(function () {
    //        $('#StartRide').datetimepicker();
    //    });
    //    $(function () {
    //        $('#EndRide').datetimepicker();
    //    });
    //}

    //sessionService.CHECKSESSION();
    //$scope.user = storageService.getObject("CU");

    //var ref = firebaseService.FIREBASEENDPOINT();
    //$scope.coords = $firebaseArray(ref.child('coords'));
    //$scope.horses = $firebaseArray(ref.child('rides'));
    //$scope.users = $firebaseArray(ref.child('users'));
    //$scope.horserepo = $firebaseArray(ref.child('horses'));
    //$scope.currenthorse = storageService.getObject("CS");
    //$scope.Logout = function () {
    //    storageService.setObject("CU", null);
    //    $location.path('/');
    //}
    //$("#addphoto").change(function () {
    //    readURL(this);
    //});
    //function readURL(input) {
    //    if (input.files && input.files[0]) {
    //        var reader = new FileReader();
    //        reader.onload = function (e) {
    //            $('#addImg').attr('src', e.target.result);
    //            $scope.stbadd.photo = e.target.result;
    //        }
    //        reader.readAsDataURL(input.files[0]);
    //    }
    //}
    //$scope.init();
    //$scope.assolist = [
    //    { name: "", number: "" },
    //      { name: "", number: "" },
    //        { name: "", number: "" },
    //          { name: "", number: "" },
    //];

    //$scope.addride = storageService.getObject("EditedRideObject")
    //$scope.CheckNumber=function(event)
    //{
    //    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 13 || event.keyCode == 8 || event.keyCode == 9) { }
    //    else
    //    {
    //        alert("Only Digits you can press")
    //        event.preventDefault();
    //    }
    //}
    //$scope.SaveCoods = function () {
    //    var currentRide = storageService.getObject("EditedRideObject");
    //    currentRide.start_cord = $scope.coords[0];
    //    currentRide.end_cord = $scope.coords[1];
    //    $scope.AddRideTODAtabase(currentRide);
    //}

    //$scope.CancelCoods = function () {
    //    window.location.reload();
    //}
});