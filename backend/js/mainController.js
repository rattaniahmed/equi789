app.controller('mainController', function ($scope, storageService) {


    $scope.Check = function () {

        $scope.user = null;
        var obj = localStorage.getItem("adminObject");
        if (obj == null || obj == '' || obj == "undefined")
            $scope.user = null;
        else
            $scope.user = JSON.parse(obj);
        if ($scope.user.Role == "Organisation") {
            $scope.title = "Organisation Panel";
        }
        else {
            $scope.title = "Admin Panel";
            $scope.user.Url = "/images/logo.png";
        }

        if ($scope.user == null) {
            window.location.href = "login.html";
        }

    }

    $scope.Check();

    $scope.Logout = function () {
        localStorage.setItem("adminObject", null);
        window.location.href = "login.html";
    }


});
