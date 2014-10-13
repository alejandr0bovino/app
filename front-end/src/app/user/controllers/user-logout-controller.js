angular.module( 'ngBoilerplate.user.LogoutCtrl', [

])

.controller( 'LogoutCtrl', function LogoutCtrl( $scope, $auth, $state, growl ) {  
  $auth.logout()      
    .then(function() {
      //alertService.add('success', 'You have successfully logged out', 2500);
       growl.success('You have successfully logged out');
      $state.go('home');
    });

})

;