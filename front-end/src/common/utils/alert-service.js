angular.module('ngBoilerplate.alert.service', [

])

.factory('alertService', [
  '$rootScope', '$timeout', '$q', function($rootScope, $timeout, $q) {
    var alertInstance;
    var alertTimer;

    $rootScope.alerts = [];

    return alertInstance = {
      add: function(type, msg, timeout) {
        if (alertTimer != null) {
          $timeout.cancel(alertTimer);  
        }
        
        alertInstance.clear().then(
          function() {
            $timeout(function(){
              $rootScope.alerts.push({
                type: type,
                msg: msg,
                close: function() {
                  return alertInstance.closeAlert(this);
                }
              });

              if (timeout) {
                alertTimer = $timeout(function(){ 
                  alertInstance.closeAlert(this); 
                }, timeout); 
              }
            }, 400);
          }
        );       
      },
      closeAlert: function(alert) {        
        this.closeAlertByindex($rootScope.alerts.indexOf(alert));
      },
      closeAlertByindex: function(index) {        
        $rootScope.alerts.splice(index, 1);
      },
      clear: function(){
        var defer = $q.defer();
        
        $rootScope.alerts = [];
        defer.resolve();

        return( defer.promise );
      }
    };
  }
])
;