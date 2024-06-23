window.EditProductController = function ($scope, $http, $routeParams, $location) {
    var apiUrl = 'http://localhost:3000/product';
    var editId = $routeParams.id;

        $http.get(`${apiUrl}/${editId}`).then(
            function (response) {
                if (response.status === 200) {
                    $scope.product = response.data;
                    $scope.inputValue = {
                        name: response.data.name,
                        price: response.data.price,
                        tac_gia: response.data.tac_gia,
                        dich_gia: response.data.dich_gia,
                        so_trang: response.data.so_trang,
                        gioi_thieu: response.data.gioi_thieu
                    }
                }
            }
        ).catch(function (error) {
            $scope.message = `${error.statusText} product with id ${editId}`;
        });

    $scope.kiemTraDuLieu = {
        name: false,
        price: false,
        tac_gia: false,
        so_trang: false,
    }

    $scope.onEditForm = function() {
        let loi = false;
        var checkLength = 10;
        var checkprice =  10000;
        if(!$scope.inputValue || !$scope.inputValue.name || $scope.inputValue.name.trim().length < checkLength) { 
            $scope.kiemTraDuLieu.name = true;
            loi = true;   
        }
        if(!$scope.inputValue || !$scope.inputValue.price || isNaN($scope.inputValue.price) || $scope.inputValue.price < checkprice) { 
            $scope.kiemTraDuLieu.price = true;
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
            var updateItem = {
                ...$scope.inputValue,
            }
            $http.put(`${apiUrl}/${editId}`,updateItem ).then(function (response) {
                    if (response.status === 200) {
                        $location.path('list-product');
                    }
                }
            )
        }
    }
}