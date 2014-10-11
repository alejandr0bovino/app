angular.module( 'ngBoilerplate.user.LogoutCtrl', [

])

.controller( 'LogoutCtrl', function LogoutCtrl( $scope, $auth, $state, alertService ) {  
  $auth.logout()      
    .then(function() {
      alertService.add('success', 'You have successfully logged out', 2500);
      $state.go('home');
    });

})

;