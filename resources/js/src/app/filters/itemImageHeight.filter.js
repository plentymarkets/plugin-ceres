import Vue from "vue";

Vue.filter("itemImageHeight", function(itemImages, highestPosition)
{
    if (itemImages.length === 0)
    {
        return undefined;
    }

    if (itemImages.length === 1)
    {
        return itemImages[0].height ?? undefined;
    }

    if (highestPosition)
    {
        return itemImages.reduce((prev, current) => (prev.position > current.position) ? prev : current).height ?? undefined;
    }

    return itemImages.reduce((prev, current) => (prev.position < current.position) ? prev : current).height ?? undefined;
});
