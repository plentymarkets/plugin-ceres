import { isNullOrUndefined } from "./utils";

export function set(object, path, value)
{
    return merge(object || {}, explodePath(path, value));
}

export function explodePath(path, value)
{
    let result = value;

    (Array.isArray(path) ? path : path.split("."))
        .reverse()
        .forEach(key =>
        {
            if (key === "")
            {
                result = [value];
            }
            else
            {
                const _tmp = result;

                result = {};
                result[key] = _tmp;
            }
        });

    return result;
}

export function merge(target, source)
{
    if (isNullOrUndefined(source))
    {
        return target;
    }

    if (isNullOrUndefined(target))
    {
        return source;
    }

    if (Array.isArray(target) && Array.isArray(source))
    {
        return target.concat(source);
    }
    else if (typeof target === "object")
    {
        Object.keys(source).forEach(sourceKey =>
        {
            if (typeof source[sourceKey] !== "object")
            {
                target[sourceKey] = source[sourceKey];
            }
            else
            {
                target[sourceKey] = merge(target[sourceKey], source[sourceKey]);
            }
        });

        return target;
    }

    return source || target;
}
