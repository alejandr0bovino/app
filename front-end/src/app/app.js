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
  'ngBoilerplate.alert.service',
  'ngBoilerplate.authenticate.service',
  'ngBoilerplate.shell.service',
  'ui.router',
  'ngResource'
])

.constant('apiUrl', 'http://backend.birds.codinglist.com/api')
.constant("requireAuth", ['books', 'contacts'])

.config( function myAppConfig (apiUrl, $stateProvider, $urlRouterProvider, $authProvider ) {    


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
})


/*.run( function run () {
})*/

.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ]
)

.controller( 'AppCtrl', function AppCtrl ( $state, $scope, $auth, shell, requireAuth, $timeout ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }
    //

    // $scope.show_title = false;
    // $timeout(function() {
    //   $scope.$apply('show_title = true');
    // }, 10);

    //

    var currentState = toState.name.split('.', 1);

    if((requireAuth.indexOf(currentState[0]) > -1) && !$auth.isAuthenticated()) {
      $scope.loginRedirect = 'user.login';

      //alertService.add('warning', 'Please log in to continue', 2500);                      
      
      $scope.referer = function () {
        shell.setReferer(toState.name);
      };
    }
  
  });

  // (*.html)
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
})






;
