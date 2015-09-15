﻿var scope = {};

var router = new kendo.Router({
    routeMissing: function (e) {
        //think of this like a local 404
    },
    change: function (e) {
        //fires any time the route changes
        scope = {};
        scope.url = e.url;
        console.log(scope.url);
        if (currentUser.get() == null && e.url != "views/authenticate.html") {
            router.navigate("views/authenticate.html");
        }
    }
});


router.route('(/)(views/authenticate.html)', function (params) { // AuthenticateController
    var loggedIn = function (result) {
        if (result.LoggedIn) {
            router.navigate("views/libraries.html");
        } else {
            $("#attempt-failed").text(result.ErrorMessage).slideDown(100);
        }
    }
    if (api.authService().isAutoLogin()) {
        api.authService().authenticate(currentUser.get()).then(loggedIn);
    } else {
        scope.authenticate = function () {
            var formData = $("form[name=auth-form]").serializeObject();
            api.authService().authenticate(formData).then(loggedIn);
        }
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
    var directory = cordova.file.externalRootDirectory; //cordova.file.externalCacheDirectory;

    var fileName = params.description;

    //URL of the document on the server
    var url = api.rootUrl + "DocumentManagement/GetDocument?documentid=" + params.imageID;

    //Check for the file. 
    window.resolveLocalFileSystemURL(directory + fileName, readFile, downloadAndReadFile);

    function downloadAndReadFile(a) {
        debugger;
        var fileTransfer = new FileTransfer();
        console.log("About to start transfer");
        fileTransfer.download(url, directory + fileName,
            function (entry) {
                debugger;
                console.log("Success!");
                readFile(entry);
            },
            function (err) {
                debugger;
                console.log("Error");
                console.dir(err);
            });
    }

    function readFile(entry) {
        window.open(entr.toURL());
        debugger;
    }

});

router.route('(/)views/account.html', function (params) {
    scope.user = currentUser.get();
    scope.logOut = currentUser.logOut;
    scope.onInit = function () {
        $("#account input[name=username]").val(scope.user.username);
        $("#account input[name=connectionname]").val(scope.user.connectionname);
    }
});

router.start();