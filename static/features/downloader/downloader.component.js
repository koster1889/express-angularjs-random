/* 
Usage:

    <downloader content="customData.translations" file-name="'en-us-overrides.json'"></downloader>

*/

angular.module('app').component('downloader', {
    template: `<button ng-click="$ctrl.onClick()">{{$ctrl.label}}</button>`,
    bindings: {
      label: '=',
      contentFactory: '=',
      fileName: '='
    },
    controller: function () {
        this.onClick = function () {
            this.downloadData(this.contentFactory(), this.fileName);
        }
        this.downloadData = function (data, fileName) {
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
            var dlAnchorElem = document.createElement('a');
            document.body.appendChild(dlAnchorElem); // required for firefox
            dlAnchorElem.setAttribute("href",     dataStr     );
            dlAnchorElem.setAttribute("download", fileName);
            dlAnchorElem.click();
            dlAnchorElem.remove();
        }
    }
  });