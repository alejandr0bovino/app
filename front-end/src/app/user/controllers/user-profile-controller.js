angular.module( 'ngBoilerplate.user.ProfileCtrl', [

])

.controller( 'ProfileCtrl', function ProfileCtrl( $scope, $auth, User, alertService, $state, resA ) {  

  if (!resA) {
    $state.go('user.login');
  } else {
    $scope.$parent.title = "Profile";

    User.getUser()
      .success(function(data) {
        $scope.user = data;
      })
      .error(function() {
        alertService.add('danger', 'Unable to get user information', 5000);
      });

    $scope.updateUser = function() {
      User.updateUser({
        displayName: $scope.user.displayName,
        email: $scope.user.email
      }).then(function() { 
        alertService.add('success', 'Profile has been updated', 5000);
      });
    };

    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          alertService.add('success', 'You have successfully linked ' + provider + ' account', 5000);
          switch(provider) {
            case 'facebook':
              $scope.user.facebook = 1;
            break;
            case 'google':
              $scope.user.google = 1;
            break;
            case 'twitter':
              $scope.user.twitter = 1;
            break;          
          }
          $state.reload();
        })
        .catch(function(response) {
          if (typeof response.data.message != 'undefined') {
            alertService.add('danger', "eeee" + response.data.message, 5000);
          }
        });
    };

    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {        
          alertService.add('success', 'You have successfully unlinked ' + provider + ' account', 5000);
          switch(provider) {
            case 'facebook':
              $scope.user.facebook = null; 
            break;
            case 'google':
              $scope.user.google = null;
            break;
            case 'twitter':
              $scope.user.twitter = null;
            break;          
          }
        })
        .catch(function(response) {
          alertService.add('danger', response.data ?  response.data.message : 'Could not unlink ' + provider + ' account', 5000);
        });
    };

  }
})


;