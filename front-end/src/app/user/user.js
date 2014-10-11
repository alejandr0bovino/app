angular.module('ngBoilerplate.user', [  
  'ui.router',
  'ngMessages',
  'satellizer',
  'ngBoilerplate.user.LoginCtrl',
  'ngBoilerplate.user.LogoutCtrl',
  'ngBoilerplate.user.SignupCtrl',
  'ngBoilerplate.user.ConnectCtrl',
  'ngBoilerplate.user.ProfileCtrl'
])
  
.config(function config( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.when('/user', '/user/log-in');
        
  $stateProvider
    .state('user', {
      //abstract: true,
      url: '/user',     
      views: {
        "main": {
          templateUrl: 'user/user.tpl.html'
        }
      },
      onExit: function(shell){
        shell.clearReferer();
      },
      data:{ pageTitle: 'User' }
    })

    .state('user.login', {
      url: '/log-in',
      resolve: {
        resA: function(authenticate) {
          return authenticate.islogged();
        }, 
        go: function(shell) {
          var referer = shell.getReferer();
          //shell.clearReferer();
          return referer != null ? referer : 'user.profile';
        }
      },    
      views: {
        "": {
          controller: 'LoginCtrl',
          templateUrl: 'user/user.login.tpl.html'
        },
        'connect@user.login': {   
          controller: 'ConnectCtrl',       
          templateUrl: 'user/user.connect.tpl.html'           
        }
      },
      data:{ pageTitle: 'Log in' }      
    })
    
    .state('user.logout', {
      url: '/log-out',
      views: {
        "": {
          controller: 'LogoutCtrl',
          templateUrl:  null
        },       
      },
      data:{ pageTitle: 'Loggin out' }      
    })

    .state('user.signup', {
      url: '/sign-up',
      resolve: {
        resA: function(authenticate) {
          return authenticate.islogged();
        },
        go: function(shell) {
          var referer = shell.getReferer();
          //shell.clearReferer();
          return referer != null ? referer : 'user.profile';
        }
      }, 
      views: {
        "": {
          controller: 'SignupCtrl',
          templateUrl: 'user/user.signup.tpl.html'
        },
        'connect@user.signup': {
          controller: 'ConnectCtrl',
          templateUrl: 'user/user.connect.tpl.html'      
        }
      }, 
      data:{ pageTitle: 'Sign up' }
    })

    .state('user.profile', {
      url: '/profile',
      resolve: {
        resA: function(authenticate) {
          return authenticate.islogged();
        }
      },  
      views: {
        "": {
          controller: 'ProfileCtrl',
          templateUrl: 'user/user.profile.tpl.html'          
        }
      },
      data:{ pageTitle: 'Profile' }      
    })

    ;
  

});

/*
.factory("authenticate", function($auth){
  return {
    islogged: function(){
      var islogged = false;

      if ($auth.isAuthenticated()) {
        islogged = true;
      }

      return islogged;      
    }
  };
})
*/
