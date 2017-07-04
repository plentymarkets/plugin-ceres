Vue.filter("truncate", function(string, value)
{
    if (string.length > value)
    {
        return string.substring(0, value) + "...";
    }
    return string;
});
