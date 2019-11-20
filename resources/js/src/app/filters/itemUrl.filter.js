import { isNullOrUndefined } from "../helper/utils";
import Vue from "vue";

Vue.filter("itemURL", function(item, withVariationId = true)
{
    const enableOldUrlPattern = App.config.global.enableOldUrlPattern;
    const urlPath = item.texts.urlPath || "";
    const includeLanguage = !isNullOrUndefined(item.texts.lang) && App.defaultLanguage != item.texts.lang;

    let link = "";

    if (urlPath.charAt(0) !== "/")
    {
        link = "/";
    }

    if (includeLanguage)
    {
        link += item.texts.lang + "/";
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
    else if (withVariationId)
    {
        suffix = "_" + item.item.id + "_" + item.variation.id;
    }
    else
    {
        suffix = "_" + item.item.id;
    }

    let trailingSlash = "";

    if (App.urlTrailingSlash)
    {
        trailingSlash = "/";
        if (link.length > 1 && link.charAt(link.length - 1) === "/")
        {
            link = link.substr(0, link.length - 1);
        }
    }

    if (link.substr(link.length - suffix.length, suffix.length) === suffix)
    {
        return link + trailingSlash;
    }

    return link + suffix + trailingSlash;
});
