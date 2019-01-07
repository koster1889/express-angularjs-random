angular.module('app').component('messagesHandler', {
    templateUrl: 'features/messages/message.component.html',
    controller: ['$q', 'MessageService', '$scope', 'settings', function ($q, MessageService, $scope, settings) {
        const $ctrl = this
    
        $ctrl.$onInit = function () {
    
            $scope.messages = [];
            $scope.message = {
                message: settings.defaultMessage,
                username: settings.defaultUsername
            }
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
    
        }
        
    
    }]
})