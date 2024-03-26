import Vue from "vue";

Vue.filter("itemImageWidth", function(itemImages, highestPosition)
{
    if (itemImages.length === 0)
    {
        return undefined;
    }

    if (itemImages.length === 1)
    {
        return itemImages[0].width ?? undefined;
    }

    if (highestPosition)
    {
        return itemImages.reduce((prev, current) => (prev.position > current.position) ? prev : current).width ?? undefined;
    }

    return itemImages.reduce((prev, current) => (prev.position < current.position) ? prev : current).width ?? undefined;
});
