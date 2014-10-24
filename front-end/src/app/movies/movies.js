angular.module( 'ngBoilerplate.movies', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'movies', {
    url: '/movies',
    views: {
      "main": {
        controller: 'MoviesCtrl',
        templateUrl: 'movies/movies.tpl.html'
      }
    },
    data:{
      pageTitle: 'Movies',
      headerTitle: 'Movies 4u'
    }
  });
})

.controller( 'MoviesCtrl', function MoviesCtrl( $scope,  $sce ) {
  $scope.config = {
      sources: [

          {src: $sce.trustAsResourceUrl("assets/video/videogular.mp4"), type: "video/mp4"}
          //{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
          //{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
      ],     
      autoPlay: true
  };
})

;
