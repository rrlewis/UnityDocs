var api = {
    rootUrl: "http://apprentice2/unity/api/",
    //rootUrl: "http://localhost/unity/api/",
    authService: function () {
        var $this = this;
        return {
            authenticate: function (data) {
                if (data.username == "" && data.password == "" && data.connectionname == "") // testing purposes only, remove for production
                { data = { username: "SCL", password: "PASS", connectionname: "ute1" }; }

                return $.ajax({
                    url: $this.rootUrl + "login/apilogin",
                    data: data,
                    success: function (results) {
                        return results;
                    }
                });
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
                return $.ajax({
                    url: $this.rootUrl + "DocumentManagement/GetDocument",

                    data: {
                        VersionNumber: versionNumber,
                        documentid: ID,
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
};

var mockData = {
    libraries: {
        data: [{ "Id": "ADOBE", "Name": "Adobe", "Description": "Adobe Documents", "CreatedBy": "SCL", "DocumentCount": 13, "LastModifiedAt": "2015-05-05T14:59:55", "LastModifiedBy": "SCL", "LastModifiedByFullName": "Sanderson Limited", "Identity": null }, { "Id": "ANNWYMER", "Name": "AnnWymer", "Description": "Ann's Documents", "CreatedBy": "SCL", "DocumentCount": 12, "LastModifiedAt": "2015-04-29T16:05:52", "LastModifiedBy": "SCL", "LastModifiedByFullName": "Sanderson Limited", "Identity": null }, { "Id": "CRAIGWALLACE", "Name": "CraigWallace", "Description": "Craig Wallace Sanderson Documents", "CreatedBy": "SCL", "DocumentCount": 12, "LastModifiedAt": "2015-07-09T15:24:24", "LastModifiedBy": "SCL", "LastModifiedByFullName": "Sanderson Limited", "Identity": null }, { "Id": "LMW", "Name": "lmw", "Description": "Lmw Documents", "CreatedBy": "SCL", "DocumentCount": 17, "LastModifiedAt": "2015-07-16T10:42:57", "LastModifiedBy": "SCL", "LastModifiedByFullName": "Sanderson Limited", "Identity": null }],

        AnnWymer: [{ "DocType": "KIDS LIST", "Path": "Kids List", "Key": null, "DocTypeDesc": "KIDS LIST", "ImageID": null, "PageCount": 1, "Date": "0001-01-01T00:00:00", "Type": "FOLDER", "Modified": "2015-04-21T16:22:22", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": null, "ParentFolder": "HOME", "Description": "Kids List", "Tags": null, "IsDraft": false, "IsFolder": true, "ModifiedByFullName": null, "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 0, "Identity": null }, { "DocType": "SAR'S", "Path": "SAR's", "Key": null, "DocTypeDesc": "SAR'S", "ImageID": null, "PageCount": 1, "Date": "0001-01-01T00:00:00", "Type": "FOLDER", "Modified": "2015-04-21T16:22:37", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": null, "ParentFolder": "KIDS LIST", "Description": "SAR's", "Tags": null, "IsDraft": false, "IsFolder": true, "ModifiedByFullName": null, "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 0, "Identity": null }, { "DocType": "C# TOOLS", "Path": "C# Tools", "Key": null, "DocTypeDesc": "C# TOOLS", "ImageID": null, "PageCount": 1, "Date": "0001-01-01T00:00:00", "Type": "FOLDER", "Modified": "2015-04-21T16:22:51", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": null, "ParentFolder": "C# TOOLS", "Description": "C# Tools", "Tags": null, "IsDraft": false, "IsFolder": true, "ModifiedByFullName": null, "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 0, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ANNWYMER\\betterlistviewexpress.exe", "Key": null, "DocTypeDesc": null, "ImageID": "A0000085", "PageCount": 1, "Date": "2015-04-21T16:22:56", "Type": "EXE", "Modified": "2015-04-21T16:22:56", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "betterlistviewexpress.exe", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 7740208, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ANNWYMER\\InfoPathEditorControls.xlsx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000086", "PageCount": 1, "Date": "2015-04-21T16:23:00", "Type": "XLSX", "Modified": "2015-04-21T16:23:00", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "InfoPathEditorControls.xlsx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 25363, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ANNWYMER\\imageMso.txt", "Key": null, "DocTypeDesc": null, "ImageID": "A0000087", "PageCount": 1, "Date": "2015-04-21T16:23:03", "Type": "TXT", "Modified": "2015-04-21T16:23:03", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "imageMso.txt", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 255352, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ANNWYMER\\ExcelControls.txt", "Key": null, "DocTypeDesc": null, "ImageID": "A0000088", "PageCount": 1, "Date": "2015-04-21T16:23:05", "Type": "TXT", "Modified": "2015-04-21T16:23:05", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "ExcelControls.txt", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 122504, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ANNWYMER\\WordControls.txt", "Key": null, "DocTypeDesc": null, "ImageID": "A0000089", "PageCount": 1, "Date": "2015-04-21T16:23:07", "Type": "TXT", "Modified": "2015-04-21T16:23:07", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "WordControls.txt", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 156962, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ANNWYMER\\transbase.ini", "Key": null, "DocTypeDesc": null, "ImageID": "A0000090", "PageCount": 1, "Date": "2015-04-21T16:23:15", "Type": "INI", "Modified": "2015-04-21T16:23:15", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "transbase.ini", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 56294, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ANNWYMER\\Unity SFDC Requirements Specification.doc", "Key": null, "DocTypeDesc": null, "ImageID": "A0000098", "PageCount": 1, "Date": "2015-04-29T10:50:24", "Type": "DOC", "Modified": "2015-04-21T16:46:35", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "2", "ParentFolder": "HOME", "Description": "Unity SFDC Requirements Specification.doc", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 672256, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ANNWYMER\\SFDC Code39 Examples.doc", "Key": null, "DocTypeDesc": null, "ImageID": "A0000099", "PageCount": 1, "Date": "2015-04-21T16:46:38", "Type": "DOC", "Modified": "2015-04-21T16:46:38", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "SFDC Code39 Examples.doc", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 23040, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ANNWYMER\\Craig.rtf", "Key": null, "DocTypeDesc": null, "ImageID": "A0000100", "PageCount": 1, "Date": "2015-04-23T15:51:54", "Type": "RTF", "Modified": "2015-04-23T15:51:54", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "Craig.rtf", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 213, "Identity": null }],
        CraigWallace: [{ "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\CRAIGWALLACE\\190061329.xlsm", "Key": null, "DocTypeDesc": null, "ImageID": "A0000077", "PageCount": 1, "Date": "2015-04-17T12:11:30", "Type": "XLSM", "Modified": "2015-04-17T12:11:30", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "190061329.xlsm", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 100376, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\CRAIGWALLACE\\Sar20069.xls", "Key": null, "DocTypeDesc": null, "ImageID": "A0000078", "PageCount": 1, "Date": "2015-04-21T14:07:14", "Type": "XLS", "Modified": "2015-04-21T14:07:14", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "Sar20069.xls", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 199680, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\CRAIGWALLACE\\lee.xlsx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000079", "PageCount": 1, "Date": "2015-04-21T14:07:19", "Type": "XLSX", "Modified": "2015-04-21T14:07:19", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "lee.xlsx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 9819, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\CRAIGWALLACE\\logontrace.txt", "Key": null, "DocTypeDesc": null, "ImageID": "A0000091", "PageCount": 1, "Date": "2015-04-21T16:43:43", "Type": "TXT", "Modified": "2015-04-21T16:43:43", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "logontrace.txt", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 839, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\CRAIGWALLACE\\Unity Release Calendar 2011-12.pdf", "Key": null, "DocTypeDesc": null, "ImageID": "A0000093", "PageCount": 1, "Date": "2015-04-21T16:44:45", "Type": "PDF", "Modified": "2015-04-21T16:44:45", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "Unity Release Calendar 2011-12.pdf", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 49152, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\CRAIGWALLACE\\backupcontacts2.pst", "Key": null, "DocTypeDesc": null, "ImageID": "A0000094", "PageCount": 1, "Date": "2015-04-21T16:45:18", "Type": "PST", "Modified": "2015-04-21T16:45:18", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "backupcontacts2.pst", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 1541120, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\CRAIGWALLACE\\Payroll Duration Start & End Time Logic.doc", "Key": null, "DocTypeDesc": null, "ImageID": "A0000095", "PageCount": 1, "Date": "2015-04-28T10:54:27", "Type": "DOC", "Modified": "2015-04-21T16:46:20", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "5", "ParentFolder": "HOME", "Description": "Payroll Duration Start & End Time Logic.doc", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 27136, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\CRAIGWALLACE\\Unity SFDC Installation Check List.doc", "Key": null, "DocTypeDesc": null, "ImageID": "A0000096", "PageCount": 1, "Date": "2015-04-24T16:41:54", "Type": "DOC", "Modified": "2015-04-21T16:46:26", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "12", "ParentFolder": "HOME", "Description": "Unity SFDC Installation Check List.doc", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 48640, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\CRAIGWALLACE\\Unity and Tensor Interfaces.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000097", "PageCount": 1, "Date": "2015-04-29T10:12:07", "Type": "DOCX", "Modified": "2015-04-21T16:46:29", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "4", "ParentFolder": "HOME", "Description": "Unity and Tensor Interfaces.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 22912, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\CRAIGWALLACE\\Document1.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000107", "PageCount": 1, "Date": "2015-04-29T10:01:18", "Type": "DOCX", "Modified": "2015-04-28T14:38:19", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "2", "ParentFolder": "HOME", "Description": "Document1.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 11394, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\CRAIGWALLACE\\Document1.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000108", "PageCount": 1, "Date": "2015-04-28T14:45:30", "Type": "DOCX", "Modified": "2015-04-28T14:45:30", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "Document1.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 11394, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\CRAIGWALLACE\\S0000061.tif", "Key": null, "DocTypeDesc": null, "ImageID": "A0000145", "PageCount": 1, "Date": "2015-07-09T15:24:24", "Type": "TIF", "Modified": "2015-07-09T15:24:24", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "S0000061.tif", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 57920, "Identity": null }],
        Adobe: [{ "DocType": "CRAIG", "Path": "Craig", "Key": null, "DocTypeDesc": "CRAIG", "ImageID": null, "PageCount": 1, "Date": "0001-01-01T00:00:00", "Type": "FOLDER", "Modified": "2015-04-30T11:58:12", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": null, "ParentFolder": null, "Description": "Craig", "Tags": null, "IsDraft": false, "IsFolder": true, "ModifiedByFullName": null, "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 0, "Identity": null }, { "DocType": "ANN", "Path": "Ann", "Key": null, "DocTypeDesc": "ANN", "ImageID": null, "PageCount": 1, "Date": "0001-01-01T00:00:00", "Type": "FOLDER", "Modified": "2015-04-30T11:58:15", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": null, "ParentFolder": null, "Description": "Ann", "Tags": null, "IsDraft": false, "IsFolder": true, "ModifiedByFullName": null, "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 0, "Identity": null }, { "DocType": "LEE", "Path": "Lee", "Key": null, "DocTypeDesc": "LEE", "ImageID": null, "PageCount": 1, "Date": "0001-01-01T00:00:00", "Type": "FOLDER", "Modified": "2015-04-30T11:58:18", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": null, "ParentFolder": null, "Description": "Lee", "Tags": null, "IsDraft": false, "IsFolder": true, "ModifiedByFullName": null, "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 0, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document1.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000112", "PageCount": 1, "Date": "2015-05-06T09:18:23", "Type": "DOCX", "Modified": "2015-04-28T15:10:01", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "7", "ParentFolder": "HOME", "Description": "Document1.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 13558, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document2.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000113", "PageCount": 1, "Date": "2015-04-29T10:58:45", "Type": "DOCX", "Modified": "2015-04-28T15:11:56", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "2", "ParentFolder": "HOME", "Description": "Document2.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 11393, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document3.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000114", "PageCount": 1, "Date": "2015-04-29T10:44:26", "Type": "DOCX", "Modified": "2015-04-28T15:12:55", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "2", "ParentFolder": "HOME", "Description": "Document3.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 12133, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document999.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000115", "PageCount": 1, "Date": "2015-05-05T11:57:32", "Type": "DOCX", "Modified": "2015-04-29T12:18:17", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "2", "ParentFolder": "HOME", "Description": "Document999.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 11944, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document888.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000116", "PageCount": 1, "Date": "2015-04-29T14:53:01", "Type": "DOCX", "Modified": "2015-04-29T12:24:20", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "1", "ParentFolder": "HOME", "Description": "Document888.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 11389, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document666.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000117", "PageCount": 1, "Date": "2015-04-29T12:31:38", "Type": "DOCX", "Modified": "2015-04-29T12:31:38", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "Document666.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 11242, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document555.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000118", "PageCount": 1, "Date": "2015-04-29T12:42:20", "Type": "DOCX", "Modified": "2015-04-29T12:42:20", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "Document555.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 11385, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document444.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000119", "PageCount": 1, "Date": "2015-04-29T12:45:04", "Type": "DOCX", "Modified": "2015-04-29T12:43:22", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "1", "ParentFolder": "HOME", "Description": "Document444.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 11389, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document111.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000120", "PageCount": 1, "Date": "2015-04-29T12:46:51", "Type": "DOCX", "Modified": "2015-04-29T12:46:03", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "1", "ParentFolder": "HOME", "Description": "Document111.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 11385, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document-jjj.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000121", "PageCount": 1, "Date": "2015-04-29T14:49:54", "Type": "DOCX", "Modified": "2015-04-29T12:48:11", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "1", "ParentFolder": "HOME", "Description": "Document-jjj.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 12066, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document-ggg.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000122", "PageCount": 1, "Date": "2015-05-05T11:54:55", "Type": "DOCX", "Modified": "2015-04-29T12:59:17", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "1", "ParentFolder": "HOME", "Description": "Document-ggg.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 12062, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document-fff.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000123", "PageCount": 1, "Date": "2015-04-29T15:19:51", "Type": "DOCX", "Modified": "2015-04-29T13:00:29", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "6", "ParentFolder": "HOME", "Description": "Document-fff.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 12162, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\ADOBE\\Document3.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000127", "PageCount": 1, "Date": "2015-05-05T14:59:55", "Type": "DOCX", "Modified": "2015-05-05T14:59:55", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "Document3.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 12133, "Identity": null }],
        lmw: [{ "DocType": "TECH DEPARTMENT", "Path": "Tech Department", "Key": null, "DocTypeDesc": "TECH DEPARTMENT", "ImageID": null, "PageCount": 1, "Date": "0001-01-01T00:00:00", "Type": "FOLDER", "Modified": "2015-04-21T14:11:12", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": null, "ParentFolder": "GG", "Description": "Tech Department", "Tags": null, "IsDraft": false, "IsFolder": true, "ModifiedByFullName": null, "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 0, "Identity": null }, { "DocType": "MEETINGS", "Path": "Meetings", "Key": null, "DocTypeDesc": "MEETINGS", "ImageID": null, "PageCount": 1, "Date": "0001-01-01T00:00:00", "Type": "FOLDER", "Modified": "2015-04-21T14:11:22", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": null, "ParentFolder": "BOWN", "Description": "Meetings", "Tags": null, "IsDraft": false, "IsFolder": true, "ModifiedByFullName": null, "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 0, "Identity": null }, { "DocType": "BOWN", "Path": "Bown", "Key": null, "DocTypeDesc": "BOWN", "ImageID": null, "PageCount": 1, "Date": "0001-01-01T00:00:00", "Type": "FOLDER", "Modified": "2015-07-10T11:51:40", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": null, "ParentFolder": null, "Description": "Bown", "Tags": null, "IsDraft": false, "IsFolder": true, "ModifiedByFullName": null, "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 0, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\LMW\\Sar20586.xls", "Key": null, "DocTypeDesc": null, "ImageID": "A0000075", "PageCount": 1, "Date": "2015-04-16T09:40:15", "Type": "XLS", "Modified": "2015-04-16T09:40:15", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "Sar20586.xls", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 210944, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\LMW\\wordicon.exe", "Key": null, "DocTypeDesc": null, "ImageID": "A0000076", "PageCount": 1, "Date": "2015-04-16T10:06:30", "Type": "EXE", "Modified": "2015-04-16T10:06:30", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "wordicon.exe", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 1859240, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\LMW\\WordControls.xlsx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000083", "PageCount": 1, "Date": "2015-04-21T14:11:35", "Type": "XLSX", "Modified": "2015-04-21T14:11:35", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "WordControls.xlsx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 188178, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\LMW\\imageMso.txt", "Key": null, "DocTypeDesc": null, "ImageID": "A0000084", "PageCount": 1, "Date": "2015-04-21T14:11:42", "Type": "TXT", "Modified": "2015-04-21T14:11:42", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "0", "ParentFolder": "HOME", "Description": "imageMso.txt", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 255352, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\LMW\\Office2010IconsGallery.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000106", "PageCount": 1, "Date": "2015-04-29T10:46:14", "Type": "DOCX", "Modified": "2015-04-28T10:47:55", "ModifiedBy": "SCL", "CheckedOutBy": null, "LatestVersion": "2", "ParentFolder": "HOME", "Description": "Office2010IconsGallery.docx", "Tags": null, "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": null, "IsDocumentLibraryDocument": true, "CreatedBy": null, "CreatedByFullName": null, "FileSize": 127028, "Identity": null }, { "DocType": null, "Path": "\\\\CRAIGWALLACE\\SHARE$\\docmanage\\LMW\\SAR.docx", "Key": null, "DocTypeDesc": null, "ImageID": "A0000165", "PageCount": 1, "Date": "2015-07-16T10:42:57", "Type": "DOCX", "Modified": "2015-07-16T10:42:57", "ModifiedBy": "SCL", "CheckedOutBy": "SCL", "LatestVersion": "0", "ParentFolder": "HOME", "Description": "SAR.docx", "Tags": "SAR", "IsDraft": false, "IsFolder": false, "ModifiedByFullName": "Sanderson Limited", "CheckedOutByFullName": "Sanderson Limited", "IsDocumentLibraryDocument": true, "CreatedBy": "SCL", "CreatedByFullName": "Sanderson Limited", "FileSize": 19286, "Identity": null }]
    },
    examplePDFURL: "samples/pdf-sample.pdf"
};