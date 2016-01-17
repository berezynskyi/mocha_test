mochaTest.controller('mochaCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.clicked = false
	$scope.title
	$scope.text
	$scope.list = []
	$scope.showText = []
	$scope.text = []

	//function to add new article
	$scope.showHide = function(){
		($scope.clicked) ? $scope.clicked = false : $scope.clicked = true			
	}

	//function to add new article
	$scope.addArticle = function(){
		$http
			.post(
				'/addArticle',
				angular.toJson({
					text: $scope.text,
					title: $scope.title
				})
				)
			.then(function onSuccess(data){
				console.log(data)
				$scope.clicked = false
			}, function err(err){
				console.log(err)
			})
	}

	//function to get all articles(only titles)
	$scope.getListOfArticles = function(){
		$http
			.get('/getListOfArticles')
			.then(function onSuccess(data){
				console.log(data)
				$scope.list = data.data
			}, function err(err){
				console.log(err)
			})
	}

	//function to get all articles(only titles)
	$scope.getArticleById = function(id, index){

		$http
			.get('/getArticleById/'+id)
			.then(function onSuccess(data){
				console.log(data)
				$scope.text[index] = data.data.text;
				($scope.showText[index]) ? $scope.showText[index] = false : $scope.showText[index] = true
			}, function err(err){
				console.log(err)
			})
	}

}])