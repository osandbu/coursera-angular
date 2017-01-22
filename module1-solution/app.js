(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.message = "";
  $scope.updateMessage = function() {
    var dishCount = $scope.getDishCount();
    if (dishCount === 0) {
      $scope.message = "Please enter data first";
    } else if (dishCount > 3) {
      $scope.message = "Too much!";
    } else {
      $scope.message = "Enjoy!";
    }
  }
  
  $scope.getDishCount = function() {
    if ($scope.dishes === "") {
      return 0;
    } else {
      return $scope.dishes.split(",").length;
    }
  }
}

})();
