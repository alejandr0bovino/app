angular.module('ngBoilerplate.user.service', [

])

.factory('User', function(apiUrl, $http) {
  return {
    getUser: function() {
      return $http.get(apiUrl() + '/me');
    },
    updateUser: function(profileData) {
      return $http.put(apiUrl() + '/me', profileData);
    }
  };
})

;
