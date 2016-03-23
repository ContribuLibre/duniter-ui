"use strict";

var co = require('co');

module.exports = ($scope, $http, $state, $location, BMA) => {

  $scope.$parent.conf = $scope.$parent.conf || {};
  $scope.menu = 'settings';

  let jTabs = $('ul.tabs');
  jTabs.tabs();
  $('ul.tabs a').click((e) => {
    let href = $(e.currentTarget).attr('href');
    let state = href.slice(1);
    $state.go(state);
  });

  let currentID = $location.path()
    .replace(/\//g, '.')
    .replace(/\./, '');

  jTabs.tabs('select_tab', currentID);

  Waves.displayEffect();

  $(".dropdown-button").dropdown({ constrainwidth: false });

  $scope.fullReset = () => co(function *() {
    yield BMA.webmin.server.http.stop();
    yield BMA.webmin.server.services.stopAll();
    yield BMA.webmin.server.resetData();
    $state.go('index')
  });
};
