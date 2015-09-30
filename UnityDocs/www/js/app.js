// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

var app = new kendo.mobile.Application(document.body,
    {
        platform: "android",
        skin: 'nova',
        initial: "views/authenticate.html",
        //transition: 'slide',
    });


(function () {
    "use strict";
    kendo.culture("en-GB");

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
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
            checkInChecker.fileInEdit = false;
            checkInChecker.compareFiles(function (filename) {
                // OK / Check In
                if ($("#check-in-modal").exists()) {
                    var checkInModal = $("#check-in-modal").data("kendoMobileModalView");
                    $("#check-in-modal div[data-role=header] span[data-role=view-title]").text("Check In: " + filename);
                    checkInModal.open();
                }
            }, function () {
                // Cancel / Don't Check In
            });
        }
    };


})();