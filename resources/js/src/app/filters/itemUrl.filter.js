Vue.filter("itemURL", function(item)
{

    var urlContent = item.itemDescription.urlContent.split("/");
    var i          = urlContent.length - 1;

    if (urlContent[i].length > 0)
    {
        return "/" + urlContent[i] + "/" + item.itemBase.id + "/" + item.variationBase.id;
    }
    return "/" + item.itemBase.id + "/" + item.variationBase.id;

});
