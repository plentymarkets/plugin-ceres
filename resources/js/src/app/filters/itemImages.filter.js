Vue.filter("itemImages", function(images, accessor)
{
    const imageUrls = [];
    let imagesAccessor = "all";

    if (images.variation && images.variation.length)
    {
        imagesAccessor = "variation";
    }

    for (const i in images[imagesAccessor])
    {
        const imageUrl = images[imagesAccessor][i][accessor];
        const alternate = images[imagesAccessor][i].names ? images[imagesAccessor][i].names.alternate : null;

        imageUrls.push({url: imageUrl, position: images[imagesAccessor][i].position, alternate});
    }

    return imageUrls;
});
