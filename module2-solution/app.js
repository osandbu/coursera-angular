(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyController($scope, ShoppingListCheckOffService) {
  $scope.items = ShoppingListCheckOffService.getToBuyList();
  $scope.buyItem = function(index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
  $scope.items = ShoppingListCheckOffService.getBoughtList();
  //$scope.items = ShoppingListCheckOffService.getToBuyList;
  //console.log("Already bought: " + $scope.items.length);
}

function Item(name, quantity) {
  this.name = name;
  this.quantity = quantity;
}
Item.prototype.toString = function () {
  return this.quantity + " " + this.name;
};

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyList = [
    new Item("Apples", 10),
    new Item("Banana", 6),
    new Item("Carrots", 20),
    new Item("Dates", 25),
    new Item("Elderberry", 50)
  ];
  var boughtList = [];

  service.getToBuyList = function() {
    return toBuyList;
  }

  service.getBoughtList = function() {
    return boughtList;
  }

  service.buyItem = function(index) {
    console.log("Tried to buy" + index)

    var boughtItem = toBuyList.splice(index, 1)[0];
    boughtList.push(boughtItem);
  }
}

})();
