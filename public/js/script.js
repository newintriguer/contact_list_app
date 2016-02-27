
var app = angular.module('myApp', []);
app.controller('myCtrl', ['$scope','$http',function($scope,$http) {
     
     var refresh=function(){
     $http.get('/contact_list_app').success(function(response){
     console.log("i got the data i requested");
     $scope.contactlist=response;
     $scope.contact="";	
     });
 };
 refresh();
    
     $scope.addContact = function(){
     	 console.log($scope.contact);
     	 $http.post('/contact_list_app',$scope.contact).success(function(response){
     	 	console.log(response);
     	 	refresh();
     	 });

     };
     $scope.remove=function(id){
     	console.log(id);
     	$http.delete('/contact_list_app/'+ id).success(function(response){
     		refresh();
     	});
     };
     $scope.edit=function(id){
     	console.log(id);
     	$http.get('/contact_list_app/'+ id).success(function(response){
     		$scope.contact=response;
     	})


     };
$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contact_list_app/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}



   
}]);