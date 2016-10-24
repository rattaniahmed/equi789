
app.controller('UsersController', function ($scope, storageService, firebaseService, $firebaseArray) {

    console.log("UsersController");
    


    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 10,
        enableFiltering: true,
        columnDefs: [
             { name: 'email', enableFiltering: false},
          { name: 'first_name' },
          { name: 'last_name' },
          { name: 'display_name' }
         
        ]
    };


    var ref = firebaseService.FIREBASEENDPOINT();   // new Firebase(firebaseService.USERSENDPOINT);
    $scope.users = $firebaseArray(ref.child('users'));
    $scope.usersArray = [];
    $scope.users.$loaded().then(function (dataArray) {
        //$scope.usersArray = dataArray;
        console.log($scope.usersArray);

        angular.forEach(dataArray, function (value, key) {

            //var innerO = [];
            //innerO.push(value.email);
            //innerO.push(value.first_name);
            //innerO.push(value.last_name);
            //innerO.push(value.last_name);
            //innerO.push('<a href="#/adasdasdasd">Horses</a>');
            //innerO.push('<a href="javascript:void(0)" onclick="Test()">Delete</a>');

            $scope.usersArray.push(value);

        });


        

       

        $scope.gridOptions.data = $scope.usersArray;


        //$('#example').DataTable({
        //    data: $scope.usersArray,
        //    columns: [
        //        { title: "Email" },
        //        { title: "First Name" },
        //        { title: "Last Name" },
        //        { title: " Show Hourse " },
        //        { title: "Remove " }
        //    ]
        //});


        //$('#example').DataTable({
        //    "bProcessing": true,
        //    "aaData": $scope.usersArray,// <-- your array of objects
        //    "aoColumns": [
        //    { "mData": "first_name" }, // <-- which values to use inside object
        //    { "mData": "last_name" }
        //    ]

        //});
        //$scope.gridOptions.data = $scope.usersArray;
    }).catch(function (error) {
        console.log("Error in loading details");
    });

    function Test() {
        alert("dsfsdfdf");
    }

    $scope.Test = function () {
        alert("dsfsdfdf");
    }
    //$scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
    //    if (col.filters[0].term) {
    //        return 'header-filtered';
    //    } else {
    //        return '';
    //    }
    //};
    //$scope.gridOptions = {
    //    enableFiltering: true,
    //    onRegisterApi: function (gridApi) {
    //        $scope.gridApi = gridApi;
    //    },
    //    columnDefs: [
    //// default
    //{ field: 'name', headerCellClass: $scope.highlightFilteredHeader }]
    //};

    //$scope.gridOptions.columnDefs = [
    //  { name: 'first_name'},
    //  { name: 'last_name' },
    //  { name: 'email' },
    //  { name: 'Show Hourse' },
    //  { name: 'Remove' },
    //];




});

