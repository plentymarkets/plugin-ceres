import { isNullOrUndefined } from "./utils";

export function get(object, path)
{
    const fieldExp = /{\s*\S+\s*,\s*\S+\s*}|\w+/gm;

    let key;

    while (!isNullOrUndefined(object) && (key = fieldExp.exec(path)) !== null)
    {
        if (key.index === fieldExp.lastIndex)
        {
            fieldExp.lastIndex++;
        }

        object = readField(object, key[0]);
    }

    return object;
}

function readField(object, field)
{
    if (isNullOrUndefined(object))
    {
        return null;
    }

    const match = /^{\s*(\S+)\s*,\s*(\S+)\s*}$/.exec(field);

    if (!isNullOrUndefined(match))
    {
        const searchKey = match[1];
        const searchValue = match[2];

        return Array.prototype.slice.call(object).find(entry =>
        {
            return (get(entry, searchKey) + "") === searchValue;
        });
    }

    return object[field];
}
