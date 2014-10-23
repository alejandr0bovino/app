angular.module( 'ngBoilerplate.user.SignupCtrl', [

])

.controller( 'SignupCtrl', function SignupCtrl( $rootScope, $scope, $auth, $state, User, growl, resA, go ) {  
  if (resA) {
    $state.go('user.profile');
  } else {
    $scope.$parent.title = "Welcome back";

    $scope.signup = function() {
      $auth.signup({
        displayName: $scope.displayName,
        email: $scope.email,
        password: $scope.password
      })
      .then(function() {
         growl.success('Signed up: <b>' + $scope.email + '</b>');
      })
      .then(function(){
        User.getUser()
          .success(function(data) {
            $rootScope.username = data.displayName;
            $state.go(go);
          });
      });
    };
  }
})

;