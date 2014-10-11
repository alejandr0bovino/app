angular.module( 'ngBoilerplate.user.SignupCtrl', [

])

.controller( 'SignupCtrl', function SignupCtrl( $scope, $auth, $state, resA, alertService, go ) {  
  if (resA) {
    $state.go('user.profile');
  } else {
    //$scope.$parent.title = "Sign up";
    $scope.$parent.title = "Welcome (back)";

    $scope.signup = function() {
      $auth.signup({
        displayName: $scope.displayName,
        email: $scope.email,
        password: $scope.password
      })
      .then(function() {
        alertService.add('success', 'You have successfully signed up: ' + $scope.email, 5000);

        $state.go(go);
      });
    };
  }
})

;