var api = {
    rootUrl: "http://apprentice2/unity/api/",
    //rootUrl: "http://localhost/unity/api/",
    authService: function () {
        var $this = this;
        return {
            authenticate: function (user) {
                if (user.username == "" && user.password == "" && user.connectionname == "") // testing purposes only, remove for production
                { user = { username: "SCL", password: "PASS", connectionname: "ute1" }; }

                return $.ajax({
                    url: $this.rootUrl + "login/apilogin",
                    data: user,
                    success: function (results) {
                        user.autoLogIn = true;
                        currentUser.set(user);
                        return results;
                    }
                });
            },
            isAutoLogin: function () {
                return localStorage.getItem("uda") == "true" ? true : false;
            }
        };
    },
    documentService: function () {
        var $this = this;
        return {
            // Libraries
            getLibraries: function () {
                return $.ajax({
                    url: $this.rootUrl + "documentlibrary/getlibraries",
                    success: function (results) {
                        return results;
                    }
                })
            },
            getLibraryDetails: function (indexTypeOrLibrary) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/GetDocumentHeader",
                    data: {
                        indextypeorlibrary: indexTypeOrLibrary
                    },
                    success: function (results) {
                        return results;
                    }
                })
            },
            searchLibrary: function (searchString, indexType) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/SearchDocuments",
                    data: {
                        searchfor: searchString,
                        IndexType: indexType
                    },
                    success: function (results) {
                        return results;
                    }
                })
            },

            // Documents
            getDocumentsFromLibrary: function (indexTypeOrLibrary, key, subfolder) {
                return $.ajax({
                    url: $this.rootUrl + "documentlibrary/getdocuments",

                    data: {
                        indextypeorlibrary: indexTypeOrLibrary,
                        key: key,
                        subfolder: subfolder,
                    },
                    success: function (results) {
                        return results;
                    }
                })
            },
            getDocument: function (ID, versionNumber) {
                window.location.href = $this.rootUrl + "DocumentManagement/GetDocument?documentid=" + ID;
            },
            getDocumentRecord: function (documentID) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/getdocumentrecord",
                    data: {
                        documentid: documentID,
                    },
                    success: function (results) {
                        return results;
                    }
                })
            },
            removeDocumentFromLibrary: function (documentID, versionNumber) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/RemoveDocument",
                    data: {
                        documentid: documentID,
                        VersionNumber: versionNumber
                    },
                    success: function (results) {
                        return results;
                    }
                })
            },
            checkOutDocument: function (documentID) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/CheckOutDocument",
                    data: {
                        documentid: documentID,
                    },
                    success: function (results) {
                        return results;
                    }
                })
            },
            undoCheckOutDocument: function (documentID) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/UndoCheckOutDocument",
                    data: {
                        documentid: documentID,
                    },
                    success: function (results) {
                        return results;
                    }
                })
            },
            updateDocumentTags: function (documentID, tags) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/UpdateDocumentTags",
                    data: {
                        documentid: documentID,
                        Tags: tags,
                    },
                    success: function (results) {
                        return results;
                    },
                    error: function (a, b, c) {
                        console.log(a, b, c);
                    }
                })
            },
            getDocumentsByFilename: function (library, filename, folder) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/GetDocumentsByFilename",
                    data: {
                        Library: library,
                        FileName: filename,
                        Folder: folder,
                    },
                    success: function (results) {
                        return results;
                    }
                })
            },
            getVersionHistory: function (library, documentID) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/GetVersionHistory",
                    data: {
                        Library: library,
                        documentid: documentID,
                    },
                    success: function (results) {
                        return results;
                    }
                })
            },
            uploadDocument: function (library, documentID) {
                // WIP
            },
            openDocument: function (filename) {
                function getFileType(file) {
                    file = file.split(".");
                    var fileType = file[file.length - 1];
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
                function fsSuccess(fileSystem) {
                    var mime = getFileType(filename);
                    cordova.plugins.fileOpener2.open(
                    filename,
                    mime,
                    {
                        error: function (e) {
                            console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                        },
                        success: function () {
                            console.log('file opened successfully');
                        }
                    }
                );
                }
                function fsFail(event) {
                    console.log(event.target.error.code);
                }
                window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
                if (typeof LocalFileSystem != "undefined") {
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fsSuccess, fsFail);
                } else {
                    console.log("Local File System is not defined.");
                }
            },
            // Folders
            removeFolderFromLibrary: function (libraryName, folderName, parentFolder) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/RemoveFolder",
                    data: {
                        Library: libraryName,
                        FolderName: folderName,
                        ParentFolder: parentFolder
                    },
                    success: function (results) {
                        debugger;
                        return results;
                    }
                })
            },
            getFoldersFromLibraryLevel: function (indexTypeOrLibrary, subfolder) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/GetDocumentLibraryFolders",
                    data: {
                        indextypeorlibrary: indexTypeOrLibrary,
                        SubFolder: subfolder
                    },
                    success: function (results) {
                        return results;
                    }
                })
            },
            createFolder: function (libraryName, folderName, parentFolder) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/CreateFolder",
                    data: {
                        Library: libraryName,
                        FolderName: folderName,
                        ParentFolder: parentFolder
                    },
                    success: function (results) {
                        return results;
                    }
                })
            },
        };
    },
    userService: function () {
        var $this = this;
        return {
            getCurrentUser: function () {
                return currentUser.get();
            },
            setCurrentUser: function (data) {
                currentUser.set(data);
            },
        }
    },
};

var currentUser = {
    set: function (data) {
        var user = { autoLogIn: null, username: null, password: null, connectionname: null };
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
            return JSON.parse(atob(user));
        }
        return null;
    },
    logOut: function () {
        // logout and remove autologin
        localStorage.removeItem("uda");
        localStorage.removeItem("ud");
        router.navigate("views/authenticate.html");
    }
};

var testFiles = {
    convertToTestFile: function (name) {
        var fileExtension = name.split(".")[1];
        switch (fileExtension) {
            case "doc":
            case "docx":
                return this.docx;
                break;
            case "pdf":
                return this.pdf;
                break;
        }
    },
    docx: "Download/testdoc.docx",
    pdf: "Download/Adobe Acrobat/Getting Started.pdf",
};