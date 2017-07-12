Vue.filter("itemURL", function(item)
{
    const enableOldUrlPattern = App.config.enableOldUrlPattern === "true";
    const urlPath = item.texts.urlPath;

    let link = "/";

    if (urlPath && urlPath.length > 0)
    {
        link += urlPath;
    }

    if (enableOldUrlPattern)
    {
        return link + "/a-" + item.item.id;
    }

    else if (link === "/")
    {
        return link + item.item.id + "_" + item.variation.id;
    }
    else
    {
        return link + "_" + item.item.id + "_" + item.variation.id;
    }
});
