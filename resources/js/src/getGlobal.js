export function getGlobal()
{
    if (typeof window !== "undefined")return window;
    if (typeof global !== "undefined")return global;
    return null;
}
