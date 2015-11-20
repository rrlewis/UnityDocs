$.fn.extend({
    exists: function () {
        return !(this.length == 0);
    },
    serializeObject: function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }
});

var elements = {
    emptyFolder: "<li class='empty-library'>This folder is empty.</li>",
    emptyLibrary: "<li class='empty-library'>This library is empty.</li>",
};

var fileHandler = function () {
    var $this = this;
    this._downloadDir = cordova.file.externalApplicationStorageDirectory;
    return {
        downloadFile: function (documentID, filename, success, fail) {
            var fileTransfer = new FileTransfer();
            var fromURL = api.rootUrl + "DocumentManagement/GetDocument?documentid=" + documentID;
            var toPath = $this._downloadDir + filename;
            debugger;
            window.resolveLocalFileSystemURL(toPath,
                function (fileEntry) {
                    //exists
                    debugger;
                    success(fileEntry);
                },
                function (fileError) {
                    //doesn't exist
                    fileTransfer.download(fromURL, toPath,
                        function (fileEntry) {
                            //success
                            debugger;
                            success(fileEntry);
                        },
                        function (fileTransferError) {
                            //error
                            debugger;
                            console.log(fileTransferError);
                        }
                    );
                }
            );

        },
        emailFile: function (options, callback) {
            if (typeof options == "undefined") {
                options = {};
            }
            if (typeof callback == "undefined") {
                callback = function () {
                }
            }
            cordova.plugins.email.isAvailable(
                function (isAvailable) {
                    if (isAvailable) {
                        cordova.plugins.email.open(options, callback);
                    }
                    console.log('Email service is not available');
                }
            );
            //window.plugins.emailComposer.showEmailComposerWithCallback(options.callback, options.subject, options.body, options.to, options.cc, options.bcc, options.isHTML, options.attachmentPaths, options.attachmentData);
        },
        openFile: function (file) {
            function getFileType(fileName) {
                fileName = fileName.split(".");
                var fileType = fileName[fileName.length - 1];
                var mimes = {
                    'jpg': 'image/jpeg',
                    'jpeg': 'image/jpeg',
                    'jpe': 'image/jpeg',
                    'gif': 'image/gif',
                    'png': 'image/png',
                    'bmp': 'image/bmp',
                    'tif': 'image/tiff',
                    'tiff': 'image/tiff',
                    'ico': 'image/x-icon',

                    // Video formats
                    'asf': 'video/x-ms-asf',
                    'asx': 'video/x-ms-asf',
                    'wmv': 'video/x-ms-wmv',
                    'wmx': 'video/x-ms-wmx',
                    'wm': 'video/x-ms-wm',
                    'avi': 'video/avi',
                    'divx': 'video/divx',
                    'flv': 'video/x-flv',
                    'qt': 'video/quicktime',
                    'mov': 'video/quicktime',
                    'mpe': 'video/mpeg',
                    'mpg': 'video/mpeg',
                    'mpeg': 'video/mpeg',
                    'mp4': 'video/mp4',
                    'm4v': 'video/mp4',
                    'ogv': 'video/ogg',
                    'webm': 'video/webm',
                    'mkv': 'video/x-matroska',

                    // Text formats
                    'txt': 'text/plain',
                    'asc': 'text/plain',
                    'c': 'text/plain',
                    'cc': 'text/plain',
                    'h': 'text/plain',
                    'csv': 'text/csv',
                    'tsv': 'text/tab-separated-values',
                    'ics': 'text/calendar',
                    'rtx': 'text/richtext',
                    'css': 'text/css',
                    'htm': 'text/html',
                    'html': 'text/html',

                    // Audio formats
                    'mp3': 'audio/mpeg',
                    'm4a': 'audio/mpeg',
                    'm4b': 'audio/mpeg',
                    'ram': 'audio/x-realaudio',
                    'ra': 'audio/x-realaudio',
                    'wav': 'audio/wav',
                    'ogg': 'audio/ogg',
                    'oga': 'audio/ogg',
                    'mid': 'audio/midi',
                    'midi': 'audio/midi',
                    'wma': 'audio/x-ms-wma',
                    'wax': 'audio/x-ms-wax',
                    'mka': 'audio/x-matroska',

                    // Misc application formats
                    'rtf': 'application/rtf',
                    'js': 'application/javascript',
                    'pdf': 'application/pdf',
                    'swf': 'application/x-shockwave-flash',
                    'class': 'application/java',
                    'tar': 'application/x-tar',
                    'zip': 'application/zip',
                    'gzip': 'application/x-gzip',
                    'gz': 'application/x-gzip',
                    'rar': 'application/rar',
                    '7z': 'application/x-7z-compressed',
                    'exe': 'application/x-msdownload',

                    // MS Office formats
                    'doc': 'application/msword',
                    'ppt': 'application/vnd.ms-powerpoint',
                    'pps': 'application/vnd.ms-powerpoint',
                    'pot': 'application/vnd.ms-powerpoint',
                    'wri': 'application/vnd.ms-write',
                    'xla': 'application/vnd.ms-excel',
                    'xls': 'application/vnd.ms-excel',
                    'xlt': 'application/vnd.ms-excel',
                    'xlw': 'application/vnd.ms-excel',
                    'mdb': 'application/vnd.ms-access',
                    'mpp': 'application/vnd.ms-project',
                    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'docm': 'application/vnd.ms-word.document.macroEnabled.12',
                    'dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
                    'dotm': 'application/vnd.ms-word.template.macroEnabled.12',
                    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'xlsm': 'application/vnd.ms-excel.sheet.macroEnabled.12',
                    'xlsb': 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
                    'xltx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
                    'xltm': 'application/vnd.ms-excel.template.macroEnabled.12',
                    'xlam': 'application/vnd.ms-excel.addin.macroEnabled.12',
                    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    'pptm': 'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
                    'ppsx': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
                    'ppsm': 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
                    'potx': 'application/vnd.openxmlformats-officedocument.presentationml.template',
                    'potm': 'application/vnd.ms-powerpoint.template.macroEnabled.12',
                    'ppam': 'application/vnd.ms-powerpoint.addin.macroEnabled.12',
                    'sldx': 'application/vnd.openxmlformats-officedocument.presentationml.slide',
                    'sldm': 'application/vnd.ms-powerpoint.slide.macroEnabled.12',
                    'onetoc': 'application/onenote',
                    'onetoc2': 'application/onenote',
                    'onetmp': 'application/onenote',
                    'onepkg': 'application/onenote',

                    // OpenOffice formats
                    'odt': 'application/vnd.oasis.opendocument.text',
                    'odp': 'application/vnd.oasis.opendocument.presentation',
                    'ods': 'application/vnd.oasis.opendocument.spreadsheet',
                    'o dg': 'application/vnd.oasis.opendocument.graphics',
                    'odc': 'application/vnd.oasis.opendocument.chart',
                    'odb': 'application/vnd.oasis.opendocument.database',
                    'odf': 'application/vnd.oasis.opendocument.formula',

                    // WordPerfect formats
                    'wp': 'application/wordperfect',
                    'wpd': 'application/wordperfect',

                    // iWork formats
                    'key': 'application/vnd.apple.keynote',
                    'numbers': 'application/vnd.apple.numbers',
                    'pages': 'application/vnd.apple.pages',
                };
                return mimes[fileType];
            }
            var filePath = file.toURL();
            var mime = getFileType(file.name);
            cordova.plugins.fileOpener2.open(
                filePath,
                mime,
                {
                    error: function (e) {
                        console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                    },
                    success: function (ok) {
                        console.log('file opened successfully');
                        file.file(
                            function (fileObj) {
                                var reader = new FileReader();
                                reader.onloadend = function (evt) {
                                    console.log("read success");
                                    console.log();
                                    debugger;
                                    checkInChecker.fileInEdit = true;
                                    checkInChecker.fileInEditData.filePath = filePath;
                                    checkInChecker.fileInEditData.file = fileObj;
                                    checkInChecker.fileInEditData.base64data = evt.target.result;

                                };
                                reader.readAsDataURL(fileObj);
                            },
                            function (error) {
                                debugger;

                            }
                        )
                    }
                }
            );
        },
        checkFileIn: function () {
        },
        checkFileOut: function () {
        }
    };
};

