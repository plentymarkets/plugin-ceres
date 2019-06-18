Vue.filter("fileUploadPath", path =>
{
    const position =  path.lastIndexOf("/");
    const prefix = App.urls.includeLanguage ? "/" + App.language : "";

    if (position <= 0)
    {
        return prefix + "/?GetOrderParamsFileName=" + path;
    }

    return prefix + "/order-property-file/" + path.substring(0, position) + "?filename=" + path.substring(position + 1);
});
