app = angular.module('app', [])

app.service('MessageService', ['$q', '$log', '$http', function ($q, $log, $http) {
        return {
            getMessages: function () {
                return $http.get('/api/messages').then(function (result) {
                    return result.data;
                })
            },
            postMessage: function (message) {
                return $http.post('/api/messages', message).then(function (result) {
                    return result.data;
                })
            }
        }
    }])
    .controller('MessageController', ['$q', 'MessageService', '$scope', function ($q, MessageService, $scope) {
        $scope.messages = [];
        $scope.message = {}
        MessageService.getMessages().then(
            function (messages) {
                $scope.messages = messages;
            }
        )
        $scope.submit = function () {
            MessageService.postMessage($scope.message).then(function (messages) {
                $scope.messages = messages;
                $scope.message = {};
            })
        }
    }]);