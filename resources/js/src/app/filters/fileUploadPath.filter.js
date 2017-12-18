Vue.filter("fileUploadPath", path =>
{
    return "/order-property-file?filePath=" + path.replace("order_property_files/", "");
});
