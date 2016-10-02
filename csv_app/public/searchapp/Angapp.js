var app = angular.module("search", [])
    .controller('CSVsearchCtrl', function ($scope) {
        $scope.csvrows = [
            {
                id: "1",
                name: "rida1",
                age: "34",
                address: "koht",
                team: "roheline"
            },
            {
                id: "2",
                name: "rida2",
                age: "45",
                address: "asd",
                team: "punane"
            },
            {
                id: "3",
                name: "asd",
                age: "234",
                address: "place",
                team: "kollane"
            }
        ];
    });