import Vue from "vue";

Vue.filter("itemImageAlternativeText", function(itemImages, highestPosition)
{
    if (itemImages.length === 0)
    {
        return "";
    }

    if (itemImages.length === 1)
    {
        return itemImages[0].alternate;
    }

    if (highestPosition)
    {
        return itemImages.reduce((prev, current) => (prev.position > current.position) ? prev : current).alternate;
    }

    return itemImages.reduce((prev, current) => (prev.position < current.position) ? prev : current).alternate;
});