var checkInChecker = {
    fileInEdit: false,
    fileInEditData: {
        file: {
        }, lastModifiedDate: "", filePath: ""
    },
    compareFiles: function (checkInCallback, cancelCallback) {
        var $this = this;
        window.resolveLocalFileSystemURL(checkInChecker.fileInEditData.filePath,
            function (fileEntry) {
                debugger;
                fileEntry.file(
                    function (file) {
                        debugger;
                        var reader = new FileReader();
                        reader.onloadend = function (evt) {
                            if (evt.target.result != $this.fileInEditData.base64data) {
                                checkInCallback(fileEntry.name);
                            } else {
                                cancelCallback();
                            }
                        };
                        reader.readAsDataURL(file);
                    },
                    function (error) {
                        debugger;
                        //failed to create File object.
                    }
                )
            },
            function (error) {
                //error
                debugger;
            }
        )
    }
};

var loader = {
    isVisible: false,
    show: function () {
        app.showLoading();
        this.isVisible = true;
    },
    hide: function () {
        app.hideLoading();
        this.isVisible = false;
    },
    check: function () {
        if (this.isVisible) {
            app.pane.loader.show();
        } else {
            app.pane.loader.hide();
        }
    }
};

var currentUser = {
    set: function (data) {
        var user = {
            autoLogIn: null, username: null, password: null, connectionname: null
        };
        for (var prop in data) {
            if (data.hasOwnProperty(prop) && user.hasOwnProperty(prop)) {
                user[prop] = data[prop];
            }
        }
        // save credentials to localStorage.
        var stringifiedUser = JSON.stringify(user);
        localStorage.setItem("ud", btoa(stringifiedUser));
        if (user.autoLogIn) {
            localStorage.setItem("uda", true);
        } else {
            localStorage.setItem("uda", false);
        }
    },
    get: function () {
        var user = localStorage.getItem("ud");
        if (user != null) {
            var data = JSON.parse(atob(user));
            user = {};
            user.username = data.username;
            user.password = data.password;
            user.connectionname = data.connectionname;
            return user;
        }
        return null;
    },
    logOut: function () {
        // logout and remove autologin
        if (confirm("Are you sure you want to log out?")) {
            localStorage.removeItem("uda");
            localStorage.removeItem("ud");
            router.navigate("views/authenticate.html");
        }
    }
};

function globalOnViewShow(e) {
    loader.check();

    navbar = app.view().header.find(".km-navbar").data("kendoMobileNavBar");

    // give header a viewmodel
    kendo.bind(app.view().header, headerViewModel);
    var viewID = e.view.id;
    if (viewID.indexOf('library') > -1 || viewID.indexOf('versionhistory') > -1 || viewID.indexOf('searchresult') > -1) {
        headerViewModel.set('search.canSearch', true);
    }
    else {
        headerViewModel.set('search.canSearch', false);
    }
    dataOptionsActionSheet.check(e);
    var layoutID = e.view.layout.element.data("id");
    switch (layoutID) {
        case "default-layout":
            defaultLayoutLoaded(e);
            break;
        case "auth-layout":
            break;
    }
}

function defaultLayoutLoaded(e) {
    dataOptionsActionSheet.functions().gridView.checkGridView(e);
}

function fillForm(formEle, dataObj) {
    var formInputs = formEle.find('input, textarea, select');
    var currentInput;
    for (var x = 0; x < formInputs.length; x++) {
        currentInput = $(formInputs[x]);
        var inputName = currentInput.attr("name")
        var value = dataObj[inputName];
        if (typeof value != 'undefined') {
            currentInput.val(value);
        }
    }
}

