$(function () {
    var remoteProvider = new DevExpress.fileProviders.Remote({
      endpointUrl: "https://js.devexpress.com/Demos/Mvc/api/file-manager-file-system-scripts"
    });
    
    var customProvider = new DevExpress.fileProviders.Custom({
      getItems: pathInfo => remoteProvider.getItems(pathInfo),
      createDirectory: (parentDir, name) => remoteProvider.createFolder(parentDir, name),
      renameItem: (item, name) => remoteProvider.renameItem(item, name),
      deleteItem: item => remoteProvider.deleteItems([ item ]),
      copyItem: (item, destDir) => remoteProvider.copyItems([ item ], destDir),
      moveItem: (item, destDir) => remoteProvider.moveItems([ item ], destDir),
      uploadFileChunk: (fileData, uploadInfo, destDirectory) => {
        return remoteProvider.uploadFileChunk(fileData, uploadInfo, destDirectory);
      },
      downloadItems: items => remoteProvider.downloadItems(items),
      uploadChunkSize: 100000000000
    }); 
    
    $("#file-manager").dxFileManager({
      fileProvider: customProvider,
      permissions: {
        download: true,
        create: true,
        copy: true,
        move: true,
        remove: true,
        rename: true,
        upload: true 
      },
      allowedFileExtensions: []
    });
  });