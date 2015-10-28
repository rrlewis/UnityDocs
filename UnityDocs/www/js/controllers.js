var scope = {};
var router = new kendo.Router({
    routeMissing: function (e) {
        //think of this like a local 404
        router.navigate("views/libraries.html");
    },
    change: function (e) {
        //fires any time the route changes
        pageInTransition = true;
        scope = {};
        scope.url = e.url;
        if (typeof filter != "undefined") {
            filter.cancelFilter();
        }
        console.log("Changing to: " + scope.url);
        if (currentUser.get() == null && e.url != "views/authenticate.html") {
            router.navigate("views/authenticate.html");
        }
        if (typeof dataOptionsActionSheet != "undefined") {
            dataOptionsActionSheet.functions().gridView.checkGridView(e);
        }
    }
});

router.route('(/)(views/authenticate.html)', function (params) {
});

router.route('(/)views/libraries.html', function (params) {
});

router.route('(/)views/library.html', function (params) {
    for (var prop in params) {
        if (params.hasOwnProperty(prop)) {
            if (params[prop] == 'undefined') {
                params[prop] = '';
            }
        }
    } // Empties the parameter if it is 'undefined'.
    if (typeof params.subfolder == 'undefined') {
        params.subfolder = '';
    }

    scope.checkInModalViewModel = new kendo.observable({
        fileName: "Placeholder"
    });
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

    var searchString = params.searchstring;
    var library = params.library;
    scope.data = new api.documentService().data.SearchResult({
        data: {
            searchfor: searchString,
            IndexType: library
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
    });
});

router.route('(/)views/libraryinfo.html', function (params) {
    params.data = JSON.parse(params.data);
    scope.viewShow = function (e) {
        fillForm($("form[name=extra-info]"), params.data.selectedItem);
    }

    scope.deleteItem = function () {

    }

    scope.showVersionHistory = function () {
        router.navigate("views/versionhistory.html?docID=" + params.data.selectedItem.ImageID + "&libraryName=" + params.data.selectedItem.ParentFolder);
    }
});

router.route('(/)views/versionhistory.html', function (params) {
    scope.data = new api.documentService().data.VersionHistory({
        data: {
            Library: params.libraryName,
            documentid: params.docID
        },
        schema: {
            data: function (response) {
                if (response.results.length == 0) {
                    $("#versionhistory [data-role=listview]").append(elements.emptyLibrary);
                } else {
                    return response.results;
                }
            }
        },
    });
});

router.route('(/)views/readfile.html', function (params) {
    var fileReader = new FileReader();
    var fileName = params.fileName;
    window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory + fileName,
        function (fileEntry) {
            fileEntry.file(function (file) {
                fileReader.onloadend = function (data) {
                    $("#readfile textarea").val(data);
                }
                fileReader.readAsText(file);
            });
        },
        function (error) {
            console.log(error);
        }
    );
});

router.route('(/)views/favourites.html', function (params) {
    scope.data = new api.documentService().data.Favourites({
        schema: {
            data: function (response) {
                if (response.results.length == 0) {
                    $("#versionhistory [data-role=listview]").append(elements.emptyLibrary);
                } else {
                    return response.results;
                }
            }
        },
    });
});

router.start();