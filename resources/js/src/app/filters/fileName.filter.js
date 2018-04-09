Vue.filter("fileName", path =>
{
    const splitPath = path.split("/");

    return splitPath[splitPath.length - 1];
});
