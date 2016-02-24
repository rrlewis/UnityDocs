var isGridView = false;
var dataOptionsActionSheet = {
    check: function (e) {
        var viewModel = app.view().model;
        var viewID = app.view().element.attr('id');
        if (viewModel.hasOwnProperty('data')) {
            // needs actionsheet
            $("#" + viewID + " .options-btn").show();
        } else {
            $("#" + viewID + " .options-btn").hide();
        }
        if (viewID == 'versionhistory') {
            // remove viewtoggle button
            $("#options-actionsheet li[name=viewtoggle]").hide();
        } else {
            $("#options-actionsheet li[name=viewtoggle]").show();
        }
    },
    data: {
        gridView: false,
    },
    functions: function () {
        var $this = this;
        return {
            sort: {
                openSort: function (e) {
                    //open sort modal
                    var $this = this;
                    var config = {
                        title: "Sort",
                        items: [
                            { text: "Name (Ascending)", value: 1 },
                            { text: "Name (Descending)", value: 2 },
                            { text: "Newest", value: 3 },
                            { text: "Oldest", value: 4 },
                            { text: "Largest", value: 5 },
                            { text: "Smallest", value: 6 }
                        ],
                        selectedValue: 1,
                        doneButtonLabel: "Done",
                        cancelButtonLabel: "Cancel"
                    }
                    // Show the picker
                    debugger;
                    window.plugins.listpicker.showPicker(config,
                        function (btnIndex) {
                            var $this = this;
                            switch (btnIndex) {
                                // TODO: WIP
                                case 1:
                                    // Name (Ascending)
                                    if (app.pane.view().mode.hasOwnProperty('data')) {
                                        app.pane.view().model.data.sort({ field: 'Description', dir: 'asc' });
                                    }
                                    break;
                                case 2:
                                    // Name (Descending)
                                    if (app.pane.view().mode.hasOwnProperty('data')) {
                                        app.pane.view().model.data.sort({ field: 'Description', dir: 'desc' });
                                    }
                                    break;
                                case 3:
                                    // Newest
                                    if (app.pane.view().mode.hasOwnProperty('data')) {
                                        app.pane.view().model.data.sort({ field: 'Description', dir: 'desc' });
                                    }
                                    break;
                                case 4:
                                    // Oldest
                                    break;
                                case 5:
                                    //Largest
                                    break;
                                case 6:
                                    //Smallest
                                    break;
                            }
                            $this.config.selectedValue = btnIndex;
                        },
                        function () {

                        }
                    );
                },
            },
            search: function (e) {
                var searchString = prompt("What would you like to search for?");
                var currentLib = window.location.href.split("?")[1].split("&")[0].split("=")[1];
                console.log("Search string: " + searchString);
                console.log("Current Library: " + currentLib);

                router.navigate("views/searchresult.html?searchstring=" + searchString + "&library=" + currentLib);
            },
            gridView: {
                excludedViews: ['versionHistory'],
                toggleGridView: function (e) {
                    var textLabels = {
                        toThumbnails: "View as thumbnails",
                        toList: "View as list"
                    };
                    var viewID = app.view().element.attr("id");
                    var listView = $("#" + viewID + " ul[data-role=listview].data-source.sortable");
                    listView.toggleClass("grid-view");
                    if (listView.hasClass("grid-view")) {
                        e.sender.element.text(textLabels.toList);
                    } else {
                        e.sender.element.text(textLabels.toThumbnails);
                    }
                    $this.data.gridView = !$this.data.gridView;
                },
                isGridView: function () {
                    return $this.data.gridView;
                },
                checkGridView: function (changeEvent) {
                    var shouldBeGridView = this.isGridView();
                    if (typeof app != "undefined") {
                        if (typeof app.view === "function") {
                            try {
                                var toViewID = app.view().element.attr("id");
                            } catch (e) {
                                console.log(e);
                            }
                            var listView = $("#" + toViewID + " ul[data-role=listview].data-source.sortable");
                            if (shouldBeGridView) {
                                listView.addClass("grid-view");
                            }
                        }
                    }
                }
            },
            refresh: function (e) {
                var model = app.view().model;
                model.data.read();
            }
        }
    },
};

var filter = {
    filter: function () {
        var searchFor = $("#" + app.view().element.attr("id") + " header.search input[type=search]").val();
        scope.data.filter({ field: "Description", operator: "contains", value: searchFor });
    },
    clearFilter: function () {
        if (app.searchEnabled) {
            $("header.search form").trigger('reset');
            if (typeof scope.data != "undefined") {
                scope.data.filter({});
            }
        }
    },
    cancelFilter: function () {
        if (app.searchEnabled) {
            $("header.search [data-role=view-title]").show();
            $("header.search form").hide();
            $("header.search [data-role=button]:not(:has(i), [data-rel=drawer])").show();
            $("header.search [data-role=button]:has(i), header.search [data-role=button][data-icon=close]").hide();
            if (this.hasOwnProperty("clearFilter")) {
                this.clearFilter();
            }
        }
    },
    startFilter: function () {
        $("header.search [data-role=view-title]").hide();
        $("header.search form").css("display", "inline-block");
        $("header.search [data-role=button]:not(:has(i), [data-rel=drawer])").hide();
        $("header.search [data-role=button]:has(i), header.search [data-role=button][data-icon=close]").show();
    }
}

function onBeforeShow(e) {
    //check for view id to prevent
    //display of Drawer
    var disableDrawer = ["views/authenticate.html"];
    if (disableDrawer.indexOf(app.view().id) > -1) {
        console.log("Drawer disabled on " + app.view().id);
        e.preventDefault();
    }
}