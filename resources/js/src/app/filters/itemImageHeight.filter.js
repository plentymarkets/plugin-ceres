import Vue from "vue";

Vue.filter("itemImageHeight", function(itemImages, highestPosition)
{
    if (itemImages.length === 0)
    {
        return null;
    }

    if (itemImages.length === 1)
    {
        return itemImages[0].height ?? null;
    }

    if (highestPosition)
    {
        return itemImages.reduce((prev, current) => (prev.position > current.position) ? prev : current).height ?? null;
    }

    return itemImages.reduce((prev, current) => (prev.position < current.position) ? prev : current).height ?? null;
});
