Vue.filter("itemImage", function(itemImages)
{
    if (itemImages.length === 1)
    {
        return itemImages[0].url;
    }

    return itemImages.reduce(function(prev, current)
    {
        return (prev.position < current.position) ? prev.url : current.url;
    });
});
