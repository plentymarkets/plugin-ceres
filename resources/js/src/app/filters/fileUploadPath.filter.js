Vue.filter("fileUploadPath", path =>
{
    return "/order-property-file/" + path.replace("order_property_files/", "");
});
