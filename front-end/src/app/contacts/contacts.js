angular.module('ngBoilerplate.contacts', [
  'ngBoilerplate.contacts.service',
  'ui.router'
])

.config(
  ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider        
        .when('/c?id', '/contacts/:id');

      $stateProvider
        .state('contacts', {
          abstract: true,
          url: '/contacts',
          views: {
            "main": {
              controller: ['$scope', '$state', 'contacts', 'utils',
                function ( $scope,   $state,   contacts,   utils) {
                  if (contacts) {                  
                    $scope.contacts = contacts;
                    $scope.goToRandom = function () {
                      var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);
                      $state.go('contacts.detail', { contactId: randId });
                    };
                  }
                }
              ],
              templateUrl: 'contacts/contacts.tpl.html'             
            }
          },

          resolve: {            
            contacts: function(contacts){
              return contacts.all();  
            }
          },   
          data:{
            pageTitle: 'Contacts'            
          }
        })

        .state('contacts.list', {
          url: '',          
          templateUrl: 'contacts/contacts.list.tpl.html'
        })

        .state('contacts.detail', {
          url: '/{contactId:[0-9]{1,4}}',
          views: {
            '': {
              templateUrl: 'contacts/contacts.detail.tpl.html',
              resolve: {
                userRole: function(User){      
                  return User.getUser();
                }
              },
              controller: ['$scope', '$stateParams', 'utils', 'userRole', 'growl', '$document',
                function (  $scope,   $stateParams, utils, userRole, growl, $document) {
                  
                  $scope.contact = utils.findById($scope.contacts, $stateParams.contactId);

                  if(userRole.data.role == "admin") {
                    $scope.permissionToEdit = true;

                    $scope.contact.items.forEach(function (element, index) {
                      element.editing = false;
                      element.focused = false;
                      element.originalValue = element.value;
                    });

                    $scope.edit = function (e) {
                      $scope.contact.items.forEach(function (element, index) {                    
                        element.editing = false;
                        element.focused = false;
                        element.value = element.originalValue;
                      });

                      e.editing = true;
                      e.focused = true;
                    };

                    $scope.done = function (e) {                      
                      e.editing = false;
                      e.focused = false;
                      e.originalValue = e.value;
                      growl.success('Actualizaci&oacute;n correcta', {
                        //referenceId: 334,
                        ttl: 2500, disableCloseButton: false
                      });
                    };

                  } else {
                    $scope.permissionToEdit = false;
                  }

                  $scope.keypressCallback = function (e) {
                     e.editing = false;
                      e.originalValue = e.value;
                      growl.success('Actualizaci&oacute;n correcta', {
                        ttl: 2500, disableCloseButton: false
                      });
                  };

                  // angular.element($document[0].body).on('click',function(e) {
                  //   // var inThing =  angular.element(e.target).inheritedData('thing');


                  //   $scope.contact.items.forEach(function (element) {
                  //     element.editing = false;
                  //     //element.focused = false;
                  //     element.originalValue = element.value;
                  //   });
                  // });

                  
                }]
            },            
            'tip@contacts.detail': {
              templateProvider: ['$stateParams',
                function (        $stateParams) {
                  return '<small class="text-muted">Contact ID: ' + $stateParams.contactId + '</small>';
                }]
            }
          },
          data:{
            permissions: {
              only: ['user'],
              redirectTo: 'contacts.list'
            }
          }
        });
    }
  ]
)


.directive('syncFocus', function($timeout, $rootScope) {
  return {
    restrict: 'A',
    scope: {
      focusValue: "=syncFocus"
    },
    link: function($scope, $element, attrs) {
      $scope.$watch("focusValue", function(currentValue, previousValue) {
        if (currentValue === true && !previousValue) {
          $element[0].focus();
        } else if (currentValue === false && previousValue) {
          $element[0].blur();
        }
      });
    }
  };
}

)



;