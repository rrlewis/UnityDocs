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
            throw Error('No callback defined.');
            return;
        } else {
            if (typeof buttonPressed != 'function') {
                throw Error('Invalid callback defined.');
                return;
            }
        }

        this.options = buildConfig(config);
        this.onButtonPressed = buttonPressed;
    }

    show() {
        console.log("showing sheet");
        window.plugins.actionsheet.show(this.options, this.onButtonPressed);
    }
    close() {
        window.plugins.actionsheet.show
    }
}

