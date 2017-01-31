(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive("foundItems", FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    restrict: "E",
    templateUrl: "foundItems.html",
    scope: {
      foundItems: "<",
      onRemove: "&"
    },
    controller: FoundItemsDirectiveController,
    controllerAs: "vm",
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
}

NarrowItDownController.$inject = ["MenuSearchService"];
function NarrowItDownController(MenuSearchService) {
  var vm = this;
  vm.query = "";
  vm.found = [];
  vm.findMenuItems = function() {
    MenuSearchService.getMatchedMenuItems(vm.query)
    .then(function(data) {
      vm.found = data;
      console.log(vm.found);
    });

  }
  vm.removeMenuItem = function(index) {
    vm.found.splice(index,1);
  }
}

MenuSearchService.$inject = ["$http"];
function MenuSearchService($http) {
  var service = this;
  service.getMatchedMenuItems = function(searchTerm) {
    return $http.get("http://davids-restaurant.herokuapp.com/menu_items.json")
    .then(function successCallback(response) {
      return response.data.menu_items.filter(function(item) {
        return item.description.indexOf(searchTerm) > -1;
      });
    });
  }
}

})();
