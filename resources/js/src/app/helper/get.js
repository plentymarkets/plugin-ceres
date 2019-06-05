import { isNullOrUndefined } from "./utils";

export function get(object, path)
{
    const fields = path.split(".");
    let key = fields.shift();

    while (!isNullOrUndefined(object) && !isNullOrUndefined(key))
    {
        object = readField(object, key);
        key = fields.shift();
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
            return (entry[searchKey] + "") === searchValue;
        });
    }

    return object[field];
}
