import Vue from "vue";

Vue.filter("itemImage", function(itemImages, highestPosition)
{
    if (itemImages.length === 0)
    {
        return "";
    }

    if (itemImages.length === 1)
    {
        return itemImages[0].url;
    }

    if (highestPosition)
    {
        return itemImages.reduce((prev, current) => (prev.position > current.position) ? prev : current).url;
    }

    return itemImages.reduce((prev, current) => (prev.position < current.position) ? prev : current).url;
});

Vue.filter("itemSecondImage", function(itemImages, highestPosition)
{
    if (itemImages.length <= 1)
    {
        return "";
    }

    if (itemImages.length === 2)
    {
        return itemImages[0].url;
    }

    return itemImages.sort((prev, current) => (prev.position > current.position) ? prev : current)[1].url;
});
