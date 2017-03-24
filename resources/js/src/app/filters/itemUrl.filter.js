Vue.filter("itemURL", function(item)
{
    var urlPath = item.texts[0].urlPath;

    if (urlPath.length > 0)
    {
        return "/" + urlPath + "_" + item.item.id + "_" + item.variation.id;
    }

    return "/" + item.item.id + "_" + item.variation.id;
});
