Vue.filter("itemURL", function(item)
{

    var urlContent = item.texts[0].urlPath.split("/");
    var i          = urlContent.length - 1;

    if (urlContent[i].length > 0)
    {
        return "/" + urlContent[i] + "/" + item.variation.itemId + "/" + item.variation.id;
    }
    return "/" + item.variation.itemId + "/" + item.variation.id;

});
