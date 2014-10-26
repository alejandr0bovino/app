angular.module( 'ngBoilerplate.about', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'about', {
    url: '/about',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'about/about.tpl.html'
      }
    },
    data:{
      pageTitle: 'What is It?',
      headerTitle: 'The Elevator <small>For the impatient</small>'
    }
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope ) {

})

;
