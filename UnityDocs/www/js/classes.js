﻿'use strict';
class ActionSheet {
    constructor(config, buttonPressed) {
        var buildConfig = function (config) {
            var configProperties = ['title', 'buttonLabels', 'androidEnableCancelButton', 'addCancelButtonWithLabel'];
            var defaultPropertyValues = {
                'title': 'Title',
                'buttonLabels': [],
                'androidEnableCancelButton': false, 
                'addCancelButtonWithLabel': 'Cancel',
            };
            var optionObj = {}; // the new optionObj to build.
            var currentProperty;
            // iterate through the properties the options object can have/be edited.
            for (var i = 0; i < configProperties.length; i++) { 
                currentProperty = configProperties[i];
                if (config.hasOwnProperty(currentProperty)) {
                    // if the config object passed to the constructor has the current property
                    optionObj[currentProperty] = config[currentProperty];
                } else {
                    optionObj[currentProperty] = defaultPropertyValues[currentProperty];
                }
            }
            optionObj.androidTheme = window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT; // Standardize theme throughout app.
            return optionObj;
        }

        if (typeof buttonPressed == 'undefined') { 
            throw Error('No callback defined');
            return;
        } else {
            if (buttonPressed.constructor != Function) {
                throw Error('Invalid callback defined');
                return;
            }
        } // Validates buttonPressed callback.

        if (typeof config == 'undefined') {
            throw Error('Invalid config object');
            return;
        } else {
            if (config.constructor != Object) {
                throw Error('Invalid config object');
                return;
            }
        } // Validates config object.

        this.options = buildConfig(config);
        this.onButtonPressed = buttonPressed;
    }

    show() {
        var onButtonPressed = this.onButtonPressed;
        if (typeof onButtonPressed != 'function') {
            throw Error('No callback defined');
        }
        
        window.plugins.actionsheet.show(this.options, onButtonPressed);
    }
    close(onSuccess, onError) {
        if (typeof onSuccess != 'function'){
            onSuccess = new Function();        
        }
        if (typeof onError != 'function'){
            onError = new Function();        
        }
        window.plugins.actionsheet.hide({}, onSuccess, onError);
    }
}