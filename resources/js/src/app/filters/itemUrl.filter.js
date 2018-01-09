Vue.filter("itemURL", function(item)
{
    const enableOldUrlPattern = App.config.enableOldUrlPattern === "true";
    const urlPath = item.texts.urlPath || "";

    let link = "";

    if (urlPath.charAt(0) !== "/")
    {
        link = "/";
    }

    if (urlPath && urlPath.length)
    {
        link += urlPath;
    }

    let suffix = "";

    if (enableOldUrlPattern)
    {
        suffix = "/a-" + item.item.id;
    }
    else
    {
        suffix = "_" + item.item.id + "_" + item.variation.id;
    }

    if (link.substr(link.length - suffix.length, suffix.length) === suffix)
    {
        return link;
    }

    return link + suffix;
});
