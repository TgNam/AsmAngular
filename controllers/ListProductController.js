window.ListProductController = function ($scope,$http, $location) {
	var apiUrl = "http://localhost:3000/product";
		$http.get(apiUrl).then(function(response){
			if(response.status == 200) {
				$scope.products = response.data;
			}
		})
	$scope.onDelete = function(id){
		var check = confirm("ban muon xoa")
		if(check){
			$http.delete(`${apiUrl}/${id}`).then(function(response){
				if(response.status == 200) {
					$location.path('list-product');
				}
			})
		}
	}
	$scope.onEdit = function (id) {
		$location.path(`/product/${id}/edit`);
	}
	$scope.onDP = function (id) {
		$location.path(`/product/${id}/DP`);
	}
}