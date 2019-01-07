angular.module('app').service('settings', ['DefaultSettings', 'LocalStorageService', '$http', '$window', function (DefaultSettings, LocalStorageService, $http, $window) {
    const self = this

    // Load settings from LS
    const preloadedCustomSettings = LocalStorageService.getData('customSettings');
    const activeSettings = {}

    applySettings(preloadedCustomSettings)

    function applySettings(customSettings) {
        var defaultSettingsCopye = _.cloneDeep(DefaultSettings)
        _.forEach(activeSettings, (_value_, key) => {
            delete activeSettings[key]
        })
        validateExtensionSettings(preloadedCustomSettings)
        _.extend(activeSettings, defaultSettingsCopye, preloadedCustomSettings);
    }

    $http.get('/custom-files/settings.json')
        .then((result)=>result.data)
        .then((customSettings) => {
            console.log('Getting settings from server!')
            if (_.isEqual(customSettings, preloadedCustomSettings)) {
                console.log('Settings equal loaded settings... Do continue!')
                return  
            }
            LocalStorageService.setData('customSettings', customSettings);
            // TODO: Block application launch until settings are loaded (route?),
            // or apply settings post launch
            // or reload page 
            applySettings(customSettings)
            $window.localtion = $window.localtion;
            
        })

    return activeSettings

    function validateExtensionSettings(customSettings) {
        return true
    }


}])