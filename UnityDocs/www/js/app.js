﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

var app = new kendo.mobile.Application(document.body,
    {
        platform: "android",
        skin: 'nova',
        initial: "views/authenticate.html",
        //transition: 'overlay',
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
    };
    console.log("Resuming application.");


})();