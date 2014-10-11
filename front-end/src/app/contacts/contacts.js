angular.module('ngBoilerplate.contacts', [
  'ngBoilerplate.contacts.service',
  'ui.router'
])
  
.config(
  ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider        
        .when('/c?id', '/contacts/:id');

      $stateProvider

        // Contacts

        .state('contacts', {
          abstract: true,
          url: '/contacts',
          views: {
            "main": {
              controller: ['$scope', '$state', 'contacts', 'utils', 'alertService', 
                function ( $scope,   $state,   contacts,   utils, alertService) {
                  if (contacts) {                  
                    $scope.contacts = contacts;
                    $scope.goToRandom = function () {
                      var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);
                      $state.go('contacts.detail', { contactId: randId });
                    };
                  }
                }
              ],
              templateUrl: 'contacts/contacts.tpl.html',
              resolve: {
                contacts: ['contacts', 'authenticate',
                  function( contacts, authenticate ){                    
                    if (!authenticate.islogged()) {
                      return false;
                    } else {                      
                      return contacts.all();  
                    }
                    
                  }
                ]
              },
            }
          },
          data:{ pageTitle: 'Contacts' }
        })

        // Contacts > List

        .state('contacts.list', {
          url: '',          
          templateUrl: 'contacts/contacts.list.tpl.html'
        })

        // Contacts > Detail

        .state('contacts.detail', {
          url: '/{contactId:[0-9]{1,4}}',
          views: {
            '': {
              templateUrl: 'contacts/contacts.detail.tpl.html',
              controller: ['$scope', '$stateParams', 'utils',
                function (  $scope,   $stateParams,   utils) {
                  $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);
                }]
            },
            'hint@': {
              template: 'This is contacts.detail populating the "hint" ui-view'
            },
            'menuTip@contacts.detail': {
              templateProvider: ['$stateParams',
                function (        $stateParams) {
                  return '<small class="text-muted">Contact ID: ' + $stateParams.contactId + '</small>';
                }]
            }
          }
        })

        // Contacts > Detail > Item

        .state('contacts.detail.item', {          
          url: '/item/:itemId',
          views: {            
            '': {
              templateUrl: 'contacts/contacts.detail.item.tpl.html',
              controller: ['$scope', '$stateParams', '$state', 'utils',
                function (  $scope,   $stateParams,   $state,   utils) {
                  $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);

                  $scope.edit = function () {
                    $state.go('.edit', $stateParams);
                  };
                }]
            },
            'hint@': {
              template: ' This is contacts.detail.item overriding the "hint" ui-view'
            }
          }
        })

        // Contacts > Detail > Item > Edit

        .state('contacts.detail.item.edit', {
          views: {
            '@contacts.detail': {
              templateUrl: 'contacts/contacts.detail.item.edit.tpl.html',
              controller: ['$scope', '$stateParams', '$state', 'utils',
                function (  $scope,   $stateParams,   $state,   utils) {
                  $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
                  $scope.done = function () {
                    $state.go('^', $stateParams);
                  };
                }]
            }
          }
        });
    }
  ]
)

;