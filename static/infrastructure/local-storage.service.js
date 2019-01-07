angular.module('app')
    .service('LocalStorageService', [function () {

        const prefix = 'app_local_prefix'

        const storage = window.localStorage;

        // TODO: Verify local storage is present and working. See MDN.

        function prefixKey(key) {
            return `${prefix}__${key}`
        }

        return {
            getData: function (key) {
                stringData = window.localStorage.getItem(prefixKey(key))
                data = JSON.parse(stringData)
                return data
            },
            setData: function (key, data) {
                stringData = JSON.stringify(data)
                return window.localStorage.setItem(prefixKey(key), stringData)
            },
            clear: function () {
                storage.clear();
            }
        }
    }])