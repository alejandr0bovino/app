angular.module( 'ngBoilerplate.books', [
  'ui.router',
  'ui.bootstrap'
])



.config(
  ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider        
        .when('/c?id', '/books/:id');
    
    $stateProvider
      .state('books', {
          abstract: true,
          url: '/books',
          resolve: {
            authenticated: function(authenticate){
              return authenticate.islogged();
            },
            genres: function(authenticated, BookService){
              if (authenticated) {                
                return BookService.getGenres().query();
              }
            }
          },         
          views: {
            "main": {
              controller: 'BooksCtrl',              
              templateUrl: 'books/books.tpl.html'              
            }
          },
          data:{
            pageTitle: 'Books',
            headerTitle: 'Books',
            // permissions: {
            //   only: ['anonymous']
            // }
          }
      })

      // Contacts > List

  .state('books.list', {
    url: '',          
    templateUrl: 'books/books.list.tpl.html'
  })

      // Contacts > Detail

      .state('books.detail', {
        url: '/{bookID:[0-9]{1,4}}',
        resolve: {
          authenticated: function(authenticate){
            return authenticate.islogged();
          },
          book: function(authenticated, BookService, $stateParams){
            if (authenticated) {    
              return BookService.getBookById().query({id: $stateParams.bookID});
            }
          }
        },
        views: {
          '': {
            templateUrl: 'books/books.detail.tpl.html',
            controller: 'BooksCtrlDetail'
          }
        }
      });
                          // $stateProvider.state( 'books', {
                          //   url: '/books',
                          //   views: {
                          //     "main": {
                          //       controller: 'BooksCtrl',
                          //       templateUrl: 'books/books.tpl.html'        
                          //     }
                          //   },
                          //   resolve: {
                          //     authenticated: function(authenticate){
                          //       return authenticate.islogged();
                          //     },
                          //     genres: function(authenticated, BookService){
                          //       if (authenticated) {           
                          //         return BookService.getGenres().query();
                          //       }
                          //     }
                          //   },

}])

.controller( 'BooksCtrl', function BooksCtrl( $scope, genres ) {
  $scope.title = "Books";
  
  if (genres) {  
    genres.$promise.then(function(genres) {            
      $scope.genres = genres;
    });
  }
})
.controller( 'BooksCtrlDetail', function BooksCtrl( $scope, book ) {
  $scope.title = "Books";
  if (book) {           
    
    book.$promise.then(function(book) {
      $scope.book = book;
    });
  }
       
})

.factory("BookService", function(apiUrl, $resource, $q) {
  return {
    getBooks: function() {
      return $resource(apiUrl + '/books', {});
    },
    getGenres: function() {
      return $resource(apiUrl + '/books/genres', {});
    },
    getBookById: function() {
      return $resource(
        apiUrl + '/books/xss/:id', 
        {
          id: '@id'
        },
        {
          query:  {
            method:'GET',
            isArray:false
          }
        }
      );
    }
  }; 
})

;
