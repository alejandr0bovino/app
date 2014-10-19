angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-ui',  
  'angular-loading-bar',
  'ngAnimate',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ngBoilerplate.books',
  'ngBoilerplate.page',
  'ngBoilerplate.contacts',
  'ngBoilerplate.user',
  'ngBoilerplate.utils.service',
  //'ngBoilerplate.alert.service',  
  'ngBoilerplate.authenticate.service',
  'ngBoilerplate.shell.service',
  'ngBoilerplate.user.service',
  'ui.router',
  'ngResource',
  'permission',
  'angular-growl'
])

.constant('apiUrl', 'http://backend.birds.codinglist.com/api')
//.constant('apiUrl', 'http://backend.themazechanges.com/api')

.constant("requireAuth", ['books'])

.config( function myAppConfig (apiUrl, $stateProvider, $urlRouterProvider, $authProvider, growlProvider ) {    


  $urlRouterProvider.otherwise('/home');  

  $urlRouterProvider.rule(function($injector, $location) {
    var path = $location.path();
    var hasTrailingSlash = path[path.length-1] === '/';

    if(hasTrailingSlash) {
      //if last charcter is a slash, return the same url without the slash  
      var newPath = path.substr(0, path.length - 1); 
      return newPath; 
    } 
    
  });
  
  

  // Satellizer
  $authProvider.signupUrl = apiUrl + '/auth/signup';
  $authProvider.loginUrl  = apiUrl + '/auth/login';
  $authProvider.unlinkUrl = apiUrl + '/auth/unlink/';
    
  $authProvider.facebook({
    clientId: '864860706858750',
    url: apiUrl + '/auth/facebook',
    authorizationEndpoint: 'https://www.facebook.com/dialog/oauth',
    redirectUri: window.location.origin + '/build/',
    scope: 'email',
    scopeDelimiter: ',',
    requiredUrlParams: ['display', 'scope'],
    display: 'popup',
    type: '2.0',
    popupOptions: { width: 481, height: 269 }
  });

  $authProvider.google({
    clientId: '68950641290-bujrhrmjv332lferls9bqhcg732ts0d2.apps.googleusercontent.com',
    url: apiUrl + '/auth/google',
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    redirectUri: window.location.origin + '/build/',
    scope: ['profile', 'email'],
    scopePrefix: 'openid',
    scopeDelimiter: ' ',
    requiredUrlParams: ['scope'],
    optionalUrlParams: ['display'],
    display: 'popup',
    type: '2.0',
    popupOptions: { width: 452, height: 633 }
  });

  $authProvider.twitter({
    url: apiUrl + '/auth/twitter',
    type: '1.0'
  });

  //

  growlProvider.globalTimeToLive(5000);
  //growlProvider.globalPosition('top-center');
  growlProvider.globalDisableCountDown(true);
  growlProvider.globalDisableCloseButton(true);
  //growlProvider.onlyUniqueMessages(false);

})

.run(['$rootScope', '$state', '$stateParams', 'Permission', '$q', 'User',  'authenticate',
    function ($rootScope,   $state,   $stateParams, Permission, $q, User, authenticate) {

      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope within your applications.For example,
      // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
      // to active whenever 'contacts.list' or one of its decendents is active.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;


      Permission
        .defineRole('anonymous', function () {
          if (!authenticate.islogged()) {
            return true;
          }
          return false;
        })
        .defineRole('user', function () {
          if (authenticate.islogged()) {
            return true;
          }
          return false;
        })
        .defineRole('editor', function () {
          var deferred = $q.defer();
           User.getUser().then(function (response) {
            if (response.data.role === 'editor') {
              deferred.resolve();              
            } else {
              deferred.reject();
            }
          }, function () {
            deferred.reject();
          });
          return deferred.promise;
        })
        .defineRole('admin', function () {
          var deferred = $q.defer();
           User.getUser().then(function (response) {
            if (response.data.role === 'admin') {
              deferred.resolve();
              
            } else {
              deferred.reject();
            }
          }, function () {
            deferred.reject();
          });
          return deferred.promise;
        });

    }
  ]
)

.controller( 'AppCtrl', function AppCtrl ( $state, $scope, $auth, shell, requireAuth, $timeout ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }

    var currentState = toState.name.split('.', 1);

    if((requireAuth.indexOf(currentState[0]) > -1) && !$auth.isAuthenticated()) {
      $scope.loginRedirect = 'user.login';
      
      $scope.referer = function () {
        shell.setReferer(toState.name);
      };
    }
  
  });

  // (*.html)
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  

  //


  // $scope.eee = function (e) {
        
  //   shell.setClick(e.target);
    

  // };


})


.directive('bodyClick', function ($document, $parse) {

  var linkFunction = function ($scope, $element, $attributes) {

    var scopeExpression = $attributes.bodyClick;
    var invoker = $parse(scopeExpression);

    $document.on('click', function (event) {

      $scope.$apply(function () {
        invoker($scope, { $event: event });
      });

    });

  };

  return linkFunction;

})

.directive('stopEvent', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      element.bind(attr.stopEvent, function (e) {
          e.stopPropagation();
      });
    }
  };
})

;
