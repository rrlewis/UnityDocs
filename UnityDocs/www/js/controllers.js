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

    scope.data = new kendo.data.DataSource({
        transport: {
            read: {
                url: api.rootUrl + "documentmanagement/getdocuments",
                data: {
                    indextypeorlibrary: params.indextypeorlibrary,
                    key: params.key,
                },
            }
        },
        schema: {
            data: function (response) {
                if (response.results.length == 0) {
                    $("#library [data-role=listview]").append(elements.emptyLibrary);
                } else {
                    var g = "";
                    return response.results;
                }
            }
        },
        error: function (e) {
            scope.data.data(mockData.libraries[params.indextypeorlibrary]);
        },
        change: function (e) {
        }
    });

    scope.libraryName = params.indextypeorlibrary;
});

router.route('(/)views/file.html', function (params) {
});

router.route('(/)views/folder.html', function (params) {
    for (var prop in params) {
        if (params.hasOwnProperty(prop)) {
            if (params[prop] == 'undefined') {
                params[prop] = '';
            }
        }
    }
    scope.libraryName = params.indextypeorlibrary;
    scope.data = new kendo.data.DataSource({
        transport: {
            read: {
                url: api.rootUrl + "documentmanagement/getdocuments",
                data: {
                    indextypeorlibrary: params.indextypeorlibrary,
                    key: params.key,
                    subfolder: params.subfolder
                },
            }
        },
        schema: {
            data: function (response) {
                if (response.results.length == 0) {
                    $("#folder [data-role=listview]").append(elements.emptyFolder);
                } else {
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

