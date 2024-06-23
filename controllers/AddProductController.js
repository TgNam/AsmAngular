window.AddProductController = function ($scope,$http,$location) {
    var apiUrl = 'http://localhost:3000/product';

    //kiem tra du lieu co hop le hay khong,
    $scope.kiemTraDuLieu = {
        name: false, // ko loi thi mac dinh la false
        price: false,
        tac_gia: false,
        so_trang: false,
    }
    $scope.onSubmitForm = function() {
        let loi = false;
        var checkLength = 10;
        var checkprice =  10000;
        if(!$scope.inputValue || !$scope.inputValue.name || $scope.inputValue.name.trim().length < checkLength) {
            $scope.kiemTraDuLieu.name = true;
            loi = true;   
        }
        if(!$scope.inputValue || !$scope.inputValue.price || isNaN($scope.inputValue.price) || $scope.inputValue.price < checkprice) {
            loi = true;   
        }
        if(!$scope.inputValue || !$scope.inputValue.tac_gia) {
            $scope.kiemTraDuLieu.tac_gia = true;
            loi = true;   
        }
        if(!$scope.inputValue || !$scope.inputValue.so_trang || isNaN($scope.inputValue.so_trang)) {
            $scope.kiemTraDuLieu.so_trang = true;
            loi = true;   
        }
        if(!$scope.inputValue || !$scope.inputValue.dich_gia) {
            $scope.inputValue.dich_gia = 'Chưa xác định'  
        }
        if(!$scope.inputValue || !$scope.inputValue.gioi_thieu) {
            $scope.inputValue.gioi_thieu = ''; 
        }

        if (!loi) {
        var newItem =  {
            ...$scope.inputValue,
        }
        $http.post(apiUrl,newItem).then(function(response){
            if(response.status == 201) {
                $location.path('list-product')
            }
        })  
        }
    }
}