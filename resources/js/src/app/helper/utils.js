export function isNull(object)
{
    return object === null;
}

export function isUndefined(object)
{
    //eslint-disable-next-line
    return typeof object === typeof void 0;
}

export function isNullOrUndefined(object)
{
    return isNull(object) || isUndefined(object);
}
