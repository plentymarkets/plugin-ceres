import Vue from "vue";

Vue.filter("itemImages", function(images, accessor)
{
    if (!images)
    {
        return [];
    }

    const imageUrls = [];
    let imagesAccessor = "all";

    if (images.variation && images.variation.length)
    {
        imagesAccessor = "variation";
    }

    for (const image in images[imagesAccessor])
    {
        const imageUrl = images[imagesAccessor][image][accessor];
        const alternate = images[imagesAccessor][image].names ? images[imagesAccessor][image].names.alternate : null;

        imageUrls.push({ url: imageUrl, position: images[imagesAccessor][image].position, alternate });
    }

    return imageUrls;
});
