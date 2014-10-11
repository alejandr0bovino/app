angular.module( 'ngBoilerplate.user.ConnectCtrl', [

])

.controller( 'ConnectCtrl', function ConnectCtrl( $scope, $auth, $state, alertService, go ) {
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function() {
      alertService.add('success', 'You have successfully connected with:  ' + provider, 5000);      
      
      $state.go(go);
    })
    /*.catch(function(response) {
      alert(response.data);
    })*/;
  };

})

;