angular.module('app').component('jsonEditor', {
    templateUrl: 'features/json-editor/json-editor.component.html',
    controller: ['$http', '$q', 'LocalStorageService', function ($http, $q, LocalStorageService) {
        const $ctrl = this

        $ctrl.saveToLocalStorage = function () {
            LocalStorageService.setData('json', $ctrl.getOverrides())
        }

        $ctrl.loadFromLocalStorage = function () {
            $ctrl.$onInit(LocalStorageService.getData('json'))
        }


        $ctrl.filter = function (item) {
            if ($ctrl.filter.overridesOnly && !item.override) {
                return false
            }
            function containsSearchString(candidate) {
                return candidate.indexOf($ctrl.filter.freeText) > -1;
            }
            if ($ctrl.filter.freeText) {
                if (!containsSearchString(item.key) &&
                !containsSearchString(item.json) &&
                !containsSearchString(item.jsonOverride) ) {
                    return false
                }
            }
            return true
        }

        $ctrl.getOverrides = function () {
            const jsonData = {}
            _.map(
                _.filter($ctrl.items, (item) => item.override), function (item) {
                    jsonData[item.key] = item.jsonOverride
                })
            console.log('json data: ', JSON.stringify(jsonData))
            return jsonData
        }

        this.$onInit = function (overrides) {
            $ctrl.items = []
            $ctrl.loading = true

            const corePromise = $http.get('/infrastructure/default-values.json').then((result) => result.data)
            let overridesPromise
            if (overrides) {
                overridesPromise = $q.resolve(overrides)
            } else {
                overridesPromise = $http.get('/custom-files/override-values.json').then((result) => result.data)
            }
            
            $q.all({
                core: corePromise,
                overrides: overridesPromise
            }).then((result) => {
                const jsons = result.core
                const overrides = result.overrides
                
                $ctrl.items = _.map(jsons, (value, key) => {
                    console.log(key)
                    const hasOverride = !!overrides[key]
                    return {
                        key: key,
                        json: value,
                        jsonOverride: hasOverride ? overrides[key] : value,
                        override: hasOverride
                    }
                })
                console.log($ctrl.items)
                $ctrl.loading = false
            })

        }

    }]
});
