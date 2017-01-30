(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive("foundItems", FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    restrict: "E",
    template: "foundItems.html",
    scope: {
      foundItems: '<',
      onRemove: '&'
    }
  };
  return ddo;
}

NarrowItDownController.$inject = ["MenuSearchService"];
function NarrowItDownController(MenuSearchService) {
  var controller = this;
  controller.query = "";
  controller.found = [];
  controller.findMenuItems = function() {
    controller.found =
      MenuSearchService.getMatchedMenuItems(controller.query);
  }
  controller.remove = function(index) {
    controller.found.splice(index,1);
  }
}

MenuSearchService.$inject = ["$http"];
function MenuSearchService($http) {
  var service = this;
  this.getMatchedMenuItems = function(searchTerm) {
    return $http.get("http://davids-restaurant.herokuapp.com/menu_items.json")
    .then(function successCallback(response) {
      var menuItems = response.data.menu_items;
      var foundItems = [];
      // process result and only keep items that match
      for (var i = 0; i < menuItems.length; i++) {
        var menuItem = menuItems[i];
        if (menuItem.description.indexOf(searchTerm) !== -1) {
          foundItems.push(menuItems[i]);
          console.log(menuItem);
        }
      }
      // return processed items
      return foundItems;
    }, function errorCallback(response) {
      console.log("Error: ", response.status);
    });
  }
}

})();
