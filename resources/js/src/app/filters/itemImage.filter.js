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
