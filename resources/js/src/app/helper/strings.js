export function replaceAll(input, search, replacement)
{
    return input.split(search).join(replacement);
}

export function capitalize(input)
{
    return input.charAt(0).toUpperCase() + input.substr(1);
}
