var app = angular.module('githubApi', ['ngStorage']);

app.factory('githubApiService', ["$http", function ($http) {
  return {
    getUsers: function (data) {
      return $http.get('https://api.github.com/users/' + data);
    }
  }

}]);


app.controller('githubApiCtrl', ["$scope", "githubApiService", "$localStorage", '$filter', function ($scope, githubApiService, $localStorage, $filter) {
  $scope.user = '';
  $scope.appTitle = 'Github User Search App';
  // $scope.user_info = [];
  $scope.user_info = $localStorage;
  // $localStorage.users = [];
  $scope.parameter = 'name';
  $scope.reverse = false;
  $scope.user_info.users = $filter('orderBy') ($scope.user_info.users, $scope.parameter, $scope.reverse);
  $scope.addUser = function (user) {
    console.log(user);
    var data = user;
    githubApiService.getUsers(data)
      .success(function (response) {
        // $scope.user_info.push(response);
        $localStorage.users.push(response);
        $scope.sortBy('name', false);
        console.log($scope.user_info);
      })
      .error(function (response) {
        alert(response.status);
      })
  };
  $scope.removeUser = function (index) {
    $localStorage.users.splice(index, 1);
  };
  $scope.sortBy = function (parameter, reverse) {
    $scope.reverse = angular.isUndefined(reverse) ? ( $scope.parameter === parameter ? !$scope.reverse : false) : reverse;
    $scope.parameter = parameter;
    console.log($scope.reverse);
    $scope.user_info.users = $filter('orderBy') ($scope.user_info.users, $scope.parameter, $scope.reverse);
  };
}]);