Vue.filter("fileUploadPath", path =>
{
    const position =  path.lastIndexOf("/");

    return "/order-property-file/" + path.substring(0, position) + "?filename=" + path.substring(position + 1);
});
