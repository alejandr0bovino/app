angular.module( 'ngBoilerplate.user.ProfileCtrl', [

])

.controller( 'ProfileCtrl', function ProfileCtrl( $scope, $auth, User, growl, $state, resA ) {  

  if (!resA) {
    $state.go('user.login');
  } else {
    $scope.$parent.title = "Profile";

    User.getUser()
      .success(function(data) {
        $scope.user = data;
      })
      .error(function() {
        growl.error("Unable to get user information"); 
      });

    $scope.updateUser = function() {
      User.updateUser({
        displayName: $scope.user.displayName,
        email: $scope.user.email
      }).then(function() { 
        growl.success("Profile has been updated"); 
      });
    };

    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          growl.success('You have successfully linked <b>' + provider + '</b> account'); 
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
            growl.error("|||||||||||||||3" + response.data.message); 
          }
        });
    };

    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {        
          growl.success('You have successfully unlinked <b>' + provider + '</b> account'); 
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
          growl.error(response.data ?  response.data.message : 'Could not unlink <b>' + provider + '</b> account');
        });
    };

  }
})


;