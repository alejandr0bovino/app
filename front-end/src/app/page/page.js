angular.module( 'ngBoilerplate.page', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'page', {
    url: '/page',
    views: {
      "main": {
        controller: 'PageCtrl',
        templateUrl: 'page/page.tpl.html'
      }
    },
    data:{ pageTitle: 'Page', headerTitle: 'Angular js, Laravel' }
  });
})

.controller( 'PageCtrl', function PageCtrl( $scope, $filter ) {

  //$scope.initDate = new Date('2016-15-20');
  
  // $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  // //$scope.format = $scope.formats[0];

  // $scope.today = function() {
  //   $scope.dt = new Date();
  // };
  // //$scope.today();

  // $scope.clear = function () {
  //   $scope.dt = null;
  // };

  // // Disable weekend selection
  // $scope.disabled = function(date, mode) {
  //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  // };

  // //min date
  // $scope.singleModel = 1;
  
  // $scope.toggleMin = function() {
  //   $scope.minDate = $scope.minDate ? null : new Date();
  // };
  // $scope.toggleMin();

  // $scope.open = function($event) {
  //   $event.preventDefault();
  //   $event.stopPropagation();

  //   $scope.opened = true;
  // };

  // $scope.dateOptions = {
  //   formatYear: 'yy',
  //   startingDay: 1
  // };
  $scope.singleModel = 1;

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  /////////////////////////////


  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };


})

;