Vue.filter("itemURL", function(item)
{
    const enableOldUrlPattern = App.config.enableOldUrlPattern === "true";
    const urlPath = item.texts.urlPath;

    let link = "/";

    if (urlPath && urlPath.length)
    {
        link += urlPath;

        link += enableOldUrlPattern ? "/" : "_";
    }

    if (enableOldUrlPattern)
    {
        return link + "a-" + item.item.id;
    }

    return link + item.item.id + "_" + item.variation.id;
});
