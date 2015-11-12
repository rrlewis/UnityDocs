var api = {
    rootUrl: "http://apprentice2/unity/api/",
    rootUrl2: "http://vmdevweb2008/unity/api/",
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
                    },
                    error: function (a, b, c) {
                        debugger;
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
            getFolderList: function (Library) {
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/GetFolderList",
                    data: {
                        Library: Library,
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
                });
            },
            data: {
                Libraries: function (options) {
                    var defaultSchema = {
                        data: function (response) {
                            if (response.results.length != 0) {
                                for (var x = 0; x < response.results.length; x++) {
                                    response.results[x].LastModifiedAt = response.results[x].LastModifiedAt.split("T").join(" at ");
                                }
                                return response.results;
                            }
                        }
                    };
                    var defaultError = function (e) {
                        console.log(e);
                    };
                    var defaultChange = function (e) {
                        console.log(e);
                    };
                    options = typeof options !== 'undefined' ? options : {};
                    options.schema = typeof options.schema !== 'undefined' ? options.schema : defaultSchema;
                    options.error = typeof options.error !== 'undefined' ? options.error : defaultError;
                    options.change = typeof options.change !== 'undefined' ? options.change : defaultChange;

                    return new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: api.rootUrl + "documentlibrary/getlibraries",
                            }
                        },
                        schema: options.schema,
                        error: options.error,
                        change: options.change
                    });
                },
                Documents: function (options) {
                    var defaultSchema = {
                        data: function (response) {
                            if (response.results.length != 0) {
                                for (var x = 0; x < response.results.length; x++) {
                                    response.results[x].Modified = response.results[x].Modified.split("T").join(" at ");
                                }
                                return response.results;
                            }
                        }
                    };
                    var defaultError = function (e) {
                        console.log(e);
                    };
                    var defaultChange = function (e) {
                        console.log(e);
                    };
                    var defaultData = {};

                    options.schema = typeof options.schema !== 'undefined' ? options.schema : defaultSchema;
                    options.error = typeof options.error !== 'undefined' ? options.error : defaultError;
                    options.change = typeof options.change !== 'undefined' ? options.change : defaultChange;
                    options.data = typeof options.data !== 'undefined' ? options.data : defaultData;

                    return new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: api.rootUrl + "DocumentManagement/getdocuments",
                                data: options.data
                            }
                        },
                        schema: options.schema,
                        error: options.error,
                        change: options.change
                    });
                },
                SearchResult: function (options) {
                    var defaultSchema = {
                        data: function (response) {
                            if (response.results.length != 0) {
                                for (var x = 0; x < response.results.length; x++) {
                                    response.results[x].LastModifiedAt = response.results[x].LastModifiedAt.split("T").join(" at ");
                                }
                                return response.results;
                            }
                        }
                    };
                    var defaultError = function (e) {
                        console.log(e);
                    };
                    var defaultChange = function (e) {
                        console.log(e);
                    };
                    var defaultData = {};

                    options.schema = typeof options.schema !== 'undefined' ? options.schema : defaultSchema;
                    options.error = typeof options.error !== 'undefined' ? options.error : defaultError;
                    options.change = typeof options.change !== 'undefined' ? options.change : defaultChange;
                    options.data = typeof options.data !== 'undefined' ? options.data : defaultData;

                    return new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: api.rootUrl + "DocumentManagement/SearchDocuments",
                                data: options.data
                            }
                        },
                        schema: options.schema,
                        error: options.error,
                        change: options.change
                    });
                },
                VersionHistory: function (options) {
                    var defaultSchema = {
                        data: function (response) {
                            if (response.results.length != 0) {
                                for (var x = 0; x < response.results.length; x++) {
                                    response.results[x].LastModifiedAt = response.results[x].LastModifiedAt.split("T").join(" at ");
                                }
                                return response.results;
                            }
                        }
                    };
                    var defaultError = function (e) {
                        console.log(e);
                    };
                    var defaultChange = function (e) {
                        console.log(e);
                    };
                    var defaultData = {};

                    options.schema = typeof options.schema !== 'undefined' ? options.schema : defaultSchema;
                    options.error = typeof options.error !== 'undefined' ? options.error : defaultError;
                    options.change = typeof options.change !== 'undefined' ? options.change : defaultChange;
                    options.data = typeof options.data !== 'undefined' ? options.data : defaultData;

                    return new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: api.rootUrl + "DocumentManagement/GetVersionHistory",
                                data: options.data
                            }
                        },
                        schema: options.schema,
                        error: options.error,
                        change: options.change
                    });
                },
                Favourites: function (options) {
                    var defaultSchema = {
                        data: function (response) {
                            if (response.results.length != 0) {
                                for (var x = 0; x < response.results.length; x++) {
                                    response.results[x].LastModifiedAt = response.results[x].LastModifiedAt.split("T").join(" at ");
                                }
                                return response.results;
                            }
                        }
                    };
                    var defaultError = function (e) {
                        console.log(e);
                    };
                    var defaultChange = function (e) {
                        console.log(e);
                    };

                    options.schema = typeof options.schema !== 'undefined' ? options.schema : defaultSchema;
                    options.error = typeof options.error !== 'undefined' ? options.error : defaultError;
                    options.change = typeof options.change !== 'undefined' ? options.change : defaultChange;

                    return new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: api.rootUrl + "DocumentManagement/GetFavourites",
                            }
                        },
                        schema: options.schema,
                        error: options.error,
                        change: options.change
                    });
                }
            }
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

