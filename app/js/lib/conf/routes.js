var co = require('co');
var _ = require('underscore');

module.exports = (app) => {

  app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

    // States
    $stateProvider.
    state('index', {
      url: '/',
      template: require('views/index'),
      controller: 'IndexController'
    }).

    state('configure', {
      abstract: true,
      url: '/configure',
      template: require('views/configure/layout'),
      controller: ($scope) => {
        console.log('Abstract');
        $scope.conf = {
          idty_uid: 'cgeek',
          idty_entropy: 'cat',
          idty_password: 'tac',
          currency: 'super_currency',
          c: 0.007376575,
          dt: 30.4375 * 24 * 3600,
          ud0: 100,
          stepMax: 3,
          sigDelay: 3600 * 24 * 365 * 5,
          sigPeriod: 0, // Instant
          sigStock: 40,
          sigWindow: 3600 * 24 * 14, // 2 weeks
          sigValidity: 3600 * 24 * 365,
          msValidity: 3600 * 24 * 365,
          sigQty: 0,
          xpercent: 0.9,
          percentRot: 0.66,
          blocksRot: 20,
          avgGenTime: 16 * 60,
          dtDiffEval: 10,
          medianTimeBlocks: 20
        };
      }
    }).

    state('configure.choose', {
      url: '/choose',
      template: require('views/configure/choose')
    }).

    state('configure.create_uid', {
      url: '/create/uid',
      template: require('views/configure/create_uid'),
      controller: 'IdentityController'
    }).

    state('configure.create_network', {
      url: '/create/network',
      template: require('views/configure/create_network'),
      controller: 'NetworkController'
    }).

    state('configure.create_parameters', {
      url: '/create/parameters',
      template: require('views/configure/create_parameters'),
      controller: 'ParametersController'
    }).

    state('configure.create_root', {
      url: '/create/root',
      template: require('views/configure/create_root'),
      controller: 'RootBlockController'
    }).

    state('sync', {
      url: '/sync?host=&port=&sync=',
      template: require('views/sync'),
      controller: 'SyncController'
    }).

    state('home', {
      url: '/home',
      template: require('views/home'),
      controller: 'HomeController'
    }).

    state('settings', {
      abstract: true,
      url: '/settings',
      template: require('views/settings'),
      resolve: {
        bmapi: (BMA) => co(function *() {
          let summary = yield BMA.webmin.summary();
          return BMA.instance(summary.host);
        })
      },
      controller: 'SettingsController'
    }).

    state('settings.data', {
      url: '/data',
      template: require('views/settings/data'),
      resolve: {
        peers: (bmapi) => co(function *() {
          let self = yield bmapi.network.peering.self();
          let res = yield bmapi.network.peers();
          return _.filter(res.peers, (p) => p.pubkey != self.pubkey);
        })
      },
      controller: 'DataController'
    }).

    state('settings.idty', {
      url: '/idty',
      template: require('views/settings/idty')
    }).

    state('settings.network', {
      url: '/network',
      template: require('views/settings/network')
    }).

    state('settings.currency', {
      url: '/currency',
      template: require('views/settings/currency')
    }).

    state('error', {
      url: '/error\?err',
      template: require('views/error'),
      controller: ($scope, $stateParams) =>
        $scope.errorMsg = $stateParams.err || 'err.unknown'
    });

    // Default route
    $urlRouterProvider.otherwise('/');
  }]);
};
