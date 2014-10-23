angular.module( 'ngBoilerplate.user.LogoutCtrl', [

])

.controller( 'LogoutCtrl', function LogoutCtrl( $rootScope, $scope, $auth, $state, growl ) {  
  $auth.logout()      
    .then(function() {
      growl.success('Logged out');
      $rootScope.displayName = '';
      console.log($rootScope.displayName);
      $state.go('home');
    });

})

;