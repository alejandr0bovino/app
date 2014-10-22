angular.module( 'ngBoilerplate.user.LoginCtrl', [

])

.controller( 'LoginCtrl', function LoginCtrl($rootScope, $scope, $auth, $state, User, growl, resA, go) {  
  if (resA) {
    $state.go('user.profile');    
  } else {
    //$scope.$parent.title = "Log in";
    $scope.$parent.title = "Welcome back";

    $scope.login = function() {
      $auth.login({ email: $scope.email, password: $scope.password })
        .then(function() {
          //alertService.add('success', 'You have successfully logged in: ' + $scope.email, 5000);
          growl.success('Logged in: <b>' + $scope.email + '</b>');
        })
        .then(function(){
          User.getUser()
          .success(function(data) {
            $rootScope.username = data.displayName;
            $state.go(go);
          });
        })
        .catch(function(response) {          
          growl.error(response.data.message); 
          $scope.password = '';
        });
    };
  }
})

;