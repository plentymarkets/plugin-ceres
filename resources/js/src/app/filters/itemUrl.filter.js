Vue.filter("itemURL", function(item)
{
    var urlPath = item.texts.urlPath;

    if (urlPath && urlPath.length > 0)
    {
        return "/" + urlPath + "_" + item.item.id + "_" + item.variation.id;
    }

    return "/" + item.item.id + "_" + item.variation.id;
});
