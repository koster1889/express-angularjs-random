angular.module('app')
    .service('MessageService', ['$q', '$log', '$http', function ($q, $log, $http) {
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