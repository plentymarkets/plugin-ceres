Vue.filter("fileUploadPath", path =>
{
    const splitPath = path.split("/");

    return "/order-property-file?filePath=" + splitPath[splitPath.length - 2] + splitPath[splitPath.length - 1];
});
