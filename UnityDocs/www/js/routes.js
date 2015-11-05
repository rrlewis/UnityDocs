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
        if (typeof headerViewModel != 'undefined') { 
            headerViewModel.set('search.library', "");
            headerViewModel.set('search.searchString', "");
            headerViewModel.set('search.isActive', false);
        }
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
});

router.route('(/)views/account.html', function (params) {
});

router.route('(/)views/libraryinfo.html', function (params) {
});

router.route('(/)views/versionhistory.html', function (params) {
});

router.route('(/)views/readfile.html', function (params) {
});

router.route('(/)views/favourites.html', function (params) {
});

router.route('(/)views/searchresult.html', function (params) {
});

router.start();



