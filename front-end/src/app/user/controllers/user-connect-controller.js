angular.module( 'ngBoilerplate.user.ConnectCtrl', [

])

.controller( 'ConnectCtrl', function ConnectCtrl( $rootScope, $scope, $auth, $state, User, growl, go ) {
  $scope.authenticate = function(provider, $q) {
    $auth.authenticate(provider)
    .then(function() {
      growl.success('Connected with:  <b>' + provider + '</b>'); 
    })
    .then(function(){
      User.getUser()
        .success(function(data) {
          $rootScope.username = data.displayName;
          $state.go(go);
        });
    })
    /*.catch(function(response) {
      alert(response.data);
    })*/;
  };

})

;