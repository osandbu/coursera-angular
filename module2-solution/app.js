(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuyList();
  toBuy.buy = ShoppingListCheckOffService.buy;
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;
  alreadyBought.items = ShoppingListCheckOffService.getBoughtList();
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

  service.buy = function(index) {
    console.log("Tried to buy" + index)

    var boughtItem = toBuyList.splice(index, 1)[0];
    boughtList.push(boughtItem);
  }
}

})();
