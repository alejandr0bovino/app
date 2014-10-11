angular.module( 'ngBoilerplate.user.LoginCtrl', [

])

.controller( 'LoginCtrl', function LoginCtrl($scope, $auth, $state, resA, alertService, go) {  
  if (resA) {
    $state.go('user.profile');    
  } else {
    //$scope.$parent.title = "Log in";
    $scope.$parent.title = "Welcome (back)";

    $scope.login = function() {
      $auth.login({ email: $scope.email, password: $scope.password })
        .then(function() {
          alertService.add('success', 'You have successfully logged in: ' + $scope.email, 5000);
          
          $state.go(go);
        })
        .catch(function(response) {
          alertService.add('danger', response.data.message, 5000);
          $scope.password = '';
        });
    };
  }
})

;