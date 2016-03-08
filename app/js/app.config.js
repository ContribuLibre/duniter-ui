module.exports = () => {

  require('./services/bma')(angular);

  var duniterApp = angular.module('duniterUIApp', [
    'ui.router',
    'homeControllers',
    'pascalprecht.translate'
  ]);

  require('./lib/conf/translate')(duniterApp);
  require('./lib/conf/routes')(duniterApp);
  require('js/services/datetime')(duniterApp);
  require('js/services/ui_utils')(duniterApp);

  let homeControllers = angular.module('homeControllers', ['duniter.services']);

  homeControllers.controller('HomeController', require('./controllers/HomeController'));
  homeControllers.controller('IndexController', require('./controllers/IndexController'));
  homeControllers.controller('IdentityController', require('./controllers/IdentityController'));
  homeControllers.controller('NetworkController', require('./controllers/NetworkController'));
  homeControllers.controller('ParametersController', require('./controllers/ParametersController'));
  homeControllers.controller('RootBlockController', require('./controllers/RootBlockController'));
  homeControllers.controller('SyncController', require('./controllers/SyncController'));
  homeControllers.controller('SettingsController', require('./controllers/SettingsController'));
  homeControllers.controller('DataController', require('./controllers/DataController'));
  homeControllers.controller('CurrencyController', require('./controllers/CurrencyController'));
  homeControllers.controller('KeyController', require('./controllers/KeyController'));
};
