angular.module( 'ngBoilerplate.movies', [
  'ui.router',
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.overlayplay",
  "com.2fdevs.videogular.plugins.poster"
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
      headerTitle: 'Movies'
    }
  });
})

.controller( 'MoviesCtrl', function MoviesCtrl( $scope,  $sce ) {
  $scope.onPlayerReady = function(API) {
    $scope.API = API;
  };

  $scope.config = {
    sources: [
      {src: $sce.trustAsResourceUrl("assets/video/videogular.mp4"), type: "video/mp4"},      
    ],
    plugins: {
      poster: "assets/img/videogular.png",
    }        
  };
})

;
