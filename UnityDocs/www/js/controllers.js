var scope = {};

var router = new kendo.Router({
    routeMissing: function (e) {
        //think of this like a local 404
    },
    change: function (e) {
        //fires any time the route changes
        scope = {};
        scope.url = e.url;
        console.log(scope.url);
    }
});


router.route('(/)(views/authenticate.html)', function (params) { // AuthenticateController

    scope.authenticate = function () {
        var formData = $("form[name=auth-form]").serializeObject();
        api.authService().authenticate(formData).then(function (result) {
            if (result.LoggedIn) {
                formData.autoLogIn = true;
                currentUser = formData;
                router.navigate("views/libraries.html");
            } else {
                $("#attempt-failed").text(result.ErrorMessage).slideDown(100);
            }
        })
    }
});

router.route('(/)views/libraries.html', function (params) { // LibraryController
    scope.data = new kendo.data.DataSource({
        transport: {
            read: {
                url: api.rootUrl + "documentlibrary/getlibraries",
            }
        },
        schema: {
            data: function (response) {
                if (response.results.length == 0) {
                    $("#libraries [data-role=listview]").append(elements.emptyFolder);
                } else {
                    return response.results;
                }
            }
        },
        error: function (e) {
            scope.data.data(mockData.libraries.data);
        },
        change: function (e) {
        }
    });
});

router.route('(/)views/library.html', function (params) { // LibraryController
    for (var prop in params) {
        if (params.hasOwnProperty(prop)) {
            if (params[prop] == 'undefined') {
                params[prop] = '';
            }
        }
    } // Empties the parameter if it is 'undefined'.
    app.pane.loader.show();
    if (typeof params.subfolder == 'undefined') {
        params.subfolder = '';
    }
    scope.data = new kendo.data.DataSource({
        transport: {
            read: {
                url: api.rootUrl + "documentmanagement/getdocuments",
                data: {
                    indextypeorlibrary: encodeURI(params.indextypeorlibrary),
                    subfolder: encodeURI(params.subfolder),
                    key: encodeURI(params.key),
                },
            }
        },
        schema: {
            data: function (response) {
                if (response.results.length == 0) {
                    $("#library [data-role=listview]").append(elements.emptyLibrary);
                } else {
                    return response.results;
                }
            }
        },
        error: function (e) {
            console.log(e);
        },
        change: function (e) {
            app.pane.loader.hide();
            console.log(e);
        }
    });

    scope.libraryName = params.indextypeorlibrary;
});

router.route('(/)views/file.html', function (params) {
    debugger;
    //The directory to store data
    var directory = cordova.file.externalDataDirectory;

    var fileName = params.description;

    //URL of the document on the server
    var url = api.rootUrl + "DocumentManagement/GetDocument?documentid=" + params.imageID;

    //Check for the file. 
    window.resolveLocalFileSystemURL(directory + fileName, readFile, downloadAndReadFile);

    function downloadAndReadFile(a, b, c) {
        debugger;
        var fileTransfer = new FileTransfer();
        console.log("About to start transfer");
        fileTransfer.download(url, directory + fileName,
            function (entry) {
                debugger;
                console.log("Success!");
                readFile();
            },
            function (err) {
                debugger;
                console.log("Error");
                console.dir(err);
            });
    }

    function readFile(a, b, c) {
        debugger;
    }

    /////////////////////////////////////////

    //function fsFail(e) { // Error handler.
    //    console.log("--ERROR--");
    //    console.log(e);
    //    console.log("---------");
    //    debugger;
    //}

    //debugger;
    //function fsSuccess(fileSystem) {
    //    fileSystem.root.getFile("Document1.docx", { create: true, exclusive: false },
    //        function (fileEntry) {
    //            debugger;
    //            var fileTransfer = new FileTransfer();
    //            var localPath = fileEntry.toURL();
    //            if (localPath.indexOf("file://") === 0) {
    //                localPath = localPath.substring(7);
    //            }
    //            fileTransfer.download(
    //                api.rootUrl + "DocumentManagement/GetDocument?documentid=" + params.imageID,
    //                localPath,
    //                function (entry) {
    //                    debugger;
    //                    console.log("download complete: " + entry.toURL());
    //                },
    //                function (error) {
    //                    debugger;
    //                    console.log("download error source " + error.source);
    //                    console.log("download error target " + error.target);
    //                    console.log("upload error code" + error.code);
    //                }
    //            );
    //        },
    //        function (a, b, c) {
    //            debugger;
    //        });

    //}
    //window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    //if (typeof LocalFileSystem != "undefined") {
    //    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fsSuccess, fsFail);
    //} else {
    //    console.log("Local File System is not defined.");
    //}
});

router.route('(/)views/account.html', function (params) {

});

router.start();