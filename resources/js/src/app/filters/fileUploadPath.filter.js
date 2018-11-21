Vue.filter("fileUploadPath", path =>
{
    const position =  path.lastIndexOf("/");

    if (position <= 0)
    {
        return "/?GetOrderParamsFileName=" + path;
    }

    return "/order-property-file/" + path.substring(0, position) + "?filename=" + path.substring(position + 1);
});
