var app = angular.module("search", [])
    .factory('csvService', [
        '$q',
        '$rootScope',
        '$http', function ($q, $rootScope, $http) {
            var csvService = {};
            csvService.query = function() {
                var deferred = $q.defer();
                $http.get('/api/asd/asd')
                    .success(function(data, status, headers, config) {
                        csvService.rows = data;
                        // this callback will be called asynchronously
                        // when the response is available
                        deferred.resolve(data);
                    })
                    .error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        deferred.reject(data);
                    });
                return deferred.promise;
            };
            return csvService;
        }])
    .controller('CSVsearchCtrl',['$scope', 'csvService', function ($scope, csvService) {
        csvService.query().then(function (suc) {
            $scope.csvrows = JSON.parse(csvService.rows);
        });

    }]);