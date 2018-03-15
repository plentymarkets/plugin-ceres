import {isNullOrUndefined}from "./utils";

export function replaceAll(input, search, replacement)
{
    if (isNullOrUndefined(input))
    {
        return input;
    }
    return (input + "").split(search).join(replacement);
}

export function capitalize(input)
{
    if (isNullOrUndefined(input))
    {
        return input;
    }
    return ("" + input).charAt(0).toUpperCase() + ("" + input).substr(1);
}
