var UNITYDOCS = UNITYDOCS || {};
var deviceready = false;
var app = new kendo.mobile.Application(
    document.body,
    {
        platform: "android",
        //skin: 'material-light',
        skin: 'nova',
        transition: 'slide',
        initial: "views/authenticate.html",
    }
);

var navbar;

console.log("Set app");
(function () {
    "use strict";
    kendo.culture("en-GB");

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        deviceready = true;
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        document.addEventListener("backbutton", onBackButtonPressed, false);
        document.addEventListener('hidekeyboard', onKeyboardHide, false);
        document.addEventListener('showkeyboard', onKeyboardShow, false);
        $(document).ajaxStart(function (event) {
            loader.show();
        });
        $(document).ajaxStop(function (event) {
            loader.hide();
        });
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        console.log("Device ready.");
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
        console.log("Pausing application.");
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
        console.log("Resuming application.");
        if (checkInChecker.fileInEdit) {
            debugger;
            console.log("File has been in an editor during the application pause.");
            checkInChecker.fileInEdit = false;
            console.log("Comparing current file data with the data saved before the pause.");
            checkInChecker.compareFiles(function (filename) {
                // OK / Check In
                debugger;
                if (confirm("Do you want to check this file in?")) {
                    // check file in.
                    router.navigate('views/checkfilein.html?filePath=' + checkInChecker.fileInEditData.filePath);
                } else {
                    // don't check file in.
                }
            }, function () {
                // Cancel / Don't Check In
            });
        }
    };

    function onBackButtonPressed(e) {
        if (app.view().element.attr('id') == 'authenticate') {
            e.preventDefault();
            return;
        }
        history.back();
    }

    function onKeyboardHide() {
        console.log('onKeyboardHide');
    }

    function onKeyboardShow() {
        console.log('onKeyboardShow');
    }
})();