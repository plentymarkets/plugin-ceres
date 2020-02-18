import { isNullOrUndefined } from "../helper/utils";
import Vue from "vue";

Vue.filter("fileName", path =>
{
    const splitPath = path.split("/");
    const fileName  = splitPath[splitPath.length - 1];

    let match = /^(Item\w+)_(Char\d+)_(\d{4})_(.*)$/.exec(fileName);

    if (!isNullOrUndefined(match) && !isNullOrUndefined(match[4]))
    {
        return match[4];
    }

    match = /^\w+_\d+_(.*)$/.exec(fileName);
    if (!isNullOrUndefined(match) && !isNullOrUndefined(match[1]))
    {
        return match[1];
    }

    return fileName;
});
