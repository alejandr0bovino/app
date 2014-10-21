angular.module( 'ngBoilerplate.user.ConnectCtrl', [

])

.controller( 'ConnectCtrl', function ConnectCtrl( $scope, $auth, $state, growl, go ) {
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function() {
      growl.success('Connected with:  <b>' + provider + '</b>');
      $state.go(go);
    })
    /*.catch(function(response) {
      alert(response.data);
    })*/;
  };

})

;