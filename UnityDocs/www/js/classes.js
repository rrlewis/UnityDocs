'use strict';
class ActionSheet {
    constructor(config, buttonPressed) {
        var buildConfig = function (config) {
            var configProperties = ['title', 'buttonLabels', 'androidEnableCancelButton', 'addCancelButtonWithLabel', 'addDestructiveButtonWithLabel'];
            var optionObj = {}; // the new optionObj to build.
            var currentProperty;
            for (var i = 0; i < configProperties.length; i++) { // iterate through the properties the options object can have/be edited.
                currentProperty = configProperties[i];
                if (config.hasOwnProperty(currentProperty)) {
                    // if the config object passed to the constructor has the current property
                    optionObj[currentProperty] = config[currentProperty];
                }
            }
            optionObj.androidTheme = window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT; // Standardize theme throughout app.
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
            throw Error('No callback defined');
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