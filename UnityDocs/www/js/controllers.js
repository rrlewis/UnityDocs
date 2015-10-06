var scope = {};

var router = new kendo.Router({
    routeMissing: function (e) {
        //think of this like a local 404
    },
    change: function (e) {
        //fires any time the route changes
        app;
        debugger;
        scope = {};
        scope.url = e.url;
        if (typeof filter != "undefined") {
            filter.cancelFilter();
        }
        console.log(scope.url);
        if (currentUser.get() == null && e.url != "views/authenticate.html") {
            router.navigate("views/authenticate.html");
        }
        //checkSearch();
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
    console.log("Hit auth controller");
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
    app.pane.loader.show();
    scope.data = new kendo.data.DataSource({
        transport: {
            read: {
                url: api.rootUrl + "documentlibrary/getlibraries",
            }
        },
        schema: {
            data: function (response) {
                app.pane.loader.hide();
                if (response.results.length == 0) {
                    $("#libraries [data-role=listview]").append(elements.emptyFolder);
                } else {
                    for (var x = 0; x < response.results.length; x++) {
                        response.results[x].LastModifiedAt = response.results[x].LastModifiedAt.split("T").join(" at ");
                    }
                    return response.results;
                }
            }
        },
        error: function (e) {
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
                app.pane.loader.hide();
                if (response.results.length == 0) {
                    $("#library [data-role=listview]").append(elements.emptyLibrary);
                } else {
                    for (var x = 0; x < response.results.length; x++) {
                        response.results[x].Modified = response.results[x].Modified.split("T").join(" at ");
                    }
                    return response.results;
                }
            }
        },
        error: function (e) {
            console.log(e);
        },
        change: function (e) {
            console.log(e);
        }
    });
    scope.libraryName = params.indextypeorlibrary;

    scope.getFileOptions = function (e) {
        if (e.target.hasClass("km-icon-button") || e.target.hasClass("fa") || e.target.hasClass("km-text")) {
            return;
        }
        if (e.item.children(".library-link").data("type") == "FOLDER") {
            return;
        }
        var link = e.item.children(".library-link");

        var docData = {};
        docData.imageID = link.data("imageid");
        docData.description = link.data("description");
        docData.type = link.data("type");
        docData.checkedoutby = link.data("checkedoutby");

        var buttonLabels = ['Read', 'Email'];
        if (docData.checkedoutby == null) {
            buttonLabels.push("Check Out");
            buttonLabels.push("Check Out & Edit");
        } else {
            buttonLabels.push("Check In");
            buttonLabels.push("Edit");
        }

        var actionSheetOptions = {
            'title': 'What do you want to do with ' + docData.description,
            'buttonLabels': buttonLabels,
            'androidEnableCancelButton': true, // default false
            'addCancelButtonWithLabel': 'Cancel',
        };
        function gotAction(buttonIndex) {
            setTimeout(function () {
                // like other Cordova plugins (prompt, confirm) the buttonIndex is 1-based (first button is index 1)
                switch (buttonIndex) {
                    case 1:
                        // Read
                        break;
                    case 2:
                        // Email file
                        fileHandler().downloadFile(docData.imageID, docData.description,
                            function (fileEntry) {
                                var options = {
                                    subject: fileEntry.name, // string
                                    body: "test body", // string
                                    to: [], // array
                                    cc: [], // array
                                    bcc: [], // array
                                    isHTML: false, // bool
                                    attachments: [fileEntry.toURL()], // array
                                };
                                fileHandler().emailFile(options,
                                    function (result) {
                                        if (result == "OK") {
                                            console.log("Email worked.")
                                        }
                                    }
                                );
                            },
                            function (error) {
                                console.log(error);
                            }
                        );
                        break;
                    case 3:
                        // Check Out / Check In
                        if (buttonLabels[2] == "Check In") {
                            // check file in
                            $("#check-in-modal div[data-role=header] span[data-role=view-title]").text("Check In: " + docData.description);
                            $("#check-in-modal").data("kendoMobileModalView").open();
                            //api.documentService().undoCheckOutDocument(docData.imageID).then(scope.refreshData);
                        } else
                            if (buttonLabels[2] == "Check Out") {
                                // check file out
                                api.documentService().checkOutDocument(docData.imageID).then(scope.refreshData);
                            }
                        break;
                    case 4:
                        // Edit / Check Out & Edit
                        if (e.target.hasClass("km-icon-button") || e.target.hasClass("fa") || e.target.hasClass("km-text")) {
                            return;
                        }
                        if (e.item.children(".library-link").data("type") == "FOLDER") {
                            return;
                        }
                        fileHandler().downloadFile(docData.imageID, docData.description,
                            function (fileEntry) {
                                //success
                                debugger;
                                fileHandler().openFile(fileEntry.name);
                            },
                            function (error) {
                                //fail
                                debugger;
                                console.log(error);
                            }
                        );
                        break;
                }
            });
        };
        window.plugins.actionsheet.show(actionSheetOptions, gotAction);
    };

    scope.refreshData = function () {
        scope.data.read()
    }

    scope.init = function () {
        if (params.subfolder == '') {
            $("#library [data-role=view-title]").text(params.indextypeorlibrary);
        } else {
            $("#library [data-role=view-title]").text(params.subfolder);
        }
    }

    function downloadFile(e, action) {
        if (e.target.hasClass("km-icon-button") || e.target.hasClass("fa") || e.target.hasClass("km-text")) {
            return;
        }
        if (e.item.children(".library-link").data("type") == "FOLDER") {
            return;
        }

        //The directory to store data
        var directory = cordova.file.externalDataDirectory; //cordova.file.externalCacheDirectory for volatile storage;
        var description = e.item.children(".library-link").data("description");
        var imageID = e.item.children(".library-link").data("imageid");
        var fileName = description;

        //URL of the document on the server
        var url = api.rootUrl + "DocumentManagement/GetDocument?documentid=" + imageID;

        //Check for the file. 
        if (action == "edit") {
            window.resolveLocalFileSystemURL(directory + fileName, readFile, downloadAndReadFile);
        } else if (action == "email") {
            window.resolveLocalFileSystemURL(directory + fileName, readFile, downloadAndEmailFile);
        }
        function downloadOnly() {
            var fileTransfer = new FileTransfer();
            console.log("About to start transfer");
            fileTransfer.download(url, directory + fileName,
                function (entry) {
                    console.log("Success!");
                },
                function (err) {
                    console.log("Error");
                    console.dir(err);
                });
        }
        function downloadAndEmailFile() {
            var fileTransfer = new FileTransfer();
            console.log("About to start transfer");
            fileTransfer.download(url, directory + fileName,
                function (entry) {
                    debugger;
                    console.log("Success!");
                    function callback(a, b, c) {
                        debugger;
                    }
                    window.plugins.emailComposer.showEmailComposerWithCallback(callback, docData.description, docData.description + " is attached.", /* to */[], /* cc */[/*currentUser.email*/], /* bcc */[], false, [entry.toURL()], [[docData.description, 'base64data1']]);
                },
                function (err) {
                    console.log("Error");
                    console.dir(err);
                });
        }
        function downloadAndReadFile() {
            var fileTransfer = new FileTransfer();
            console.log("About to start transfer");
            fileTransfer.download(url, directory + fileName,
                function (entry) {
                    console.log("Success!");
                    readFile(entry);
                },
                function (err) {
                    console.log("Error");
                    console.dir(err);
                });
        }
        function readFile(entry) {
            var transfer = fileHandler().openFile(entry.toURL());
        }
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

router.route('(/)views/searchresult.html', function (params) {
    debugger;
    var searchString = params.searchstring;
    var library = params.library;
    scope.data = new kendo.data.DataSource({
        transport: {
            read: {
                url: api.rootUrl + "DocumentManagement/SearchDocuments",
                data: {
                    searchfor: searchString,
                    IndexType: library
                },
            }
        },
        schema: {
            data: function (response) {
                if (response.results.length == 0) {
                    $("#searchresults [data-role=listview]").append(elements.emptyFolder);
                } else {
                    for (var x = 0; x < response.results.length; x++) {
                        response.results[x].LastModifiedAt = response.results[x].LastModifiedAt.split("T").join(" at ");
                    }
                    return response.results;
                }
            }
        },
        error: function (e) {
        },
        change: function (e) {
        }
    });
});

router.start();
