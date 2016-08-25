var app = angular.module('githubApi', []);

app.factory('githubApiService', ["$http", function ($http) {
    return {
        getUsers: function (data) {
            return $http.get('https://api.github.com/users/' + data);
        }
    }

}]);


app.controller('githubApiCtrl', ["$scope", "githubApiService", function ($scope, githubApiService) {
    $scope.user;
    $scope.addUser = function (user) {
        console.log(user);
        var data = user;
        githubApiService.getUsers(data)
            .success(function (response) {
                console.log(response);
            })
            .error(function (response) {
                alert(response.status);
            })
    };
}]);